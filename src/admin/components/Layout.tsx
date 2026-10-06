import { useState } from "react"
import { Link } from "react-router-dom"
import {
  ExternalLink,
  Globe,
  HandCoins,
  HardHat,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Newspaper,
  Phone,
  Search,
  Settings,
  Users,
  X,
} from "@/components/icons"
import {
  useAdminArticles,
  useAdminMessages,
  useAdminProjects,
  useAdminShell,
  useAdminTreasury,
} from "@/lib/admin"
import { USER_ROLE_LABELS, type UserDoc, type UserRole } from "@/lib/models"
import { allows, canWrite, signOut, type AdminModule } from "@/lib/session"
import { regionLabel } from "@/lib/models"

/** The module keys come from the session module so the sidebar, the routes
 *  and the role permissions cannot drift apart. */
export type PageKey = AdminModule

type NavItem = {
  key: PageKey
  label: string
  icon: React.ReactNode
  badge?: { text: string; variant: "blue" | "green" | "red" }
}

/**
 * Badges carry live counts, so the list is built per render from the shared
 * store rather than frozen at module load like the old mock did. A role only
 * ever sees the modules it may open, in the same place in the list.
 */
const useNavItems = (role: UserRole): NavItem[] => {
  const projects = useAdminProjects()
  const { counts } = useAdminMessages()
  const items: NavItem[] = [
    {
      key: "overview",
      label: "Vue d'ensemble",
      icon: <LayoutDashboard size={15} />,
      badge: { text: "●", variant: "blue" },
    },
    {
      key: "projects",
      label: "Chantiers & Écoles",
      icon: <HardHat size={15} />,
      badge: { text: String(projects.length), variant: "blue" },
    },
    {
      key: "treasury",
      label: "Dons & Trésorerie",
      icon: <HandCoins size={15} />,
      badge: { text: "MoMo", variant: "green" },
    },
    {
      key: "impact",
      label: "Impact & Écoliers",
      icon: <Users size={15} />,
    },
    {
      key: "media",
      label: "Articles & Médiathèque",
      icon: <Newspaper size={15} />,
    },
    {
      key: "messages",
      label: "Messages du site",
      icon: <Mail size={15} />,
      badge:
        counts.unread > 0
          ? { text: String(counts.unread), variant: "blue" }
          : undefined,
    },
    {
      key: "settings",
      label: "Paramètres & Antennes",
      icon: <Settings size={15} />,
    },
  ]
  return items.filter((item) => allows(role, item.key))
}

const badgeClass = {
  blue: "bg-[#eaedff] text-[#004484]",
  green: "bg-[#7cf994] text-[#007230]",
  red: "bg-[#ffdad6] text-[#93000a]",
}

function Sidebar({
  active,
  onNavigate,
  open,
  onClose,
  projectCount,
  user,
}: {
  active: PageKey
  onNavigate: (k: PageKey) => void
  open: boolean
  onClose: () => void
  projectCount: number
  user: UserDoc
}) {
  const shell = useAdminShell()
  const navItems = useNavItems(user.role)
  const profile = shell.administrator.avatar
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        aria-label="Navigation principale"
        className={`fixed top-0 left-0 h-full w-[288px] bg-[#f2f3ff] flex flex-col justify-between z-40 shadow-[1px_0_4px_rgba(0,0,0,0.04)] transition-transform duration-200 ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex flex-col">
          {/* Brand */}
          <div className="bg-[#eaedff] flex gap-3 items-center h-20 px-4">
            <img
              src={profile}
              alt="Children's Smile Cameroun"
              className="w-11 h-11 rounded-full shadow-sm object-cover shrink-0"
            />
            <div>
              <p className="font-['Montserrat'] font-bold text-[#004484] text-[14px] leading-[1.25]">
                {shell.organization}
              </p>
              <p className="font-['Montserrat'] font-semibold text-[#424751] text-xs tracking-[0.5px] uppercase leading-[1.5]">
                {shell.subtitle}
              </p>
            </div>
            <button
              type="button"
              aria-label="Fermer le menu"
              className="ml-auto flex size-10 items-center justify-center rounded-full text-[#424751] hover:bg-white lg:hidden"
              onClick={onClose}
            >
              <X size={16} />
            </button>
          </div>

          {/* Sync status */}
          <div className="px-4 py-2">
            <div className="bg-[#e2e7ff] flex items-center justify-between px-2 py-1 rounded-lg">
              <div className="flex gap-1.5 items-center">
                <span className="w-2 h-2 bg-[#006e2d] rounded-full" />
                <span className="font-['Montserrat'] font-semibold text-[#424751] text-xs">
                  {shell.location} ({shell.regions} Régions)
                </span>
              </div>
              <span className="bg-[#7cf994] text-[#007230] font-['Montserrat'] font-bold text-xs px-1.5 py-0.5 rounded-full">
                SYNCHRO
              </span>
            </div>
          </div>

          {/* Nav */}
          <nav
            aria-label="Modules du back-office"
            className="flex flex-col gap-1 px-2 pt-1"
          >
            {navItems.map((item) => (
              <button
                type="button"
                key={item.key}
                aria-current={active === item.key ? "page" : undefined}
                onClick={() => {
                  onNavigate(item.key)
                  onClose()
                }}
                className={`flex min-h-11 items-center justify-between px-4 py-2.5 rounded-xl text-left transition-colors ${
                  active === item.key
                    ? "bg-white shadow-sm"
                    : "hover:bg-white/60"
                }`}
              >
                <div className="flex gap-2 items-center">
                  <span
                    className={
                      active === item.key ? "text-[#004484]" : "text-[#727783]"
                    }
                  >
                    {item.icon}
                  </span>
                  <span
                    className={`font-['Inter'] text-[16px] leading-6 ${
                      active === item.key
                        ? "text-[#131b2e] font-semibold"
                        : "text-[#424751] font-normal"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
                    {item.badge && (
                      <span
                        className={`font-['Montserrat'] font-bold text-xs px-2 py-0.5 rounded-full ${badgeClass[item.badge.variant]}`}
                      >
                        {item.key === "projects"
                          ? projectCount
                          : item.badge.text}
                      </span>
                    )}
                {!item.badge && active === item.key && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#004484]" />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Bottom: emergency + back link */}
        <div className="flex flex-col gap-2 p-4">
          <div className="bg-[#dae2fd] rounded-xl p-2 flex flex-col gap-1">
            <div className="flex gap-1.5 items-center mb-0.5">
              <Phone size={13} className="text-[#7c2900]" />
              <span className="font-['Montserrat'] font-bold text-[#7c2900] text-xs tracking-[0.5px] uppercase">
                {shell.emergency.label}
              </span>
            </div>
            <p className="font-['Montserrat'] font-bold text-[#131b2e] text-[14px]">
              {shell.emergency.phone}
            </p>
            <p className="font-['Inter'] text-[#424751] text-xs leading-[1.4]">
              {shell.emergency.detail}
            </p>
          </div>
          <Link
            to="/"
            className="bg-[#eaedff] flex min-h-11 gap-2 items-center justify-center p-2 rounded-xl hover:bg-[#e2e7ff] transition-colors"
          >
            <Globe size={11} className="text-[#004484]" />
            <span className="font-['Inter'] text-[#004484] text-[16px] text-center">
              Retour au site public
            </span>
          </Link>
          <button
            type="button"
            onClick={signOut}
            className="flex min-h-11 gap-2 items-center justify-center rounded-xl px-3 text-[#424751] transition-colors hover:bg-white/70"
          >
            <LogOut size={14} className="text-[#727783]" />
            <span className="font-['Inter'] text-[14px]">
              Se déconnecter
              <span className="block text-xs text-[#727783]">
                {user.name} — {USER_ROLE_LABELS[user.role]}
              </span>
            </span>
          </button>
        </div>
      </aside>
    </>
  )
}

function Header({
  onMenu,
  onNavigate,
  user,
}: {
  onMenu: () => void
  onNavigate: (page: PageKey) => void
  user: UserDoc
}) {
  const shell = useAdminShell()
  const navItems = useNavItems(user.role)
  const projects = useAdminProjects()
  const { transactions } = useAdminTreasury()
  const { articles } = useAdminArticles()
  const profile = shell.administrator.avatar
  const [query, setQuery] = useState("")
  const searchableItems = [
    ...navItems.map((item) => ({
      id: `module-${item.key}`,
      page: item.key,
      label: item.label,
      detail: "Module",
      icon: item.icon,
    })),
    ...projects.map((project) => ({
      id: `project-${project.id}`,
      page: "projects" as const,
      label: project.ecole,
      detail: `${project.id} • ${project.localite}`,
      icon: <HardHat size={15} />,
    })),
    ...transactions.map((transaction) => ({
      id: `transaction-${transaction.id}`,
      page: "treasury" as const,
      label: transaction.donor,
      detail: `${transaction.id} • ${transaction.purpose}`,
      icon: <HandCoins size={15} />,
    })),
    ...articles.map((article) => ({
      id: `article-${article.id}`,
      page: "media" as const,
      label: article.title,
      detail: `${article.type} • ${article.region}`,
      icon: <Newspaper size={15} />,
    })),
  ]
  const normalizedQuery = query.trim().toLocaleLowerCase("fr")
  const results = normalizedQuery
    ? searchableItems
        .filter((item) =>
          `${item.label} ${item.detail}`
            .toLocaleLowerCase("fr")
            .includes(normalizedQuery),
        )
        .slice(0, 7)
    : []

  return (
    <header className="fixed top-0 left-0 lg:left-[288px] right-0 h-20 backdrop-blur-[12px] bg-[rgba(250,248,255,0.9)] shadow-[0_1px_8px_rgba(0,0,0,0.04)] flex items-center justify-between gap-2 px-4 sm:px-6 lg:px-10 z-20">
      <div className="flex min-w-0 flex-1 gap-2 sm:gap-4 items-center max-w-[672px]">
        <button
          type="button"
          className="flex size-10 shrink-0 items-center justify-center rounded-full text-[#424751] hover:bg-[#f2f3ff] lg:hidden"
          onClick={onMenu}
          aria-label="Ouvrir le menu"
        >
          <Menu size={20} />
        </button>
        <div className="relative flex-1 max-w-[448px]">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Escape") setQuery("")
              if (event.key === "Enter" && results[0]) {
                onNavigate(results[0].page)
                setQuery("")
              }
            }}
            aria-label="Rechercher dans le back-office"
            aria-controls={
              normalizedQuery ? "global-search-results" : undefined
            }
            aria-expanded={Boolean(normalizedQuery)}
            placeholder={shell.searchPlaceholder}
            className="min-h-11 w-full rounded-full border border-transparent bg-[#f2f3ff] py-2.5 pl-10 pr-4 text-[14px] text-[#131b2e] outline-none transition placeholder:text-[#727783] hover:border-[#e2e7ff] focus:border-[#004484] focus:bg-white"
          />
          <Search
            size={15}
            aria-hidden="true"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#727783]"
          />
          {normalizedQuery ? (
            <div
              id="global-search-results"
              className="absolute left-0 right-0 top-[calc(100%+8px)] overflow-hidden rounded-2xl border border-[#e2e7ff] bg-white p-1.5 shadow-[0_16px_40px_rgba(19,27,46,0.16)]"
            >
              {results.length ? (
                results.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.page)
                      setQuery("")
                    }}
                    className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-semibold text-[#131b2e] hover:bg-[#f2f3ff]"
                  >
                    <span className="shrink-0 text-[#004484]">{item.icon}</span>
                    <span className="min-w-0">
                      <span className="block truncate">{item.label}</span>
                      <span className="block truncate text-xs font-normal text-[#727783]">
                        {item.detail}
                      </span>
                    </span>
                  </button>
                ))
              ) : (
                <p className="px-3 py-4 text-center text-sm text-[#727783]">
                  Aucun résultat pour « {query.trim()} »
                </p>
              )}
            </div>
          ) : null}
        </div>
        <div className="bg-[#e2e7ff] gap-2 items-center px-3 py-1.5 rounded-full hidden xl:flex">
          <span className="w-2 h-2 bg-[#006e2d] rounded-full" />
          <span className="font-['Inter'] text-[#424751] text-xs leading-tight">
            Connecté — {shell.location}
            <br />
            (Synchro {shell.regions} Régions)
          </span>
        </div>
      </div>
      <div className="flex gap-2 sm:gap-4 items-center">
        <div className="hidden w-px h-8 bg-[#e2e7ff] md:block" />
        <div className="flex gap-2 items-center">
          <img
            src={profile}
            alt=""
            className="w-9 h-9 rounded-full object-cover"
          />
          <div className="hidden xl:block">
            <div className="flex gap-1.5 items-center">
              <span className="font-['Inter'] font-bold text-[#131b2e] text-[14px]">
                {user.name}
              </span>
              <span className="bg-[#004484] text-white font-['Montserrat'] font-semibold text-xs uppercase px-1.5 py-0.5 rounded-full">
                {USER_ROLE_LABELS[user.role]}
              </span>
            </div>
            <p className="font-['Inter'] text-[#424751] text-xs">
              {user.region
                ? `Région ${regionLabel(user.region)}`
                : "Portée nationale"}
            </p>
          </div>
        </div>
        <a
          href={import.meta.env.BASE_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="Voir le site public"
          title="Voir le site public"
          className="hidden size-10 items-center justify-center rounded-full text-[#424751] hover:bg-[#f2f3ff] sm:flex"
        >
          <ExternalLink size={18} />
        </a>
      </div>
    </header>
  )
}

export default function Layout({
  active,
  onNavigate,
  children,
  user,
}: {
  active: PageKey
  onNavigate: (k: PageKey) => void
  children: React.ReactNode
  user: UserDoc
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const shell = useAdminShell()
  const projectRecords = useAdminProjects()
  const { articles } = useAdminArticles()
  const profile = shell.administrator.avatar

  return (
    <div className="min-h-screen bg-[#faf8ff]">
      <a
        href="#main-content"
        onClick={(event) => {
          // A bare "#main-content" href must not change the URL; focus the
          // target directly instead of routing by hash.
          event.preventDefault()
          const target = document.getElementById("main-content")
          if (!target) return
          target.setAttribute("tabindex", "-1")
          target.focus({ preventScroll: true })
          target.scrollIntoView({ behavior: "smooth", block: "start" })
        }}
        className="fixed left-4 top-3 z-50 -translate-y-20 rounded-full bg-[#004484] px-4 py-2 text-sm font-bold text-white transition focus:translate-y-0"
      >
        Aller au contenu
      </a>
      <Sidebar
        active={active}
        onNavigate={onNavigate}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        projectCount={projectRecords.length}
        user={user}
      />
      <div className="lg:pl-[288px]">
        <Header
          onMenu={() => setSidebarOpen(true)}
          onNavigate={onNavigate}
          user={user}
        />
        <main id="main-content" className="pt-20 min-h-screen" tabIndex={-1}>
          {canWrite(user.role) ? null : (
            <p
              role="status"
              className="flex flex-wrap items-center gap-2 border-b border-[#ffe0a3] bg-[#fff4e0] px-6 py-2 text-[13px] font-semibold text-[#7c4a00] lg:px-10"
            >
              Mode lecture seule — le rôle {USER_ROLE_LABELS[user.role]}{" "}
              consulte les données sans pouvoir les modifier.
            </p>
          )}
          {children}
        </main>
      </div>
    </div>
  )
}
