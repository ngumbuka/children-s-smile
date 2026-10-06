import { useState } from "react"
import { Archive, Mail, MailOpen, Trash2 } from "@/components/icons"
import { Pagination, usePagination } from "@/components/Pagination"
import { useAdminMessages, type AdminMessageRow } from "@/lib/admin"
import { setMessageStatus, deleteMessage } from "@/lib/repositories"
import { PageHeader, Card, EmptyState } from "../components/ui"
import { DetailDialog, notify } from "../components/flows"

const PAGE_SIZE = 10

const PROFILE_LABELS: Record<string, string> = {
  parent: "Parent / Tuteur",
  school: "École / Enseignant",
  partner: "Partenaire",
  volunteer: "Bénévole",
  other: "Autre",
}

type TabKey = "all" | "new" | "read" | "archived"

const TABS: { key: TabKey; label: string }[] = [
  { key: "all", label: "Tous" },
  { key: "new", label: "Nouveaux" },
  { key: "read", label: "Lus" },
  { key: "archived", label: "Archivés" },
]

export default function Messages() {
  const { messages, counts } = useAdminMessages()
  const [tab, setTab] = useState<TabKey>("all")
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const visible = messages.filter((message) =>
    tab === "all" ? true : message.status === tab,
  )
  const selected = selectedId
    ? (messages.find((message) => message.id === selectedId) ?? null)
    : null

  const {
    page,
    pageCount,
    pageItems: pageMessages,
    setPage,
  } = usePagination(visible, PAGE_SIZE, tab)

  const changeStatus = async (
    message: AdminMessageRow,
    status: "new" | "read" | "archived",
  ) => {
    await setMessageStatus(message.id, status)
    notify(
      status === "archived"
        ? "Message archivé."
        : status === "read"
          ? "Message marqué comme lu."
          : "Message remis dans la boîte de réception.",
    )
  }

  const remove = async (message: AdminMessageRow) => {
    await deleteMessage(message.id)
    setSelectedId(null)
    notify("Message supprimé.", "info")
  }

  return (
    <div className="flex flex-col gap-6 max-w-[1520px] px-4 py-5 sm:px-6 lg:px-10 lg:py-6">
      <PageHeader
        icon={Mail}
        title="Messages du site"
        subtitle={
          counts.unread > 0
            ? `${counts.unread} message${counts.unread > 1 ? "s" : ""} non lu${counts.unread > 1 ? "s" : ""} reçu${counts.unread > 1 ? "s" : ""} via le formulaire de contact`
            : `${counts.total} message${counts.total > 1 ? "s" : ""} reçu${counts.total > 1 ? "s" : ""} via le formulaire de contact`
        }
        trailing={
          <div className="flex items-center gap-1.5 rounded-full bg-[#eaedff] px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-[#004484]" />
            <span className="font-['Montserrat'] text-sm font-bold text-[#004484]">
              {counts.unread} NOUVEAU{counts.unread > 1 ? "X" : ""}
            </span>
          </div>
        }
      />

      {/* Filter strip */}
      <div className="flex flex-wrap gap-2">
        {TABS.map((item) => {
          const count =
            item.key === "all"
              ? counts.total
              : item.key === "new"
                ? counts.unread
                : item.key === "read"
                  ? counts.read
                  : counts.archived
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => setTab(item.key)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                tab === item.key
                  ? "bg-[#004484] text-white"
                  : "bg-white text-[#424751] hover:bg-[#f2f3ff]"
              }`}
            >
              {item.label} ({count})
            </button>
          )
        })}
      </div>

      {visible.length === 0 ? (
        <EmptyState>
          {tab === "all"
            ? "Aucun message pour l'instant. Les envois du formulaire de contact arrivent ici."
            : "Aucun message dans cet onglet."}
        </EmptyState>
      ) : (
        <div className="flex flex-col gap-3">
          {pageMessages.map((message) => (
            <Card
              key={message.id}
              className="p-4 transition hover:border-[#004484] sm:p-5"
            >
              <button
                type="button"
                onClick={() => setSelectedId(message.id)}
                className="flex w-full flex-col gap-2 text-left sm:flex-row sm:items-start sm:justify-between"
              >
                <div className="flex min-w-0 flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-['Montserrat'] font-bold text-[#131b2e] text-[15px]">
                      {message.name}
                    </span>
                    <span
                      className="rounded-full px-2 py-0.5 text-[11px] font-bold"
                      style={{
                        color: message.statusColor,
                        backgroundColor: message.statusBg,
                      }}
                    >
                      {message.statusLabel}
                    </span>
                    {message.organisation ? (
                      <span className="font-['Inter'] text-[#727783] text-xs">
                        {message.organisation}
                      </span>
                    ) : null}
                  </div>
                  <p className="font-['Inter'] font-semibold text-[#131b2e] text-sm">
                    {message.subject}
                  </p>
                  <p className="line-clamp-2 font-['Inter'] text-[#424751] text-[13px]">
                    {message.body}
                  </p>
                  <p className="font-['Inter'] text-[#727783] text-xs">
                    {message.email}
                    {message.phone ? ` • ${message.phone}` : ""}
                    {message.region ? ` • ${message.region}` : ""} •{" "}
                    {message.date}
                  </p>
                </div>
                <span className="shrink-0 self-start rounded-full bg-[#f2f3ff] px-3 py-1 text-xs font-semibold text-[#004484] sm:self-center">
                  Ouvrir
                </span>
              </button>
            </Card>
          ))}
        </div>
      )}

      <Pagination
        page={page}
        pageCount={pageCount}
        onChange={setPage}
        label={`Page ${page} sur ${pageCount} · ${visible.length} message${visible.length > 1 ? "s" : ""}`}
      />

      <DetailDialog
        open={Boolean(selected)}
        title={selected ? selected.subject : ""}
        onClose={() => setSelectedId(null)}
      >
        {selected ? (
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="rounded-full px-2.5 py-1 text-xs font-bold"
                style={{
                  color: selected.statusColor,
                  backgroundColor: selected.statusBg,
                }}
              >
                {selected.statusLabel}
              </span>
              <span className="font-['Inter'] text-[#424751] text-sm">
                {selected.date}
              </span>
            </div>

            <div className="rounded-xl bg-[#f7f7fb] p-4">
              <p className="font-['Montserrat'] font-bold text-[#131b2e] text-sm">
                {selected.name}
                {selected.organisation ? ` — ${selected.organisation}` : ""}
              </p>
              <p className="mt-1 font-['Inter'] text-[#424751] text-sm">
                {selected.email}
              </p>
              {selected.phone ? (
                <p className="font-['Inter'] text-[#424751] text-sm">
                  {selected.phone}
                </p>
              ) : null}
              <p className="font-['Inter'] text-[#727783] text-sm">
                {PROFILE_LABELS[selected.profile] ?? selected.profile}
                {selected.region ? ` • ${selected.region}` : ""}
              </p>
            </div>

            <p className="whitespace-pre-line font-['Inter'] text-[#131b2e] text-sm leading-6">
              {selected.body}
            </p>

            <div className="flex flex-wrap gap-2">
              <a
                href={`mailto:${selected.email}?subject=${encodeURIComponent(`Re: ${selected.subject}`)}`}
                className="flex min-h-11 items-center gap-2 rounded-full bg-[#004484] px-4 text-sm font-semibold text-white transition hover:bg-[#003570]"
              >
                <Mail size={14} />
                Répondre par e-mail
              </a>
              {selected.status !== "read" ? (
                <button
                  type="button"
                  onClick={() => void changeStatus(selected, "read")}
                  className="flex min-h-11 items-center gap-2 rounded-full bg-[#eaedff] px-4 text-sm font-semibold text-[#004484] transition hover:bg-[#e2e7ff]"
                >
                  <MailOpen size={14} />
                  Marquer comme lu
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => void changeStatus(selected, "new")}
                  className="flex min-h-11 items-center gap-2 rounded-full bg-[#eaedff] px-4 text-sm font-semibold text-[#004484] transition hover:bg-[#e2e7ff]"
                >
                  <Mail size={14} />
                  Marquer comme non lu
                </button>
              )}
              {selected.status !== "archived" ? (
                <button
                  type="button"
                  onClick={() => void changeStatus(selected, "archived")}
                  className="flex min-h-11 items-center gap-2 rounded-full bg-[#f2f3ff] px-4 text-sm font-semibold text-[#424751] transition hover:bg-[#e2e7ff]"
                >
                  <Archive size={14} />
                  Archiver
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => void remove(selected)}
                className="flex min-h-11 items-center gap-2 rounded-full bg-[#ffdad6] px-4 text-sm font-semibold text-[#93000a] transition hover:bg-[#ffc7c1]"
              >
                <Trash2 size={14} />
                Supprimer
              </button>
            </div>
          </div>
        ) : null}
      </DetailDialog>
    </div>
  )
}
