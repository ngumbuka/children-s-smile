import { useState } from "react"
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Clock,
  Droplets,
  Filter,
  MapPin,
  Wind,
  Zap,
} from "@/components/icons"
import { useAdminAlerts, type AdminAlertRow } from "@/lib/admin"
import { updateAlert } from "@/lib/repositories"
import { EmptyState } from "../components/ui"
import { SegmentedTabs } from "../components/table"
import { DetailDialog, notify } from "../components/flows"

export default function Alerts() {
  const { alerts: alertRecords, summary } = useAdminAlerts()
  const [filter, setFilter] = useState(0)
  const [region, setRegion] = useState("Toutes")
  const [selectedAlert, setSelectedAlert] = useState<AdminAlertRow | null>(null)

  /** Writes through the shared store, so the overview updates with this list. */
  const setStatus = async (
    id: string,
    status: "open" | "handling" | "resolved",
  ) => {
    await updateAlert(id, {
      status,
      resolvedAt: status === "resolved" ? new Date().toISOString() : null,
    })
  }

  const alertIcons = {
    Wind: <Wind size={14} className="text-[#ba1a1a]" />,
    Droplets: <Droplets size={14} className="text-[#004484]" />,
    BookOpen: <BookOpen size={14} className="text-[#006e2d]" />,
    Clock: <Clock size={14} className="text-[#a33900]" />,
  }
  const regions = [
    "Toutes",
    ...new Set(alertRecords.map((alert) => alert.region)),
  ]
  const criticalCount = alertRecords.filter(
    (alert) => alert.priority === "URGENT" && alert.statut !== "Résolu",
  ).length
  const treatmentCount = alertRecords.filter(
    (alert) => alert.statut === "En cours" || alert.statut === "Traitement",
  ).length
  const resolvedCount = alertRecords.filter(
    (alert) => alert.statut === "Résolu",
  ).length
  const dynamicFilters = [
    `Tous (${alertRecords.length})`,
    `Critiques (${criticalCount})`,
    `En cours (${treatmentCount})`,
    `Résolus (${resolvedCount})`,
  ]
  const dynamicSummaryValues = [
    String(alertRecords.length),
    String(criticalCount),
    String(treatmentCount),
    String(resolvedCount),
  ]
  const visibleAlerts = alertRecords.filter((alert) => {
    const matchesRegion = region === "Toutes" || alert.region === region
    if (filter === 1) return matchesRegion && alert.priority === "URGENT"
    if (filter === 2)
      return (
        matchesRegion &&
        (alert.statut === "En cours" || alert.statut === "Traitement")
      )
    if (filter === 3) return matchesRegion && alert.statut === "Résolu"
    return matchesRegion
  })

  return (
    <div className="flex flex-col gap-6 max-w-[1520px] px-4 py-5 sm:px-6 lg:px-10 lg:py-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
        <div>
          <div className="flex gap-2 items-center mb-1">
            <AlertTriangle size={20} className="text-[#ba1a1a]" />
            <h1 className="font-['Montserrat'] font-bold text-[#131b2e] text-[24px]">
              Signalements & Alertes
            </h1>
          </div>
          <p className="font-['Inter'] text-[#424751] text-[14px]">
            {criticalCount} intervention{criticalCount > 1 ? "s" : ""}{" "}
            prioritaire{criticalCount > 1 ? "s" : ""} requise
            {criticalCount > 1 ? "s" : ""} — Alertes APE en temps réel
          </p>
        </div>
        <div className="bg-[#ffdad6] flex gap-1.5 items-center px-4 py-2 rounded-full">
          <AlertTriangle size={14} className="text-[#ba1a1a]" />
          <span className="font-['Montserrat'] font-bold text-[#93000a] text-sm">
            {criticalCount} CRITIQUES
          </span>
        </div>
      </div>

      {/* Summary bar */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summary.map((stat, index) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
          >
            <div className="flex items-center justify-between">
              <span className="font-['Montserrat'] font-semibold text-[#424751] text-xs uppercase tracking-[0.5px]">
                {stat.label}
              </span>
              <span
                className="font-['Montserrat'] font-bold text-xs px-2 py-0.5 rounded-full"
                style={{ color: stat.color, backgroundColor: stat.bg }}
              >
                {dynamicSummaryValues[index]}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <SegmentedTabs
        tabs={dynamicFilters.map((label, i) => ({ key: i, label }))}
        active={filter}
        onChange={setFilter}
      >
        <label className="ml-2 flex min-h-9 shrink-0 items-center gap-1 px-2 text-xs font-['Inter'] text-[#424751]">
          <Filter size={11} />
          <span className="sr-only">Filtrer par région</span>
          <select
            value={region}
            onChange={(event) => setRegion(event.target.value)}
            className="bg-transparent pr-2 outline-none"
          >
            {regions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
      </SegmentedTabs>

      {/* Alert cards */}
      <div className="flex flex-col gap-4">
        {visibleAlerts.map((alert) => (
          <div
            key={alert.id}
            className="border-l-4 rounded-xl p-4"
            style={{
              backgroundColor: alert.bg,
              borderColor: alert.borderColor,
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex gap-2 items-start">
                {alertIcons[(alert.icon as keyof typeof alertIcons)]}
                <div>
                  <div className="flex gap-2 items-center">
                    <button
                      type="button"
                      onClick={() => setSelectedAlert(alert)}
                      className="font-['Montserrat'] font-bold text-sm"
                      style={{
                        color:
                          alert.priorityColor === "#ba1a1a"
                            ? "#ba1a1a"
                            : "#131b2e",
                      }}
                    >
                      {alert.title}
                    </button>
                    <span
                      className="font-['Montserrat'] font-bold text-xs uppercase px-1.5 py-0.5 rounded-full"
                      style={{
                        backgroundColor: alert.priorityBg,
                        color: alert.priorityColor,
                      }}
                    >
                      {alert.priority}
                    </span>
                  </div>
                  <div className="flex gap-2 items-center mt-0.5">
                    <MapPin size={10} className="text-[#727783]" />
                    <span className="font-['Inter'] text-[#424751] text-xs">
                      {alert.ecole} ({alert.region})
                      {alert.enfants > 0 ? ` • ${alert.enfants} enfants` : ""}
                    </span>
                    <span className="text-[#727783] text-xs">
                      • {alert.date}
                    </span>
                  </div>
                </div>
              </div>
              <span
                className="font-['Montserrat'] font-bold text-xs px-2 py-1 rounded-full shrink-0"
                style={{
                  backgroundColor:
                    alert.statut === "Résolu"
                      ? "#7cf994"
                      : alert.statut === "En cours" ||
                          alert.statut === "Traitement"
                        ? "#d5e3ff"
                        : "#eaedff",
                  color:
                    alert.statut === "Résolu"
                      ? "#006e2d"
                      : alert.statut === "En cours" ||
                          alert.statut === "Traitement"
                        ? "#004484"
                        : "#424751",
                }}
              >
                {alert.statut}
              </span>
            </div>
            <p className="font-['Inter'] text-[#424751] text-sm mb-3 ml-6">
              {alert.detail}
            </p>
            <div className="flex gap-2 ml-6">
              {alert.actions.map((action) => (
                <button
                  key={action.label}
                  type="button"
                  onClick={() => {
                    const nextStatus =
                      alert.statut === "Traitement" ? "resolved" : "handling"
                    void setStatus(alert.id, nextStatus)
                    notify(
                      nextStatus === "resolved"
                        ? `${alert.ecole} : signalement résolu.`
                        : `${action.label} — ${alert.ecole} est maintenant en traitement.`,
                    )
                  }}
                  className="flex gap-1.5 items-center px-3 py-1.5 rounded-lg font-['Inter'] font-bold text-xs"
                  style={{ backgroundColor: action.color, color: action.text }}
                >
                  {action.color === "#ba1a1a" && <Zap size={10} />}
                  {action.color === "#006e2d" && <CheckCircle2 size={10} />}
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        ))}
        {visibleAlerts.length === 0 ? (
          <EmptyState>Aucun signalement ne correspond à ce filtre.</EmptyState>
        ) : null}
      </div>

      <div className="bg-white rounded-xl p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
        <p className="font-['Montserrat'] font-bold text-[#131b2e] text-[14px] mb-1">
          Alertes régionales résolues ce mois
        </p>
        <p className="font-['Inter'] text-[#424751] text-sm">
          {resolvedCount} signalement{resolvedCount > 1 ? "s" : ""} clôturé
          {resolvedCount > 1 ? "s" : ""} — délai moyen d'intervention:{" "}
          <strong className="text-[#004484]">48h chrono</strong>
        </p>
      </div>
      <DetailDialog
        open={Boolean(selectedAlert)}
        title={selectedAlert?.title ?? ""}
        onClose={() => setSelectedAlert(null)}
      >
        {selectedAlert ? (
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-[#424751]">
              {selectedAlert.detail}
            </p>
            <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                ["Référence", selectedAlert.id],
                ["École", selectedAlert.ecole],
                ["Région", selectedAlert.region],
                ["Signalé le", selectedAlert.date],
                ["Priorité", selectedAlert.priority],
                ["Statut", selectedAlert.statut],
                [
                  "Enfants concernés",
                  selectedAlert.enfants
                    ? String(selectedAlert.enfants)
                    : "À confirmer",
                ],
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
          </div>
        ) : null}
      </DetailDialog>
    </div>
  )
}
