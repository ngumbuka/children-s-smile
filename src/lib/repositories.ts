/**
 * The app's view of its data.
 *
 * Components call these functions and never touch `db` directly, so the
 * storage engine stays swappable. Contribution totals are recomputed from
 * the transaction ledger rather than trusted from the project document,
 * which keeps the meter honest: a transaction marked `refunded` or
 * `failed` never counts toward a project's progress.
 */

import { db } from './db'
import type { ArticleDoc, ProjectDoc, TransactionDoc, TransactionStatus } from './models'
import { seed } from './seed'

const projects = db.collection<ProjectDoc>('projects')
const articles = db.collection<ArticleDoc>('articles')
const transactions = db.collection<TransactionDoc>('transactions')

export const ready = seed()

const sortByDateDesc = (a: { publishedAt: string }, b: { publishedAt: string }) =>
  b.publishedAt.localeCompare(a.publishedAt)

/* ----------------------------- projects ---------------------------- */

export async function listProjects(): Promise<ProjectDoc[]> {
  await ready
  return projects.find()
}

export async function getProject(slug: string): Promise<ProjectDoc | null> {
  await ready
  return projects.findOne({ slug })
}

export async function createProject(
  input: Omit<ProjectDoc, '_id' | 'progress'>,
): Promise<ProjectDoc> {
  await ready
  return projects.insert({ ...input, progress: pct(input.raised, input.target) })
}

export async function updateProject(id: string, patch: Partial<ProjectDoc>): Promise<ProjectDoc | null> {
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

export async function getArticle(slug: string): Promise<ArticleDoc | null> {
  await ready
  return articles.findOne({ slug })
}

export async function createArticle(input: Omit<ArticleDoc, '_id'>): Promise<ArticleDoc> {
  await ready
  return articles.insert(input)
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

export async function listTransactions(filter: TransactionFilter = {}): Promise<TransactionDoc[]> {
  await ready
  const query: Record<string, unknown> = {}
  if (filter.status) query.status = filter.status
  const rows = await transactions.find(query)
  const q = filter.search?.trim().toLowerCase()
  return rows
    .filter((t) => (filter.projectSlug ? t.projectSlug === filter.projectSlug : true))
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
  const sum = (list: TransactionDoc[]) => list.reduce((acc, t) => acc + t.amount, 0)
  const settled = rows.filter((t) => t.status === 'succeeded')
  return {
    total: sum(settled),
    pending: sum(rows.filter((t) => t.status === 'pending')),
    refunded: sum(rows.filter((t) => t.status === 'refunded')),
    count: rows.length,
    succeeded: settled.length,
    pendingCount: rows.filter((t) => t.status === 'pending').length,
    failedCount: rows.filter((t) => t.status === 'failed').length,
    refundedCount: rows.filter((t) => t.status === 'refunded').length,
    donors: new Set(settled.map((t) => t.donorEmail)).size,
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
  channel: TransactionDoc['channel']
  frequency?: TransactionDoc['frequency']
  status?: TransactionStatus
}): Promise<TransactionDoc> {
  await ready
  const now = new Date().toISOString()
  const settled = input.status === 'succeeded'
  const tx = await transactions.insert({
    reference: `CS-${new Date().getFullYear()}-${String(Math.floor(1000 + Math.random() * 8999))}`,
    projectSlug: input.projectSlug,
    campaignSlug: null,
    donorName: input.donorName,
    donorEmail: input.donorEmail,
    donorCountry: 'Cameroun',
    amount: input.amount,
    currency: 'XOF',
    channel: input.channel,
    frequency: input.frequency ?? 'one_time',
    status: input.status ?? 'succeeded',
    createdAt: now,
    settledAt: settled ? now : null,
  })

  if (input.projectSlug && tx.status === 'succeeded') await applyToProject(input.projectSlug, tx.amount)
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
    settledAt: status === 'pending' ? null : current.settledAt ?? new Date().toISOString(),
  })
  if (current.projectSlug) {
    const was = current.status === 'succeeded' ? current.amount : 0
    const now = status === 'succeeded' ? current.amount : 0
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
  await projects.update(project._id, { raised, progress: pct(raised, project.target) })
}

export const pct = (raised: number, target: number) =>
  target <= 0 ? 0 : Math.min(100, Math.round((raised / target) * 100))

/** Formats integer XOF. XOF has no minor unit, so there is no decimal. */
export const formatXOF = (amount: number) =>
  new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(amount) + ' FCFA'

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
