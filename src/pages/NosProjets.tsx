import { type FormEvent, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { Icon } from "../components/Icon"
import { Pagination, usePagination } from "../components/Pagination"
import { TabBar } from "../components/TabBar"
import { usePublishedProjects } from "../lib/public"
import { saveMessage } from "../lib/repositories"
import type { ProjectDoc } from "../lib/models"
import { usePageMeta } from "../lib/seo"

const assetPathPrefix = "/assets"
const imgProfile = `${assetPathPrefix}/1fe61.png`
const imgContainer = `${assetPathPrefix}/ff01e.svg`
const imgContainer1 = `${assetPathPrefix}/fe6ed.svg`
const imgContainer2 = `${assetPathPrefix}/577c1.svg`
const imgContainer3 = `${assetPathPrefix}/eb619.svg`
const imgContainer4 = `${assetPathPrefix}/99d0c.svg`
const imgContainer6 = `${assetPathPrefix}/fa57f.svg`
const imgContainer7 = `${assetPathPrefix}/f76dc.svg`
const imgContainer8 = `${assetPathPrefix}/f4ced.svg`
const imgContainer9 = `${assetPathPrefix}/7b61b.svg`
const imgContainer10 = `${assetPathPrefix}/a6fb6.svg`
const imgContainer11 = `${assetPathPrefix}/49013.svg`
const imgContainer12 = `${assetPathPrefix}/7bede.svg`
const imgContainer13 = `${assetPathPrefix}/5784d.svg`
const imgContainer14 = `${assetPathPrefix}/dfa5b.svg`
const imgMargin = `${assetPathPrefix}/7177d.svg`
const imgContainer15 = `${assetPathPrefix}/30575.svg`
const imgContainer16 = `${assetPathPrefix}/80ad2.svg`
const imgContainer17 = `${assetPathPrefix}/490e6.svg`
const imgContainer18 = `${assetPathPrefix}/61dd7.svg`
const imgContainer19 = `${assetPathPrefix}/4ac57.svg`
const imgContainer20 = `${assetPathPrefix}/454b2.svg`

const imgContainer22 = `${assetPathPrefix}/7a19c.svg`
const imgPhone = `${assetPathPrefix}/4b209.svg`
const imgMail = `${assetPathPrefix}/34fa3.svg`
const imgMessageCircle = `${assetPathPrefix}/c5fc5.svg`

const PROJECT_FILTERS = [
  {
    value: "all",
    label: "Tous les projets",
    icon: <Icon name="pillars" size={12} />,
  },
  {
    value: "school",
    label: "Écoles & Salles de classe",
    icon: <Icon name="graduationCap" size={12} />,
  },
  {
    value: "water",
    label: "Eau potable & WASH",
    icon: <Icon name="droplet" size={12} />,
  },
  {
    value: "books",
    label: "Bibliothèques & Livres",
    icon: <Icon name="bookOpen" size={12} />,
  },
  {
    value: "health",
    label: "Santé & Secours",
    icon: <Icon name="heartPulse" size={12} />,
  },
] as const

/**
 * The card as one component.
 *
 * It used to exist as six hand-written blocks of Figma markup, each pinned to
 * one project slug and each carrying its own copy of the title, category,
 * region, impact line and progress. A seventh published project could not
 * appear, and editing a project in the backoffice left the card showing its
 * old text. The markup below is that block, unchanged, with every value read
 * off the record it renders.
 */
function ProjectCard({ doc }: { doc: ProjectDoc }) {
  return (
    <div
      className="bg-white content-stretch flex flex-col items-start w-full min-w-0 overflow-clip relative rounded-card shadow-raised"
      data-project-category={doc.category}
      data-project-region={doc.region}
      data-name={doc.title}
    >
      <Link
        aria-label={doc.title}
        className="absolute inset-0 z-[5] rounded-card focus-visible:outline-2 focus-visible:outline-brand-700"
        to={`/nos-projets/${doc.slug}`}
      />
      <div className="bg-surface-tint content-stretch flex flex-col h-[224px] items-start justify-center overflow-clip relative shrink-0 w-full z-[2]">
        <div className="flex-[1_0_0] min-h-px relative w-full">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {doc.image ? (
              <img
                alt=""
                className="absolute h-full left-[-5.05%] max-w-none object-cover top-0 w-[110.11%]"
                src={`${assetPathPrefix}/${doc.image}`}
              />
            ) : null}
          </div>
        </div>
        <div className="absolute bg-accent-300 content-stretch drop-shadow-card flex gap-[6px] items-center left-[12px] px-[12px] py-[4px] rounded-pill top-[14px]">
          <div className="bg-accent-700 relative rounded-pill shrink-0 size-[8px]" />
          <div className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#007230] text-[11px] whitespace-nowrap">
            <p className="leading-[16px]">{doc.statusLabel}</p>
          </div>
        </div>
        <div className="absolute backdrop-blur-[2px] bg-[rgba(40,48,68,0.85)] bottom-[12px] content-stretch flex gap-[3.99px] items-center px-[10px] py-[4px] right-[12px] rounded-pill">
          <div className="h-[11.667px] relative shrink-0 w-[9.333px]">
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgContainer2}
            />
          </div>
          <div className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-050 text-[11px] whitespace-nowrap">
            <p className="leading-[16px]">{doc.location}</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-1 flex-col items-start justify-between p-[24px] relative shrink-0 w-full">
        <div className="content-stretch flex flex-col gap-[7.4px] items-start relative shrink-0 w-full">
          <div className="content-stretch flex items-center relative shrink-0 w-full">
            <div className="bg-brand-100 content-stretch flex flex-col items-start px-[10px] py-[2px] relative rounded-pill shrink-0">
              <div className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-800 text-[11px] tracking-[0.55px] uppercase whitespace-nowrap">
                <p className="leading-[16px]">{doc.categoryLabel}</p>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
            <div className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center relative shrink-0 text-ink-900 text-h4 w-full">
              <p className="line-clamp-2 text-balance">{doc.title}</p>
            </div>
          </div>
          <div className="content-stretch flex flex-col items-start overflow-clip pt-[0.6px] relative shrink-0 w-full">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center not-italic relative shrink-0 text-ink-700 text-body w-full">
              <p className="line-clamp-3 text-pretty">{shorten(doc.excerpt)}</p>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-start pt-[24px] relative shrink-0 w-full">
          <div className="bg-surface-muted content-stretch flex flex-col gap-[4px] items-start pb-[14px] pt-[16px] px-[14px] relative rounded-control shrink-0 w-full">
            <div className="flex flex-col gap-[2px] items-start w-full">
              <p className="font-['Inter:Bold'] font-bold leading-[22px] text-accent-700 text-h4">
                {doc.impactValue}
              </p>
              <p className="font-['Inter:Regular'] font-normal leading-[18px] text-ink-700 text-small">
                {doc.impactLabel}
              </p>
            </div>
            <div className="bg-surface-tint content-stretch flex flex-col h-[8px] items-start justify-center overflow-clip relative rounded-pill shrink-0 w-full">
              {/* The bar used to be a full-width fill on every card, so a
                  chantier at 40 % still read as complete. */}
              <div
                className="bg-accent-700 h-full min-h-px relative rounded-pill"
                style={{ width: `${doc.progress}%` }}
              />
            </div>
            <div className="content-stretch flex flex-col items-end relative shrink-0 w-full">
              <div className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-ink-500 text-[11px] text-right whitespace-nowrap">
                <p className="leading-[16px]">{doc.impactNote}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-start pt-[20px] relative shrink-0 w-full">
          <div className="content-stretch flex flex-nowrap items-center gap-[8px] relative z-[10] shrink-0 w-full">
            <Link
              className="btn btn-card btn-secondary"
              to={`/nos-projets/${doc.slug}`}
            >
              <span className="btn-label">{doc.primaryCta}</span>
              <span
                aria-hidden="true"
                className="relative shrink-0 size-4"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgContainer4}
                />
              </span>
            </Link>
            <Link
              className="btn btn-card btn-warn"
              to={`/nos-projets/${doc.slug}`}
            >
              <span className="btn-label">{doc.secondaryCta}</span>
              <span
                aria-hidden="true"
                className="relative shrink-0 size-4"
              >
                <svg
                  fill="none"
                  height="16"
                  viewBox="0 0 16 16"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 3.5L10.5 8L6 12.5"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

/** Keeps a card to the excerpt length the design was drawn with. */
const shorten = (text: string, limit = 150) =>
  text.length > limit ? `${text.slice(0, limit).trimEnd()}…` : text

/** The field "cellule WhatsApp terrain" printed on the proposal card. */
const WHATSAPP_CELLULE = "237699098688"

/**
 * The WhatsApp draft handed to the visitor's messenger once a proposal is
 * recorded. Delivery happens there — there is no SMS gateway here — while the
 * same fields were already written to the store, so the backoffice sees it.
 */
function buildWhatsApp(fields: {
  school: string
  region: string
  referent: string
  phone: string
  urgencyType: string
  description: string
}) {
  return [
    `Bonjour, je vous contacte via l'appel aux communautés locales.`,
    "",
    `École / établissement : ${fields.school}`,
    `Région : ${fields.region}`,
    `Référent : ${fields.referent}`,
    `Téléphone : ${fields.phone}`,
    `Type d'urgence : ${fields.urgencyType}`,
    "",
    `Description : ${fields.description}`,
  ].join("\n")
}

/** Cards are laid out three across, the way the Figma frame is. */
const chunkRows = <T,>(items: T[], size = 3): T[][] => {
  const rows: T[][] = []
  for (let index = 0; index < items.length; index += size) {
    rows.push(items.slice(index, index + size))
  }
  return rows
}

export default function NosProjetsChildrensSmileCameroun() {
  usePageMeta(
    "Nos projets & chantiers — Children's Smile Cameroun",
    "Chantiers et projets scolaires à travers le Cameroun : salles de classe, réfectoires et équipements menés par Children's Smile Cameroun.",
  )
  const [projectFilter, setProjectFilter] = useState("all")

  /**
   * Read live rather than loaded in an effect: a project published in the
   * backoffice reaches this grid on its own, and the grid never paints as
   * empty on the way in.
   */
  const projectCards = usePublishedProjects()

  const projectRegions = useMemo(
    () => ["all", ...Array.from(new Set(projectCards.map((c) => c.region)))],
    [projectCards],
  )
  const [regionFilter, setRegionFilter] = useState("all")

  const projectRegionCounts = useMemo(() => {
    const counts: Record<string, number> = { all: 0 }
    for (const doc of projectCards) {
      counts.all += 1
      counts[doc.region] = (counts[doc.region] ?? 0) + 1
    }
    return counts
  }, [projectCards])

  /**
   * Filtering used to hide cards with an inline `display: none` keyed on
   * Figma node ids. A filtered-out row still left its gaps, and ids could not
   * follow a new project. Filtering the list before it is chunked into rows
   * makes an empty row impossible by construction.
   */
  const visibleProjects = useMemo(
    () =>
      projectCards.filter(
        (doc) =>
          (projectFilter === "all" || doc.category === projectFilter) &&
          (regionFilter === "all" || doc.region === regionFilter),
      ),
    [projectCards, projectFilter, regionFilter],
  )

  const projectRows = useMemo(
    () => chunkRows(visibleProjects),
    [visibleProjects],
  )

  // 3 rows of 3 cards per page (9 projects); reset when a filter moves the
  // grid so the pager never shows an old slice.
  const {
    page,
    pageCount,
    pageItems: pageProjectRows,
    setPage,
  } = usePagination(projectRows, 3, `${projectFilter}:${regionFilter}`)

  const visibleProjectCount = visibleProjects.length

  const selectProjectFilter = (filter: string) => {
    setProjectFilter(filter)
  }

  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting) return
    const data = new FormData(event.currentTarget)
    const fields = {
      school: String(data.get("school") ?? "").trim(),
      region: String(data.get("region") ?? ""),
      referent: String(data.get("referent") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      urgencyType: String(data.get("urgencyType") ?? ""),
      description: String(data.get("description") ?? "").trim(),
    }

    // Recorded first: the messenger may never be allowed to open, and the
    // backoffice should still know a dossier came in through the community
    // call.
    setSubmitting(true)
    try {
      await saveMessage({
        name: fields.referent || "Anonyme",
        email: "",
        phone: fields.phone,
        organisation: fields.school,
        profile: "school",
        region: fields.region,
        subject: fields.urgencyType || "Requête via l'appel aux communautés",
        body: fields.description,
      })
      setSent(true)

      window.open(
        `https://wa.me/${WHATSAPP_CELLULE}?text=${encodeURIComponent(
          buildWhatsApp(fields),
        )}`,
        "_blank",
        "noopener",
      )
    } finally {
      setSubmitting(false)
      event.currentTarget.reset()
    }
  }

  return (
    <>
      <Header />
      <div
        id="main-content"
        data-project-filter={projectFilter}
        data-project-region={regionFilter}
        className="nos-projets-page content-stretch flex flex-col items-start relative size-full"
        data-node-id="5:3251"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgb(250, 248, 255) 0%, rgb(250, 248, 255) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)",
        }}
        data-name="Nos projets - Children's Smile Cameroun"
      >
        <div
          className="bg-surface-subtle content-stretch flex flex-col items-start min-h-[800px] pt-[80px] relative shrink-0 w-full"
          data-node-id="5:3252"
          data-name="Main"
        >
          <div
            className="bg-surface-subtle content-stretch flex flex-col items-start relative shrink-0 w-full"
            data-node-id="5:3253"
            data-name="Container"
          >
            <div
              className="bg-brand-900 content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full"
              data-node-id="5:3254"
              data-name="Section - Immersive Editorial Top Scrim with Contextual Counter"
            >
              <div
                className="absolute bg-[rgba(17,94,174,0.3)] blur-[32px] right-[-96px] rounded-pill size-[384px] top-[-96px]"
                data-node-id="5:3255"
                data-name="Overlay+Blur"
              />
              <div
                className="absolute bg-[rgba(0,110,45,0.2)] blur-[20px] bottom-[-79.75px] h-[320px] left-[33.33%] right-[41.67%] rounded-pill"
                data-node-id="5:3256"
                data-name="Overlay+Blur"
              />
              <div
                className="content-stretch flex flex-col gap-[16px] items-start pb-[80px] pt-[56px] relative shrink-0 w-full shell"
                data-node-id="5:3257"
                data-name="Container"
              >
                <div
                  className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full"
                  data-node-id="5:3258"
                  data-name="Container"
                >
                  <div
                    className="backdrop-blur-[6px] bg-[rgba(255,255,255,0.15)] content-stretch flex gap-[6px] items-center px-[12px] py-[4px] relative rounded-pill shrink-0"
                    data-node-id="5:3259"
                    data-name="Overlay+OverlayBlur"
                  >
                    <div
                      className="bg-accent-200 relative rounded-pill shrink-0 size-[8px]"
                      data-node-id="5:3260"
                      data-name="Background"
                    />
                    <div
                      className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-100 text-[11px] tracking-[0.55px] uppercase whitespace-nowrap"
                      data-node-id="5:3261"
                    >
                      <p className="leading-[16px]">{`AUDIT DE TERRAIN & TRANSPARENCE 100%`}</p>
                    </div>
                  </div>
                  <div
                    className="content-stretch flex flex-col items-start relative shrink-0"
                    data-node-id="5:3262"
                    data-name="Container"
                  >
                    <div
                      className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#a7c8ff] text-[11px] tracking-[1.1px] uppercase whitespace-nowrap"
                      data-node-id="5:3263"
                    >
                      <p className="leading-[16px]">
                        PLATEFORME DES CHANTIERS RÉPUBLICAINS
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full"
                  data-node-id="5:3264"
                  data-name="Container"
                >
                  <div
                    className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px relative"
                    data-node-id="5:3265"
                    data-name="Container"
                  >
                    <div
                      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                      data-node-id="5:3266"
                      data-name="Heading 1"
                    >
                      <div
                        className="[word-break:break-word] flex flex-col font-['Montserrat:ExtraBold'] font-extrabold justify-center leading-[0] relative shrink-0 text-[48px] text-white tracking-[-1.2px] w-full"
                        data-node-id="5:3267"
                      >
                        <h1 className="leading-[56px] mb-0">
                          {`Nos Chantiers & Projets `} <br />{" "}
                          {`Scolaires À Travers le Cameroun`}
                        </h1>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex flex-col items-start relative w-full shell-narrow"
                      data-node-id="5:3268"
                      data-name="Container"
                    >
                      <div
                        className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#a7c8ff] text-[18px] w-full"
                        data-node-id="5:3269"
                      >
                        <p className="leading-[29.25px] mb-0">
                          Chaque salle de classe refaite, chaque puits creusé et
                          chaque manuel délivré répond à un
                        </p>
                        <p className="leading-[29.25px] mb-0">
                          besoin identifié main dans la main avec les
                          communautés locales et les associations de
                        </p>
                        <p className="leading-[29.25px]">{`parents d'élèves (APE). Découvrez l'avancement réel de nos interventions régionales.`}</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-w-px relative"
                    data-node-id="5:3270"
                    data-name="Container"
                  >
                    <div
                      className="backdrop-blur-[6px] bg-[rgba(255,255,255,0.1)] content-stretch flex items-center justify-between p-[20px] relative rounded-card shrink-0 w-full"
                      data-node-id="5:3271"
                      data-name="Overlay+OverlayBlur"
                    >
                      <div
                        className="content-stretch flex flex-col items-start relative shrink-0"
                        data-node-id="5:3272"
                        data-name="Container"
                      >
                        <div
                          className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                          data-node-id="5:3273"
                          data-name="Container"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-accent-200 text-[32px] whitespace-nowrap"
                            data-node-id="5:3274"
                          >
                            <p className="leading-[40px]">24</p>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                          data-node-id="5:3275"
                          data-name="Container"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-100 text-[11px] tracking-[0.55px] uppercase whitespace-nowrap"
                            data-node-id="5:3276"
                          >
                            <p className="leading-[16px]">
                              CHANTIERS LIVRÉS EN 2024-2025
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="h-[31.5px] relative shrink-0 w-[33px]"
                        data-node-id="5:3277"
                        data-name="Container"
                      >
                        <img
                          alt=""
                          className="absolute block inset-0 max-w-none size-full"
                          src={imgContainer}
                        />
                      </div>
                    </div>
                    <div
                      className="backdrop-blur-[6px] bg-[rgba(255,255,255,0.1)] content-stretch flex items-center justify-between p-[20px] relative rounded-card shrink-0 w-full"
                      data-node-id="5:3279"
                      data-name="Overlay+OverlayBlur"
                    >
                      <div
                        className="content-stretch flex flex-col items-start relative shrink-0"
                        data-node-id="5:3280"
                        data-name="Container"
                      >
                        <div
                          className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                          data-node-id="5:3281"
                          data-name="Container"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-warn-100 text-[32px] whitespace-nowrap"
                            data-node-id="5:3282"
                          >
                            <p className="leading-[40px]">14 280</p>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                          data-node-id="5:3283"
                          data-name="Container"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-100 text-[11px] tracking-[0.55px] uppercase whitespace-nowrap"
                            data-node-id="5:3284"
                          >
                            <p className="leading-[16px]">
                              ÉLÈVES QUOTIDIENNEMENT PROTÉGÉS
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="h-[27px] relative shrink-0 w-[33px]"
                        data-node-id="5:3285"
                        data-name="Container"
                      >
                        <img
                          alt=""
                          className="absolute block inset-0 max-w-none size-full"
                          src={imgContainer1}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="bg-surface-muted content-stretch drop-shadow-card flex flex-col items-start py-[16px] relative shrink-0 w-full shell"
              data-node-id="5:3692"
              data-name="Interactive Controls Section (Tabs & Regional Filter)"
            >
              <div
                className="flex flex-col gap-3 items-stretch py-4 relative shrink-0 w-full"
                data-node-id="5:3693"
                data-name="Category Tabs"
              >
                <TabBar
                  items={PROJECT_FILTERS}
                  label="Catégories de projets"
                  onChange={selectProjectFilter}
                  panelId="projects-grid"
                  trailing={
                    <label className="flex items-center gap-2 min-w-0">
                      <span className="sr-only">Filtrer par région</span>
                      <span
                        aria-hidden="true"
                        className="flex shrink-0 items-center text-ink-700"
                      >
                        <Icon name="mapPin" size={16} />
                      </span>
                      <select
                        className="min-w-0 max-w-full cursor-pointer rounded-control border-0 bg-white py-2 pl-4 pr-9 font-['Inter:Semi_Bold'] text-[14px] font-semibold text-ink-900 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b5cab]"
                        onChange={(event) =>
                          setRegionFilter(event.target.value)
                        }
                        value={regionFilter}
                      >
                        {projectRegions.map((region) => (
                          <option key={region} value={region}>
                            {region === "all"
                              ? `Toutes les régions (${projectRegionCounts.all})`
                              : `${region} (${projectRegionCounts[region] ?? 0})`}
                          </option>
                        ))}
                      </select>
                    </label>
                  }
                  value={projectFilter}
                  variant="outline"
                />
                <p className="font-['Inter:Regular'] text-[#5d626e] text-[12px] leading-4">
                  {visibleProjectCount} projet
                  {visibleProjectCount > 1 ? "s" : ""} sur{" "}
                  {projectRegionCounts.all} au total
                </p>
              </div>
            </div>

            <div
              className="content-stretch flex flex-col gap-[32px] items-start py-[48px] relative shrink-0 w-full shell"
              data-node-id="5:3287"
              data-name="Section - Project Catalog Grid"
            >
              <div
                className="content-stretch flex items-center justify-between relative shrink-0 w-full"
                data-node-id="5:3288"
                data-name="Container"
              >
                <div
                  className="content-stretch flex flex-col items-start relative shrink-0"
                  data-node-id="5:3289"
                  data-name="Container"
                >
                  <div
                    className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                    data-node-id="5:3290"
                    data-name="Heading 2"
                  >
                    <div
                      className="[word-break:break-word] flex flex-col font-['Montserrat:SemiBold'] font-semibold justify-center leading-[0] relative shrink-0 text-ink-900 text-[24px] tracking-[-0.6px] whitespace-nowrap"
                      data-node-id="5:3291"
                    >
                      <p className="leading-[32px]">{`Projets & Chantiers Actifs`}</p>
                    </div>
                  </div>
                  <div
                    className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                    data-node-id="5:3292"
                    data-name="Container"
                  >
                    <div
                      className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                      data-node-id="5:3293"
                    >
                      <p className="leading-[20px]">
                        Données consolidées et validées au 1er trimestre 2025
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="bg-surface-tint content-stretch flex gap-[8px] items-center px-[12px] py-[6px] relative rounded-pill shrink-0"
                  data-node-id="5:3294"
                  data-name="Background"
                >
                  <div
                    className="bg-accent-700 relative rounded-pill shrink-0 size-[8px]"
                    data-node-id="5:3295"
                    data-name="Background"
                  />
                  <div
                    className="content-stretch flex flex-col items-start relative shrink-0"
                    data-node-id="5:3296"
                    data-name="Container"
                  >
                    <div
                      className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[12px] whitespace-nowrap"
                      data-node-id="5:3297"
                    >
                      <p className="leading-[16px]">
                        6 projets affichés sur 24 interventions recensées
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                id="projects-grid"
                role="tabpanel"
                aria-label="Catalogue des projets"
                className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full"
                data-node-id="5:3298"
                data-name="Cards Grid"
              >
                {pageProjectRows.map((row, rowIndex) => (
                  <div
                    key={`row-${rowIndex}`}
                    className="content-stretch grid grid-cols-1 gap-[24px] items-stretch relative shrink-0 w-full sm:grid-cols-2 xl:grid-cols-3"
                  >
                    {row.map((doc) => (
                      <ProjectCard key={doc._id} doc={doc} />
                    ))}
                  </div>
                ))}
                <Pagination
                  page={page}
                  pageCount={pageCount}
                  onChange={setPage}
                  label={
                    visibleProjectCount > 0
                      ? `Page ${page} sur ${pageCount} · ${visibleProjectCount} projets`
                      : undefined
                  }
                  className="w-full"
                />
              </div>
              <div
                className="flex w-full flex-col items-center justify-center gap-2 rounded-panel border border-dashed border-[#c7cdf5] bg-white px-6 py-14 text-center"
                data-empty-state="projects"
                role="status"
                style={{ display: visibleProjectCount === 0 ? "flex" : "none" }}
              >
                <span
                  aria-hidden="true"
                  className="flex size-12 items-center justify-center rounded-pill bg-surface-tint text-brand-700"
                >
                  <Icon name="search" size={20} />
                </span>
                <p className="font-['Montserrat:Bold'] text-[16px] font-bold text-ink-900">
                  Aucun projet ne correspond à ces filtres
                </p>
                <p className="max-w-[46ch] font-['Inter:Regular'] text-[14px] text-[#5d626e]">
                  Essayez une autre région ou la catégorie « Tous les projets »
                  pour voir l'ensemble des chantiers en cours.
                </p>
                <button
                  type="button"
                  className="mt-2 cursor-pointer rounded-pill bg-brand-900 px-5 py-2.5 font-['Inter:Semi_Bold'] text-[14px] font-semibold text-white transition-colors hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004484]"
                  onClick={() => {
                    setProjectFilter("all")
                    setRegionFilter("all")
                  }}
                >
                  Réinitialiser les filtres
                </button>
              </div>
            </div>
            <div
              className="bg-surface-muted content-stretch flex flex-col items-start py-[64px] relative shrink-0 w-full shell"
              data-node-id="5:3543"
              data-name="Section: Proposer une école partenaire / Signaler une urgence"
            >
              <div
                className="bg-white content-stretch flex flex-col items-start p-[48px] relative rounded-panel shrink-0 w-full"
                data-node-id="5:3544"
                data-name="Background"
              >
                <div
                  className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-panel shadow-float"
                  data-node-id="5:3545"
                  data-name="Overlay+Shadow"
                />
                <div
                  className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full lg:flex-row lg:gap-[48px]"
                  data-node-id="5:3546"
                  data-name="Container"
                >
                  <div
                    className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full lg:flex-[1_0_0] lg:min-w-px"
                    data-node-id="5:3547"
                    data-name="Container"
                  >
                    <div
                      className="bg-[rgba(0,110,45,0.1)] content-stretch flex gap-[8px] items-center px-[12px] py-[4px] relative rounded-pill shrink-0"
                      data-node-id="5:3548"
                      data-name="Overlay"
                    >
                      <div
                        className="h-[10.667px] relative shrink-0 w-[13.333px]"
                        data-node-id="5:3549"
                        data-name="Container"
                      >
                        <img
                          alt=""
                          className="absolute block inset-0 max-w-none size-full"
                          src={imgContainer14}
                        />
                      </div>
                      <div
                        className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-accent-700 text-[11px] tracking-[0.55px] uppercase whitespace-nowrap"
                        data-node-id="5:3551"
                      >
                        <p className="leading-[16px]">
                          APPEL AUX COMMUNAUTÉS LOCALES
                        </p>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                      data-node-id="5:3552"
                      data-name="Heading 2"
                    >
                      <div
                        className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-ink-900 text-[32px] tracking-[-0.8px] w-full"
                        data-node-id="5:3553"
                      >
                        <p className="leading-[40px] mb-0">
                          Proposer une École
                        </p>
                        <p className="leading-[40px] mb-0">
                          Partenaire ou Signaler
                        </p>
                        <p className="leading-[40px]">une Urgence</p>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                      data-node-id="5:3554"
                      data-name="Container"
                    >
                      <div
                        className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[16px] w-full"
                        data-node-id="5:3555"
                      >
                        <p className="leading-[26px] mb-0">{`Vous êtes directeur d'école, membre d'une APE, chef`}</p>
                        <p className="leading-[26px] mb-0">
                          de village ou instituteur au Cameroun ? Notre comité
                        </p>
                        <p className="leading-[26px] mb-0">{`d'évaluation examine chaque mois les requêtes`}</p>
                        <p className="leading-[26px]">{`d'infrastructures en péril.`}</p>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-full"
                      data-node-id="5:3556"
                      data-name="Margin"
                    >
                      <div
                        className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full"
                        data-node-id="5:3557"
                        data-name="Container"
                      >
                        <div
                          className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full"
                          data-node-id="5:3558"
                          data-name="Container"
                        >
                          <div
                            className="h-[20.333px] relative shrink-0 w-[18.333px]"
                            data-node-id="5:3559"
                            data-name="Margin"
                          >
                            <img
                              alt=""
                              className="absolute block inset-0 max-w-none size-full"
                              src={imgMargin}
                            />
                          </div>
                          <div
                            className="content-stretch flex flex-col items-start relative shrink-0"
                            data-node-id="5:3561"
                            data-name="Container"
                          >
                            <div
                              className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                              data-node-id="5:3562"
                              data-name="Container"
                            >
                              <div
                                className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-ink-900 text-[14px] whitespace-nowrap"
                                data-node-id="5:3563"
                              >
                                <p className="leading-[20px]">{`Visite d'audit de terrain systématique`}</p>
                              </div>
                            </div>
                            <div
                              className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                              data-node-id="5:3564"
                              data-name="Container"
                            >
                              <div
                                className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                                data-node-id="5:3565"
                              >
                                <p>{`Nos équipes se déplacent pour certifier la
                                  faisabilité et le devis technique.`}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full"
                          data-node-id="5:3566"
                          data-name="Container"
                        >
                          <div
                            className="h-[20.333px] relative shrink-0 w-[18.333px]"
                            data-node-id="5:3567"
                            data-name="Margin"
                          >
                            <img
                              alt=""
                              className="absolute block inset-0 max-w-none size-full"
                              src={imgMargin}
                            />
                          </div>
                          <div
                            className="content-stretch flex flex-col items-start relative shrink-0"
                            data-node-id="5:3569"
                            data-name="Container"
                          >
                            <div
                              className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                              data-node-id="5:3570"
                              data-name="Container"
                            >
                              <div
                                className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-ink-900 text-[14px] whitespace-nowrap"
                                data-node-id="5:3571"
                              >
                                <p className="leading-[20px]">
                                  Implication des artisans locaux
                                </p>
                              </div>
                            </div>
                            <div
                              className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                              data-node-id="5:3572"
                              data-name="Container"
                            >
                              <div
                                className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                                data-node-id="5:3573"
                              >
                                <p>{`Priorité donnée aux menuisiers, maçons et
                                  électriciens du terroir.`}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full"
                      data-node-id="5:3574"
                      data-name="Margin"
                    >
                      <div
                        className="bg-[rgba(0,68,132,0.05)] content-stretch flex gap-[16px] items-center p-[16px] relative rounded-card shrink-0 w-full"
                        data-node-id="5:3575"
                        data-name="Overlay"
                      >
                        <div
                          className="h-[24px] relative shrink-0 w-[26.667px]"
                          data-node-id="5:3576"
                          data-name="Container"
                        >
                          <img
                            alt=""
                            className="absolute block inset-0 max-w-none size-full"
                            src={imgContainer15}
                          />
                        </div>
                        <div
                          className="content-stretch flex flex-col items-start pr-[24.32px] relative shrink-0"
                          data-node-id="5:3578"
                          data-name="Container"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-ink-900 text-[14px] whitespace-nowrap"
                            data-node-id="5:3579"
                          >
                            <p className="mb-0">
                              <span className="leading-[20px]">
                                Besoin urgent immédiat ?
                              </span>
                              <span className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic">{` Joignez notre cellule`}</span>
                            </p>
                            <p>
                              <span className="font-['Inter:Regular'] font-normal leading-[20px]">{`WhatsApp terrain au `}</span>
                              <span className="font-['Inter:Bold'] font-bold leading-[20px] text-brand-900">
                                +237 699 09 86 88
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <form
                    className="bg-surface-subtle content-stretch drop-shadow-card flex flex-col items-start p-[32px] relative rounded-card shrink-0 w-full lg:flex-[1_0_0] lg:min-w-px"
                    data-node-id="5:3580"
                    data-name="Proposal Form"
                    onSubmit={handleSubmit}
                  >
                    {sent ? (
                      <div
                        role="status"
                        className="bg-[#e9f8ef] border border-[#9be3b8] flex flex-col gap-1 items-start mb-4 p-4 rounded-lg w-full"
                      >
                        <p className="font-['Montserrat'] font-bold text-accent-700 text-sm">
                          Dossier transmis à la cellule terrain
                        </p>
                        <p className="font-['Inter'] text-ink-700 text-[13px] leading-5">
                          Votre WhatsApp s'est ouverte pour l'envoi final. Notre
                          comité retrouve aussi votre dossier dans le back-office
                          et vous répond sous 72h ouvrées.
                        </p>
                      </div>
                    ) : null}
                    <div
                      className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full"
                      data-node-id="5:3581"
                      data-name="Form"
                    >
                      <div
                        className="content-stretch grid grid-cols-1 gap-[16px] items-start relative shrink-0 w-full sm:grid-cols-2"
                        data-node-id="5:3582"
                        data-name="Container"
                      >
                        <div
                          className="content-stretch flex flex-col gap-[4px] items-start relative min-w-0 w-full"
                          data-node-id="5:3583"
                          data-name="Container"
                        >
                          <div
                            className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                            data-node-id="5:3584"
                            data-name="Label"
                          >
                            <div
                              className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-900 text-[12px] w-full"
                              data-node-id="5:3585"
                            >
                              <p className="leading-[16px]">{`Nom de l'École ou Établissement *`}</p>
                            </div>
                          </div>
                          <div
                            className="bg-white content-stretch flex items-start justify-center overflow-clip pb-[12px] pt-[11px] px-[16px] relative rounded-control shadow-raised shrink-0 w-full"
                            data-node-id="5:3586"
                            data-name="Input"
                          >
                            <input
                              aria-label="Nom de l'école ou établissement"
                              autoComplete="organization"
                              className="absolute inset-0 z-10 bg-transparent px-4 font-['Inter:Regular'] text-base text-ink-900 outline-none placeholder:text-transparent"
                              name="school"
                              placeholder="ex: École Publique de Bafia Centre"
                              required
                            />
                            <div
                              className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative"
                              data-node-id="5:3587"
                              data-name="Container"
                            >
                              <div
                                className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-ink-300 text-[14px] w-full"
                                data-node-id="5:3588"
                              >
                                <p className="leading-[normal]">
                                  ex: École Publique de Bafia Centre
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex flex-col gap-[4px] items-start pb-px relative min-w-0 w-full"
                          data-node-id="5:3589"
                          data-name="Container"
                        >
                          <div
                            className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                            data-node-id="5:3590"
                            data-name="Label"
                          >
                            <div
                              className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-900 text-[12px] w-full"
                              data-node-id="5:3591"
                            >
                              <p className="leading-[16px]">
                                Région administrative *
                              </p>
                            </div>
                          </div>
                          <div
                            className="bg-white content-stretch drop-shadow-card flex items-center justify-center pl-[20px] pr-[32px] py-[10px] relative rounded-control shrink-0 w-full"
                            data-node-id="5:3592"
                            data-name="Options"
                          >
                            <select
                              aria-label="Région administrative"
                              className="absolute inset-0 z-10 appearance-none bg-transparent pl-[20px] pr-[16px] font-['Inter:Regular'] text-base text-ink-900 outline-none"
                              defaultValue=""
                              name="region"
                              required
                            >
                              <option value="" disabled>
                                Sélectionner une région
                              </option>
                              {[
                                "Adamaoua",
                                "Centre",
                                "Est",
                                "Extrême-Nord",
                                "Littoral",
                                "Nord",
                                "Nord-Ouest",
                                "Ouest",
                                "Sud",
                                "Sud-Ouest",
                              ].map((region) => (
                                <option key={region} value={region}>
                                  {region}
                                </option>
                              ))}
                            </select>
                            <div
                              className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px py-px relative"
                              data-node-id="5:3593"
                              data-name="Container"
                            >
                              <div
                                className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-ink-900 text-[14px] w-full"
                                data-node-id="5:3594"
                              >
                                <p className="leading-[17px]">
                                  Sélectionner une région
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="content-stretch grid grid-cols-1 gap-[16px] items-start relative shrink-0 w-full sm:grid-cols-2"
                        data-node-id="5:3595"
                        data-name="Container"
                      >
                        <div
                          className="content-stretch flex flex-col gap-[4px] items-start relative min-w-0 w-full"
                          data-node-id="5:3596"
                          data-name="Container"
                        >
                          <div
                            className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                            data-node-id="5:3597"
                            data-name="Label"
                          >
                            <div
                              className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-900 text-[12px] w-full"
                              data-node-id="5:3598"
                            >
                              <p className="leading-[16px]">
                                Nom du référent (Directeur/APE) *
                              </p>
                            </div>
                          </div>
                          <div
                            className="bg-white content-stretch flex items-start justify-center overflow-clip pb-[12px] pt-[11px] px-[16px] relative rounded-control shadow-raised shrink-0 w-full"
                            data-node-id="5:3599"
                            data-name="Input"
                          >
                            <input
                              aria-label="Nom du référent"
                              autoComplete="name"
                              className="absolute inset-0 z-10 bg-transparent px-4 font-['Inter:Regular'] text-base text-ink-900 outline-none placeholder:text-transparent"
                              name="referent"
                              placeholder="Votre nom complet"
                              required
                            />
                            <div
                              className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative"
                              data-node-id="5:3600"
                              data-name="Container"
                            >
                              <div
                                className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-ink-300 text-[14px] w-full"
                                data-node-id="5:3601"
                              >
                                <p className="leading-[normal]">
                                  Votre nom complet
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex flex-col gap-[4px] items-start relative min-w-0 w-full"
                          data-node-id="5:3602"
                          data-name="Container"
                        >
                          <div
                            className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                            data-node-id="5:3603"
                            data-name="Label"
                          >
                            <div
                              className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-900 text-[12px] w-full"
                              data-node-id="5:3604"
                            >
                              <p className="leading-[16px]">
                                Numéro téléphone / WhatsApp *
                              </p>
                            </div>
                          </div>
                          <div
                            className="bg-white content-stretch flex items-start justify-center overflow-clip pb-[12px] pt-[11px] px-[16px] relative rounded-control shadow-raised shrink-0 w-full"
                            data-node-id="5:3605"
                            data-name="Input"
                          >
                            <input
                              aria-label="Numéro téléphone / WhatsApp"
                              autoComplete="tel"
                              className="absolute inset-0 z-10 bg-transparent px-4 font-['Inter:Regular'] text-base text-ink-900 outline-none placeholder:text-transparent"
                              inputMode="tel"
                              name="phone"
                              placeholder="+237 6xx xx xx xx"
                              required
                              type="tel"
                            />
                            <div
                              className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative"
                              data-node-id="5:3606"
                              data-name="Container"
                            >
                              <div
                                className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-ink-300 text-[14px] w-full"
                                data-node-id="5:3607"
                              >
                                <p className="leading-[normal]">
                                  +237 6xx xx xx xx
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full"
                        data-node-id="5:3608"
                        data-name="Container"
                      >
                        <div
                          className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                          data-node-id="5:3609"
                          data-name="Label"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-900 text-[12px] w-full"
                            data-node-id="5:3610"
                          >
                            <p className="leading-[16px]">{`Type d'urgence prioritaire *`}</p>
                          </div>
                        </div>
<div
                            className="bg-white content-stretch drop-shadow-card flex items-center justify-center pl-[20px] pr-[32px] py-[10px] relative rounded-control shrink-0 w-full"
                            data-node-id="5:3611"
                            data-name="Options"
                          >
                            <select
                              aria-label="Type d'urgence prioritaire"
                              className="absolute inset-0 z-10 appearance-none bg-transparent pl-[20px] pr-[16px] font-['Inter:Regular'] text-base text-ink-900 outline-none"
                              defaultValue=""
                              name="urgencyType"
                              required
                            >
                              <option value="" disabled>
                                Nature des travaux ou de l'aide
                              </option>
                              <option value="Rehabilitation de salles de classe">
                                Réhabilitation de salles de classe
                              </option>
                              <option value="Toiture / Infiltrations">
                                Toiture / Infiltrations
                              </option>
                              <option value="Latrines & WASH">
                                Latrines & WASH
                              </option>
                              <option value="Point d'eau potable">
                                Point d'eau potable
                              </option>
                              <option value="Mobilier scolaire">
                                Mobilier scolaire
                              </option>
                              <option value="Autre urgence">Autre urgence</option>
                            </select>
                            <div
                              className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px py-px relative"
                              data-node-id="5:3612"
                              data-name="Container"
                            >
                              <div
                                className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-ink-900 text-[14px] w-full"
                                data-node-id="5:3613"
                              >
                                <p className="leading-[17px]">{`Nature des travaux ou de l'aide`}</p>
                              </div>
                            </div>
                          </div>
                      </div>
                      <div
                        className="content-stretch flex flex-col gap-[4px] items-start pb-[6px] relative shrink-0 w-full"
                        data-node-id="5:3614"
                        data-name="Container"
                      >
                        <div
                          className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                          data-node-id="5:3615"
                          data-name="Label"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-900 text-[12px] w-full"
                            data-node-id="5:3616"
                          >
                            <p className="leading-[16px]">
                              Description succincte de la situation *
                            </p>
                          </div>
                        </div>
                        <div
                          className="bg-white content-stretch flex items-start justify-center overflow-auto pb-[50px] pt-[10px] px-[16px] relative rounded-control shadow-raised shrink-0 w-full"
                          data-node-id="5:3617"
                          data-name="Textarea"
                        >
                          <textarea
                            aria-label="Description succincte de la situation"
                            autoComplete="off"
                            className="absolute inset-0 z-10 resize-none bg-transparent px-4 pt-[10px] font-['Inter:Regular'] text-base leading-5 text-ink-900 outline-none placeholder:text-transparent"
                            name="description"
                            placeholder="Précisez le nombre d'élèves affectés et la localité précise..."
                            required
                          />
                          <div
                            className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative"
                            data-node-id="5:3618"
                            data-name="Container"
                          >
                            <div
                              className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-ink-300 text-[14px] w-full"
                              data-node-id="5:3619"
                            >
                              <p className="leading-[20px]">{`Précisez le nombre d'élèves affectés et la localité précise...`}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="content-stretch flex flex-wrap gap-[12px] items-center justify-between pt-[8px] relative shrink-0 w-full"
                        data-node-id="5:3620"
                        data-name="Container"
                      >
                        <div
                          className="content-stretch flex flex-col items-start relative shrink-0"
                          data-node-id="5:3621"
                          data-name="Container"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-ink-700 text-[11px] whitespace-nowrap"
                            data-node-id="5:3622"
                          >
                            <p className="leading-[16px]">
                              • Traitement sous 72h ouvrées
                            </p>
                          </div>
                        </div>
                        <button
                          type="submit"
                          disabled={submitting}
                          className="bg-accent-700 content-stretch flex gap-[8px] items-center relative rounded-pill btn-md btn hover:bg-accent-900 disabled:cursor-not-allowed disabled:opacity-60"
                          data-node-id="5:3623"
                          data-name="Button"
                        >
                          <div
                            className="absolute bg-[rgba(255,255,255,0)] inset-[0_0.25px_0_0] rounded-pill shadow-float"
                            data-node-id="5:3624"
                            data-name="Button:shadow"
                          />
                          <div
                            className="h-[12px] relative shrink-0 w-[14.25px]"
                            data-node-id="5:3625"
                            data-name="Container"
                          >
                            <img
                              alt=""
                              className="absolute block inset-0 max-w-none size-full"
                              src={imgContainer16}
                            />
                          </div>
                          <div
                            className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap"
                            data-node-id="5:3627"
                          >
                            <p className="leading-[20px]">
                              Transmettre le dossier
                            </p>
                          </div>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div
              className="content-stretch flex flex-col items-start py-[64px] relative shrink-0 w-full shell"
              data-node-id="5:3628"
              data-name="Section: Transparence, Gouvernance & Traçabilit"
            >
              <div
                className="content-stretch flex flex-col items-start overflow-clip p-[48px] relative rounded-panel shadow-hero shrink-0 w-full"
                data-node-id="5:3629"
                style={{
                  backgroundImage:
                    "linear-gradient(157.5894426940577deg, rgb(0, 68, 132) 0%, rgb(11, 92, 171) 100%)",
                }}
                data-name="Background+Shadow"
              >
                <div
                  className="absolute bg-[rgba(17,94,174,0.2)] blur-[32px] bottom-[-0.33px] right-0 rounded-pill size-[320px]"
                  data-node-id="5:3630"
                  data-name="Overlay+Blur"
                />
                <div
                  className="content-stretch flex gap-[32px] items-start relative shrink-0 w-full"
                  data-node-id="5:3631"
                  data-name="Container"
                >
                  <div
                    className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px relative"
                    data-node-id="5:3632"
                    data-name="Container"
                  >
                    <div
                      className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full"
                      data-node-id="5:3633"
                      data-name="Container"
                    >
                      <div
                        className="h-[21.667px] relative shrink-0 w-[17.333px]"
                        data-node-id="5:3634"
                        data-name="Container"
                      >
                        <img
                          alt=""
                          className="absolute block inset-0 max-w-none size-full"
                          src={imgContainer17}
                        />
                      </div>
                      <div
                        className="content-stretch flex flex-col items-start relative shrink-0"
                        data-node-id="5:3636"
                        data-name="Container"
                      >
                        <div
                          className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-accent-200 text-[11px] tracking-[1.1px] uppercase whitespace-nowrap"
                          data-node-id="5:3637"
                        >
                          <p className="leading-[16px]">
                            PROTOCOLE DE TRAÇABILITÉ
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                      data-node-id="5:3638"
                      data-name="Heading 2"
                    >
                      <div
                        className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[32px] text-white tracking-[-0.8px] w-full"
                        data-node-id="5:3639"
                      >
                        <p className="leading-[40px]">
                          La Garantie « Franc CFA Utile »
                        </p>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                      data-node-id="5:3640"
                      data-name="Container"
                    >
                      <div
                        className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-brand-300 text-[16px] w-full"
                        data-node-id="5:3641"
                      >
                        <p className="leading-[26px] mb-0">{`Chez Children's Smile Cameroun, aucun don ne disparaît dans l'opacité. Chaque`}</p>
                        <p className="leading-[26px] mb-0">{`parrain d'un chantier reçoit des rapports photos d'avancement à 25%, 50%,`}</p>
                        <p className="leading-[26px]">{`75% et lors de la réception technique finale des clés avec l'administration locale.`}</p>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex gap-[16px] items-start justify-center pt-[8px] relative shrink-0 w-full"
                      data-node-id="5:3642"
                      data-name="Container"
                    >
                      <div
                        className="backdrop-blur-[2px] bg-[rgba(255,255,255,0.1)] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px pb-[32px] pt-[16px] px-[16px] relative rounded-card"
                        data-node-id="5:3643"
                        data-name="Overlay+OverlayBlur"
                      >
                        <div
                          className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                          data-node-id="5:3644"
                          data-name="Container"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-accent-200 text-[20px] w-full"
                            data-node-id="5:3645"
                          >
                            <p className="leading-[28px]">100%</p>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                          data-node-id="5:3646"
                          data-name="Container"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-100 text-[11px] w-full"
                            data-node-id="5:3647"
                          >
                            <p className="leading-[16px]">{`Factures visées & archivées`}</p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="backdrop-blur-[2px] bg-[rgba(255,255,255,0.1)] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px pb-[32px] pt-[16px] px-[16px] relative rounded-card"
                        data-node-id="5:3648"
                        data-name="Overlay+OverlayBlur"
                      >
                        <div
                          className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                          data-node-id="5:3649"
                          data-name="Container"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-accent-200 text-[20px] w-full"
                            data-node-id="5:3650"
                          >
                            <p className="leading-[28px]">0 FCFA</p>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                          data-node-id="5:3651"
                          data-name="Container"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-100 text-[11px] w-full"
                            data-node-id="5:3652"
                          >
                            <p className="leading-[16px]">{`Frais d'intermédiaire obscur`}</p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="backdrop-blur-[2px] bg-[rgba(255,255,255,0.1)] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px p-[16px] relative rounded-card"
                        data-node-id="5:3653"
                        data-name="Overlay+OverlayBlur"
                      >
                        <div
                          className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                          data-node-id="5:3654"
                          data-name="Container"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-accent-200 text-[20px] w-full"
                            data-node-id="5:3655"
                          >
                            <p className="leading-[28px]">Mensuel</p>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                          data-node-id="5:3656"
                          data-name="Container"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-100 text-[11px] w-full"
                            data-node-id="5:3657"
                          >
                            <p className="leading-[16px] mb-0">
                              Point WhatsApp direct aux
                            </p>
                            <p className="leading-[16px]">donateurs</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="bg-white content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px p-[24px] relative rounded-card"
                    data-node-id="5:3658"
                    data-name="Background"
                  >
                    <div
                      className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-card shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]"
                      data-node-id="5:3659"
                      data-name="Overlay+Shadow"
                    />
                    <div
                      className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full"
                      data-node-id="5:3660"
                      data-name="Heading 3"
                    >
                      <div
                        className="relative shrink-0 size-[16px]"
                        data-node-id="5:3661"
                        data-name="Container"
                      >
                        <img
                          alt=""
                          className="absolute block inset-0 max-w-none size-full"
                          src={imgContainer18}
                        />
                      </div>
                      <div
                        className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-900 text-[18px] whitespace-nowrap"
                        data-node-id="5:3663"
                      >
                        <p className="leading-[24px]">
                          Espace Téléchargement Public
                        </p>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                      data-node-id="5:3664"
                      data-name="Container"
                    >
                      <div
                        className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center not-italic relative shrink-0 text-ink-700 text-body w-full"
                        data-node-id="5:3665"
                      >
                        <p>{`Téléchargez les comptes-rendus d'exécution physique et financière des projets clôturés.`}</p>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full"
                      data-node-id="5:3666"
                      data-name="Container"
                    >
                      <div
                        className="bg-surface-muted content-stretch flex items-center justify-between p-[12px] relative rounded-control shrink-0 w-full"
                        data-node-id="5:3667"
                        data-name="Link"
                      >
                        <div
                          className="content-stretch flex gap-[12px] items-center relative shrink-0"
                          data-node-id="5:3668"
                          data-name="Container"
                        >
                          <div
                            className="relative shrink-0 size-[20px]"
                            data-node-id="5:3669"
                            data-name="Container"
                          >
                            <img
                              alt=""
                              className="absolute block inset-0 max-w-none size-full"
                              src={imgContainer19}
                            />
                          </div>
                          <div
                            className="content-stretch flex flex-col items-start relative shrink-0"
                            data-node-id="5:3671"
                            data-name="Container"
                          >
                            <div
                              className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                              data-node-id="5:3672"
                              data-name="Container"
                            >
                              <div
                                className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-ink-900 text-[12px] whitespace-nowrap"
                                data-node-id="5:3673"
                              >
                                <p className="leading-[16px]">{`Rapport Chantiers Est & Grand Nord 2024`}</p>
                              </div>
                            </div>
                            <div
                              className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                              data-node-id="5:3674"
                              data-name="Container"
                            >
                              <div
                                className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-ink-500 text-[11px] whitespace-nowrap"
                                data-node-id="5:3675"
                              >
                                <p className="leading-[16px]">
                                  PDF • 4.2 Mo • Certifié
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="h-[12px] relative shrink-0 w-[7.4px]"
                          data-node-id="5:3676"
                          data-name="Container"
                        >
                          <img
                            alt=""
                            className="absolute block inset-0 max-w-none size-full"
                            src={imgContainer20}
                          />
                        </div>
                      </div>
                      <div
                        className="bg-surface-muted content-stretch flex items-center justify-between p-[12px] relative rounded-control shrink-0 w-full"
                        data-node-id="5:3678"
                        data-name="Link"
                      >
                        <div
                          className="content-stretch flex gap-[12px] items-center relative shrink-0"
                          data-node-id="5:3679"
                          data-name="Container"
                        >
                          <div
                            className="relative shrink-0 size-[20px]"
                            data-node-id="5:3680"
                            data-name="Container"
                          >
                            <img
                              alt=""
                              className="absolute block inset-0 max-w-none size-full"
                              src={imgContainer19}
                            />
                          </div>
                          <div
                            className="content-stretch flex flex-col items-start relative shrink-0"
                            data-node-id="5:3682"
                            data-name="Container"
                          >
                            <div
                              className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                              data-node-id="5:3683"
                              data-name="Container"
                            >
                              <div
                                className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-ink-900 text-[12px] whitespace-nowrap"
                                data-node-id="5:3684"
                              >
                                <p className="leading-[16px]">{`Charte de Sauvegarde de l'Enfance en Chantier`}</p>
                              </div>
                            </div>
                            <div
                              className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                              data-node-id="5:3685"
                              data-name="Container"
                            >
                              <div
                                className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-ink-500 text-[11px] whitespace-nowrap"
                                data-node-id="5:3686"
                              >
                                <p className="leading-[16px]">
                                  PDF • 1.1 Mo • Réglementation
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="h-[12px] relative shrink-0 w-[7.4px]"
                          data-node-id="5:3687"
                          data-name="Container"
                        >
                          <img
                            alt=""
                            className="absolute block inset-0 max-w-none size-full"
                            src={imgContainer20}
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-full"
                      data-node-id="5:3689"
                      data-name="Container"
                    >
                      <Link
                        to="/notre-impact"
                        className="bg-brand-900 content-stretch flex flex-row items-center relative rounded-pill w-full btn-md btn"
                        data-node-id="5:3690"
                        data-name="Link"
                      >
                        <div
                          className="btn-label [word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white"
                          data-node-id="5:3691"
                        >
                          <p className="leading-[20px]">
                            Découvrir nos bilans financiers complets
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute backdrop-blur-[12px] bg-[rgba(255,255,255,0.95)] content-stretch flex flex-col items-start left-0 right-0 shadow-[0px_2px_12px_0px_rgba(11,92,171,0.06)] top-0"
          data-node-id="5:3712"
          data-name="Header"
        >
          <div
            className="bg-brand-900 content-stretch flex flex-col items-start py-[6px] relative shrink-0 w-full shell"
            data-node-id="50:1148"
            data-name="Background"
          >
            <div
              className="content-stretch flex items-center justify-between relative shrink-0 w-full shell"
              data-node-id="50:1149"
              data-name="Container"
            >
              <div
                className="content-stretch flex gap-[8px] items-center relative shrink-0"
                data-node-id="50:1150"
                data-name="Container"
              >
                <div
                  className="content-stretch flex flex-col items-start relative shrink-0"
                  data-node-id="50:1151"
                  data-name="Container"
                >
                  <div
                    className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[11px] text-white tracking-[0.28px] uppercase whitespace-nowrap"
                    data-node-id="50:1152"
                  >
                    <p className="leading-[16px]">10 RÉGIONS DU CAMEROUN</p>
                  </div>
                </div>
                <div
                  className="content-stretch flex flex-col items-start opacity-50 relative shrink-0"
                  data-node-id="50:1153"
                  data-name="Container"
                >
                  <div
                    className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[11px] text-white tracking-[0.28px] uppercase whitespace-nowrap"
                    data-node-id="50:1154"
                  >
                    <p
                      className="leading-[16px]"
                      data-decorative-separator="true"
                    >
                      •
                    </p>
                  </div>
                </div>
                <div
                  className="content-stretch flex flex-col items-start relative shrink-0"
                  data-node-id="50:1155"
                  data-name="Container"
                >
                  <div
                    className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[11px] text-white tracking-[0.28px] uppercase whitespace-nowrap"
                    data-node-id="50:1156"
                  >
                    <p className="leading-[16px]">
                      UN SOURIRE POUR CHAQUE ENFANT
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="content-stretch flex gap-[16px] items-center relative shrink-0"
                data-node-id="50:1157"
                data-name="Container"
              >
                <div
                  className="content-stretch flex gap-[6px] items-center relative shrink-0"
                  data-node-id="50:1158"
                  data-name="Container"
                >
                  <Icon name="phone" size={12} className="shrink-0" />
                  <div
                    className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] lowercase not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap"
                    data-node-id="50:1161"
                  >
                    <p className="leading-[20px]">+237 699 09 86 88</p>
                  </div>
                </div>
                <div
                  className="content-stretch flex flex-col items-start opacity-40 relative shrink-0"
                  data-node-id="50:1162"
                  data-name="Container"
                >
                  <div
                    className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] lowercase not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap"
                    data-node-id="50:1163"
                  >
                    <p className="leading-[20px]">|</p>
                  </div>
                </div>
                <div
                  className="content-stretch flex flex-col items-start relative shrink-0"
                  data-node-id="50:1164"
                  data-name="Container"
                >
                  <div
                    className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-brand-300 text-[12px] tracking-[0.6px] uppercase whitespace-nowrap"
                    data-node-id="50:1165"
                  >
                    <p className="leading-[16px]">
                      ONG AGRÉÉE RÉPUBLIQUE DU CAMEROUN
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="h-[80px] relative shrink-0 w-full shell"
            data-node-id="50:1166"
            data-name="Container"
          >
            <div
              className="-translate-y-1/2 absolute content-stretch flex gap-[12px] items-center left-[56px] top-1/2"
              data-node-id="50:1167"
              data-name="Container"
            >
              <div
                className="max-w-[331.29998779296875px] relative rounded-pill shrink-0 size-[32px]"
                data-node-id="50:1168"
                data-name="Profile"
              >
                <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-pill">
                  <img
                    alt=""
                    className="absolute left-0 max-w-none size-full top-0"
                    src={imgProfile}
                  />
                </div>
              </div>
              <div
                className="content-stretch flex flex-col items-start relative shrink-0"
                data-node-id="50:1169"
                data-name="Container"
              >
                <div
                  className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                  data-node-id="50:1170"
                  data-name="Container"
                >
                  <div
                    className="[word-break:break-word] flex flex-col font-['Montserrat:SemiBold'] font-semibold justify-center leading-[0] relative shrink-0 text-brand-900 text-[20px] tracking-[-0.5px] whitespace-nowrap"
                    data-node-id="50:1171"
                  >
                    <p className="leading-[20px]">{`Children's Smile Cameroun`}</p>
                  </div>
                </div>
                <div
                  className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0 w-full"
                  data-node-id="50:1172"
                  data-name="Margin"
                >
                  <div
                    className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                    data-node-id="50:1173"
                    data-name="Container"
                  >
                    <div
                      className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-accent-700 text-[11px] tracking-[0.55px] uppercase w-full"
                      data-node-id="50:1174"
                    >
                      <p className="leading-[16px]">
                        ASSISTANCE • ÉDUCATION • DÉVELOPPEMENT
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="-translate-y-1/2 absolute content-stretch flex gap-[20px] items-center left-[403.3px] top-1/2"
              data-node-id="50:1175"
              data-name="Nav"
            >
              <div
                className="content-stretch flex flex-col items-start relative shrink-0"
                data-node-id="50:1176"
                data-name="Link"
              >
                <div
                  className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                  data-node-id="50:1177"
                >
                  <p className="leading-[20px]">Accueil</p>
                </div>
              </div>
              <div
                className="content-stretch flex flex-col items-start relative shrink-0"
                data-node-id="50:1178"
                data-name="Link"
              >
                <div
                  className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                  data-node-id="50:1179"
                >
                  <p>{`À propos`}</p>
                </div>
              </div>
              <div
                className="content-stretch flex flex-col items-start relative shrink-0"
                data-node-id="50:1180"
                data-name="Link"
              >
                <div
                  className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                  data-node-id="50:1181"
                >
                  <p>{`Nos actions`}</p>
                </div>
              </div>
              <div
                className="bg-brand-700 content-stretch flex flex-col items-start px-[8px] py-[4px] relative rounded-pill shrink-0"
                data-node-id="50:1182"
                data-name="Link"
              >
                <div
                  className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap"
                  data-node-id="50:1183"
                >
                  <p>{`Nos projets`}</p>
                </div>
              </div>
              <div
                className="content-stretch flex flex-col items-start relative shrink-0"
                data-node-id="50:1184"
                data-name="Link"
              >
                <div
                  className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                  data-node-id="50:1185"
                >
                  <p>{`Notre impact`}</p>
                </div>
              </div>
              <div
                className="content-stretch flex flex-col items-start relative shrink-0"
                data-node-id="50:1186"
                data-name="Link"
              >
                <div
                  className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                  data-node-id="50:1187"
                >
                  <p className="leading-[20px]">Actualités</p>
                </div>
              </div>
              <div
                className="content-stretch flex flex-col items-start relative shrink-0"
                data-node-id="50:1188"
                data-name="Link"
              >
                <div
                  className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                  data-node-id="50:1189"
                >
                  <p>{`Nous soutenir`}</p>
                </div>
              </div>
              <div
                className="content-stretch flex flex-col items-start relative shrink-0"
                data-node-id="50:1190"
                data-name="Link"
              >
                <div
                  className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                  data-node-id="50:1191"
                >
                  <p className="leading-[20px]">Contact</p>
                </div>
              </div>
            </div>
            <div
              className="-translate-y-1/2 absolute content-stretch flex gap-[8px] items-center left-[993.1px] top-1/2"
              data-node-id="50:1192"
              data-name="Container"
            >
              <div
                className="bg-white content-stretch drop-shadow-[0px_1px_2px_rgba(0,110,45,0.15)] flex items-center px-[16px] py-[8px] relative rounded-pill shrink-0"
                data-node-id="50:1193"
                data-name="Link"
              >
                <div
                  className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-accent-700 text-[14px] whitespace-nowrap"
                  data-node-id="50:1194"
                >
                  <p className="leading-[20px]">Devenir Partenaire</p>
                </div>
              </div>
              <div
                className="bg-warn-700 content-stretch drop-shadow-[0px_4px_7px_rgba(163,57,0,0.3)] flex items-center relative rounded-pill shrink-0 btn-md btn"
                data-node-id="50:1195"
                data-name="Link"
              >
                <div
                  className="btn-label [word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white"
                  data-node-id="50:1196"
                >
                  <p className="leading-[20px]">Nous Soutenir</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute backdrop-blur-[12px] bg-[rgba(255,255,255,0.95)] content-stretch flex flex-col items-start left-0 shadow-[0px_2px_12px_0px_rgba(11,92,171,0.06)] top-0 w-full max-w-shell"
          data-node-id="5:3787"
          data-name="Header"
        >
          <div
            className="bg-brand-900 content-stretch flex flex-col items-start py-[6px] relative shrink-0 w-full shell"
            data-node-id="5:3788"
            data-name="Background"
          >
            <div
              className="content-stretch flex items-center justify-between relative shrink-0 w-full shell"
              data-node-id="5:3789"
              data-name="Container"
            >
              <div
                className="content-stretch flex gap-[8px] items-center relative shrink-0"
                data-node-id="5:3790"
                data-name="Container"
              >
                <div
                  className="content-stretch flex flex-col items-start relative shrink-0"
                  data-node-id="5:3791"
                  data-name="Container"
                >
                  <div
                    className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[11px] text-white tracking-[0.275px] uppercase whitespace-nowrap"
                    data-node-id="5:3792"
                  >
                    <p className="leading-[16px]">10 RÉGIONS DU CAMEROUN</p>
                  </div>
                </div>
                <div
                  className="content-stretch flex flex-col items-start opacity-50 relative shrink-0"
                  data-node-id="5:3793"
                  data-name="Container"
                >
                  <div
                    className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[11px] text-white tracking-[0.275px] uppercase whitespace-nowrap"
                    data-node-id="5:3794"
                  >
                    <p
                      className="leading-[16px]"
                      data-decorative-separator="true"
                    >
                      •
                    </p>
                  </div>
                </div>
                <div
                  className="content-stretch flex flex-col items-start relative shrink-0"
                  data-node-id="5:3795"
                  data-name="Container"
                >
                  <div
                    className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[11px] text-white tracking-[0.275px] uppercase whitespace-nowrap"
                    data-node-id="5:3796"
                  >
                    <p className="leading-[16px]">
                      UN SOURIRE POUR CHAQUE ENFANT
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="content-stretch flex gap-[16px] items-center relative shrink-0"
                data-node-id="5:3797"
                data-name="Container"
              >
                <div
                  className="content-stretch flex gap-[6px] items-center relative shrink-0"
                  data-node-id="5:3798"
                  data-name="Container"
                >
                  <div
                    className="relative shrink-0 size-[12px]"
                    data-node-id="5:3799"
                    data-name="Container"
                  >
                    <img
                      alt=""
                      className="absolute block inset-0 max-w-none size-full"
                      src={imgContainer22}
                    />
                  </div>
                  <div
                    className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] lowercase not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap"
                    data-node-id="5:3801"
                  >
                    <p className="leading-[20px]">+237 699 09 86 88</p>
                  </div>
                </div>
                <div
                  className="content-stretch flex flex-col items-start opacity-40 relative shrink-0"
                  data-node-id="5:3802"
                  data-name="Container"
                >
                  <div
                    className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] lowercase not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap"
                    data-node-id="5:3803"
                  >
                    <p className="leading-[20px]">|</p>
                  </div>
                </div>
                <div
                  className="content-stretch flex flex-col items-start relative shrink-0"
                  data-node-id="5:3804"
                  data-name="Container"
                >
                  <div
                    className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-brand-300 text-[12px] tracking-[0.6px] uppercase whitespace-nowrap"
                    data-node-id="5:3805"
                  >
                    <p className="leading-[16px]">
                      ONG AGRÉÉE RÉPUBLIQUE DU CAMEROUN
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="h-[80px] relative shrink-0 w-full shell"
            data-node-id="5:3806"
            data-name="Container"
          >
            <div
              className="-translate-y-1/2 absolute content-stretch flex gap-[12px] items-center left-[56px] top-1/2"
              data-node-id="5:3807"
              data-name="Container"
            >
              <div
                className="max-w-[331.2699890136719px] relative rounded-pill shrink-0 size-[32px]"
                data-node-id="5:3808"
                data-name="Profile"
              >
                <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-pill">
                  <img
                    alt=""
                    className="absolute left-0 max-w-none size-full top-0"
                    src={imgProfile}
                  />
                </div>
              </div>
              <div
                className="content-stretch flex flex-col items-start relative shrink-0"
                data-node-id="5:3809"
                data-name="Container"
              >
                <div
                  className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                  data-node-id="5:3810"
                  data-name="Container"
                >
                  <div
                    className="[word-break:break-word] flex flex-col font-['Montserrat:SemiBold'] font-semibold justify-center leading-[0] relative shrink-0 text-brand-900 text-[20px] tracking-[-0.5px] whitespace-nowrap"
                    data-node-id="5:3811"
                  >
                    <p className="leading-[20px]">{`Children's Smile Cameroun`}</p>
                  </div>
                </div>
                <div
                  className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0 w-full"
                  data-node-id="5:3812"
                  data-name="Margin"
                >
                  <div
                    className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                    data-node-id="5:3813"
                    data-name="Container"
                  >
                    <div
                      className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-accent-700 text-[11px] tracking-[0.55px] uppercase w-full"
                      data-node-id="5:3814"
                    >
                      <p className="leading-[16px]">
                        ASSISTANCE • ÉDUCATION • DÉVELOPPEMENT
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="-translate-y-1/2 absolute content-stretch flex gap-[20px] items-center left-[403.27px] top-1/2"
              data-node-id="5:3815"
              data-name="Nav"
            >
              <div
                className="content-stretch flex flex-col items-start relative shrink-0"
                data-node-id="5:3816"
                data-name="Link"
              >
                <div
                  className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                  data-node-id="5:3817"
                >
                  <p className="leading-[20px]">Accueil</p>
                </div>
              </div>
              <div
                className="content-stretch flex flex-col items-start relative shrink-0"
                data-node-id="5:3818"
                data-name="Link"
              >
                <div
                  className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                  data-node-id="5:3819"
                >
                  <p>{`À propos`}</p>
                </div>
              </div>
              <div
                className="content-stretch flex flex-col items-start relative shrink-0"
                data-node-id="5:3820"
                data-name="Link"
              >
                <div
                  className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                  data-node-id="5:3821"
                >
                  <p>{`Nos actions`}</p>
                </div>
              </div>
              <div
                className="bg-brand-700 content-stretch flex flex-col items-start px-[8px] py-[4px] relative rounded-pill shrink-0"
                data-node-id="5:3822"
                data-name="Link"
              >
                <div
                  className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap"
                  data-node-id="5:3823"
                >
                  <p>{`Nos projets`}</p>
                </div>
              </div>
              <div
                className="content-stretch flex flex-col items-start relative shrink-0"
                data-node-id="5:3824"
                data-name="Link"
              >
                <div
                  className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                  data-node-id="5:3825"
                >
                  <p>{`Notre impact`}</p>
                </div>
              </div>
              <div
                className="content-stretch flex flex-col items-start relative shrink-0"
                data-node-id="5:3826"
                data-name="Link"
              >
                <div
                  className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                  data-node-id="5:3827"
                >
                  <p className="leading-[20px]">Actualités</p>
                </div>
              </div>
              <div
                className="content-stretch flex flex-col items-start relative shrink-0"
                data-node-id="5:3828"
                data-name="Link"
              >
                <div
                  className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                  data-node-id="5:3829"
                >
                  <p>{`Nous soutenir`}</p>
                </div>
              </div>
              <div
                className="content-stretch flex flex-col items-start relative shrink-0"
                data-node-id="5:3830"
                data-name="Link"
              >
                <div
                  className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                  data-node-id="5:3831"
                >
                  <p className="leading-[20px]">Contact</p>
                </div>
              </div>
            </div>
            <div
              className="-translate-y-1/2 absolute content-stretch flex gap-[8px] items-center left-[993.06px] top-1/2"
              data-node-id="5:3832"
              data-name="Container"
            >
              <div
                className="bg-white content-stretch drop-shadow-[0px_1px_2px_rgba(0,110,45,0.15)] flex items-center px-[16px] py-[8px] relative rounded-pill shrink-0"
                data-node-id="5:3833"
                data-name="Link"
              >
                <div
                  className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-accent-700 text-[14px] whitespace-nowrap"
                  data-node-id="5:3834"
                >
                  <p className="leading-[20px]">Devenir Partenaire</p>
                </div>
              </div>
              <div
                className="bg-warn-700 content-stretch drop-shadow-[0px_4px_7px_rgba(163,57,0,0.3)] flex items-center relative rounded-pill shrink-0 btn-md btn"
                data-node-id="5:3835"
                data-name="Link"
              >
                <div
                  className="btn-label [word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white"
                  data-node-id="5:3836"
                >
                  <p className="leading-[20px]">Nous Soutenir</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="bg-brand-900 content-stretch flex flex-col gap-[32px] items-start pb-[32px] pt-[64px] relative shrink-0 w-full shell"
          data-node-id="50:1464"
          data-name="Footer"
        >
          <div
            className="content-stretch flex items-start justify-between relative shrink-0 w-full"
            data-node-id="50:1465"
            data-name="Top"
          >
            <div
              className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-[360px]"
              data-node-id="50:1466"
              data-name="Brand"
            >
              <div
                className="content-stretch flex gap-[12px] items-center relative shrink-0"
                data-node-id="50:1467"
                data-name="Brand Row"
              >
                <div
                  className="relative rounded-pill shrink-0 size-[32px]"
                  data-node-id="50:1468"
                  data-name="Profile"
                >
                  <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-pill">
                    <img
                      alt=""
                      className="absolute left-0 max-w-none size-full top-0"
                      src={imgProfile}
                    />
                  </div>
                </div>
                <div
                  className="[word-break:break-word] flex flex-col font-['Montserrat:SemiBold'] font-semibold justify-center leading-[0] relative shrink-0 text-[20px] text-white tracking-[-0.5px] whitespace-nowrap"
                  data-node-id="50:1469"
                >
                  <p className="leading-[20px]">{`Children's Smile Cameroun`}</p>
                </div>
              </div>
              <div
                className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] min-w-full relative shrink-0 text-accent-200 text-[11px] tracking-[0.55px] uppercase w-full"
                data-node-id="50:1470"
              >
                <p className="leading-[16px]">{`ASSISTANCE • ÉDUCATION • DÉVELOPPEMENT`}</p>
              </div>
              <div
                className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] min-w-full not-italic relative shrink-0 text-brand-100 text-[14px] w-full"
                data-node-id="50:1471"
              >
                <p className="leading-[22px]">{`Nous accompagnons les écoles rurales, les communautés locales et les enfants vulnérables au Cameroun grâce à des projets concrets, des suivis de terrain et une transparence totale.`}</p>
              </div>
            </div>
            <div
              className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-start leading-[0] relative shrink-0 w-[180px] whitespace-nowrap"
              data-node-id="50:1472"
              data-name="Navigation"
            >
              <div
                className="flex flex-col font-['Montserrat:Bold'] font-bold justify-center relative shrink-0 text-accent-200 text-[11px] tracking-[0.55px] uppercase"
                data-node-id="50:1473"
              >
                <p className="leading-[16px]">Navigation</p>
              </div>
              <div
                className="content-stretch flex flex-col font-['Inter:Semi_Bold'] font-semibold gap-[10px] items-start not-italic relative shrink-0 text-[14px] text-white w-full"
                data-node-id="50:1474"
                data-name="Links"
              >
                <div
                  className="flex flex-col justify-center relative shrink-0"
                  data-node-id="50:1475"
                >
                  <p className="leading-[20px]">Accueil</p>
                </div>
                <div
                  className="flex flex-col justify-center relative shrink-0"
                  data-node-id="50:1476"
                >
                  <p className="leading-[20px]">À propos</p>
                </div>
                <div
                  className="flex flex-col justify-center relative shrink-0"
                  data-node-id="50:1477"
                >
                  <p className="leading-[20px]">Nos actions</p>
                </div>
                <div
                  className="flex flex-col justify-center relative shrink-0"
                  data-node-id="50:1478"
                >
                  <p className="leading-[20px]">Nos projets</p>
                </div>
                <div
                  className="flex flex-col justify-center relative shrink-0"
                  data-node-id="50:1479"
                >
                  <p className="leading-[20px]">Notre impact</p>
                </div>
                <div
                  className="flex flex-col justify-center relative shrink-0"
                  data-node-id="50:1480"
                >
                  <p className="leading-[20px]">Actualités</p>
                </div>
                <div
                  className="flex flex-col justify-center relative shrink-0"
                  data-node-id="50:1481"
                >
                  <p className="leading-[20px]">Nous soutenir</p>
                </div>
                <div
                  className="flex flex-col justify-center relative shrink-0"
                  data-node-id="50:1482"
                >
                  <p className="leading-[20px]">Contact</p>
                </div>
              </div>
            </div>
            <div
              className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-[220px]"
              data-node-id="50:1483"
              data-name="Contact"
            >
              <div
                className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-accent-200 text-[11px] tracking-[0.55px] uppercase whitespace-nowrap"
                data-node-id="50:1484"
              >
                <p className="leading-[16px]">Contact</p>
              </div>
              <div
                className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full"
                data-node-id="50:1485"
                data-name="Phone"
              >
                <div
                  className="relative shrink-0 size-[16px]"
                  data-node-id="50:1509"
                  data-name="phone"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgPhone}
                  />
                </div>
                <div
                  className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] min-w-px not-italic relative text-[14px] text-white"
                  data-node-id="50:1487"
                >
                  <p className="leading-[20px]">+237 699 09 86 88</p>
                </div>
              </div>
              <div
                className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full"
                data-node-id="50:1488"
                data-name="Email"
              >
                <div
                  className="relative shrink-0 size-[16px]"
                  data-node-id="50:1512"
                  data-name="mail"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgMail}
                  />
                </div>
                <div
                  className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] min-w-px not-italic relative text-[14px] text-white"
                  data-node-id="50:1490"
                >
                  <p className="leading-[20px]">contact@childrensmile-cm.org</p>
                </div>
              </div>
              <div
                className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full"
                data-node-id="50:1491"
                data-name="WhatsApp"
              >
                <div
                  className="relative shrink-0 size-[16px]"
                  data-node-id="50:1515"
                  data-name="message-circle"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgMessageCircle}
                  />
                </div>
                <div
                  className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] min-w-px not-italic relative text-[14px] text-white"
                  data-node-id="50:1493"
                >
                  <p className="leading-[20px]">WhatsApp terrain</p>
                </div>
              </div>
            </div>
            <div
              className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-[260px]"
              data-node-id="50:1494"
              data-name="Newsletter"
            >
              <div
                className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-accent-200 text-[11px] tracking-[0.55px] uppercase whitespace-nowrap"
                data-node-id="50:1495"
              >
                <p className="leading-[16px]">Newsletter</p>
              </div>
              <div
                className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] min-w-full not-italic relative shrink-0 text-brand-100 text-[14px] w-full"
                data-node-id="50:1496"
              >
                <p className="leading-[22px]">{`Recevez les nouveaux chantiers, les bilans d'impact et les appels à parrainage.`}</p>
              </div>
              <div
                className="bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.2)] border-solid content-stretch flex items-center relative rounded-pill shrink-0 w-full btn-md btn"
                data-node-id="50:1497"
                data-name="Email Input"
              >
                <div
                  className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] min-w-px not-italic relative text-brand-100 text-[14px]"
                  data-node-id="50:1498"
                >
                  <p className="leading-[20px]">Votre adresse e-mail</p>
                </div>
              </div>
              <div
                className="bg-accent-200 content-stretch flex flex-col items-center justify-center relative rounded-pill shrink-0 w-full btn-md btn"
                data-node-id="50:1499"
                data-name="Subscribe Button"
              >
                <div
                  className="btn-label [word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-brand-900 text-[14px] text-center"
                  data-node-id="50:1500"
                >
                  <p className="leading-[20px]">{`S'inscrire`}</p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="bg-[rgba(255,255,255,0.15)] h-px relative shrink-0 w-full"
            data-node-id="50:1501"
            data-name="Divider"
          />
          <div
            className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between leading-[0] not-italic relative shrink-0 text-brand-100 text-[13px] w-full whitespace-nowrap"
            data-node-id="50:1502"
            data-name="Bottom"
          >
            <div
              className="flex flex-col justify-center relative shrink-0"
              data-node-id="50:1503"
            >
              <p className="leading-[20px]">{`© 2025 Children's Smile Cameroun. Tous droits réservés.`}</p>
            </div>
            <div
              className="content-stretch flex gap-[24px] items-center relative shrink-0"
              data-node-id="50:1504"
              data-name="Legal Links"
            >
              <div
                className="flex flex-col justify-center relative shrink-0"
                data-node-id="50:1505"
              >
                <p className="leading-[20px]">Mentions légales</p>
              </div>
              <div
                className="flex flex-col justify-center relative shrink-0"
                data-node-id="50:1506"
              >
                <p className="leading-[20px]">Politique de confidentialité</p>
              </div>
              <div
                className="flex flex-col justify-center relative shrink-0"
                data-node-id="50:1507"
              >
                <p className="leading-[20px]">Cookies</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
