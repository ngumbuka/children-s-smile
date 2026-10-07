/**
 * Authentication for the backoffice.
 *
 * Two modes, chosen by configuration:
 *
 *  - "supabase" — when `VITE_SUPABASE_URL` + `VITE_SUPABASE_PUBLISHABLE_KEY`
 *    are set (see `supabase.ts`). An editor signs in with real credentials
 *    against Supabase Auth. The role/region profile is still the `users`
 *    collection row keyed by the authenticated e-mail, so the same
 *    permissions the demo used carry over unchanged; the password simply
 *    stops living in the page. Creating and deactivating accounts is handled
 *    by the `manage-users` edge function, never by the browser alone.
 *
 *  - "demo" — everything else. The passcode gate in `session.ts` remains, so
 *    a local run and CI still have a working backoffice with no server.
 *
 * Only the publishable key and a caller's own session token ever reach the
 * browser bundle; there is no admin secret here.
 */
import { SUPABASE_URL, supabase, supabaseConfigured } from "./supabase"

export type AuthMethod = "supabase" | "demo"

export const authMethod: AuthMethod = supabaseConfigured ? "supabase" : "demo"

export const authConfigured = authMethod === "supabase"

export type AuthAccount = {
  id: string
  email: string
  name: string
  role: string
  active: boolean
}

type AuthState = {
  loading: boolean
  account: AuthAccount | null
}

const listeners = new Set<(state: AuthState) => void>()

let state: AuthState = { loading: authConfigured, account: null }

function setState(next: Partial<AuthState>) {
  state = { ...state, ...next }
  for (const listener of listeners) listener(state)
}

export function subscribeAuth(listener: (state: AuthState) => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export const getAuthState = () => state

/** Restores a persisted Supabase session (refresh on reload) and syncs the
 *  auth state with the client's own `onAuthStateChange`. */
function installAuth() {
  if (!supabase) return
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "INITIAL_SESSION" || event === "SIGNED_IN") {
      setState({
        loading: false,
        account: session?.user
          ? {
              id: session.user.id,
              email: session.user.email ?? "",
              name: String(session.user.user_metadata?.name ?? ""),
              role: String(session.user.app_metadata?.role ?? ""),
              active: session.user.app_metadata?.active !== false,
            }
          : null,
      })
    }
    if (event === "SIGNED_OUT") {
      setState({ loading: false, account: null })
    }
  })
  void supabase.auth.getSession().then(({ data }) => {
    const session = data.session
    setState({
      loading: false,
      account: session?.user
        ? {
            id: session.user.id,
            email: session.user.email ?? "",
            name: String(session.user.user_metadata?.name ?? ""),
            role: String(session.user.app_metadata?.role ?? ""),
            active: session.user.app_metadata?.active !== false,
          }
        : null,
    })
  })
}

if (authConfigured) installAuth()

export type AuthSignInResult =
  | { ok: true }
  | { ok: false; error: string }

/** French copy for the errors Supabase actually emits. */
function describeAuthError(message: string): string {
  const text = (message ?? "").toLocaleLowerCase()
  if (text.includes("invalid login credentials"))
    return "E-mail ou mot de passe incorrect."
  if (text.includes("email not confirmed"))
    return "Cette adresse e-mail n’est pas encore confirmée."
  if (text.includes("user is banned") || text.includes("banned"))
    return "Ce compte a été désactivé. Voyez l’antenne."
  if (text.includes("unable to validate"))
    return "La session n’a pas pu être validée. Réessayez."
  if (text.includes("rate limit") || text.includes("too many"))
    return "Trop de tentatives. Attendez un instant avant de réessayer."
  return message || "Connexion impossible."
}

/** Signs in against Supabase Auth; returns the account when the e-mail and
 *  password are those of a real auth user. */
export async function signInWithAuth(
  email: string,
  password: string,
): Promise<AuthSignInResult> {
  if (!supabase) return { ok: false, error: "L’authentification n’est pas configurée." }
  const { error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLocaleLowerCase("fr"),
    password,
  })
  if (error) return { ok: false, error: describeAuthError(error.message) }
  return { ok: true }
}

export async function signOutFromAuth() {
  await supabase?.auth.signOut()
}

/* ------------------------------------------------------------------ */
/* Account management (edge function)                                  */
/* ------------------------------------------------------------------ */

export type ManageUserAction =
  | {
      action: "create" | "update"
      authId?: string
      email: string
      password?: string
      name: string
      role: string
      active: boolean
    }
  | { action: "delete"; authId: string; email: string }

export type ManageUserResult =
  | { ok: true; authId: string }
  | { ok: false; error: string; deleted?: boolean }

/**
 * Calls the `manage-users` edge function so accounts live in Supabase Auth,
 * not just in the `users` collection. The function re-checks that the caller
 * is a `super_admin` before touching anything, so this call is safe to make
 * from the settings panel.
 */
export async function manageAuthUser(
  payload: ManageUserAction,
): Promise<ManageUserResult> {
  if (!supabase) {
    return { ok: true, authId: "" }
  }
  const session = await supabase.auth.getSession()
  const token = session?.data?.session?.access_token
  if (!token) return { ok: false, error: "Vous n’êtes pas connecté." }
  try {
    const response = await fetch(
      `${SUPABASE_URL}/functions/v1/manage-users`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      },
    )
    const body = (await response.json()) as {
      ok?: boolean
      authId?: string
      error?: string
    }
    if (!response.ok || !body) {
      return {
        ok: false,
        error: body?.error ?? "Le service d’accès n’est pas disponible.",
      }
    }
    return {
      ok: Boolean(body.ok),
      authId: body.authId ?? "",
      error: body.error ?? "",
    }
  } catch {
    return {
      ok: false,
      error:
        "Le service d’accès (fonction edge manage-users) n’est pas déployé. Le profil est enregistré, mais la connexion ne fonctionnera qu’après son déploiement.",
    }
  }
}