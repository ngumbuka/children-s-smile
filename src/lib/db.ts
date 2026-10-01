/**
 * Storage-agnostic data access.
 *
 * Every read and write in the app goes through this module, so swapping the
 * in-memory store for MongoDB, Supabase or a REST API is a change to this
 * file alone -- no page or component imports a storage engine directly.
 *
 * The in-memory implementation below is seeded from `seed.ts`, which keeps
 * the site fully functional with no server. `MongoAdapter` documents the
 * shape a real driver has to satisfy; it is intentionally not wired up.
 */

export type Doc = { _id: string } & Record<string, unknown>

export type Query = Record<string, unknown>

export interface Collection<T extends Doc> {
  all(): Promise<T[]>
  find(query?: Query): Promise<T[]>
  findById(id: string): Promise<T | null>
  findOne(query: Query): Promise<T | null>
  count(query?: Query): Promise<number>
  insert(doc: Omit<T, '_id'> & { _id?: string }): Promise<T>
  update(id: string, patch: Partial<T>): Promise<T | null>
  remove(id: string): Promise<boolean>
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

function matches(doc: Doc, query: Query): boolean {
  return Object.entries(query).every(([key, want]) => {
    const got = doc[key]
    if (Array.isArray(want)) return Array.isArray(got) && want.every((w) => got.includes(w))
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
    return [...this.table().values()] as T[]
  }

  async find(query: Query = {}) {
    const keys = Object.keys(query)
    if (!keys.length) return this.all()
    return (await this.all()).filter((d) => matches(d, query))
  }

  async findById(id: string) {
    return (this.table().get(id) as T) ?? null
  }

  async findOne(query: Query) {
    return (await this.find(query))[0] ?? null
  }

  async count(query: Query = {}) {
    return (await this.find(query)).length
  }

  async insert(doc: Omit<T, '_id'> & { _id?: string }) {
    const _id = doc._id ?? nextId()
    const row = { ...doc, _id } as T
    this.table().set(_id, row)
    return row
  }

  async update(id: string, patch: Partial<T>) {
    const cur = this.table().get(id)
    if (!cur) return null
    const row = { ...cur, ...patch, _id: id } as T
    this.table().set(id, row)
    return row
  }

  async remove(id: string) {
    return this.table().delete(id)
  }
}

export const memory: Adapter = {
  collection<T extends Doc>(name: string): Collection<T> {
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

export const projects = db.collection<Doc>('projects')
export const articles = db.collection<Doc>('articles')
export const transactions = db.collection<Doc>('transactions')
export const campaigns = db.collection<Doc>('campaigns')
