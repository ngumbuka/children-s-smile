/**
 * Who is using the backoffice.
 *
 * The store keeps the accounts (`UserDoc` rows seeded in `seed.ts`); this
 * module keeps the fact that one of them is signed in, so the guard on the
 * `/admin` route survives a refresh without a server.
 *
 * This is a **demonstration gate, not authentication**. The accounts carry no
 * secret: the passcode below is public, printed on the sign-in screen, and
 * stored nowhere near the user's data. Everything it protects is seed content
 * in the visitor's own browser. Real authentication needs a server to hold the
 * credentials and to authorise every write, and none of that can be faked
 * client-side — so the honest thing is to make the boundary visible here and
 * keep everything behind it behaving like a real role model.
 */

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
 * The passcode every seeded account shares.
 *
 * Printed on the sign-in screen on purpose: pretending a client-side gate is
 * real security would only make the app look safer than it is.
 */
export const DEMO_PASSCODE = "childrensmile"

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

export type SignInResult = { ok: true; user: UserDoc } | {
  ok: false
  error: string
}

/** Checks the passcode and the account, and starts the session. */
export async function signIn(
  email: string,
  passcode: string,
): Promise<SignInResult> {
  await ready
  if (passcode.trim().toLocaleLowerCase() !== DEMO_PASSCODE) {
    return {
      ok: false,
      error: "Code incorrect. Utilisez le code de démonstration ci-dessous.",
    }
  }
  const wanted = email.trim().toLocaleLowerCase("fr")
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

export const signOut = () => store(null)

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
