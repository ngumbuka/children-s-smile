import { useCallback, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Layout, { type PageKey } from "./components/Layout"
import { FeedbackHost, flowEvents, notify } from "./components/flows"
import { SignInScreen } from "./components/SignIn"
import {
  ADMIN_MODULES,
  allows,
  canWrite,
  useSessionUser,
  type AdminModule,
} from "@/lib/session"
import { useStoreReady } from "@/lib/live"
import {
  Overview,
  Projects,
  Treasury,
  Impact,
  Media,
  Messages,
  Settings,
} from "./modules"

function PageContent({
  active,
  readOnly,
}: {
  active: PageKey
  readOnly: boolean
}) {
  switch (active) {
    case "overview":
      return <Overview readOnly={readOnly} />
    case "projects":
      return <Projects />
    case "treasury":
      return <Treasury readOnly={readOnly} />
    case "impact":
      return <Impact />
    case "media":
      return <Media />
    case "messages":
      return <Messages />
    case "settings":
      return <Settings />
    default:
      return <Overview readOnly={readOnly} />
  }
}

/**
 * Shown while the store's initialiser is still running.
 *
 * Seeding is asynchronous, so a module rendered against empty collections
 * would paint "0.projects", "NaN%" and "aucun résultat" for a frame and then
 * correct itself. Gating once here is enough for every module, and keeps the
 * gate from being forgotten in the next one that is added.
 */
function StoreLoading() {
  return (
    <div className="min-h-screen bg-[#f7f7fb] flex items-center justify-center">
      <p className="font-['Inter'] text-[#727783] text-sm">
        Chargement des données…
      </p>
    </div>
  )
}

/** Every module the sidebar can open, in URL order. */
const PAGE_KEYS: PageKey[] = [...ADMIN_MODULES]

const pageFromPath = (pathname: string): PageKey => {
  const segment = pathname.replace(/^\/admin\/?/, "").split("/")[0]
  return PAGE_KEYS.find((key) => key === segment) ?? "overview"
}

const pathForPage = (page: PageKey) =>
  page === "overview" ? "/admin" : `/admin/${page}`

export default function AdminApp() {
  // The URL is the source of truth so a module can be linked to and survives a
  // refresh; the store still supplies every figure the modules render.
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const user = useSessionUser()
  const ready = useStoreReady()
  const requested = pageFromPath(pathname)
  // A module the role may not open is not reachable by deep link either, so the
  // URL and the permission check cannot disagree.
  const permitted = user ? allows(user.role, requested as AdminModule) : false
  const active: PageKey = permitted ? requested : "overview"

  const go = useCallback(
    (page: PageKey) => {
      if (user && !allows(user.role, page as AdminModule)) {
        notify("Votre rôle n'a pas accès à ce module.", "info")
        return
      }
      navigate(pathForPage(page))
    },
    [navigate, user],
  )

  useEffect(() => {
    if (user && !permitted && requested !== "overview") {
      navigate(pathForPage("overview"), { replace: true })
    }
  }, [user, permitted, requested, navigate])

  useEffect(() => {
    const handleNavigate = (event: Event) =>
      go((event as CustomEvent<PageKey>).detail)
    window.addEventListener(flowEvents.navigate, handleNavigate)
    return () => window.removeEventListener(flowEvents.navigate, handleNavigate)
  }, [go])

  if (!user) return <SignInScreen />
  if (!ready) return <StoreLoading />

  return (
    <Layout active={active} onNavigate={go} user={user}>
      <PageContent active={active} readOnly={!canWrite(user.role)} />
      <FeedbackHost />
    </Layout>
  )
}
