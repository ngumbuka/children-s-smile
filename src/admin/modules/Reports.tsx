import {
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  FileBarChart2,
} from "@/components/icons"
import { useState } from "react"
import { useAdminReports, type AdminReportRow } from "@/lib/admin"
import { DetailDialog, downloadJson } from "../components/flows"

const reportIcons = {
  CheckCircle2: <CheckCircle2 size={13} className="text-[#006e2d]" />,
  Clock: <Clock size={13} className="text-[#004484]" />,
  AlertTriangle: <AlertTriangle size={13} className="text-[#a33900]" />,
}

export default function Reports() {
  const { rapports, conformite, milestones } = useAdminReports()
  const [selectedReport, setSelectedReport] = useState<AdminReportRow | null>(
    null,
  )

  return (
    <div className="flex flex-col gap-6 max-w-[1520px] px-4 py-5 sm:px-6 lg:px-10 lg:py-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
        <div>
          <div className="flex gap-2 items-center mb-1">
            <FileBarChart2 size={20} className="text-[#004484]" />
            <h1 className="font-['Montserrat'] font-bold text-[#131b2e] text-[24px]">
              Rapports & Audits CEMAC
            </h1>
          </div>
          <p className="font-['Inter'] text-[#424751] text-[14px]">
            Conformité MINAT • Agrément N° 000214/A/MINAT/SG/DAP/SDLP/SAC • Transparent
            par conception
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => downloadJson("rapports-cemac.json", rapports)}
            className="flex gap-1.5 items-center bg-[#004484] px-4 py-2.5 rounded-full text-white font-['Inter'] font-bold text-sm shadow-sm"
          >
            <Download size={14} />
            Télécharger tout
          </button>
        </div>
      </div>

      {/* Compliance overview */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-white rounded-[12px] shadow-[0_1px_2px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="bg-[#f2f3ff] flex flex-col items-start justify-between gap-3 p-4 sm:flex-row sm:items-center">
              <div>
                <p className="font-['Montserrat'] font-bold text-[#131b2e] text-[16px]">
                  Bibliothèque des Rapports
                </p>
                <p className="font-['Inter'] text-[#424751] text-xs">
                  Tous les documents officiels — accès sécurisé
                </p>
              </div>
              <span className="bg-[#7cf994] font-['Montserrat'] font-bold text-[#007230] text-xs px-2 py-0.5 rounded-full">
                Certifié CEMAC
              </span>
            </div>
            <div className="divide-y divide-[#f2f3ff]">
              {rapports.map((r) => (
                <div
                  key={r.id}
                  className="flex flex-col items-start justify-between gap-3 px-4 py-3.5 hover:bg-[#faf8ff] transition-colors sm:flex-row sm:items-center"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {reportIcons[(r.icon as keyof typeof reportIcons)]}
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => setSelectedReport(r)}
                        className="text-left font-['Montserrat'] font-bold text-[#131b2e] text-sm hover:underline"
                      >
                        {r.titre}
                      </button>
                      <div className="flex gap-3 items-center mt-0.5">
                        <span className="font-['Inter'] text-[#727783] text-xs">
                          {r.type}
                        </span>
                        <span className="text-[#e2e7ff]">•</span>
                        <span className="font-['Inter'] text-[#727783] text-xs flex items-center gap-1">
                          <Calendar size={9} />
                          {r.periode}
                        </span>
                        {r.pages && (
                          <>
                            <span className="text-[#e2e7ff]">•</span>
                            <span className="font-['Inter'] text-[#727783] text-xs">
                              {r.pages} pages
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 sm:ml-4 sm:shrink-0">
                    <span
                      className={`font-['Montserrat'] font-bold text-xs uppercase ${
                        r.publication.visible
                          ? "text-[#006e2d]"
                          : "text-[#727783]"
                      }`}
                    >
                      {r.publication.visible ? "Public" : "Interne"}
                    </span>
                    <span
                      className="font-['Montserrat'] font-bold text-xs px-2 py-0.5 rounded-full"
                      style={{
                        color: r.statutColor,
                        backgroundColor: r.statutBg,
                      }}
                    >
                      {r.statut}
                    </span>
                    {r.pages && (
                      <button
                        type="button"
                        onClick={() =>
                          downloadJson(
                            `${r.id.toLocaleLowerCase("fr")}.json`,
                            r,
                          )
                        }
                        className="flex gap-1 items-center text-[#004484] font-['Inter'] text-xs hover:underline"
                      >
                        <Download size={11} />
                        JSON
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Compliance sidebar */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
          <div className="bg-white rounded-[12px] shadow-[0_1px_2px_rgba(0,0,0,0.05)] p-4">
            <p className="font-['Montserrat'] font-bold text-[#131b2e] text-[15px] mb-3">
              Tableau de Conformité
            </p>
            {conformite.map((item) => (
              <div key={item.label} className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-['Inter'] text-[#424751] text-xs">
                    {item.label}
                  </span>
                  <span
                    className="font-['Montserrat'] font-bold text-xs"
                    style={{ color: item.color }}
                  >
                    {item.value}%
                  </span>
                </div>
                <div className="bg-[#eaedff] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${item.value}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#004484] rounded-xl p-4 text-white">
            <p className="font-['Montserrat'] font-bold text-xs uppercase tracking-[0.5px] text-[#bfd6ff] mb-2">
              PROCHAINS JALONS
            </p>
            <div className="flex flex-col gap-2">
              {milestones.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between"
                >
                  <span className="font-['Inter'] text-[#bfd6ff] text-xs">
                    {item.label}
                  </span>
                  <span className="font-['Montserrat'] font-bold text-white text-xs">
                    {item.date}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#eaedff] rounded-xl p-3 text-center">
            <p className="font-['Montserrat'] font-bold text-[#424751] text-xs">
              Agrément Ministériel Officiel N° 000214/A/MINAT/SG/DAP/SDLP/SAC
            </p>
          </div>
        </div>
      </div>
      <DetailDialog
        open={Boolean(selectedReport)}
        title={selectedReport?.titre ?? ""}
        onClose={() => setSelectedReport(null)}
      >
        {selectedReport ? (
          <div className="space-y-4">
            <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                ["Référence", selectedReport.id],
                ["Type", selectedReport.type],
                ["Période", selectedReport.periode],
                ["Statut", selectedReport.statut],
                ["Date", selectedReport.date],
                [
                  "Pages",
                  selectedReport.pages
                    ? String(selectedReport.pages)
                    : "En rédaction",
                ],
                [
                  "Visibilité",
                  selectedReport.publication.visible
                    ? "Rapport public"
                    : "Document interne",
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
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() =>
                  downloadJson(
                    `${selectedReport.id.toLocaleLowerCase("fr")}.json`,
                    selectedReport,
                  )
                }
                className="min-h-11 rounded-full bg-[#004484] px-5 text-sm font-bold text-white"
              >
                Télécharger les données
              </button>
            </div>
          </div>
        ) : null}
      </DetailDialog>
    </div>
  )
}
