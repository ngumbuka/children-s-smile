/**
 * The `/admin` sign-in screen.
 *
 * In supabase mode (see `src/lib/auth.ts`) it collects a real e-mail and
 * password and hands them to Supabase Auth; the role profile is still the
 * `users` collection row keyed by the authenticated e-mail. Otherwise it keeps
 * the demonstration gate: the passcode is shown on the screen and the data
 * behind it is seed content in the visitor's own storage.
 */

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AlertTriangle, ExternalLink, Lock, LogIn, Shield } from "@/components/icons"
import {
  DEMO_PASSCODE,
  signIn,
  useSignInAccounts,
  authConfigured,
} from "@/lib/session"
import { USER_ROLE_LABELS } from "@/lib/models"
import { Button, Text } from "./ui"

const ROLE_HINTS: Record<string, string> = {
  super_admin: "Toutes les antennes, tous les modules",
  antenna_admin: "Sa région : chantiers, alertes, médiathèque",
  editor: "Rédaction et suivi des chantiers",
  auditor: "Lecture seule : comptes, impact, rapports",
}

export function SignInScreen() {
  const accounts = useSignInAccounts()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [passcode, setPasscode] = useState(authConfigured ? "" : DEMO_PASSCODE)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    setBusy(true)
    try {
      const result = await signIn(email, passcode)
      if (!result.ok) {
        setError(result.error)
        return
      }
      // Land on the dashboard, wherever the visitor arrived from, so the
      // overview opens directly after a successful sign-in.
      navigate("/admin", { replace: true })
    } catch (cause) {
      setError(
        cause instanceof Error
          ? `Connexion impossible : ${cause.message}`
          : "Connexion impossible.",
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#faf8ff] px-4 py-10">
      <div className="w-full max-w-[420px]">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-[#004484] text-white">
            {authConfigured ? (
              <Shield aria-hidden="true" size={20} />
            ) : (
              <Lock aria-hidden="true" size={20} />
            )}
          </span>
          <div>
            <h1 className="font-['Montserrat'] text-lg font-bold text-[#131b2e]">
              Back-office Children's Smile
            </h1>
            <Text variant="body">
              {authConfigured
                ? "Connexion au portail sécurisé"
                : "Accès réservé à l'équipe d'association"}
            </Text>
          </div>
        </div>

        <form
          onSubmit={submit}
          noValidate
          className="rounded-3xl border border-[#e2e7ff] bg-white p-6 shadow-[0_18px_48px_rgba(19,27,46,0.08)]"
        >
          <label className="block text-sm font-semibold text-[#131b2e]">
            E-mail professionnel
            <input
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value)
                setError(null)
              }}
              placeholder="prenom.nom@childrensmile.cm"
              className="mt-1.5 min-h-11 w-full rounded-xl border border-[#e2e7ff] bg-[#faf8ff] px-3.5 text-[14px] outline-none transition focus:border-[#004484] focus:bg-white"
            />
          </label>

          <label className="mt-4 block text-sm font-semibold text-[#131b2e]">
            {authConfigured ? "Mot de passe" : "Code d'accès"}
            <input
              type="password"
              autoComplete="current-password"
              value={passcode}
              onChange={(event) => {
                setPasscode(event.target.value)
                setError(null)
              }}
              placeholder={authConfigured ? "••••••••" : DEMO_PASSCODE}
              className="mt-1.5 min-h-11 w-full rounded-xl border border-[#e2e7ff] bg-[#faf8ff] px-3.5 text-[14px] outline-none transition focus:border-[#004484] focus:bg-white"
            />
          </label>

          {error ? (
            <p
              role="alert"
              className="mt-4 flex items-start gap-2 rounded-xl bg-[#ffdad6] px-3.5 py-2.5 text-[13px] font-semibold text-[#93000a]"
            >
              <AlertTriangle aria-hidden="true" size={16} />
              {error}
            </p>
          ) : null}

          <Button
            type="submit"
            icon={LogIn}
            disabled={busy}
            className="mt-5 w-full"
          >
            {busy ? "Connexion…" : "Se connecter"}
          </Button>

          {authConfigured ? (
            <p className="mt-4 rounded-xl bg-[#f2f3ff] px-3.5 py-2.5 text-[12px] leading-relaxed text-[#424751]">
              <strong className="font-bold text-[#131b2e]">Portail protégé.</strong>{" "}
              Le mot de passe est vérifié par Supabase Auth. Pour créer ou
              désactiver un compte, utilisez le module Paramètres &gt; Gestion
              des Utilisateurs.
            </p>
          ) : (
            <p className="mt-4 rounded-xl bg-[#f2f3ff] px-3.5 py-2.5 text-[12px] leading-relaxed text-[#424751]">
              <strong className="font-bold text-[#131b2e]">Démonstration.</strong>{" "}
              Le code <code className="font-mono">{DEMO_PASSCODE}</code> est
              affiché ici&nbsp;: ce portail n'a pas de serveur, donc il ne peut
              pas protéger un mot de passe. Tout ce qu'il contient est déjà dans
              votre navigateur.
            </p>
          )}
        </form>

        {!authConfigured ? (
          <div className="mt-6">
            <Text variant="label">Comptes de démonstration</Text>
            <ul className="mt-2 grid gap-2">
              {accounts.map((account) => (
                <li key={account._id}>
                  <button
                    type="button"
                    onClick={() => {
                      setEmail(account.email)
                      setPasscode(DEMO_PASSCODE)
                      setError(null)
                    }}
                    className="flex w-full items-center justify-between gap-3 rounded-2xl border border-[#e2e7ff] bg-white px-4 py-3 text-left transition hover:border-[#004484]"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-[#131b2e]">
                        {account.name}
                      </span>
                      <span className="block truncate text-xs text-[#727783]">
                        {ROLE_HINTS[account.role] ?? account.email}
                      </span>
                    </span>
                    <span className="shrink-0 rounded-full bg-[#004484] px-2.5 py-1 text-[11px] font-semibold text-white">
                      {USER_ROLE_LABELS[account.role]}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#004484] hover:underline"
        >
          <ExternalLink aria-hidden="true" size={15} />
          Revenir au site public
        </Link>
      </div>
    </div>
  )
}