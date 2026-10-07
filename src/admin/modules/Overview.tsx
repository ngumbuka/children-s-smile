import {
  AlertTriangle,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileText,
  MapPin,
  Shield,
  TrendingUp,
  Wrench,
  Zap,
} from "@/components/icons"
import { useState } from "react"
import {
  adminMillions,
  useAdminAlerts,
  useAdminArticles,
  useAdminOverview,
  useAdminProjects,
  useAdminReports,
  useAdminImpact,
  useAdminSettings,
  useAdminTreasury,
  type AdminAlertRow,
  type AdminProjectRow,
  type AdminTransactionRow,
} from "@/lib/admin"
import { updateAlert } from "@/lib/repositories"
import { downloadJson, navigateTo, notify } from "../components/flows"
import { DataTable, SegmentedTabs } from "../components/table"

const imgChantierPhoto = "/assets/721a1.png"

type ProjectRecord = AdminProjectRow
type AlertRecord = AdminAlertRow
type TransactionRecord = AdminTransactionRow

function Card({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}) {
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`text-left bg-white rounded-[12px] shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition hover:-translate-y-0.5 hover:shadow-md ${className}`}
      >
        {children}
      </button>
    )
  }
  return (
    <div
      className={`bg-white rounded-[12px] shadow-[0_1px_2px_rgba(0,0,0,0.05)] ${className}`}
    >
      {children}
    </div>
  )
}

function Badge({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={`font-['Montserrat'] font-bold text-xs px-2 py-0.5 rounded-full leading-[15px] ${className}`}
    >
      {children}
    </span>
  )
}

function ProgressBar({
  value,
  color = "#006e2d",
}: {
  value: number
  color?: string
}) {
  return (
    <div className="bg-[#eaedff] h-2 rounded-full overflow-hidden w-full">
      <div
        className="h-full rounded-full"
        style={{ width: `${value}%`, backgroundColor: color }}
      />
    </div>
  )
}

// KPI Cards row
function KpiStrip({
  projects,
  alerts,
}: {
  projects: ProjectRecord[]
  alerts: AlertRecord[]
}) {
  const overview = useAdminOverview(Date.now())
  const { averageResponse, teams } = useAdminAlerts()
  const { students, donations } = overview.kpis
  const delivered = projects.filter(
    (project) => project.statut === "Livré",
  ).length
  const active = projects.filter(
    (project) => project.statut === "En cours",
  ).length
  const preparing = projects.filter(
    (project) => project.statut === "En préparation",
  ).length
  const unresolvedAlerts = alerts.filter((alert) => alert.statut !== "Résolu")
  const criticalAlerts = unresolvedAlerts.filter(
    (alert) => alert.priority === "URGENT",
  ).length
  // The collected figure, the campaign target and the per-rail split all come
  // from the treasury projection, which counts confirmed payments only. This
  // panel used to sum every ledger row and divide by a literal, which put
  // pending and refunded money on the headline figure.
  const { settledTotal, campaignTarget, channels } = useAdminTreasury()
  const collected = settledTotal
  const collectionProgress = campaignTarget
    ? Math.min(100, Math.round((collected / campaignTarget) * 100))
    : 0
  const channelTotals = channels.slice(0, 3)

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {/* KPI 1: Écoliers Soutenus */}
      <Card
        onClick={() => navigateTo("impact")}
        className="flex flex-col justify-between min-w-0 flex-1 p-4 overflow-hidden relative"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="font-['Montserrat'] font-semibold text-[#424751] text-xs tracking-[0.55px] uppercase leading-[16.5px]">
              ÉCOLIERS QUOTIDIENS
              <br />
              SOUTENUS
            </p>
            <div className="flex gap-2 items-end mt-1">
              <span className="font-['Montserrat'] font-extrabold text-[#004484] text-[16px] leading-6">
                {students.value}
              </span>
              <Badge className="bg-[#7cf994] text-[#006e2d]">
                {students.change}
              </Badge>
            </div>
          </div>
          <div className="bg-[#eaedff] w-10 h-10 rounded-full flex items-center justify-center shrink-0">
            <BookOpen size={18} className="text-[#004484]" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex gap-1 items-end h-8 mb-2">
            {students.trend.map((h: number, i: number) => (
              <div
                key={i}
                className="flex-1 rounded-t-[4px]"
                style={{
                  height: `${h}%`,
                  backgroundColor:
                    i < 4
                      ? "#eaedff"
                      : i === 4
                        ? "#e2e7ff"
                        : i === 5
                          ? "#004484"
                          : "#0b5cab",
                }}
              />
            ))}
          </div>
          <div className="flex items-center justify-between">
            <span className="font-['Inter'] text-[#424751] text-[14px] leading-5">
              {students.girls}
            </span>
            <span className="font-['Inter'] font-semibold text-[#004484] text-[14px] text-right leading-5">
              {students.regions}
              <br />
              Régions
            </span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#004484]" />
      </Card>

      {/* KPI 2: Chantiers Actifs */}
      <Card
        onClick={() => navigateTo("projects")}
        className="flex flex-col justify-between min-w-0 flex-1 p-4 overflow-hidden relative"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="font-['Montserrat'] font-semibold text-[#424751] text-xs tracking-[0.55px] uppercase leading-[16.5px]">
              CHANTIERS & ÉCOLES
              <br />
              ACTIFS
            </p>
            <div className="flex gap-2 items-baseline mt-1">
              <span className="font-['Montserrat'] font-extrabold text-[#131b2e] text-[16px] leading-6">
                {projects.length}
              </span>
              <span className="font-['Inter'] text-[#424751] text-xs">
                programmes
              </span>
            </div>
          </div>
          <div className="bg-[#7cf994] w-10 h-10 rounded-full flex items-center justify-center shrink-0">
            <Wrench size={16} className="text-[#006e2d]" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex gap-px h-2 rounded-full overflow-hidden mb-2 bg-[#eaedff]">
            <div className="bg-[#006e2d]" style={{ flex: delivered }} />
            <div className="bg-[#004484]" style={{ flex: active }} />
            <div className="bg-[#ffb599]" style={{ flex: preparing }} />
          </div>
          <div className="flex items-center justify-between">
            <span className="font-['Inter'] font-bold text-[#006e2d] text-xs">
              {delivered} Livrés
            </span>
            <span className="font-['Inter'] font-bold text-[#004484] text-xs">
              {active} En cours
            </span>
            <span className="font-['Inter'] font-bold text-[#7c2900] text-xs">
              {preparing} En prép.
            </span>
          </div>
          <div className="bg-[#eaedff] rounded-lg p-1.5 mt-2">
            <p className="font-['Inter'] text-[#424751] text-[14px] truncate">
              {unresolvedAlerts.length
                ? `${unresolvedAlerts
                    .slice(0, 3)
                    .map((alert) => alert.region)
                    .join(", ")} sous vigilance`
                : "Aucune zone sous vigilance"}
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#006e2d]" />
      </Card>

      {/* KPI 3: Collecte Dons */}
      <Card
        onClick={() => navigateTo("treasury")}
        className="flex flex-col justify-between min-w-0 flex-1 p-4 overflow-hidden relative"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="font-['Montserrat'] font-semibold text-[#424751] text-xs tracking-[0.55px] uppercase leading-[16.5px]">
              COLLECTE & DONS
              <br />
              MENSUELS
            </p>
            <div className="flex gap-1 items-baseline mt-1">
              <span className="font-['Montserrat'] font-extrabold text-[#006e2d] text-[16px] leading-6">
                {adminMillions(collected)}M
              </span>
              <span className="font-['Montserrat'] font-bold text-[#424751] text-xs">
                {donations.currency}
              </span>
            </div>
          </div>
          <div className="bg-[#eaedff] w-10 h-10 rounded-full flex items-center justify-center shrink-0">
            <TrendingUp size={18} className="text-[#004484]" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-center justify-between mb-1">
            <span className="font-['Inter'] text-[#424751] text-xs">
              Objectif: {donations.target}
            </span>
            <span className="font-['Inter'] font-bold text-[#006e2d] text-xs">
              {collectionProgress}% atteint
            </span>
          </div>
          <ProgressBar value={collectionProgress} color="#006e2d" />
          <div className="flex items-center justify-between mt-2">
            {channelTotals.map((channel) => (
              <div className="text-center" key={channel.label}>
                <p className="font-['Montserrat'] font-semibold text-[#424751] text-xs">
                  {channel.label}
                </p>
                <p className="font-['Montserrat'] font-bold text-[#131b2e] text-xs">
                  {channel.pct}%
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#a33900]" />
      </Card>

      {/* KPI 4: Signalements */}
      <Card className="flex flex-col justify-between min-w-0 flex-1 p-4 overflow-hidden relative">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-['Montserrat'] font-bold text-[#ba1a1a] text-xs tracking-[0.55px] uppercase leading-[16.5px]">
              SIGNALEMENTS &<br />
              ALERTES APE
            </p>
            <div className="flex gap-2 items-center mt-1">
              <span className="font-['Montserrat'] font-extrabold text-[#ba1a1a] text-[16px] leading-6">
                {unresolvedAlerts.length}
              </span>
              <Badge className="bg-[#ffdad6] text-[#93000a]">
                {criticalAlerts} Critiques
              </Badge>
            </div>
          </div>
          <div className="bg-[#ffdad6] w-10 h-10 rounded-full flex items-center justify-center shrink-0">
            <AlertTriangle size={15} className="text-[#ba1a1a]" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex gap-1.5 items-start">
            <span className="w-2 h-2 rounded-full bg-[#ba1a1a] mt-1 shrink-0" />
            <p className="font-['Inter'] font-semibold text-[#ba1a1a] text-[14px] leading-5">
              {unresolvedAlerts[0]?.title ?? "Aucune alerte active"}
            </p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div>
              <p className="font-['Inter'] text-[#424751] text-xs">
                Délai moyen
              </p>
              <p className="font-['Inter'] text-[#424751] text-xs">
                d'intervention:
              </p>
            </div>
            <div className="text-right">
              <p className="font-['Inter'] font-bold text-[#131b2e] text-xs">
                {averageResponse}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-1">
            <p className="font-['Montserrat'] font-semibold text-[#727783] text-xs uppercase leading-[15px]">
              {teams}
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#ba1a1a]" />
      </Card>
    </div>
  )
}

function ChantiersTable({ projects }: { projects: ProjectRecord[] }) {
  const overview = useAdminOverview(Date.now())
  const [activeTab, setActiveTab] = useState(0)
  const statusFilters = [null, "En cours", "En alerte", "Livré"]
  const visibleProjects = projects
    .filter(
      (project) =>
        !statusFilters[activeTab] ||
        project.statut === statusFilters[activeTab],
    )
    .slice(0, 6)

  return (
    <Card className="overflow-hidden">
      {/* Header */}
      <div className="bg-[#f2f3ff] flex flex-col items-start justify-between gap-3 p-4 sm:flex-row sm:items-center">
        <div className="flex gap-2 items-start">
          <Wrench size={18} className="text-[#004484] mt-0.5 shrink-0" />
          <div>
            <p className="font-['Montserrat'] font-bold text-[#131b2e] text-[16px] leading-5">
              Chantiers & Réhabilitations
              <br />
              Prioritaires
            </p>
            <p className="font-['Inter'] text-[#424751] text-xs">
              {projects.length} chantiers coordonnés avec les Comités d'APE et
              Scieries locales
            </p>
          </div>
        </div>
<SegmentedTabs
        tabs={overview.projectTabs.map((label, i) => ({ key: i, label }))}
        active={activeTab}
        onChange={setActiveTab}
      />
      </div>

      {/* Table */}
      <DataTable
        caption="Chantiers et réhabilitations prioritaires"
        minWidth={640}
        columns={[
          { label: "ÉCOLE & LOCALITÉ", width: "105px" },
          { label: "TYPE D'INTERVENTION", width: "129px" },
          { label: "RÉGION", width: "88px" },
          { label: "BUDGET PRÉVU", width: "79px" },
          { label: "AVANCEMENT", width: "117px" },
          { label: "STATUT & APE", align: "right" },
        ]}
      >
        {visibleProjects.map((c) => (
              <tr
                key={c.id}
                className="border-t border-[#f2f3ff] hover:bg-[#faf8ff] transition-colors"
              >
                <td className="px-4 py-3.5 w-[105px]">
                  <p className="font-['Montserrat'] font-bold text-[#131b2e] text-sm leading-5">
                    {c.ecole}
                  </p>
                  <p className="font-['Inter'] text-[#424751] text-xs leading-5">
                    {c.localite}
                  </p>
                </td>
                <td className="px-4 py-3.5 w-[129px]">
                  <p
                    className="font-['Inter'] font-semibold text-xs leading-5"
                    style={{
                      color: c.statut === "En alerte" ? "#ba1a1a" : "#004484",
                    }}
                  >
                    {c.type}
                  </p>
                </td>
                <td className="px-4 py-3.5 w-[88px]">
                  <span className="bg-[#eaedff] font-['Montserrat'] font-semibold text-[#424751] text-xs px-2 py-0.5 rounded-full">
                    {c.region}
                  </span>
                </td>
                <td className="px-4 py-3.5 w-[79px]">
                  <p className="font-['Inter'] font-semibold text-[#131b2e] text-[14px] leading-5">
                    {c.budget.toLocaleString("fr-FR")} FCFA
                  </p>
                </td>
                <td className="px-4 py-3.5 w-[117px]">
                  <div className="flex gap-2 items-center">
                    <div className="bg-[#eaedff] h-2 w-16 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${c.avancement}%`,
                          backgroundColor: c.statusColor,
                        }}
                      />
                    </div>
                    <span
                      className="font-['Montserrat'] font-bold text-xs"
                      style={{ color: c.statusColor }}
                    >
                      {c.avancement}%
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-right w-[140px]">
                  <span
                    className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full font-['Montserrat'] font-bold text-xs text-right"
                    style={{
                      backgroundColor: c.statusBg,
                      color: c.statusColor,
                    }}
                  >
                    {c.statut === "Livré" ? (
                      <CheckCircle2 size={10} />
                    ) : c.statut === "En alerte" ? (
                      <AlertTriangle size={10} />
                    ) : (
                      <Clock size={10} />
                    )}
                    {c.statut}
                  </span>
                </td>
              </tr>
            ))}
      </DataTable>

      {/* Footer */}
      <div className="bg-[#eaedff] flex flex-col items-start justify-between gap-2 px-4 py-3 sm:flex-row sm:items-center">
        <div className="flex gap-1.5 items-center">
          <BookOpen size={14} className="text-[#424751]" />
          <p className="font-['Inter'] text-[#424751] text-[14px]">
            100% bois et matériaux acquis auprès de scieries et artisans agréés
            camerounais
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigateTo("projects")}
          className="flex gap-1.5 items-center text-[#004484] font-['Inter'] text-[14px]"
        >
          Consulter les {projects.length} fiches techniques
          <ChevronRight size={9} />
        </button>
      </div>
    </Card>
  )
}

function GeoCard() {
  const overview = useAdminOverview(Date.now())
  const palette = ["#004484", "#006e2d", "#a33900", "#727783", "#0b5cab"]
  // Pupils are counted from the school register, exactly as the impact module
  // and the "Écoliers soutenus" tile above do. Summing `project.eleves` here
  // counted a school's children once per chantier, which is wrong the moment
  // two chantiers share a school.
  const territorialDistribution = useAdminImpact().regions.map(
    (region, index) => ({
      label: region.name,
      value: region.pct,
      detail: `${region.pct}% (${region.projets} projet${
        region.projets > 1 ? "s" : ""
      } • ${region.eleves.toLocaleString("fr-FR")} élèves)`,
      color: palette[index % palette.length],
    }),
  )

  return (
    <Card className="p-4">
      <div className="flex flex-col items-start justify-between gap-3 mb-4 sm:flex-row">
        <div className="flex gap-2 items-start">
          <MapPin size={18} className="text-[#004484] mt-0.5 shrink-0" />
          <div>
            <p className="font-['Montserrat'] font-bold text-[#131b2e] text-[16px] leading-5">
              Répartition Territoriale des Interventions (
              {territorialDistribution.length} Régions)
            </p>
            <p className="font-['Inter'] text-[#424751] text-xs">
              Équilibre d'équité territoriale et focalisation sur les poches de
              vulnérabilité
            </p>
          </div>
        </div>
        <Badge className="bg-[#7cf994] text-[#007230]">
          Carte Active CEMAC
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
        <div className="lg:col-span-4 flex flex-col gap-3">
          {territorialDistribution.map((z) => (
            <div key={z.label} className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div className="flex gap-1.5 items-center">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: z.color }}
                  />
                  <span className="font-['Inter'] font-semibold text-[#131b2e] text-[14px] leading-5">
                    {z.label}
                  </span>
                </div>
                <span
                  className="font-['Inter'] font-bold text-[14px] ml-2 shrink-0"
                  style={{ color: z.color }}
                >
                  {z.detail}
                </span>
              </div>
              <div className="bg-[#eaedff] h-2.5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${z.value}%`, backgroundColor: z.color }}
                />
              </div>
            </div>
          ))}
          <div className="bg-[#eaedff] flex gap-2 items-center p-2.5 rounded-lg mt-1">
            <Shield size={12} className="text-[#004484] shrink-0" />
            <p className="font-['Inter'] text-[#424751] text-[14px] leading-5">
              Chaque projet est validé conjointement par le Préfet départemental
              et le chef de village traditionnel.
            </p>
          </div>
        </div>
        <div className="lg:col-span-3 rounded-xl overflow-hidden relative h-[208px]">
          <img
            src={imgChantierPhoto}
            alt="Témoignage terrain — Penja"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,68,132,0.9)] via-[rgba(0,68,132,0.3)] to-transparent flex flex-col justify-end p-3">
            <Badge className="bg-[#006e2d] text-white self-start mb-1">
              TÉMOIGNAGE TERRAIN
            </Badge>
            <p className="font-['Montserrat'] font-bold text-white text-sm leading-[17.88px]">
              « {overview.testimonial.quote} »
            </p>
            <p className="font-['Inter'] text-[#bfd6ff] text-xs mt-0.5">
              {overview.testimonial.author}
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}

function AlertsPanel({
  alerts,
  readOnly,
}: {
  alerts: AlertRecord[]
  readOnly: boolean
}) {
  /** Writes through the shared store, so `Signalements` and this panel agree. */
  const advance = (id: string, from: string) =>
    void updateAlert(id, {
      status: from === "Traitement" ? "resolved" : "handling",
      resolvedAt: from === "Traitement" ? new Date().toISOString() : null,
    })
  const activeAlerts = alerts
    .filter((alert) => alert.statut !== "Résolu")
    .slice(0, 3)
  const criticalCount = activeAlerts.filter(
    (alert) => alert.priority === "URGENT",
  ).length

  return (
    <Card className="border-t-2 border-[#ba1a1a] overflow-hidden">
      <div className="p-4 pb-2">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex gap-2 items-center mb-1">
              <AlertTriangle size={15} className="text-[#ba1a1a]" />
              <div>
                <p className="font-['Montserrat'] font-bold text-[#131b2e] text-[15px] leading-[22.5px]">
                  Alertes &<br />
                  Signalements APE
                </p>
              </div>
            </div>
            <p className="font-['Inter'] text-[#424751] text-xs">
              {activeAlerts.length} interventions prioritaires requises
            </p>
          </div>
          <Badge className="bg-[#ffdad6] text-[#93000a] self-start">
            {criticalCount}
            <br />
            CRITIQUES
          </Badge>
        </div>
      </div>

      <div className="px-4 flex flex-col gap-2.5 pb-2">
        {activeAlerts.map((alert) => {
          const urgent = alert.priority === "URGENT"
          const action = alert.actions[0]
          // An alert already in "Traitement" moves to "Résolu" on the next
          // click, so the button label must follow the transition.
          const handling = alert.statut === "Traitement"
          const actionLabel = handling
            ? "Clore l’alerte"
            : (action?.label ?? "Traiter")
          return (
            <div
              key={alert.id}
              className="border-l-4 rounded-xl flex flex-col gap-2 pl-4 pr-3 py-3"
              style={{
                backgroundColor: alert.bg,
                borderColor: alert.borderColor,
              }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p
                    className="font-['Montserrat'] font-bold text-sm leading-[19.5px]"
                    style={{ color: urgent ? "#ba1a1a" : "#131b2e" }}
                  >
                    {alert.title}
                  </p>
                  <p className="font-['Inter'] font-medium text-[#424751] text-xs">
                    {alert.ecole} ({alert.region})
                  </p>
                </div>
                <span
                  className="font-['Montserrat'] font-bold text-xs uppercase px-1.5 py-0.5 rounded-full shrink-0"
                  style={{
                    backgroundColor: alert.priorityBg,
                    color: urgent ? "white" : alert.priorityColor,
                  }}
                >
                  {alert.priority}
                </span>
              </div>
              {urgent ? (
                /* The register module is toggled off, so the panel triages
                   in place instead of deep-linking to a list. */
                readOnly ? null : (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        advance(alert.id, alert.statut)
                        notify(`Équipe terrain mobilisée pour ${alert.title}.`)
                      }}
                      className="flex-1 bg-[#ba1a1a] text-white font-['Inter'] font-bold text-xs px-2 py-1.5 rounded-lg text-center flex gap-1 items-center justify-center"
                    >
                      <Zap size={9} />
                      Déployer Équipe
                    </button>
                  </div>
                )
              ) : (
                <div className="flex items-center justify-between">
                  <p className="line-clamp-2 font-['Inter'] text-[#424751] text-[14px]">
                    {alert.detail}
                  </p>
                  {readOnly ? null : (
                    <button
                      type="button"
                      onClick={() => {
                        advance(alert.id, alert.statut)
                        notify(`${actionLabel} pour ${alert.title}.`)
                      }}
                      className="font-['Inter'] font-bold text-xs text-center"
                      style={{ color: action?.color ?? "#004484" }}
                    >
                      {actionLabel}
                    </button>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </Card>
  )
}

function DonsPanel({ transactions }: { transactions: TransactionRecord[] }) {
  return (
    <Card className="overflow-hidden">
      <div className="p-4 pb-2">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex gap-2 items-center mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006e2d]" />
              <p className="font-['Montserrat'] font-bold text-[#131b2e] text-[15px] leading-[22.5px]">
                Derniers Dons &<br />
                Rapprochements
              </p>
            </div>
            <p className="font-['Inter'] text-[#424751] text-xs">
              Flux en direct (Mobile Money & CEMAC)
            </p>
          </div>
          <Badge className="bg-[#7cf994] text-[#007230] self-start">
            LIVE
            <br />
            CEMAC
          </Badge>
        </div>
      </div>

      <div className="px-4 mt-1 flex flex-col gap-2">
        {transactions.slice(0, 3).map((tx, idx) => {
          const isTransfer = tx.type.includes("Virement")
          const initials = tx.type.includes("Orange")
            ? "OM"
            : tx.type.includes("MTN")
              ? "MoMo"
              : "CEMAC"
          return (
            <div
              key={tx.id}
              className="flex items-center justify-between px-2.5 py-2.5 rounded-lg"
              style={{
                backgroundColor:
                  idx === 2 ? "rgba(213,227,255,0.3)" : "#f2f3ff",
              }}
            >
              <div className="flex gap-2.5 items-center">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: isTransfer
                      ? "#004484"
                      : tx.type.includes("Orange")
                        ? "#ffdbce"
                        : "#7ffc97",
                  }}
                >
                  {isTransfer ? (
                    <Shield size={13} className="text-white" />
                  ) : (
                    <span
                      className="font-['Inter'] font-bold text-xs"
                      style={{
                        color: tx.type.includes("Orange")
                          ? "#7f2b00"
                          : "#005320",
                      }}
                    >
                      {initials}
                    </span>
                  )}
                </div>
                <div>
                  <div className="flex gap-1.5 items-center">
                    <span
                      className="font-['Montserrat'] font-bold text-xs leading-[18px]"
                      style={{ color: isTransfer ? "#004484" : "#131b2e" }}
                    >
                      {tx.donor}
                    </span>
                    {!isTransfer && (
                      <span
                        className="font-['Montserrat'] font-semibold text-xs"
                        style={{ color: "#424751" }}
                      >
                        {tx.origin}
                      </span>
                    )}
                    {isTransfer && (
                      <span className="bg-[#004484] text-white font-['Montserrat'] font-semibold text-xs px-1.5 rounded">
                        Certifié
                      </span>
                    )}
                  </div>
                  <p className="font-['Inter'] text-[#424751] text-xs">
                    {tx.purpose} • {tx.date}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className="font-['Montserrat'] font-bold text-xs"
                  style={{ color: isTransfer ? "#004484" : "#006e2d" }}
                >
                  +{tx.amount.toLocaleString("fr-FR")} F
                </p>
                <p className="font-['Montserrat'] font-semibold text-[#727783] text-xs">
                  #{tx.id}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="px-4 mt-2">
        <div className="bg-[#eaedff] flex gap-2 items-center p-2 rounded-lg">
          <Shield size={11} className="text-[#004484] shrink-0" />
          <p className="font-['Inter'] text-[#424751] text-xs">
            100% sans espèces • Comptes bancaires et Mobile Money
            institutionnels officiels.
          </p>
        </div>
      </div>

      <div className="p-4 pt-2">
        <button
          type="button"
          onClick={() => navigateTo("treasury")}
          className="w-full bg-[#e2e7ff] py-2 rounded-lg font-['Inter'] font-semibold text-[#004484] text-xs text-center"
        >
          Grand Livre & Rapprochements Bancaires
        </button>
      </div>
    </Card>
  )
}

// Recent editorial content — surfaces upcoming publications without a detour
// into the media module. Rows reuse the article projection (type colors, dates
// and publication flags) that the Articles & Médiathèque grid renders.
function ArticlesPanel() {
  const { articles } = useAdminArticles()
  const recent = articles.slice(0, 4)
  const live = articles.filter((article) => article.publication.visible).length

  return (
    <Card className="overflow-hidden">
      <div className="p-4 pb-2">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex gap-2 items-center mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#004484]" />
              <p className="font-['Montserrat'] font-bold text-[#131b2e] text-[15px] leading-[22.5px]">
                Derniers Articles
              </p>
            </div>
            <p className="font-['Inter'] text-[#424751] text-xs">
              Actualités, reportages & rapports — {articles.length} au total
            </p>
          </div>
          <Badge className="bg-[#7cf994] text-[#007230] self-start">
            {live} EN
            <br />
            LIGNE
          </Badge>
        </div>
      </div>

      <div className="px-4 mt-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {recent.map((article) => (
          <div
            key={article.id}
            className="flex items-start justify-between gap-2 px-2.5 py-2.5 rounded-lg bg-[#f2f3ff]"
          >
            <div className="min-w-0">
              <div className="flex gap-1.5 items-center flex-wrap">
                <span
                  className="inline-flex items-center gap-1 font-['Montserrat'] font-bold text-[11px] px-1.5 py-0.5 rounded-full"
                  style={{
                    backgroundColor: article.typeBg,
                    color: article.typeColor,
                  }}
                >
                  {article.type}
                </span>
                <span className="font-['Inter'] text-[#727783] text-[11px] flex items-center gap-0.5">
                  <Calendar size={10} />
                  {article.date}
                </span>
              </div>
              <p className="font-['Montserrat'] font-bold text-[#131b2e] text-xs leading-[18px] mt-1.5 truncate">
                {article.title}
              </p>
              <p className="font-['Inter'] text-[#424751] text-[11px] leading-4 mt-0.5">
                Par {article.author} • {article.region}
              </p>
            </div>
            <span
              className={`shrink-0 font-['Montserrat'] font-bold text-[10px] px-2 py-0.5 rounded-full ${
                article.publication.visible
                  ? "bg-[#7cf994] text-[#006e2d]"
                  : "bg-[#eaedff] text-[#424751]"
              }`}
            >
              {article.publication.visible ? "PUBLIÉ" : "BROUILLON"}
            </span>
          </div>
        ))}
      </div>

      <div className="p-4 pt-2">
        <button
          type="button"
          onClick={() => navigateTo("media")}
          className="w-full bg-[#e2e7ff] py-2 rounded-lg font-['Inter'] font-semibold text-[#004484] text-xs text-center"
        >
          Gérer dans Articles & Médiathèque
        </button>
      </div>
    </Card>
  )
}

// Governance strip
function GovernanceStrip() {
  const { conformite, gouvernance, milestones } = useAdminReports()
  const governanceIcons = {
    check: <CheckCircle2 size={16} className="text-[#006e2d]" />,
    shield: <Shield size={15} className="text-[#004484]" />,
    calendar: <Calendar size={13} className="text-[#424751]" />,
  }
  // Looked up by key, not by label: the label is prose, and matching on it had
  // this panel reporting 0 % for a row the store holds at 96 %.
  const archivedDocuments = conformite.find(
    (item) => item.key === "spend-evidence",
  )
  const imageConsents = conformite.find((item) => item.key === "image-consents")
  const nextMilestone = milestones[0]
  // Titles come from the governance register so an edited row is the title
  // shown here; the two compliance figures come from their keyed rows.
  const governanceItems = [
    {
      icon: "check",
      iconBg: "#7cf994",
      title: gouvernance[0]?.title ?? "Gouvernance",
      sub: `${archivedDocuments?.value ?? 0}% des pièces justificatives archivées`,
    },
    {
      icon: "shield",
      iconBg: "#d5e3ff",
      title: gouvernance[1]?.title ?? "Gouvernance",
      sub: `${imageConsents?.value ?? 0}% consentements d'image signés`,
    },
    {
      icon: "calendar",
      iconBg: "#eaedff",
      title: nextMilestone?.label ?? "Prochain jalon",
      sub: nextMilestone?.date ?? "À planifier",
    },
  ]

  return (
    <Card className="border-t-2 border-[rgba(0,68,132,0.2)] flex flex-col items-start justify-between gap-4 px-4 py-4 xl:flex-row xl:items-center">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
        {governanceItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            {idx > 0 && <div className="w-px h-8 bg-[#e2e7ff] mr-4" />}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: item.iconBg }}
            >
              {governanceIcons[(item.icon as keyof typeof governanceIcons)]}
            </div>
            <div>
              <p className="font-['Montserrat'] font-bold text-[#131b2e] text-xs">
                {item.title}
              </p>
              <p className="font-['Inter'] text-[#424751] text-xs">
                {item.sub}
              </p>
            </div>
          </div>
        ))}
      </div>
      <span className="bg-[#e2e7ff] font-['Montserrat'] font-bold text-[#424751] text-xs px-3 py-1.5 rounded-full whitespace-nowrap">
        Agrément Ministériel Officiel N° 000214/A/MINAT/SG/DAP/SDLP/SAC
      </span>
    </Card>
  )
}

export default function Overview({ readOnly = false }: { readOnly?: boolean }) {
  const overview = useAdminOverview(Date.now())
  const [activePeriod, setActivePeriod] = useState(overview.header.activePeriod)
  const projectRecords = useAdminProjects()
  const alertRecords = useAdminAlerts().alerts
  const { antennes: antennaRecords } = useAdminSettings()
  const { transactions: treasuryTransactions } = useAdminTreasury()
  const connectedAntennas = antennaRecords.filter(
    (antenna) => antenna.synchro === "En ligne",
  ).length

  return (
    <div className="flex flex-col gap-6 max-w-[1520px] px-4 py-5 sm:px-6 lg:px-10 lg:py-6">
      {/* Dashboard header */}
      <Card className="border-l-4 border-[#004484] flex flex-col items-start justify-between gap-4 pl-5 pr-4 py-4 xl:flex-row xl:items-center">
        <div>
          <div className="flex gap-2 items-center mb-1">
            <span className="bg-[#eaedff] font-['Montserrat'] font-bold text-[#004484] text-xs tracking-[0.55px] uppercase px-2.5 py-0.5 rounded-full leading-[16.5px]">
              TABLEAU DE BORD
              <br />
              OPÉRATIONNEL
            </span>
            <span className="text-[#727783] text-xs">•</span>
            <div className="bg-[#e2e7ff] flex gap-1.5 items-center px-3 py-0.5 rounded-full">
              <span className="w-2 h-2 bg-[#006e2d] rounded-full" />
              <span className="font-['Inter'] font-medium text-[#006e2d] text-xs">
                {connectedAntennas} Délégations
                <br />
                connectées
              </span>
            </div>
          </div>
          <div className="flex gap-3 items-baseline">
            <h1 className="font-['Montserrat'] font-extrabold text-[#131b2e] text-[26px] tracking-[-0.65px]">
              {overview.header.greeting}
            </h1>
            <span className="font-['Montserrat'] font-semibold text-[#727783] text-[18px]">
              | {overview.header.date}
            </span>
          </div>
          <p className="font-['Inter'] text-[#424751] text-sm mt-0.5">
            {overview.header.description}
          </p>
        </div>
        <div className="flex flex-col gap-2 items-start xl:items-end">
          <div className="bg-[#eaedff] flex flex-wrap p-1 rounded-2xl gap-1">
            {overview.header.periods.map((t, i) => (
              <button
                type="button"
                key={t}
                onClick={() => setActivePeriod(i)}
                aria-pressed={i === activePeriod}
                className={`font-['Inter'] text-xs px-3 py-1.5 rounded-full ${
                  i === activePeriod
                    ? "bg-white shadow-sm font-bold text-[#004484]"
                    : "text-[#424751]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() =>
                downloadJson("synthese-operationnelle.json", {
                  periode: overview.header.periods[activePeriod],
                  projects: projectRecords,
                  alerts: alertRecords,
                  transactions: treasuryTransactions,
                  antennas: antennaRecords,
                })
              }
              className="bg-[#e2e7ff] flex gap-1.5 items-center px-3.5 py-2 rounded-full"
            >
              <FileText size={12} className="text-[#131b2e]" />
              <span className="font-['Inter'] font-semibold text-[#131b2e] text-xs">
                Synthèse
              </span>
            </button>
            <button
              type="button"
              onClick={() => {
                navigateTo("projects")
                notify(
                  "Module Chantiers ouvert. Utilisez « Nouveau chantier » pour créer le brouillon.",
                  "info",
                )
              }}
              className="bg-[#004484] flex gap-2 items-center px-4 py-2 rounded-full shadow-sm"
            >
              <Zap size={15} className="text-white" />
              <span className="font-['Inter'] font-bold text-white text-sm">
                Nouveau Chantier
              </span>
            </button>
          </div>
        </div>
      </Card>

      {/* KPI strip */}
      <KpiStrip projects={projectRecords} alerts={alertRecords} />

      {/* Main two-column grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left: 8 cols */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
          <ChantiersTable projects={projectRecords} />
          <GeoCard />
        </div>

        {/* Right: 4 cols */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <AlertsPanel alerts={alertRecords} readOnly={readOnly} />
          <DonsPanel transactions={treasuryTransactions} />
        </div>
      </div>

      {/* Recent articles */}
      <ArticlesPanel />

      {/* Governance strip */}
      <GovernanceStrip />
    </div>
  )
}
