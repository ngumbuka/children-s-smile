import {
  Award,
  BookOpen,
  Heart,
  MapPin,
  TrendingUp,
  Users,
} from "@/components/icons"
import { useAdminImpact } from "@/lib/admin"
import { PageHeader } from "../components/ui"
import { MiniProgress } from "../components/table"
import { downloadJson } from "../components/flows"

const statIcons = {
  Users: <Users size={20} className="text-[#004484]" />,
  TrendingUp: <TrendingUp size={20} className="text-[#006e2d]" />,
  BookOpen: <BookOpen size={20} className="text-[#a33900]" />,
  MapPin: <MapPin size={20} className="text-[#131b2e]" />,
}

export default function Impact() {
  const { regions, temoignages, stats } = useAdminImpact()
  const pupils = stats[0]?.value ?? "0"
  const delivered = stats[2]?.value ?? "0"
  const regionCount = regions.length
  const collected = stats[3]?.value ?? "0"
  return (
    <div className="flex flex-col gap-6 max-w-[1520px] px-4 py-5 sm:px-6 lg:px-10 lg:py-6">
      <PageHeader
        icon={Users}
        title="Impact & Écoliers"
        subtitle="Mesure de l'impact éducatif — Bilan Annuel 2024 & Suivi continu"
      />

      {/* Impact headline stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] border-b-4"
            style={{ borderColor: stat.color }}
          >
            <div className="flex items-center justify-between mb-2">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: stat.bg }}
              >
                {statIcons[(stat.icon as keyof typeof statIcons)]}
              </div>
            </div>
            <p className="font-['Montserrat'] font-semibold text-[#424751] text-xs uppercase tracking-[0.5px]">
              {stat.label}
            </p>
            <p
              className="font-['Montserrat'] font-extrabold text-[22px] mt-1"
              style={{ color: stat.color }}
            >
              {stat.value}
            </p>
            <p className="font-['Inter'] text-[#727783] text-xs mt-0.5">
              {stat.sub}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Regional breakdown */}
        <div className="col-span-12 lg:col-span-7 bg-white rounded-[12px] shadow-[0_1px_2px_rgba(0,0,0,0.05)] p-4">
          <div className="flex gap-2 items-center mb-4">
            <MapPin size={16} className="text-[#004484]" />
            <p className="font-['Montserrat'] font-bold text-[#131b2e] text-[16px]">
              Répartition Territoriale (10 Régions)
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {regions.map((r) => (
              <div key={r.name}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex gap-1.5 items-center">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: r.color }}
                    />
                    <span className="font-['Inter'] font-semibold text-[#131b2e] text-[14px]">
                      {r.name}
                    </span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <span className="font-['Inter'] text-[#727783] text-xs">
                      {r.projets} projets
                    </span>
                    <span className="font-['Inter'] text-[#727783] text-xs">
                      {r.eleves.toLocaleString("fr-FR")} élèves
                    </span>
                    <span
                      className="font-['Montserrat'] font-bold text-[14px]"
                      style={{ color: r.color }}
                    >
                      {r.pct}%
                    </span>
                  </div>
                </div>
                <MiniProgress value={r.pct} color={r.color} />
                <div className="flex items-center gap-2 mt-1">
                  <Heart size={10} className="text-[#727783]" />
                  <span className="font-['Inter'] text-[#727783] text-xs">
                    {r.filles}% jeunes filles
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-[#eaedff] rounded-lg p-3 mt-4 flex gap-2 items-start">
            <Award size={14} className="text-[#004484] mt-0.5 shrink-0" />
            <p className="font-['Inter'] text-[#424751] text-sm">
              Chaque projet est validé conjointement par le Préfet départemental
              et le chef de village traditionnel.
            </p>
          </div>
        </div>

        {/* Testimonials */}
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
          <p className="font-['Montserrat'] font-bold text-[#131b2e] text-[16px]">
            Témoignages Terrain
          </p>
          {temoignages.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
            >
              <div className="bg-[#006e2d] text-white font-['Montserrat'] font-bold text-xs uppercase px-2 py-0.5 rounded-full self-start inline-block mb-2">
                TÉMOIGNAGE TERRAIN
              </div>
              <p className="font-['Montserrat'] font-bold text-[#131b2e] text-sm leading-[17.88px] mb-2">
                « {t.quote} »
              </p>
              <p className="font-['Inter'] text-[#727783] text-xs">
                {t.auteur}
              </p>
              <p className="font-['Inter'] text-[#727783] text-xs flex gap-1 items-center mt-0.5">
                <MapPin size={9} />
                {t.ecole}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Annual report teaser */}
      <div className="bg-[#004484] rounded-xl p-5 text-white sm:p-6">
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="font-['Montserrat'] font-semibold text-[#bfd6ff] text-xs uppercase tracking-[0.5px] mb-1">
              RAPPORT ANNUEL
            </p>
            <h2 className="font-['Montserrat'] font-bold text-[18px] mb-1">
              Bilan d'Impact Éducatif & Chantiers Scolaires
            </h2>
            <p className="font-['Inter'] text-[#bfd6ff] text-sm">
              {pupils} écoliers • {delivered} chantiers livrés • {regionCount}{" "}
              régions • {collected} FCFA collectés
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              downloadJson("rapport-impact-2024.json", {
                stats,
                regions,
                temoignages,
              })
            }
            className="bg-white text-[#004484] font-['Inter'] font-bold text-sm px-5 py-2.5 rounded-full shrink-0 sm:ml-6"
          >
            Télécharger le rapport
          </button>
        </div>
      </div>
    </div>
  )
}
