// Sign Cloudinary uploads for the backoffice image picker.
//
// The browser may never hold `CLOUDINARY_API_SECRET`, so the secret is read
// here, at runtime, from the function's env, and each upload gets a short-lived
// HMAC-style signature computed over the parameters the client will actually
// send. The caller only ever sees the signature, timestamp, public id and the
// (non-secret) API key.
//
// Deployment:
//   supabase secrets set CLOUDINARY_API_KEY=<key>
//   supabase secrets set CLOUDINARY_API_SECRET=<secret>
//   supabase secrets set CLOUDINARY_CLOUD_NAME=<cloud>
//   supabase secrets set CLOUDINARY_FOLDER=childrensmile   # optional
//   supabase functions deploy cloudinary-sign
//
// Callers are restricted to authenticated backoffice roles that may write
// (super_admin, antenna_admin, editor), resolved from the caller's JWT against
// the shared `users` collection — same gate `app_can_write()` uses in RLS.

import { createClient } from "jsr:@supabase/supabase-js@2"

const WRITE_ROLES = ["super_admin", "antenna_admin", "editor"]

const service = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  { auth: { autoRefreshToken: false, persistSession: false } },
)

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  })

async function callerCanWrite(authHeader: string | null): Promise<boolean> {
  if (!authHeader?.startsWith("Bearer ")) return false
  const caller = await service.auth.getUser(authHeader.slice(7))
  const email = caller.data.user?.email?.toLocaleLowerCase("fr")
  if (!email) return false
  const { data } = await service
    .from("documents")
    .select("data")
    .eq("collection", "users")
    .limit(1000)
  const row = (data ?? []).find(
    (doc: { data: Record<string, unknown> }) =>
      String(doc.data?.email ?? "").toLocaleLowerCase("fr") === email,
  )
  const profile = row?.data as { role?: string; active?: boolean } | undefined
  return (
    profile?.active !== false && WRITE_ROLES.includes(profile?.role ?? "")
  )
}

/** SHA-1 hex of `input`, the algorithm Cloudinary expects for signatures. */
async function sha1hex(input: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-1",
    new TextEncoder().encode(input),
  )
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
}

Deno.serve(async (request: Request) => {
  if (request.method !== "POST") return json(405, { error: "Méthode non autorisée." })
  const apiKey = Deno.env.get("CLOUDINARY_API_KEY")
  const apiSecret = Deno.env.get("CLOUDINARY_API_SECRET")
  const cloudName = Deno.env.get("CLOUDINARY_CLOUD_NAME")
  if (!apiKey || !apiSecret || !cloudName) {
    return json(
      500,
      { error: "Cloudinary n’est pas configuré côté serveur (variables SECRETS)." },
    )
  }
  if (!(await callerCanWrite(request.headers.get("Authorization")))) {
    return json(403, { error: "Réservé aux rôles en écriture du back-office." })
  }

  const body = (await request.json().catch(() => null)) as {
    publicId?: string
  } | null
  const publicId =
    (typeof body?.publicId === "string" && body.publicId.trim()) ||
    `csc-${crypto.randomUUID()}`
  const folder = Deno.env.get("CLOUDINARY_FOLDER") ?? "childrensmile"

  // Cloudinary signs the exact parameters that will be sent (file and
  // signature excepted), sorted alphabetically as `k=v&k=v` + the secret.
  const timestamp = String(Math.floor(Date.now() / 1000))
  const params: Record<string, string> = {
    folder,
    public_id: publicId,
    timestamp,
    api_key: apiKey,
  }
  const canonical = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&")
  const signature = await sha1hex(`${canonical}${apiSecret}`)

  return json(200, {
    ok: true,
    signature,
    timestamp,
    apiKey,
    cloudName,
    folder,
    publicId,
  })
})