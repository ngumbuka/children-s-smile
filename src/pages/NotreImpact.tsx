import { Link } from "react-router-dom"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { Icon } from "../components/Icon"
import { usePublicImpact, useFeaturedProject } from "../lib/public"
import { usePageMeta } from "../lib/seo"

const assetPathPrefix = "/assets"
const imgFrame = `${assetPathPrefix}/1fe61.png`
const imgPhoto = `${assetPathPrefix}/9fb1b.png`
const imgFrame2 = `${assetPathPrefix}/fa574.png`
const imgFrame3 = `${assetPathPrefix}/d574e.png`
const imgFrame4 = `${assetPathPrefix}/2ec5e.png`

const imgVector1 = `${assetPathPrefix}/16689.svg`
const imgVector2 = `${assetPathPrefix}/5abb2.svg`
const imgVector3 = `${assetPathPrefix}/6d901.svg`
const imgVector4 = `${assetPathPrefix}/9c631.svg`
const imgVector5 = `${assetPathPrefix}/81c83.svg`
const imgVector6 = `${assetPathPrefix}/2499a.svg`
const imgVector7 = `${assetPathPrefix}/26a63.svg`
const imgVector8 = `${assetPathPrefix}/4cd57.svg`
const imgVector9 = `${assetPathPrefix}/89638.svg`
const imgVector10 = `${assetPathPrefix}/10ad7.svg`
const imgVector11 = `${assetPathPrefix}/bcc79.svg`
const imgVector12 = `${assetPathPrefix}/4aadb.svg`
const imgVector13 = `${assetPathPrefix}/128da.svg`
const imgVector14 = `${assetPathPrefix}/531f8.svg`
const imgVector15 = `${assetPathPrefix}/7e754.svg`
const imgVector16 = `${assetPathPrefix}/f67bc.svg`
const imgVector17 = `${assetPathPrefix}/5f858.svg`
const imgVector18 = `${assetPathPrefix}/7647b.svg`
const imgVector19 = `${assetPathPrefix}/af7b9.svg`
const imgVector20 = `${assetPathPrefix}/efd42.svg`
const imgVector21 = `${assetPathPrefix}/db245.svg`
const imgVector22 = `${assetPathPrefix}/74383.svg`
const imgVector23 = `${assetPathPrefix}/2f58d.svg`
const imgVector24 = `${assetPathPrefix}/56586.svg`
const imgVector25 = `${assetPathPrefix}/f51ce.svg`
const imgVector26 = `${assetPathPrefix}/85f58.svg`
const imgVector27 = `${assetPathPrefix}/f0d90.svg`
const imgVector28 = `${assetPathPrefix}/09fb5.svg`
const imgFrame1 = `${assetPathPrefix}/6795b.svg`
const imgVector29 = `${assetPathPrefix}/da866.svg`
const imgVector30 = `${assetPathPrefix}/734ad.svg`
const imgFrame5 = `${assetPathPrefix}/a3046.svg`
const imgVector31 = `${assetPathPrefix}/8ebe1.svg`
const imgFrame6 = `${assetPathPrefix}/87495.svg`
const imgFrame7 = `${assetPathPrefix}/5be2f.svg`
const imgVector32 = `${assetPathPrefix}/f8422.svg`
const imgVector33 = `${assetPathPrefix}/f9602.svg`
const imgVector34 = `${assetPathPrefix}/bdcde.svg`
const imgVector35 = `${assetPathPrefix}/08ba3.svg`
const imgVector36 = `${assetPathPrefix}/2b843.svg`
const imgVector37 = `${assetPathPrefix}/fccc4.svg`
const imgVector38 = `${assetPathPrefix}/156c0.svg`
const imgVector39 = `${assetPathPrefix}/e8b1a.svg`
const imgVector40 = `${assetPathPrefix}/9677a.svg`
const imgVector41 = `${assetPathPrefix}/af606.svg`
const imgVector42 = `${assetPathPrefix}/ebbdc.svg`
const imgVector43 = `${assetPathPrefix}/0d423.svg`
const imgVector44 = `${assetPathPrefix}/235d5.svg`
const imgVector45 = `${assetPathPrefix}/17688.svg`
const imgVector46 = `${assetPathPrefix}/8875f.svg`

const FR_NBSP = "\u00a0"

/**
 * Live pupil total for a region card; the illustrated figure is kept while the
 * school register holds no row for that region yet.
 */
function regionPupils(
  impact: ReturnType<typeof usePublicImpact>,
  region: string,
  fallback: string,
) {
  const row = impact.regions.find((item) => item.name === region)
  return row && row.pupils > 0
    ? `${row.pupils.toLocaleString("fr-FR")}${FR_NBSP}bénéficiaires`
    : fallback
}
export default function NotreImpactChildrensSmileCameroun() {
  usePageMeta(
    "Notre impact — Children's Smile Cameroun",
    "Un impact éducatif réel et mesurable : scolarisation, cantines servies et enfants accompagnés par Children's Smile Cameroun au Cameroun.",
  )
  const impact = usePublicImpact()
  const featuredProject = useFeaturedProject()
  return (
    <>
      <Header />
      <div
        id="main-content"
        className="notre-impact-page bg-surface-subtle content-stretch flex flex-col items-start relative size-full"
        data-node-id="5:1946"
        data-name="Notre impact - Children's Smile Cameroun"
      >
        <div
          className="backdrop-blur-[6px] bg-[rgba(250,248,255,0.95)] content-stretch flex flex-col items-start relative shadow-[0px_1px_8px_0px_rgba(11,92,171,0.08)] shrink-0 w-full"
          data-node-id="50:4"
          data-name="Header"
        >
          <div
            className="bg-brand-900 content-stretch flex flex-col items-start py-[4px] relative shrink-0 w-full shell"
            data-node-id="50:5"
            data-name="Utility Bar"
          >
            <div
              className="content-stretch flex items-center justify-between relative shrink-0 w-full"
              data-node-id="50:6"
              data-name="Frame"
            >
              <div
                className="content-stretch flex gap-[16px] items-center relative shrink-0"
                data-node-id="50:7"
                data-name="Frame"
              >
                <div
                  className="bg-brand-700 content-stretch flex gap-[4px] items-center px-[8px] py-[2px] relative rounded-pill shrink-0"
                  data-node-id="50:8"
                  data-name="Frame"
                >
                  <Icon name="shieldCheck" size={12} className="shrink-0" />
                  <p
                    className="[word-break:break-word] font-['Montserrat:Bold'] font-bold leading-[16px] relative shrink-0 text-brand-300 text-[11px] tracking-[0.55px] uppercase whitespace-nowrap"
                    data-node-id="50:10"
                  >
                    ONG AGRÉÉE RÉPUBLIQUE DU CAMEROUN - 10 RÉGIONS
                  </p>
                </div>
                <div
                  className="content-stretch flex gap-[4px] items-center relative shrink-0"
                  data-node-id="50:11"
                  data-name="Frame"
                >
                  <Icon name="phone" size={12} className="shrink-0" />
                  <p
                    className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[16px] not-italic relative shrink-0 text-brand-100 text-[12px] whitespace-nowrap"
                    data-node-id="50:13"
                  >
                    +237 699 09 86 88 / 650 88 11 55
                  </p>
                </div>
              </div>
              <div
                className="content-stretch flex gap-[16px] items-center relative shrink-0"
                data-node-id="50:14"
                data-name="Frame"
              >
                <div
                  className="content-stretch flex gap-[4px] items-center relative shrink-0"
                  data-node-id="50:15"
                  data-name="Frame"
                >
                  <Icon name="mapPin" size={12} className="shrink-0" />
                  <p
                    className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[16px] not-italic relative shrink-0 text-brand-100 text-[12px] whitespace-nowrap"
                    data-node-id="50:17"
                  >
                    Yaoundé • Douala • Grand-Nord • Est
                  </p>
                </div>
                <div
                  className="bg-accent-700 content-stretch flex flex-col items-start px-[8px] py-[2px] relative rounded-pill shrink-0"
                  data-node-id="50:18"
                  data-name="Frame"
                >
                  <p
                    className="[word-break:break-word] font-['Montserrat:Bold'] font-bold leading-[16px] relative shrink-0 text-[11px] text-white whitespace-nowrap"
                    data-node-id="50:19"
                  >{`Orange & MTN MoMo OK`}</p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="content-stretch flex h-[80px] items-center justify-between relative shrink-0 w-full shell"
            data-node-id="50:20"
            data-name="Top Nav"
          >
            <div
              className="content-stretch flex gap-[12px] items-center relative shrink-0"
              data-node-id="50:21"
              data-name="Frame"
            >
              <div
                className="relative rounded-pill shrink-0 size-[32px]"
                data-node-id="50:22"
                data-name="Frame"
              >
                <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-pill">
                  <img
                    alt=""
                    className="absolute left-0 max-w-none size-full top-0"
                    src={imgFrame}
                  />
                </div>
              </div>
              <div
                className="[word-break:break-word] content-stretch flex flex-col font-['Montserrat:Bold'] font-bold items-start relative shrink-0 whitespace-nowrap"
                data-node-id="50:23"
                data-name="Frame"
              >
                <p
                  className="leading-[25px] relative shrink-0 text-brand-900 text-[20px] tracking-[-0.5px]"
                  data-node-id="50:24"
                >{`Children's Smile`}</p>
                <p
                  className="leading-[16px] relative shrink-0 text-ink-700 text-[11px] tracking-[1.1px] uppercase"
                  data-node-id="50:25"
                >{`CAMEROUN • ENFANCE & AVENIR`}</p>
              </div>
            </div>
            <div
              className="content-stretch flex gap-[4px] items-center relative shrink-0"
              data-node-id="50:26"
              data-name="Frame"
            >
              <div
                className="content-stretch flex flex-col items-start px-[12px] py-[8px] relative shrink-0"
                data-node-id="50:27"
                data-name="Frame"
              >
                <p
                  className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[20px] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                  data-node-id="50:28"
                >
                  Accueil
                </p>
              </div>
              <div
                className="content-stretch flex flex-col items-start px-[12px] py-[8px] relative shrink-0"
                data-node-id="50:29"
                data-name="Frame"
              >
                <p
                  className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[20px] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                  data-node-id="50:30"
                >
                  À propos
                </p>
              </div>
              <div
                className="content-stretch flex flex-col items-start px-[12px] py-[8px] relative shrink-0"
                data-node-id="50:31"
                data-name="Frame"
              >
                <p
                  className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[20px] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                  data-node-id="50:32"
                >
                  Nos actions
                </p>
              </div>
              <div
                className="content-stretch flex flex-col items-start px-[12px] py-[8px] relative shrink-0"
                data-node-id="50:33"
                data-name="Frame"
              >
                <p
                  className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[20px] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                  data-node-id="50:34"
                >
                  Nos projets
                </p>
              </div>
              <div
                className="bg-surface-tint content-stretch drop-shadow-card flex flex-col items-start px-[12px] py-[8px] relative rounded-control shrink-0"
                data-node-id="50:35"
                data-name="Frame"
              >
                <p
                  className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[20px] not-italic relative shrink-0 text-brand-900 text-[14px] whitespace-nowrap"
                  data-node-id="50:36"
                >
                  Notre impact
                </p>
              </div>
              <div
                className="content-stretch flex flex-col items-start px-[12px] py-[8px] relative shrink-0"
                data-node-id="50:37"
                data-name="Frame"
              >
                <p
                  className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[20px] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                  data-node-id="50:38"
                >
                  Actualités
                </p>
              </div>
              <div
                className="content-stretch flex flex-col items-start px-[12px] py-[8px] relative shrink-0"
                data-node-id="50:39"
                data-name="Frame"
              >
                <p
                  className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[20px] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                  data-node-id="50:40"
                >
                  Nous soutenir
                </p>
              </div>
              <div
                className="content-stretch flex flex-col items-start px-[12px] py-[8px] relative shrink-0"
                data-node-id="50:41"
                data-name="Frame"
              >
                <p
                  className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[20px] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                  data-node-id="50:42"
                >
                  Contact
                </p>
              </div>
            </div>
            <div
              className="content-stretch flex gap-[16px] items-center relative shrink-0"
              data-node-id="50:43"
              data-name="Frame"
            >
              <div
                className="bg-accent-700 content-stretch flex flex-col items-start justify-center relative rounded-pill shrink-0 btn-md btn"
                data-node-id="50:44"
                data-name="Frame"
              >
                <p
                  className="btn-label [word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-white"
                  data-node-id="50:45"
                >
                  Devenir Partenaire
                </p>
              </div>
              <div
                className="bg-warn-700 content-stretch drop-shadow-[0px_4px_7px_rgba(163,57,0,0.35)] flex flex-col items-start justify-center relative rounded-pill shrink-0 btn-md btn"
                data-node-id="50:46"
                data-name="Frame"
              >
                <p
                  className="btn-label [word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-white"
                  data-node-id="50:47"
                >
                  Nous Soutenir
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="bg-surface-subtle content-stretch flex flex-col gap-[64px] items-start py-[112px] relative shrink-0 w-full"
          data-node-id="50:48"
          data-name="Main"
        >
          <div
            className="content-stretch flex flex-col items-start relative shrink-0 w-full"
            data-node-id="50:49"
            data-name="Container"
          >
            <div
              className="bg-surface-muted content-stretch flex flex-col items-start py-[112px] relative shrink-0 w-full shell"
              data-node-id="50:50"
              data-name="Section - SECTION HERO D'IMPACT"
            >
              <div
                className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full shell"
                data-node-id="50:51"
                data-name="Hero Content"
              >
                <div
                  className="content-stretch flex flex-col gap-[24px] items-start relative shell-prose"
                  id="cartographie"
                  data-node-id="50:52"
                  data-name="Hero Copy"
                >
                  <div
                    className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full"
                    data-node-id="50:53"
                    data-name="Frame"
                  >
                    <div
                      className="bg-[rgba(0,68,132,0.1)] content-stretch flex gap-[8px] items-center px-[12px] py-[6px] relative rounded-pill shrink-0"
                      data-node-id="50:54"
                      data-name="Frame"
                    >
                      <Icon name="award" size={12} className="shrink-0" />
                      <p
                        className="[word-break:break-word] font-['Montserrat:Bold'] font-bold leading-[16px] relative shrink-0 text-brand-900 text-[11px] tracking-[0.55px] uppercase whitespace-nowrap"
                        data-node-id="50:56"
                      >{`AUDIT TERRAIN & GOUVERNANCE OUVERTE • CAMEROUN`}</p>
                    </div>
                    <div
                      className="[word-break:break-word] font-['Montserrat:ExtraBold'] font-extrabold leading-[0] min-w-full relative shrink-0 text-brand-900 text-[48px] tracking-[-1.2px] w-full"
                      data-node-id="50:57"
                    >
                      <h1 className="leading-[56px]">
                        {`Un Impact Éducatif Réel, `}
                        <span className="text-warn-700">{` Mesurable `}</span>
                        {` et Transparent au Cameroun`}
                      </h1>
                    </div>
                    <div
                      className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[0] min-w-full not-italic relative shrink-0 text-ink-700 text-[18px] w-full"
                      data-node-id="50:58"
                    >
                      <p className="leading-[29.25px]">{`Nous refusons les promesses sans lendemain. Chaque salle de classe réhabilitée, chaque point d'eau foré et chaque kit distribué fait l'objet d'indicateurs de terrain vérifiables avec les comités de parents d'élèves (APE) et les autorités scolaires locales.`}</p>
                    </div>
                  </div>
                  <div
                    className="content-stretch flex gap-[8px] items-center relative shrink-0"
                    data-node-id="50:59"
                    data-name="Frame"
                  >
                    <button
                      onClick={() =>
                        document
                          .getElementById("cartographie")
                          ?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          })
                      }
                      type="button"
                      className="bg-brand-900 content-stretch flex flex-row items-center justify-center relative rounded-pill btn-md btn btn-icon-stack"
                      data-node-id="50:60"
                      data-name="Frame"
                    >
                      <Icon name="map" size={16} className="shrink-0" />
                      <p
                        className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap"
                        data-node-id="50:62"
                      >
                        Explorer la cartographie
                      </p>
                    </button>
                    <button
                      disabled
                      title="Publication en cours"
                      type="button"
                      className="bg-surface-subtle content-stretch drop-shadow-card flex flex-row items-center justify-center relative rounded-pill btn-md btn btn-icon-stack"
                      data-node-id="50:63"
                      data-name="Frame"
                    >
                      <Icon name="arrowRight" size={16} className="shrink-0" />
                      <p
                        className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[20px] not-italic relative shrink-0 text-brand-900 text-[14px] whitespace-nowrap"
                        data-node-id="50:65"
                      >{`Rapports d'audits certifiés`}</p>
                    </button>
                  </div>
                </div>
                <div
                  className="bg-white content-stretch flex flex-[1_0_0] flex-col items-stretch min-w-0 overflow-hidden relative rounded-[16px] shadow-hero ring-1 ring-black/5"
                  data-node-id="50:66"
                  data-name="Hero Visual"
                >
                  {featuredProject ? (
                    <Link
                      aria-label={`${featuredProject.title} — voir le projet`}
                      className="absolute inset-0 z-[6] rounded-[16px] focus-visible:outline-2 focus-visible:outline-brand-700"
                      to={`/nos-projets/${featuredProject.slug}`}
                    />
                  ) : null}
                  <div
                    className="relative w-full aspect-[4/3]"
                    data-node-id="50:67"
                    data-name="Photo"
                  >
                    <img
                      alt={
                        featuredProject
                          ? featuredProject.title
                          : "Écoliers de l'école publique de Dimako après la rénovation"
                      }
                      className="absolute inset-0 size-full object-cover object-center"
                      src={
                        featuredProject?.image
                          ? `${assetPathPrefix}/${featuredProject.image}`
                          : imgPhoto
                      }
                    />
                    <div
                      className="absolute bg-gradient-to-t from-[rgba(0,68,132,0.88)] inset-0 justify-end p-[24px] to-[rgba(0,68,132,0)] via-[rgba(0,68,132,0.25)] via-1/2 pointer-events-none"
                      data-node-id="50:68"
                      data-name="Photo Overlay"
                    >
                      <p
                        className="leading-[16px] relative shrink-0 text-brand-100 text-[11px] tracking-[1.1px] uppercase w-full"
                        data-node-id="50:69"
                      >
                        {featuredProject
                          ? `${featuredProject.statusLabel} • ${(featuredProject.location || featuredProject.region).toUpperCase()}`
                          : `ÉCOLE PUBLIQUE DE DIMAKO (RÉGION DE L'EST)`}
                      </p>
                      <p className="leading-[24px] mb-0 mt-[2px] line-clamp-2 relative shrink-0 text-white text-[18px] w-full">
                        {featuredProject
                          ? featuredProject.title
                          : "100% de présence effective enregistrée"}
                      </p>
                      {!featuredProject ? (
                        <p className="leading-[24px] relative shrink-0 text-white text-[18px] w-full">
                          post-rénovation
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div
                    className="content-stretch flex flex-row flex-wrap gap-3 items-center justify-between relative shrink-0 w-full bg-white p-[16px] md:p-[20px]"
                    data-node-id="50:71"
                    data-name="Audit Badge"
                  >
                    <div
                      className="content-stretch flex gap-[12px] items-center relative shrink-0"
                      data-node-id="50:72"
                      data-name="Frame"
                    >
                      <div
                        className="bg-[rgba(0,110,45,0.1)] content-stretch flex items-center justify-center relative rounded-pill size-[40px] shrink-0"
                        data-node-id="50:73"
                        data-name="Frame"
                      >
                        <Icon
                          className="shrink-0 text-accent-700"
                          label="Fabrication artisanale locale de mobilier scolaire à Obala"
                          name="building"
                          size={20}
                        />
                      </div>
                      <div
                        className="[word-break:break-word] content-stretch flex flex-col font-['Montserrat:Bold'] font-bold gap-[4px] items-start relative shrink-0"
                        data-node-id="50:74"
                        data-name="Frame"
                      >
                        <p
                          className="leading-[14px] relative shrink-0 text-ink-700 text-[10px] tracking-[0.08em] uppercase whitespace-nowrap"
                          data-node-id="50:75"
                        >
                          {featuredProject
                            ? "CHANTER EN VEDETTE"
                            : "PROCÈS-VERBAL OFFICIEL"}
                        </p>
                        {featuredProject?.impactValue ? (
                          <p className="leading-[22px] relative shrink-0 text-accent-700 text-[18px] whitespace-nowrap">
                            {featuredProject.impactValue}
                          </p>
                        ) : null}
                        <p className="leading-[22px] relative shrink-0 text-brand-900 text-[18px]">
                          {featuredProject ? (
                            featuredProject.impactLabel ??
                              featuredProject.statusLabel
                          ) : (
                            <>
                              <span className="text-accent-700">120 bancs</span>{" "}
                              livrés
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                    <span
                      className="bg-[rgba(0,110,45,0.1)] content-stretch flex gap-[6px] items-center px-[12px] py-[6px] relative rounded-pill shrink-0 text-accent-700"
                      data-node-id="50:76"
                      data-name="Frame"
                    >
                      <Icon name="check" size={12} className="shrink-0" />
                      <p className="[word-break:break-word] font-['Montserrat:Bold'] font-bold leading-[16px] relative shrink-0 text-[11px] tracking-[0.04em] uppercase whitespace-nowrap">
                        {featuredProject
                          ? featuredProject.consentVerified
                            ? "Vérifié terrain"
                            : featuredProject.statusLabel
                          : "Vérifié terrain"}
                      </p>
                    </span>
                  </div>
                </div>
              </div>
              <div
                className="content-stretch grid grid-cols-1 gap-[16px] items-start pt-[24px] relative shrink-0 w-full sm:grid-cols-2 lg:grid-cols-4"
                data-node-id="50:76"
                data-name="4 KPI Badges Bento"
              >
                <div
                  className="bg-white content-stretch drop-shadow-card flex flex-col items-start justify-between min-w-0 p-[20px] relative rounded-[16px] shadow-hero ring-1 ring-black/5"
                  data-node-id="50:77"
                  data-name="Frame"
                >
                  <div
                    className="content-stretch flex items-center justify-between relative shrink-0 w-full"
                    data-node-id="50:78"
                    data-name="Frame"
                  >
                    <Icon
                      className="shrink-0 text-accent-700"
                      label="Forage d'eau sécurisé dans une école de Mora"
                      name="droplet"
                      size={24}
                    />
                    <div
                      className="bg-[rgba(0,110,45,0.1)] content-stretch flex flex-col items-start px-[8px] py-[2px] relative rounded-pill shrink-0"
                      data-node-id="50:80"
                      data-name="Frame"
                    >
                      <p
                        className="[word-break:break-word] font-['Montserrat:Bold'] font-bold leading-[16px] relative shrink-0 text-accent-700 text-[11px] whitespace-nowrap"
                        data-node-id="50:81"
                      >
                        National
                      </p>
                    </div>
                  </div>
                  <div
                    className="[word-break:break-word] content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full"
                    data-node-id="50:82"
                    data-name="Frame"
                  >
                    <div
                      className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full whitespace-nowrap"
                      data-node-id="50:83"
                      data-name="Frame"
                    >
                      <p
                        className="font-['Montserrat:ExtraBold'] font-extrabold leading-[56px] relative shrink-0 text-brand-900 text-[48px]"
                        data-node-id="50:84"
                      >{impact.coveredRegions} </p>
                      <p
                        className="font-['Montserrat:SemiBold'] font-semibold leading-[32px] relative shrink-0 text-ink-700 text-[24px]"
                        data-node-id="50:85"
                      >
                        / 10
                      </p>
                    </div>
                    <p
                      className="font-['Inter:Bold'] font-bold leading-[20px] not-italic relative shrink-0 text-ink-900 text-[14px] w-full"
                      data-node-id="50:86"
                    >
                      Régions Couvertes
                    </p>
                    <div
                      className="font-['Inter:Regular'] font-normal leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] w-full"
                      data-node-id="50:87"
                    >
                      <p className="leading-[20px] mb-0">
                        Chantiers planifiés ou audités
                      </p>
                      <p className="leading-[20px]">
                        avec les délégations régionales.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="bg-white content-stretch drop-shadow-card flex flex-col items-start justify-between min-w-0 p-[20px] relative rounded-[16px] shadow-hero ring-1 ring-black/5"
                  data-node-id="50:88"
                  data-name="Frame"
                >
                  <div
                    className="content-stretch flex items-center justify-between relative shrink-0 w-full"
                    data-node-id="50:89"
                    data-name="Frame"
                  >
                    <Icon
                      className="shrink-0 text-warn-700"
                      label="Livraison de trois classes rénovées"
                      name="graduationCap"
                      size={20}
                    />
                    <div
                      className="bg-warn-100 content-stretch flex flex-col items-start px-[8px] py-[2px] relative rounded-pill shrink-0"
                      data-node-id="50:91"
                      data-name="Frame"
                    >
                      <p
                        className="[word-break:break-word] font-['Montserrat:Bold'] font-bold leading-[16px] relative shrink-0 text-warn-700 text-[11px] whitespace-nowrap"
                        data-node-id="50:92"
                      >
                        Cible
                      </p>
                    </div>
                  </div>
                  <div
                    className="[word-break:break-word] content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full"
                    data-node-id="50:93"
                    data-name="Frame"
                  >
                    <div
                      className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full whitespace-nowrap"
                      data-node-id="50:94"
                      data-name="Frame"
                    >
                      <p
                        className="font-['Montserrat:ExtraBold'] font-extrabold leading-[56px] relative shrink-0 text-warn-700 text-[48px]"
                        data-node-id="50:95"
                      >{`3 - 15 `}</p>
                      <p
                        className="font-['Montserrat:SemiBold'] font-semibold leading-[32px] relative shrink-0 text-ink-700 text-[24px]"
                        data-node-id="50:96"
                      >
                        ans
                      </p>
                    </div>
                    <p
                      className="font-['Inter:Bold'] font-bold leading-[20px] not-italic relative shrink-0 text-ink-900 text-[14px] w-full"
                      data-node-id="50:97"
                    >{`Tranche d'Âge Pivot`}</p>
                    <div
                      className="font-['Inter:Regular'] font-normal leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] w-full"
                      data-node-id="50:98"
                    >
                      <p className="leading-[20px] mb-0">
                        Cycles complets maternelle et
                      </p>
                      <p className="leading-[20px] mb-0">
                        primaire dans les zones
                      </p>
                      <p className="leading-[20px]">enclavées.</p>
                    </div>
                  </div>
                </div>
                <div
                  className="bg-white content-stretch drop-shadow-card flex flex-col items-start justify-between min-w-0 p-[20px] relative rounded-[16px] shadow-hero ring-1 ring-black/5"
                  data-node-id="50:99"
                  data-name="Frame"
                >
                  <div
                    className="content-stretch flex items-center justify-between relative shrink-0 w-full"
                    data-node-id="50:100"
                    data-name="Frame"
                  >
                    <Icon name="recycle" size={24} className="shrink-0" />
                    <div
                      className="bg-[rgba(0,110,45,0.1)] content-stretch flex flex-col items-start px-[8px] py-[2px] relative rounded-pill shrink-0"
                      data-node-id="50:102"
                      data-name="Frame"
                    >
                      <p
                        className="[word-break:break-word] font-['Montserrat:Bold'] font-bold leading-[16px] relative shrink-0 text-accent-700 text-[11px] whitespace-nowrap"
                        data-node-id="50:103"
                      >
                        Économie Circulaire
                      </p>
                    </div>
                  </div>
                  <div
                    className="[word-break:break-word] content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full"
                    data-node-id="50:104"
                    data-name="Frame"
                  >
                    <div
                      className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 text-accent-700 w-full whitespace-nowrap"
                      data-node-id="50:105"
                      data-name="Frame"
                    >
                      <p
                        className="font-['Montserrat:ExtraBold'] font-extrabold leading-[56px] relative shrink-0 text-[48px]"
                        data-node-id="50:106"
                      >
                        100
                      </p>
                      <p
                        className="font-['Montserrat:SemiBold'] font-semibold leading-[32px] relative shrink-0 text-[24px]"
                        data-node-id="50:107"
                      >
                        %
                      </p>
                    </div>
                    <p
                      className="font-['Inter:Bold'] font-bold leading-[20px] not-italic relative shrink-0 text-ink-900 text-[14px] w-full"
                      data-node-id="50:108"
                    >{`Matériaux & Artisans Locaux`}</p>
                    <div
                      className="font-['Inter:Regular'] font-normal leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] w-full"
                      data-node-id="50:109"
                    >
                      <p className="leading-[20px] mb-0">
                        Menuisiers, maçons et
                      </p>
                      <p className="leading-[20px] mb-0">
                        fournisseurs issus des communes
                      </p>
                      <p className="leading-[20px]">{`d'intervention.`}</p>
                    </div>
                  </div>
                </div>
                <div
                  className="bg-white content-stretch drop-shadow-card flex flex-col items-start justify-between min-w-0 p-[20px] relative rounded-[16px] shadow-hero ring-1 ring-black/5"
                  data-node-id="50:110"
                  data-name="Frame"
                >
                  <div
                    className="content-stretch flex items-center justify-between relative shrink-0 w-full"
                    data-node-id="50:111"
                    data-name="Frame"
                  >
                    <Icon name="scale" size={24} className="shrink-0" />
                    <div
                      className="bg-brand-100 content-stretch flex flex-col items-start px-[8px] py-[2px] relative rounded-pill shrink-0"
                      data-node-id="50:113"
                      data-name="Frame"
                    >
                      <p
                        className="[word-break:break-word] font-['Montserrat:Bold'] font-bold leading-[16px] relative shrink-0 text-brand-900 text-[11px] whitespace-nowrap"
                        data-node-id="50:114"
                      >
                        Éthique
                      </p>
                    </div>
                  </div>
                  <div
                    className="[word-break:break-word] content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full"
                    data-node-id="50:115"
                    data-name="Frame"
                  >
                    <div
                      className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full whitespace-nowrap"
                      data-node-id="50:116"
                      data-name="Frame"
                    >
                      <p
                        className="font-['Montserrat:ExtraBold'] font-extrabold leading-[56px] relative shrink-0 text-brand-900 text-[48px]"
                        data-node-id="50:117"
                      >{`0 `}</p>
                      <p
                        className="font-['Montserrat:SemiBold'] font-semibold leading-[32px] relative shrink-0 text-ink-700 text-[24px]"
                        data-node-id="50:118"
                      >
                        FCFA
                      </p>
                    </div>
                    <p
                      className="font-['Inter:Bold'] font-bold leading-[20px] not-italic relative shrink-0 text-ink-900 text-[14px] w-full"
                      data-node-id="50:119"
                    >
                      Frais Occultes
                    </p>
                    <div
                      className="font-['Inter:Regular'] font-normal leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] w-full"
                      data-node-id="50:120"
                    >
                      <p className="leading-[20px] mb-0">
                        Traçabilité intégrale validée avec
                      </p>
                      <p className="leading-[20px]">{`comptes d'affectation bancaire.`}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="bg-surface-subtle content-stretch flex flex-col items-start relative shrink-0 w-full shell"
            data-node-id="50:121"
            data-name="Section - SECTION CARTOGRAPHIE INTERACTIVE DES 10 RÉGIONS"
          >
            <div
              className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full shell"
              data-node-id="50:122"
              data-name="Container"
            >
              <div
                className="content-stretch flex items-end justify-between relative shrink-0 w-full"
                data-node-id="50:123"
                data-name="Frame"
              >
                <div
                  className="content-stretch flex flex-col gap-[7px] items-start relative shell-prose"
                  data-node-id="50:124"
                  data-name="Frame"
                >
                  <div
                    className="bg-[rgba(0,110,45,0.1)] content-stretch flex flex-col items-start px-[12px] py-[3px] relative rounded-pill shrink-0"
                    data-node-id="50:125"
                    data-name="Frame"
                  >
                    <p
                      className="[word-break:break-word] font-['Montserrat:Bold'] font-bold leading-[16px] relative shrink-0 text-accent-700 text-micro tracking-[1.1px] uppercase whitespace-nowrap"
                      data-node-id="50:126"
                    >
                      ANCRAGE TERRITORIAL CERTIFIÉ
                    </p>
                  </div>
                  <div
                    className="[word-break:break-word] font-['Montserrat:Bold'] font-bold min-w-full relative shrink-0 text-brand-900 text-h2 tracking-[-0.4px] w-full"
                    data-node-id="50:127"
                  >
                    <p>{`Présence & Cartographie des Interventions dans les 10 Régions`}</p>
                  </div>
                  <div
                    className="[word-break:break-word] font-['Inter:Regular'] font-normal min-w-full not-italic relative shrink-0 text-[#424751] text-lead w-full"
                    data-node-id="50:128"
                  >
                    <p>{`Aucun territoire n'est laissé pour compte. Cliquez sur une région pour filtrer les réalisations matérielles, le volume d'élèves accompagnés et les protocoles locaux déployés.`}</p>
                  </div>
                </div>
                <div
                  className="content-center flex flex-wrap gap-[8px] items-center relative shell-content"
                  data-node-id="50:129"
                  data-name="Frame"
                >
                  <div
                    className="bg-brand-900 content-stretch drop-shadow-card flex flex-col items-center justify-center px-[16px] py-[8px] relative rounded-pill shrink-0"
                    data-node-id="50:130"
                    data-name="Frame"
                  >
                    <p
                      className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold not-italic relative shrink-0 text-caption text-center text-white whitespace-nowrap"
                      data-node-id="50:131"
                    >
                      Toutes (10)
                    </p>
                  </div>
                  <div
                    className="bg-surface-tint content-stretch flex flex-col items-center justify-center px-[16px] py-[8px] relative rounded-pill shrink-0"
                    data-node-id="50:132"
                    data-name="Frame"
                  >
                    <p
                      className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold not-italic relative shrink-0 text-ink-900 text-caption text-center whitespace-nowrap"
                      data-node-id="50:133"
                    >
                      Septentrion
                    </p>
                  </div>
                  <div
                    className="bg-surface-tint content-stretch flex flex-col items-center justify-center px-[16px] py-[8px] relative rounded-pill shrink-0"
                    data-node-id="50:134"
                    data-name="Frame"
                  >
                    <p
                      className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold not-italic relative shrink-0 text-ink-900 text-caption text-center whitespace-nowrap"
                      data-node-id="50:135"
                    >
                      Centre / Sud / Est
                    </p>
                  </div>
                  <div
                    className="bg-surface-tint content-stretch flex flex-col items-center justify-center px-[16px] py-[8px] relative rounded-pill shrink-0"
                    data-node-id="50:136"
                    data-name="Frame"
                  >
                    <p
                      className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold not-italic relative shrink-0 text-ink-900 text-caption text-center whitespace-nowrap"
                      data-node-id="50:137"
                    >
                      Littoral / Ouest
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full"
                data-node-id="50:138"
                data-name="Bento Grid des Régions"
              >
                <div
                  className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full"
                  data-node-id="50:139"
                  data-name="Frame"
                >
                  <div
                    className="bg-white content-stretch drop-shadow-card flex flex-[1_0_0] flex-col items-start justify-between min-w-px p-[20px] relative rounded-card"
                    data-node-id="50:140"
                    data-name="Frame"
                  >
                    <div
                      className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full"
                      data-node-id="50:141"
                      data-name="Frame"
                    >
                      <div
                        className="content-stretch flex items-center justify-between relative shrink-0 w-full"
                        data-node-id="50:142"
                        data-name="Frame"
                      >
                        <div
                          className="bg-warn-100 content-stretch flex flex-col items-start px-[8px] py-[2px] relative rounded-pill shrink-0"
                          data-node-id="50:143"
                          data-name="Frame"
                        >
                          <p
                            className="[word-break:break-word] font-['Montserrat:Bold'] font-bold leading-[16px] relative shrink-0 text-warn-700 text-micro whitespace-nowrap"
                            data-node-id="50:144"
                          >
                            Sahélien
                          </p>
                        </div>
                        <Icon name="droplet" size={16} className="shrink-0" />
                      </div>
                      <p
                        className="[word-break:break-word] font-['Montserrat:Bold'] font-bold relative shrink-0 text-brand-900 text-h4 w-full"
                        data-node-id="50:146"
                      >
                        Extrême-Nord
                      </p>
                      <p
                        className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold not-italic relative shrink-0 text-ink-700 text-caption w-full"
                        data-node-id="50:147"
                      >
                        Mora • Kousséri
                      </p>
                      <div
                        className="[word-break:break-word] font-['Inter:Regular'] font-normal not-italic relative shrink-0 text-ink-900 text-body w-full"
                        data-node-id="50:148"
                      >
                        <p className="mb-0">Forages WASH sécurisés à</p>
                        <p className="mb-0">énergie solaire et abris</p>
                        <p>scolaires thermiques.</p>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full"
                      data-node-id="50:149"
                      data-name="Frame"
                    >
                      <div
                        className="[word-break:break-word] bg-surface-muted content-stretch flex items-center justify-between leading-[16px] not-italic pb-[10px] pt-[12px] px-[10px] relative rounded-control shrink-0 text-small w-full whitespace-nowrap"
                        data-node-id="50:150"
                        data-name="Frame"
                      >
                        <p
                          className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-ink-700"
                          data-node-id="50:151"
                        >
                          Élèves :
                        </p>
                        <p
                          className="font-['Inter:Bold'] font-bold relative shrink-0 text-brand-900"
                          data-node-id="50:152"
                        >
                          {regionPupils(impact, "Extrême-Nord", "2 480 bénéficiaires")}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="bg-white content-stretch drop-shadow-card flex flex-[1_0_0] flex-col items-start justify-between min-w-px p-[20px] relative rounded-card"
                    data-node-id="50:153"
                    data-name="Frame"
                  >
                    <div
                      className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full"
                      data-node-id="50:154"
                      data-name="Frame"
                    >
                      <div
                        className="content-stretch flex items-center justify-between relative shrink-0 w-full"
                        data-node-id="50:155"
                        data-name="Frame"
                      >
                        <div
                          className="bg-brand-100 content-stretch flex flex-col items-start px-[8px] py-[2px] relative rounded-pill shrink-0"
                          data-node-id="50:156"
                          data-name="Frame"
                        >
                          <p
                            className="[word-break:break-word] font-['Montserrat:Bold'] font-bold leading-[16px] relative shrink-0 text-brand-900 text-micro whitespace-nowrap"
                            data-node-id="50:157"
                          >
                            Scolarité
                          </p>
                        </div>
                        <Icon name="bookOpen" size={16} className="shrink-0" />
                      </div>
                      <p
                        className="[word-break:break-word] font-['Montserrat:Bold'] font-bold relative shrink-0 text-brand-900 text-h4 w-full"
                        data-node-id="50:159"
                      >
                        Nord
                      </p>
                      <p
                        className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold not-italic relative shrink-0 text-ink-700 text-caption w-full"
                        data-node-id="50:160"
                      >
                        Garoua • Guider
                      </p>
                      <div
                        className="[word-break:break-word] font-['Inter:Regular'] font-normal not-italic relative shrink-0 text-ink-900 text-body w-full"
                        data-node-id="50:161"
                      >
                        <p className="mb-0">Kits didactiques bilingues</p>
                        <p className="mb-0">et tableaux mobiles pour</p>
                        <p>écoles rurales isolées.</p>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full"
                      data-node-id="50:162"
                      data-name="Frame"
                    >
                      <div
                        className="[word-break:break-word] bg-surface-muted content-stretch flex items-center justify-between leading-[16px] not-italic pb-[10px] pt-[12px] px-[10px] relative rounded-control shrink-0 text-small w-full whitespace-nowrap"
                        data-node-id="50:163"
                        data-name="Frame"
                      >
                        <p
                          className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-ink-700"
                          data-node-id="50:164"
                        >
                          Élèves :
                        </p>
                        <p
                          className="font-['Inter:Bold'] font-bold relative shrink-0 text-brand-900"
                          data-node-id="50:165"
                        >
                          {regionPupils(impact, "Nord", "1 920 bénéficiaires")}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="bg-white content-stretch drop-shadow-card flex flex-[1_0_0] flex-col items-start justify-between min-w-px p-[20px] relative rounded-card"
                    data-node-id="50:166"
                    data-name="Frame"
                  >
                    <div
                      className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full"
                      data-node-id="50:167"
                      data-name="Frame"
                    >
                      <div
                        className="content-stretch flex items-center justify-between relative shrink-0 w-full"
                        data-node-id="50:168"
                        data-name="Frame"
                      >
                        <div
                          className="bg-accent-300 content-stretch flex flex-col items-start px-[8px] py-[2px] relative rounded-pill shrink-0"
                          data-node-id="50:169"
                          data-name="Frame"
                        >
                          <p
                            className="[word-break:break-word] font-['Montserrat:Bold'] font-bold relative shrink-0 text-accent-700 text-micro whitespace-nowrap"
                            data-node-id="50:170"
                          >
                            Nutrition
                          </p>
                        </div>
                        <Icon name="utensils" size={16} className="shrink-0" />
                      </div>
                      <p
                        className="[word-break:break-word] font-['Montserrat:Bold'] font-bold relative shrink-0 text-brand-900 text-h4 w-full"
                        data-node-id="50:172"
                      >
                        Adamaoua
                      </p>
                      <p
                        className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold not-italic relative shrink-0 text-ink-700 text-caption w-full"
                        data-node-id="50:173"
                      >
                        Ngaoundéré • Meiganga
                      </p>
                      <div
                        className="[word-break:break-word] font-['Inter:Regular'] font-normal not-italic relative shrink-0 text-ink-900 text-body w-full"
                        data-node-id="50:174"
                      >
                        <p className="mb-0">Équipements de brousse,</p>
                        <p className="mb-0">potagers scolaires et</p>
                        <p>cantines solidaires.</p>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full"
                      data-node-id="50:175"
                      data-name="Frame"
                    >
                      <div
                        className="[word-break:break-word] bg-surface-muted content-stretch flex items-center justify-between leading-[16px] not-italic pb-[10px] pt-[12px] px-[10px] relative rounded-control shrink-0 text-small w-full whitespace-nowrap"
                        data-node-id="50:176"
                        data-name="Frame"
                      >
                        <p
                          className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-ink-700"
                          data-node-id="50:177"
                        >
                          Élèves :
                        </p>
                        <p
                          className="font-['Inter:Bold'] font-bold relative shrink-0 text-brand-900"
                          data-node-id="50:178"
                        >
                          {regionPupils(impact, "Adamaoua", "1 450 bénéficiaires")}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="bg-white content-stretch drop-shadow-card flex flex-[1_0_0] flex-col items-start justify-between min-w-px p-[20px] relative rounded-card"
                    data-node-id="50:179"
                    data-name="Frame"
                  >
                    <div
                      className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full"
                      data-node-id="50:180"
                      data-name="Frame"
                    >
                      <div
                        className="content-stretch flex items-center justify-between relative shrink-0 w-full"
                        data-node-id="50:181"
                        data-name="Frame"
                      >
                        <div
                          className="bg-brand-100 content-stretch flex flex-col items-start px-[8px] py-[2px] relative rounded-pill shrink-0"
                          data-node-id="50:182"
                          data-name="Frame"
                        >
                          <p
                            className="[word-break:break-word] font-['Montserrat:Bold'] font-bold leading-[16px] relative shrink-0 text-brand-900 text-micro whitespace-nowrap"
                            data-node-id="50:183"
                          >
                            Bâti Scolaire
                          </p>
                        </div>
                        <Icon name="home" size={16} className="shrink-0" />
                      </div>
                      <p
                        className="[word-break:break-word] font-['Montserrat:Bold'] font-bold relative shrink-0 text-brand-900 text-h4 w-full"
                        data-node-id="50:185"
                      >
                        Centre
                      </p>
                      <p
                        className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold not-italic relative shrink-0 text-ink-700 text-caption w-full"
                        data-node-id="50:186"
                      >
                        Ngambé-Tikar • Obala
                      </p>
                      <div
                        className="[word-break:break-word] font-['Inter:Regular'] font-normal not-italic relative shrink-0 text-ink-900 text-body w-full"
                        data-node-id="50:187"
                      >
                        <p className="mb-0">Rénovation durable de</p>
                        <p className="mb-0">toitures alu et bancs en</p>
                        <p>bois massif certifié.</p>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full"
                      data-node-id="50:188"
                      data-name="Frame"
                    >
                      <div
                        className="[word-break:break-word] bg-surface-muted content-stretch flex items-center justify-between leading-[16px] not-italic pb-[10px] pt-[12px] px-[10px] relative rounded-control shrink-0 text-small w-full whitespace-nowrap"
                        data-node-id="50:189"
                        data-name="Frame"
                      >
                        <p
                          className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-ink-700"
                          data-node-id="50:190"
                        >
                          Élèves :
                        </p>
                        <p
                          className="font-['Inter:Bold'] font-bold relative shrink-0 text-brand-900"
                          data-node-id="50:191"
                        >
                          {regionPupils(impact, "Centre", "2 100 bénéficiaires")}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="bg-white content-stretch drop-shadow-card flex flex-[1_0_0] flex-col items-start justify-between min-w-px p-[20px] relative rounded-card"
                    data-node-id="50:192"
                    data-name="Frame"
                  >
                    <div
                      className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full"
                      data-node-id="50:193"
                      data-name="Frame"
                    >
                      <div
                        className="content-stretch flex items-center justify-between relative shrink-0 w-full"
                        data-node-id="50:194"
                        data-name="Frame"
                      >
                        <div
                          className="bg-warn-100 content-stretch flex flex-col items-start px-[8px] py-[2px] relative rounded-pill shrink-0"
                          data-node-id="50:195"
                          data-name="Frame"
                        >
                          <p
                            className="[word-break:break-word] font-['Montserrat:Bold'] font-bold leading-[16px] relative shrink-0 text-warn-700 text-micro whitespace-nowrap"
                            data-node-id="50:196"
                          >
                            Urgence Prioritaire
                          </p>
                        </div>
                        <Icon
                          name="alertTriangle"
                          size={16}
                          className="shrink-0"
                        />
                      </div>
                      <p
                        className="[word-break:break-word] font-['Montserrat:Bold'] font-bold relative shrink-0 text-brand-900 text-h4 w-full"
                        data-node-id="50:198"
                      >
                        Est
                      </p>
                      <p
                        className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold not-italic relative shrink-0 text-ink-700 text-caption w-full"
                        data-node-id="50:199"
                      >
                        Dimako • Batouri
                      </p>
                      <div
                        className="[word-break:break-word] font-['Inter:Regular'] font-normal not-italic relative shrink-0 text-ink-900 text-body w-full"
                        data-node-id="50:200"
                      >
                        <p className="mb-0">Réhabilitation intégrale de</p>
                        <p className="mb-0">3 classes, sécurisation et</p>
                        <p>latrines sèches.</p>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full"
                      data-node-id="50:201"
                      data-name="Frame"
                    >
                      <div
                        className="[word-break:break-word] bg-surface-muted content-stretch flex items-center justify-between leading-[16px] not-italic pb-[10px] pt-[12px] px-[10px] relative rounded-control shrink-0 text-small w-full whitespace-nowrap"
                        data-node-id="50:202"
                        data-name="Frame"
                      >
                        <p
                          className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-ink-700"
                          data-node-id="50:203"
                        >
                          Élèves :
                        </p>
                        <p
                          className="font-['Inter:Bold'] font-bold relative shrink-0 text-brand-900"
                          data-node-id="50:204"
                        >
                          {regionPupils(impact, "Est", "3 120 bénéficiaires")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full"
                  data-node-id="50:205"
                  data-name="Frame"
                >
                  <div
                    className="bg-white content-stretch drop-shadow-card flex flex-[1_0_0] flex-col items-start justify-between min-w-px p-[20px] relative rounded-card"
                    data-node-id="50:206"
                    data-name="Frame"
                  >
                    <div
                      className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full"
                      data-node-id="50:207"
                      data-name="Frame"
                    >
                      <div
                        className="content-stretch flex items-center justify-between relative shrink-0 w-full"
                        data-node-id="50:208"
                        data-name="Frame"
                      >
                        <div
                          className="bg-accent-300 content-stretch flex flex-col items-start px-[8px] py-[2px] relative rounded-pill shrink-0"
                          data-node-id="50:209"
                          data-name="Frame"
                        >
                          <p
                            className="[word-break:break-word] font-['Montserrat:Bold'] font-bold relative shrink-0 text-accent-700 text-micro whitespace-nowrap"
                            data-node-id="50:210"
                          >
                            Santé
                          </p>
                        </div>
                        <Icon
                          name="heartPulse"
                          size={16}
                          className="shrink-0"
                        />
                      </div>
                      <p
                        className="[word-break:break-word] font-['Montserrat:Bold'] font-bold relative shrink-0 text-brand-900 text-h4 w-full"
                        data-node-id="50:212"
                      >
                        Sud
                      </p>
                      <p
                        className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold not-italic relative shrink-0 text-ink-700 text-caption w-full"
                        data-node-id="50:213"
                      >
                        Ebolowa • Sangmélima
                      </p>
                      <div
                        className="[word-break:break-word] font-['Inter:Regular'] font-normal not-italic relative shrink-0 text-ink-900 text-body w-full"
                        data-node-id="50:214"
                      >
                        <p className="mb-0">Armoires à pharmacie de</p>
                        <p className="mb-0">brousse, déparasitage et</p>
                        <p>suivi visuel.</p>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full"
                      data-node-id="50:215"
                      data-name="Frame"
                    >
                      <div
                        className="[word-break:break-word] bg-surface-muted content-stretch flex items-center justify-between leading-[16px] not-italic pb-[10px] pt-[12px] px-[10px] relative rounded-control shrink-0 text-small w-full whitespace-nowrap"
                        data-node-id="50:216"
                        data-name="Frame"
                      >
                        <p
                          className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-ink-700"
                          data-node-id="50:217"
                        >
                          Élèves :
                        </p>
                        <p
                          className="font-['Inter:Bold'] font-bold relative shrink-0 text-brand-900"
                          data-node-id="50:218"
                        >
                          {regionPupils(impact, "Sud", "1 680 bénéficiaires")}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="bg-white content-stretch drop-shadow-card flex flex-[1_0_0] flex-col items-start justify-between min-w-px p-[20px] relative rounded-card"
                    data-node-id="50:219"
                    data-name="Frame"
                  >
                    <div
                      className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full"
                      data-node-id="50:220"
                      data-name="Frame"
                    >
                      <div
                        className="content-stretch flex items-center justify-between relative shrink-0 w-full"
                        data-node-id="50:221"
                        data-name="Frame"
                      >
                        <div
                          className="bg-brand-100 content-stretch flex flex-col items-start px-[8px] py-[2px] relative rounded-pill shrink-0"
                          data-node-id="50:222"
                          data-name="Frame"
                        >
                          <p
                            className="[word-break:break-word] font-['Montserrat:Bold'] font-bold leading-[16px] relative shrink-0 text-brand-900 text-micro whitespace-nowrap"
                            data-node-id="50:223"
                          >
                            Culture
                          </p>
                        </div>
                        <Icon name="palette" size={16} className="shrink-0" />
                      </div>
                      <p
                        className="[word-break:break-word] font-['Montserrat:Bold'] font-bold relative shrink-0 text-brand-900 text-h4 w-full"
                        data-node-id="50:225"
                      >
                        Littoral
                      </p>
                      <p
                        className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold not-italic relative shrink-0 text-ink-700 text-caption w-full"
                        data-node-id="50:226"
                      >
                        Penja • Loum
                      </p>
                      <div
                        className="[word-break:break-word] font-['Inter:Regular'] font-normal not-italic relative shrink-0 text-ink-900 text-body w-full"
                        data-node-id="50:227"
                      >
                        <p className="mb-0">Bibliothèques</p>
                        <p className="mb-0">communautaires mobiles</p>
                        <p className="mb-0">et mallettes pédagogiques</p>
                        <p>de contes.</p>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full"
                      data-node-id="50:228"
                      data-name="Frame"
                    >
                      <div
                        className="[word-break:break-word] bg-surface-muted content-stretch flex items-center justify-between leading-[16px] not-italic pb-[10px] pt-[12px] px-[10px] relative rounded-control shrink-0 text-small w-full whitespace-nowrap"
                        data-node-id="50:229"
                        data-name="Frame"
                      >
                        <p
                          className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-ink-700"
                          data-node-id="50:230"
                        >
                          Élèves :
                        </p>
                        <p
                          className="font-['Inter:Bold'] font-bold relative shrink-0 text-brand-900"
                          data-node-id="50:231"
                        >
                          {regionPupils(impact, "Littoral", "2 040 bénéficiaires")}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="bg-white content-stretch drop-shadow-card flex flex-[1_0_0] flex-col items-start justify-between min-w-px p-[20px] relative rounded-card"
                    data-node-id="50:232"
                    data-name="Frame"
                  >
                    <div
                      className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full"
                      data-node-id="50:233"
                      data-name="Frame"
                    >
                      <div
                        className="content-stretch flex items-center justify-between relative shrink-0 w-full"
                        data-node-id="50:234"
                        data-name="Frame"
                      >
                        <div
                          className="bg-accent-300 content-stretch flex flex-col items-start px-[8px] py-[2px] relative rounded-pill shrink-0"
                          data-node-id="50:235"
                          data-name="Frame"
                        >
                          <p
                            className="[word-break:break-word] font-['Montserrat:Bold'] font-bold relative shrink-0 text-accent-700 text-micro whitespace-nowrap"
                            data-node-id="50:236"
                          >
                            Hygiène
                          </p>
                        </div>
                        <Icon name="sparkles" size={16} className="shrink-0" />
                      </div>
                      <p
                        className="[word-break:break-word] font-['Montserrat:Bold'] font-bold relative shrink-0 text-brand-900 text-h4 w-full"
                        data-node-id="50:238"
                      >
                        Ouest
                      </p>
                      <p
                        className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold not-italic relative shrink-0 text-ink-700 text-caption w-full"
                        data-node-id="50:239"
                      >
                        Foumban • Bafoussam
                      </p>
                      <div
                        className="[word-break:break-word] font-['Inter:Regular'] font-normal not-italic relative shrink-0 text-ink-900 text-body w-full"
                        data-node-id="50:240"
                      >
                        <p className="mb-0">Blocs sanitaires VIP</p>
                        <p className="mb-0">ventilés et stations de</p>
                        <p>lavage des mains à pédale.</p>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full"
                      data-node-id="50:241"
                      data-name="Frame"
                    >
                      <div
                        className="[word-break:break-word] bg-surface-muted content-stretch flex items-center justify-between leading-[16px] not-italic pb-[10px] pt-[12px] px-[10px] relative rounded-control shrink-0 text-small w-full whitespace-nowrap"
                        data-node-id="50:242"
                        data-name="Frame"
                      >
                        <p
                          className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-ink-700"
                          data-node-id="50:243"
                        >
                          Élèves :
                        </p>
                        <p
                          className="font-['Inter:Bold'] font-bold relative shrink-0 text-brand-900"
                          data-node-id="50:244"
                        >
                          {regionPupils(impact, "Ouest", "2 890 bénéficiaires")}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="bg-white content-stretch drop-shadow-card flex flex-[1_0_0] flex-col items-start justify-between min-w-px p-[20px] relative rounded-card"
                    data-node-id="50:245"
                    data-name="Frame"
                  >
                    <div
                      className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full"
                      data-node-id="50:246"
                      data-name="Frame"
                    >
                      <div
                        className="content-stretch flex items-center justify-between relative shrink-0 w-full"
                        data-node-id="50:247"
                        data-name="Frame"
                      >
                        <div
                          className="bg-warn-100 content-stretch flex flex-col items-start px-[8px] py-[2px] relative rounded-pill shrink-0"
                          data-node-id="50:248"
                          data-name="Frame"
                        >
                          <p
                            className="[word-break:break-word] font-['Montserrat:Bold'] font-bold leading-[16px] relative shrink-0 text-warn-700 text-micro whitespace-nowrap"
                            data-node-id="50:249"
                          >
                            Résilience
                          </p>
                        </div>
                        <Icon name="shield" size={16} className="shrink-0" />
                      </div>
                      <p
                        className="[word-break:break-word] font-['Montserrat:Bold'] font-bold relative shrink-0 text-brand-900 text-h4 w-full"
                        data-node-id="50:251"
                      >
                        Nord-Ouest
                      </p>
                      <p
                        className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold not-italic relative shrink-0 text-ink-700 text-caption w-full"
                        data-node-id="50:252"
                      >
                        Bamenda Rural
                      </p>
                      <div
                        className="[word-break:break-word] font-['Inter:Regular'] font-normal not-italic relative shrink-0 text-ink-900 text-body w-full"
                        data-node-id="50:253"
                      >
                        <p className="mb-0">{`Appui d'urgence aux`}</p>
                        <p className="mb-0">écoles communautaires et</p>
                        <p className="mb-0">{`cahiers d'auto-`}</p>
                        <p>apprentissage.</p>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full"
                      data-node-id="50:254"
                      data-name="Frame"
                    >
                      <div
                        className="[word-break:break-word] bg-surface-muted content-stretch flex items-center justify-between leading-[16px] not-italic pb-[10px] pt-[12px] px-[10px] relative rounded-control shrink-0 text-small w-full whitespace-nowrap"
                        data-node-id="50:255"
                        data-name="Frame"
                      >
                        <p
                          className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-ink-700"
                          data-node-id="50:256"
                        >
                          Élèves :
                        </p>
                        <p
                          className="font-['Inter:Bold'] font-bold relative shrink-0 text-brand-900"
                          data-node-id="50:257"
                        >
                          {regionPupils(impact, "Nord-Ouest", "1 750 bénéficiaires")}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="bg-white content-stretch drop-shadow-card flex flex-[1_0_0] flex-col items-start justify-between min-w-px p-[20px] relative rounded-card"
                    data-node-id="50:258"
                    data-name="Frame"
                  >
                    <div
                      className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full"
                      data-node-id="50:259"
                      data-name="Frame"
                    >
                      <div
                        className="content-stretch flex items-center justify-between relative shrink-0 w-full"
                        data-node-id="50:260"
                        data-name="Frame"
                      >
                        <div
                          className="bg-brand-100 content-stretch flex flex-col items-start px-[8px] py-[2px] relative rounded-pill shrink-0"
                          data-node-id="50:261"
                          data-name="Frame"
                        >
                          <p
                            className="[word-break:break-word] font-['Montserrat:Bold'] font-bold leading-[16px] relative shrink-0 text-brand-900 text-micro whitespace-nowrap"
                            data-node-id="50:262"
                          >
                            Psycho-Social
                          </p>
                        </div>
                        <Icon name="brain" size={16} className="shrink-0" />
                      </div>
                      <p
                        className="[word-break:break-word] font-['Montserrat:Bold'] font-bold relative shrink-0 text-brand-900 text-h4 w-full"
                        data-node-id="50:264"
                      >
                        Sud-Ouest
                      </p>
                      <p
                        className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold not-italic relative shrink-0 text-ink-700 text-caption w-full"
                        data-node-id="50:265"
                      >
                        Buea • Limbe Outskirts
                      </p>
                      <div
                        className="[word-break:break-word] font-['Inter:Regular'] font-normal not-italic relative shrink-0 text-ink-900 text-body w-full"
                        data-node-id="50:266"
                      >
                        <p className="mb-0">Soutien psycho-éducatif,</p>
                        <p className="mb-0">renforcement civique et</p>
                        <p className="mb-0">trousses de survie</p>
                        <p>scolaire.</p>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full"
                      data-node-id="50:267"
                      data-name="Frame"
                    >
                      <div
                        className="[word-break:break-word] bg-surface-muted content-stretch flex items-center justify-between leading-[16px] not-italic pb-[10px] pt-[12px] px-[10px] relative rounded-control shrink-0 text-small w-full whitespace-nowrap"
                        data-node-id="50:268"
                        data-name="Frame"
                      >
                        <p
                          className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-ink-700"
                          data-node-id="50:269"
                        >
                          Élèves :
                        </p>
                        <p
                          className="font-['Inter:Bold'] font-bold relative shrink-0 text-brand-900"
                          data-node-id="50:270"
                        >
                          {regionPupils(impact, "Sud-Ouest", "1 510 bénéficiaires")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="bg-surface-muted content-stretch flex flex-col items-start justify-between p-[24px] relative rounded-card shrink-0 w-full"
                data-node-id="50:271"
                data-name="Frame"
              >
                <div
                  className="content-stretch flex gap-[16px] items-center relative shrink-0"
                  data-node-id="50:272"
                  data-name="Frame"
                >
                  <Icon name="trendingUp" size={24} className="shrink-0" />
                  <div
                    className="[word-break:break-word] content-stretch flex flex-col items-start relative shrink-0"
                    data-node-id="50:274"
                    data-name="Frame"
                  >
                    <p
                      className="font-['Montserrat:Bold'] font-bold relative shrink-0 text-brand-900 text-h3 whitespace-nowrap"
                      data-node-id="50:275"
                    >
                      Total Consolidé Documenté : 20 940 Enfants Soutenus
                    </p>
                    <p
                      className="font-['Inter:Regular'] font-normal min-w-full not-italic relative shrink-0 text-ink-700 text-lead w-full"
                      data-node-id="50:276"
                    >
                      Données issues des registres de présence nominatifs
                      certifiés par les inspections départementales du MINEDUB.
                    </p>
                  </div>
                </div>
                <div
                  className="content-stretch flex gap-[8px] items-center relative shrink-0"
                  data-node-id="50:277"
                  data-name="Frame"
                >
                  <p
                    className="[word-break:break-word] font-['Inter:Bold'] font-bold not-italic relative shrink-0 text-brand-900 text-lead whitespace-nowrap"
                    data-node-id="50:278"
                  >{`Comprendre la méthode d'audit`}</p>
                  <Icon name="arrowRight" size={12} className="shrink-0" />
                </div>
              </div>
            </div>
          </div>
          <div
            className="bg-surface-muted content-stretch flex flex-col items-start relative shrink-0 w-full shell"
            data-node-id="50:280"
            data-name="Section - SECTION PROTOCOLE DE MESURE & AVANT / APRÈS"
          >
            <div
              className="content-stretch flex flex-col gap-[40px] items-center relative shrink-0 w-full shell"
              data-node-id="50:281"
              data-name="Container"
            >
              <div
                className="content-stretch flex flex-col gap-[7px] items-center pt-[3px] relative shell-narrow"
                data-node-id="50:282"
                data-name="Frame"
              >
                <div
                  className="bg-brand-100 content-stretch flex flex-col items-center px-[12px] py-[3px] relative rounded-pill shrink-0"
                  data-node-id="50:283"
                  data-name="Frame"
                >
                  <p
                    className="[word-break:break-word] font-['Montserrat:Bold'] font-bold leading-[16px] relative shrink-0 text-brand-900 text-[11px] text-center tracking-[1.1px] uppercase whitespace-nowrap"
                    data-node-id="50:284"
                  >
                    MÉTHODOLOGIE CERTIFIÉE
                  </p>
                </div>
                <div
                  className="[word-break:break-word] font-['Montserrat:Bold'] font-bold leading-[0] min-w-full relative shrink-0 text-brand-900 text-[32px] text-center tracking-[-0.8px] w-full"
                  data-node-id="50:285"
                >
                  <p className="leading-[40px]">{`La Mesure Rigoureuse : Avant, Pendant et Après Chaque Projet`}</p>
                </div>
                <div
                  className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[0] min-w-full not-italic relative shrink-0 text-[#424751] text-[16px] text-center w-full"
                  data-node-id="50:286"
                >
                  <p className="leading-[24px]">{`Nous n'abandonnons jamais une école après le coup de pinceau. Notre méthodologie d'intervention repose sur une traçabilité contractuelle tripartite : Children's Smile, Comités APE et autorités villageoises.`}</p>
                </div>
              </div>
              <div
                className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full"
                data-node-id="50:287"
                data-name="Frame"
              >
                <div
                  className="bg-surface-subtle content-stretch drop-shadow-card flex flex-[1_0_0] flex-col items-start justify-between min-w-px p-[24px] relative rounded-card"
                  data-node-id="50:288"
                  data-name="Frame"
                >
                  <div
                    className="content-stretch flex flex-col gap-[7px] items-start relative shrink-0 w-full"
                    data-node-id="50:289"
                    data-name="Frame"
                  >
                    <div
                      className="bg-[rgba(0,68,132,0.1)] content-stretch flex flex-col items-center justify-center relative rounded-pill shrink-0 size-[40px]"
                      data-node-id="50:290"
                      data-name="Frame"
                    >
                      <p
                        className="[word-break:break-word] font-['Montserrat:Bold'] font-bold leading-[28px] relative shrink-0 text-brand-900 text-[20px] text-center whitespace-nowrap"
                        data-node-id="50:291"
                      >
                        01
                      </p>
                    </div>
                    <div
                      className="[word-break:break-word] font-['Montserrat:Bold'] font-bold leading-[0] min-w-full relative shrink-0 text-[#004484] text-[20px] w-full"
                      data-node-id="50:292"
                    >
                      <p className="leading-[28px]">{`Diagnostic Initial & Constat d'Huissier / PV`}</p>
                    </div>
                    <div
                      className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[0] min-w-full not-italic relative shrink-0 text-ink-700 text-[14px] w-full"
                      data-node-id="50:293"
                    >
                      <p className="leading-[22.75px]">{`Procès-verbal de constatation de vétusté corédigé avec le bureau de l'APE et le directeur d'établissement. Recensement exact des effectifs, de la distance aux points d'eau et des risques sanitaires prioritaires.`}</p>
                    </div>
                  </div>
                  <div
                    className="content-stretch flex flex-col items-start pt-[24px] relative shrink-0 w-full"
                    data-node-id="50:294"
                    data-name="Frame"
                  >
                    <div
                      className="bg-white content-stretch flex gap-[8px] items-center pb-[12px] pt-[16px] px-[12px] relative rounded-control shrink-0 w-full"
                      data-node-id="50:295"
                      data-name="Frame"
                    >
                      <Icon name="school" size={16} className="shrink-0" />
                      <p
                        className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[16px] not-italic relative shrink-0 text-brand-900 text-[12px] whitespace-nowrap"
                        data-node-id="50:297"
                      >
                        Validation conjointe MINEDUB
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="bg-surface-subtle content-stretch drop-shadow-card flex flex-[1_0_0] flex-col items-start justify-between min-w-px p-[24px] relative rounded-card"
                  data-node-id="50:298"
                  data-name="Frame"
                >
                  <div
                    className="content-stretch flex flex-col gap-[7px] items-start relative shrink-0 w-full"
                    data-node-id="50:299"
                    data-name="Frame"
                  >
                    <div
                      className="bg-[rgba(0,110,45,0.1)] content-stretch flex flex-col items-center justify-center relative rounded-pill shrink-0 size-[40px]"
                      data-node-id="50:300"
                      data-name="Frame"
                    >
                      <p
                        className="[word-break:break-word] font-['Montserrat:Bold'] font-bold leading-[28px] relative shrink-0 text-accent-700 text-[20px] text-center whitespace-nowrap"
                        data-node-id="50:301"
                      >
                        02
                      </p>
                    </div>
                    <div
                      className="[word-break:break-word] font-['Montserrat:Bold'] font-bold leading-[0] min-w-full relative shrink-0 text-[#004484] text-[20px] w-full"
                      data-node-id="50:302"
                    >
                      <p className="leading-[28px]">{`Audit Étape 50% & Contrôle Qualité Local`}</p>
                    </div>
                    <div
                      className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[0] min-w-full not-italic relative shrink-0 text-ink-700 text-[14px] w-full"
                      data-node-id="50:303"
                    >
                      <p className="leading-[22.75px]">{`Visite inopinée de la coordination de terrain. Test de solidité du bois, conformité des peintures sans solvants toxiques, épaisseur des tôles galvanisées et respect des salaires décents des ouvriers locaux.`}</p>
                    </div>
                  </div>
                  <div
                    className="content-stretch flex flex-col items-start pt-[24px] relative shrink-0 w-full"
                    data-node-id="50:304"
                    data-name="Frame"
                  >
                    <div
                      className="bg-white content-stretch flex gap-[8px] items-center pb-[12px] pt-[16px] px-[12px] relative rounded-control shrink-0 w-full"
                      data-node-id="50:305"
                      data-name="Frame"
                    >
                      <Icon name="eyeOff" size={16} className="shrink-0" />
                      <p
                        className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[16px] not-italic relative shrink-0 text-accent-700 text-[12px] whitespace-nowrap"
                        data-node-id="50:307"
                      >
                        Zéro intermédiaire opaque
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="bg-surface-subtle content-stretch drop-shadow-card flex flex-[1_0_0] flex-col items-start justify-between min-w-px p-[24px] relative rounded-card"
                  data-node-id="50:308"
                  data-name="Frame"
                >
                  <div
                    className="content-stretch flex flex-col gap-[7px] items-start relative shrink-0 w-full"
                    data-node-id="50:309"
                    data-name="Frame"
                  >
                    <div
                      className="bg-[rgba(163,57,0,0.1)] content-stretch flex flex-col items-center justify-center relative rounded-pill shrink-0 size-[40px]"
                      data-node-id="50:310"
                      data-name="Frame"
                    >
                      <p
                        className="[word-break:break-word] font-['Montserrat:Bold'] font-bold leading-[28px] relative shrink-0 text-warn-700 text-[20px] text-center whitespace-nowrap"
                        data-node-id="50:311"
                      >
                        03
                      </p>
                    </div>
                    <div
                      className="[word-break:break-word] font-['Montserrat:Bold'] font-bold leading-[0] min-w-full relative shrink-0 text-[#004484] text-[20px] w-full"
                      data-node-id="50:312"
                    >
                      <p className="leading-[28px]">{`Suivi à 12 & 24 Mois : Mesure des Résultats`}</p>
                    </div>
                    <div
                      className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[0] min-w-full not-italic relative shrink-0 text-ink-700 text-[14px] w-full"
                      data-node-id="50:313"
                    >
                      <p className="leading-[22.75px]">{`Évaluation statistique rigoureuse : évolution du taux de rétention scolaire (particulièrement des jeunes filles), recul des parasitoses digestives et taux de réussite aux examens officiels (CEP & First School Leaving Certificate).`}</p>
                    </div>
                  </div>
                  <div
                    className="content-stretch flex flex-col items-start pt-[24px] relative shrink-0 w-full"
                    data-node-id="50:314"
                    data-name="Frame"
                  >
                    <div
                      className="bg-white content-stretch flex gap-[8px] items-center pb-[12px] pt-[16px] px-[12px] relative rounded-control shrink-0 w-full"
                      data-node-id="50:315"
                      data-name="Frame"
                    >
                      <Icon name="trendingUp" size={16} className="shrink-0" />
                      <p
                        className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[16px] not-italic relative shrink-0 text-warn-700 text-[12px] whitespace-nowrap"
                        data-node-id="50:317"
                      >{`Bilan d'impact post-livraison`}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="bg-surface-subtle content-stretch drop-shadow-[0px_4px_3px_rgba(0,0,0,0.1),0px_2px_2px_rgba(0,0,0,0.1)] flex flex-col gap-[8px] items-start p-[40px] relative rounded-card shrink-0 w-full"
                data-node-id="50:318"
                data-name="Frame"
              >
                <div
                  className="content-stretch flex items-center justify-between pb-[24px] relative shrink-0 w-full"
                  data-node-id="50:319"
                  data-name="Frame"
                >
                  <div
                    className="content-stretch flex flex-col gap-[2.5px] items-start pb-[0.5px] pt-[3px] relative shrink-0"
                    data-node-id="50:320"
                    data-name="Frame"
                  >
                    <div
                      className="bg-[rgba(0,110,45,0.1)] content-stretch flex flex-col items-start px-[12px] py-[3px] relative rounded-pill shrink-0"
                      data-node-id="50:321"
                      data-name="Frame"
                    >
                      <p
                        className="[word-break:break-word] font-['Montserrat:Bold'] font-bold leading-[16px] relative shrink-0 text-accent-700 text-[11px] uppercase whitespace-nowrap"
                        data-node-id="50:322"
                      >
                        CAS DOCUMENTÉ RÉEL
                      </p>
                    </div>
                    <div
                      className="[word-break:break-word] font-['Montserrat:Bold'] font-bold leading-[0] min-w-full relative shrink-0 text-brand-900 text-[24px] w-full"
                      data-node-id="50:323"
                    >
                      <p className="leading-[32px]">{`Étude Comparative : École Publique de Batouri (Région de l'Est)`}</p>
                    </div>
                  </div>
                  <div
                    className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[0] not-italic relative shrink-0 text-ink-700 text-[12px] whitespace-nowrap"
                    data-node-id="50:324"
                  >
                    <p className="leading-[16px] mb-0">{`Période d'audit : Septembre 2023 - Novembre`}</p>
                    <p className="leading-[16px]">2024</p>
                  </div>
                </div>
                <div
                  className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full"
                  data-node-id="50:325"
                  data-name="Frame"
                >
                  <div
                    className="bg-[rgba(255,218,214,0.2)] content-stretch flex flex-[1_0_0] flex-col items-start justify-between min-w-px overflow-clip p-[24px] relative rounded-card"
                    data-node-id="50:326"
                    data-name="Frame"
                  >
                    <div
                      className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full"
                      data-node-id="50:327"
                      data-name="Frame"
                    >
                      <div
                        className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full"
                        data-node-id="50:328"
                        data-name="Frame"
                      >
                        <Icon name="clock" size={20} className="shrink-0" />
                        <p
                          className="[word-break:break-word] font-['Montserrat:Bold'] font-bold leading-[24px] relative shrink-0 text-[#ba1a1a] text-[18px] tracking-[0.9px] uppercase whitespace-nowrap"
                          data-node-id="50:330"
                        >
                          ÉTAT INITIAL (AVANT INTERVENTION)
                        </p>
                      </div>
                      <div
                        className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full"
                        data-node-id="50:331"
                        data-name="Frame"
                      >
                        <div
                          className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full"
                          data-node-id="50:332"
                          data-name="Frame"
                        >
                          <Icon name="xCircle" size={12} className="shrink-0" />
                          <p
                            className="[word-break:break-word] flex-[1_0_0] font-['Inter:Bold'] font-bold leading-[20px] min-w-px not-italic relative text-ink-900 text-[14px]"
                            data-node-id="50:334"
                          >
                            65 élèves assis à même la poussière de terre battue
                            par salle, provoquant affections pulmonaires et
                            salissure continue des cahiers.
                          </p>
                        </div>
                        <div
                          className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full"
                          data-node-id="50:335"
                          data-name="Frame"
                        >
                          <Icon name="xCircle" size={12} className="shrink-0" />
                          <p
                            className="[word-break:break-word] flex-[1_0_0] font-['Inter:Bold'] font-bold leading-[20px] min-w-px not-italic relative text-ink-900 text-[14px]"
                            data-node-id="50:337"
                          >
                            Toitures en tôles perforées : arrêt systématique des
                            cours dès la survenue des premières pluies
                            torrentielles.
                          </p>
                        </div>
                        <div
                          className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full"
                          data-node-id="50:338"
                          data-name="Frame"
                        >
                          <Icon name="xCircle" size={12} className="shrink-0" />
                          <p
                            className="[word-break:break-word] flex-[1_0_0] font-['Inter:Bold'] font-bold leading-[20px] min-w-px not-italic relative text-ink-900 text-[14px]"
                            data-node-id="50:340"
                          >{`Absence totale d'eau potable : corvée d'eau de 2 km imposée aux écolières pendant les pauses pédagogiques.`}</p>
                        </div>
                        <div
                          className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full"
                          data-node-id="50:341"
                          data-name="Frame"
                        >
                          <Icon name="xCircle" size={12} className="shrink-0" />
                          <p
                            className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px not-italic relative text-ink-900 text-[14px]"
                            data-node-id="50:343"
                          >{`Taux de réussite au Certificat d'Études Primaires (CEP) stagnant à 48,5%.`}</p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex flex-col items-start pt-[24px] relative shrink-0 w-full"
                      data-node-id="50:344"
                      data-name="Frame"
                    >
                      <div
                        className="[word-break:break-word] bg-[rgba(250,248,255,0.8)] content-stretch flex items-center justify-between leading-[16px] not-italic pb-[12px] pt-[16px] px-[12px] relative rounded-control shrink-0 text-[#ba1a1a] text-[12px] w-full whitespace-nowrap"
                        data-node-id="50:345"
                        data-name="Frame"
                      >
                        <p
                          className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0"
                          data-node-id="50:346"
                        >{`Constat initial d'abandon :`}</p>
                        <p
                          className="font-['Inter:Bold'] font-bold relative shrink-0"
                          data-node-id="50:347"
                        >
                          Décrochage sévère (38%)
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="bg-[rgba(0,110,45,0.1)] content-stretch flex flex-[1_0_0] flex-col items-start justify-between min-w-px overflow-clip p-[24px] relative rounded-card"
                    data-node-id="50:348"
                    data-name="Frame"
                  >
                    <div
                      className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full"
                      data-node-id="50:349"
                      data-name="Frame"
                    >
                      <div
                        className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full"
                        data-node-id="50:350"
                        data-name="Frame"
                      >
                        <Icon
                          name="checkCircle"
                          size={20}
                          className="shrink-0"
                        />
                        <p
                          className="[word-break:break-word] font-['Montserrat:Bold'] font-bold leading-[24px] relative shrink-0 text-accent-700 text-[18px] tracking-[0.9px] uppercase whitespace-nowrap"
                          data-node-id="50:352"
                        >
                          IMPACT VÉRIFIÉ (APRÈS RÉNOVATION)
                        </p>
                      </div>
                      <div
                        className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full"
                        data-node-id="50:353"
                        data-name="Frame"
                      >
                        <div
                          className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full"
                          data-node-id="50:354"
                          data-name="Frame"
                        >
                          <Icon
                            name="trendingUp"
                            size={12}
                            className="shrink-0"
                          />
                          <p
                            className="[word-break:break-word] flex-[1_0_0] font-['Inter:Bold'] font-bold leading-[20px] min-w-px not-italic relative text-ink-900 text-[14px]"
                            data-node-id="50:356"
                          >
                            3 salles entièrement refaites : dalle bétonnée
                            lissée, tableaux noirs enduits et 120 bancs-pupitres
                            ergonomiques livrés.
                          </p>
                        </div>
                        <div
                          className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full"
                          data-node-id="50:357"
                          data-name="Frame"
                        >
                          <Icon
                            name="trendingUp"
                            size={12}
                            className="shrink-0"
                          />
                          <p
                            className="[word-break:break-word] flex-[1_0_0] font-['Inter:Bold'] font-bold leading-[20px] min-w-px not-italic relative text-ink-900 text-[14px]"
                            data-node-id="50:359"
                          >
                            Toiture isolante étanche résistant aux orages
                            tropicaux : 100% du calendrier scolaire annuel
                            préservé.
                          </p>
                        </div>
                        <div
                          className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full"
                          data-node-id="50:360"
                          data-name="Frame"
                        >
                          <Icon
                            name="trendingUp"
                            size={12}
                            className="shrink-0"
                          />
                          <p
                            className="[word-break:break-word] flex-[1_0_0] font-['Inter:Bold'] font-bold leading-[20px] min-w-px not-italic relative text-ink-900 text-[14px]"
                            data-node-id="50:362"
                          >{`Forage à pompe manuelle au cœur de l'école et blocs sanitaires séparés pour l'intimité et la dignité des jeunes filles.`}</p>
                        </div>
                        <div
                          className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full"
                          data-node-id="50:363"
                          data-name="Frame"
                        >
                          <Icon
                            name="trendingUp"
                            size={12}
                            className="shrink-0"
                          />
                          <p
                            className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px not-italic relative text-ink-900 text-[14px]"
                            data-node-id="50:365"
                          >
                            Bond du taux de réussite au CEP à 89,2% lors de la
                            session de juin 2024.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex flex-col items-start pt-[24px] relative shrink-0 w-full"
                      data-node-id="50:366"
                      data-name="Frame"
                    >
                      <div
                        className="[word-break:break-word] bg-[rgba(250,248,255,0.8)] content-stretch flex items-center justify-between leading-[16px] not-italic pb-[12px] pt-[16px] px-[12px] relative rounded-control shrink-0 text-accent-700 text-[12px] w-full whitespace-nowrap"
                        data-node-id="50:367"
                        data-name="Frame"
                      >
                        <p
                          className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0"
                          data-node-id="50:368"
                        >
                          Résultat contrôlé à 12 mois :
                        </p>
                        <p
                          className="font-['Inter:Bold'] font-bold relative shrink-0"
                          data-node-id="50:369"
                        >
                          +40,7 points de réussite
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="bg-surface-muted content-stretch flex flex-col items-start overflow-clip pb-[24px] pt-[32px] px-[24px] relative rounded-card shrink-0 w-full"
                  data-node-id="50:370"
                  data-name="Frame"
                >
                  <div
                    className="content-stretch flex items-center justify-between relative shrink-0 w-full"
                    data-node-id="50:371"
                    data-name="Frame"
                  >
                    <p
                      className="[word-break:break-word] font-['Montserrat:Bold'] font-bold leading-[24px] relative shrink-0 text-brand-900 text-[18px] whitespace-nowrap"
                      data-node-id="50:372"
                    >
                      Taux de Fréquentation Scolaire des Filles à Batouri (%)
                    </p>
                    <div
                      className="bg-surface-subtle content-stretch drop-shadow-card flex flex-col items-start px-[10px] py-[4px] relative rounded-pill shrink-0"
                      data-node-id="50:373"
                      data-name="Frame"
                    >
                      <p
                        className="[word-break:break-word] font-['Montserrat:Bold'] font-bold leading-[16px] relative shrink-0 text-accent-700 text-[11px] whitespace-nowrap"
                        data-node-id="50:374"
                      >
                        Suivi trimestriel audité
                      </p>
                    </div>
                  </div>
                  <div
                    className="content-stretch flex flex-col h-[144px] items-center justify-end overflow-clip pt-[16px] relative shrink-0 w-full"
                    data-node-id="50:375"
                    data-name="Frame"
                  >
                    <div
                      className="flex-[1_0_0] min-h-px relative w-full"
                      data-node-id="50:376"
                      data-name="Frame"
                    >
                      <img
                        alt=""
                        className="absolute block inset-0 max-w-none size-full"
                        src={imgFrame1}
                      />
                    </div>
                  </div>
                  <div
                    className="[word-break:break-word] content-stretch flex items-start justify-between leading-[16px] not-italic pt-[8px] relative shrink-0 text-[12px] w-full whitespace-nowrap"
                    data-node-id="50:388"
                    data-name="Frame"
                  >
                    <p
                      className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-ink-700"
                      data-node-id="50:389"
                    >
                      T1 2023 (34%)
                    </p>
                    <p
                      className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-ink-700"
                      data-node-id="50:390"
                    >
                      T2 2023 (41%)
                    </p>
                    <p
                      className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-ink-700"
                      data-node-id="50:391"
                    >
                      T3 (Travaux)
                    </p>
                    <p
                      className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-ink-700"
                      data-node-id="50:392"
                    >
                      T1 2024 (78%)
                    </p>
                    <p
                      className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-ink-700"
                      data-node-id="50:393"
                    >
                      T2 2024 (85%)
                    </p>
                    <p
                      className="font-['Inter:Bold'] font-bold relative shrink-0 text-accent-700"
                      data-node-id="50:394"
                    >
                      T3 2024 (94%)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="bg-surface-subtle content-stretch flex flex-col items-start relative shrink-0 w-full shell"
            data-node-id="50:395"
            data-name="Section - SECTION TÉMOIGNAGES SOUS PROTOCOLE DE PROTECTION"
          >
            <div
              className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full shell"
              data-node-id="50:396"
              data-name="Container"
            >
              <div
                className="bg-[rgba(0,68,132,0.05)] content-stretch flex flex-col gap-[16px] items-start p-[24px] relative rounded-card shrink-0 w-full"
                data-node-id="50:397"
                data-name="Frame"
              >
                <Icon name="trendingUp" size={24} className="shrink-0" />
                <div
                  className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start relative shrink-0"
                  data-node-id="50:399"
                  data-name="Frame"
                >
                  <p
                    className="font-['Montserrat:Bold'] font-bold leading-[16px] relative shrink-0 text-brand-900 text-[11px] tracking-[0.55px] uppercase whitespace-nowrap"
                    data-node-id="50:400"
                  >{`CHARTE DE SAUVEGARDE & DIGNITÉ DE L'ENFANT`}</p>
                  <div
                    className="font-['Inter:Regular'] font-normal leading-[0] min-w-full not-italic relative shrink-0 text-[#424751] text-[14px] w-full"
                    data-node-id="50:401"
                  >
                    <p className="leading-[20px]">{`Tous les récits et données sont recueillis dans le respect strict des standards internationaux de protection de l'enfance. Préservation systématique de l'anonymat complet des mineurs, absence de toute photographie dégradante et accord formalisé avec les tuteurs légaux et directoires d'APE.`}</p>
                  </div>
                </div>
              </div>
              <div
                className="content-stretch flex items-end justify-between relative shrink-0 w-full"
                data-node-id="50:402"
                data-name="Frame"
              >
                <div
                  className="content-stretch flex flex-1 flex-col gap-[6.5px] items-start min-w-0 pb-[0.5px] pt-[3px] relative"
                  data-node-id="50:403"
                  data-name="Frame"
                >
                  <div
                    className="bg-[rgba(0,110,45,0.1)] content-stretch flex flex-col items-start px-[12px] py-[3px] relative rounded-pill shrink-0"
                    data-node-id="50:404"
                    data-name="Frame"
                  >
                    <p
                      className="[word-break:break-word] font-['Montserrat:Bold'] font-bold leading-[16px] relative shrink-0 text-accent-700 text-[11px] tracking-[1.1px] uppercase whitespace-nowrap"
                      data-node-id="50:405"
                    >{`PAROLES D'ACTEURS LOCAUX`}</p>
                  </div>
                  <div
                    className="[word-break:break-word] font-['Montserrat:Bold'] font-bold leading-[0] min-w-full relative shrink-0 text-[#004484] text-[32px] tracking-[-0.8px] w-full"
                    data-node-id="50:406"
                  >
                    <p className="leading-[40px]">{`Récits Directs : L'Impact Vécu au Quotidien`}</p>
                  </div>
                </div>
                <div
                  className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[0] min-w-0 not-italic relative text-ink-700 text-[16px] w-[512px]"
                  data-node-id="50:407"
                >
                  <p className="leading-[24px] mb-0">
                    La meilleure preuve de réussite réside dans les changements
                  </p>
                  <p className="leading-[24px] mb-0">{`d'habitudes documentés par les enseignants et les délégués`}</p>
                  <p className="leading-[24px]">parentaux.</p>
                </div>
              </div>
              <div
                className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full lg:flex-row"
                data-node-id="50:408"
                data-name="Témoignages du registre"
              >
                {impact.testimonials.length === 0 ? (
                  <div className="bg-surface-muted content-stretch drop-shadow-card flex flex-[1_0_0] flex-col items-start justify-between min-w-px p-[32px] relative rounded-card">
                    <p className="[word-break:break-word] font-['Inter:Italic'] font-normal italic leading-[29.25px] relative shrink-0 text-ink-900 text-[18px] w-full">{`« Les témoignages enregistrés dans le back-office apparaissent ici après vérification. »`}</p>
                  </div>
                ) : (
                  impact.testimonials.map((item) => (
                    <div
                      key={item.author}
                      className="bg-surface-muted content-stretch drop-shadow-card flex flex-[1_0_0] flex-col items-start justify-between min-w-px p-[32px] relative rounded-card"
                    >
                      <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
                        <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
                          <div className="bg-brand-900 content-stretch flex flex-col items-center justify-center relative rounded-pill shrink-0 size-[56px]">
                            <p className="[word-break:break-word] font-['Montserrat:Bold'] font-bold leading-[24px] relative shrink-0 text-[18px] text-white whitespace-nowrap">
                              {item.initials}
                            </p>
                          </div>
                          <div className="[word-break:break-word] content-stretch flex flex-col items-start pb-[2px] relative shrink-0 whitespace-nowrap">
                            <p className="font-['Montserrat:Bold'] font-bold leading-[24px] relative shrink-0 text-brand-900 text-[18px]">
                              {item.author}
                            </p>
                            <p className="font-['Inter:Semi_Bold'] font-semibold leading-[16px] not-italic relative shrink-0 text-ink-700 text-[12px]">
                              {item.school}
                            </p>
                            <p className="font-['Montserrat:Bold'] font-bold leading-[16px] relative shrink-0 text-accent-700 text-[11px] uppercase">
                              {`TÉMOIGNAGE VÉRIFIÉ · PROTOCOLE DE PROTECTION`}
                            </p>
                          </div>
                        </div>
                        <div className="[word-break:break-word] font-['Inter:Italic'] font-normal italic leading-[0] relative shrink-0 text-ink-900 text-[18px] w-full">
                          <p className="leading-[29.25px]">{`« ${item.quote} »`}</p>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col items-start pt-[24px] relative shrink-0 w-full">
                        <div className="[word-break:break-word] bg-surface-subtle content-stretch flex items-center justify-between leading-[16px] not-italic pb-[12px] pt-[16px] px-[12px] relative rounded-control shrink-0 text-[12px] w-full whitespace-nowrap">
                          <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-ink-700">
                            Source :
                          </p>
                          <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-brand-900">
                            École du registre public
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div
                className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full"
                data-node-id="50:437"
                data-name="Frame"
              >
                <div
                  className="aspect-[4/3] bg-surface-tint content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-card shadow-raised shrink-0"
                  data-node-id="50:438"
                  data-name="Frame"
                >
                  <div
                    className="h-[280px] relative shrink-0 w-full"
                    data-node-id="50:439"
                    data-name="Frame"
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img
                        alt=""
                        className="absolute h-full left-[-18.81%] max-w-none top-0 w-[137.63%]"
                        src={imgFrame2}
                      />
                    </div>
                  </div>
                  <div
                    className="[word-break:break-word] absolute bg-[rgba(0,68,132,0.8)] bottom-0 content-stretch flex flex-col font-bold items-start leading-[16px] left-0 p-[12px] right-0 text-white"
                    data-node-id="50:440"
                    data-name="Frame"
                  >
                    <p
                      className="font-['Inter:Bold'] not-italic relative shrink-0 text-[12px] w-full"
                      data-node-id="50:441"
                    >
                      Fabrication 100% artisanale locale
                    </p>
                    <p
                      className="font-['Montserrat:Bold'] opacity-80 relative shrink-0 text-[11px] w-full"
                      data-node-id="50:442"
                    >{`Atelier d'Obala (Centre)`}</p>
                  </div>
                </div>
                <div
                  className="aspect-[4/3] bg-surface-tint content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-card shadow-raised shrink-0"
                  data-node-id="50:443"
                  data-name="Frame"
                >
                  <div
                    className="h-[280px] relative shrink-0 w-full"
                    data-node-id="50:444"
                    data-name="Frame"
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img
                        alt=""
                        className="absolute h-full left-[-18.81%] max-w-none top-0 w-[137.63%]"
                        src={imgFrame3}
                      />
                    </div>
                  </div>
                  <div
                    className="[word-break:break-word] absolute bg-[rgba(0,68,132,0.8)] bottom-0 content-stretch flex flex-col font-bold items-start leading-[16px] left-0 p-[12px] right-0 text-white"
                    data-node-id="50:445"
                    data-name="Frame"
                  >
                    <p
                      className="font-['Inter:Bold'] not-italic relative shrink-0 text-[12px] w-full"
                      data-node-id="50:446"
                    >{`Forage WASH sécurisé à l'école`}</p>
                    <p
                      className="font-['Montserrat:Bold'] opacity-80 relative shrink-0 text-[11px] w-full"
                      data-node-id="50:447"
                    >
                      Mora (Extrême-Nord)
                    </p>
                  </div>
                </div>
                <div
                  className="aspect-[4/3] bg-surface-tint content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-card shadow-raised shrink-0"
                  data-node-id="50:448"
                  data-name="Frame"
                >
                  <div
                    className="h-[280px] relative shrink-0 w-full"
                    data-node-id="50:449"
                    data-name="Frame"
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img
                        alt=""
                        className="absolute h-full left-[-18.81%] max-w-none top-0 w-[137.63%]"
                        src={imgFrame4}
                      />
                    </div>
                  </div>
                  <div
                    className="[word-break:break-word] absolute bg-[rgba(0,68,132,0.8)] bottom-0 content-stretch flex flex-col font-bold items-start leading-[16px] left-0 p-[12px] right-0 text-white"
                    data-node-id="50:450"
                    data-name="Frame"
                  >
                    <p
                      className="font-['Inter:Bold'] not-italic relative shrink-0 text-[12px] w-full"
                      data-node-id="50:451"
                    >
                      Livraison de 3 classes rénovées
                    </p>
                    <p
                      className="font-['Montserrat:Bold'] opacity-80 relative shrink-0 text-[11px] w-full"
                      data-node-id="50:452"
                    >{`Batouri (Région de l'Est)`}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="bg-surface-muted content-stretch flex flex-col items-start relative shrink-0 w-full shell"
            data-node-id="50:453"
            data-name="Section - SECTION TÉLÉCHARGEMENT DES RAPPORTS & AUDITS INDÉPENDANTS"
          >
            <div
              className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full shell"
              data-node-id="50:454"
              data-name="Container"
            >
              <div
                className="content-stretch flex items-center justify-between relative shrink-0 w-full"
                data-node-id="50:455"
                data-name="Frame"
              >
                <div
                  className="content-stretch flex flex-col gap-[7px] items-start pt-[3px] relative shell-prose"
                  data-node-id="50:456"
                  data-name="Frame"
                >
                  <div
                    className="bg-brand-100 content-stretch flex flex-col items-start px-[12px] py-[3px] relative rounded-pill shrink-0"
                    data-node-id="50:457"
                    data-name="Frame"
                  >
                    <p
                      className="[word-break:break-word] font-['Montserrat:Bold'] font-bold leading-[16px] relative shrink-0 text-brand-900 text-[11px] tracking-[1.1px] uppercase whitespace-nowrap"
                      data-node-id="50:458"
                    >
                      TRANSPARENCE ABSOLUE
                    </p>
                  </div>
                  <div
                    className="[word-break:break-word] font-['Montserrat:Bold'] font-bold leading-[0] min-w-full relative shrink-0 text-[#004484] text-[32px] tracking-[-0.8px] w-full"
                    data-node-id="50:459"
                  >
                    <p className="leading-[40px]">{`Bilans d'Impact & Rapports Annuels en Accès Libre`}</p>
                  </div>
                  <div
                    className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[0] min-w-full not-italic relative shrink-0 text-ink-700 text-[16px] w-full"
                    data-node-id="50:460"
                  >
                    <p className="leading-[24px]">{`La confiance de nos donateurs et partenaires repose sur la vérifiabilité intégrale. Chaque année civile fait l'objet d'un rapport certifié par commissariat aux comptes agréé CEMAC.`}</p>
                  </div>
                </div>
                <div
                  className="bg-surface-subtle content-stretch drop-shadow-card flex flex-col gap-[7.99px] items-start justify-center p-[12px] relative rounded-control shrink-0"
                  data-node-id="50:461"
                  data-name="Frame"
                >
                  <Icon name="badgeCheck" size={20} className="shrink-0" />
                  <p
                    className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[16px] not-italic relative shrink-0 text-ink-900 text-[12px] whitespace-nowrap"
                    data-node-id="50:463"
                  >
                    Comptes certifiés conformes OHADA / CEMAC
                  </p>
                </div>
              </div>
              <div
                className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full"
                data-node-id="50:464"
                data-name="Frame"
              >
                <div
                  className="bg-surface-subtle content-stretch drop-shadow-card flex flex-[1_0_0] flex-col items-start justify-between min-w-px p-[24px] relative rounded-card"
                  data-node-id="50:465"
                  data-name="Frame"
                >
                  <div
                    className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full"
                    data-node-id="50:466"
                    data-name="Frame"
                  >
                    <div
                      className="content-stretch flex items-center justify-between relative shrink-0 w-full"
                      data-node-id="50:467"
                      data-name="Frame"
                    >
                      <div
                        className="relative shrink-0 size-[48px]"
                        data-node-id="50:468"
                        data-name="Frame"
                      >
                        <img
                          alt=""
                          className="absolute block inset-0 max-w-none size-full"
                          src={imgFrame5}
                        />
                      </div>
                      <div
                        className="bg-surface-tint content-stretch flex flex-col items-start px-[8px] py-[4px] relative rounded-chip shrink-0"
                        data-node-id="50:470"
                        data-name="Frame"
                      >
                        <p
                          className="[word-break:break-word] font-['Montserrat:Bold'] font-bold leading-[16px] relative shrink-0 text-ink-700 text-[11px] whitespace-nowrap"
                          data-node-id="50:471"
                        >
                          PDF • 8.4 Mo
                        </p>
                      </div>
                    </div>
                    <div
                      className="[word-break:break-word] font-['Montserrat:Bold'] font-bold leading-[0] relative shrink-0 text-brand-900 text-[20px] w-full"
                      data-node-id="50:472"
                    >
                      <p className="leading-[28px] mb-0">{`Rapport d'Impact & Bilan`}</p>
                      <p className="leading-[28px]">Social 2024</p>
                    </div>
                    <div
                      className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] w-full"
                      data-node-id="50:473"
                    >
                      <p className="leading-[20px] mb-0">
                        Bilan exhaustif des 10 régions : cartographie des
                      </p>
                      <p className="leading-[20px] mb-0">
                        écoles rénovées, ratio filles/garçons, enquêtes
                      </p>
                      <p className="leading-[20px]">
                        post-livraison et indicateurs MINEDUB.
                      </p>
                    </div>
                  </div>
                  <div
                    className="content-stretch flex flex-col items-start pt-[40px] relative shrink-0 w-full"
                    data-node-id="50:474"
                    data-name="Frame"
                  >
                    <button
                      disabled
                      title="Le rapport n'est pas encore publié"
                      type="button"
                      className="bg-brand-900 content-stretch flex flex-row items-center justify-center relative rounded-pill w-full btn-md btn btn-icon-stack"
                      data-node-id="50:475"
                      data-name="Frame"
                    >
                      <Icon name="download" size={16} className="shrink-0" />
                      <p
                        className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap"
                        data-node-id="50:477"
                      >
                        Télécharger le rapport
                      </p>
                    </button>
                  </div>
                </div>
                <div
                  className="bg-surface-subtle content-stretch drop-shadow-card flex flex-[1_0_0] flex-col items-start justify-between min-w-px p-[24px] relative rounded-card"
                  data-node-id="50:478"
                  data-name="Frame"
                >
                  <div
                    className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full"
                    data-node-id="50:479"
                    data-name="Frame"
                  >
                    <div
                      className="content-stretch flex items-center justify-between relative shrink-0 w-full"
                      data-node-id="50:480"
                      data-name="Frame"
                    >
                      <div
                        className="relative shrink-0 size-[48px]"
                        data-node-id="50:481"
                        data-name="Frame"
                      >
                        <img
                          alt=""
                          className="absolute block inset-0 max-w-none size-full"
                          src={imgFrame6}
                        />
                      </div>
                      <div
                        className="bg-surface-tint content-stretch flex flex-col items-start px-[8px] py-[4px] relative rounded-chip shrink-0"
                        data-node-id="50:483"
                        data-name="Frame"
                      >
                        <p
                          className="[word-break:break-word] font-['Montserrat:Bold'] font-bold leading-[16px] relative shrink-0 text-ink-700 text-[11px] whitespace-nowrap"
                          data-node-id="50:484"
                        >
                          PDF • 4.1 Mo
                        </p>
                      </div>
                    </div>
                    <div
                      className="[word-break:break-word] font-['Montserrat:Bold'] font-bold leading-[0] relative shrink-0 text-brand-900 text-[20px] w-full"
                      data-node-id="50:485"
                    >
                      <p className="leading-[28px] mb-0">
                        Registre de Traçabilité des
                      </p>
                      <p className="leading-[28px]">Dépenses</p>
                    </div>
                    <div
                      className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] w-full"
                      data-node-id="50:486"
                    >
                      <p className="leading-[20px] mb-0">
                        Livre de caisse ventilé au franc CFA près : coûts
                      </p>
                      <p className="leading-[20px] mb-0">
                        des matériaux, factures des scieries locales,
                      </p>
                      <p className="leading-[20px]">
                        transport et zéro frais de structure cachés.
                      </p>
                    </div>
                  </div>
                  <div
                    className="content-stretch flex flex-col items-start pt-[40px] relative shrink-0 w-full"
                    data-node-id="50:487"
                    data-name="Frame"
                  >
                    <button
                      disabled
                      title="La traçabilité est en cours de mise en ligne"
                      type="button"
                      className="bg-surface-tint content-stretch flex flex-row items-center justify-center relative rounded-pill w-full btn-md btn btn-icon-stack"
                      data-node-id="50:488"
                      data-name="Frame"
                    >
                      <Icon name="arrowRight" size={16} className="shrink-0" />
                      <p
                        className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[16px] not-italic relative shrink-0 text-brand-900 text-[12px] text-center whitespace-nowrap"
                        data-node-id="50:490"
                      >
                        Consulter la traçabilité
                      </p>
                    </button>
                  </div>
                </div>
                <div
                  className="bg-surface-subtle content-stretch drop-shadow-card flex flex-[1_0_0] flex-col items-start justify-between min-w-px p-[24px] relative rounded-card"
                  data-node-id="50:491"
                  data-name="Frame"
                >
                  <div
                    className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full"
                    data-node-id="50:492"
                    data-name="Frame"
                  >
                    <div
                      className="content-stretch flex items-center justify-between relative shrink-0 w-full"
                      data-node-id="50:493"
                      data-name="Frame"
                    >
                      <div
                        className="relative shrink-0 size-[48px]"
                        data-node-id="50:494"
                        data-name="Frame"
                      >
                        <img
                          alt=""
                          className="absolute block inset-0 max-w-none size-full"
                          src={imgFrame7}
                        />
                      </div>
                      <div
                        className="bg-surface-tint content-stretch flex flex-col items-start px-[8px] py-[4px] relative rounded-chip shrink-0"
                        data-node-id="50:496"
                        data-name="Frame"
                      >
                        <p
                          className="[word-break:break-word] font-['Montserrat:Bold'] font-bold leading-[16px] relative shrink-0 text-ink-700 text-[11px] whitespace-nowrap"
                          data-node-id="50:497"
                        >
                          PDF • 3.2 Mo
                        </p>
                      </div>
                    </div>
                    <div
                      className="[word-break:break-word] font-['Montserrat:Bold'] font-bold leading-[0] relative shrink-0 text-brand-900 text-[20px] w-full"
                      data-node-id="50:498"
                    >
                      <p className="leading-[28px] mb-0">{`Rapport d'Audit Financier`}</p>
                      <p className="leading-[28px]">Indépendant</p>
                    </div>
                    <div
                      className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] w-full"
                      data-node-id="50:499"
                    >
                      <p className="leading-[20px] mb-0">{`Rapport annuel d'expertise comptable`}</p>
                      <p className="leading-[20px] mb-0">
                        indépendant certifié, conforme aux exigences
                      </p>
                      <p className="leading-[20px] mb-0">
                        fiscales et associatives de la République du
                      </p>
                      <p className="leading-[20px]">Cameroun.</p>
                    </div>
                  </div>
                  <div
                    className="content-stretch flex flex-col items-start pt-[40px] relative shrink-0 w-full"
                    data-node-id="50:500"
                    data-name="Frame"
                  >
                    <button
                      disabled
                      title="La certification est en cours de vérification"
                      type="button"
                      className="bg-surface-tint content-stretch flex flex-row items-center justify-center relative rounded-pill w-full btn-md btn btn-icon-stack"
                      data-node-id="50:501"
                      data-name="Frame"
                    >
                      <Icon name="arrowRight" size={16} className="shrink-0" />
                      <p
                        className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[16px] not-italic relative shrink-0 text-brand-900 text-[12px] text-center whitespace-nowrap"
                        data-node-id="50:503"
                      >
                        Voir la certification
                      </p>
                    </button>
                  </div>
                </div>
              </div>
              <p
                className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[16px] not-italic relative shrink-0 text-ink-700 text-[12px] text-center w-full"
                data-node-id="50:504"
              >{`Tous nos états financiers sont déposés auprès des préfectures départementales et du Ministère de l'Administration Territoriale (MINAT).`}</p>
            </div>
          </div>
          <div
            className="bg-brand-900 content-stretch flex flex-col gap-[24px] items-start overflow-clip pb-[112px] px-[128px] relative shrink-0 w-full"
            data-node-id="50:505"
            data-name="Section - SECTION FINALE D'ENGAGEMENT / CTA"
          >
            <div
              className="absolute bg-[rgba(11,92,171,0.4)] blur-[32px] bottom-[-79.73px] right-[-80px] rounded-pill size-[384px]"
              data-node-id="50:506"
              data-name="Rectangle"
            />
            <div
              className="absolute bg-[rgba(0,110,45,0.2)] blur-[32px] left-[-80px] rounded-pill size-[384px] top-[-80px]"
              data-node-id="50:507"
              data-name="Rectangle"
            />
            <div
              className="content-stretch flex flex-col gap-[8px] items-center relative w-full shell-content"
              data-node-id="50:508"
              data-name="Frame"
            >
              <div
                className="bg-accent-700 content-stretch flex gap-[8px] items-center px-[16px] py-[4px] relative rounded-pill shrink-0"
                data-node-id="50:509"
                data-name="Frame"
              >
                <Icon name="handHeart" size={12} className="shrink-0" />
                <p
                  className="[word-break:break-word] font-['Montserrat:Bold'] font-bold leading-[16px] relative shrink-0 text-[11px] text-center text-white tracking-[0.55px] uppercase whitespace-nowrap"
                  data-node-id="50:511"
                >
                  ACTION CONCRÈTE
                </p>
              </div>
              <div
                className="[word-break:break-word] font-['Montserrat:ExtraBold'] font-extrabold leading-[0] min-w-full relative shrink-0 text-[48px] text-center text-white tracking-[-1.2px] w-full"
                data-node-id="50:512"
              >
                <p className="leading-[56px]">{`Vous souhaitez cofinancer un impact mesurable dans une école de votre village ou de votre région ?`}</p>
              </div>
              <div
                className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[0] not-italic relative text-brand-100 text-[18px] text-center shell-prose"
                data-node-id="50:513"
              >
                <p className="leading-[29.25px] mb-0">
                  Que vous soyez une association de la diaspora camerounaise,
                  une fondation
                </p>
                <p className="leading-[29.25px] mb-0">{`d'entreprise ou un citoyen engagé : nous mettons en place un protocole`}</p>
                <p className="leading-[29.25px]">{`d'audit dédié avec votre nom sur le chantier scolaire.`}</p>
              </div>
              <div
                className="content-stretch flex gap-[16px] items-center justify-center pt-[32px] relative shrink-0 w-full"
                data-node-id="50:514"
                data-name="Frame"
              >
                <Link
                  to="/don"
                  className="bg-accent-700 content-stretch flex flex-row items-center justify-center relative rounded-pill btn-lg btn btn-icon-stack"
                  data-node-id="50:515"
                  data-name="Frame"
                >
                  <Icon name="arrowRight" size={16} className="shrink-0" />
                  <p
                    className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap"
                    data-node-id="50:517"
                  >{`Parrainer un chantier d'école`}</p>
                </Link>
                <Link
                  to="/nos-projets"
                  className="bg-surface-subtle content-stretch flex flex-row items-center justify-center relative rounded-pill btn-lg btn btn-icon-stack"
                  data-node-id="50:518"
                  data-name="Frame"
                >
                  <Icon name="arrowRight" size={16} className="shrink-0" />
                  <p
                    className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[20px] not-italic relative shrink-0 text-brand-900 text-[14px] text-center whitespace-nowrap"
                    data-node-id="50:520"
                  >
                    Découvrir nos projets en cours
                  </p>
                </Link>
              </div>
              <div
                className="content-stretch flex gap-[24px] items-center justify-center pt-[16px] relative shrink-0 w-full"
                data-node-id="50:521"
                data-name="Frame"
              >
                <div
                  className="content-stretch flex gap-[6px] items-center relative shrink-0"
                  data-node-id="50:522"
                  data-name="Frame"
                >
                  <Icon name="phone" size={12} className="shrink-0" />
                  <p
                    className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[16px] not-italic relative shrink-0 text-brand-100 text-[12px] text-center whitespace-nowrap"
                    data-node-id="50:524"
                  >
                    Direct Terrain : +237 699 09 86 88
                  </p>
                </div>
                <p
                  className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[16px] not-italic relative shrink-0 text-brand-100 text-[12px] text-center whitespace-nowrap"
                  data-node-id="50:525"
                >
                  •
                </p>
                <div
                  className="content-stretch flex gap-[6px] items-center relative shrink-0"
                  data-node-id="50:526"
                  data-name="Frame"
                >
                  <Icon name="scrollText" size={16} className="shrink-0" />
                  <p
                    className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[16px] not-italic relative shrink-0 text-brand-100 text-[12px] text-center whitespace-nowrap"
                    data-node-id="50:528"
                  >
                    Agrément MINAT N° 000214
                  </p>
                </div>
                <p
                  className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[16px] not-italic relative shrink-0 text-brand-100 text-[12px] text-center whitespace-nowrap"
                  data-node-id="50:529"
                >
                  •
                </p>
                <div
                  className="content-stretch flex gap-[6px] items-center relative shrink-0"
                  data-node-id="50:530"
                  data-name="Frame"
                >
                  <Icon name="mapPin" size={16} className="shrink-0" />
                  <p
                    className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[16px] not-italic relative shrink-0 text-brand-100 text-[12px] text-center whitespace-nowrap"
                    data-node-id="50:532"
                  >
                    Siège : Yaoundé, Cameroun
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="bg-surface-muted border-[rgba(194,198,211,0.3)] border-solid border-t content-stretch flex flex-col items-start relative shrink-0 w-full"
          data-node-id="50:533"
          data-name="Footer"
        >
          <div
            className="content-stretch flex flex-col gap-[40px] items-start py-[40px] relative shrink-0 w-full shell"
            data-node-id="50:534"
            data-name="Frame"
          >
            <div
              className="content-stretch flex gap-[40px] items-start justify-center relative shrink-0 w-full"
              data-node-id="50:535"
              data-name="Frame"
            >
              <div
                className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px relative"
                data-node-id="50:536"
                data-name="Frame"
              >
                <div
                  className="content-stretch flex gap-[12px] items-center relative shrink-0"
                  data-node-id="50:537"
                  data-name="Frame"
                >
                  <div
                    className="relative rounded-pill shrink-0 size-[32px]"
                    data-node-id="50:538"
                    data-name="Frame"
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-pill">
                      <img
                        alt=""
                        className="absolute left-0 max-w-none size-full top-0"
                        src={imgFrame}
                      />
                    </div>
                  </div>
                  <div
                    className="[word-break:break-word] content-stretch flex flex-col font-['Montserrat:Bold'] font-bold items-start relative shrink-0 whitespace-nowrap"
                    data-node-id="50:539"
                    data-name="Frame"
                  >
                    <p
                      className="leading-[25px] relative shrink-0 text-brand-900 text-[20px]"
                      data-node-id="50:540"
                    >{`Children's Smile`}</p>
                    <p
                      className="leading-[16px] relative shrink-0 text-ink-700 text-[11px] tracking-[1.1px] uppercase"
                      data-node-id="50:541"
                    >
                      CAMEROUN
                    </p>
                  </div>
                </div>
                <div
                  className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[0] min-w-full not-italic relative shrink-0 text-ink-700 text-[14px] w-full"
                  data-node-id="50:542"
                >
                  <p className="leading-[22.75px]">{`Organisation humanitaire à but non lucratif dédiée à la protection, l'éducation civique, la santé et l'épanouissement des enfants vulnérables de 3 à 15 ans dans les zones rurales et périurbaines isolées des 10 régions du Cameroun.`}</p>
                </div>
                <div
                  className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start not-italic relative shrink-0 text-[12px]"
                  data-node-id="50:543"
                  data-name="Frame"
                >
                  <p
                    className="font-['Inter:Bold'] font-bold leading-[16px] relative shrink-0 text-ink-900 w-full"
                    data-node-id="50:544"
                  >
                    Agrément Ministériel Officiel :
                  </p>
                  <p
                    className="font-['Inter:Semi_Bold'] font-semibold leading-[16px] relative shrink-0 text-ink-700 w-full"
                    data-node-id="50:545"
                  >
                    N° 000214/A/MINAT/SG/DAP/SDLP/SAC
                  </p>
                  <div
                    className="font-['Inter:Semi_Bold'] font-semibold leading-[0] relative shrink-0 text-ink-700 w-full"
                    data-node-id="50:546"
                  >
                    <p className="leading-[16px] mb-0">
                      Enregistrée sous le régime de la loi N°
                    </p>
                    <p className="leading-[16px]">90/053</p>
                  </div>
                </div>
              </div>
              <div
                className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px relative"
                data-node-id="50:547"
                data-name="Frame"
              >
                <div
                  className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full"
                  data-node-id="50:548"
                  data-name="Frame"
                >
                  <Icon name="pillars" size={16} className="shrink-0" />
                  <p
                    className="[word-break:break-word] font-['Montserrat:Bold'] font-bold leading-[24px] relative shrink-0 text-brand-900 text-[18px] whitespace-nowrap"
                    data-node-id="50:550"
                  >{`Piliers d'Intervention`}</p>
                </div>
                <div
                  className="content-stretch flex flex-col gap-[7.5px] items-start relative shrink-0 w-full"
                  data-node-id="50:551"
                  data-name="Frame"
                >
                  <div
                    className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full"
                    data-node-id="50:552"
                    data-name="Frame"
                  >
                    <div
                      className="bg-brand-900 relative rounded-pill shrink-0 size-[6px]"
                      data-node-id="50:553"
                      data-name="Rectangle"
                    />
                    <p
                      className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                      data-node-id="50:554"
                    >{`Scolarisation & Kits Pédagogiques`}</p>
                  </div>
                  <div
                    className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full"
                    data-node-id="50:555"
                    data-name="Frame"
                  >
                    <div
                      className="bg-accent-700 relative rounded-pill shrink-0 size-[6px]"
                      data-node-id="50:556"
                      data-name="Rectangle"
                    />
                    <p
                      className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                      data-node-id="50:557"
                    >{`Cantines Solidaires & Nutrition Rurale`}</p>
                  </div>
                  <div
                    className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full"
                    data-node-id="50:558"
                    data-name="Frame"
                  >
                    <div
                      className="bg-warn-700 relative rounded-pill shrink-0 size-[6px]"
                      data-node-id="50:559"
                      data-name="Rectangle"
                    />
                    <p
                      className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                      data-node-id="50:560"
                    >{`Protection Infantile & État Civil`}</p>
                  </div>
                  <div
                    className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full"
                    data-node-id="50:561"
                    data-name="Frame"
                  >
                    <div
                      className="bg-brand-700 relative rounded-pill shrink-0 size-[6px]"
                      data-node-id="50:562"
                      data-name="Rectangle"
                    />
                    <p
                      className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                      data-node-id="50:563"
                    >{`Santé Préventive & Eau Potable`}</p>
                  </div>
                  <div
                    className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full"
                    data-node-id="50:564"
                    data-name="Frame"
                  >
                    <div
                      className="bg-accent-300 relative rounded-pill shrink-0 size-[6px]"
                      data-node-id="50:565"
                      data-name="Rectangle"
                    />
                    <div
                      className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                      data-node-id="50:566"
                    >
                      <p className="leading-[20px] mb-0">{`Mentorat & Autonomisation`}</p>
                      <p className="leading-[20px]">Communautaire</p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px relative"
                data-node-id="50:567"
                data-name="Frame"
              >
                <div
                  className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full"
                  data-node-id="50:568"
                  data-name="Frame"
                >
                  <Icon name="droplet" size={16} className="shrink-0" />
                  <div
                    className="[word-break:break-word] font-['Montserrat:Bold'] font-bold leading-[0] relative shrink-0 text-brand-900 text-[18px] whitespace-nowrap"
                    data-node-id="50:570"
                  >
                    <p className="leading-[24px] mb-0">{`Transparence &`}</p>
                    <p className="leading-[24px]">Gouvernance</p>
                  </div>
                </div>
                <div
                  className="content-stretch flex flex-col gap-[7.5px] items-start relative shrink-0 w-full"
                  data-node-id="50:571"
                  data-name="Frame"
                >
                  <div
                    className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full"
                    data-node-id="50:572"
                    data-name="Frame"
                  >
                    <Icon name="fileText" size={12} className="shrink-0" />
                    <p
                      className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                      data-node-id="50:574"
                    >{`Rapports Annuels & Audits CEMAC`}</p>
                  </div>
                  <div
                    className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full"
                    data-node-id="50:575"
                    data-name="Frame"
                  >
                    <Icon name="badgeCheck" size={12} className="shrink-0" />
                    <p
                      className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                      data-node-id="50:577"
                    >{`Comptes Certifiés BEAC & MinFi`}</p>
                  </div>
                  <div
                    className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full"
                    data-node-id="50:578"
                    data-name="Frame"
                  >
                    <Icon name="scale" size={16} className="shrink-0" />
                    <div
                      className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                      data-node-id="50:580"
                    >
                      <p className="leading-[20px] mb-0">{`Conseil d'Administration`}</p>
                      <p className="leading-[20px]">Indépendant</p>
                    </div>
                  </div>
                  <div
                    className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full"
                    data-node-id="50:581"
                    data-name="Frame"
                  >
                    <Icon name="handshake" size={12} className="shrink-0" />
                    <p
                      className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                      data-node-id="50:583"
                    >{`Partenariats Institutionnels & ONGs`}</p>
                  </div>
                  <div
                    className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full"
                    data-node-id="50:584"
                    data-name="Frame"
                  >
                    <Icon name="trendingUp" size={12} className="shrink-0" />
                    <p
                      className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                      data-node-id="50:586"
                    >{`Suivi Terrain & Taux d'Impact ${impact.impactRate}%`}</p>
                  </div>
                </div>
              </div>
              <div
                className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px relative"
                data-node-id="50:587"
                data-name="Frame"
              >
                <div
                  className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full"
                  data-node-id="50:588"
                  data-name="Frame"
                >
                  <Icon name="alertTriangle" size={16} className="shrink-0" />
                  <p
                    className="[word-break:break-word] font-['Montserrat:Bold'] font-bold leading-[24px] relative shrink-0 text-brand-900 text-[18px] whitespace-nowrap"
                    data-node-id="50:590"
                  >{`Ligne Directe & Soutien`}</p>
                </div>
                <div
                  className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full"
                  data-node-id="50:591"
                  data-name="Frame"
                >
                  <div
                    className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full"
                    data-node-id="50:592"
                    data-name="Frame"
                  >
                    <Icon name="phone" size={12} className="shrink-0" />
                    <p
                      className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[20px] not-italic relative shrink-0 text-ink-900 text-[14px] whitespace-nowrap"
                      data-node-id="50:594"
                    >
                      Permanence Siège :
                    </p>
                    <p
                      className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px not-italic relative text-ink-700 text-[14px]"
                      data-node-id="50:595"
                    >
                      +237 699 09 86 88
                    </p>
                    <p
                      className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px not-italic relative text-ink-700 text-[14px]"
                      data-node-id="50:596"
                    >
                      +237 650 88 11 55
                    </p>
                  </div>
                  <div
                    className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full"
                    data-node-id="50:597"
                    data-name="Frame"
                  >
                    <Icon name="whatsapp" size={16} className="shrink-0" />
                    <p
                      className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[20px] not-italic relative shrink-0 text-ink-900 text-[14px] whitespace-nowrap"
                      data-node-id="50:599"
                    >
                      WhatsApp Coordination :
                    </p>
                    <p
                      className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px not-italic relative text-ink-700 text-[14px]"
                      data-node-id="50:600"
                    >
                      +237 699 09 86 88 (Direct Terrain)
                    </p>
                  </div>
                  <div
                    className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full"
                    data-node-id="50:601"
                    data-name="Frame"
                  >
                    <Icon name="wallet" size={16} className="shrink-0" />
                    <p
                      className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[20px] not-italic relative shrink-0 text-ink-900 text-[14px] whitespace-nowrap"
                      data-node-id="50:603"
                    >
                      Canaux de Dons Certifiés :
                    </p>
                    <p
                      className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px not-italic relative text-ink-700 text-[14px]"
                      data-node-id="50:604"
                    >{`Orange Money & MTN MoMo officiels`}</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="[word-break:break-word] border-[rgba(194,198,211,0.3)] border-solid border-t content-stretch flex items-center justify-between not-italic pt-[24px] relative shrink-0 w-full whitespace-nowrap"
              data-node-id="50:605"
              data-name="Frame"
            >
              <p
                className="font-['Inter:Regular'] font-normal leading-[20px] relative shrink-0 text-ink-700 text-[14px]"
                data-node-id="50:606"
              >{`© 2025 Children's Smile Cameroun. Tous droits réservés.`}</p>
              <div
                className="content-stretch flex font-['Inter:Semi_Bold'] font-semibold gap-[16px] items-center justify-center leading-[16px] relative shrink-0 text-[12px]"
                data-node-id="50:607"
                data-name="Frame"
              >
                <p
                  className="relative shrink-0 text-ink-700"
                  data-node-id="50:608"
                >{`Politique de Sauvegarde de l'Enfance`}</p>
                <p
                  className="relative shrink-0 text-ink-300"
                  data-node-id="50:609"
                >
                  •
                </p>
                <p
                  className="relative shrink-0 text-ink-700"
                  data-node-id="50:610"
                >{`Mentions Légales & RGPD`}</p>
                <p
                  className="relative shrink-0 text-ink-300"
                  data-node-id="50:611"
                >
                  •
                </p>
                <p
                  className="relative shrink-0 text-ink-700"
                  data-node-id="50:612"
                >{`Code d'éthique et Déontologie`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
