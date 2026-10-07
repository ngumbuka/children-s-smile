import { Suspense, lazy, useEffect } from "react"
import {
  BrowserRouter,
  Link,
  Routes,
  Route,
  useLocation,
} from "react-router-dom"
import Accueil from "./pages/Accueil"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import NousSoutenir from "./pages/NousSoutenir"
import FormulaireDon from "./pages/FormulaireDon"
import APropos from "./pages/APropos"
import Contact from "./pages/Contact"
import NosActions from "./pages/NosActions"
import NosProjets from "./pages/NosProjets"
import NotreImpact from "./pages/NotreImpact"
import Actualites from "./pages/Actualites"
import ProjetDetail from "./pages/ProjetDetail"
import ArticleDetail from "./pages/ArticleDetail"

/** The backoffice is one route in the same app, so it reads and writes the
 *  same store as the public pages above. It is loaded on demand because a
 *  visitor to the public site should not pay for the moderation tooling. */
const AdminApp = lazy(() => import("./admin/AdminApp"))

function AdminFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#faf8ff]">
      <p className="font-['Inter'] text-sm text-[#727783]">
        Chargement du back-office…
      </p>
    </div>
  )
}

/** An unmatched hash would otherwise render a blank shell; send the visitor
 *  back with a real page instead of a silent nothing. */
function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-subtle">
      <Header />
      <main
        id="main-content"
        tabIndex={-1}
        className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center"
      >
        <p className="font-['Montserrat'] font-extrabold text-brand-900 text-6xl">
          404
        </p>
        <h1 className="font-['Montserrat'] font-bold text-brand-900 text-2xl sm:text-3xl">
          Cette page n'existe pas
        </h1>
        <p className="font-['Inter'] text-ink-700 max-w-[520px]">
          L'adresse demandée a peut-être changé ou n'a jamais existé. Revenez à
          l'accueil pour poursuivre votre visite.
        </p>
        <Link
          to="/"
          className="bg-warn-700 flex items-center justify-center rounded-pill hover:bg-warn-800 transition-colors btn-md btn"
        >
          <span className="btn-label font-['Inter'] font-bold text-sm text-white">
            Retour à l'accueil
          </span>
        </Link>
      </main>
      <Footer />
    </div>
  )
}

/**
 * When the site is deployed under a subpath (Figma Make previews set
 * `FIGMA_PUBLIC_URL`), the app's root is not `/` but that base path. The
 * router must anchor to it or every Link would point one directory too high.
 * `import.meta.env.BASE_URL` is inlined at build time with the configured
 * `base`, so it tracks how the bundle is actually mounted.
 */
const routerBasename =
  import.meta.env.BASE_URL && import.meta.env.BASE_URL !== "/"
    ? import.meta.env.BASE_URL.replace(/\/+$/, "")
    : undefined

/**
 * Client-side navigation keeps the previous page's scroll offset, so a new
 * route can open mid-page and the global `scroll-behavior: smooth` would make
 * any correction glide there instead of snapping. Jumping instantly to the top
 * on every path change is what a fresh load feels like; deliberate in-page
 * anchors (skip links, cartography and contact buttons) still animate on
 * demand because they scroll through `scrollIntoView`.
 */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter basename={routerBasename}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/nous-soutenir" element={<NousSoutenir />} />
        <Route path="/don" element={<FormulaireDon />} />
        <Route path="/a-propos" element={<APropos />} />
        <Route path="/nos-actions" element={<NosActions />} />
        <Route path="/nos-projets" element={<NosProjets />} />
        <Route path="/nos-projets/:slug" element={<ProjetDetail />} />
        <Route path="/notre-impact" element={<NotreImpact />} />
        <Route path="/actualites" element={<Actualites />} />
        <Route path="/actualites/:slug" element={<ArticleDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/admin/*"
          element={
            <Suspense fallback={<AdminFallback />}>
              <AdminApp />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
