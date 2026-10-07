// Manage backoffice accounts in Supabase Auth.
//
// The browser only holds the publishable key, so it cannot create or disable
// auth users itself — that is exactly what this function is for. It runs with
// the service-role key that Supabase injects at runtime, and it only acts for
// callers that are themselves active `super_admin` profiles in the `users`
// collection. A coordinator opens Settings → Gestion des Utilisateurs and the
// panel calls this with the caller's own session token.
//
// Deploy after the migrations are applied:
//
//   supabase functions deploy manage-users
//
// The function needs no extra secrets: `SUPABASE_URL` and
// `SUPABASE_SERVICE_ROLE_KEY` are provided by the platform at runtime.
//
// Payloads (JSON body):
//   create   { action:"create", email, password, name, role, active }
//   update   { action:"update", authId, email, name, role, active, password? }
//   delete   { action:"delete", authId, email }
//
// `role` mirrors the `users`-collection role (`super_admin`, `antenna_admin`,
// `editor`, `auditor`) and lands in the auth user's app_metadata so RLS can
// authorise writes from the JWT alone (`app_can_write()` in the migration).

import { createClient } from "jsr:@supabase/supabase-js@2"

const ROLE_WHITELIST = ["super_admin", "antenna_admin", "editor", "auditor"]

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

async function callerIsSuperAdmin(authHeader: string | null): Promise<boolean> {
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
  return profile?.role === "super_admin" && profile?.active !== false
}

async function authIdByEmail(email: string): Promise<string | null> {
  const { data } = await service.auth.admin.listUsers({ perPage: 1000 })
  const match = (data?.users ?? []).find(
    (user) => user.email?.toLocaleLowerCase("fr") === email,
  )
  return match?.id ?? null
}

async function upsertMetadata(user: {
  uid: string
  name: string
  role: string
  active: boolean
  password?: string
}) {
  const patch: Record<string, unknown> = {
    user_metadata: { ...(user.name ? { name: user.name } : {}) },
    app_metadata: {
      role: user.role,
      active: user.active,
      updated_at: new Date().toISOString(),
    },
  }
  if (user.password) patch.password = user.password
  // Banner as `banned_until` so a deactivated account is refused at sign-in;
  // clearing it restores access.
  patch.banned_until = user.active ? null : "2999-01-01T00:00:00Z"
  return service.auth.admin.updateUserById(user.uid, patch)
}

Deno.serve(async (request: Request) => {
  if (request.method !== "POST") return json(405, { error: "Méthode non autorisée." })
  if (!(await callerIsSuperAdmin(request.headers.get("Authorization")))) {
    return json(403, { error: "Réservé aux administrateurs (super_admin)." })
  }

  const body = (await request.json().catch(() => null)) as
    | {
        action?: string
        email?: string
        password?: string
        authId?: string
        name?: string
        role?: string
        active?: boolean
      }
    | null
  if (!body?.action || typeof body.email !== "string") {
    return json(400, { error: "Paramètres manquants." })
  }
  const email = body.email.trim().toLocaleLowerCase("fr")
  const role = body.role ?? "auditor"
  if (!ROLE_WHITELIST.includes(role)) {
    return json(400, { error: "Rôle inconnu." })
  }

  try {
    if (body.action === "create") {
      if (!body.password) return json(400, { error: "Un mot de passe est requis." })
      const existing = body.authId ?? (await authIdByEmail(email))
      if (existing) {
        await upsertMetadata({
          uid: existing,
          name: body.name ?? "",
          role,
          active: body.active !== false,
          password: body.password,
        })
        return json(200, { ok: true, authId: existing })
      }
      const { data, error } = await service.auth.admin.createUser({
        email,
        password: body.password,
        email_confirm: true,
        user_metadata: { name: body.name ?? "" },
        app_metadata: { role, active: body.active !== false },
      })
      if (error) return json(400, { error: error.message })
      if (body.active === false) {
        await service.auth.admin.updateUserById(data.user.id, {
          banned_until: "2999-01-01T00:00:00Z",
        })
      }
      return json(200, { ok: true, authId: data.user.id })
    }

    if (body.action === "update") {
      const uid = body.authId ?? (await authIdByEmail(email))
      if (!uid) {
        return json(
          404,
          { error: "Aucun compte Supabase Auth pour cet e-mail." },
        )
      }
      const { error } = await upsertMetadata({
        uid,
        name: body.name ?? "",
        role,
        active: body.active !== false,
        password: body.password,
      })
      if (error) return json(400, { error: error.message })
      return json(200, { ok: true, authId: uid })
    }

    if (body.action === "delete") {
      const uid = body.authId ?? (await authIdByEmail(email))
      if (uid) {
        const { error } = await service.auth.admin.deleteUser(uid)
        if (error) return json(400, { error: error.message })
      }
      return json(200, { ok: true, authId: uid ?? "" })
    }

    return json(400, { error: "Action inconnue." })
  } catch (cause) {
    return json(
      400,
      { error: cause instanceof Error ? cause.message : "Erreur inattendue." },
    )
  }
})