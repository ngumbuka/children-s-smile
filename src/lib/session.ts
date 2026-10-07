/**
 * Who is using the backoffice.
 *
 * The store keeps the accounts (`UserDoc` rows seeded in `seed.ts`); this
 * module keeps the fact that one of them is signed in, so the guard on the
 * `/admin` route survives a refresh without a server.
 *
 * Two modes (`src/lib/auth.ts` chooses by configuration):
 *
 *  - **supabase** — credentials go to Supabase Auth, and the signed-in account
 *    is the `UserDoc` whose e-mail belongs to the authenticated user. The
 *    demo passcode is not consulted at all.
 *
 *  - **demo** — a public passcode gates the console. This is a
 *    **demonstration gate, not authentication**: the accounts carry no secret
 *    and everything they protect is seed content in the visitor's own browser.
 */

import {
  authConfigured,
  getAuthState,
  signInWithAuth,
  signOutFromAuth,
  subscribeAuth,
} from "./auth"
import { useSyncExternalStore } from "react"
import { db } from "./db"
import { useLiveValue, useStoreReady } from "./live"
import type { UserDoc, UserRole } from "./models"
import { ready } from "./repositories"

/** The backoffice modules, in sidebar order. One list for nav, routes and
 *  permissions, so a module cannot be reachable but invisible.
 *
 *  `alerts` and `reports` stay in the store (their records are still read by
 *  the overview) but their modules are toggled off: neither manages anything
 *  the public site shows. Re-adding a key here restores sidebar, route and
 *  permission in one edit. */
export const ADMIN_MODULES = [
  "overview",
  "projects",
  "treasury",
  "impact",
  "media",
  "messages",
  "settings",
] as const

export type AdminModule = typeof ADMIN_MODULES[number]

/**
 * What each role may open.
 *
 * `auditor` is the committee that checks the accounts: read-only, and it never
 * sees the modules that carry donor or staff data it has no need for.
 */
export const ROLE_MODULES: Record<UserRole, readonly AdminModule[]> = {
  super_admin: ADMIN_MODULES,
  antenna_admin: [
    "overview",
    "projects",
    "impact",
    "media",
    "messages",
    "settings",
  ],
  editor: ["overview", "projects", "media", "messages"],
  auditor: ["overview", "impact", "treasury"],
}

/** Roles that may inspect but never write. */
export const READ_ONLY_ROLES: readonly UserRole[] = ["auditor"]

export const canWrite = (role: UserRole) => !READ_ONLY_ROLES.includes(role)

export const modulesFor = (role: UserRole): readonly AdminModule[] =>
  ROLE_MODULES[role] ?? []

export const allows = (role: UserRole, module: AdminModule) =>
  modulesFor(role).includes(module)

/**
 * The passcode every seeded account shares, in demo mode.
 *
 * Printed on the sign-in screen on purpose: pretending a client-side gate is
 * real security would only make the app look safer than it is.
 */
export const DEMO_PASSCODE = "childrensmile"

export { authConfigured, authMethod } from "./auth"

const SESSION_KEY = "childrensmile.session.v1"

const users = db.collection<UserDoc>("users")

let signedInId: string | null = readStoredId()
const listeners = new Set<() => void>()

function readStoredId(): string | null {
  try {
    return window.localStorage.getItem(SESSION_KEY)
  } catch {
    return null
  }
}

function store(id: string | null) {
  signedInId = id
  try {
    if (id) window.localStorage.setItem(SESSION_KEY, id)
    else window.localStorage.removeItem(SESSION_KEY)
  } catch {
    // A browser with storage disabled still gets an in-memory session.
  }
  for (const listener of listeners) listener()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

const snapshot = () => signedInId

const userByEmail = (email: string) =>
  users.findSync().find(
    (row) => row.email.toLocaleLowerCase("fr") === email.toLocaleLowerCase("fr"),
  ) ?? null

/** Re-resolves the signed-in account from a restored Supabase session, so a
 *  refresh keeps the console open without re-typing the password. */
if (authConfigured) {
  subscribeAuth(({ account, loading }) => {
    if (loading) return
    if (!account) {
      if (signedInId) store(null)
      return
    }
    const user = userByEmail(account.email)
    if (user && user.active) store(user._id)
  })
  const boot = getAuthState()
  if (boot.account && !signedInId) {
    const user = userByEmail(boot.account.email)
    if (user && user.active) signedInId = user._id
  }
}

export type SignInResult = { ok: true; user: UserDoc } | {
  ok: false
  error: string
}

/** Signs the account in. In supabase mode the second argument is the real
 *  password; in demo mode it is the demonstration passcode. */
export async function signIn(
  email: string,
  credential: string,
): Promise<SignInResult> {
  await ready
  const wanted = email.trim().toLocaleLowerCase("fr")
  if (authConfigured) {
    const auth = await signInWithAuth(wanted, credential)
    if (!auth.ok) return { ok: false, error: auth.error }
    const authUser = userByEmail(wanted)
    if (!authUser) {
      await signOutFromAuth()
      return {
        ok: false,
        error: "Ce compte n’a pas de profil back-office. Faites-le créer par l’administration.",
      }
    }
    if (!authUser.active) {
      await signOutFromAuth()
      return { ok: false, error: "Ce compte est désactivé. Voyez l’antenne." }
    }
    store(authUser._id)
    return { ok: true, user: authUser }
  }
  if (credential.trim().toLocaleLowerCase() !== DEMO_PASSCODE) {
    return {
      ok: false,
      error: "Code incorrect. Utilisez le code de démonstration ci-dessous.",
    }
  }
  const user = users
    .findSync()
    .find((row) => row.email.toLocaleLowerCase("fr") === wanted)
  if (!user) return { ok: false, error: "Aucun compte ne porte cet e-mail." }
  if (!user.active) {
    return { ok: false, error: "Ce compte est désactivé. Voyez l'antenne." }
  }
  store(user._id)
  return { ok: true, user }
}

export const signOut = () => {
  if (authConfigured) void signOutFromAuth()
  store(null)
}

/** The signed-in account, or `null` on the sign-in screen. */
export function useSessionUser(): UserDoc | null {
  const seeded = useStoreReady()
  const id = useSyncExternalStore(subscribe, snapshot, snapshot)
  return useLiveValue(() => (id && seeded ? users.findByIdSync(id) : null))
}

/** The accounts offered on the sign-in screen, so it works with no credentials
 *  typed from memory. */
export function useSignInAccounts(): UserDoc[] {
  const seeded = useStoreReady()
  return useLiveValue(() => (seeded ? users.findSync() : []))
}