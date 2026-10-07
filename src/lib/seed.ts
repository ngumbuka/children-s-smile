import { db, seedOnce } from "./db"
import { buildSeedRows, type SeedRow } from "./seedData"

/**
 * Loads the canonical mock dataset into the in-memory store exactly once
 * ("core" bootstrap).
 *
 * This is the **local/demo** bootstrap: in a Supabase build the store is
 * hydrated straight from the `documents` table and this module never runs —
 * see the orchestration in `seedOnce`. The rows come from `seedData`, the
 * same module `pnpm migrate:supabase` pushes upstream when a fresh database
 * needs populating.
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