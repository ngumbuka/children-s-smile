/**
 * Storage-agnostic data access.
 *
 * Every read and write in the app goes through this module, so swapping the
 * in-memory store for MongoDB, Supabase or a REST API is a change to this
 * file alone -- no page or component imports a storage engine directly.
 *
 * The in-memory implementation below is seeded from `seed.ts`, which keeps
 * the site fully functional with no server. When a Supabase project is
 * configured (`VITE_SUPABASE_URL` + `VITE_SUPABASE_PUBLISHABLE_KEY`), the
 * same in-memory store becomes the working set: the store hydrates from the
 * `documents` table, writes push through to it, and a realtime subscription
 * keeps multiple tabs in step. Without configuration the store keeps its
 * localStorage mirror, so a local demo and CI need no backend.
 *
 * The store is also the app's single source of truth at runtime: the public
 * site and the `/admin` backoffice read and write the same collections, so a
 * donation recorded on the donation form moves the backoffice's treasury
 * figures. Writes notify subscribers, which is how both views stay in step
 * without either of them knowing the other exists.
 */

import { supabase, supabaseConfigured } from "./supabase"

export type Doc = { _id: string } & Record<string, unknown>

export type Query = Record<string, unknown>

export interface Collection<T extends Doc> {
  all(): Promise<T[]>
  find(query?: Query): Promise<T[]>
  findById(id: string): Promise<T | null>
  findOne(query: Query): Promise<T | null>
  count(query?: Query): Promise<number>
  insert(doc: Omit<T, "_id"> & { _id?: string }): Promise<T>
  update(id: string, patch: Partial<T>): Promise<T | null>
  remove(id: string): Promise<boolean>

  /**
   * Synchronous reads.
   *
   * The backoffice derives whole view models (KPI tiles, treasury breakdowns,
   * status-coloured row sets) in one pass and would otherwise need a loading
   * state for data that is already in memory. These let it read the store
   * directly. A networked driver implements them over a cache it keeps warm
   * from the async methods above; every read still goes through one store.
   */
  snapshot(): T[]
  findSync(query?: Query): T[]
  findByIdSync(id: string): T | null
}

export type Adapter = {
  collection<T extends Doc>(name: string): Collection<T>
}

/* ------------------------------------------------------------------ */
/* In-memory adapter (default, no server required)                      */
/* ------------------------------------------------------------------ */

const store = new Map<string, Map<string, Doc>>()

let counter = 0
const nextId = () => `id_${(++counter).toString(36)}_${Date.now().toString(36)}`

/** Writes queued for the remote store, keyed by collection → ids. */
const dirty = new Map<string, Set<string>>()
/** Rows deleted locally that still exist remotely, keyed by collection → ids. */
const removed = new Map<string, Set<string>>()

function markDirty(name: string, id: string) {
  let ids = dirty.get(name)
  if (!ids) dirty.set(name, (ids = new Set()))
  ids.add(id)
}

function markRemoved(name: string, id: string) {
  let ids = removed.get(name)
  if (!ids) removed.set(name, (ids = new Set()))
  ids.add(id)
  markDirty(name, id)
}

/* ------------------------------------------------------------------ */
/* Change notification                                                  */
/* ------------------------------------------------------------------ */

/**
 * Monotonic write counter. Subscribers compare it to decide whether their
 * query needs re-running, and the snapshot check in `useLiveQuery` uses it to
 * prove a re-render was caused by a write rather than by an unrelated render.
 */
let revision = 0

const subscribers = new Set<() => void>()

/** Subscribes to every write. Returns the unsubscribe function. */
export function subscribe(listener: () => void): () => void {
  subscribers.add(listener)
  return () => {
    subscribers.delete(listener)
  }
}

export const getRevision = () => revision

/** Called after any mutation so every live view re-reads the store. */
function publish() {
  revision += 1
  for (const listener of [...subscribers]) listener()
  persistSoon()
}

/* ------------------------------------------------------------------ */
/* Shared mock database persistence                                    */
/* ------------------------------------------------------------------ */

/**
 * The in-memory store is mirrored to `localStorage` under one versioned key,
 * so edits made in the backoffice survive a reload and are picked up by the
 * public site -- and vice versa. Two tabs share the same snapshot, which is
 * what "one shared mock database" means here:
 *
 *  - every store write schedules a quiet-period save (debounced);
 *  - a save that would leave the stored JSON unchanged is skipped, which is
 *    what stops a tab from echoing its own write back and looping;
 *  - the `storage` event fires only for writes from *another* tab, so the
 *    receiving tab reloads the store and republishes.
 *
 * A real backend replaces `memory` with a networked adapter; the doc comment
 * at the top of this file (and the Mongo sketch below) spells out the shape.
 */

const STORAGE_KEY = "childrensmile.mockdb.v1"

type Snapshot = {
  version: number
  seeded: boolean
  collections: Record<string, Doc[]>
}

/**
 * True once the seed has fully run in this tab, so serialized snapshots
 * advertise that they already contain the canonical data set and hydration
 * can trust an incompletely stocked store comes from the user, not from an
 * interrupted seed.
 */
let seedCompleted = false

/** `seeded` flag of the last snapshot that was hydrated from storage. */
let storedSeedComplete = false

function readSnapshot(): Snapshot | null {
  if (typeof window === "undefined") return null
  let json: string | null = null
  try {
    json = window.localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
  if (!json) return null
  try {
    return JSON.parse(json) as Snapshot
  } catch {
    return null
  }
}

function serialize(): string {
  const collections: Record<string, Doc[]> = {}
  for (const [name, table] of store) collections[name] = [...table.values()]
  return JSON.stringify({ version: 1, seeded: seedCompleted, collections })
}

/**
 * Replaces the whole store with a previously persisted snapshot. Returns true
 * when a snapshot was actually applied, so the caller knows the seed is
 * redundant. A missing, corrupt or outdated snapshot is ignored and the seed
 * refills the store from scratch.
 */
function hydrate(): boolean {
  const snapshot = readSnapshot()
  if (!snapshot || snapshot.version !== 1 || !snapshot.collections) return false
  store.clear()
  for (const [name, docs] of Object.entries(snapshot.collections)) {
    if (!Array.isArray(docs) || !docs.length) continue
    const table = new Map<string, Doc>()
    for (const doc of docs) {
      if (doc && typeof doc._id === "string") table.set(doc._id, doc)
    }
    if (table.size) store.set(name, table)
  }
  storedSeedComplete = snapshot.seeded === true
  // Keep `nextId` ahead of every id it may have read, so a later insert can
  // never collide with a persisted document.
  for (const table of store.values()) {
    for (const id of table.keys()) {
      const match = /^id_(\d+)_/.exec(id)
      if (match) counter = Math.max(counter, Number(match[1]))
    }
  }
  return true
}

let persistTimer: ReturnType<typeof setTimeout> | null = null

/** Persists the store shortly after the most recent write. */
function persistSoon() {
  if (persistTimer !== null) clearTimeout(persistTimer)
  persistTimer = setTimeout(() => {
    persistTimer = null
    persistNow()
  }, 200)
}

/** Writes the store if it differs from what is already on disk. */
function persistNow() {
  if (typeof window === "undefined") return
  if (supabaseConfigured) {
    queueSync()
    return
  }
  const json = serialize()
  try {
    if (window.localStorage.getItem(STORAGE_KEY) === json) return
    window.localStorage.setItem(STORAGE_KEY, json)
  } catch {
    // Storage full or blocked (private mode): the in-memory store still works
    // for this tab, it just stops syncing.
  }
}

/* ------------------------------------------------------------------ */
/* Supabase persistence                                                */
/* ------------------------------------------------------------------ */

let remoteSyncing = false
let remoteSyncPending = false

/** Resolves with `fallback` when the remote operation outlasts `ms`, so a
 *  stalled Supabase can never hold the site in an empty, pre-seed state. */
function withTimeout<T>(promise: PromiseLike<T>, ms: number, fallback: T) {
  return new Promise<T>((resolve) => {
    const timer = setTimeout(() => resolve(fallback), ms)
    promise.then(
      (value) => {
        clearTimeout(timer)
        resolve(value)
      },
      () => {
        clearTimeout(timer)
        resolve(fallback)
      },
    )
  })
}

/** Runs a write against Supabase and returns its error, or a synthetic
 *  "timeout" error when the request stalls past the deadline. */
const remoteError = async <T,>(op: PromiseLike<T>): Promise<unknown> => {
  const outcome = await withTimeout(
    op.then(
      (value) =>
        ({ error: (value as unknown as { error?: unknown }).error ?? null }) as {
          error: unknown
        },
    ),
    10000,
    { error: { message: "timeout" } },
  )
  return outcome.error
}

/** Drains the dirty set, one queue at a time, so overlapping writes coalesce
 *  instead of racing the wire. */
function queueSync() {
  if (remoteSyncing) {
    remoteSyncPending = true
    return
  }
  remoteSyncing = true
  void (async () => {
    do {
      remoteSyncPending = false
      await syncOnce()
    } while (remoteSyncPending)
    remoteSyncing = false
  })()
}

function collectDirty() {
  const upserts: { collection: string; id: string }[] = []
  for (const [name, ids] of dirty) {
    for (const id of ids) upserts.push({ collection: name, id })
  }
  const deletes: { collection: string; id: string }[] = []
  for (const [name, ids] of removed) {
    for (const id of ids) deletes.push({ collection: name, id })
  }
  return { upserts, deletes }
}

/** A failed write keeps its dirty markers so the next persist retries it. */
async function syncOnce() {
  if (!supabase) return
  const queue = collectDirty()
  for (const { collection, id } of queue.deletes) {
    const error = await remoteError(
      supabase
        .from("documents")
        .delete()
        .eq("collection", collection)
        .eq("id", id),
    )
    if (error) return
  }
  for (const { collection, id } of queue.upserts) {
    const doc = store.get(collection)?.get(id)
    if (!doc) continue
    const error = await remoteError(
      supabase
        .from("documents")
        .upsert(
          { collection, id, data: doc, updated_at: new Date().toISOString() },
          { onConflict: "collection,id" },
        ),
    )
    if (error) return
  }
  for (const { collection, id } of queue.upserts) {
    dirty.get(collection)?.delete(id)
  }
  for (const { collection, id } of queue.deletes) {
    removed.get(collection)?.delete(id)
    dirty.get(collection)?.delete(id)
  }
}

/** Replaces the store with the rows already in Supabase; false when the table
 *  is empty or unreachable (first run / offline), which lets the seed
 *  repopulate it and leaves writes queued for the next retry. */
async function hydrateRemote(): Promise<boolean> {
  if (!supabase) return false
  type RemoteRow = { collection: string; id: string; data: Doc }
  const outcome = await withTimeout(
    supabase
      .from("documents")
      .select("collection,id,data")
      .order("collection", { ascending: true })
      .limit(100000)
      .then(
        (value) =>
          ({
            data: (value.data ?? null) as RemoteRow[] | null,
            error: value.error,
          }) as { data: RemoteRow[] | null; error: unknown },
      ),
    6000,
    { data: null, error: { message: "timeout" } },
  )
  if (outcome.error || !outcome.data || outcome.data.length === 0) return false
  store.clear()
  for (const row of outcome.data) {
    let table = store.get(row.collection)
    if (!table) {
      table = new Map()
      store.set(row.collection, table)
    }
    table.set(row.id, row.data as Doc)
    const match = /^id_(\d+)_/.exec(row.id)
    if (match) counter = Math.max(counter, Number(match[1]))
  }
  return true
}

/** Applies a single remote change to the in-memory store, skipping its own
 *  echo and separating the change from a plain re-render. */
function applyRemoteChange(payload: {
  eventType: "INSERT" | "UPDATE" | "DELETE"
  new?: { collection: string; id: string; data: Doc }
  old?: { collection: string; id: string; data: Doc }
}) {
  const name = payload.new?.collection ?? payload.old?.collection
  const id = payload.new?.id ?? payload.old?.id
  if (!name || !id) return
  const table = store.get(name)
  let changed = false
  if (payload.eventType === "DELETE") {
    if (table) changed = table.delete(id)
  } else if (payload.new) {
    const doc = payload.new.data
    const existing = table?.get(id)
    if (!existing || JSON.stringify(existing) !== JSON.stringify(doc)) {
      if (!table) store.set(name, new Map([[id, doc]]))
      else table.set(id, doc)
      changed = true
    }
  }
  if (changed) publish()
}

let remoteInstalled = false

/** Keeps tabs in step through Supabase Realtime instead of localStorage. */
function installRemoteSync() {
  if (remoteInstalled || !supabase) return
  remoteInstalled = true
  try {
    supabase
      .channel("documents")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "documents" },
        (payload) =>
          applyRemoteChange({
            eventType: payload.eventType,
            new: payload.new as
              | { collection: string; id: string; data: Doc }
              | undefined,
            old: payload.old as
              | { collection: string; id: string; data: Doc }
              | undefined,
          }),
      )
      .subscribe()
  } catch {
    // A second copy of this module (a Vite HMR re-transform, or a duplicate
    // module graph node) may already hold the "documents" channel subscribed,
    // so `.on()` after `.subscribe()` throws. Realtime is best-effort: it must
    // never fail the module load above it, or the store would never seed.
  }
}

let crossTabInstalled = false

/** Receives writes made by another tab and reloads the store from them. */
function installCrossTabSync() {
  if (crossTabInstalled || typeof window === "undefined") return
  crossTabInstalled = true
  window.addEventListener("storage", (event) => {
    if (event.key !== STORAGE_KEY) return
    if (!hydrate()) return
    publish()
  })
}

/* ------------------------------------------------------------------ */
/* Seed orchestration                                                  */
/* ------------------------------------------------------------------ */

/**
 * Runs an initialiser exactly once per store, whatever order modules load in.
 *
 * The previous `if (seeded) return` guard was checked before the first
 * `await`, so two importers racing on the first render both saw `seeded ===
 * false` and seeded the collections twice.
 *
 * Hydration happens here, once, before the seed has a chance to run: a
 * persisted snapshot restores the store (its `fill` skips any collection that
 * already has rows, so edits are never overwritten) and the seed is skipped
 * entirely when the snapshot says it had already completed.
 */
const initialisers = new Map<string, Promise<void>>()
const completed = new Set<string>()

/** True once the named initialiser has finished, for views that must not
 *  render an empty result while the seed is still filling collections. */
export function isSeeded(key: string): boolean {
  return completed.has(key)
}

export function seedOnce(
  key: string,
  initialise: () => Promise<void>,
): Promise<void> {
  const running = initialisers.get(key)
  if (running) return running
  const promise = (async () => {
    // Restore a persisted snapshot synchronously when not wired to Supabase.
    // Never let the network gate readiness: seeding is fast, so the site is
    // fully rendered first and the remote store is merged in the background.
    if (!supabaseConfigured && hydrate() && storedSeedComplete) {
      seedCompleted = true
      return
    }
    await initialise()
    seedCompleted = true
    // Save the freshly seeded store right away so a crash before the next
    // debounced write cannot leave a partial snapshot behind.
    persistNow()
    if (!supabaseConfigured) return
    // Remote rows win when they exist; otherwise the seeded rows stay and are
    // pushed up by the sync queue once the table is reachable/created.
    const replaced = await hydrateRemote()
    if (replaced) {
      // The freshly seeded rows must not clobber the remote ones we just
      // loaded, so drop the seed-time dirty/removed markers.
      dirty.clear()
      removed.clear()
      return
    }
    queueSync()
  })().then(() => {
    completed.add(key)
    // Bump the revision so subscribers re-read: readiness changed, but no
    // collection write happened to announce it.
    publish()
  })
  initialisers.set(key, promise)
  return promise
}

try {
  installRemoteSync()
  installCrossTabSync()
} catch {
  // Module-load side effects must never reject this module: a page that
  // reaches here with the store still needs to render and seed.
}

/** Reads a dotted path so a query can address a nested field. */
function readPath(doc: Doc, path: string): unknown {
  if (!path.includes(".")) return doc[path]
  let cursor: unknown = doc
  for (const segment of path.split(".")) {
    if (cursor === null || typeof cursor !== "object") return undefined
    cursor = (cursor as Record<string, unknown>)[segment]
  }
  return cursor
}

function matches(doc: Doc, query: Query): boolean {
  return Object.entries(query).every(([key, want]) => {
    const got = readPath(doc, key)
    if (Array.isArray(want))
      return Array.isArray(got) && want.every((w) => got.includes(w))
    return got === want
  })
}

class MemoryCollection<T extends Doc> implements Collection<T> {
  constructor(private name: string) {}

  private table(): Map<string, Doc> {
    let t = store.get(this.name)
    if (!t) {
      t = new Map()
      store.set(this.name, t)
    }
    return t
  }

  async all() {
    return this.snapshot()
  }

  snapshot() {
    return [...this.table().values()] as T[]
  }

  findSync(query: Query = {}) {
    const keys = Object.keys(query)
    if (!keys.length) return this.snapshot()
    return this.snapshot().filter((d) => matches(d, query))
  }

  findByIdSync(id: string) {
    return this.table().get(id) as T ?? null
  }

  async find(query: Query = {}) {
    return this.findSync(query)
  }

  async findById(id: string) {
    return this.table().get(id) as T ?? null
  }

  async findOne(query: Query) {
    return (await this.find(query))[0] ?? null
  }

  async count(query: Query = {}) {
    return (await this.find(query)).length
  }

  async insert(doc: Omit<T, "_id"> & { _id?: string }) {
    const _id = doc._id ?? nextId()
    const row = { ...doc, _id } as T
    this.table().set(_id, row)
    markDirty(this.name, _id)
    publish()
    return row
  }

  async update(id: string, patch: Partial<T>) {
    const cur = this.table().get(id)
    if (!cur) return null
    const row = { ...cur, ...patch, _id: id } as T
    this.table().set(id, row)
    markDirty(this.name, id)
    publish()
    return row
  }

  async remove(id: string) {
    const removed = this.table().delete(id)
    if (removed) {
      markRemoved(this.name, id)
      publish()
    }
    return removed
  }
}

export const memory: Adapter = {
  collection<T extends Doc,>(name: string): Collection<T> {
    return new MemoryCollection<T>(name)
  },
}

/* ------------------------------------------------------------------ */
/* MongoDB adapter (reference shape -- not wired up)                   */
/* ------------------------------------------------------------------ */
/*
 * To move to MongoDB, implement the same `Collection` interface over the
 * official driver and swap the export below. No call site changes.
 *
 *   import { MongoClient } from 'mongodb'
 *
 *   export function mongo(uri: string): Adapter {
 *     const client = new MongoClient(uri)
 *     return {
 *       collection<T extends Doc>(name: string): Collection<T> {
 *         const col = client.db().collection<T>(name)
 *         return {
 *           all: async () => (await col.find({}).toArray()) as T[],
 *           find: async (q = {}) => (await col.find(q as Filter<T>).toArray()) as T[],
 *           findById: async (id) => (await col.findOne({ _id: id } as Filter<T>)) as T | null,
 *           findOne: async (q) => (await col.findOne(q as Filter<T>)) as T | null,
 *           count: async (q = {}) => await col.countDocuments(q as Filter<T>),
 *           insert: async (doc) => {
 *             const row = { ...doc, _id: doc._id ?? new ObjectId().toHexString() } as T
 *             await col.insertOne(row as Document)
 *             return row
 *           },
 *           update: async (id, patch) => {
 *             const r = await col.findOneAndUpdate({ _id: id } as Filter<T>, { $set: patch })
 *             return (r ?? null) as T | null
 *           },
 *           remove: async (id) => (await col.deleteOne({ _id: id } as Filter<T>)).deletedCount > 0,
 *         }
 *       },
 *     }
 *   }
 *
 * Money is stored in integer XOF (no decimals, no float rounding) and dates
 * as ISO strings, so both survive a round trip unchanged.
 */

/* ------------------------------------------------------------------ */
/* Active adapter                                                     */
/* ------------------------------------------------------------------ */

export const db = memory

/* ------------------------------------------------------------------ */
/* Collections                                                          */
/* ------------------------------------------------------------------ */

/**
 * Every document type in the app lives here, once. The public site reads
 * projects, articles, transactions, campaigns and schools; the backoffice
 * additionally owns the network, people and governance collections.
 */
export const projects = db.collection<Doc>("projects")
export const articles = db.collection<Doc>("articles")
export const transactions = db.collection<Doc>("transactions")
export const campaigns = db.collection<Doc>("campaigns")
export const schools = db.collection<Doc>("schools")
export const alerts = db.collection<Doc>("alerts")
export const antennas = db.collection<Doc>("antennas")
export const users = db.collection<Doc>("users")
export const notificationPrefs = db.collection<Doc>("notificationPrefs")
export const securityChecks = db.collection<Doc>("securityChecks")
export const governance = db.collection<Doc>("governance")
export const reports = db.collection<Doc>("reports")
export const complianceRows = db.collection<Doc>("complianceRows")
export const milestones = db.collection<Doc>("milestones")
export const testimonials = db.collection<Doc>("testimonials")
export const impactRegions = db.collection<Doc>("impactRegions")
export const organisation = db.collection<Doc>("organisation")
/** Messages sent from the public contact form. Starts empty; not seeded. */
export const messages = db.collection<Doc>("messages")
