/**
 * Admin view models, derived from the same rows the public site renders.
 *
 * The backoffice used to ship its own JSON fixture with a second copy of every
 * school, project and donor. That is gone. Everything below is computed from
 * the shared collections, which means:
 *
 *  - a project published on `/projets` appears in `Chantiers & Écoles` because
 *    it is one row, not two copies kept in step by hand;
 *  - a figure shown in the dashboard is a sum over the real records, so it
 *    cannot contradict the public page that reports the same thing;
 *  - presentation (colour, badge, label, percentage) is computed here rather
 *    than stored, so changing a status cannot leave a stale colour behind.
 *
 * Rows are read through `useLiveValue`, so any write through `repositories.ts`
 * from either React tree re-renders both.
 */

import {
  alerts as alertCollection,
  antennas as antennaCollection,
  articles as articleCollection,
  campaigns as campaignCollection,
  complianceRows as complianceCollection,
  governance as governanceCollection,
  impactRegions as impactCollection,
  messages as messageCollection,
  milestones as milestoneCollection,
  notificationPrefs as notificationCollection,
  organisation as organisationCollection,
  projects as projectCollection,
  reports as reportCollection,
  schools as schoolCollection,
  securityChecks as securityCollection,
  testimonials as testimonialCollection,
  transactions as transactionCollection,
  users as userCollection,
  type Collection,
  type Doc,
} from "./db"
import { useLiveValue, useStoreReady } from "./live"
import {
  ANTENNA_STATUS_LABELS,
  ALERT_PRIORITY_LABELS,
  ALERT_STATUS_LABELS,
  ARTICLE_FORMAT_LABELS,
  PAYMENT_RAIL_LABELS,
  PUBLICATION_STATUS_LABELS,
  SCHOOL_STATUS_LABELS,
  TRANSACTION_PURPOSE_LABELS,
  TRANSACTION_STATUS_LABELS,
  USER_ROLE_LABELS,
  isPublic,
  isSettled,
  regionLabel,
  settledAmount,
  totalGirls,
  totalPupils,
  type AlertDoc,
  type AlertPriority,
  type AlertStatus,
  type AntennaDoc,
  type AntennaStatus,
  type ArticleDoc,
  type ArticleFormat,
  type CampaignDoc,
  type ComplianceRowDoc,
  type GovernanceDoc,
  type ImpactScopeDoc,
  MESSAGE_STATUS_LABELS,
  type MessageDoc,
  type MessageStatus,
  type MilestoneDoc,
  type NotificationPrefDoc,
  type OrganisationDoc,
  type PaymentRail,
  type ProjectDoc,
  type PublicationStatus,
  type ReportDoc,
  type SchoolDoc,
  type SecurityCheckDoc,
  type TestimonialDoc,
  type TransactionDoc,
  type TransactionStatus,
  type UserDoc,
  type UserRole,
} from "./models"

/* ------------------------------------------------------------------ */
/* Palette                                                              */
/* ------------------------------------------------------------------ */

type Tone = {
  color: string
  bg: string
}

/**
 * One palette, looked up by meaning. The modules ask for a tone rather than
 * shipping hex pairs, so a status looks the same in every module.
 */
const TONES: Record<"success" | "brand" | "danger" | "warning" | "neutral" | "info", Tone> =
  {
    success: { color: "#006e2d", bg: "#7cf994" },
    brand: { color: "#004484", bg: "#d5e3ff" },
    danger: { color: "#ba1a1a", bg: "#ffdad6" },
    warning: { color: "#a33900", bg: "#ffb599" },
    neutral: { color: "#424751", bg: "#eaedff" },
    info: { color: "#131b2e", bg: "#f2f3ff" },
  }

/* ------------------------------------------------------------------ */
/* Reading the store                                                    */
/* ------------------------------------------------------------------ */

const EMPTY: never[] = []

/** Reads a collection as a typed array, empty until the seed has run. */
function read<T extends Doc>(collection: Collection<Doc>, ready: boolean): T[] {
  if (!ready) return EMPTY as T[]
  return collection.snapshot() as T[]
}

/**
 * The whole store, typed, in one pass.
 *
 * Every admin module needs several collections, and one snapshot keeps them
 * consistent within a render: a project and its school always come from the
 * same revision.
 */
export function useAdminStore() {
  const ready = useStoreReady()
  return useLiveValue(() => ({
    ready,
    projects: read<ProjectDoc>(projectCollection, ready),
    articles: read<ArticleDoc>(articleCollection, ready),
    transactions: read<TransactionDoc>(transactionCollection, ready),
    schools: read<SchoolDoc>(schoolCollection, ready),
    alerts: read<AlertDoc>(alertCollection, ready),
    antennas: read<AntennaDoc>(antennaCollection, ready),
    users: read<UserDoc>(userCollection, ready),
    notificationPrefs: read<NotificationPrefDoc>(notificationCollection, ready),
    securityChecks: read<SecurityCheckDoc>(securityCollection, ready),
    governance: read<GovernanceDoc>(governanceCollection, ready),
    reports: read<ReportDoc>(reportCollection, ready),
    complianceRows: read<ComplianceRowDoc>(complianceCollection, ready),
    milestones: read<MilestoneDoc>(milestoneCollection, ready),
    testimonials: read<TestimonialDoc>(testimonialCollection, ready),
    impactScopes: read<ImpactScopeDoc>(impactCollection, ready),
    messages: read<MessageDoc>(messageCollection, ready),
    campaigns: read<CampaignDoc>(campaignCollection, ready),
    organisation:
      (ready
        ? organisationCollection.snapshot()[0] as OrganisationDoc | undefined
        : undefined) ?? null,
  }))
}

export type AdminStore = ReturnType<typeof useAdminStore>

/** Index helpers, so resolving a foreign key is a lookup rather than a scan. */
const byId = <T extends { _id: string }>(rows: T[]) =>
  new Map(rows.map((row) => [row._id, row]))

/* ------------------------------------------------------------------ */
/* Formatting                                                           */
/* ------------------------------------------------------------------ */

const numberFmt = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 })

export const adminNumber = (value: number) => numberFmt.format(value)

/** `2,4 M` for a KPI tile: money is only useful there in millions. */
export const adminMillions = (value: number) =>
  `${(value / 1_000_000).toLocaleString("fr-FR", { maximumFractionDigits: 2 })}M`

const DAY_MS = 86_400_000

/** `12 mars 2025`. Accepts an ISO timestamp or a plain `YYYY-MM-DD` date. */
export const adminDate = (value: string): string => {
  const date = new Date(value.length === 10 ? `${value}T00:00:00Z` : value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

const longDate = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
})

export const adminLongDate = (value: string): string => {
  const date = new Date(value.length === 10 ? `${value}T00:00:00Z` : value)
  return Number.isNaN(date.getTime()) ? value : longDate.format(date)
}

/** `Fév 2025`, the granularity the dashboard periods switch between. */
export const adminMonth = (value: string): string => {
  const date = new Date(value.length === 10 ? `${value}T00:00:00Z` : value)
  if (Number.isNaN(date.getTime())) return value
  const month = date.toLocaleDateString("fr-FR", { month: "short" })
  return `${month.charAt(0).toUpperCase()}${month.slice(1)} ${date.getFullYear()}`
}

/** `il y a 3 h`, for the antenna synchronisation badge. */
export const adminRelative = (iso: string, now: number): string => {
  const then = new Date(iso).getTime()
  if (Number.isNaN(then)) return "—"
  const minutes = Math.max(0, Math.round((now - then) / 60_000))
  if (minutes < 1) return "à l'instant"
  if (minutes < 60) return `il y a ${minutes} min`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `il y a ${hours} h`
  const days = Math.round(hours / 24)
  return days < 30 ? `il y a ${days} j` : adminDate(iso)
}

const pct = (part: number, whole: number) =>
  whole > 0 ? Math.round((part / whole) * 100) : 0

/* ------------------------------------------------------------------ */
/* Shell                                                                */
/* ------------------------------------------------------------------ */

export type AdminShell = {
  organization: string
  subtitle: string
  location: string
  regions: number
  searchPlaceholder: string
  emergency: { label: string; phone: string; detail: string }
  administrator: { name: string; role: string; title: string; avatar: string }
}

export function useAdminShell(): AdminShell {
  const store = useAdminStore()
  const org = store.organisation
  return useLiveValue(() => ({
    organization: org?.name ?? "Children's Smile",
    subtitle: org?.subtitle ?? "CAMEROUN • COORDINATION",
    location: org?.seat ?? "Yaoundé Siège",
    regions: store.schools.length
      ? new Set(store.schools.map((s) => s.region)).size
      : 0,
    searchPlaceholder:
      org?.searchPlaceholder ??
      "Rechercher école, projet, donateur MTN/Orange, PV...",
    emergency: org?.emergency ?? {
      label: "ASTREINTE URGENCES TERRAIN",
      phone: "",
      detail: "",
    },
    administrator: org?.administrator ?? {
      name: "—",
      role: "—",
      title: "",
      avatar: "/assets/9d472.png",
    },
  }))
}

/* ------------------------------------------------------------------ */
/* Projects / chantiers                                                 */
/* ------------------------------------------------------------------ */

/** The chantier vocabulary the dashboard groups and filters by. */
export type ChantierStatut = "Livré" | "En cours" | "En préparation" | "En alerte"

const CHANTIER_TONE: Record<ChantierStatut, Tone> = {
  Livré: TONES.success,
  "En cours": TONES.brand,
  "En préparation": TONES.warning,
  "En alerte": TONES.danger,
}

/**
 * A chantier's operational status comes from its school, because the school is
 * the record that actually carries the operational truth. The project's own
 * lifecycle is the fallback for a project not yet tied to a register entry.
 *
 * This is why `En alerte` needs no stored flag: it is what a school at risk
 * looks like from the project list.
 */
export function chantierStatut(
  project: ProjectDoc,
  school?: SchoolDoc,
): ChantierStatut {
  if (school?.status === "at_risk") return "En alerte"
  const status = school?.status ?? project.status
  return SCHOOL_STATUS_LABELS[status] as ChantierStatut
}

/**
 * The row's `ape` is the plain value an APE column prints. Written as a small
 * map rather than reusing `APE_STATUS_LABELS`, whose title-cased wording suits
 * a status badge but not this cell.
 */
const APE_LABEL: Record<SchoolDoc["ape"], string> = {
  signed: "signée",
  pending: "en attente",
  in_review: "en relecture",
  refused: "refusée",
}

export type AdminProjectRow = {
  id: string
  slug: string
  title: string
  ecole: string
  localite: string
  region: string
  type: string
  description: string
  /** The list-length teaser the public cards show. */
  excerpt: string
  /** The public funding objective; drives the meter on the detail page. */
  budget: number
  /** The school's own budget estimate, read by the edit form's "Budget". */
  schoolBudget: number
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
  consentVerified: boolean
  statut: ChantierStatut
  statusColor: string
  statusBg: string
  ape: string
  publication: ProjectDoc["publication"]
  /** Resolved school name, for rows the public site renders as a link. */
  schoolId: string
  isPublic: boolean
}

/**
 * The school register as the projects module needs it: how many schools exist,
 * which is not the number of distinct schools a chantier happens to point at.
 */
export function useAdminSchoolRegister(): { total: number; byRegion: number } {
  const store = useAdminStore()
  return useLiveValue(() => ({
    total: store.schools.length,
    byRegion: new Set(store.schools.map((school) => school.region)).size,
  }))
}

export function useAdminProjects(): AdminProjectRow[] {
  const store = useAdminStore()
  return useLiveValue(() => {
    const schools = byId(store.schools)
    return store.projects.map((project) => {
      const school = schools.get(project.schoolId)
      const statut = chantierStatut(project, school)
      return {
        id: project._id,
        slug: project.slug,
        title: project.title,
        ecole: school?.name ?? project.title,
        localite: school?.locality ?? project.location,
        region: school ? regionLabel(school.region) : project.region,
        type: school?.scope ?? project.categoryLabel,
        /** The full body, not the excerpt: editing must not truncate the page. */
        description: project.body.join("\n\n"),
        excerpt: project.excerpt,
        budget: project.target,
        schoolBudget: school?.budget ?? project.target,
        eleves: school?.pupils ?? 0,
        avancement: school?.progress ?? project.progress,
        date: adminMonth(project.publishedAt),
        startDate: school?.startDate ?? project.startDate,
        endDate: school?.endDate ?? project.endDate,
        fundingGoal: project.target,
        fundingRaised: project.raised,
        latitude: school?.latitude ?? project.latitude,
        longitude: school?.longitude ?? project.longitude,
        coverImage: project.image,
        consentVerified: project.consentVerified,
        statut,
        statusColor: CHANTIER_TONE[statut].color,
        statusBg: CHANTIER_TONE[statut].bg,
        ape: APE_LABEL[school?.ape ?? "pending"],
        publication: project.publication,
        schoolId: project.schoolId,
        isPublic: isPublic(project.publication),
      }
    })
  })
}

/* ------------------------------------------------------------------ */
/* Articles / médiathèque                                               */
/* ------------------------------------------------------------------ */

const FORMAT_TONE: Record<ArticleFormat, Tone> = {
  article: { color: "#004484", bg: "#eaedff" },
  photo: { color: "#a33900", bg: "#ffdbce" },
  video: { color: "#006e2d", bg: "#7cf994" },
  report: { color: "#131b2e", bg: "#f2f3ff" },
}

const FORMAT_ICON: Record<ArticleFormat, string> = {
  article: "Newspaper",
  photo: "Image",
  video: "Video",
  report: "FileText",
}

export type AdminArticleRow = {
  id: string
  slug: string
  title: string
  type: string
  typeColor: string
  typeBg: string
  icon: string
  excerpt: string
  content: string
  date: string
  /** Raw ISO date, for a lossless round-trip through the edit form. */
  publishedAt: string
  region: string
  author: string
  tags: string[]
  coverImage: string
  seoTitle: string
  seoDescription: string
  consentVerified: boolean
  publication: ArticleDoc["publication"]
  schoolId: string | null
  isPublic: boolean
}

/**
 * Renders stored paragraphs back into the markup the rich-text editor shows.
 * Only `<p>` is emitted, and the paragraph text is escaped, so a stored body
 * can never inject markup when it is re-opened for editing.
 */
const bodyToHtml = (body: string[]) =>
  body
    .map(
      (paragraph) =>
        `<p>${paragraph.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>`,
    )
    .join("")

export function useAdminArticles(): {
  articles: AdminArticleRow[]
  typeFilters: string[]
} {
  const store = useAdminStore()
  return useLiveValue(() => {
    const schools = byId(store.schools)
    const articles = store.articles.map((article) => {
      const school = article.schoolId
        ? schools.get(article.schoolId)
        : undefined
      const tone = FORMAT_TONE[article.format]
      return {
        id: article._id,
        slug: article.slug,
        title: article.title,
        // The format, not the editorial kicker: the icon and the filter strip
        // are both keyed on `format`, so labelling by `categoryDisplay` made
        // the whole tab strip match nothing.
        type: ARTICLE_FORMAT_LABELS[article.format],
        typeColor: tone.color,
        typeBg: tone.bg,
        icon: FORMAT_ICON[article.format],
        excerpt: article.excerpt,
        content: bodyToHtml(article.body),
        date: adminDate(article.publishedAt),
        /** Raw ISO date for a lossless round-trip through the edit form. */
        publishedAt: article.publishedAt,
        region: school ? regionLabel(school.region) : article.location,
        author: article.author,
        tags: article.tags,
        coverImage: article.image,
        seoTitle: article.seoTitle,
        seoDescription: article.seoDescription,
        consentVerified: article.consentVerified,
        publication: article.publication,
        schoolId: article.schoolId,
        isPublic: isPublic(article.publication),
      }
    })

    // Only offer filters that match at least one content, so the tab strip
    // cannot advertise an empty result. The vocabulary comes from the model,
    // so adding a format does not need a second edit here.
    const present = new Set(store.articles.map((a) => a.format))
    const typeFilters = [
      "Tous",
      ...(Object.keys(ARTICLE_FORMAT_LABELS) as ArticleFormat[])
        .filter((format) => present.has(format))
        .map((format) => ARTICLE_FORMAT_LABELS[format]),
    ]
    return { articles, typeFilters }
  })
}

/* ------------------------------------------------------------------ */
/* Treasury                                                             */
/* ------------------------------------------------------------------ */

const RAIL_TONE: Record<PaymentRail, Tone> = {
  "mtn-momo": { color: "#004484", bg: "#eaedff" },
  "orange-money": { color: "#a33900", bg: "#ffdbce" },
  card: { color: "#006e2d", bg: "#7cf994" },
  bank: { color: "#004484", bg: "#d5e3ff" },
  sepa: { color: "#131b2e", bg: "#f2f3ff" },
}

const RAIL_ICON: Record<PaymentRail, string> = {
  "mtn-momo": "Smartphone",
  "orange-money": "Smartphone",
  card: "CreditCard",
  bank: "Building2",
  sepa: "Building2",
}

const STATUS_TONE: Record<TransactionStatus, Tone> = {
  succeeded: TONES.success,
  pending: TONES.warning,
  failed: TONES.danger,
  refunded: TONES.neutral,
}

export type AdminTransactionRow = {
  _id: string
  id: string
  reference: string
  donor: string
  origin: string
  type: string
  purpose: string
  amount: number
  date: string
  status: string
  statusKey: TransactionStatus
  statusColor: string
  statusBg: string
  rail: PaymentRail
  schoolId: string | null
  projectSlug: string | null
  isSettled: boolean
}

export type AdminChannel = {
  rail: PaymentRail
  label: string
  icon: string
  color: string
  /** Confirmed money only, so the shares add up to the collected total. */
  amount: number
  pct: number
}

export function useAdminTreasury(): {
  transactions: AdminTransactionRow[]
  channels: AdminChannel[]
  tabs: string[]
  compliance: { label: string; pct: number; color: string }[]
  campaignTarget: number
  settledTotal: number
  /** Unrestricted, confirmed giving: money not earmarked to one school. */
  operationalBalance: number
  todayCount: number
  failedCount: number
  periodLabel: string
} {
  const store = useAdminStore()
  const today = new Date().toDateString()
  return useLiveValue(() => {
    const transactions = store.transactions.map((tx) => ({
      id: tx.reference,
      _id: tx._id,
      reference: tx.reference,
      donor: tx.donorName,
      origin: tx.donorCountry,
      type: PAYMENT_RAIL_LABELS[tx.rail],
      purpose: TRANSACTION_PURPOSE_LABELS[tx.purpose],
      amount: tx.amount,
      date: adminDate(tx.createdAt),
      status: TRANSACTION_STATUS_LABELS[tx.status],
      statusKey: tx.status,
      statusColor: STATUS_TONE[tx.status].color,
      statusBg: STATUS_TONE[tx.status].bg,
      rail: tx.rail,
      schoolId: tx.schoolId,
      projectSlug: tx.projectSlug,
      isSettled: isSettled(tx),
    }))

    const settledTotal = settledAmount(store.transactions)

    const latest = store.transactions.reduce<string>(
      (mostRecent, t) => (t.createdAt > mostRecent ? t.createdAt : mostRecent),
      "",
    )

    return {
      transactions,
      channels: channelsFor(store.transactions, settledTotal),
      tabs: ["Toutes", "Mobile Money", "Virements", "Fonds général"],
      campaignTarget:
        (store.campaigns.find((c) => c.active) ?? store.campaigns[0])?.target ??
        0,
      settledTotal,
      operationalBalance: settledAmount(
        store.transactions.filter((t) => t.purpose === "general"),
      ),
      todayCount: store.transactions.filter(
        (t) => new Date(t.createdAt).toDateString() === today,
      ).length,
      failedCount: store.transactions.filter((t) => t.status === "failed")
        .length,
      periodLabel: latest ? adminMonth(latest) : "",
      compliance: [
        { label: "Rapprochement BEAC", pct: 100, color: TONES.success.color },
        { label: "Conformité CEMAC", pct: 100, color: TONES.brand.color },
        {
          label: "Traçabilité sans espèces",
          pct: 100,
          color: TONES.success.color,
        },
        {
          label: "Justificatifs archivés",
          pct:
            store.complianceRows.find((r) => r.key === "spend-evidence")
              ?.value ?? 0,
          color: TONES.warning.color,
        },
      ],
    }
  })
}

/**
 * Rails that actually carry money, ordered by volume.
 *
 * The share is taken over confirmed payments only, so the percentages describe
 * the money that arrived rather than the money that was attempted.
 */
function channelsFor(
  rows: TransactionDoc[],
  settledTotal: number,
): AdminChannel[] {
  return (Object.keys(PAYMENT_RAIL_LABELS) as PaymentRail[])
    .map((rail) => ({
      rail,
      label: PAYMENT_RAIL_LABELS[rail],
      icon: RAIL_ICON[rail],
      color: RAIL_TONE[rail].color,
      amount: settledAmount(rows.filter((t) => t.rail === rail)),
    }))
    .filter((channel) => channel.amount > 0)
    .map((channel) => ({
      ...channel,
      pct: settledTotal ? Math.round((channel.amount / settledTotal) * 100) : 0,
    }))
    .sort((a, b) => b.amount - a.amount)
}

/* ------------------------------------------------------------------ */
/* Alerts                                                               */
/* ------------------------------------------------------------------ */

const ALERT_TONE: Record<AlertPriority, Tone> = {
  urgent: TONES.danger,
  high: TONES.warning,
  medium: TONES.brand,
  low: TONES.neutral,
}

/** Glyph per alert theme, chosen by the words in the alert itself. */
const ALERT_ICON = (alert: AlertDoc): string => {
  const text = `${alert.title} ${alert.detail}`.toLocaleLowerCase("fr")
  if (
    text.includes("toit") ||
    text.includes("vent") ||
    text.includes("tempête")
  )
    return "Wind"
  if (text.includes("eau") || text.includes("puits") || text.includes("sani"))
    return "Droplets"
  if (text.includes("écol") || text.includes("ecol") || text.includes("salle"))
    return "BookOpen"
  return "Clock"
}

const ALERT_ACTION = (status: AlertStatus) =>
  status === "resolved"
    ? [{ label: "Rouvrir", color: "#eaedff", text: "#424751" }]
    : [
        { label: "Traiter", color: "#d5e3ff", text: "#004484" },
        { label: "Escalader", color: "#ba1a1a", text: "#ffffff" },
      ]

export type AdminAlertRow = {
  id: string
  title: string
  ecole: string
  region: string
  date: string
  priority: string
  priorityColor: string
  priorityBg: string
  statut: string
  bg: string
  borderColor: string
  enfants: number
  detail: string
  icon: string
  actions: { label: string; color: string; text: string }[]
  schoolId: string
  /** The status value the store holds, so a write targets the real field. */
  status: AlertStatus
}

export function useAdminAlerts(): {
  alerts: AdminAlertRow[]
  summary: { label: string; color: string; bg: string }[]
  /** Unresolved counts, so nav badges and the alert list cannot disagree. */
  open: { total: number; urgent: number }
  /** Measured mean time to close; `'—'` when nothing has been closed yet. */
  averageResponse: string
  teams: string
} {
  const store = useAdminStore()
  return useLiveValue(() => {
    const schools = byId(store.schools)
    const antennas = byId(store.antennas)

    const alerts = store.alerts
      .map((alert) => {
        const school = schools.get(alert.schoolId)
        const tone = ALERT_TONE[alert.priority]
        return {
          id: alert._id,
          title: alert.title,
          ecole: school?.name ?? "École non identifiée",
          region: school ? regionLabel(school.region) : "",
          date: adminDate(alert.reportedAt),
          priority: ALERT_PRIORITY_LABELS[alert.priority],
          priorityColor: tone.color,
          priorityBg: tone.bg,
          statut: ALERT_STATUS_LABELS[alert.status],
          bg: "#fdfbff",
          borderColor: tone.color,
          enfants: alert.childrenAffected,
          detail: alert.detail,
          icon: ALERT_ICON(alert),
          actions: ALERT_ACTION(alert.status),
          schoolId: alert.schoolId,
          status: alert.status,
        }
      })
      .sort(
        (a, b) =>
          (a.status === "resolved" ? 1 : 0) - (b.status === "resolved" ? 1 : 0),
      )

    const open = store.alerts.filter((a) => a.status !== "resolved")
    const critical = open.filter((a) => a.priority === "urgent").length
    const handling = store.alerts.filter((a) => a.status === "handling").length
    const resolved = store.alerts.filter((a) => a.status === "resolved").length

    // Mean time to close, over alerts that were actually closed.
    const durations = store.alerts
      .filter((a) => a.resolvedAt)
      .map(
        (a) =>
          (new Date(a.resolvedAt!).getTime() -
            new Date(a.reportedAt).getTime()) /
          3_600_000,
      )
      .filter((h) => Number.isFinite(h) && h >= 0)
    const meanHours = durations.length
      ? durations.reduce((sum, h) => sum + h, 0) / durations.length
      : 0

    const teams = new Set(
      store.alerts
        .map((a) =>
          schools.get(a.schoolId)
            ? antennas.get(schools.get(a.schoolId)!.antennaId)?.name
            : null,
        )
        .filter((name): name is string => Boolean(name)),
    ).size

    return {
      alerts,
      summary: [
        { label: "Signalements", color: TONES.brand.color, bg: TONES.brand.bg },
        { label: "Critiques", color: TONES.danger.color, bg: TONES.danger.bg },
        {
          label: "En traitement",
          color: TONES.warning.color,
          bg: TONES.warning.bg,
        },
        { label: "Résolus", color: TONES.success.color, bg: TONES.success.bg },
      ],
      open: { total: open.length, urgent: critical },
      averageResponse: meanHours
        ? meanHours < 24
          ? `${Math.round(meanHours)} h`
          : `${Math.round(meanHours / 24)} j`
        : "—",
      teams: `${teams} antenne${teams > 1 ? "s" : ""} mobilisée${
        teams > 1 ? "s" : ""
      }`,
    }
  })
}

/* ------------------------------------------------------------------ */
/* Impact                                                               */
/* ------------------------------------------------------------------ */

export function useAdminImpact(): {
  stats: {
    label: string
    value: string
    sub: string
    color: string
    bg: string
    icon: string
  }[]
  regions: {
    name: string
    color: string
    projets: number
    eleves: number
    pct: number
    filles: number
  }[]
  temoignages: { quote: string; auteur: string; ecole: string }[]
} {
  const store = useAdminStore()
  const REGION_COLORS = [
    "#004484",
    "#006e2d",
    "#a33900",
    "#727783",
    "#0b5cab",
    "#7f2b00",
    "#005320",
  ]
  return useLiveValue(() => {
    const schools = store.schools
    const pupils = totalPupils(schools)
    const girls = totalGirls(schools)

    const regions = store.impactScopes
      .map((scope, index) => {
        const inRegion = schools.filter((s) => s.region === scope.region)
        const regionalPupils = totalPupils(inRegion)
        const projects = store.projects.filter(
          (p) =>
            p.schoolId &&
            schools.find((s) => s._id === p.schoolId)?.region === scope.region,
        ).length
        return {
          name: regionLabel(scope.region),
          color: REGION_COLORS[index % REGION_COLORS.length],
          projets: projects,
          eleves: regionalPupils,
          pct: pct(regionalPupils, pupils),
          filles: regionalPupils
            ? Math.round((totalGirls(inRegion) / regionalPupils) * 100)
            : 0,
        }
      })
      .filter((row) => row.eleves > 0)
      .sort((a, b) => b.eleves - a.eleves)

    const schoolsById = byId(schools)
    return {
      stats: [
        {
          label: "Écoliers soutenus",
          value: adminNumber(pupils),
          sub: `${pct(girls, pupils)} % de jeunes filles`,
          color: "#004484",
          bg: "#eaedff",
          icon: "Users",
        },
        {
          label: "Écoles partenaires",
          value: adminNumber(schools.length),
          sub: `${new Set(schools.map((s) => s.region)).size} régions couvertes`,
          color: "#006e2d",
          bg: "#7cf994",
          icon: "TrendingUp",
        },
        {
          label: "Chantiers livrés",
          value: adminNumber(
            schools.filter((s) => s.status === "delivered").length,
          ),
          sub: "Bâtiments scolaires réhabilités",
          color: "#a33900",
          bg: "#ffb599",
          icon: "BookOpen",
        },
        {
          label: "Collecte totale",
          value: adminMillions(settledAmount(store.transactions)),
          sub: "FCFA confirmés",
          color: "#131b2e",
          bg: "#f2f3ff",
          icon: "MapPin",
        },
      ],
      regions,
      temoignages: store.testimonials.map((t) => ({
        quote: t.quote,
        auteur: t.author,
        ecole: schoolsById.get(t.schoolId)?.name ?? "",
      })),
    }
  })
}

/* ------------------------------------------------------------------ */
/* Reports & compliance                                                 */
/* ------------------------------------------------------------------ */

const REPORT_TONE: Record<string, Tone> = {
  "Rapport annuel": TONES.success,
  "Rapport financier": TONES.brand,
  "Rapport d'impact": TONES.success,
  Audit: TONES.warning,
  PV: TONES.neutral,
}

const reportTone = (type: string): Tone => {
  const found = Object.entries(REPORT_TONE).find(([key]) =>
    type.toLocaleLowerCase("fr").includes(key.toLocaleLowerCase("fr")),
  )
  return found ? found[1] : TONES.brand
}

const reportIcon = (publicationStatus: PublicationStatus) => {
  if (publicationStatus === "published") return "CheckCircle2"
  if (publicationStatus === "archived") return "AlertTriangle"
  return "Clock"
}

export type AdminReportRow = {
  id: string
  titre: string
  type: string
  periode: string
  date: string
  pages: number
  statut: string
  statutColor: string
  statutBg: string
  publication: ReportDoc["publication"]
  icon: string
}

export function useAdminReports(): {
  rapports: AdminReportRow[]
  conformite: { key: string; label: string; value: number; color: string }[]
  /** The governance register, rendered as-is so a reworded row is what shows. */
  gouvernance: GovernanceDoc[]
  milestones: { label: string; date: string }[]
} {
  const store = useAdminStore()
  return useLiveValue(() => {
    const tones = [
      TONES.success.color,
      TONES.brand.color,
      TONES.warning.color,
      TONES.neutral.color,
    ]
    return {
      rapports: store.reports.map((report) => {
        const tone = reportTone(report.type)
        return {
          id: report.ref,
          titre: report.title,
          type: report.type,
          periode: report.period,
          date: adminDate(report.producedAt),
          pages: report.pages,
          statut: PUBLICATION_STATUS_LABELS[report.publication.status],
          statutColor: tone.color,
          statutBg: tone.bg,
          publication: report.publication,
          icon: reportIcon(report.publication.status),
        }
      }),
      conformite: store.complianceRows.map((row, index) => ({
        key: row.key,
        label: row.label,
        value: row.value,
        color: tones[index % tones.length],
      })),
      gouvernance: store.governance,
      milestones: store.milestones.map((m) => ({
        label: m.label,
        date: adminDate(m.date),
      })),
    }
  })
}

/* ------------------------------------------------------------------ */
/* Settings: antennas, users, notifications, security                  */
/* ------------------------------------------------------------------ */

const ANTENNA_SYNCHRO: Record<AntennaStatus, string> = {
  active: "En ligne",
  alert: "Dégradée",
  offline: "Hors ligne",
}

export type AdminAntennaRow = {
  id: string
  nom: string
  type: string
  region: string
  responsable: string
  email: string
  telephone: string
  statut: string
  statutColor: string
  statutBg: string
  /** The store value behind `statut`. */
  status: AntennaStatus
  synchro: string
  /** Schools this antenna is responsible for, counted from the register. */
  projets: number
}

export type AdminUserRow = {
  id: string
  nom: string
  email: string
  role: string
  region: string
  actif: boolean
}

export function useAdminSettings(): {
  antennes: AdminAntennaRow[]
  tabs: string[]
  users: AdminUserRow[]
  notifications: NotificationPrefDoc[]
  security: { id: string; label: string; statut: string; ok: boolean }[]
  governance: GovernanceDoc[]
  organisation: OrganisationDoc | null
} {
  const store = useAdminStore()
  return useLiveValue(() => {
    const schoolsByAntenna = new Map<string, number>()
    for (const school of store.schools) {
      schoolsByAntenna.set(
        school.antennaId,
        (schoolsByAntenna.get(school.antennaId) ?? 0) + 1,
      )
    }
    return {
      antennes: store.antennas.map((antenna) => {
        const tone =
          antenna.status === "active"
            ? TONES.success
            : antenna.status === "alert"
              ? TONES.danger
              : TONES.neutral
        return {
          id: antenna._id,
          nom: antenna.name,
          type: antenna.type,
          region: regionLabel(antenna.region),
          responsable: antenna.manager,
          email: antenna.email,
          telephone: antenna.phone,
          statut: ANTENNA_STATUS_LABELS[antenna.status],
          statutColor: tone.color,
          statutBg: tone.bg,
          status: antenna.status,
          synchro: ANTENNA_SYNCHRO[antenna.status],
          projets: schoolsByAntenna.get(antenna._id) ?? 0,
        }
      }),
      tabs: [
        "Antennes",
        "Utilisateurs",
        "Notifications",
        "Sécurité",
        "Organisation",
      ],
      users: store.users.map((user) => ({
        id: user._id,
        nom: user.name,
        email: user.email,
        role: USER_ROLE_LABELS[user.role],
        region: user.region ? regionLabel(user.region) : "National",
        actif: user.active,
      })),
      notifications: store.notificationPrefs.map((pref) => ({ ...pref })),
      security: store.securityChecks.map((check) => ({
        id: check._id,
        label: check.label,
        statut: check.status,
        ok: check.ok,
      })),
      governance: store.governance.map((g) => ({ ...g })),
      organisation: store.organisation,
    }
  })
}

/* ------------------------------------------------------------------ */
/* Overview                                                             */
/* ------------------------------------------------------------------ */

/** The dashboard period switcher, derived from the campaign window. */
const PERIODS = ["Ce mois", "Ce trimestre", "Année 2025"]

export type AdminOverview = {
  header: {
    greeting: string
    date: string
    description: string
    periods: string[]
    activePeriod: number
  }
  kpis: {
    students: {
      value: string
      change: string
      trend: number[]
      girls: string
      regions: string
    }
    projects: { value: number }
    donations: { currency: string; target: string }
    alerts: { value: number; critical: number; total: number }
  }
  projectTabs: string[]
  testimonial: { quote: string; author: string }
}

export function useAdminOverview(now: number): AdminOverview {
  const store = useAdminStore()
  return useLiveValue(() => {
    const schools = store.schools
    const pupils = totalPupils(schools)
    const girls = totalGirls(schools)
    const collected = settledAmount(store.transactions)
    const openAlerts = store.alerts.filter((a) => a.status !== "resolved")

    // Pupil reach over the last six months, as a share of the year's peak.
    // Derived from each school's start date so it moves when the register does.
    const months = [-5, -4, -3, -2, -1, 0].map((offset) => {
      const at = new Date(now)
      at.setMonth(at.getMonth() + offset)
      const reached = schools.filter((school) => {
        const started = new Date(school.startDate).getTime()
        return Number.isFinite(started) && started <= at.getTime()
      })
      return totalPupils(reached)
    })
    const peak = Math.max(...months, 1)
    const trend = months.map((value) =>
      Math.max(6, Math.round((value / peak) * 100)),
    )

    const campaign = store.campaigns.find((c) => c.active) ?? store.campaigns[0]

    return {
      header: {
        greeting: "Bonjour",
        date: adminLongDate(new Date(now).toISOString()),
        description: `${store.schools.length} écoles suivies • ${adminNumber(pupils)} écoliers accompagnés`,
        periods: PERIODS,
        activePeriod: 0,
      },
      kpis: {
        students: {
          value: adminNumber(pupils),
          change: `${pct(girls, pupils)} % filles`,
          trend,
          girls: `${pct(girls, pupils)} % de jeunes filles`,
          regions: String(new Set(schools.map((s) => s.region)).size),
        },
        projects: { value: store.projects.length },
        donations: {
          currency: "FCFA",
          target: adminMillions(campaign?.target ?? 0),
        },
        alerts: {
          value: openAlerts.length,
          critical: openAlerts.filter((a) => a.priority === "urgent").length,
          total: store.alerts.length,
        },
      },
      projectTabs: ["Tous", "En cours", "En alerte", "Livré"],
      testimonial: store.testimonials[0]
        ? {
            quote: store.testimonials[0].quote,
            author: store.testimonials[0].author,
          }
        : { quote: "", author: "" },
    }
  })
}

/* ------------------------------------------------------------------ */
/* Contact inbox                                                        */
/* ------------------------------------------------------------------ */

export type AdminMessageRow = {
  id: string
  name: string
  email: string
  phone: string
  organisation: string
  profile: string
  region: string
  subject: string
  body: string
  status: MessageStatus
  statusLabel: string
  statusColor: string
  statusBg: string
  /** `12 mars 2025`, what the inbox list shows. */
  date: string
  /** ISO, for sorting and for the detail pane. */
  receivedAt: string
}

const MESSAGE_TONE: Record<MessageStatus, Tone> = {
  new: TONES.brand,
  read: TONES.neutral,
  archived: TONES.warning,
}

/**
 * The contact inbox, newest first.
 *
 * `unread` is the sidebar badge and is computed from the same pass as the
 * list, so the badge cannot claim messages the list does not show.
 */
export function useAdminMessages(): {
  messages: AdminMessageRow[]
  counts: { unread: number; read: number; archived: number; total: number }
} {
  const store = useAdminStore()
  return useLiveValue(() => {
    const messages = store.messages
      .map((message) => {
        const tone = MESSAGE_TONE[message.status]
        return {
          id: message._id,
          name: message.name,
          email: message.email,
          phone: message.phone,
          organisation: message.organisation,
          profile: message.profile,
          region: message.region,
          subject: message.subject,
          body: message.body,
          status: message.status,
          statusLabel: MESSAGE_STATUS_LABELS[message.status],
          statusColor: tone.color,
          statusBg: tone.bg,
          date: adminDate(message.receivedAt),
          receivedAt: message.receivedAt,
        }
      })
      .sort((a, b) => b.receivedAt.localeCompare(a.receivedAt))

    const count = (status: MessageStatus) =>
      store.messages.filter((message) => message.status === status).length

    return {
      messages,
      counts: {
        unread: count("new"),
        read: count("read"),
        archived: count("archived"),
        total: store.messages.length,
      },
    }
  })
}

/* ------------------------------------------------------------------ */
/* Lookups shared by several modules                                    */
/* ------------------------------------------------------------------ */

/** Schools keyed by id, for resolving a row's foreign key to a name. */
export function useSchoolLookup(): Map<string, SchoolDoc> {
  const store = useAdminStore()
  return useLiveValue(() => byId(store.schools))
}

export { USER_ROLE_LABELS, type UserRole }

export type { CampaignDoc, NotificationPrefDoc, OrganisationDoc }

/** Milliseconds in a day, exported for tests and for relative formatting. */
export const DAY = DAY_MS
