/** Document shapes. These are the contract the Mongo adapter will keep. */

export type Category = 'school' | 'water' | 'books' | 'health'

export type ProjectStatus = 'delivered' | 'in_progress' | 'preparing'

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
}

export type ArticleCategory = 'field' | 'stories' | 'education' | 'protection' | 'association' | 'official'

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
}

/** A money movement. `pending` means the payment channel has not confirmed. */
export type TransactionStatus = 'succeeded' | 'pending' | 'failed' | 'refunded'

export type TransactionDoc = {
  _id: string
  reference: string
  projectSlug: string | null
  campaignSlug: string | null
  donorName: string
  donorEmail: string
  donorCountry: string
  amount: number
  currency: 'XOF' | 'EUR' | 'USD'
  channel: 'mobile' | 'card' | 'bank' | 'sepa'
  frequency: 'one_time' | 'monthly'
  status: TransactionStatus
  createdAt: string
  /** Populated once a channel confirms; null while pending. */
  settledAt: string | null
}

export const ARTICLE_CATEGORY_LABELS: Record<ArticleCategory, string> = {
  field: 'Sur le terrain',
  stories: 'Histoires humaines',
  education: 'Éducation & Pédagogie',
  protection: "Protection & Santé de l'enfant",
  association: "Vie de l'association & Partenariats",
  official: 'Communiqués officiels',
}
