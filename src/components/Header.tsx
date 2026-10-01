import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Icon } from "./Icon"

const assetPathPrefix = "/assets"
const imgLogo = `${assetPathPrefix}/1fe61.png`

const imgPhone = `${assetPathPrefix}/16689.svg`
const imgMapPin = `${assetPathPrefix}/5abb2.svg`

const navItems = [
  { label: "Accueil", to: "/" },
  { label: "À propos", to: "/a-propos" },
  { label: "Nos actions", to: "/nos-actions" },
  { label: "Nos projets", to: "/nos-projets" },
  { label: "Notre impact", to: "/notre-impact" },
  { label: "Actualités", to: "/actualites" },
  { label: "Nous soutenir", to: "/nous-soutenir" },
  { label: "Contact", to: "/contact" },
]

// The desktop row omits "Nous soutenir": the "Nous Soutenir" CTA beside it
// already points at the same page, and with the container capped at
// --container-content the full 8-item row overflows the column by ~105px.
// The mobile drawer has room, so it keeps the complete list.
const desktopNavItems = navItems.filter((item) => item.to !== "/nous-soutenir")

export function Header() {
  const { pathname } = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="backdrop-blur-[6px] bg-[rgba(250,248,255,0.95)] flex flex-col items-start shadow-[0px_1px_8px_0px_rgba(11,92,171,0.08)] w-full sticky top-0 z-50">
      <a
        href="#main-content"
        className="absolute bg-white font-['Inter'] font-bold left-4 px-4 py-3 rounded-lg text-brand-900 -translate-y-20 focus:translate-y-2 transition-transform z-[60]"
      >
        Aller au contenu principal
      </a>
      <div className="bg-brand-900 hidden w-full xl:block">
        <div className="flex items-center justify-between py-3 w-full shell">
          <div className="flex gap-4 items-center">
            <div className="bg-brand-700 flex gap-1 items-center px-2 py-0.5 rounded-pill">
              <Icon name="shieldCheck" size={12} className="shrink-0" />
              <p className="font-['Montserrat'] font-bold text-brand-300 text-[10px] tracking-[0.55px] uppercase whitespace-nowrap">
                ONG AGRÉÉE RÉPUBLIQUE DU CAMEROUN - 10 RÉGIONS
              </p>
            </div>
            <div className="flex gap-1 items-center">
              <Icon name="phone" size={12} className="shrink-0" />
              <p className="font-['Inter'] font-semibold text-brand-100 text-[11px] whitespace-nowrap">
                +237 699 09 86 88 / 650 88 11 55
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex gap-1 items-center">
              <Icon name="mapPin" size={12} className="shrink-0" />
              <p className="font-['Inter'] font-semibold text-brand-100 text-[11px] whitespace-nowrap">
                Yaoundé • Douala • Grand-Nord • Est
              </p>
            </div>
            <div className="bg-accent-700 flex flex-col items-start px-2 py-0.5 rounded-pill">
              <p className="font-['Montserrat'] font-bold text-[10px] text-white whitespace-nowrap">{`Orange & MTN MoMo OK`}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex min-h-20 items-center justify-between gap-4 py-3 w-full shell">
        <Link to="/" className="flex gap-3 items-center">
          <div className="relative rounded-pill shrink-0 size-8">
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-pill">
              <img
                alt="Children's Smile Cameroun"
                className="absolute left-0 max-w-none size-full top-0"
                src={imgLogo}
              />
            </div>
          </div>
          <div className="hidden flex-col font-['Montserrat'] font-bold items-start min-[420px]:flex">
            <p className="leading-[25px] text-brand-900 text-xl tracking-[-0.5px]">{`Children's Smile`}</p>
            <p className="leading-4 text-ink-700 text-[11px] tracking-[1.1px] uppercase">{`CAMEROUN • ENFANCE & AVENIR`}</p>
          </div>
        </Link>
        <nav className="hidden gap-1 items-center xl:flex">
          {desktopNavItems.map((item) => {
            const isActive =
              pathname === item.to ||
              (item.to !== "/" && pathname.startsWith(item.to))
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex flex-col items-start px-3 py-2 rounded-lg ${
                  isActive ? "bg-surface-tint" : ""
                }`}
              >
                <p
                  className={`font-['Inter'] ${
                    isActive
                      ? "font-bold text-brand-900"
                      : "font-semibold text-ink-700"
                  } leading-5 text-sm whitespace-nowrap`}
                >
                  {item.label}
                </p>
              </Link>
            )
          })}
        </nav>
        <div className="flex gap-2 items-center sm:gap-3">
          <Link
            to="/contact"
            className="bg-accent-700 hidden flex-col items-start justify-center px-4 py-2.5 rounded-pill hover:bg-[#005a24] transition-colors 2xl:flex"
          >
            <p className="font-['Inter'] font-semibold leading-5 text-sm text-white whitespace-nowrap">
              Devenir Partenaire
            </p>
          </Link>
          <Link
            to="/nous-soutenir"
            className="bg-warn-700 drop-shadow-[0px_4px_7px_rgba(163,57,0,0.35)] hidden flex-col items-start justify-center px-5 py-2.5 rounded-pill hover:bg-warn-800 transition-colors sm:flex"
          >
            <p className="font-['Inter'] font-semibold leading-5 text-sm text-white whitespace-nowrap">
              Nous Soutenir
            </p>
          </Link>
          <button
            type="button"
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="border border-ink-300 flex flex-col gap-1.5 items-center justify-center rounded-lg size-11 xl:hidden"
          >
            <span
              className={`bg-brand-900 h-0.5 rounded-pill transition-transform w-5 ${
                isMenuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`bg-brand-900 h-0.5 rounded-pill transition-opacity w-5 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`bg-brand-900 h-0.5 rounded-pill transition-transform w-5 ${
                isMenuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <nav className="bg-white border-t border-surface-tint grid gap-1 py-4 w-full sm:grid-cols-2 xl:hidden shell">
          {navItems.map((item) => {
            const isActive =
              pathname === item.to ||
              (item.to !== "/" && pathname.startsWith(item.to))
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setIsMenuOpen(false)}
                className={`font-['Inter'] font-semibold px-4 py-3 rounded-lg text-sm ${
                  isActive
                    ? "bg-surface-tint text-brand-900"
                    : "text-ink-700 hover:bg-surface-muted"
                }`}
              >
                {item.label}
              </Link>
            )
          })}
          <Link
            to="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="bg-accent-700 flex justify-center mt-2 rounded-pill sm:hidden btn-md btn"
          >
            <p className="font-['Inter'] font-bold text-sm text-white">
              Devenir partenaire
            </p>
          </Link>
          <Link
            to="/nous-soutenir"
            onClick={() => setIsMenuOpen(false)}
            className="bg-warn-700 flex justify-center mt-2 rounded-pill sm:hidden btn-md btn"
          >
            <p className="font-['Inter'] font-bold text-sm text-white">
              Nous soutenir
            </p>
          </Link>
        </nav>
      )}
    </div>
  )
}
