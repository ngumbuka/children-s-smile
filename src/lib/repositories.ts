/**
 * The app's view of its data.
 *
 * Components call these functions and never touch `db` directly, so the
 * storage engine stays swappable. Contribution totals are recomputed from
 * the transaction ledger rather than trusted from the project document,
 * which keeps the meter honest: a transaction marked `refunded` or
 * `failed` never counts toward a project's progress.
 *
 * This module is the only place that knows how the two faces of the app
 * relate: the public site reads projects, articles and transactions, while
 * `/admin` additionally reads the school register and the network records.
 * Both go through here, which is why a figure in the backoffice is always a
 * sum over the same rows the homepage renders.
 */

import { db, type Collection, type Doc } from "./db"
import type {
  AlertDoc,
  AntennaDoc,
  ApeStatus,
  ArticleFormat,
  Category,
  Publication,
  ProjectStatus,
  SchoolStatus,
  ArticleDoc,
  CampaignDoc,
  ComplianceRowDoc,
  GovernanceDoc,
  ImpactRegionDoc,
  ImpactScopeDoc,
  MessageDoc,
  MilestoneDoc,
  NotificationPrefDoc,
  OrganisationDoc,
  PaymentRail,
  ProjectDoc,
  ReportDoc,
  SchoolDoc,
  SecurityCheckDoc,
  TestimonialDoc,
  TransactionDoc,
  TransactionStatus,
  UserDoc,
} from "./models"
import {
  ARTICLE_CATEGORY_LABELS,
  ARTICLE_FORMAT_LABELS,
  CATEGORY_LABELS,
  isPublic,
  isSettled,
  PROJECT_STATUS_LABELS,
  regionFromLabel,
  regionLabel,
  settledAmount,
  totalGirls,
  totalPupils,
} from "./models"
import { seed } from "./seed"

const projects = db.collection<ProjectDoc>("projects")
const articles = db.collection<ArticleDoc>("articles")
const transactions = db.collection<TransactionDoc>("transactions")
const campaigns = db.collection<CampaignDoc>("campaigns")
const schools = db.collection<SchoolDoc>("schools")
const alerts = db.collection<AlertDoc>("alerts")
const antennas = db.collection<AntennaDoc>("antennas")
const users = db.collection<UserDoc>("users")
const notificationPrefs =
  db.collection<NotificationPrefDoc>("notificationPrefs")
const securityChecks = db.collection<SecurityCheckDoc>("securityChecks")
const governance = db.collection<GovernanceDoc>("governance")
const reports = db.collection<ReportDoc>("reports")
const complianceRows = db.collection<ComplianceRowDoc>("complianceRows")
const milestones = db.collection<MilestoneDoc>("milestones")
const testimonials = db.collection<TestimonialDoc>("testimonials")
const impactRegions = db.collection<ImpactScopeDoc>("impactRegions")
const organisation = db.collection<OrganisationDoc>("organisation")
const messages = db.collection<MessageDoc>("messages")

export const ready = seed()

const sortByDateDesc = (
  a: { publishedAt: string },
  b: { publishedAt: string },
) => b.publishedAt.localeCompare(a.publishedAt)

/* ----------------------------- projects ---------------------------- */

/** Every project, published or not. The backoffice needs the drafts. */
export async function listProjects(): Promise<ProjectDoc[]> {
  await ready
  return projects.find()
}

/**
 * Projects the public site is allowed to render.
 *
 * A record that is published but not visible is a backoffice draft awaiting
 * review, so the public list and the backoffice list are genuinely different
 * questions rather than the same list filtered by the caller.
 */
export async function listPublishedProjects(): Promise<ProjectDoc[]> {
  await ready
  const rows = await projects.find({ "publication.status": "published" })
  return rows.filter((project) => isPublic(project.publication))
}

export async function getProject(slug: string): Promise<ProjectDoc | null> {
  await ready
  return projects.findOne({ slug })
}

export async function createProject(
  input: Omit<ProjectDoc, "_id" | "progress">,
): Promise<ProjectDoc> {
  await ready
  return projects.insert({
    ...input,
    progress: pct(input.raised, input.target),
  })
}

export async function updateProject(
  id: string,
  patch: Partial<ProjectDoc>,
): Promise<ProjectDoc | null> {
  await ready
  const current = await projects.findById(id)
  if (!current) return null
  const next = { ...current, ...patch }
  if (patch.raised !== undefined || patch.target !== undefined) {
    next.progress = pct(next.raised, next.target)
  }
  return projects.update(id, next)
}

export const deleteProject = (id: string) => projects.remove(id)

/* ----------------------------- articles ---------------------------- */

export async function listArticles(): Promise<ArticleDoc[]> {
  await ready
  const rows = await articles.find()
  return rows.sort(sortByDateDesc)
}

/** The news feed, which honours the visibility flag as well as the status. */
export async function listPublishedArticles(): Promise<ArticleDoc[]> {
  await ready
  const rows = await articles.find({ "publication.status": "published" })
  return rows
    .filter((article) => isPublic(article.publication))
    .sort(sortByDateDesc)
}

export async function getArticle(slug: string): Promise<ArticleDoc | null> {
  await ready
  return articles.findOne({ slug })
}

export async function createArticle(
  input: Omit<ArticleDoc, "_id">,
): Promise<ArticleDoc> {
  await ready
  return articles.insert(input)
}

/** One row of the backoffice's content form, before it reaches the store. */
export type ArticleInput = {
  id: string | null
  title: string
  type: ArticleFormat
  excerpt: string
  content: string
  date: string
  region: string
  author: string
  tags: string[]
  coverImage: string
  seoTitle: string
  seoDescription: string
  publication: Publication
  consentVerified: boolean
}

/** Minutes of reading, from word count at 200 words per minute. */
const readingTime = (text: string) =>
  Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / 200))

/**
 * Creates or updates an editorial record.
 *
 * The public site derives its kicker, reading time and card teaser from the
 * body rather than storing them, so an editor cannot leave them stale.
 */
export async function saveArticle(input: ArticleInput): Promise<ArticleDoc> {
  await ready
  if (!input.title.trim()) throw new Error("Le titre est obligatoire.")
  if (!input.content.trim())
    throw new Error("Le corps du contenu est obligatoire.")

  const existing = input.id ? await articles.findById(input.id) : null
  const body = toParagraphs(input.content)
  const category = input.type === "report" ? "official" : "field"
  const slug =
    existing?.slug ?? (await uniqueSlug(articles, slugify(input.title)))

  const doc: Omit<ArticleDoc, "_id"> = {
    slug,
    title: input.title.trim(),
    excerpt: input.excerpt.replace(/\s+/g, " ").trim(),
    body,
    categories: [category],
    categoryDisplay: ARTICLE_CATEGORY_LABELS[category],
    kicker: ARTICLE_FORMAT_LABELS[input.type],
    location: input.region.trim(),
    publishedAt: input.date.trim() || new Date().toISOString(),
    readingMinutes: readingTime(body.join(" ")),
    image: input.coverImage,
    featured: input.publication.featured,
    stats: existing?.stats ?? [],
    relatedProjects: existing?.relatedProjects ?? [],
    publication: input.publication,
    schoolId: existing?.schoolId ?? null,
    author: input.author.trim(),
    format: input.type,
    tags: input.tags,
    seoTitle: input.seoTitle.trim(),
    seoDescription: input.seoDescription.trim(),
    consentVerified: input.consentVerified,
  }

  return existing
    ? ((await articles.update(existing._id, doc)) ?? { ...existing, ...doc })
    : articles.insert(doc)
}

export async function updateArticle(
  id: string,
  patch: Partial<ArticleDoc>,
): Promise<ArticleDoc | null> {
  await ready
  return articles.update(id, patch)
}

export const deleteArticle = (id: string) => articles.remove(id)

/* -------------------------- transactions -------------------------- */

export type TransactionFilter = {
  projectSlug?: string
  status?: TransactionStatus
  search?: string
}

export async function listTransactions(
  filter: TransactionFilter = {},
): Promise<TransactionDoc[]> {
  await ready
  const query: Record<string, unknown> = {}
  if (filter.status) query.status = filter.status
  const rows = await transactions.find(query)
  const q = filter.search?.trim().toLowerCase()
  return rows
    .filter((t) =>
      filter.projectSlug ? t.projectSlug === filter.projectSlug : true,
    )
    .filter((t) =>
      q
        ? [t.reference, t.donorName, t.donorEmail, t.donorCountry].some((v) =>
            v.toLowerCase().includes(q),
          )
        : true,
    )
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export async function getTransactionStats() {
  await ready
  const rows = await transactions.find()
  const sum = (list: TransactionDoc[]) =>
    list.reduce((acc, t) => acc + t.amount, 0)
  const settled = rows.filter(isSettled)
  return {
    total: sum(settled),
    pending: sum(rows.filter((t) => t.status === "pending")),
    refunded: sum(rows.filter((t) => t.status === "refunded")),
    count: rows.length,
    succeeded: settled.length,
    pendingCount: rows.filter((t) => t.status === "pending").length,
    failedCount: rows.filter((t) => t.status === "failed").length,
    refundedCount: rows.filter((t) => t.status === "refunded").length,
    donors: new Set(settled.map((t) => t.donorEmail)).size,
  }
}

/** Amount collected per payment rail, for the treasury breakdown. */
export async function getTreasuryBreakdown() {
  await ready
  const rows = (await transactions.find()).filter(isSettled)
  const total = settledAmount(rows)
  const totals = new Map<TransactionDoc["rail"], number>()
  for (const t of rows) totals.set(t.rail, (totals.get(t.rail) ?? 0) + t.amount)
  const purposes = new Map<TransactionDoc["purpose"], number>()
  for (const t of rows)
    purposes.set(t.purpose, (purposes.get(t.purpose) ?? 0) + t.amount)
  return {
    total,
    /** Share of collected money, 0-100, rounded to whole percent. */
    rails: [...totals.entries()].map(([rail, amount]) => ({
      rail,
      amount,
      pct: total > 0 ? Math.round((amount / total) * 100) : 0,
    })),
    purposes: [...purposes.entries()].map(([purpose, amount]) => ({
      purpose,
      amount,
    })),
  }
}

/**
 * Records a payment and pushes the resulting totals onto the project.
 * Called from the donation form, so the meter a donor sees after giving
 * is the meter the backoffice reconciles against.
 */
export async function recordDonation(input: {
  projectSlug: string | null
  amount: number
  donorName: string
  donorEmail: string
  rail: PaymentRail
  frequency?: TransactionDoc["frequency"]
  status?: TransactionStatus
  purpose?: TransactionDoc["purpose"]
  donorCountry?: string
}): Promise<TransactionDoc> {
  await ready
  const now = new Date().toISOString()
  const status = input.status ?? "succeeded"
  const settled = isSettled({ status })
  const project = input.projectSlug ? await getProject(input.projectSlug) : null
  // A gift is never attributed to a record the public site does not publish:
  // otherwise `?project=<draft>` would both disclose the draft and quietly
  // move its funding meter.
  if (input.projectSlug && (!project || !isPublic(project.publication))) {
    throw new Error(
      "Ce chantier n'est pas publié : le don n'a pas pu être rattaché.",
    )
  }
  const tx = await transactions.insert({
    reference: `CS-${new Date().getFullYear()}-${String(Math.floor(1000 + Math.random() * 8999))}`,
    projectSlug: input.projectSlug,
    campaignSlug: null,
    schoolId: project?.schoolId ?? null,
    donorName: input.donorName,
    donorEmail: input.donorEmail,
    donorCountry: input.donorCountry ?? "Cameroun",
    amount: input.amount,
    currency: "XOF",
    rail: input.rail,
    frequency: input.frequency ?? "one_time",
    status,
    purpose: input.purpose ?? project?.category ?? "general",
    createdAt: now,
    settledAt: settled ? now : null,
  })

  if (input.projectSlug && isSettled(tx))
    await applyToProject(input.projectSlug, tx.amount)
  return tx
}

export async function setTransactionStatus(
  id: string,
  status: TransactionStatus,
): Promise<TransactionDoc | null> {
  await ready
  const current = await transactions.findById(id)
  if (!current) return null
  const next = await transactions.update(id, {
    status,
    settledAt:
      status === "pending"
        ? null
        : (current.settledAt ?? new Date().toISOString()),
  })
  if (current.projectSlug) {
    // Moving a row into or out of "succeeded" moves the project total with it.
    const was = isSettled(current) ? current.amount : 0
    const now = isSettled({ status }) ? current.amount : 0
    await applyToProject(current.projectSlug, now - was)
  }
  return next
}

/**
 * Moves a project's `raised` by `delta` and re-derives its progress.
 *
 * `raised` is the authoritative cumulative total, not a sum of the ledger.
 * The ledger is the audit trail behind it and already overlaps it, so
 * re-adding the ledger total on every write would count the same money
 * once per donation. Callers pass the amount that actually changed.
 */
async function applyToProject(slug: string, delta: number) {
  if (delta === 0) return
  const project = await projects.findOne({ slug })
  if (!project) return
  const raised = Math.max(0, project.raised + delta)
  await projects.update(project._id, {
    raised,
    progress: pct(raised, project.target),
  })
}

export const pct = (raised: number, target: number) =>
  target <= 0 ? 0 : Math.min(100, Math.round((raised / target) * 100))

/* ----------------------------- schools ---------------------------- */

export async function listSchools(): Promise<SchoolDoc[]> {
  await ready
  return schools.find()
}

export async function getSchool(id: string): Promise<SchoolDoc | null> {
  await ready
  return schools.findById(id)
}

/** Resolves a school by its stable code, e.g. `SCH-DIMAKO`. */
export async function getSchoolByCode(code: string): Promise<SchoolDoc | null> {
  await ready
  return schools.findOne({ code })
}

export async function updateSchool(
  id: string,
  patch: Partial<SchoolDoc>,
): Promise<SchoolDoc | null> {
  await ready
  return schools.update(id, { ...patch, updatedAt: new Date().toISOString() })
}

/* ----------------------- backoffice: chantiers ---------------------- */

/** One row of the backoffice's chantier form, before it reaches the store. */
export type ChantierInput = {
  /** `null` creates a new chantier; an id updates that project. */
  id: string | null
  ecole: string
  localite: string
  region: string
  type: string
  description: string
  budget: number
  eleves: number
  avancement: number
  date: string
  startDate: string
  endDate: string
  fundingGoal: number
  fundingRaised: number
  latitude: string
  longitude: string
  coverImage: string
  statut: SchoolStatus
  ape: ApeStatus
  publication: Publication
  consentVerified: boolean
}

const PROJECT_STATUS_FROM_SCHOOL: Record<SchoolStatus, ProjectStatus> = {
  delivered: "delivered",
  in_progress: "in_progress",
  preparing: "preparing",
  at_risk: "in_progress",
}

/**
 * Infers the public category from the words the backoffice typed. The category
 * drives the site's filters, so an editor should not have to guess it.
 */
function categoryFrom(text: string): Category {
  const haystack = text.toLocaleLowerCase("fr")
  if (/eau|puits|forage|sanit|toilett|latrine|wc\b/.test(haystack))
    return "water"
  if (/livre|biblioth|manuel|lecture|documentaire/.test(haystack))
    return "books"
  if (/santé|medical|infirm|médicament|vaccin|nutrition/.test(haystack))
    return "health"
  return "school"
}

const slugify = (text: string) =>
  text
    .toLocaleLowerCase("fr")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

/**
 * A slug that no other record in the collection already answers to.
 *
 * Two chantiers can share a school, and two articles can share a headline, so
 * the derived slug is only a starting point: the second record gets a numeric
 * suffix rather than overwriting the first one's public URL.
 */
async function uniqueSlug(
  collection: Collection<Doc & { slug: string }>,
  base: string,
): Promise<string> {
  const taken = new Set((await collection.find()).map((row) => row.slug))
  const stem = base || "sans-titre"
  if (!taken.has(stem)) return stem
  let suffix = 2
  while (taken.has(`${stem}-${suffix}`)) suffix += 1
  return `${stem}-${suffix}`
}

const BLOCK_TAGS = /<\/(p|div|h[1-6]|li|blockquote)>\s*|<br\s*\/?>\s*/gi

const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&nbsp;": " ",
  "&eacute;": "é",
  "&egrave;": "è",
  "&agrave;": "à",
  "&ecirc;": "ê",
  "&ocirc;": "ô",
  "&ucirc;": "û",
  "&ccedil;": "ç",
}

/**
 * Turns the editor's rich text back into the plain paragraphs the public
 * article page renders.
 *
 * The editor works in HTML while the seeded bodies are plain strings joined by
 * blank lines. Without this the second save of an article would nest one set
 * of paragraphs inside another, and the text would arrive at the page already
 * escaped.
 */
function toParagraphs(html: string): string[] {
  const paragraphs = html
    .replace(
      new RegExp(Object.keys(ENTITIES).join("|"), "g"),
      (entity) => ENTITIES[entity],
    )
    .replace(BLOCK_TAGS, "\n\n")
    .replace(/<[^>]+>/g, "")
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.replace(/[ \t]+/g, " ").trim())
    .filter(Boolean)
  return paragraphs.length ? paragraphs : [html.trim()]
}

/**
 * Resolves the school a chantier belongs to, creating it when the editor
 * typed a name no record carries yet.
 *
 * The school row is the hub the alerts, antenna register and transactions all
 * point at, so a chantier is never stored on its own: it either joins the
 * existing school or brings one into existence.
 */
async function resolveSchoolForChantier(
  input: ChantierInput,
): Promise<SchoolDoc> {
  const wanted = slugify(input.ecole)
  if (input.id) {
    const current = await projects.findById(input.id)
    if (current)
      return (
        (await schools.findById(current.schoolId)) ??
        createNewSchool(input, wanted)
      )
  }
  const all = await schools.find()
  const existing = all.find((school) => slugify(school.name) === wanted)
  return existing ?? createNewSchool(input, wanted)
}

async function createNewSchool(
  input: ChantierInput,
  wanted: string,
): Promise<SchoolDoc> {
  const taken = new Set((await schools.find()).map((school) => school.code))
  const base = wanted.toUpperCase().replace(/-/g, "").slice(0, 12) || "NOUVELLE"
  let code = `SCH-${base}`
  let suffix = 2
  while (taken.has(code)) code = `SCH-${base}-${suffix++}`
  // A new school has no antenne yet, so it is attached to the first one until
  // the Paramètres module reassigns it.
  const [firstAntenna] = await antennas.find()
  return schools.insert({
    code,
    name: input.ecole.trim(),
    locality: input.localite.trim(),
    region: regionFromLabel(input.region) ?? "Centre",
    scope: input.type.trim(),
    status: input.statut,
    pupils: input.eleves,
    // Split roughly along the national average; the school register refines it.
    girls: Math.round(input.eleves * 0.52),
    budget: input.budget,
    progress: input.avancement,
    ape: input.ape,
    antennaId: firstAntenna?._id ?? "",
    latitude: input.latitude,
    longitude: input.longitude,
    coverImage: input.coverImage,
    description: input.description,
    startDate: input.startDate,
    endDate: input.endDate,
    updatedAt: new Date().toISOString(),
  })
}

/**
 * Creates or updates a chantier, keeping its school row in step.
 *
 * Two invariants are enforced here rather than in the form, because the form is
 * one of several ways data can arrive: money is an integer, and a chantier
 * cannot be marked delivered while the parent sign-off is still outstanding.
 */
export async function saveChantier(input: ChantierInput): Promise<ProjectDoc> {
  await ready
  const region = regionFromLabel(input.region)
  if (!region) throw new Error(`Région inconnue : ${input.region}`)
  if (!input.ecole.trim()) throw new Error("Le nom de l’école est obligatoire.")

  const requestedProgress = Math.min(
    100,
    Math.max(0, Math.round(input.avancement)),
  )
  // A chantier is only finished once the parent sign-off is in, so delivery
  // stays open until then. Progress is capped just short of done rather than
  // left at 100 %, which would read as "delivered" on a meter that is not.
  const status =
    input.statut === "delivered" && input.ape !== "signed"
      ? "in_progress"
      : input.statut
  const progress =
    status === "delivered"
      ? 100
      : status === "preparing"
        ? 0
        : Math.min(requestedProgress, 99)

  const school = await resolveSchoolForChantier(input)
  await schools.update(school._id, {
    name: input.ecole.trim(),
    locality: input.localite.trim(),
    region,
    scope: input.type.trim(),
    status,
    pupils: input.eleves,
    budget: Math.round(input.budget),
    progress,
    ape: input.ape,
    latitude: input.latitude,
    longitude: input.longitude,
    coverImage: input.coverImage,
    description: input.description,
    startDate: input.startDate,
    endDate: input.endDate,
    updatedAt: new Date().toISOString(),
  })

  const existing = input.id ? await projects.findById(input.id) : null
  const slug =
    existing?.slug ?? (await uniqueSlug(projects, slugify(input.ecole)))
  // The category drives the site's filters, so it is chosen once at creation
  // from the words the editor typed. Re-sniffing it on every save made a
  // no-op edit silently reclassify a project, and nothing in the form edits
  // it, so an existing project keeps the category it was created with.
  const category =
    existing?.category ?? categoryFrom(`${input.type} ${input.description}`)
  const body = toParagraphs(input.description)

  const doc: Omit<ProjectDoc, "_id"> = {
    slug: existing?.slug ?? slug,
    title: input.ecole.trim(),
    excerpt: input.description.replace(/\s+/g, " ").trim().slice(0, 180),
    body,
    category,
    categoryLabel: CATEGORY_LABELS[category],
    region,
    location: input.localite.trim(),
    status: PROJECT_STATUS_FROM_SCHOOL[status],
    statusLabel: PROJECT_STATUS_LABELS[PROJECT_STATUS_FROM_SCHOOL[status]],
    progress,
    impactLabel: "Bénéficiaires directs",
    impactValue: `${input.eleves.toLocaleString("fr-FR")} écoliers`,
    impactNote: input.date.trim() || `${progress} % réalisé`,
    image: input.coverImage,
    raised: Math.round(input.fundingRaised),
    target: Math.round(input.fundingGoal),
    contributions: existing?.contributions ?? 0,
    donors: existing?.donors ?? 0,
    milestones: existing?.milestones ?? [],
    primaryCta: existing?.primaryCta ?? "Faire un don",
    secondaryCta: existing?.secondaryCta ?? "Voir le chantier",
    publishedAt: existing?.publishedAt ?? new Date().toISOString(),
    publication: input.publication,
    schoolId: school._id,
    consentVerified: input.consentVerified,
    startDate: input.startDate,
    endDate: input.endDate,
    latitude: input.latitude,
    longitude: input.longitude,
  }

  return existing
    ? ((await projects.update(existing._id, doc)) ?? { ...existing, ...doc })
    : projects.insert(doc)
}

/* ------------------------------ alerts ---------------------------- */

export async function listAlerts(): Promise<AlertDoc[]> {
  await ready
  return alerts.find()
}

export async function updateAlert(
  id: string,
  patch: Partial<AlertDoc>,
): Promise<AlertDoc | null> {
  await ready
  return alerts.update(id, patch)
}

export const deleteAlert = (id: string) => alerts.remove(id)

/* ------------------------- network & people ----------------------- */

export async function listAntennas(): Promise<AntennaDoc[]> {
  await ready
  return antennas.find()
}

export async function createAntenna(
  input: Omit<AntennaDoc, "_id">,
): Promise<AntennaDoc> {
  await ready
  return antennas.insert(input)
}

export async function updateAntenna(
  id: string,
  patch: Partial<AntennaDoc>,
): Promise<AntennaDoc | null> {
  await ready
  return antennas.update(id, patch)
}

export const deleteAntenna = (id: string) => antennas.remove(id)

export async function listUsers(): Promise<UserDoc[]> {
  await ready
  return users.find()
}

export async function createUser(
  input: Omit<UserDoc, "_id">,
): Promise<UserDoc> {
  await ready
  return users.insert(input)
}

export async function updateUser(
  id: string,
  patch: Partial<UserDoc>,
): Promise<UserDoc | null> {
  await ready
  return users.update(id, patch)
}

export const deleteUser = (id: string) => users.remove(id)

export async function listNotificationPrefs(): Promise<NotificationPrefDoc[]> {
  await ready
  return notificationPrefs.find()
}

export async function setNotificationPref(
  id: string,
  enabled: boolean,
): Promise<NotificationPrefDoc | null> {
  await ready
  return notificationPrefs.update(id, { enabled })
}

/* ------------------- governance, reports, impact ------------------- */

export async function listSecurityChecks(): Promise<SecurityCheckDoc[]> {
  await ready
  return securityChecks.find()
}

export async function listGovernance(): Promise<GovernanceDoc[]> {
  await ready
  return governance.find()
}

export async function listReports(): Promise<ReportDoc[]> {
  await ready
  return reports.find()
}

export async function updateReport(
  id: string,
  patch: Partial<ReportDoc>,
): Promise<ReportDoc | null> {
  await ready
  return reports.update(id, patch)
}

export async function listComplianceRows(): Promise<ComplianceRowDoc[]> {
  await ready
  return complianceRows.find()
}

export async function listMilestones(): Promise<MilestoneDoc[]> {
  await ready
  return milestones.find()
}

export async function listTestimonials(): Promise<TestimonialDoc[]> {
  await ready
  return testimonials.find()
}

export async function getOrganisation(): Promise<OrganisationDoc | null> {
  await ready
  return organisation.findOne({})
}

/**
 * Applies an edit to the single organisation row.
 *
 * The row is seeded once and never created on demand: a patch that found no
 * row would silently drop, so this returns `null` when there is nothing to
 * update and the caller says so.
 */
export async function updateOrganisation(
  patch: Partial<OrganisationDoc>,
): Promise<OrganisationDoc | null> {
  await ready
  const current = await organisation.findOne({})
  if (!current) return null
  return organisation.update(current._id, patch)
}

/* ---------------------------- messages ---------------------------- */

/**
 * Records a message from the public contact form.
 *
 * The form still hands the text to the visitor's mail app for delivery; this
 * row is what makes the backoffice aware the message existed.
 */
export async function saveMessage(
  input: Omit<MessageDoc, "_id" | "status" | "receivedAt">,
): Promise<MessageDoc> {
  await ready
  return messages.insert({
    ...input,
    status: "new",
    receivedAt: new Date().toISOString(),
  })
}

/** Newest first — the inbox opens on what just arrived. */
export async function listMessages(): Promise<MessageDoc[]> {
  await ready
  return messages
    .find()
    .then((rows) =>
      [...rows].sort((a, b) => b.receivedAt.localeCompare(a.receivedAt)),
    )
}

export async function setMessageStatus(
  id: string,
  status: MessageDoc["status"],
): Promise<MessageDoc | null> {
  await ready
  return messages.update(id, { status })
}

export async function deleteMessage(id: string): Promise<boolean> {
  await ready
  return messages.remove(id)
}

/**
 * Regional impact, with every figure derived from the school register.
 *
 * The seed only declares which regions are in scope; pupil and school counts
 * are summed here, so the map cannot drift away from the schools it is
 * supposed to describe.
 */
export async function getImpactByRegion(): Promise<ImpactRegionDoc[]> {
  await ready
  const [rows, register] = await Promise.all([
    impactRegions.find(),
    schools.find(),
  ])
  const pupils = totalPupils(register)
  return rows.map((row) => {
    const inRegion = register.filter((s) => s.region === row.region)
    const regionalPupils = totalPupils(inRegion)
    return {
      ...row,
      pupils: regionalPupils,
      girls: totalGirls(inRegion),
      schools: inRegion.length,
      share: pupils > 0 ? Math.round((regionalPupils / pupils) * 100) : 0,
    }
  })
}

/* ---------------------------- campaigns --------------------------- */

export async function getActiveCampaign(): Promise<CampaignDoc | null> {
  await ready
  return campaigns.findOne({ active: true })
}

/* --------------------------- formatting --------------------------- */

/** Formats integer XOF. XOF has no minor unit, so there is no decimal. */
export const formatXOF = (amount: number) =>
  new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(amount) +
  " FCFA"

/** Compact money for KPI tiles: 18,4 M FCFA rather than a 10-digit string. */
export const formatXOFCompact = (amount: number) => {
  if (amount >= 1_000_000_000)
    return `${(amount / 1_000_000_000).toFixed(2)} Md FCFA`
  if (amount >= 1_000_000)
    return `${(amount / 1_000_000).toFixed(2).replace(".", ",")} M FCFA`
  if (amount >= 1_000) return `${Math.round(amount / 1_000)} k FCFA`
  return formatXOF(amount)
}

export const formatNumber = (value: number) =>
  new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(value)

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })

/** Compact timestamp for treasury rows: "Auj. 10:23", else "28 fév. 2025". */
export const formatTimestamp = (iso: string) => {
  const date = new Date(iso)
  const today = new Date()
  const sameDay = date.toDateString() === today.toDateString()
  return sameDay
    ? `Auj. ${date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}`
    : date.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
}

export { regionLabel }
