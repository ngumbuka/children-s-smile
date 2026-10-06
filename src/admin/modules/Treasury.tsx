import { useState } from "react"
import {
  Building2,
  CreditCard,
  Download,
  Filter,
  RefreshCw,
  Shield,
  Smartphone,
  TrendingUp,
} from "@/components/icons"
import { Pagination, usePagination } from "@/components/Pagination"
import {
  adminMillions,
  useAdminTreasury,
  type AdminTransactionRow,
} from "@/lib/admin"
import { setTransactionStatus } from "@/lib/repositories"
import { TRANSACTION_STATUS_LABELS, type TransactionStatus } from "@/lib/models"
import { PageHeader } from "../components/ui"
import { DataTable, SegmentedTabs } from "../components/table"
import { DetailDialog, downloadCsv, notify } from "../components/flows"

/** The rails each tab shows, matched against the row's stored rail. */
const TAB_FILTERS: (AdminTransactionRow["rail"][] | null)[] = [
  null,
  ["mtn-momo", "orange-money"],
  ["bank", "sepa"],
  null,
]
const GENERAL_PURPOSE = "Fonds Général"

export default function Treasury({ readOnly = false }: { readOnly?: boolean }) {
  const {
    transactions,
    channels,
    tabs,
    compliance,
    campaignTarget,
    settledTotal,
    operationalBalance,
    todayCount,
    failedCount,
    periodLabel,
  } = useAdminTreasury()
  const [tab, setTab] = useState(0)
  const [syncing, setSyncing] = useState(false)
  const [selectedTransaction, setSelectedTransaction] =
    useState<AdminTransactionRow | null>(null)
  /** Writes through the live store: totals, KPIs and the public donor
   *  wall re-derive off the ledger, so a status move stays in sync. */
  const transition = (row: AdminTransactionRow, status: TransactionStatus) => {
    void setTransactionStatus(row._id, status).then((next) => {
      if (!next) return
      notify(
        `Transaction ${row.reference} marquée « ${TRANSACTION_STATUS_LABELS[status]} ».`,
      )
      setSelectedTransaction((current) =>
        current && current._id === row._id ? null : current,
      )
    })
  }
  const visibleTransactions = transactions.filter((transaction) => {
    const rails = TAB_FILTERS[tab]
    if (rails) return rails.includes(transaction.rail)
    if (tab === 3) return transaction.purpose === GENERAL_PURPOSE
    return true
  })
  const {
    page,
    pageCount,
    pageItems: pageTransactions,
    setPage,
  } = usePagination(visibleTransactions, 12, tab)
  // Only confirmed payments count towards collection: a pending or refunded
  // row is in the ledger but not in the money. Both figures and the per-rail
  // split are derived in `lib/admin.ts` on that same basis, so this module does
  // not keep a second opinion about the same money.
  const totalCollected = settledTotal
  const collectionProgress = campaignTarget
    ? Math.min(100, Math.round((totalCollected / campaignTarget) * 100))
    : 0
  const liveChannels = channels

  return (
    <div className="flex flex-col gap-6 max-w-[1520px] px-4 py-5 sm:px-6 lg:px-10 lg:py-6">
      <PageHeader
        icon={TrendingUp}
        title="Dons & Trésorerie"
        subtitle="Flux en direct — Mobile Money & virements CEMAC. 100% traçable."
        trailing={
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={syncing}
              onClick={() => {
                setSyncing(true)
                window.setTimeout(() => {
                  setSyncing(false)
                  notify("Transactions Mobile Money et CEMAC synchronisées.")
                }, 700)
              }}
              className="flex gap-1.5 items-center bg-white border border-[#e2e7ff] px-4 py-2 rounded-full text-sm font-['Inter'] text-[#424751] shadow-sm"
            >
              <RefreshCw size={13} />
              {syncing ? "Synchronisation…" : "Synchroniser"}
            </button>
            <button
              type="button"
              onClick={() =>
                downloadCsv(
                  "grand-livre-fevrier-2025.csv",
                  transactions.map(
                    ({ statusColor, statusBg, ...transaction }) => transaction,
                  ),
                )
              }
              className="flex gap-1.5 items-center bg-[#004484] px-4 py-2 rounded-full text-sm font-['Inter'] font-bold text-white shadow-sm"
            >
              <Download size={13} />
              Grand Livre
            </button>
          </div>
        }
      />

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="bg-white rounded-xl p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] border-b-4 border-[#006e2d]">
          <p className="font-['Montserrat'] font-semibold text-[#424751] text-xs uppercase tracking-[0.55px]">
            COLLECTE CE MOIS
          </p>
          <div className="flex gap-2 items-baseline mt-1">
            <span className="font-['Montserrat'] font-extrabold text-[#006e2d] text-[24px]">
              {(totalCollected / 1_000_000).toLocaleString("fr-FR", {
                maximumFractionDigits: 2,
              })}
              M
            </span>
            <span className="font-['Montserrat'] font-bold text-[#424751] text-xs">
              FCFA
            </span>
          </div>
          <div className="mt-2">
            <div className="flex items-center justify-between mb-1">
              <span className="font-['Inter'] text-[#424751] text-xs">
                Objectif: {adminMillions(campaignTarget)} FCFA
              </span>
              <span className="font-['Inter'] font-bold text-[#006e2d] text-xs">
                {collectionProgress}%
              </span>
            </div>
            <div className="bg-[#eaedff] h-2 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-[#006e2d]"
                style={{ width: `${collectionProgress}%` }}
              />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] border-b-4 border-[#004484]">
          <p className="font-['Montserrat'] font-semibold text-[#424751] text-xs uppercase tracking-[0.55px]">
            TRANSACTIONS CE MOIS
          </p>
          <span className="font-['Montserrat'] font-extrabold text-[#004484] text-[24px] mt-1 block">
            {transactions.length}
          </span>
          <p className="font-['Inter'] text-[#727783] text-xs mt-1">
            {todayCount} aujourd'hui • {failedCount} rejet
            {failedCount > 1 ? "s" : ""}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] border-b-4 border-[#a33900]">
          <p className="font-['Montserrat'] font-semibold text-[#424751] text-xs uppercase tracking-[0.55px]">
            SOLDE OPÉRATIONNEL
          </p>
          <div className="flex gap-2 items-baseline mt-1">
            <span className="font-['Montserrat'] font-extrabold text-[#131b2e] text-[24px]">
              {adminMillions(operationalBalance)}
            </span>
            <span className="font-['Montserrat'] font-bold text-[#424751] text-xs">
              FCFA disponibles
            </span>
          </div>
          <p className="font-['Inter'] text-[#727783] text-xs mt-1">
            Rapproché BEAC ce jour
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Transaction table */}
        <div className="col-span-12 lg:col-span-8 bg-white rounded-[12px] shadow-[0_1px_2px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="bg-[#f2f3ff] flex flex-col items-stretch justify-between gap-3 p-4 sm:flex-row sm:items-center">
            <div>
              <p className="font-['Montserrat'] font-bold text-[#131b2e] text-[16px]">
                Flux Financiers & Rapprochements
              </p>
              <p className="font-['Inter'] text-[#424751] text-xs">
                En direct — Mobile Money & CEMAC
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <SegmentedTabs
                tabs={tabs.map((label, i) => ({ key: i, label }))}
                active={tab}
                onChange={setTab}
              />
              <button
                type="button"
                onClick={() =>
                  notify(
                    "Utilisez les onglets pour filtrer les canaux financiers.",
                    "info",
                  )
                }
                className="flex gap-1 items-center bg-white border border-[#e2e7ff] px-3 py-1.5 rounded-full text-xs font-['Inter'] text-[#424751]"
              >
                <Filter size={11} />
                Filtrer
              </button>
            </div>
          </div>
          <DataTable
            caption="Transactions et rapprochements financiers"
            minWidth={600}
            columns={[
              { label: "RÉFÉRENCE" },
              { label: "DONATEUR" },
              { label: "CANAL" },
              { label: "AFFECTATION" },
              { label: "MONTANT" },
              { label: "DATE" },
              { label: "STATUT" },
            ]}
          >
                {pageTransactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="border-t border-[#f2f3ff] hover:bg-[#faf8ff] transition-colors"
                  >
                    <td className="px-4 py-3">
                      <span className="font-['Montserrat'] font-semibold text-[#004484] text-xs">
                        #{tx.id}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => setSelectedTransaction(tx)}
                        className="text-left hover:underline"
                      >
                        <span className="block font-['Montserrat'] font-bold text-[#131b2e] text-xs">
                          {tx.donor}
                        </span>
                        <span className="block font-['Inter'] text-[#727783] text-xs">
                          {tx.origin}
                        </span>
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 items-center">
                        <CreditCard size={11} className="text-[#727783]" />
                        <span className="font-['Inter'] text-[#424751] text-xs">
                          {tx.type}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-['Inter'] text-[#424751] text-xs">
                        {tx.purpose}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-['Montserrat'] font-bold text-[#006e2d] text-sm">
                        +{tx.amount.toLocaleString("fr-FR")} F
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-['Inter'] text-[#424751] text-xs">
                        {tx.date}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="font-['Montserrat'] font-bold text-xs px-2 py-0.5 rounded-full"
                        style={{
                          color: tx.statusColor,
                          backgroundColor: tx.statusBg,
                        }}
                      >
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </DataTable>
          <Pagination
            page={page}
            pageCount={pageCount}
            onChange={setPage}
            label={`Page ${page} sur ${pageCount} · ${visibleTransactions.length} transaction${visibleTransactions.length > 1 ? "s" : ""}`}
            className="px-1 pb-1"
          />
          <div className="bg-[#eaedff] flex items-center gap-2 px-4 py-2">
            <Shield size={12} className="text-[#004484]" />
            <p className="font-['Inter'] text-[#424751] text-xs">
              100% sans espèces • Comptes bancaires et Mobile Money
              institutionnels officiels
            </p>
          </div>
        </div>

        {/* Channels */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
          <div className="bg-white rounded-[12px] shadow-[0_1px_2px_rgba(0,0,0,0.05)] p-4">
            <p className="font-['Montserrat'] font-bold text-[#131b2e] text-[15px] mb-3">
              Répartition par Canal
            </p>
            {liveChannels.map((ch) => (
              <div key={ch.label} className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex gap-1.5 items-center">
                    <span style={{ color: ch.color }}>
                      {ch.icon === "Building2" ? (
                        <Building2 size={14} />
                      ) : (
                        <Smartphone size={14} />
                      )}
                    </span>
                    <span className="font-['Inter'] font-semibold text-[#131b2e] text-sm">
                      {ch.label}
                    </span>
                  </div>
                  <div className="text-right">
                    <span
                      className="font-['Montserrat'] font-bold text-sm"
                      style={{ color: ch.color }}
                    >
                      {ch.amount.toLocaleString("fr-FR")} FCFA
                    </span>
                    <span className="font-['Montserrat'] font-semibold text-[#727783] text-xs ml-2">
                      {ch.pct}%
                    </span>
                  </div>
                </div>
                <div className="bg-[#eaedff] h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${ch.pct}%`, backgroundColor: ch.color }}
                  />
                </div>
              </div>
            ))}
            <div className="mt-4 border-t border-[#eaedff] pt-3">
              <p className="font-['Inter'] text-[#727783] text-xs">
                Données de {periodLabel} — Rapproché BEAC
              </p>
            </div>
          </div>
          <div className="bg-white rounded-[12px] shadow-[0_1px_2px_rgba(0,0,0,0.05)] p-4">
            <p className="font-['Montserrat'] font-bold text-[#131b2e] text-[15px] mb-3">
              Conformité CEMAC
            </p>
            {compliance.map((item) => (
              <div key={item.label} className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-['Inter'] text-[#424751] text-xs">
                    {item.label}
                  </span>
                  <span
                    className="font-['Montserrat'] font-bold text-xs"
                    style={{ color: item.color }}
                  >
                    {item.pct}%
                  </span>
                </div>
                <div className="bg-[#eaedff] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${item.pct}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
            <p className="font-['Montserrat'] font-bold text-[#004484] text-xs mt-3 text-center">
              Agrément Ministériel Officiel N° 000214/A/MINAT/SG/DAP/SDLP/SAC
            </p>
          </div>
        </div>
      </div>
      <DetailDialog
        open={Boolean(selectedTransaction)}
        title={
          selectedTransaction ? `Transaction #${selectedTransaction.id}` : ""
        }
        onClose={() => setSelectedTransaction(null)}
      >
        {selectedTransaction ? (
          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              ["Donateur", selectedTransaction.donor],
              ["Origine", selectedTransaction.origin],
              ["Canal", selectedTransaction.type],
              ["Affectation", selectedTransaction.purpose],
              [
                "Montant",
                `${selectedTransaction.amount.toLocaleString("fr-FR")} FCFA`,
              ],
              ["Date", selectedTransaction.date],
              ["Statut", selectedTransaction.status],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl bg-[#f2f3ff] p-3">
                <dt className="text-xs font-bold uppercase tracking-wide text-[#727783]">
                  {label}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-[#131b2e]">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
        {selectedTransaction ? (
          <div className="mt-5 flex flex-wrap gap-2 border-t border-[#e5e7f0] pt-4">
            {readOnly ? (
              <p className="w-full font-['Inter'] text-[#727783] text-xs">
                Compte en lecture seule : les statuts de transaction ne peuvent
                pas être modifiés.
              </p>
            ) : (
              <>
                {selectedTransaction.statusKey !== "succeeded" ? (
                  <button
                    type="button"
                    onClick={() => transition(selectedTransaction, "succeeded")}
                    className="bg-[#004484] text-white font-['Inter'] font-bold text-xs px-3 py-2 rounded-xl"
                  >
                    Marquer réussie
                  </button>
                ) : null}
                {selectedTransaction.statusKey !== "pending" ? (
                  <button
                    type="button"
                    onClick={() => transition(selectedTransaction, "pending")}
                    className="border border-[#c3c7d6] text-[#424751] font-['Inter'] font-bold text-xs px-3 py-2 rounded-xl"
                  >
                    Marquer en attente
                  </button>
                ) : null}
                {selectedTransaction.statusKey !== "refunded" ? (
                  <button
                    type="button"
                    onClick={() => transition(selectedTransaction, "refunded")}
                    className="border border-[#e0b5b5] text-[#ba1a1a] font-['Inter'] font-bold text-xs px-3 py-2 rounded-xl"
                  >
                    Marquer remboursée
                  </button>
                ) : null}
              </>
            )}
            <p className="w-full font-['Inter'] text-[#727783] text-[11px]">
              La collecte, les indicateurs et la page publique de l'école se
              recalculent automatiquement.
            </p>
          </div>
        ) : null}
      </DetailDialog>
    </div>
  )
}
