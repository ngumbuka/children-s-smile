/**
 * One-shot, idempotent migration of the canonical mock DB into the Supabase
 * `documents` table.
 *
 * Rows are the exact output of `buildSeedRows()` in `src/lib/seedData.ts` —
 * the same rows the app itself seeds with — so the remote snapshot and the
 * mocked store can never drift. Running it twice converges to the same rows
 * thanks to the `(collection, id)` upsert.
 *
 * The secret key is read from the environment at run time and is never part
 * of the repository or the browser bundle. The table itself must already
 * exist: apply `supabase/migrations/0001_documents.sql` (and, for the
 * role-gated write path, `0002_auth_roles.sql`) in the Supabase SQL editor
 * first, then run this.
 *
 * Usage:
 *   SUPABASE_URL=<url> SUPABASE_SECRET_KEY=<secret key> \
 *     node scripts/seed-supabase.cjs
 *
 * Or, when the `credentials` file is present (gitignored), simply:
 *   node scripts/seed-supabase.cjs
 */
"use strict"

const { createClient } = require("@supabase/supabase-js")
const fs = require("node:fs")
const path = require("node:path")

// The pure, compiled dataset module lives next to this script (see the
// `migrate:supabase` npm script: it runs `tsc` over seedData.ts/models.ts,
// and pins that folder to CommonJS via a local package.json).
const generated = path.join(__dirname, ".generated")
const { buildSeedRows } = require(path.join(generated, "seedData.js"))

let url = process.env.SUPABASE_URL ?? ""
let secret = process.env.SUPABASE_SECRET_KEY ?? ""
if (!url || !secret) {
  // Fall back to the gitignored `credentials` scratchpad.
  const credsPath = path.join(__dirname, "..", "credentials")
  if (fs.existsSync(credsPath)) {
    const text = fs.readFileSync(credsPath, "utf8")
    if (!url) url = /SUPABASE_URL=(\S+)/.exec(text)?.[1] ?? ""
    if (!secret)
      secret = /SUPABASE_SECRET_KEY=(\S+)/.exec(text)?.[1] ?? ""
  }
}
if (!url || !secret) {
  console.error(
    "SUPABASE_URL and SUPABASE_SECRET_KEY are required (env or credentials file).",
  )
  process.exit(2)
}

/** Reads upstream and returns false when the `documents` table is missing
 *  (migration not applied yet) so the message tells them what to do. */
async function tableExists(client) {
  const { error } = await client
    .from("documents")
    .select("collection", { count: "exact", head: true })
    .limit(1)
  if (!error) return true
  if (error.code === "PGRST205" || /Could not find the table/.test(error.message)) {
    console.error(
      "La table public.documents n'existe pas encore. Appliquez d'abord\n" +
        "  supabase/migrations/0001_documents.sql\n" +
        "dans l'éditeur SQL Supabase, puis relancez cette commande.",
    )
    return false
  }
  console.error(`Relevé en vérifiant la table : ${error.message}`)
  return false
}

async function main() {
  const client = createClient(url, secret)
  if (!(await tableExists(client))) process.exit(1)

  const rows = buildSeedRows()
  console.log(`Canonical dataset : ${rows.length} lignes.`)
  const byCollection = new Map()
  for (const row of rows) {
    const list = byCollection.get(row.collection) ?? []
    list.push(row)
    byCollection.set(row.collection, list)
  }

  // PostgREST accepts a bounded number of rows per INSERT; 200 is safe
  // for the varargs form and keeps a single payload under the headers limit.
  for (const [collection, list] of byCollection) {
    for (let i = 0; i < list.length; i += 200) {
      const batch = list
        .slice(i, i + 200)
        .map((row) => ({
          collection: row.collection,
          id: row.id,
          data: row.data,
          updated_at: new Date().toISOString(),
        }))
      const { error } = await client
        .from("documents")
        .upsert(batch, { onConflict: "collection,id" })
      if (error) {
        console.error(
          `Échec sur « ${collection} » (lignes ${i + 1}–${i + batch.length}) : ${error.message}`,
        )
        process.exit(1)
      }
    }
    process.stdout.write(
      `  ${String(collection).padEnd(18)} ${String(list.length).padStart(4)} lignes\n`,
    )
  }

  const { count, error } = await client
    .from("documents")
    .select("collection", { count: "exact", head: true })
  if (error) {
    console.error(`Vérification impossible : ${error.message}`)
    process.exit(1)
  }
  console.log(`\nTerminé : ${count} lignes dans public.documents.`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})