import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { Icon } from "../components/Icon"
import { TabBar } from "../components/TabBar"
import { PROJECTS } from "../lib/projects"

const assetPathPrefix = "/assets"
const imgAb6AXuA92XXmwsh8KZfkVqhDTr7SutCi9Zg97Qv2EOhbVbPxfM9XJiu0CeP4Co7F9DeqwFQ71UwfTlEvwu3GIf8H7SsXnPoOElAwWvEFj3VLi0RqWlbQwC9EzkW44AeHoPbrZwhBw5WhkZcjGvj2TGrwFzrbLmkZxlMg5KlAvwWbIboIh8NcpOyhrZ6B8QQCnDgQAuHxVhM8PYrRqmBiKiWtjkBgBwYbYeHrM2QozgRq1F4F6Ho2H6GmA = `${assetPathPrefix}/8894c.png`
const imgAb6AXuDgbXg5EbRgIuJnajOpfZ09UYf8ANitg3TqQZkMrLmMtxukyzTvDfm4R6VdI9NiH2ZlLkzQxdp14MeEnqfT4AbFytdDyw0Omooy8HyUmDQdKlAv7Z22WereOyxniFPMxs60RqsUluioMdPep5WDefpIcUSdWebr34Q6NfwcRpaOalQdPmt7SbZRmPQckkWgEwd0BdYswmPwUaTiXr1Q891DhbRpKqQmg8BAd7TYobtWTW7G = `${assetPathPrefix}/6a646.png`
const imgAb6AXuDzu7T1AwKtuDFmP5J1QMafTq4DcyDWjVixPg5XkUyAi0XNFnkFxlqwAkvbFg8O3R6Q0StVUbWxw6S4Ri2OApHszL7BkllA3Kb3GVkgWQcbNt6NY89UNcYi06Ih3Ky5Kp3HzFNnBZvLwp0FpWazOMoAlxh6ITVnMEzeC4TpjhkhsHiFyShseIjiCJnBxNwhLqAqdIsbiw08GHKuoMiUulBxdHoCfHQePuY52EcbbmeQdJstn9Q = `${assetPathPrefix}/70a8f.png`
const imgAb6AXuBvUvW31MCd9OVmQanZsJk3UB1Jq4UYleR1CHYn4UxNixv346CHkdzjdqpY0LjZhBxAk8T4Mj3Q4X8UQmU6Y37E6QcnLoWw2RRyKexHzMsEhZLb3GRnmRpN4Y3Nm51BrXSmrF08WoOgHtgTkLcXXMaGb7MFMhyGDzEhQwQlc63Y0N9SGfXjdDfh2HrdYcLtHg77JyxhgWiHDqouTUgJcPcyKmVPs4KZnm5NLuhL0WhUtkNp6AuQ = `${assetPathPrefix}/07a06.png`
const imgAb6AXuDzqoLzpTqt6Ps1EfCb4TqfoNs6RJeVnVbhA98LaQ5NIj11FhbDl8FxgKkBwRbRmk8IvvS7BgSeZyaUivZ3N3Wo61PjbPttIn1Lp211XGlKUlab21E1AeeQxXqe5TnsysNeKKe69FN3KsX4Gt5QSOfUqOLieNmYsAgMzQf88Rrm6YRg4TXvX7IcsOu8WZdmqdiShNmKIcmG1ToHkovQRqDCmq3M8KyQdOlF7A0QEi1UViN8Epyw = `${assetPathPrefix}/7ce9b.png`
const imgAb6AXuDTheAj1Znd44VupYyScgyknksVqgeDZhAahT1PMq9ATulGVwxMsrEdrVDbwLFqnJpYiYisWx3C1K1KxmnTnGmepU5T0EbQrfWgf5ZqWcRlDoySi8Mzr3YR1D99K0DnIxGt8If65VuQfcokSUxLSjZu042IrMcqym0PbKgQbrn2CaWkEi8FriK6QexE94FNdHzth8AdbaP7MCe3DnFSt3WzJkHdi1JlD0ApBIsxTc5UHgXl1Yw = `${assetPathPrefix}/e0d6c.png`
const imgProfile = `${assetPathPrefix}/1fe61.png`
const imgContainer = `${assetPathPrefix}/ff01e.svg`
const imgContainer1 = `${assetPathPrefix}/fe6ed.svg`
const imgContainer2 = `${assetPathPrefix}/577c1.svg`
const imgContainer3 = `${assetPathPrefix}/eb619.svg`
const imgContainer4 = `${assetPathPrefix}/99d0c.svg`
const imgContainer5 = `${assetPathPrefix}/5eef3.svg`
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
  { value: "all", label: "Tous les projets", icon: <Icon name="pillars" size={14} /> },
  {
    value: "school",
    label: "Écoles & Salles de classe",
    icon: <Icon name="graduationCap" size={14} />,
  },
  { value: "water", label: "Eau potable & WASH", icon: <Icon name="droplet" size={14} /> },
  {
    value: "books",
    label: "Bibliothèques & Livres",
    icon: <Icon name="bookOpen" size={14} />,
  },
  { value: "health", label: "Santé & Secours", icon: <Icon name="heartPulse" size={14} /> },
] as const

/** Catégories (onglets) et région de chaque carte projet, dans l'ordre de la grille. */
const PROJECT_CARDS: Record<
  string,
  { categories: readonly string[]; region: string }
> = {
  "5:3299": { categories: ["school"], region: "Est" },
  "5:3339": { categories: ["water"], region: "Extrême-Nord" },
  "5:3382": { categories: ["books"], region: "Littoral" },
  "5:3423": { categories: ["health"], region: "Centre" },
  "5:3464": { categories: ["school"], region: "Ouest" },
  "5:3505": { categories: ["school"], region: "Est" },
}

const PROJECT_REGIONS = [
  "all",
  ...Array.from(new Set(Object.values(PROJECT_CARDS).map((card) => card.region))),
] as const

export default function NosProjetsChildrensSmileCameroun() {
  const [projectFilter, setProjectFilter] = useState("all")
  const [regionFilter, setRegionFilter] = useState("all")

  const projectRegionCounts = useMemo(() => {
    const counts: Record<string, number> = { all: 0 }
    for (const card of Object.values(PROJECT_CARDS)) {
      counts.all += 1
      counts[card.region] = (counts[card.region] ?? 0) + 1
    }
    return counts
  }, [])

  const visibleProjectCount = useMemo(
    () =>
      Object.values(PROJECT_CARDS).filter(
        (card) =>
          (projectFilter === "all" || card.categories.includes(projectFilter)) &&
          (regionFilter === "all" || card.region === regionFilter),
      ).length,
    [projectFilter, regionFilter],
  )

  /** Maps each grid row to the project node ids it contains, so empty rows can collapse. */
  const projectRows = useMemo(
    () => [
      ["5:3299", "5:3339", "5:3382"],
      ["5:3423", "5:3464", "5:3505"],
    ],
    [],
  )

  const hiddenProjects = useMemo(() => {
    const hidden = new Set<string>()
    for (const [id, card] of Object.entries(PROJECT_CARDS)) {
      const categoryMatch = projectFilter === "all" || card.categories.includes(projectFilter)
      const regionMatch = regionFilter === "all" || card.region === regionFilter
      if (!categoryMatch || !regionMatch) hidden.add(id)
    }
    return hidden
  }, [projectFilter, regionFilter])

  const hiddenProjectRows = useMemo(
    () =>
      new Set(
        projectRows
          .filter((row) => row.every((id) => hiddenProjects.has(id)))
          .map((row) => row[0]),
      ),
    [projectRows, hiddenProjects],
  )

  const selectProjectFilter = (filter: string) => {
    setProjectFilter(filter)
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
                        <p className="leading-[56px] mb-0">{`Nos Chantiers & Projets`}</p>
                        <p className="leading-[56px] mb-0">
                          Scolaires À Travers le
                        </p>
                        <p className="leading-[56px]">Cameroun</p>
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
                <div
                  className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full"
                  data-node-id="50:1146"
                  data-name="Row 1"
                  style={{ display: hiddenProjectRows.has("5:3299") ? "none" : undefined }}
                >
                  <div
                    className="bg-white content-stretch flex flex-[1_0_0] flex-col isolate items-start min-w-px overflow-clip relative rounded-card shadow-raised"
                    data-project-category="school"
                    data-project-region="Est"
                    data-node-id="5:3299"
                    style={{ display: hiddenProjects.has("5:3299") ? "none" : undefined }}
                    data-name="Article - Projet 1: Réalis"
                  >
                    <div
                      className="bg-surface-tint content-stretch flex flex-col h-[224px] items-start justify-center overflow-clip relative shrink-0 w-full z-[2]"
                      data-node-id="5:3300"
                      data-name="Background"
                    >
                      <div
                        className="flex-[1_0_0] min-h-px relative w-full"
                        data-node-id="5:3301"
                        data-name="AB6AXuA92xXMWSH8KZfkVqhDTr7sutCI9Zg97Qv2eOhbVbPxfM9xJiu0ceP4CO7F9DEQW_fQ71UWFTlEvwu3gIf8H7SsXNPo-OElAwWvEFj3VLi0rqWlbQwC9EzkW44AEHoPbrZwhBW5WHKZcjGVJ2tGRWFzrbLmkZXLMg5KlAVWWb_iboIh8NCP_OyhrZ6B8qQCnDgQAu_HXVhM8PYrRqmBiKiWTJKBgBwYbYEHrM2QozgRq1F4F6ho2h6gmA"
                      >
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                          <img
                            alt=""
                            className="absolute h-full left-[-5.05%] max-w-none top-0 w-[110.11%]"
                            src={
                              imgAb6AXuA92XXmwsh8KZfkVqhDTr7SutCi9Zg97Qv2EOhbVbPxfM9XJiu0CeP4Co7F9DeqwFQ71UwfTlEvwu3GIf8H7SsXnPoOElAwWvEFj3VLi0RqWlbQwC9EzkW44AeHoPbrZwhBw5WhkZcjGvj2TGrwFzrbLmkZxlMg5KlAvwWbIboIh8NcpOyhrZ6B8QQCnDgQAuHxVhM8PYrRqmBiKiWtjkBgBwYbYeHrM2QozgRq1F4F6Ho2H6GmA
                            }
                          />
                        </div>
                      </div>
                      <div
                        className="absolute bg-accent-300 content-stretch drop-shadow-card flex gap-[6px] items-center left-[12px] px-[12px] py-[4px] rounded-pill top-[14px]"
                        data-node-id="5:3302"
                        data-name="Background+Shadow"
                      >
                        <div
                          className="bg-accent-700 relative rounded-pill shrink-0 size-[8px]"
                          data-node-id="5:3303"
                          data-name="Background"
                        />
                        <div
                          className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#007230] text-[11px] whitespace-nowrap"
                          data-node-id="5:3304"
                        >
                          <p className="leading-[16px]">{`Réalisé & Livré`}</p>
                        </div>
                      </div>
                      <div
                        className="absolute backdrop-blur-[2px] bg-[rgba(40,48,68,0.85)] bottom-[12px] content-stretch flex gap-[3.99px] items-center px-[10px] py-[4px] right-[12px] rounded-pill"
                        data-node-id="5:3305"
                        data-name="Overlay+OverlayBlur"
                      >
                        <div
                          className="h-[11.667px] relative shrink-0 w-[9.333px]"
                          data-node-id="5:3306"
                          data-name="Container"
                        >
                          <img
                            alt=""
                            className="absolute block inset-0 max-w-none size-full"
                            src={imgContainer2}
                          />
                        </div>
                        <div
                          className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-050 text-[11px] whitespace-nowrap"
                          data-node-id="5:3308"
                        >
                          <p className="leading-[16px]">Dimako • Est</p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex flex-col items-start justify-between p-[24px] relative shrink-0 w-full z-[1]"
                      data-node-id="5:3309"
                      data-name="Container"
                    >
                      <div
                        className="content-stretch flex flex-col gap-[7.4px] items-start relative shrink-0 w-full"
                        data-node-id="5:3310"
                        data-name="Container"
                      >
                        <div
                          className="content-stretch flex items-center relative shrink-0 w-full"
                          data-node-id="5:3311"
                          data-name="Container"
                        >
                          <div
                            className="bg-brand-100 content-stretch flex flex-col items-start px-[10px] py-[2px] relative rounded-pill shrink-0"
                            data-node-id="5:3312"
                            data-name="Background"
                          >
                            <div
                              className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-800 text-[11px] tracking-[0.55px] uppercase whitespace-nowrap"
                              data-node-id="5:3313"
                            >
                              <p className="leading-[16px]">{`ÉCOLES & SALLES DE CLASSE`}</p>
                            </div>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                          data-node-id="5:3314"
                          data-name="Heading 3"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center relative shrink-0 text-ink-900 text-h4 w-full"
                            data-node-id="5:3315"
                          >
                            <p className="text-balance">{`Réhabilitation de l'école primaire publique de Dimako`}</p>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex flex-col items-start overflow-clip pt-[0.6px] relative shrink-0 w-full"
                          data-node-id="5:3316"
                          data-name="Container"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center not-italic relative shrink-0 text-ink-700 text-body w-full"
                            data-node-id="5:3317"
                          >
                            <p className="text-pretty">{`Réfection complète de 3 salles de classe endommagées, remplacement total de la toiture avec étanchéité renforcée, et livraison de 120...`}</p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="content-stretch flex flex-col items-start pt-[24px] relative shrink-0 w-full"
                        data-node-id="5:3318"
                        data-name="Margin"
                      >
                        <div
                          className="bg-surface-muted content-stretch flex flex-col gap-[4px] items-start pb-[14px] pt-[16px] px-[14px] relative rounded-control shrink-0 w-full"
                          data-node-id="5:3319"
                          data-name="Background"
                        >
                          <div className="flex flex-col gap-[2px] items-start w-full"><p className="font-['Inter:Bold'] font-bold leading-[22px] text-accent-700 text-h4">{`340 élèves réintégrés`}</p><p className="font-['Inter:Regular'] font-normal leading-[18px] text-ink-700 text-small">Impact constaté</p></div>
                          <div
                            className="bg-surface-tint content-stretch flex flex-col h-[8px] items-start justify-center overflow-clip relative rounded-pill shrink-0 w-full"
                            data-node-id="5:3327"
                            data-name="Background"
                          >
                            <div
                              className="bg-accent-700 flex-[1_0_0] min-h-px relative rounded-pill w-full"
                              data-node-id="5:3328"
                              data-name="Background"
                            />
                          </div>
                          <div
                            className="content-stretch flex flex-col items-end relative shrink-0 w-full"
                            data-node-id="5:3329"
                            data-name="Container"
                          >
                            <div
                              className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-ink-500 text-[11px] text-right whitespace-nowrap"
                              data-node-id="5:3330"
                            >
                              <p className="leading-[16px]">100% Réalisé</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="content-stretch flex flex-col items-start pt-[20px] relative shrink-0 w-full"
                        data-node-id="5:3331"
                        data-name="Margin"
                      >
                        <div
                          className="content-stretch flex items-center justify-between pt-[8px] relative shrink-0 w-full"
                          data-node-id="5:3332"
                          data-name="Container"
                        >
                          <div
                            className="content-stretch flex gap-[4px] items-center relative shrink-0"
                            data-node-id="5:3333"
                            data-name="Button"
                          >
                                                        <div className="flex flex-wrap gap-[8px] items-center justify-between pt-[8px] w-full">
                              <Link className="btn btn-card btn-secondary" to={`/nos-projets/rehabilitation-ecole-dimako`}>
                                <span className="btn-label">{`Fiche détaillée & Bilan`}</span>
                              </Link>
                              <Link className="btn btn-card btn-warn" to="/don">
                                <span className="btn-label">{`Voir le rapport photo`}</span>
                              </Link>
                            </div>
                            <div
                              className="relative shrink-0 size-[12px]"
                              data-node-id="5:3335"
                              data-name="Container"
                            >
                              <img
                                alt=""
                                className="absolute block inset-0 max-w-none size-full"
                                src={imgContainer4}
                              />
                            </div>
                          </div>
                          <div
                            className="relative shrink-0 size-[18.333px]"
                            data-node-id="5:3337"
                            data-name="Container"
                          >
                            <img
                              alt=""
                              className="absolute block inset-0 max-w-none size-full"
                              src={imgContainer5}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="bg-white content-stretch flex flex-[1_0_0] flex-col isolate items-start min-w-px overflow-clip relative rounded-card shadow-raised"
                    data-project-category="water"
                    data-project-region="Extrême-Nord"
                    data-node-id="5:3339"
                    style={{ display: hiddenProjects.has("5:3339") ? "none" : undefined }}
                    data-name="Article - Projet 2: En cours (75%)"
                  >
                    <div
                      className="bg-surface-tint content-stretch flex flex-col h-[224px] items-start justify-center overflow-clip relative shrink-0 w-full z-[2]"
                      data-node-id="5:3340"
                      data-name="Background"
                    >
                      <div
                        className="flex-[1_0_0] min-h-px relative w-full"
                        data-node-id="5:3341"
                        data-name="AB6AXuDgbXG5EbRGIu_jnajOpfZ09uYf-8aNitg3tqQZkMrLMMtxukyzTvDFM4r6vdI9niH2ZLLkzQXDP14meEnqfT4_ABFytdDYW0Omooy8hy-umDQdKlAv7z22WereOyxniF_PMxs60_RqsULUIOMdPep5WDefpIcUSdWEBR34q6NFWCRpaOalQdPMT7SbZRmPQckkWgEWD0bdYswmPWUaTiXR1Q891Dhb_RpKQQmg8BAd7tYobt-wT_w7_g"
                      >
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                          <img
                            alt=""
                            className="absolute h-full left-[-5.05%] max-w-none top-0 w-[110.11%]"
                            src={
                              imgAb6AXuDgbXg5EbRgIuJnajOpfZ09UYf8ANitg3TqQZkMrLmMtxukyzTvDfm4R6VdI9NiH2ZlLkzQxdp14MeEnqfT4AbFytdDyw0Omooy8HyUmDQdKlAv7Z22WereOyxniFPMxs60RqsUluioMdPep5WDefpIcUSdWebr34Q6NfwcRpaOalQdPmt7SbZRmPQckkWgEwd0BdYswmPwUaTiXr1Q891DhbRpKqQmg8BAd7TYobtWTW7G
                            }
                          />
                        </div>
                      </div>
                      <div
                        className="absolute bg-warn-100 content-stretch drop-shadow-card flex gap-[6px] items-center left-[12px] px-[12px] py-[4px] rounded-pill top-[14px]"
                        data-node-id="5:3342"
                        data-name="Background+Shadow"
                      >
                        <div
                          className="bg-warn-900 relative rounded-pill shrink-0 size-[8px]"
                          data-node-id="5:3343"
                          data-name="Background"
                        />
                        <div
                          className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#370e00] text-[11px] whitespace-nowrap"
                          data-node-id="5:3344"
                        >
                          <p className="leading-[16px]">En cours • 75%</p>
                        </div>
                      </div>
                      <div
                        className="absolute backdrop-blur-[2px] bg-[rgba(40,48,68,0.85)] bottom-[12px] content-stretch flex gap-[4px] items-center px-[10px] py-[4px] right-[12.01px] rounded-pill"
                        data-node-id="5:3345"
                        data-name="Overlay+OverlayBlur"
                      >
                        <div
                          className="h-[11.667px] relative shrink-0 w-[9.333px]"
                          data-node-id="5:3346"
                          data-name="Container"
                        >
                          <img
                            alt=""
                            className="absolute block inset-0 max-w-none size-full"
                            src={imgContainer2}
                          />
                        </div>
                        <div
                          className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-050 text-[11px] whitespace-nowrap"
                          data-node-id="5:3348"
                        >
                          <p className="leading-[16px]">Mora • Extrême-Nord</p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex flex-col items-start justify-between p-[24px] relative shrink-0 w-full z-[1]"
                      data-node-id="5:3349"
                      data-name="Container"
                    >
                      <div
                        className="content-stretch flex flex-col gap-[7.4px] items-start relative shrink-0 w-full"
                        data-node-id="5:3350"
                        data-name="Container"
                      >
                        <div
                          className="content-stretch flex items-center relative shrink-0 w-full"
                          data-node-id="5:3351"
                          data-name="Container"
                        >
                          <div
                            className="bg-brand-200 content-stretch flex flex-col items-start px-[10px] py-[2px] relative rounded-pill shrink-0"
                            data-node-id="5:3352"
                            data-name="Background"
                          >
                            <div
                              className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-ink-700 text-[11px] tracking-[0.55px] uppercase whitespace-nowrap"
                              data-node-id="5:3353"
                            >
                              <p className="leading-[16px]">{`EAU POTABLE & WASH`}</p>
                            </div>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                          data-node-id="5:3354"
                          data-name="Heading 3"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center relative shrink-0 text-ink-900 text-h4 w-full"
                            data-node-id="5:3355"
                          >
                            <p className="text-balance">{`Forage d'eau potable et bloc sanitaire sécurisé à Mora`}</p>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex flex-col items-start overflow-clip pt-[0.6px] relative shrink-0 w-full"
                          data-node-id="5:3356"
                          data-name="Container"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center not-italic relative shrink-0 text-ink-700 text-body w-full"
                            data-node-id="5:3357"
                          >
                            <p className="text-pretty">{`Création d'un point d'adduction d'eau à 65 mètres de profondeur et construction de latrines écologiques séparées filles/garçons pour...`}</p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="content-stretch flex flex-col items-start pt-[24px] relative shrink-0 w-full"
                        data-node-id="5:3358"
                        data-name="Margin"
                      >
                        <div
                          className="bg-surface-muted content-stretch flex flex-col gap-[4px] items-start pb-[14px] pt-[16px] px-[14px] relative rounded-control shrink-0 w-full"
                          data-node-id="5:3359"
                          data-name="Background"
                        >
                          <div className="flex flex-col gap-[2px] items-start w-full"><p className="font-['Inter:Bold'] font-bold leading-[22px] text-accent-700 text-h4">{`800 écoliers`}</p><p className="font-['Inter:Regular'] font-normal leading-[18px] text-ink-700 text-small">Bénéficiaires directs</p></div>
                          <div
                            className="bg-surface-tint h-[10px] overflow-clip relative rounded-pill shrink-0 w-full"
                            data-node-id="5:3367"
                            data-name="Background"
                          >
                            <div
                              className="absolute bg-warn-700 inset-[0_25.01%_0_0] rounded-pill"
                              data-node-id="5:3368"
                              data-name="Background"
                            />
                          </div>
                          <div
                            className="content-stretch flex items-start justify-between relative shrink-0 w-full"
                            data-node-id="5:3369"
                            data-name="Container"
                          >
                            <div
                              className="content-stretch flex flex-col items-start relative self-stretch shrink-0"
                              data-node-id="5:3370"
                              data-name="Container"
                            >
                              <div
                                className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-ink-700 text-[11px] whitespace-nowrap"
                                data-node-id="5:3371"
                              >
                                <p className="leading-[16px]">
                                  Pompe installée
                                </p>
                              </div>
                            </div>
                            <div
                              className="content-stretch flex flex-col items-start relative self-stretch shrink-0"
                              data-node-id="5:3372"
                              data-name="Container"
                            >
                              <div
                                className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-warn-900 text-[11px] whitespace-nowrap"
                                data-node-id="5:3373"
                              >
                                <p className="leading-[16px]">{`75% financé & réalisé`}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="content-stretch flex flex-col items-start pt-[20px] relative shrink-0 w-full"
                        data-node-id="5:3374"
                        data-name="Margin"
                      >
                      <div
                        className="flex flex-wrap gap-[8px] items-center justify-between pt-[8px] w-full"
                        data-node-id="5:3375"
                        data-name="Container"
                      >
                        <Link
                          className="btn btn-card btn-secondary"
                          data-node-id="5:3376"
                          to={`/nos-projets/${PROJECTS[1].slug}`}
                        >
                          <span className="btn-label">{`Consulter le chantier`}</span>
                        </Link>
                        <Link
                          className="btn btn-card btn-warn"
                          data-node-id="5:3378"
                          to="/don"
                        >
                          <span className="btn-label">{`Finaliser ce projet`}</span>
                          <Icon name="arrowRight" className="btn-icon" />
                        </Link>
                      </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="bg-white content-stretch flex flex-[1_0_0] flex-col isolate items-start min-w-px overflow-clip relative rounded-card shadow-raised"
                    data-project-category="books"
                    data-project-region="Littoral"
                    data-node-id="5:3382"
                    style={{ display: hiddenProjects.has("5:3382") ? "none" : undefined }}
                    data-name="Article - Projet 3: En cours (40%)"
                  >
                    <div
                      className="bg-surface-tint content-stretch flex flex-col h-[224px] items-start justify-center overflow-clip relative shrink-0 w-full z-[2]"
                      data-node-id="5:3383"
                      data-name="Background"
                    >
                      <div
                        className="flex-[1_0_0] min-h-px relative w-full"
                        data-node-id="5:3384"
                        data-name="AB6AXuDZU7T1AWKtuDFmP5j1qMAFTq4DcyDWjVIXPg5XkUYAi0xNFnkFXLQWAkvbFG8o3R-6q0StVUbWxw6s4RI2OApHszL7BkllA3Kb3GVkgWQcbNT6nY89UNcYi06ih3KY5kp3HzFNnBZvLwp0fpWazOMoALXH6iTVnMEze_C4tpjhkhsHi-fySHSEIjiCJnBxNwhLqAQD-Isbiw08gHKuoMI_uulBxd-hoCF-hQEPuY52EcbbmeQdJSTN9Q"
                      >
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                          <img
                            alt=""
                            className="absolute h-full left-[-5.05%] max-w-none top-0 w-[110.11%]"
                            src={
                              imgAb6AXuDzu7T1AwKtuDFmP5J1QMafTq4DcyDWjVixPg5XkUyAi0XNFnkFxlqwAkvbFg8O3R6Q0StVUbWxw6S4Ri2OApHszL7BkllA3Kb3GVkgWQcbNt6NY89UNcYi06Ih3Ky5Kp3HzFNnBZvLwp0FpWazOMoAlxh6ITVnMEzeC4TpjhkhsHiFyShseIjiCJnBxNwhLqAqdIsbiw08GHKuoMiUulBxdHoCfHQePuY52EcbbmeQdJstn9Q
                            }
                          />
                        </div>
                      </div>
                      <div
                        className="absolute bg-warn-100 content-stretch drop-shadow-card flex gap-[6px] items-center left-[12px] px-[12px] py-[4px] rounded-pill top-[14px]"
                        data-node-id="5:3385"
                        data-name="Background+Shadow"
                      >
                        <div
                          className="bg-warn-900 relative rounded-pill shrink-0 size-[8px]"
                          data-node-id="5:3386"
                          data-name="Background"
                        />
                        <div
                          className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#370e00] text-[11px] whitespace-nowrap"
                          data-node-id="5:3387"
                        >
                          <p className="leading-[16px]">En cours • 40%</p>
                        </div>
                      </div>
                      <div
                        className="absolute backdrop-blur-[2px] bg-[rgba(40,48,68,0.85)] bottom-[12px] content-stretch flex gap-[4px] items-center px-[10px] py-[4px] right-[11.99px] rounded-pill"
                        data-node-id="5:3388"
                        data-name="Overlay+OverlayBlur"
                      >
                        <div
                          className="h-[11.667px] relative shrink-0 w-[9.333px]"
                          data-node-id="5:3389"
                          data-name="Container"
                        >
                          <img
                            alt=""
                            className="absolute block inset-0 max-w-none size-full"
                            src={imgContainer2}
                          />
                        </div>
                        <div
                          className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-050 text-[11px] whitespace-nowrap"
                          data-node-id="5:3391"
                        >
                          <p className="leading-[16px]">Penja • Littoral</p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex flex-col items-start justify-between p-[24px] relative shrink-0 w-full z-[1]"
                      data-node-id="5:3392"
                      data-name="Container"
                    >
                      <div
                        className="content-stretch flex flex-col gap-[7.4px] items-start relative shrink-0 w-full"
                        data-node-id="5:3393"
                        data-name="Container"
                      >
                        <div
                          className="content-stretch flex items-center relative shrink-0 w-full"
                          data-node-id="5:3394"
                          data-name="Container"
                        >
                          <div
                            className="bg-brand-100 content-stretch flex flex-col items-start px-[10px] py-[2px] relative rounded-pill shrink-0"
                            data-node-id="5:3395"
                            data-name="Background"
                          >
                            <div
                              className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-800 text-[11px] tracking-[0.55px] uppercase whitespace-nowrap"
                              data-node-id="5:3396"
                            >
                              <p className="leading-[16px]">{`BIBLIOTHÈQUES & LIVRES`}</p>
                            </div>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                          data-node-id="5:3397"
                          data-name="Heading 3"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center relative shrink-0 text-ink-900 text-h4 w-full"
                            data-node-id="5:3398"
                          >
                            <p className="text-balance">{`Bibliothèque rurale et malle aux livres de Penja`}</p>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex flex-col items-start overflow-clip pt-[0.6px] relative shrink-0 w-full"
                          data-node-id="5:3399"
                          data-name="Container"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center not-italic relative shrink-0 text-ink-700 text-body w-full"
                            data-node-id="5:3400"
                          >
                            <p className="text-pretty">{`Acquisition et aménagement d'un fonds documentaire de 1 200 livres jeunesse francophones et anglophones, caisses mobiles...`}</p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="content-stretch flex flex-col items-start pt-[24px] relative shrink-0 w-full"
                        data-node-id="5:3401"
                        data-name="Margin"
                      >
                        <div
                          className="bg-surface-muted content-stretch flex flex-col gap-[4px] items-start pb-[14px] pt-[16px] px-[14px] relative rounded-control shrink-0 w-full"
                          data-node-id="5:3402"
                          data-name="Background"
                        >
                          <div className="flex flex-col gap-[2px] items-start w-full"><p className="font-['Inter:Bold'] font-bold leading-[22px] text-accent-700 text-h4">{`1 200 livres`}</p><p className="font-['Inter:Regular'] font-normal leading-[18px] text-ink-700 text-small">Ouvrages ciblés</p></div>
                          <div
                            className="bg-surface-tint h-[10px] overflow-clip relative rounded-pill shrink-0 w-full"
                            data-node-id="5:3410"
                            data-name="Background"
                          >
                            <div
                              className="absolute bg-brand-700 inset-[0_60%_0_0] rounded-pill"
                              data-node-id="5:3411"
                              data-name="Background"
                            />
                          </div>
                          <div
                            className="content-stretch flex items-start justify-between relative shrink-0 w-full"
                            data-node-id="5:3412"
                            data-name="Container"
                          >
                            <div
                              className="content-stretch flex flex-col items-start relative self-stretch shrink-0"
                              data-node-id="5:3413"
                              data-name="Container"
                            >
                              <div
                                className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-ink-700 text-[11px] whitespace-nowrap"
                                data-node-id="5:3414"
                              >
                                <p className="leading-[16px]">
                                  Mobilier fabriqué
                                </p>
                              </div>
                            </div>
                            <div
                              className="content-stretch flex flex-col items-start relative self-stretch shrink-0"
                              data-node-id="5:3415"
                              data-name="Container"
                            >
                              <div
                                className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-900 text-[11px] whitespace-nowrap"
                                data-node-id="5:3416"
                              >
                                <p className="leading-[16px]">{`40% d'avancement`}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="content-stretch flex flex-col items-start pt-[20px] relative shrink-0 w-full"
                        data-node-id="5:3417"
                        data-name="Margin"
                      >
                                                <div className="flex flex-wrap gap-[8px] items-center justify-between pt-[8px] w-full">
                          <Link className="btn btn-card btn-secondary" to={`/nos-projets/forage-mora-wash`}>
                            <span className="btn-label">{`Détails du fonds`}</span>
                          </Link>
                          <Link className="btn btn-card btn-warn" to="/don">
                            <span className="btn-label">{`Parrainer`}</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full"
                  data-node-id="50:1147"
                  data-name="Row 2"
                  style={{ display: hiddenProjectRows.has("5:3423") ? "none" : undefined }}
                >
                  <div
                    className="bg-white content-stretch flex flex-[1_0_0] flex-col isolate items-start min-w-px overflow-clip relative rounded-card shadow-raised"
                    data-project-category="health"
                    data-project-region="Centre"
                    data-node-id="5:3423"
                    style={{ display: hiddenProjects.has("5:3423") ? "none" : undefined }}
                    data-name="Article - Projet 4: En préparation"
                  >
                    <div
                      className="bg-surface-tint content-stretch flex flex-col h-[224px] items-start justify-center overflow-clip relative shrink-0 w-full z-[2]"
                      data-node-id="5:3424"
                      data-name="Background"
                    >
                      <div
                        className="flex-[1_0_0] min-h-px relative w-full"
                        data-node-id="5:3425"
                        data-name="AB6AXuBVUvW31MCd9o-vmQanZsJk3uB1Jq4UYleR1cHYn4UxNixv346cHkdzjdqpY0Lj_ZhBxAK8t4Mj3q4x8UQmU6Y37e6qcnLoWW2rRyKEXHzMSEhZLb3gRnmRpN4Y3nm51BrXSmr_F08WoOgHtgTKLc-xXMaGB7mFMhyGDzEhQwQLC6-3y0n9sGfXJDDfh2HrdYcLtHG77JyxhgWiHDqouTUgJcPcyKmVPs4kZnm5N-luhL0whUTKNp6auQ"
                      >
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                          <img
                            alt=""
                            className="absolute h-full left-[-5.05%] max-w-none top-0 w-[110.11%]"
                            src={
                              imgAb6AXuBvUvW31MCd9OVmQanZsJk3UB1Jq4UYleR1CHYn4UxNixv346CHkdzjdqpY0LjZhBxAk8T4Mj3Q4X8UQmU6Y37E6QcnLoWw2RRyKexHzMsEhZLb3GRnmRpN4Y3Nm51BrXSmrF08WoOgHtgTkLcXXMaGb7MFMhyGDzEhQwQlc63Y0N9SGfXjdDfh2HrdYcLtHg77JyxhgWiHDqouTUgJcPcyKmVPs4KZnm5NLuhL0WhUtkNp6AuQ
                            }
                          />
                        </div>
                      </div>
                      <div
                        className="absolute bg-brand-100 content-stretch drop-shadow-card flex gap-[6px] items-center left-[12px] px-[12px] py-[4px] rounded-pill top-[14px]"
                        data-node-id="5:3426"
                        data-name="Background+Shadow"
                      >
                        <div
                          className="bg-brand-900 relative rounded-pill shrink-0 size-[8px]"
                          data-node-id="5:3427"
                          data-name="Background"
                        />
                        <div
                          className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-800 text-[11px] whitespace-nowrap"
                          data-node-id="5:3428"
                        >
                          <p className="leading-[16px]">
                            En préparation • T2 2025
                          </p>
                        </div>
                      </div>
                      <div
                        className="absolute backdrop-blur-[2px] bg-[rgba(40,48,68,0.85)] bottom-[12px] content-stretch flex gap-[3.99px] items-center px-[10px] py-[4px] right-[12px] rounded-pill"
                        data-node-id="5:3429"
                        data-name="Overlay+OverlayBlur"
                      >
                        <div
                          className="h-[11.667px] relative shrink-0 w-[9.333px]"
                          data-node-id="5:3430"
                          data-name="Container"
                        >
                          <img
                            alt=""
                            className="absolute block inset-0 max-w-none size-full"
                            src={imgContainer2}
                          />
                        </div>
                        <div
                          className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-050 text-[11px] whitespace-nowrap"
                          data-node-id="5:3432"
                        >
                          <p className="leading-[16px]">
                            Ngambé-Tikar • Centre
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex flex-col items-start justify-between p-[24px] relative shrink-0 w-full z-[1]"
                      data-node-id="5:3433"
                      data-name="Container"
                    >
                      <div
                        className="content-stretch flex flex-col gap-[7.4px] items-start relative shrink-0 w-full"
                        data-node-id="5:3434"
                        data-name="Container"
                      >
                        <div
                          className="content-stretch flex items-center relative shrink-0 w-full"
                          data-node-id="5:3435"
                          data-name="Container"
                        >
                          <div
                            className="bg-[#ffdad6] content-stretch flex flex-col items-start px-[10px] py-[2px] relative rounded-pill shrink-0"
                            data-node-id="5:3436"
                            data-name="Background"
                          >
                            <div
                              className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#93000a] text-[11px] tracking-[0.55px] uppercase whitespace-nowrap"
                              data-node-id="5:3437"
                            >
                              <p className="leading-[16px]">{`SANTÉ & SECOURS`}</p>
                            </div>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                          data-node-id="5:3438"
                          data-name="Heading 3"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center relative shrink-0 text-ink-900 text-h4 w-full"
                            data-node-id="5:3439"
                          >
                            <p className="text-balance">{`Équipement didactique et kits secourisme à Ngambé-Tikar`}</p>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex flex-col items-start overflow-clip pt-[0.6px] relative shrink-0 w-full"
                          data-node-id="5:3440"
                          data-name="Container"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center not-italic relative shrink-0 text-ink-700 text-body w-full"
                            data-node-id="5:3441"
                          >
                            <p className="text-pretty">{`Dotation en armoires à pharmacie d'urgence, déparasitage annuel et mallettes de premier secours pour 6 écoles primaires de brousse...`}</p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="content-stretch flex flex-col items-start pt-[24px] relative shrink-0 w-full"
                        data-node-id="5:3442"
                        data-name="Margin"
                      >
                        <div
                          className="bg-surface-muted content-stretch flex flex-col gap-[4px] items-start pb-[14px] pt-[16px] px-[14px] relative rounded-control shrink-0 w-full"
                          data-node-id="5:3443"
                          data-name="Background"
                        >
                          <div className="flex flex-col gap-[2px] items-start w-full"><p className="font-['Inter:Bold'] font-bold leading-[22px] text-accent-700 text-h4">{`6 écoles / 920 enfants`}</p><p className="font-['Inter:Regular'] font-normal leading-[18px] text-ink-700 text-small">Couverture planifiée</p></div>
                          <div
                            className="bg-surface-tint h-[10px] overflow-clip relative rounded-pill shrink-0 w-full"
                            data-node-id="5:3451"
                            data-name="Background"
                          >
                            <div
                              className="absolute bg-brand-900 inset-[0_85%_0_0] rounded-pill"
                              data-node-id="5:3452"
                              data-name="Background"
                            />
                          </div>
                          <div
                            className="content-stretch flex items-start justify-between pr-[0.01px] relative shrink-0 w-full"
                            data-node-id="5:3453"
                            data-name="Container"
                          >
                            <div
                              className="content-stretch flex flex-col items-start relative self-stretch shrink-0"
                              data-node-id="5:3454"
                              data-name="Container"
                            >
                              <div
                                className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-ink-700 text-[11px] whitespace-nowrap"
                                data-node-id="5:3455"
                              >
                                <p className="leading-[16px]">{`Phase d'achat groupé`}</p>
                              </div>
                            </div>
                            <div
                              className="content-stretch flex flex-col items-start relative self-stretch shrink-0"
                              data-node-id="5:3456"
                              data-name="Container"
                            >
                              <div
                                className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-900 text-[11px] whitespace-nowrap"
                                data-node-id="5:3457"
                              >
                                <p className="leading-[16px]">
                                  Budget à boucler
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="content-stretch flex flex-col items-start pt-[20px] relative shrink-0 w-full"
                        data-node-id="5:3458"
                        data-name="Margin"
                      >
                                                <div className="flex flex-wrap gap-[8px] items-center justify-between pt-[8px] w-full">
                          <Link className="btn btn-card btn-secondary" to={`/nos-projets/bibliotheque-penja`}>
                            <span className="btn-label">{`Consulter l'inventaire`}</span>
                          </Link>
                          <Link className="btn btn-card btn-warn" to="/don">
                            <span className="btn-label">{`Soutenir ce lot`}</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="bg-white content-stretch flex flex-[1_0_0] flex-col isolate items-start min-w-px overflow-clip relative rounded-card shadow-raised"
                    data-project-category="school"
                    data-project-region="Ouest"
                    data-node-id="5:3464"
                    style={{ display: hiddenProjects.has("5:3464") ? "none" : undefined }}
                    data-name="Article - Projet 5: En préparation"
                  >
                    <div
                      className="bg-surface-tint content-stretch flex flex-col h-[224px] items-start justify-center overflow-clip relative shrink-0 w-full z-[2]"
                      data-node-id="5:3465"
                      data-name="Background"
                    >
                      <div
                        className="flex-[1_0_0] min-h-px relative w-full"
                        data-node-id="5:3466"
                        data-name="AB6AXuDZQOLzpTQT6Ps1efCB4TQFONs6R-JeVn-vbhA98LaQ5nIj11fhbDL8FxgKkBwRbRMK8ivvS7bgSEZyaUivZ3N3WO61pjbPttIn1LP211XGlKUlab21E1AEEQxXqe5TnsysNeKKe69fN3KsX4gt5qSOfUqOLieNmYsAgMz_QF88RRM6yRg4TXvX7icsOU8wZDMQDIShNm-kIcm-g1ToHkovQRqDCmq3m8KYQdOlF7a0QEi1UVi_n8Epyw"
                      >
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                          <img
                            alt=""
                            className="absolute h-full left-[-5.05%] max-w-none top-0 w-[110.11%]"
                            src={
                              imgAb6AXuDzqoLzpTqt6Ps1EfCb4TqfoNs6RJeVnVbhA98LaQ5NIj11FhbDl8FxgKkBwRbRmk8IvvS7BgSeZyaUivZ3N3Wo61PjbPttIn1Lp211XGlKUlab21E1AeeQxXqe5TnsysNeKKe69FN3KsX4Gt5QSOfUqOLieNmYsAgMzQf88Rrm6YRg4TXvX7IcsOu8WZdmqdiShNmKIcmG1ToHkovQRqDCmq3M8KyQdOlF7A0QEi1UViN8Epyw
                            }
                          />
                        </div>
                      </div>
                      <div
                        className="absolute bg-brand-100 content-stretch drop-shadow-card flex gap-[6px] items-center left-[12px] px-[12px] py-[4px] rounded-pill top-[14px]"
                        data-node-id="5:3467"
                        data-name="Background+Shadow"
                      >
                        <div
                          className="bg-brand-900 relative rounded-pill shrink-0 size-[8px]"
                          data-node-id="5:3468"
                          data-name="Background"
                        />
                        <div
                          className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-800 text-[11px] whitespace-nowrap"
                          data-node-id="5:3469"
                        >
                          <p className="leading-[16px]">En préparation</p>
                        </div>
                      </div>
                      <div
                        className="absolute backdrop-blur-[2px] bg-[rgba(40,48,68,0.85)] bottom-[12px] content-stretch flex gap-[4px] items-center px-[10px] py-[4px] right-[12px] rounded-pill"
                        data-node-id="5:3470"
                        data-name="Overlay+OverlayBlur"
                      >
                        <div
                          className="h-[11.667px] relative shrink-0 w-[9.333px]"
                          data-node-id="5:3471"
                          data-name="Container"
                        >
                          <img
                            alt=""
                            className="absolute block inset-0 max-w-none size-full"
                            src={imgContainer2}
                          />
                        </div>
                        <div
                          className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-050 text-[11px] whitespace-nowrap"
                          data-node-id="5:3473"
                        >
                          <p className="leading-[16px]">Foumban • Ouest</p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex flex-col items-start justify-between p-[24px] relative shrink-0 w-full z-[1]"
                      data-node-id="5:3474"
                      data-name="Container"
                    >
                      <div
                        className="content-stretch flex flex-col gap-[7.4px] items-start relative shrink-0 w-full"
                        data-node-id="5:3475"
                        data-name="Container"
                      >
                        <div
                          className="content-stretch flex items-center relative shrink-0 w-full"
                          data-node-id="5:3476"
                          data-name="Container"
                        >
                          <div
                            className="bg-brand-100 content-stretch flex flex-col items-start px-[10px] py-[2px] relative rounded-pill shrink-0"
                            data-node-id="5:3477"
                            data-name="Background"
                          >
                            <div
                              className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-800 text-[11px] tracking-[0.55px] uppercase whitespace-nowrap"
                              data-node-id="5:3478"
                            >
                              <p className="leading-[16px]">{`ÉCOLES & SALLES DE CLASSE`}</p>
                            </div>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                          data-node-id="5:3479"
                          data-name="Heading 3"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center relative shrink-0 text-ink-900 text-h4 w-full"
                            data-node-id="5:3480"
                          >
                            <p className="text-balance">{`Rénovation de la toiture de la maternelle bilingue de Foumban`}</p>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex flex-col items-start overflow-clip pt-[0.6px] relative shrink-0 w-full"
                          data-node-id="5:3481"
                          data-name="Container"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center not-italic relative shrink-0 text-ink-700 text-body w-full"
                            data-node-id="5:3482"
                          >
                            <p className="text-pretty">{`Remplacement de 420 m² de charpente fragilisée par les infiltrations pour protéger 215 tout-petits avant la saison des pluies torrentielles`}</p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="content-stretch flex flex-col items-start pt-[24px] relative shrink-0 w-full"
                        data-node-id="5:3483"
                        data-name="Margin"
                      >
                        <div
                          className="bg-surface-muted content-stretch flex flex-col gap-[4px] items-start pb-[14px] pt-[16px] px-[14px] relative rounded-control shrink-0 w-full"
                          data-node-id="5:3484"
                          data-name="Background"
                        >
                          <div className="flex flex-col gap-[2px] items-start w-full"><p className="font-['Inter:Bold'] font-bold leading-[22px] text-accent-700 text-h4">{`420 m² à sécuriser`}</p><p className="font-['Inter:Regular'] font-normal leading-[18px] text-ink-700 text-small">Surface toiture</p></div>
                          <div
                            className="bg-surface-tint h-[10px] overflow-clip relative rounded-pill shrink-0 w-full"
                            data-node-id="5:3492"
                            data-name="Background"
                          >
                            <div
                              className="absolute bg-brand-900 bottom-0 left-0 right-3/4 rounded-pill top-0"
                              data-node-id="5:3493"
                              data-name="Background"
                            />
                          </div>
                          <div
                            className="content-stretch flex items-start justify-between relative shrink-0 w-full"
                            data-node-id="5:3494"
                            data-name="Container"
                          >
                            <div
                              className="content-stretch flex flex-col items-start relative self-stretch shrink-0"
                              data-node-id="5:3495"
                              data-name="Container"
                            >
                              <div
                                className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-ink-700 text-[11px] whitespace-nowrap"
                                data-node-id="5:3496"
                              >
                                <p className="leading-[16px]">
                                  Devis communautaire validé
                                </p>
                              </div>
                            </div>
                            <div
                              className="content-stretch flex flex-col items-start relative self-stretch shrink-0"
                              data-node-id="5:3497"
                              data-name="Container"
                            >
                              <div
                                className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-900 text-[11px] whitespace-nowrap"
                                data-node-id="5:3498"
                              >
                                <p className="leading-[16px]">
                                  Recherche de parrain
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="content-stretch flex flex-col items-start pt-[20px] relative shrink-0 w-full"
                        data-node-id="5:3499"
                        data-name="Margin"
                      >
                                                <div className="flex flex-wrap gap-[8px] items-center justify-between pt-[8px] w-full">
                          <Link className="btn btn-card btn-secondary" to={`/nos-projets/kits-secourisme-ngambe-tikar`}>
                            <span className="btn-label">{`Voir le dossier technique`}</span>
                          </Link>
                          <Link className="btn btn-card btn-warn" to="/don">
                            <span className="btn-label">{`Adopter ce toit`}</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="bg-white content-stretch flex flex-[1_0_0] flex-col isolate items-start min-w-px overflow-clip relative rounded-card shadow-raised"
                    data-project-category="school"
                    data-project-region="Est"
                    data-node-id="5:3505"
                    style={{ display: hiddenProjects.has("5:3505") ? "none" : undefined }}
                    data-name="Article - Projet 6: Réalis"
                  >
                    <div
                      className="bg-surface-tint content-stretch flex flex-col h-[224px] items-start justify-center overflow-clip relative shrink-0 w-full z-[2]"
                      data-node-id="5:3506"
                      data-name="Background"
                    >
                      <div
                        className="flex-[1_0_0] min-h-px relative w-full"
                        data-node-id="5:3507"
                        data-name="AB6AXuDTheAj1_Znd44vupYYScgyknksVqge_dZHAahT1pMQ9aTulGVwxMsrEdrVDbwLFqnJpYiYisWX3c1K1KxmnTNGmepU5t0EBQrfWgf5zqWCRlDoySI8Mzr3yR1D99k0DNIxGt8-If_65vuQfcokSUx_l_SJZu042irMCQYM0PbKGQbrn2caWKEi8FriK6QEX_e94fNdHZTH8AdbaP7mCe3DnFSt3WzJkHDI1JlD0ApBIsxTc5UHgXL1yw"
                      >
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                          <img
                            alt=""
                            className="absolute h-full left-[-5.05%] max-w-none top-0 w-[110.11%]"
                            src={
                              imgAb6AXuDTheAj1Znd44VupYyScgyknksVqgeDZhAahT1PMq9ATulGVwxMsrEdrVDbwLFqnJpYiYisWx3C1K1KxmnTnGmepU5T0EbQrfWgf5ZqWcRlDoySi8Mzr3YR1D99K0DnIxGt8If65VuQfcokSUxLSjZu042IrMcqym0PbKgQbrn2CaWkEi8FriK6QexE94FNdHzth8AdbaP7MCe3DnFSt3WzJkHdi1JlD0ApBIsxTc5UHgXl1Yw
                            }
                          />
                        </div>
                      </div>
                      <div
                        className="absolute bg-accent-300 content-stretch drop-shadow-card flex gap-[6px] items-center left-[12px] px-[12px] py-[4px] rounded-pill top-[14px]"
                        data-node-id="5:3508"
                        data-name="Background+Shadow"
                      >
                        <div
                          className="bg-accent-700 relative rounded-pill shrink-0 size-[8px]"
                          data-node-id="5:3509"
                          data-name="Background"
                        />
                        <div
                          className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#007230] text-[11px] whitespace-nowrap"
                          data-node-id="5:3510"
                        >
                          <p className="leading-[16px]">{`Réalisé & Distribué`}</p>
                        </div>
                      </div>
                      <div
                        className="absolute backdrop-blur-[2px] bg-[rgba(40,48,68,0.85)] bottom-[12px] content-stretch flex gap-[3.99px] items-center px-[10px] py-[4px] right-[11.99px] rounded-pill"
                        data-node-id="5:3511"
                        data-name="Overlay+OverlayBlur"
                      >
                        <div
                          className="h-[11.667px] relative shrink-0 w-[9.333px]"
                          data-node-id="5:3512"
                          data-name="Container"
                        >
                          <img
                            alt=""
                            className="absolute block inset-0 max-w-none size-full"
                            src={imgContainer2}
                          />
                        </div>
                        <div
                          className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-050 text-[11px] whitespace-nowrap"
                          data-node-id="5:3514"
                        >
                          <p className="leading-[16px]">Batouri • Est</p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex flex-col items-start justify-between p-[24px] relative shrink-0 w-full z-[1]"
                      data-node-id="5:3515"
                      data-name="Container"
                    >
                      <div
                        className="content-stretch flex flex-col gap-[7.4px] items-start relative shrink-0 w-full"
                        data-node-id="5:3516"
                        data-name="Container"
                      >
                        <div
                          className="content-stretch flex items-center relative shrink-0 w-full"
                          data-node-id="5:3517"
                          data-name="Container"
                        >
                          <div
                            className="bg-accent-200 content-stretch flex flex-col items-start px-[10px] py-[2px] relative rounded-pill shrink-0"
                            data-node-id="5:3518"
                            data-name="Background"
                          >
                            <div
                              className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-accent-900 text-[11px] tracking-[0.55px] uppercase whitespace-nowrap"
                              data-node-id="5:3519"
                            >
                              <p className="leading-[16px]">{`ÉDUCATION & BOURSES`}</p>
                            </div>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                          data-node-id="5:3520"
                          data-name="Heading 3"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center relative shrink-0 text-ink-900 text-h4 w-full"
                            data-node-id="5:3521"
                          >
                            <p className="text-balance">{`Don de 250 kits scolaires complets au Cycle 1 & 2 à Batouri`}</p>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex flex-col items-start overflow-clip pt-[0.6px] relative shrink-0 w-full"
                          data-node-id="5:3522"
                          data-name="Container"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center not-italic relative shrink-0 text-ink-700 text-body w-full"
                            data-node-id="5:3523"
                          >
                            <p className="text-pretty">{`Distribution directe aux orphelins et enfants de réfugiés : cartables imperméables, boîtes de craies, cahiers, ardoises et manuels officiels du`}</p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="content-stretch flex flex-col items-start pt-[24px] relative shrink-0 w-full"
                        data-node-id="5:3524"
                        data-name="Margin"
                      >
                        <div
                          className="bg-surface-muted content-stretch flex flex-col gap-[4px] items-start pb-[14px] pt-[16px] px-[14px] relative rounded-control shrink-0 w-full"
                          data-node-id="5:3525"
                          data-name="Background"
                        >
                          <div className="flex flex-col gap-[2px] items-start w-full"><p className="font-['Inter:Bold'] font-bold leading-[22px] text-accent-700 text-h4">{`250 kits complets`}</p><p className="font-['Inter:Regular'] font-normal leading-[18px] text-ink-700 text-small">Dotations remises</p></div>
                          <div
                            className="bg-surface-tint content-stretch flex flex-col h-[8px] items-start justify-center overflow-clip relative rounded-pill shrink-0 w-full"
                            data-node-id="5:3533"
                            data-name="Background"
                          >
                            <div
                              className="bg-accent-700 flex-[1_0_0] min-h-px relative rounded-pill w-full"
                              data-node-id="5:3534"
                              data-name="Background"
                            />
                          </div>
                          <div
                            className="content-stretch flex flex-col items-end relative shrink-0 w-full"
                            data-node-id="5:3535"
                            data-name="Container"
                          >
                            <div
                              className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-ink-500 text-[11px] text-right whitespace-nowrap"
                              data-node-id="5:3536"
                            >
                              <p className="leading-[16px]">100% Clôturé</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="content-stretch flex flex-col items-start pt-[20px] relative shrink-0 w-full"
                        data-node-id="5:3537"
                        data-name="Margin"
                      >
                        <div
                          className="content-stretch flex items-center justify-between pt-[8px] relative shrink-0 w-full"
                          data-node-id="5:3538"
                          data-name="Container"
                        >
                          <div
                            className="content-stretch flex flex-col items-center justify-center relative shrink-0"
                            data-node-id="5:3539"
                            data-name="Button"
                          >
                                                        <div className="flex flex-wrap gap-[8px] items-center justify-between pt-[8px] w-full">
                              <Link className="btn btn-card btn-secondary" to={`/nos-projets/toiture-maternelle-foumban`}>
                                <span className="btn-label">{`Rapport photographique`}</span>
                              </Link>
                              <Link className="btn btn-card btn-warn" to="/don">
                                <span className="btn-label">{`Voir le bilan`}</span>
                              </Link>
                            </div>
                          </div>
                          <div
                            className="h-[19.25px] relative shrink-0 w-[20.167px]"
                            data-node-id="5:3541"
                            data-name="Container"
                          >
                            <img
                              alt=""
                              className="absolute block inset-0 max-w-none size-full"
                              src={imgContainer12}
                            />
                          </div>
                        </div>
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
                      <span aria-hidden="true" className="flex shrink-0 items-center text-ink-700">
                        <Icon name="mapPin" size={16.667} />
                      </span>
                      <select
                        className="min-w-0 max-w-full cursor-pointer rounded-control border-0 bg-white py-2 pl-4 pr-9 font-['Inter:Semi_Bold'] text-[14px] font-semibold text-ink-900 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b5cab]"
                        onChange={(event) => setRegionFilter(event.target.value)}
                        value={regionFilter}
                      >
                        {PROJECT_REGIONS.map((region) => (
                          <option key={region} value={region}>
                            {region === 'all'
                              ? 'Toutes les régions (10)'
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
                  {visibleProjectCount} projet{visibleProjectCount > 1 ? 's' : ''} sur{' '}
                  {projectRegionCounts.all} au total
                </p>
              </div>
            </div>
              <div
                className="flex w-full flex-col items-center justify-center gap-2 rounded-panel border border-dashed border-[#c7cdf5] bg-white px-6 py-14 text-center"
                data-empty-state="projects"
                role="status"
                style={{ display: visibleProjectCount === 0 ? 'flex' : 'none' }}
              >
                <span aria-hidden="true" className="flex size-12 items-center justify-center rounded-pill bg-surface-tint text-brand-700">
                  <Icon name="search" size={22} />
                </span>
                <p className="font-['Montserrat:Bold'] text-[16px] font-bold text-ink-900">
                  Aucun projet ne correspond à ces filtres
                </p>
                <p className="max-w-[46ch] font-['Inter:Regular'] text-[14px] text-[#5d626e]">
                  Essayez une autre région ou la catégorie « Tous les projets » pour voir
                  l'ensemble des chantiers en cours.
                </p>
                <button
                  type="button"
                  className="mt-2 cursor-pointer rounded-pill bg-brand-900 px-5 py-2.5 font-['Inter:Semi_Bold'] text-[14px] font-semibold text-white transition-colors hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004484]"
                  onClick={() => {
                    setProjectFilter('all')
                    setRegionFilter('all')
                  }}
                >
                  Réinitialiser les filtres
                </button>
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
                  className="content-stretch flex gap-[48px] items-start relative shrink-0 w-full"
                  data-node-id="5:3546"
                  data-name="Container"
                >
                  <div
                    className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px relative"
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
                  <div
                    className="bg-surface-subtle content-stretch drop-shadow-card flex flex-[1_0_0] flex-col items-start min-w-px p-[32px] relative rounded-card"
                    data-node-id="5:3580"
                    data-name="Proposal Form"
                  >
                    <div
                      className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full"
                      data-node-id="5:3581"
                      data-name="Form"
                    >
                      <div
                        className="content-stretch flex gap-[15.99px] items-start justify-center relative shrink-0 w-full"
                        data-node-id="5:3582"
                        data-name="Container"
                      >
                        <div
                          className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[262.66px]"
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
                          className="content-stretch flex flex-col gap-[4px] items-start pb-px relative shrink-0 w-[262.67px]"
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
                        className="content-stretch flex gap-[15.99px] items-start justify-center relative shrink-0 w-full"
                        data-node-id="5:3595"
                        data-name="Container"
                      >
                        <div
                          className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[262.66px]"
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
                          className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[262.67px]"
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
                        className="content-stretch flex items-center justify-between pt-[8px] relative shrink-0 w-full"
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
                        <div
                          className="bg-accent-700 content-stretch flex gap-[8px] items-center relative rounded-pill shrink-0 btn-md btn"
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
                        </div>
                      </div>
                    </div>
                  </div>
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
                      <div
                        className="bg-brand-900 content-stretch flex flex-col items-center relative rounded-pill shrink-0 w-full btn-md btn"
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
                      </div>
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
                    <p className="leading-[16px]" data-decorative-separator="true">•</p>
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
                  <Icon name="phone" size={12.0} className="shrink-0" />
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
                    <p className="leading-[16px]" data-decorative-separator="true">•</p>
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
                  <p className="leading-[20px]">contact@childrenssmile.cm</p>
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
