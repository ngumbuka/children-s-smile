import { db, seedOnce } from "./db"
import { buildSeedRows, type SeedRow } from "./seedData"

/**
 * Loads the canonical dataset into the in-memory store exactly once
 * ("core" bootstrap). The rows come from `seedData`, the same module the
 * Supabase migration script pushes upstream, so the remote snapshot and the
 * store can never disagree about what the mock DB contains.
 */
export async function seed() {
  await seedOnce("core", async () => {
    const byCollection = new Map<string, SeedRow[]>()
    for (const row of buildSeedRows()) {
      const list = byCollection.get(row.collection)
      if (list) list.push(row)
      else byCollection.set(row.collection, [row])
    }
    for (const [name, rows] of byCollection) {
      const collection = db.collection<{ _id: string }>(name)
      if ((await collection.count()) > 0) continue
      for (const row of rows) {
        await collection.insert(row.data as unknown as { _id: string })
      }
    }
  })
}