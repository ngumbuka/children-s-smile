/**
 * The one document contract for the whole app.
 *
 * Public pages and the `/admin` backoffice are two views over these documents,
 * not two datasets. Everything that is *shared* lives here exactly once, and
 * the admin derives its presentation (badges, colours, KPI tiles) from the
 * same records the public site renders rather than keeping its own copy.
 *
 * The hub is `SchoolDoc`: a physical school site. Projects, articles,
 * transactions and alerts all point at a school, which is what lets the
 * backoffice answer "what happened at this school" from data the public site
 * already publishes.
 *
 * These are the shapes the Mongo adapter will keep: money is always integer
 * XOF and dates are always ISO strings, so both survive a round trip.
 */

/* ------------------------------------------------------------------ */
/* Shared vocabularies                                                  */
/* ------------------------------------------------------------------ */

export const CAMEROON_REGIONS = [
  "Adamaoua",
  "Centre",
  "East",
  "Far North",
  "Littoral",
  "North",
  "North-West",
  "West",
  "South",
  "South-West",
] as const

export type Region = typeof CAMEROON_REGIONS[number]

/**
 * The organisation's French region labels. The ten regions are canonical
 * (`CAMEROON_REGIONS`) because they key the maps, the antenna network and the
 * regional filters; these are what readers see.
 */
export const REGION_LABELS: Record<Region, string> = {
  Adamaoua: "Adamaoua",
  Centre: "Centre",
  East: "Est",
  "Far North": "Extrême-Nord",
  Littoral: "Littoral",
  North: "Nord",
  "North-West": "Nord-Ouest",
  West: "Ouest",
  South: "Sud",
  "South-West": "Sud-Ouest",
}

export const regionLabel = (region: string) =>
  REGION_LABELS[(region as Region)] ?? region

/**
 * Resolves a label written by a user back to a `Region` key.
 *
 * The forms offer the French label (`Sud-Ouest`) because that is what the
 * organisation publishes, while records store the stable key
 * (`South-West`). Returns null when the text matches no region, so a caller can
 * reject it rather than store an unknown region.
 */
export function regionFromLabel(label: string): Region | null {
  const wanted = label.trim().toLocaleLowerCase("fr")
  if (!wanted) return null
  const entry = (Object.keys(REGION_LABELS) as Region[]).find(
    (key) =>
      key.toLocaleLowerCase("fr") === wanted ||
      REGION_LABELS[key].toLocaleLowerCase("fr") === wanted,
  )
  return entry ?? null
}

export type Category = "school" | "water" | "books" | "health"

export const CATEGORY_LABELS: Record<Category, string> = {
  school: "Écoles & Salles de classe",
  water: "Eau potable & WASH",
  books: "Bibliothèques & Livres",
  health: "Santé & Secours",
}

/** Publication lifecycle, shared by projects and articles. */
export type PublicationStatus = "draft" | "review" | "scheduled" | "published" | "archived"

export const PUBLICATION_STATUS_LABELS: Record<PublicationStatus, string> = {
  draft: "Brouillon",
  review: "En relecture",
  scheduled: "Programmé",
  published: "Publié",
  archived: "Archivé",
}

export type Publication = {
  status: PublicationStatus
  /** The public site only renders records that are published AND visible. */
  visible: boolean
  featured: boolean
}

/* ------------------------------------------------------------------ */
/* Projects (public campaigns)                                          */
/* ------------------------------------------------------------------ */

export type ProjectStatus = "delivered" | "in_progress" | "preparing"

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  delivered: "Réalisé & Livré",
  in_progress: "En cours",
  preparing: "En préparation",
}

export type ProjectDoc = {
  _id: string
  slug: string
  title: string
  excerpt: string
  body: string[]
  category: Category
  categoryLabel: string
  region: string
  location: string
  status: ProjectStatus
  statusLabel: string
  /** 0-100, derived from raised/target. Kept for cheap list rendering. */
  progress: number
  impactLabel: string
  impactValue: string
  impactNote: string
  image: string
  /** Integer XOF. Money is never a float. */
  raised: number
  target: number
  contributions: number
  donors: number
  milestones: { label: string; done: boolean }[]
  primaryCta: string
  secondaryCta: string
  publishedAt: string
  publication: Publication
  /** The school this campaign funds. The backoffice groups work by school. */
  schoolId: string
  /** Consent for the children's images is a publication precondition. */
  consentVerified: boolean
  /** ISO dates or empty when the chantier has not been scheduled yet. */
  startDate: string
  endDate: string
  latitude: string
  longitude: string
}

/* ------------------------------------------------------------------ */
/* Articles (public news)                                               */
/* ------------------------------------------------------------------ */

export type ArticleCategory = "field" | "stories" | "education" | "protection" | "association" | "official"

export const ARTICLE_CATEGORY_LABELS: Record<ArticleCategory, string> = {
  field: "Sur le terrain",
  stories: "Histoires humaines",
  education: "Éducation & Pédagogie",
  protection: "Protection & Santé de l'enfant",
  association: "Vie de l'association & Partenariats",
  official: "Communiqués officiels",
}

export type ArticleDoc = {
  _id: string
  slug: string
  title: string
  excerpt: string
  body: string[]
  categories: ArticleCategory[]
  categoryDisplay: string
  kicker: string
  location: string
  /** ISO date; display formatting stays in the view. */
  publishedAt: string
  readingMinutes: number
  /** Present only for downloadable communiqués. */
  document?: { label: string; sizeMb: number }
  image: string
  featured: boolean
  stats: { value: string; label: string }[]
  relatedProjects: string[]
  publication: Publication
  /* ---- fields the backoffice edits and the public site does not show ---- */
  /** The school this article is about, when it is about one. */
  schoolId: string | null
  author: string
  /** Media desk classification, drives the backoffice filters. */
  format: ArticleFormat
  tags: string[]
  seoTitle: string
  seoDescription: string
  consentVerified: boolean
}

export type ArticleFormat = "article" | "photo" | "video" | "report"

export const ARTICLE_FORMAT_LABELS: Record<ArticleFormat, string> = {
  article: "Article",
  photo: "Reportage Photo",
  video: "Vidéo",
  report: "Rapport",
}

/* ------------------------------------------------------------------ */
/* Schools (the hub)                                                    */
/* ------------------------------------------------------------------ */

export type SchoolStatus = "delivered" | "in_progress" | "at_risk" | "preparing"

export const SCHOOL_STATUS_LABELS: Record<SchoolStatus, string> = {
  delivered: "Livré",
  in_progress: "En cours",
  at_risk: "En alerte",
  preparing: "En préparation",
}

/**
 * Sign-off progress. `signed` is the gate for delivery, so the backoffice
 * refuses to mark a chantier delivered while the APE is still `review`.
 */
export type ApeStatus = "pending" | "in_review" | "signed" | "refused"

export const APE_STATUS_LABELS: Record<ApeStatus, string> = {
  pending: "En attente",
  in_review: "En relecture",
  signed: "Signée",
  refused: "Refusée",
}

export type SchoolDoc = {
  _id: string
  /** Short human code, e.g. `SCH-DIMAKO`. Stable across renames. */
  code: string
  name: string
  locality: string
  region: Region
  /** Free-text scope of work, e.g. "Réhabilitation 3 classes & toiture". */
  scope: string
  status: SchoolStatus
  pupils: number
  girls: number
  /** Integer XOF: the cost of the works on site. */
  budget: number
  /** 0-100 completion of the works. */
  progress: number
  /** How far the parent/chief sign-off has progressed, required before delivery. */
  ape: ApeStatus
  /** The antenna that supervises this school. */
  antennaId: string
  latitude: string
  longitude: string
  coverImage: string
  description: string
  /** ISO dates; empty when unscheduled. */
  startDate: string
  endDate: string
  updatedAt: string
}

/* ------------------------------------------------------------------ */
/* Alerts (backoffice)                                                  */
/* ------------------------------------------------------------------ */

export type AlertStatus = "open" | "handling" | "resolved"

export const ALERT_STATUS_LABELS: Record<AlertStatus, string> = {
  open: "Ouvert",
  handling: "Traitement",
  resolved: "Résolu",
}

export type AlertPriority = "urgent" | "high" | "medium" | "low"

export const ALERT_PRIORITY_LABELS: Record<AlertPriority, string> = {
  urgent: "URGENT",
  high: "Haute",
  medium: "Moyenne",
  low: "Basse",
}

export type AlertDoc = {
  _id: string
  ref: string
  title: string
  detail: string
  schoolId: string
  status: AlertStatus
  priority: AlertPriority
  /** Children affected, copied from the school at report time. */
  childrenAffected: number
  reportedAt: string
  resolvedAt: string | null
}

/* ------------------------------------------------------------------ */
/* Transactions                                                         */
/* ------------------------------------------------------------------ */

/** A money movement. `pending` means the payment channel has not confirmed. */
export type TransactionStatus = "succeeded" | "pending" | "failed" | "refunded"

export const TRANSACTION_STATUS_LABELS: Record<TransactionStatus, string> = {
  succeeded: "Confirmé",
  pending: "En attente",
  failed: "Échoué",
  refunded: "Remboursé",
}

/** What the money was given for; drives the treasury breakdown. */
export type TransactionPurpose = "school" | "water" | "books" | "health" | "general"

export const TRANSACTION_PURPOSE_LABELS: Record<TransactionPurpose, string> = {
  school: "Scolarité & Bourses",
  water: "Eau & Assainissement",
  books: "Bibliothèques",
  health: "Santé Scolaire",
  general: "Fonds Général",
}

export type TransactionDoc = {
  _id: string
  reference: string
  projectSlug: string | null
  campaignSlug: string | null
  /** Set when the gift was earmarked for one school. */
  schoolId: string | null
  donorName: string
  donorEmail: string
  donorCountry: string
  amount: number
  currency: "XOF" | "EUR" | "USD"
  /** The rail the money moved on. Mobile operators stay distinct because the
   *  treasury reconciles MTN MoMo and Orange Money against different reports. */
  rail: PaymentRail
  frequency: "one_time" | "monthly"
  status: TransactionStatus
  purpose: TransactionPurpose
  createdAt: string
  /** Populated once a channel confirms; null while pending. */
  settledAt: string | null
}

/** Payment rails, with the provider the treasury reconciles against. */
export type PaymentRail = "mtn-momo" | "orange-money" | "card" | "bank" | "sepa"

export const PAYMENT_RAIL_LABELS: Record<PaymentRail, string> = {
  "mtn-momo": "MTN MoMo",
  "orange-money": "Orange Money",
  card: "Carte bancaire",
  bank: "Virement bancaire",
  sepa: "SEPA",
}

/* ------------------------------------------------------------------ */
/* Campaigns (the annual fundraising goal)                              */
/* ------------------------------------------------------------------ */

export type CampaignDoc = {
  _id: string
  slug: string
  title: string
  /** Integer XOF. */
  target: number
  startsAt: string
  endsAt: string
  active: boolean
}

/* ------------------------------------------------------------------ */
/* Network, people and governance (backoffice only)                    */
/* ------------------------------------------------------------------ */

export type AntennaStatus = "active" | "alert" | "offline"

export const ANTENNA_STATUS_LABELS: Record<AntennaStatus, string> = {
  active: "Actif",
  alert: "Alerte",
  offline: "Hors ligne",
}

export type AntennaDoc = {
  _id: string
  code: string
  name: string
  type: string
  region: Region
  manager: string
  email: string
  phone: string
  status: AntennaStatus
  /** ISO timestamp of the last successful synchronisation. */
  lastSyncAt: string
}

export type UserRole = "super_admin" | "antenna_admin" | "editor" | "auditor"

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  super_admin: "Super Admin",
  antenna_admin: "Admin Antenne",
  editor: "Éditeur",
  auditor: "Commissaire aux comptes",
}

export type UserDoc = {
  _id: string
  name: string
  email: string
  role: UserRole
  /** `null` for national roles that are not scoped to one region. */
  region: Region | null
  active: boolean
  /** The antenna this user administers, when they are scoped to one. */
  antennaId: string | null
  /** Supabase Auth user id (set by the `manage-users` edge function). */
  authId?: string
}

export type NotificationPrefDoc = {
  _id: string
  key: string
  label: string
  description: string
  enabled: boolean
}

export type SecurityCheckDoc = {
  _id: string
  key: string
  label: string
  status: string
  ok: boolean
}

export type GovernanceDoc = {
  _id: string
  title: string
  detail: string
  /** Links the claim to the evidence the backoffice publishes. */
  articleSlug: string | null
}

export type ReportDoc = {
  _id: string
  ref: string
  title: string
  type: string
  period: string
  pages: number
  /** ISO date the report was produced. */
  producedAt: string
  publication: Publication
}

/**
 * A compliance indicator.
 *
 * `key` is the stable handle: the label is French prose an editor may reword,
 * and matching on it has already made two panels read a stored 96 % as 0 %.
 */
export type ComplianceRowDoc = {
  _id: string
  key: string
  label: string
  /** 0-100. */
  value: number
}

export type MilestoneDoc = {
  _id: string
  label: string
  date: string
}

export type TestimonialDoc = {
  _id: string
  quote: string
  author: string
  schoolId: string
}

/**
 * The stored row: which regions are in scope. Counts are derived when read,
 * so the regional map cannot drift from the school register.
 */
export type ImpactScopeDoc = {
  _id: string
  region: Region
}

/** A scope row with every figure derived from the schools in that region. */
export type ImpactRegionDoc = ImpactScopeDoc & {
  pupils: number
  girls: number
  schools: number
  /** 0-100 share of the national pupil total. */
  share: number
}

/** Organisation-level facts shown in the admin shell. */
export type OrganisationDoc = {
  _id: string
  name: string
  subtitle: string
  seat: string
  legalApproval: string
  /** Accountants keep emergency contact here rather than hardcoding it. */
  emergency: { label: string; phone: string; detail: string }
  administrator: { name: string; role: string; title: string; avatar: string }
  searchPlaceholder: string
  /**
   * Contact points the public footer and contact page render.
   *
   * The phone numbers are repeated in older page mock-ups; only the shared
   * chrome (footer, contact form) reads them from here so a number change
   * does not have to be hunted down across every page.
   */
  contact: { email: string; phones: string[]; whatsapp: string }
}

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

export type MessageStatus = "new" | "read" | "archived"

export const MESSAGE_STATUS_LABELS: Record<MessageStatus, string> = {
  new: "Nouveau",
  read: "Lu",
  archived: "Archivé",
}

/**
 * A message sent from the public contact form.
 *
 * The form still hands the text to the visitor's mail app — that is what
 * actually delivers it with no server — but the row is written first so the
 * backoffice sees what was sent, from where, and by whom.
 */
export type MessageDoc = {
  _id: string
  name: string
  email: string
  phone: string
  organisation: string
  /** Key of `PROFILE_LABELS` on the contact form, e.g. `parent`. */
  profile: string
  region: string
  subject: string
  body: string
  status: MessageStatus
  /** ISO timestamp of arrival. */
  receivedAt: string
}

/* ------------------------------------------------------------------ */
/* Derivation helpers                                                   */
/* ------------------------------------------------------------------ */

/** Pupils reached, summed over the schools in scope. */
export const totalPupils = (schools: { pupils: number }[]) =>
  schools.reduce((sum, s) => sum + s.pupils, 0)

export const totalGirls = (schools: { girls: number }[]) =>
  schools.reduce((sum, s) => sum + s.girls, 0)

export const regionsCovered = (rows: { region: string }[]) =>
  new Set(rows.map((r) => r.region)).size

/** Schools with no publications are not part of the public programme. */
export const isPublic = (publication: Publication) =>
  publication.status === "published" && publication.visible

/**
 * Money in the bank, as opposed to money in the ledger.
 *
 * A pending, failed or refunded row is a record of an attempt, not a
 * collection, so no total that claims to be "collected" may include it. This
 * was spelled out inline in half a dozen places and the views had drifted
 * apart, so the rule lives here once.
 */
export const isSettled = (row: { status: TransactionStatus }) =>
  row.status === "succeeded"

export const settledAmount = (
  rows: readonly { amount: number; status: TransactionStatus }[],
): number => rows.filter(isSettled).reduce((sum, t) => sum + t.amount, 0)
