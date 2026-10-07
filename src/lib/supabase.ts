/**
 * Supabase bootstrap for production persistence.
 *
 * The app keeps its in-memory store ("db.ts") as the single working set and
 * mirrors every write to Supabase when these variables are present, falling
 * back to the localStorage mirror when they are not (local demo, CI, no
 * server). Only the publishable key ever reaches the browser bundle.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js"

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? ""
const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? ""

export { SUPABASE_URL }

export const supabaseConfigured = Boolean(
  SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY,
)

export const supabase: SupabaseClient | null = supabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY)
  : null