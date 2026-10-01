import { useMemo, useState } from "react"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { Icon } from "../components/Icon"
import { TabBar } from "../components/TabBar"

const assetPathPrefix = "/assets"
const imgEcoliersCamerounaisEpanouisLevantLaMainEnClasse = `${assetPathPrefix}/22911.png`
const imgAb6AXuD66RnhFdYnn2QdgGrLrj4PyQxlsWddx2YW7NOe6KhOhrtvXae1MUxI2XMu0YmfTg6Lg2R2Z5YOam5IPiEfDrKupC2Gw8JSyv6SlHnhVoqWqeEslhdZnnZxKyDcReaylLzaHWeEoArxsQbbJvZIoWscpEoaHl0614VuAcylOLaSqjqnhMiLffpTbXl5Rju6NiU9U97EXdSeU9K55E5Cq37LWhMu4PXOtecl65NinEhwGtDw = `${assetPathPrefix}/8147f.png`
const imgAb6AXuAmRgs14AOftZhmXNlCrTkmmPpDViKjcWsUofz0Oj9M0DKTx9SWDkiUZzzNa7QzSiT2BeD10B6Bx0UjcFkJisXiPx7ZadFJs8DEylybmyxx16RpGh1KJcTgQdSC0BuDXrDco0Ts0KyLlEhV81IkAtAGt9EA1Z0CCyXkdjBb0YQiInD7L1D3I3SRih2ZrF1KxEZeWPwa3XTr3KOKhW8VQtfZzunltujKrBAnNp7OjGHdmqx33BQ = `${assetPathPrefix}/1b4f7.png`
const imgAb6AXuAJdDjpVzbKdzdz3VjUrk1VrswzgZy3QJfsclz3FsWqNlG6Tr28DxDqkkCAaqrcldzlUUgYEkedCyOrCaWbulPwpgeaQdw0Mr9La6OCQlVarfQp4Su06GKEoakH0Pfu2OgNEpiiUkiNlq75UcnB0Enc6UPcVdUxpg9Rj6OGdcPgVV5QTqXkhb61KykOvc4AJrGvOfTjjZGOhJ6Ms9HO4KlulVXfrfuelsMdOv4Luidg = `${assetPathPrefix}/e6593.png`
const imgAb6AXuDWtlsScnVk3XRyXdeSaOgMtvJYNl99Od7JHyDDw5ZqPp93GmJzKeOoCzHczKo0Uw4F7LteqgXuVkBkIvelP0Da2EyXZrP010Dq2OrGcqBk56V9T46PtlM0FO60M5WBuuh8Sb9D2Hkc4K7Efjo5WvCbzEddclZp82TMn6CebHJjJAcfZQlP724Fxyb4SigbJh2NKbNqkTbQyOvBdrxw05MpCFiPtltfc4FbNuSso7Ga = `${assetPathPrefix}/c30d1.png`
const imgAb6AXuDf4HjsQmaihI98JmPrLg6RXfclHkn2Xw0Gr4CmaMoYtZNqnjf7U9LBjc7MxvFpfu61Xf8Zkj3WDm7ZtD18MSp3Dv9WivwWg5UIamEoQaDa7Bjubfr6I7Fqug4VAodLf52KsXtRekkWlYpSkeiue9W7HpEcVnh3QVwzDziVkLzJxYjGjMdBwscWlsu6RfFkhJdderQq6ZnlIDraShwljpYLXhidyHtEhAwMqhJ1KsWvKirof2OkSq = `${assetPathPrefix}/e8c8e.png`
const imgLogoChildrensSmileCameroun = `${assetPathPrefix}/1fe61.png`
const imgContainer = `${assetPathPrefix}/d7d0b.svg`
const imgContainer1 = `${assetPathPrefix}/a2adb.svg`
const imgContainer2 = `${assetPathPrefix}/d0461.svg`
const imgContainer3 = `${assetPathPrefix}/9a996.svg`
const imgContainer4 = `${assetPathPrefix}/9c404.svg`
const imgContainer5 = `${assetPathPrefix}/62628.svg`
const imgContainer6 = `${assetPathPrefix}/3a9f9.svg`
const imgContainer7 = `${assetPathPrefix}/402b2.svg`
const imgContainer8 = `${assetPathPrefix}/1a3d5.svg`
const imgContainer9 = `${assetPathPrefix}/0979c.svg`
const imgContainer10 = `${assetPathPrefix}/cbc77.svg`
const imgContainer11 = `${assetPathPrefix}/6077e.svg`
const imgContainer12 = `${assetPathPrefix}/ffd72.svg`
const imgContainer13 = `${assetPathPrefix}/87cfe.svg`
const imgContainer14 = `${assetPathPrefix}/17a2d.svg`
const imgContainer15 = `${assetPathPrefix}/b0702.svg`
const imgIcon = `${assetPathPrefix}/32f54.svg`
const imgContainer16 = `${assetPathPrefix}/d0865.svg`
const imgContainer17 = `${assetPathPrefix}/4a238.svg`
const imgContainer18 = `${assetPathPrefix}/7040c.svg`
const imgContainer19 = `${assetPathPrefix}/b8e01.svg`
const imgContainer20 = `${assetPathPrefix}/95d57.svg`
const imgContainer21 = `${assetPathPrefix}/cf0be.svg`
const imgContainer22 = `${assetPathPrefix}/ccbeb.svg`
const imgContainer23 = `${assetPathPrefix}/6b8b8.svg`
const imgContainer24 = `${assetPathPrefix}/ab5f9.svg`
const imgIcon1 = `${assetPathPrefix}/6f0c7.svg`
const imgContainer25 = `${assetPathPrefix}/3d565.svg`
const imgContainer26 = `${assetPathPrefix}/dbec8.svg`
const imgContainer27 = `${assetPathPrefix}/f9d8b.svg`
const imgContainer28 = `${assetPathPrefix}/90630.svg`
const imgContainer29 = `${assetPathPrefix}/f307d.svg`
const imgContainer30 = `${assetPathPrefix}/c0141.svg`
const imgContainer31 = `${assetPathPrefix}/92843.svg`
const imgContainer32 = `${assetPathPrefix}/5204d.svg`
const imgContainer33 = `${assetPathPrefix}/7bd06.svg`
const imgContainer34 = `${assetPathPrefix}/13c4a.svg`
const imgContainer35 = `${assetPathPrefix}/268b2.svg`
const imgIcon2 = `${assetPathPrefix}/a843e.svg`
const imgIcon3 = `${assetPathPrefix}/52f59.svg`
const imgContainer36 = `${assetPathPrefix}/80ad2.svg`
const imgContainer37 = `${assetPathPrefix}/a664d.svg`
const imgContainer38 = `${assetPathPrefix}/f2cd0.svg`
const imgContainer39 = `${assetPathPrefix}/0bdf0.svg`
const imgContainer40 = `${assetPathPrefix}/665c6.svg`
const imgContainer41 = `${assetPathPrefix}/ab0b2.svg`
const imgContainer42 = `${assetPathPrefix}/a86a8.svg`
const imgContainer43 = `${assetPathPrefix}/723e5.svg`
const imgContainer44 = `${assetPathPrefix}/e853b.svg`
const imgMargin = `${assetPathPrefix}/a1e07.svg`
const imgMargin1 = `${assetPathPrefix}/dedeb.svg`
const imgMargin2 = `${assetPathPrefix}/49ddd.svg`
const imgContainer45 = `${assetPathPrefix}/aea2d.svg`
const imgContainer46 = `${assetPathPrefix}/e290d.svg`
const imgContainer47 = `${assetPathPrefix}/e0bd5.svg`

const NEWS_FILTERS = [
  { value: "all", label: "Tous les articles", icon: <Icon name="sparkles" size={12} /> },
  { value: "field", label: "Sur le terrain", icon: <Icon name="mapPin" size={12} /> },
  { value: "stories", label: "Histoires humaines", icon: <Icon name="quote" size={12} /> },
  {
    value: "education",
    label: "Éducation & Pédagogie",
    icon: <Icon name="graduationCap" size={12} />,
  },
  {
    value: "protection",
    label: "Protection & Santé de l'enfant",
    icon: <Icon name="shieldCheck" size={12} />,
  },
  {
    value: "association",
    label: "Vie de l'association & Partenariats",
    icon: <Icon name="handshake" size={12} />,
  },
  {
    value: "official",
    label: "Communiqués officiels",
    icon: <Icon name="scrollText" size={12} />,
  },
] as const

/** Catégories thématiques de chaque article de la grille (un article peut en avoir plusieurs). */
const NEWS_ARTICLE_CATEGORIES: Record<string, readonly string[]> = {
  "5:865": ["field", "protection"],
  "5:900": ["education", "field"],
  "5:935": ["association"],
  "5:970": ["protection", "stories"],
  "5:1005": ["association", "stories"],
  "5:1040": ["official"],
}

export default function ActualitesHistoiresChildrensSmileCameroun() {
  const [newsFilter, setNewsFilter] = useState("all")

  const newsFilterCounts = useMemo(() => {
    const counts: Record<string, number> = { all: 0 }
    for (const categories of Object.values(NEWS_ARTICLE_CATEGORIES)) {
      counts.all += 1
      for (const category of categories) {
        counts[category] = (counts[category] ?? 0) + 1
      }
    }
    return counts
  }, [])

  /** Which grid row each article belongs to, so fully filtered-out rows can collapse. */
  const newsRows = useMemo(
    () => [
      ["5:865", "5:900", "5:935"],
      ["5:970", "5:1005", "5:1040"],
    ],
    [],
  )

  const hiddenNews = useMemo(() => {
    if (newsFilter === "all") return new Set<string>()
    const hidden = new Set<string>()
    for (const [id, categories] of Object.entries(NEWS_ARTICLE_CATEGORIES)) {
      if (!categories.includes(newsFilter)) hidden.add(id)
    }
    return hidden
  }, [newsFilter])

  const hiddenNewsRows = useMemo(
    () =>
      new Set(
        newsRows
          .filter((row) => row.every((id) => hiddenNews.has(id)))
          .map((row) => row[0]),
      ),
    [newsRows, hiddenNews],
  )

  return (
    <>
      <Header />
      <div
        id="main-content"
        data-news-filter={newsFilter}
        className="actualites-page content-stretch flex flex-col items-start relative size-full"
        data-node-id="5:706"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgb(250, 248, 255) 0%, rgb(250, 248, 255) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)",
        }}
        data-name="Actualités & Histoires - Children's Smile Cameroun"
      >
        <div
          className="bg-surface-subtle content-stretch flex flex-col items-start pt-[112px] relative shrink-0 w-full"
          data-node-id="5:707"
          data-name="Main"
        >
          <div
            className="content-stretch flex flex-col items-start relative shrink-0 w-full"
            data-node-id="5:708"
            data-name="Container"
          >
            <div
              className="content-stretch flex flex-col items-start overflow-clip pb-[48px] relative shrink-0 w-full"
              data-node-id="5:709"
              data-name="Section - SECTION HERO EDITORIAL & EN-TÊTE DU MAGAZINE"
            >
              <div
                className="-translate-x-1/2 absolute bg-[rgba(213,227,255,0.3)] blur-[32px] h-[340px] left-1/2 rounded-pill top-[-96px] w-[850px]"
                data-node-id="5:710"
                data-name="Ambient subtle halo decoration"
              />
              <div
                className="absolute bg-[rgba(127,252,151,0.2)] blur-[20px] bottom-[-16.45%] right-[16px] rounded-pill top-[33.33%] w-[288px]"
                data-node-id="5:711"
                data-name="Overlay+Blur"
              />
              <div
                className="absolute bg-gradient-to-b from-[#f2f3ff] inset-[0_0_0.5px_0] to-[#faf8ff] via-1/2 via-[#faf8ff]"
                data-node-id="5:712"
                data-name="Section - SECTION HERO EDITORIAL & EN-TÊTE DU MAGAZINE paints"
              />
              <div
                className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full shell"
                data-node-id="5:713"
                data-name="Container"
              >
                <div
                  className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full"
                  data-node-id="5:714"
                  data-name="Sur-titre d'institution"
                >
                  <div
                    className="bg-[rgba(11,92,171,0.1)] content-stretch flex gap-[6px] items-center px-[12px] py-[4px] relative rounded-pill shrink-0"
                    data-node-id="5:715"
                    data-name="Overlay"
                  >
                    <div
                      className="h-[11.25px] relative shrink-0 w-[12.5px]"
                      data-node-id="5:716"
                      data-name="Container"
                    >
                      <img
                        alt=""
                        className="absolute block inset-0 max-w-none size-full"
                        src={imgContainer}
                      />
                    </div>
                    <div
                      className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-900 text-[11px] tracking-[0.55px] uppercase whitespace-nowrap"
                      data-node-id="5:718"
                    >
                      <p className="leading-[16px]">{`LE JOURNAL DE TERRAIN • ENFANCE & COMMUNAUTÉS`}</p>
                    </div>
                  </div>
                  <div
                    className="bg-ink-300 relative rounded-pill shrink-0 size-[6px]"
                    data-node-id="5:719"
                    data-name="Background"
                  />
                  <div
                    className="content-stretch flex gap-[4px] items-center relative shrink-0"
                    data-node-id="5:720"
                    data-name="Container"
                  >
                    <div
                      className="h-[13.125px] relative shrink-0 w-[13.75px]"
                      data-node-id="5:721"
                      data-name="Container"
                    >
                      <img
                        alt=""
                        className="absolute block inset-0 max-w-none size-full"
                        src={imgContainer1}
                      />
                    </div>
                    <div
                      className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[12px] whitespace-nowrap"
                      data-node-id="5:723"
                    >
                      <p className="leading-[16px]">{`Informations certifiées MINAT & Délégations régionales`}</p>
                    </div>
                  </div>
                </div>
                <div
                  className="content-stretch flex items-end justify-between relative shrink-0 w-full"
                  data-node-id="5:724"
                  data-name="Container"
                >
                  <div
                    className="content-stretch flex flex-col gap-[16px] items-start relative shell-narrow"
                    data-node-id="5:725"
                    data-name="Container"
                  >
                    <div
                      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                      data-node-id="5:726"
                      data-name="Heading 1"
                    >
                      <div
                        className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-900 text-[40px] tracking-[-1px] whitespace-nowrap"
                        data-node-id="5:727"
                      >
                        <p className="leading-[48px] mb-0">{`Actualités, Carnets de Terrain &`}</p>
                        <p className="leading-[48px]">Histoires de Vie</p>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                      data-node-id="5:728"
                      data-name="Container"
                    >
                      <div
                        className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[18px] whitespace-nowrap"
                        data-node-id="5:729"
                      >
                        <p className="leading-[29.25px] mb-0">
                          Plongez au cœur de nos chantiers scolaires, de la voix
                          des enseignants, des comités de
                        </p>
                        <p className="leading-[29.25px]">{`village et des initiatives communautaires pour l'éducation des enfants au Cameroun.`}</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="content-stretch flex flex-col items-start relative shrink-0 w-[320px]"
                    data-node-id="5:730"
                    data-name="Mini indicateur de transparence journalistique:align-stretch"
                  >
                    <div
                      className="bg-surface-tint content-stretch flex items-center justify-between p-[16px] relative rounded-card shrink-0 w-full"
                      data-node-id="5:731"
                      data-name="Mini indicateur de transparence journalistique"
                    >
                      <div
                        className="content-stretch flex flex-col items-start relative shrink-0"
                        data-node-id="5:732"
                        data-name="Container"
                      >
                        <div
                          className="content-stretch flex flex-col items-start mb-[-0.5px] relative shrink-0 w-full"
                          data-node-id="5:733"
                          data-name="Container"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-ink-700 text-[11px] tracking-[0.55px] uppercase whitespace-nowrap"
                            data-node-id="5:734"
                          >
                            <p className="leading-[16px]">ÉDITION EN COURS</p>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex flex-col items-start mb-[-0.5px] relative shrink-0 w-full"
                          data-node-id="5:735"
                          data-name="Container"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-900 text-[20px] whitespace-nowrap"
                            data-node-id="5:736"
                          >
                            <p className="leading-[28px]">Février 2025</p>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full"
                          data-node-id="5:737"
                          data-name="Container"
                        >
                          <div
                            className="bg-accent-700 relative rounded-pill shrink-0 size-[8px]"
                            data-node-id="5:738"
                            data-name="Background"
                          />
                          <div
                            className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-accent-700 text-[12px] whitespace-nowrap"
                            data-node-id="5:739"
                          >
                            <p className="leading-[16px]">
                              6 missions actives documentées
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="bg-[rgba(0,68,132,0.1)] content-stretch flex flex-col items-center justify-center relative rounded-pill shrink-0 size-[48px]"
                        data-node-id="5:740"
                        data-name="Overlay"
                      >
                        <div
                          className="h-[17.333px] relative shrink-0 w-[23.833px]"
                          data-node-id="5:741"
                          data-name="Container"
                        >
                          <img
                            alt=""
                            className="absolute block inset-0 max-w-none size-full"
                            src={imgContainer2}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="flex flex-col gap-3 items-start py-4 relative shrink-0 w-full"
                  data-node-id="5:743"
                  data-name="BARRE DE FILTRES THÉMATIQUES INTERACTIVE"
                >
                  <TabBar
                    items={NEWS_FILTERS}
                    label="Filtres thématiques des actualités"
                    onChange={setNewsFilter}
                    panelId="news-grid"
                    value={newsFilter}
                    variant="pill"
                  />
                  <p className="font-['Inter:Regular'] text-[#5d626e] text-[12px] leading-4">
                    {newsFilterCounts[newsFilter] ?? 0} article
                    {(newsFilterCounts[newsFilter] ?? 0) > 1 ? 's' : ''} dans cette
                    catégorie
                  </p>
                </div>
              </div>
            </div>
            <div
              className="content-stretch flex flex-col items-start pb-[64px] relative shrink-0 w-full shell"
              data-node-id="5:772"
              data-name="Section - ARTICLE À LA UNE (GRAND FORMAT IMMERSIF BENTO):margin"
            >
              <div
                className="bg-white content-stretch flex items-start overflow-clip relative rounded-card shadow-hero shrink-0 w-full"
                data-node-id="5:773"
                data-name="Section - ARTICLE À LA UNE (GRAND FORMAT IMMERSIF BENTO)"
              >
                <div
                  className="content-stretch flex flex-col items-start justify-center min-h-[520px] overflow-clip relative shrink-0 w-[640px]"
                  data-node-id="5:775"
                  data-name="Image & Scrim narratif"
                >
                  <div
                    className="h-[718px] relative shrink-0 w-full"
                    data-node-id="5:776"
                    data-name="Écoliers camerounais épanouis levant la main en classe"
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img
                        alt=""
                        className="absolute h-full left-[-44.33%] max-w-none top-0 w-[188.66%]"
                        src={imgEcoliersCamerounaisEpanouisLevantLaMainEnClasse}
                      />
                    </div>
                  </div>
                  <div
                    className="absolute content-stretch flex gap-[8px] items-center left-[16px] top-[16px]"
                    data-node-id="5:777"
                    data-name="Badge flottant sur l'image"
                  >
                    <div
                      className="bg-warn-700 content-stretch flex gap-[6px] items-center px-[12px] py-[4px] relative rounded-pill shrink-0"
                      data-node-id="5:778"
                      data-name="Background"
                    >
                      <div
                        className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-pill shadow-float"
                        data-node-id="5:779"
                        data-name="Overlay+Shadow"
                      />
                      <div
                        className="bg-white relative rounded-pill shrink-0 size-[8px]"
                        data-node-id="5:780"
                        data-name="Background"
                      />
                      <div
                        className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[11px] text-white tracking-[0.55px] uppercase whitespace-nowrap"
                        data-node-id="5:781"
                      >
                        <p className="leading-[16px]">REPORTAGE EXCLUSIF</p>
                      </div>
                    </div>
                    <div
                      className="backdrop-blur-[6px] bg-[rgba(250,248,255,0.9)] content-stretch flex flex-col items-start px-[12px] py-[4px] relative rounded-pill shadow-raised shrink-0"
                      data-node-id="5:782"
                      data-name="Overlay+Shadow+OverlayBlur"
                    >
                      <div
                        className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-900 text-[11px] uppercase whitespace-nowrap"
                        data-node-id="5:783"
                      >
                        <p className="leading-[16px]">{`RÉGION DE L'EST • HAUT-NYONG`}</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="absolute backdrop-blur-[6px] bg-[rgba(250,248,255,0.9)] bottom-[20px] content-stretch flex gap-[12px] items-center left-[20px] p-[16px] right-[19.67px] rounded-control"
                    data-node-id="5:784"
                    data-name="Témoignage rapide incrusté desktop"
                  >
                    <div
                      className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-control shadow-float"
                      data-node-id="5:785"
                      data-name="Témoignage rapide incrusté desktop:shadow"
                    />
                    <div
                      className="bg-accent-700 content-stretch flex flex-col items-center justify-center relative rounded-pill shrink-0 size-[40px]"
                      data-node-id="5:786"
                      data-name="Background"
                    >
                      <div
                        className="h-[10px] relative shrink-0 w-[14.167px]"
                        data-node-id="5:787"
                        data-name="Container"
                      >
                        <img
                          alt=""
                          className="absolute block inset-0 max-w-none size-full"
                          src={imgContainer10}
                        />
                      </div>
                    </div>
                    <div
                      className="content-stretch flex flex-col items-start overflow-clip pr-[28.38px] relative shrink-0"
                      data-node-id="5:789"
                      data-name="Container"
                    >
                      <div
                        className="[word-break:break-word] flex flex-col font-['Inter:Italic'] font-normal italic justify-center leading-[0] relative shrink-0 text-ink-900 text-[14px] whitespace-nowrap"
                        data-node-id="5:790"
                      >
                        <p className="leading-[20px] mb-0">{`« Les bancs en bois massif permettent enfin aux enfants d'écrire sans que leurs`}</p>
                        <p className="leading-[20px]">
                          cahiers ne tombent dans la terre. »
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="bg-white content-stretch flex flex-[1_0_0] flex-col items-start justify-between min-w-px p-[40px] relative"
                  data-node-id="5:791"
                  data-name="Colonne éditoriale & Contexte"
                >
                  <div
                    className="content-stretch flex flex-col gap-[16px] items-start pb-[24px] relative shrink-0 w-full"
                    data-node-id="5:792"
                    data-name="Container"
                  >
                    <div
                      className="h-[44px] relative shrink-0 w-full"
                      data-node-id="5:793"
                      data-name="Métadonnées de l'article"
                    >
                      <div
                        className="-translate-y-1/2 absolute content-stretch flex gap-[4px] items-center left-0 top-[calc(50%-14.25px)]"
                        data-node-id="5:794"
                        data-name="Container"
                      >
                        <div
                          className="h-[13.333px] relative shrink-0 w-[9.333px]"
                          data-node-id="5:795"
                          data-name="Container"
                        >
                          <img
                            alt=""
                            className="absolute block inset-0 max-w-none size-full"
                            src={imgContainer11}
                          />
                        </div>
                        <div
                          className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-brand-900 text-[12px] whitespace-nowrap"
                          data-node-id="5:797"
                        >
                          <p className="leading-[16px]">Dimako, Cameroun</p>
                        </div>
                      </div>
                      <div
                        className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-[142.11px] top-[calc(50%-14px)]"
                        data-node-id="5:798"
                        data-name="Container"
                      >
                        <div
                          className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[12px] whitespace-nowrap"
                          data-node-id="5:799"
                        >
                          <p className="leading-[16px]" data-decorative-separator="true">•</p>
                        </div>
                      </div>
                      <div
                        className="-translate-y-1/2 absolute content-stretch flex gap-[4px] items-center left-[160.15px] top-[calc(50%-14.25px)]"
                        data-node-id="5:800"
                        data-name="Container"
                      >
                        <div
                          className="h-[13.333px] relative shrink-0 w-[12px]"
                          data-node-id="5:801"
                          data-name="Container"
                        >
                          <img
                            alt=""
                            className="absolute block inset-0 max-w-none size-full"
                            src={imgContainer12}
                          />
                        </div>
                        <div
                          className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[12px] whitespace-nowrap"
                          data-node-id="5:803"
                        >
                          <p className="leading-[16px]">14 Février 2025</p>
                        </div>
                      </div>
                      <div
                        className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-[min(281.92px,calc(100%-14px))] top-[calc(50%-14px)]"
                        data-node-id="5:804"
                        data-name="Container"
                      >
                        <div
                          className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[12px] whitespace-nowrap"
                          data-node-id="5:805"
                        >
                          <p className="leading-[16px]" data-decorative-separator="true">•</p>
                        </div>
                      </div>
                      <div
                        className="-translate-y-1/2 absolute content-stretch flex gap-[4px] items-center left-0 top-[calc(50%+13.75px)]"
                        data-node-id="5:806"
                        data-name="Container"
                      >
                        <div
                          className="relative shrink-0 size-[13.333px]"
                          data-node-id="5:807"
                          data-name="Container"
                        >
                          <img
                            alt=""
                            className="absolute block inset-0 max-w-none size-full"
                            src={imgContainer13}
                          />
                        </div>
                        <div
                          className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-accent-700 text-[12px] whitespace-nowrap"
                          data-node-id="5:809"
                        >
                          <p className="leading-[16px]">6 min de lecture</p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                      data-node-id="5:810"
                      data-name="Heading 2 - Grand Titre"
                    >
                      <div
                        className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-900 text-[30px] w-full"
                        data-node-id="5:811"
                      >
                        <p className="leading-[38px] mb-0">
                          De la terre battue aux
                        </p>
                        <p className="leading-[38px] mb-0">
                          pupitres en bois noble :
                        </p>
                        <p className="leading-[38px] mb-0">comment Dimako a</p>
                        <p className="leading-[38px] mb-0">redonné le goût</p>
                        <p className="leading-[38px] mb-0">{`d'apprendre à 340`}</p>
                        <p className="leading-[38px]">écoliers</p>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex flex-col items-start pb-[8px] relative shrink-0 w-full"
                      data-node-id="5:812"
                      data-name="Chapeau de presse"
                    >
                      <div
                        className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[16px] w-full"
                        data-node-id="5:813"
                      >
                        <p className="leading-[26px] mb-0">{`Dans le département du Haut-Nyong à l'Est du`}</p>
                        <p className="leading-[26px] mb-0">
                          Cameroun, trois salles de classe menaçaient de
                        </p>
                        <p className="leading-[26px] mb-0">{`s'effondrer. Retour en images sur trois mois d'une`}</p>
                        <p className="leading-[26px] mb-0">
                          mobilisation communautaire exemplaire entre
                        </p>
                        <p className="leading-[26px]">{`artisans locaux, enseignants et Children's Smile.`}</p>
                      </div>
                    </div>
                    <div
                      className="bg-surface-muted gap-x-[12px] gap-y-[12px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[__20px_20px] p-[12px] relative rounded-control shrink-0 w-full"
                      data-node-id="5:814"
                      data-name="Points clés d'impact"
                    >
                      <div
                        className="col-1 content-stretch flex gap-[8px] h-[20px] items-center justify-self-stretch relative row-1 shrink-0"
                        data-node-id="5:815"
                        data-name="Container"
                      >
                        <div
                          className="relative shrink-0 size-[16.667px]"
                          data-node-id="5:816"
                          data-name="Container"
                        >
                          <img
                            alt=""
                            className="absolute block inset-0 max-w-none size-full"
                            src={imgContainer14}
                          />
                        </div>
                        <div
                          className="content-stretch flex flex-col items-start relative shrink-0"
                          data-node-id="5:818"
                          data-name="Container"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-900 text-[12px] whitespace-nowrap"
                            data-node-id="5:819"
                          >
                            <p className="leading-[16px]">
                              340 écoliers abrités
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-2 content-stretch flex gap-[8px] h-[20px] items-center justify-self-stretch relative row-1 shrink-0"
                        data-node-id="5:820"
                        data-name="Container"
                      >
                        <div
                          className="relative shrink-0 size-[16.667px]"
                          data-node-id="5:821"
                          data-name="Container"
                        >
                          <img
                            alt=""
                            className="absolute block inset-0 max-w-none size-full"
                            src={imgContainer14}
                          />
                        </div>
                        <div
                          className="content-stretch flex flex-col items-start relative shrink-0"
                          data-node-id="5:823"
                          data-name="Container"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-900 text-[12px] whitespace-nowrap"
                            data-node-id="5:824"
                          >
                            <p className="leading-[16px]">
                              100% bois local certifié
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-1 content-stretch flex gap-[8px] h-[20px] items-center justify-self-stretch relative row-2 shrink-0"
                        data-node-id="5:825"
                        data-name="Container"
                      >
                        <div
                          className="relative shrink-0 size-[16.667px]"
                          data-node-id="5:826"
                          data-name="Container"
                        >
                          <img
                            alt=""
                            className="absolute block inset-0 max-w-none size-full"
                            src={imgContainer14}
                          />
                        </div>
                        <div
                          className="content-stretch flex flex-col items-start relative shrink-0"
                          data-node-id="5:828"
                          data-name="Container"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-900 text-[12px] whitespace-nowrap"
                            data-node-id="5:829"
                          >
                            <p className="leading-[16px]">
                              12 menuisiers formés
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-2 content-stretch flex gap-[8px] h-[20px] items-center justify-self-stretch relative row-2 shrink-0"
                        data-node-id="5:830"
                        data-name="Container"
                      >
                        <div
                          className="relative shrink-0 size-[16.667px]"
                          data-node-id="5:831"
                          data-name="Container"
                        >
                          <img
                            alt=""
                            className="absolute block inset-0 max-w-none size-full"
                            src={imgContainer14}
                          />
                        </div>
                        <div
                          className="content-stretch flex flex-col items-start relative shrink-0"
                          data-node-id="5:833"
                          data-name="Container"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-900 text-[12px] whitespace-nowrap"
                            data-node-id="5:834"
                          >
                            <p className="leading-[16px]">
                              Comité de suivi villageois
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="content-stretch flex items-center justify-between pt-[16px] relative shrink-0 w-full"
                    data-node-id="5:835"
                    data-name="Pied de la carte / Call to action"
                  >
                    <div
                      className="content-stretch flex gap-[11.99px] items-center relative shrink-0"
                      data-node-id="5:836"
                      data-name="Container"
                    >
                      <div
                        className="bg-brand-100 content-stretch flex flex-col items-center justify-center relative rounded-pill shrink-0 size-[40px]"
                        data-node-id="5:837"
                        data-name="Background"
                      >
                        <div
                          className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-900 text-[16px] text-center whitespace-nowrap"
                          data-node-id="5:838"
                        >
                          <p className="leading-[24px]">CT</p>
                        </div>
                      </div>
                      <div
                        className="content-stretch flex flex-col items-start relative shrink-0"
                        data-node-id="5:839"
                        data-name="Container"
                      >
                        <div
                          className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                          data-node-id="5:840"
                          data-name="Container"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-900 text-[12px] whitespace-nowrap"
                            data-node-id="5:841"
                          >
                            <p className="leading-[16px] mb-0">
                              Coordination Terrain
                            </p>
                            <p className="leading-[16px]">Est</p>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                          data-node-id="5:842"
                          data-name="Container"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-ink-700 text-[11px] whitespace-nowrap"
                            data-node-id="5:843"
                          >
                            <p className="leading-[16px]">
                              Cellule de Reportage
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="bg-brand-900 content-stretch flex gap-[8px] items-center justify-center relative rounded-pill shrink-0 btn-md btn"
                      data-node-id="5:844"
                      data-name="Link"
                    >
                      <div
                        className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-pill shadow-float"
                        data-node-id="5:845"
                        data-name="Link:shadow"
                      />
                      <div
                        className="content-stretch flex flex-col items-start pr-[56.11px] relative shrink-0"
                        data-node-id="5:846"
                        data-name="Container"
                      >
                        <div
                          className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap"
                          data-node-id="5:847"
                        >
                          <p className="leading-[20px] mb-0">Lire le grand</p>
                          <p className="leading-[20px]">reportage</p>
                        </div>
                      </div>
                      <div
                        className="relative shrink-0 size-[12px]"
                        data-node-id="5:848"
                        data-name="Container"
                      >
                        <img
                          alt=""
                          className="absolute block inset-0 max-w-none size-full"
                          src={imgContainer15}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="content-stretch flex flex-col items-start pb-[32px] relative shrink-0 w-full shell"
              data-node-id="5:850"
              data-name="Section - FILTRE ACTIF & COMPTEUR DE REPORTAGES:margin"
            >
              <div
                className="bg-surface-muted content-stretch flex items-center justify-between p-[16px] relative rounded-card shrink-0 w-full"
                data-node-id="5:851"
                data-name="Section - FILTRE ACTIF & COMPTEUR DE REPORTAGES"
              >
                <div
                  className="content-stretch flex gap-[12px] items-center relative shrink-0"
                  data-node-id="5:852"
                  data-name="Container"
                >
                  <div
                    className="bg-accent-700 relative rounded-pill shrink-0 size-[12px]"
                    data-node-id="5:853"
                    data-name="Background"
                  />
                  <div
                    className="content-stretch flex flex-col items-start relative shrink-0"
                    data-node-id="5:854"
                    data-name="Heading 3"
                  >
                    <div
                      className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-900 text-[20px] whitespace-nowrap"
                      data-node-id="5:855"
                    >
                      <p className="leading-[28px]">{`Derniers Reportages & Notes de Mission`}</p>
                    </div>
                  </div>
                  <div
                    className="bg-surface-subtle content-stretch drop-shadow-card flex flex-col items-start px-[10px] py-[4px] relative rounded-pill shrink-0"
                    data-node-id="5:856"
                    data-name="Background+Shadow"
                  >
                    <div
                      className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-900 text-[11px] whitespace-nowrap"
                      data-node-id="5:857"
                    >
                      <p className="leading-[16px]">6 articles récents</p>
                    </div>
                  </div>
                </div>
                <div
                  className="content-stretch flex flex-col items-start relative shrink-0 w-[288px]"
                  data-node-id="5:858"
                  data-name="Barre de recherche rapide"
                >
                  <div
                    className="bg-white content-stretch flex items-start justify-center overflow-clip pb-[10px] pl-[36px] pr-[16px] pt-[9px] relative rounded-pill shadow-raised shrink-0 w-full"
                    data-node-id="5:859"
                    data-name="Input"
                  >
                    <div
                      className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative"
                      data-node-id="5:860"
                      data-name="Container"
                    >
                      <div
                        className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-ink-500 text-[14px] whitespace-nowrap"
                        data-node-id="5:861"
                      >
                        <p className="leading-[normal]">
                          Rechercher par village, région, thème...
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="absolute left-[14.25px] size-[13.5px] top-[12.25px]"
                    data-node-id="5:862"
                    data-name="Icon"
                  >
                    <img
                      alt=""
                      className="absolute block inset-0 max-w-none size-full"
                      src={imgIcon}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
                id="news-grid"
                role="tabpanel"
                aria-label="Articles et reportages"
              className="content-stretch flex flex-col items-start pb-[64px] relative shrink-0 w-full shell"
              data-node-id="5:863"
              data-name="Section - GRILLE DES HISTOIRES ET REPORTAGES RÉCENTS:margin"
            >
              <div
                className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full"
                data-node-id="5:864"
                data-name="Section - GRILLE DES HISTOIRES ET REPORTAGES RÉCENTS"
              >
                <div
                  className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full"
                  data-node-id="50:617"
                  data-name="Row 1"
                  style={{ display: hiddenNewsRows.has("5:865") ? "none" : undefined }}
                >
                  <div
                    className="bg-white content-stretch flex flex-[1_0_0] flex-col h-[544.3px] items-start min-w-px overflow-clip relative rounded-card shadow-raised"
                    data-news-category="field protection"
                    data-node-id="5:865"
                    style={{ display: hiddenNews.has("5:865") ? "none" : undefined }}
                    data-name="Article - ARTICLE 1: EAU & SANTÉ SCOLAIRE"
                  >
                    <div
                      className="content-stretch flex flex-col h-[224px] items-start justify-center overflow-clip relative shrink-0 w-full"
                      data-node-id="5:892"
                      data-name="Container"
                    >
                      <div
                        className="flex-[1_0_0] min-h-px relative w-full"
                        data-node-id="5:893"
                        data-name="AB6AXuD66RnhFdYNN2QdgGRLrj4pyQXLSWddx2yW7NOe6khOhrtv-Xae1MUxI2XMu0ymfTG6Lg--2R2z5yOAM5iPi-EFDrKupC2Gw8JSyv6slHnh_VoqWqeEslhd-znnZXKyDC-reayl_LzaH-weEoARXSQbbJvZIoWscpEOAHl0614VUAcylOLaSQJQNHMiLffpTBXl5Rju6NiU9U97eXdSeU-9k55E5cq37LWhMu4pXOtecl65ninEHWGtDw"
                      >
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                          <img
                            alt=""
                            className="absolute h-full left-[-5.05%] max-w-none top-0 w-[110.11%]"
                            src={
                              imgAb6AXuD66RnhFdYnn2QdgGrLrj4PyQxlsWddx2YW7NOe6KhOhrtvXae1MUxI2XMu0YmfTg6Lg2R2Z5YOam5IPiEfDrKupC2Gw8JSyv6SlHnhVoqWqeEslhdZnnZxKyDcReaylLzaHWeEoArxsQbbJvZIoWscpEoaHl0614VuAcylOLaSqjqnhMiLffpTbXl5Rju6NiU9U97EXdSeU9K55E5Cq37LWhMu4PXOtecl65NinEhwGtDw
                            }
                          />
                        </div>
                      </div>
                      <div
                        className="absolute backdrop-blur-[6px] bg-[rgba(255,255,255,0.95)] content-stretch flex gap-[6px] items-center left-[12px] px-[12px] py-[4px] rounded-pill shadow-raised top-[12px]"
                        data-node-id="5:894"
                        data-name="Background+Shadow+OverlayBlur"
                      >
                        <div
                          className="h-[11.667px] relative shrink-0 w-[9.333px]"
                          data-node-id="5:895"
                          data-name="Container"
                        >
                          <img
                            alt=""
                            className="absolute block inset-0 max-w-none size-full"
                            src={imgContainer16}
                          />
                        </div>
                        <div
                          className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-900 text-[11px] uppercase whitespace-nowrap"
                          data-node-id="5:897"
                        >
                          <p className="leading-[16px]">{`EAU & SANTÉ SCOLAIRE`}</p>
                        </div>
                      </div>
                      <div
                        className="absolute backdrop-blur-[2px] bg-[rgba(40,48,68,0.8)] bottom-[12px] content-stretch flex flex-col items-start px-[10px] py-[2px] right-[12px] rounded-control"
                        data-node-id="5:898"
                        data-name="Overlay+OverlayBlur"
                      >
                        <div
                          className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-050 text-[11px] whitespace-nowrap"
                          data-node-id="5:899"
                        >
                          <p className="leading-[16px]">Mora • Extrême-Nord</p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex flex-col items-start justify-between p-[24px] relative shrink-0 w-full"
                      data-node-id="5:866"
                      data-name="Container"
                    >
                      <div
                        className="content-stretch flex flex-col gap-[9.3px] items-start pb-[16px] relative shrink-0 w-full"
                        data-node-id="5:867"
                        data-name="Container"
                      >
                        <div
                          className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full"
                          data-node-id="5:868"
                          data-name="Container"
                        >
                          <div
                            className="h-[12.5px] relative shrink-0 w-[11.25px]"
                            data-node-id="5:869"
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
                            data-node-id="5:871"
                            data-name="Container"
                          >
                            <div
                              className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[12px] whitespace-nowrap"
                              data-node-id="5:872"
                            >
                              <p className="leading-[16px]">28 Janvier 2025</p>
                            </div>
                          </div>
                          <div
                            className="content-stretch flex flex-col items-start relative shrink-0"
                            data-node-id="5:873"
                            data-name="Container"
                          >
                            <div
                              className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[12px] whitespace-nowrap"
                              data-node-id="5:874"
                            >
                              <p className="leading-[16px]" data-decorative-separator="true">•</p>
                            </div>
                          </div>
                          <div
                            className="content-stretch flex flex-col items-start relative shrink-0"
                            data-node-id="5:875"
                            data-name="Container"
                          >
                            <div
                              className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-accent-700 text-[12px] whitespace-nowrap"
                              data-node-id="5:876"
                            >
                              <p className="leading-[16px]">
                                Mission Hydraulique
                              </p>
                            </div>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex flex-col items-start pb-[0.75px] relative shrink-0 w-full"
                          data-node-id="5:877"
                          data-name="Heading 4"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-900 text-[20px] w-full"
                            data-node-id="5:878"
                          >
                            <p className="leading-[27.5px] mb-0">
                              Forage solaire à Mora : quand
                            </p>
                            <p className="leading-[27.5px] mb-0">{`l'accès à l'eau potable stabilise`}</p>
                            <p className="leading-[27.5px] mb-0">
                              la scolarisation des jeunes
                            </p>
                            <p className="leading-[27.5px]">filles</p>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex flex-col items-start pt-[1.45px] relative shrink-0 w-full"
                          data-node-id="5:879"
                          data-name="Container"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] w-full"
                            data-node-id="5:880"
                          >
                            <p className="leading-[22.75px] mb-0">{`L'installation d'une borne fontaine sécurisée`}</p>
                            <p className="leading-[22.75px] mb-0">{`dans l'école réduit drastiquement l'absentéisme`}</p>
                            <p className="leading-[22.75px]">
                              saisonnier et écarte les maladies hydriques.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="content-stretch flex items-center justify-between pt-[16px] relative shrink-0 w-full"
                        data-node-id="5:881"
                        data-name="Container"
                      >
                        <div
                          className="content-stretch flex gap-[4px] items-center relative shrink-0"
                          data-node-id="5:882"
                          data-name="Container"
                        >
                          <div
                            className="relative shrink-0 size-[13.333px]"
                            data-node-id="5:883"
                            data-name="Container"
                          >
                            <img
                              alt=""
                              className="absolute block inset-0 max-w-none size-full"
                              src={imgContainer18}
                            />
                          </div>
                          <div
                            className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-ink-700 text-[11px] whitespace-nowrap"
                            data-node-id="5:885"
                          >
                            <p className="leading-[16px]">4 min de lecture</p>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex gap-[4px] items-center relative shrink-0"
                          data-node-id="5:886"
                          data-name="Link"
                        >
                          <div
                            className="content-stretch flex flex-col items-start relative shrink-0"
                            data-node-id="5:887"
                            data-name="Container"
                          >
                            <div
                              className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-brand-900 text-[14px] whitespace-nowrap"
                              data-node-id="5:888"
                            >
                              <p className="leading-[20px]">Découvrir</p>
                            </div>
                          </div>
                          <div
                            className="relative shrink-0 size-[10.667px]"
                            data-node-id="5:889"
                            data-name="Container"
                          >
                            <img
                              alt=""
                              className="absolute block inset-0 max-w-none size-full"
                              src={imgContainer19}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="bg-accent-700 h-[4px] relative shrink-0 w-[373.33px]"
                      data-node-id="5:891"
                      data-name="Accent indicator strip"
                    />
                  </div>
                  <div
                    className="bg-white content-stretch flex flex-[1_0_0] flex-col h-[544.3px] items-start min-w-px overflow-clip relative rounded-card shadow-raised"
                    data-news-category="education field"
                    data-node-id="5:900"
                    style={{ display: hiddenNews.has("5:900") ? "none" : undefined }}
                    data-name="Article - ARTICLE 2: ÉDUCATION & BILINGUISME"
                  >
                    <div
                      className="content-stretch flex flex-col h-[224px] items-start justify-center overflow-clip relative shrink-0 w-full"
                      data-node-id="5:927"
                      data-name="Container"
                    >
                      <div
                        className="flex-[1_0_0] min-h-px relative w-full"
                        data-node-id="5:928"
                        data-name="AB6AXuAmRgs_14aOFTZhmXNlCR_tkmmPpDViKjcWs-Uofz0Oj9M0dKTx-9sWDkiU-zzzNa7QZSiT2BeD10b6Bx0UjcFKJisXIPx7zadFJs8dEylybmyxx16rpGH1kJcTGQdS_c0BuDXrDCO0Ts0KYLlEhV81IKAtAGt9eA1Z0cCyXKDJBb0YQiInD7l1D3I3SRih2ZrF1KxE_ZeWPwa3xTr3kOKhW8vQtfZzunltujKrBAnNp7OjGHdmqx33bQ"
                      >
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                          <img
                            alt=""
                            className="absolute h-full left-[-5.05%] max-w-none top-0 w-[110.11%]"
                            src={
                              imgAb6AXuAmRgs14AOftZhmXNlCrTkmmPpDViKjcWsUofz0Oj9M0DKTx9SWDkiUZzzNa7QzSiT2BeD10B6Bx0UjcFkJisXiPx7ZadFJs8DEylybmyxx16RpGh1KJcTgQdSC0BuDXrDco0Ts0KyLlEhV81IkAtAGt9EA1Z0CCyXkdjBb0YQiInD7L1D3I3SRih2ZrF1KxEZeWPwa3XTr3KOKhW8VQtfZzunltujKrBAnNp7OjGHdmqx33BQ
                            }
                          />
                        </div>
                      </div>
                      <div
                        className="absolute backdrop-blur-[6px] bg-[rgba(255,255,255,0.95)] content-stretch flex gap-[5.99px] items-center left-[12px] px-[12px] py-[4px] rounded-pill shadow-raised top-[12px]"
                        data-node-id="5:929"
                        data-name="Background+Shadow+OverlayBlur"
                      >
                        <div
                          className="h-[11.375px] relative shrink-0 w-[12.833px]"
                          data-node-id="5:930"
                          data-name="Container"
                        >
                          <img
                            alt=""
                            className="absolute block inset-0 max-w-none size-full"
                            src={imgContainer20}
                          />
                        </div>
                        <div
                          className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-900 text-[11px] uppercase whitespace-nowrap"
                          data-node-id="5:932"
                        >
                          <p className="leading-[16px]">{`ÉDUCATION & BILINGUISME`}</p>
                        </div>
                      </div>
                      <div
                        className="absolute backdrop-blur-[2px] bg-[rgba(40,48,68,0.8)] bottom-[12px] content-stretch flex flex-col items-start px-[10px] py-[2px] right-[12px] rounded-control"
                        data-node-id="5:933"
                        data-name="Overlay+OverlayBlur"
                      >
                        <div
                          className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-050 text-[11px] whitespace-nowrap"
                          data-node-id="5:934"
                        >
                          <p className="leading-[16px]">Penja • Littoral</p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex flex-col items-start justify-between p-[24px] relative shrink-0 w-full"
                      data-node-id="5:901"
                      data-name="Container"
                    >
                      <div
                        className="content-stretch flex flex-col gap-[9.3px] items-start pb-[16px] relative shrink-0 w-full"
                        data-node-id="5:902"
                        data-name="Container"
                      >
                        <div
                          className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full"
                          data-node-id="5:903"
                          data-name="Container"
                        >
                          <div
                            className="h-[12.5px] relative shrink-0 w-[11.25px]"
                            data-node-id="5:904"
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
                            data-node-id="5:906"
                            data-name="Container"
                          >
                            <div
                              className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[12px] whitespace-nowrap"
                              data-node-id="5:907"
                            >
                              <p className="leading-[16px]">15 Janvier 2025</p>
                            </div>
                          </div>
                          <div
                            className="content-stretch flex flex-col items-start relative shrink-0"
                            data-node-id="5:908"
                            data-name="Container"
                          >
                            <div
                              className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[12px] whitespace-nowrap"
                              data-node-id="5:909"
                            >
                              <p className="leading-[16px]" data-decorative-separator="true">•</p>
                            </div>
                          </div>
                          <div
                            className="content-stretch flex flex-col items-start relative shrink-0"
                            data-node-id="5:910"
                            data-name="Container"
                          >
                            <div
                              className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-brand-900 text-[12px] whitespace-nowrap"
                              data-node-id="5:911"
                            >
                              <p className="leading-[16px]">Pédagogie Rurale</p>
                            </div>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex flex-col items-start pb-[0.75px] relative shrink-0 w-full"
                          data-node-id="5:912"
                          data-name="Heading 4"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-900 text-[20px] w-full"
                            data-node-id="5:913"
                          >
                            <p className="leading-[27.5px] mb-0">
                              1 200 livres jeunesse livrés à
                            </p>
                            <p className="leading-[27.5px] mb-0">
                              Penja : ouverture de la
                            </p>
                            <p className="leading-[27.5px] mb-0">
                              première bibliothèque rurale
                            </p>
                            <p className="leading-[27.5px]">partagée</p>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex flex-col items-start pt-[1.45px] relative shrink-0 w-full"
                          data-node-id="5:914"
                          data-name="Container"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] w-full"
                            data-node-id="5:915"
                          >
                            <p className="leading-[22.75px] mb-0">
                              Contes camerounais, dictionnaires et albums
                            </p>
                            <p className="leading-[22.75px] mb-0">
                              illustrés : les enseignants bénéficient désormais
                            </p>
                            <p className="leading-[22.75px]">{`d'un fond pédagogique bilingue de référence.`}</p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="content-stretch flex items-center justify-between pt-[16px] relative shrink-0 w-full"
                        data-node-id="5:916"
                        data-name="Container"
                      >
                        <div
                          className="content-stretch flex gap-[4px] items-center relative shrink-0"
                          data-node-id="5:917"
                          data-name="Container"
                        >
                          <div
                            className="relative shrink-0 size-[13.333px]"
                            data-node-id="5:918"
                            data-name="Container"
                          >
                            <img
                              alt=""
                              className="absolute block inset-0 max-w-none size-full"
                              src={imgContainer18}
                            />
                          </div>
                          <div
                            className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-ink-700 text-[11px] whitespace-nowrap"
                            data-node-id="5:920"
                          >
                            <p className="leading-[16px]">5 min de lecture</p>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex gap-[4px] items-center relative shrink-0"
                          data-node-id="5:921"
                          data-name="Link"
                        >
                          <div
                            className="content-stretch flex flex-col items-start relative shrink-0"
                            data-node-id="5:922"
                            data-name="Container"
                          >
                            <div
                              className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-brand-900 text-[14px] whitespace-nowrap"
                              data-node-id="5:923"
                            >
                              <p className="leading-[20px]">Découvrir</p>
                            </div>
                          </div>
                          <div
                            className="relative shrink-0 size-[10.667px]"
                            data-node-id="5:924"
                            data-name="Container"
                          >
                            <img
                              alt=""
                              className="absolute block inset-0 max-w-none size-full"
                              src={imgContainer19}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="bg-brand-900 h-[4px] relative shrink-0 w-[373.33px]"
                      data-node-id="5:926"
                      data-name="Background"
                    />
                  </div>
                  <div
                    className="bg-white content-stretch flex flex-[1_0_0] flex-col h-[544.3px] items-start min-w-px overflow-clip relative rounded-card shadow-raised"
                    data-news-category="association"
                    data-node-id="5:935"
                    style={{ display: hiddenNews.has("5:935") ? "none" : undefined }}
                    data-name="Article - ARTICLE 3: VIE DE L'ASSOCIATION & GOUVERNANCE"
                  >
                    <div
                      className="content-stretch flex flex-col h-[224px] items-start justify-center overflow-clip relative shrink-0 w-full"
                      data-node-id="5:962"
                      data-name="Container"
                    >
                      <div
                        className="flex-[1_0_0] min-h-px relative w-full"
                        data-node-id="5:963"
                        data-name="AB6AXuAJdDjpVzbKdzdz3VjUrk1VRSWZGZy3Q_Jfsclz3-_fsWQNlG6Tr28dxDqkkCAaqrcldzlUUgYEkedCyORCa-WbulPwpgeaQDW0mr9La6oCQlVarf_QP4su06G_K_EoakH0pfu2Og-NEpiiUKINlq75UCN_b0Enc6U_PC-vdUXPG9RJ6oGdcPg-vV5qTQXkhb61kykOVC4AJrGVOfTjjZ-GOhJ6MS9hO4klulV-XFRFUELSMdOv4Luidg"
                      >
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                          <img
                            alt=""
                            className="absolute h-full left-[-5.05%] max-w-none top-0 w-[110.11%]"
                            src={
                              imgAb6AXuAJdDjpVzbKdzdz3VjUrk1VrswzgZy3QJfsclz3FsWqNlG6Tr28DxDqkkCAaqrcldzlUUgYEkedCyOrCaWbulPwpgeaQdw0Mr9La6OCQlVarfQp4Su06GKEoakH0Pfu2OgNEpiiUkiNlq75UcnB0Enc6UPcVdUxpg9Rj6OGdcPgVV5QTqXkhb61KykOvc4AJrGvOfTjjZGOhJ6Ms9HO4KlulVXfrfuelsMdOv4Luidg
                            }
                          />
                        </div>
                      </div>
                      <div
                        className="absolute backdrop-blur-[6px] bg-[rgba(255,255,255,0.95)] content-stretch flex gap-[5.99px] items-center left-[12px] px-[12px] py-[4px] rounded-pill shadow-raised top-[12px]"
                        data-node-id="5:964"
                        data-name="Background+Shadow+OverlayBlur"
                      >
                        <div
                          className="relative shrink-0 size-[11.667px]"
                          data-node-id="5:965"
                          data-name="Container"
                        >
                          <img
                            alt=""
                            className="absolute block inset-0 max-w-none size-full"
                            src={imgContainer21}
                          />
                        </div>
                        <div
                          className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-warn-700 text-[11px] uppercase whitespace-nowrap"
                          data-node-id="5:967"
                        >
                          <p className="leading-[16px]">{`VIE ASSOCIATIVE & GOUVERNANCE`}</p>
                        </div>
                      </div>
                      <div
                        className="absolute backdrop-blur-[2px] bg-[rgba(40,48,68,0.8)] bottom-[12px] content-stretch flex flex-col items-start px-[10px] py-[2px] right-[11.99px] rounded-control"
                        data-node-id="5:968"
                        data-name="Overlay+OverlayBlur"
                      >
                        <div
                          className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-050 text-[11px] whitespace-nowrap"
                          data-node-id="5:969"
                        >
                          <p className="leading-[16px]">Siège • Yaoundé</p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex flex-col items-start justify-between p-[24px] relative shrink-0 w-full"
                      data-node-id="5:936"
                      data-name="Container"
                    >
                      <div
                        className="content-stretch flex flex-col gap-[9.3px] items-start pb-[16px] relative shrink-0 w-full"
                        data-node-id="5:937"
                        data-name="Container"
                      >
                        <div
                          className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full"
                          data-node-id="5:938"
                          data-name="Container"
                        >
                          <div
                            className="h-[12.5px] relative shrink-0 w-[11.25px]"
                            data-node-id="5:939"
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
                            data-node-id="5:941"
                            data-name="Container"
                          >
                            <div
                              className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[12px] whitespace-nowrap"
                              data-node-id="5:942"
                            >
                              <p className="leading-[16px]">20 Décembre 2024</p>
                            </div>
                          </div>
                          <div
                            className="content-stretch flex flex-col items-start relative shrink-0"
                            data-node-id="5:943"
                            data-name="Container"
                          >
                            <div
                              className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[12px] whitespace-nowrap"
                              data-node-id="5:944"
                            >
                              <p className="leading-[16px]" data-decorative-separator="true">•</p>
                            </div>
                          </div>
                          <div
                            className="content-stretch flex flex-col items-start relative shrink-0"
                            data-node-id="5:945"
                            data-name="Container"
                          >
                            <div
                              className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-warn-700 text-[12px] whitespace-nowrap"
                              data-node-id="5:946"
                            >
                              <p className="leading-[16px]">Audit Certifié</p>
                            </div>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex flex-col items-start pb-[0.75px] relative shrink-0 w-full"
                          data-node-id="5:947"
                          data-name="Heading 4"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-900 text-[20px] w-full"
                            data-node-id="5:948"
                          >
                            <p className="leading-[27.5px] mb-0">{`Clôture de l'Assemblée`}</p>
                            <p className="leading-[27.5px] mb-0">
                              Générale 2024 : validation
                            </p>
                            <p className="leading-[27.5px] mb-0">
                              unanime des comptes audités
                            </p>
                            <p className="leading-[27.5px]">et cap sur 2025</p>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex flex-col items-start pt-[1.45px] relative shrink-0 w-full"
                          data-node-id="5:949"
                          data-name="Container"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] w-full"
                            data-node-id="5:950"
                          >
                            <p className="leading-[22.75px] mb-0">
                              Présentation détaillée du rapport moral et
                            </p>
                            <p className="leading-[22.75px] mb-0">{`financier, réélection du Conseil d'Administration`}</p>
                            <p className="leading-[22.75px]">
                              et priorité absolue aux écoles enclavées.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="content-stretch flex items-center justify-between pt-[16px] relative shrink-0 w-full"
                        data-node-id="5:951"
                        data-name="Container"
                      >
                        <div
                          className="content-stretch flex gap-[4px] items-center relative shrink-0"
                          data-node-id="5:952"
                          data-name="Container"
                        >
                          <div
                            className="relative shrink-0 size-[13.333px]"
                            data-node-id="5:953"
                            data-name="Container"
                          >
                            <img
                              alt=""
                              className="absolute block inset-0 max-w-none size-full"
                              src={imgContainer18}
                            />
                          </div>
                          <div
                            className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-ink-700 text-[11px] whitespace-nowrap"
                            data-node-id="5:955"
                          >
                            <p className="leading-[16px]">7 min de lecture</p>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex gap-[4px] items-center relative shrink-0"
                          data-node-id="5:956"
                          data-name="Link"
                        >
                          <div
                            className="content-stretch flex flex-col items-start relative shrink-0"
                            data-node-id="5:957"
                            data-name="Container"
                          >
                            <div
                              className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-brand-900 text-[14px] whitespace-nowrap"
                              data-node-id="5:958"
                            >
                              <p className="leading-[20px]">Lire le bilan</p>
                            </div>
                          </div>
                          <div
                            className="relative shrink-0 size-[10.667px]"
                            data-node-id="5:959"
                            data-name="Container"
                          >
                            <img
                              alt=""
                              className="absolute block inset-0 max-w-none size-full"
                              src={imgContainer19}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="bg-warn-700 h-[4px] relative shrink-0 w-[373.34px]"
                      data-node-id="5:961"
                      data-name="Background"
                    />
                  </div>
                </div>
                <div
                  className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full"
                  data-node-id="50:618"
                  data-name="Row 2"
                  style={{ display: hiddenNewsRows.has("5:970") ? "none" : undefined }}
                >
                  <div
                    className="bg-white content-stretch flex flex-[1_0_0] flex-col h-[544.3px] items-start min-w-px overflow-clip relative rounded-card shadow-raised"
                    data-news-category="protection stories"
                    data-node-id="5:970"
                    style={{ display: hiddenNews.has("5:970") ? "none" : undefined }}
                    data-name="Article - ARTICLE 4: PROTECTION DE L'ENFANT"
                  >
                    <div
                      className="content-stretch flex flex-col h-[224px] items-start justify-center overflow-clip relative shrink-0 w-full"
                      data-node-id="5:997"
                      data-name="Container"
                    >
                      <div
                        className="flex-[1_0_0] min-h-px relative w-full"
                        data-node-id="5:998"
                        data-name="AB6AXuDWtlsScn_Vk3-xRYXdeSaOgMtvJ-YNl99OD7jHyDDw5-ZQPp93gmJz_keOo_CzHCZKo0uw4f7LTEQGXuVkBkIVEL-p0da2EyX_zrP0-10dq2orGcqBK56V9t46PtlM0fO60M5WBuuh8SB9d2hkc4K7Efjo5WvCBZ-EddclZp82tMn6-cebHJjJ_AcfZQlP724Fxyb4SIGBJh2NKbNqkTbQYOvBDRXW0_5MpCFiPtltfc-4FBNuSSO7GA"
                      >
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                          <img
                            alt=""
                            className="absolute h-full left-[-5.05%] max-w-none top-0 w-[110.11%]"
                            src={
                              imgAb6AXuDWtlsScnVk3XRyXdeSaOgMtvJYNl99Od7JHyDDw5ZqPp93GmJzKeOoCzHczKo0Uw4F7LteqgXuVkBkIvelP0Da2EyXZrP010Dq2OrGcqBk56V9T46PtlM0FO60M5WBuuh8Sb9D2Hkc4K7Efjo5WvCbzEddclZp82TMn6CebHJjJAcfZQlP724Fxyb4SigbJh2NKbNqkTbQyOvBdrxw05MpCFiPtltfc4FbNuSso7Ga
                            }
                          />
                        </div>
                      </div>
                      <div
                        className="absolute backdrop-blur-[6px] bg-[rgba(255,255,255,0.95)] content-stretch flex gap-[6px] items-center left-[12px] px-[12px] py-[4px] rounded-pill shadow-raised top-[12px]"
                        data-node-id="5:999"
                        data-name="Background+Shadow+OverlayBlur"
                      >
                        <div
                          className="h-[11.667px] relative shrink-0 w-[9.333px]"
                          data-node-id="5:1000"
                          data-name="Container"
                        >
                          <img
                            alt=""
                            className="absolute block inset-0 max-w-none size-full"
                            src={imgContainer22}
                          />
                        </div>
                        <div
                          className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-accent-700 text-[11px] uppercase whitespace-nowrap"
                          data-node-id="5:1002"
                        >
                          <p className="leading-[16px]">{`PROTECTION DE L'ENFANT`}</p>
                        </div>
                      </div>
                      <div
                        className="absolute backdrop-blur-[2px] bg-[rgba(40,48,68,0.8)] bottom-[12px] content-stretch flex flex-col items-start px-[10px] py-[2px] right-[12.01px] rounded-control"
                        data-node-id="5:1003"
                        data-name="Overlay+OverlayBlur"
                      >
                        <div
                          className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-050 text-[11px] whitespace-nowrap"
                          data-node-id="5:1004"
                        >
                          <p className="leading-[16px]">
                            Ngambé-Tikar • Centre
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex flex-col items-start justify-between p-[24px] relative shrink-0 w-full"
                      data-node-id="5:971"
                      data-name="Container"
                    >
                      <div
                        className="content-stretch flex flex-col gap-[9.3px] items-start pb-[16px] relative shrink-0 w-full"
                        data-node-id="5:972"
                        data-name="Container"
                      >
                        <div
                          className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full"
                          data-node-id="5:973"
                          data-name="Container"
                        >
                          <div
                            className="h-[12.5px] relative shrink-0 w-[11.25px]"
                            data-node-id="5:974"
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
                            data-node-id="5:976"
                            data-name="Container"
                          >
                            <div
                              className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[12px] whitespace-nowrap"
                              data-node-id="5:977"
                            >
                              <p className="leading-[16px]">05 Décembre 2024</p>
                            </div>
                          </div>
                          <div
                            className="content-stretch flex flex-col items-start relative shrink-0"
                            data-node-id="5:978"
                            data-name="Container"
                          >
                            <div
                              className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[12px] whitespace-nowrap"
                              data-node-id="5:979"
                            >
                              <p className="leading-[16px]" data-decorative-separator="true">•</p>
                            </div>
                          </div>
                          <div
                            className="content-stretch flex flex-col items-start relative shrink-0"
                            data-node-id="5:980"
                            data-name="Container"
                          >
                            <div
                              className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-accent-700 text-[12px] whitespace-nowrap"
                              data-node-id="5:981"
                            >
                              <p className="leading-[16px]">Formation Pilote</p>
                            </div>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex flex-col items-start pb-[0.75px] relative shrink-0 w-full"
                          data-node-id="5:982"
                          data-name="Heading 4"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-900 text-[20px] w-full"
                            data-node-id="5:983"
                          >
                            <p className="leading-[27.5px] mb-0">
                              Formation de 45 maîtres-
                            </p>
                            <p className="leading-[27.5px] mb-0">
                              parents aux premiers secours
                            </p>
                            <p className="leading-[27.5px] mb-0">
                              et au protocole de
                            </p>
                            <p className="leading-[27.5px]">
                              bientraitance scolaire
                            </p>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex flex-col items-start pt-[1.45px] relative shrink-0 w-full"
                          data-node-id="5:984"
                          data-name="Container"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] w-full"
                            data-node-id="5:985"
                          >
                            <p className="leading-[22.75px] mb-0">
                              Dotation de trousses de secours médicalisées et
                            </p>
                            <p className="leading-[22.75px] mb-0">{`ateliers d'écoute bienveillante dans les écoles de`}</p>
                            <p className="leading-[22.75px]">
                              brousse de Ngambé-Tikar.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="content-stretch flex items-center justify-between pt-[16px] relative shrink-0 w-full"
                        data-node-id="5:986"
                        data-name="Container"
                      >
                        <div
                          className="content-stretch flex gap-[4px] items-center relative shrink-0"
                          data-node-id="5:987"
                          data-name="Container"
                        >
                          <div
                            className="relative shrink-0 size-[13.333px]"
                            data-node-id="5:988"
                            data-name="Container"
                          >
                            <img
                              alt=""
                              className="absolute block inset-0 max-w-none size-full"
                              src={imgContainer18}
                            />
                          </div>
                          <div
                            className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-ink-700 text-[11px] whitespace-nowrap"
                            data-node-id="5:990"
                          >
                            <p className="leading-[16px]">4 min de lecture</p>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex gap-[4px] items-center relative shrink-0"
                          data-node-id="5:991"
                          data-name="Link"
                        >
                          <div
                            className="content-stretch flex flex-col items-start relative shrink-0"
                            data-node-id="5:992"
                            data-name="Container"
                          >
                            <div
                              className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-brand-900 text-[14px] whitespace-nowrap"
                              data-node-id="5:993"
                            >
                              <p className="leading-[20px]">Découvrir</p>
                            </div>
                          </div>
                          <div
                            className="relative shrink-0 size-[10.667px]"
                            data-node-id="5:994"
                            data-name="Container"
                          >
                            <img
                              alt=""
                              className="absolute block inset-0 max-w-none size-full"
                              src={imgContainer19}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="bg-accent-700 h-[4px] relative shrink-0 w-[373.33px]"
                      data-node-id="5:996"
                      data-name="Background"
                    />
                  </div>
                  <div
                    className="bg-white content-stretch flex flex-[1_0_0] flex-col h-[544.3px] items-start min-w-px overflow-clip relative rounded-card shadow-raised"
                    data-news-category="association stories"
                    data-node-id="5:1005"
                    style={{ display: hiddenNews.has("5:1005") ? "none" : undefined }}
                    data-name="Article - ARTICLE 5: PARTENARIATS & MÉCÉNAT"
                  >
                    <div
                      className="content-stretch flex flex-col h-[224px] items-start justify-center overflow-clip relative shrink-0 w-full"
                      data-node-id="5:1032"
                      data-name="Container"
                    >
                      <div
                        className="flex-[1_0_0] min-h-px relative w-full"
                        data-node-id="5:1033"
                        data-name="AB6AXuDf4hjsQmaihI98JmPrLg6rXfclHkn2XW0Gr4CmaMoYtZNqnjf7U9lBJC7MxvFPFU61xf8Zkj3wDM7ztD18MSp3Dv9WivwWg5UIamEOQaDa7Bjubfr_6i7fqug4VAodLF52KSXtRekkWlYPSkeiue9W7hpECVnh3q-VWZDziVkLzJxYjGjMdBWSC_wlsu6rfFkhJdderQq6ZnlIDraShwljpY-LXhidyHtEhAWMqhJ1KSWvKirof2okSQ"
                      >
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                          <img
                            alt=""
                            className="absolute h-full left-[-5.05%] max-w-none top-0 w-[110.11%]"
                            src={
                              imgAb6AXuDf4HjsQmaihI98JmPrLg6RXfclHkn2Xw0Gr4CmaMoYtZNqnjf7U9LBjc7MxvFpfu61Xf8Zkj3WDm7ZtD18MSp3Dv9WivwWg5UIamEoQaDa7Bjubfr6I7Fqug4VAodLf52KsXtRekkWlYpSkeiue9W7HpEcVnh3QVwzDziVkLzJxYjGjMdBwscWlsu6RfFkhJdderQq6ZnlIDraShwljpYLXhidyHtEhAwMqhJ1KsWvKirof2OkSq
                            }
                          />
                        </div>
                      </div>
                      <div
                        className="absolute backdrop-blur-[6px] bg-[rgba(255,255,255,0.95)] content-stretch flex gap-[5.99px] items-center left-[12px] px-[12px] py-[4px] rounded-pill shadow-raised top-[12px]"
                        data-node-id="5:1034"
                        data-name="Background+Shadow+OverlayBlur"
                      >
                        <div
                          className="h-[11.667px] relative shrink-0 w-[12.839px]"
                          data-node-id="5:1035"
                          data-name="Container"
                        >
                          <img
                            alt=""
                            className="absolute block inset-0 max-w-none size-full"
                            src={imgContainer23}
                          />
                        </div>
                        <div
                          className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-900 text-[11px] uppercase whitespace-nowrap"
                          data-node-id="5:1037"
                        >
                          <p className="leading-[16px]">{`PARTENARIATS & MÉCÉNAT`}</p>
                        </div>
                      </div>
                      <div
                        className="absolute backdrop-blur-[2px] bg-[rgba(40,48,68,0.8)] bottom-[12px] content-stretch flex flex-col items-start px-[10px] py-[2px] right-[12px] rounded-control"
                        data-node-id="5:1038"
                        data-name="Overlay+OverlayBlur"
                      >
                        <div
                          className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-050 text-[11px] whitespace-nowrap"
                          data-node-id="5:1039"
                        >
                          <p className="leading-[16px]">{`Douala & Diaspora`}</p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex flex-col items-start justify-between p-[24px] relative shrink-0 w-full"
                      data-node-id="5:1006"
                      data-name="Container"
                    >
                      <div
                        className="content-stretch flex flex-col gap-[9.3px] items-start pb-[16px] relative shrink-0 w-full"
                        data-node-id="5:1007"
                        data-name="Container"
                      >
                        <div
                          className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full"
                          data-node-id="5:1008"
                          data-name="Container"
                        >
                          <div
                            className="h-[12.5px] relative shrink-0 w-[11.25px]"
                            data-node-id="5:1009"
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
                            data-node-id="5:1011"
                            data-name="Container"
                          >
                            <div
                              className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[12px] whitespace-nowrap"
                              data-node-id="5:1012"
                            >
                              <p className="leading-[16px]">18 Novembre 2024</p>
                            </div>
                          </div>
                          <div
                            className="content-stretch flex flex-col items-start relative shrink-0"
                            data-node-id="5:1013"
                            data-name="Container"
                          >
                            <div
                              className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[12px] whitespace-nowrap"
                              data-node-id="5:1014"
                            >
                              <p className="leading-[16px]" data-decorative-separator="true">•</p>
                            </div>
                          </div>
                          <div
                            className="content-stretch flex flex-col items-start relative shrink-0"
                            data-node-id="5:1015"
                            data-name="Container"
                          >
                            <div
                              className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-brand-900 text-[12px] whitespace-nowrap"
                              data-node-id="5:1016"
                            >
                              <p className="leading-[16px]">Économie Locale</p>
                            </div>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex flex-col items-start pb-[0.75px] relative shrink-0 w-full"
                          data-node-id="5:1017"
                          data-name="Heading 4"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-900 text-[20px] w-full"
                            data-node-id="5:1018"
                          >
                            <p className="leading-[27.5px] mb-0">
                              Les entreprises citoyennes
                            </p>
                            <p className="leading-[27.5px] mb-0">{`s'engagent : 500 tables-bancs`}</p>
                            <p className="leading-[27.5px] mb-0">
                              cofinancées par des acteurs de
                            </p>
                            <p className="leading-[27.5px]">la diaspora</p>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex flex-col items-start pt-[1.45px] relative shrink-0 w-full"
                          data-node-id="5:1019"
                          data-name="Container"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] w-full"
                            data-node-id="5:1020"
                          >
                            <p className="leading-[22.75px] mb-0">{`Un modèle d'action solidaire où chaque franc est`}</p>
                            <p className="leading-[22.75px] mb-0">
                              tracé et injecté directement auprès des
                            </p>
                            <p className="leading-[22.75px]">
                              menuisiers des arrondissements concernés.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="content-stretch flex items-center justify-between pr-[0.01px] pt-[16px] relative shrink-0 w-full"
                        data-node-id="5:1021"
                        data-name="Container"
                      >
                        <div
                          className="content-stretch flex gap-[4px] items-center relative shrink-0"
                          data-node-id="5:1022"
                          data-name="Container"
                        >
                          <div
                            className="relative shrink-0 size-[13.333px]"
                            data-node-id="5:1023"
                            data-name="Container"
                          >
                            <img
                              alt=""
                              className="absolute block inset-0 max-w-none size-full"
                              src={imgContainer18}
                            />
                          </div>
                          <div
                            className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-ink-700 text-[11px] whitespace-nowrap"
                            data-node-id="5:1025"
                          >
                            <p className="leading-[16px]">5 min de lecture</p>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex gap-[4.01px] items-center relative shrink-0"
                          data-node-id="5:1026"
                          data-name="Link"
                        >
                          <div
                            className="content-stretch flex flex-col items-start relative shrink-0"
                            data-node-id="5:1027"
                            data-name="Container"
                          >
                            <div
                              className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-brand-900 text-[14px] whitespace-nowrap"
                              data-node-id="5:1028"
                            >
                              <p className="leading-[20px]">Voir le projet</p>
                            </div>
                          </div>
                          <div
                            className="relative shrink-0 size-[10.667px]"
                            data-node-id="5:1029"
                            data-name="Container"
                          >
                            <img
                              alt=""
                              className="absolute block inset-0 max-w-none size-full"
                              src={imgContainer19}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="bg-brand-700 h-[4px] relative shrink-0 w-[373.33px]"
                      data-node-id="5:1031"
                      data-name="Background"
                    />
                  </div>
                  <div
                    className="bg-white content-stretch flex flex-[1_0_0] flex-col h-[544.3px] items-start min-w-px overflow-clip relative rounded-card shadow-raised"
                    data-news-category="official"
                    data-node-id="5:1040"
                    style={{ display: hiddenNews.has("5:1040") ? "none" : undefined }}
                    data-name="Article - ARTICLE 6: COMMUNIQUÉ OFFICIEL"
                  >
                    <div
                      className="bg-brand-900 content-stretch flex flex-col h-[224px] items-start justify-between overflow-clip p-[24px] relative shrink-0 w-full"
                      data-node-id="5:1067"
                      data-name="Background"
                    >
                      <div
                        className="content-stretch flex items-start justify-between relative shrink-0 w-full"
                        data-node-id="5:1068"
                        data-name="Container"
                      >
                        <div
                          className="bg-surface-subtle content-stretch drop-shadow-card flex gap-[5.99px] items-center px-[12px] py-[4px] relative rounded-pill shrink-0"
                          data-node-id="5:1069"
                          data-name="Background+Shadow"
                        >
                          <div
                            className="h-[11.667px] relative shrink-0 w-[9.333px]"
                            data-node-id="5:1070"
                            data-name="Container"
                          >
                            <img
                              alt=""
                              className="absolute block inset-0 max-w-none size-full"
                              src={imgContainer24}
                            />
                          </div>
                          <div
                            className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-900 text-[11px] uppercase whitespace-nowrap"
                            data-node-id="5:1072"
                          >
                            <p className="leading-[16px]">
                              COMMUNIQUÉ OFFICIEL
                            </p>
                          </div>
                        </div>
                        <div
                          className="h-[28.5px] relative shrink-0 w-[27px]"
                          data-node-id="5:1073"
                          data-name="Icon"
                        >
                          <img
                            alt=""
                            className="absolute block inset-0 max-w-none size-full"
                            src={imgIcon1}
                          />
                        </div>
                      </div>
                      <div
                        className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full"
                        data-node-id="5:1074"
                        data-name="Container"
                      >
                        <div
                          className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                          data-node-id="5:1075"
                          data-name="Container"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-100 text-[11px] w-full"
                            data-node-id="5:1076"
                          >
                            <p className="leading-[16px]">
                              RÉF. CSC/DG/2024/09-B
                            </p>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                          data-node-id="5:1077"
                          data-name="Container"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[20px] text-white w-full"
                            data-node-id="5:1078"
                          >
                            <p className="leading-[25px]">
                              Direction Générale - Yaoundé
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex flex-col items-start justify-between p-[24px] relative shrink-0 w-full"
                      data-node-id="5:1041"
                      data-name="Container"
                    >
                      <div
                        className="content-stretch flex flex-col gap-[9.3px] items-start pb-[16px] relative shrink-0 w-full"
                        data-node-id="5:1042"
                        data-name="Container"
                      >
                        <div
                          className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full"
                          data-node-id="5:1043"
                          data-name="Container"
                        >
                          <div
                            className="h-[12.5px] relative shrink-0 w-[11.25px]"
                            data-node-id="5:1044"
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
                            data-node-id="5:1046"
                            data-name="Container"
                          >
                            <div
                              className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[12px] whitespace-nowrap"
                              data-node-id="5:1047"
                            >
                              <p className="leading-[16px]">02 Novembre 2024</p>
                            </div>
                          </div>
                          <div
                            className="content-stretch flex flex-col items-start relative shrink-0"
                            data-node-id="5:1048"
                            data-name="Container"
                          >
                            <div
                              className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[12px] whitespace-nowrap"
                              data-node-id="5:1049"
                            >
                              <p className="leading-[16px]" data-decorative-separator="true">•</p>
                            </div>
                          </div>
                          <div
                            className="content-stretch flex flex-col items-start relative shrink-0"
                            data-node-id="5:1050"
                            data-name="Container"
                          >
                            <div
                              className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-warn-700 text-[12px] whitespace-nowrap"
                              data-node-id="5:1051"
                            >
                              <p className="leading-[16px]">
                                Circulaire Officielle
                              </p>
                            </div>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex flex-col items-start pb-[0.75px] relative shrink-0 w-full"
                          data-node-id="5:1052"
                          data-name="Heading 4"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-900 text-[20px] w-full"
                            data-node-id="5:1053"
                          >
                            <p className="leading-[27.5px] mb-0">{`Note d'orientation sur la`}</p>
                            <p className="leading-[27.5px] mb-0">
                              rentrée scolaire et consignes
                            </p>
                            <p className="leading-[27.5px] mb-0">
                              de sauvegarde sanitaire dans
                            </p>
                            <p className="leading-[27.5px]">
                              les zones forestières
                            </p>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex flex-col items-start pt-[1.45px] relative shrink-0 w-full"
                          data-node-id="5:1054"
                          data-name="Container"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] w-full"
                            data-node-id="5:1055"
                          >
                            <p className="leading-[22.75px] mb-0">
                              Téléchargez la circulaire officielle adressée à
                            </p>
                            <p className="leading-[22.75px] mb-0">
                              toutes les délégations départementales
                            </p>
                            <p className="leading-[22.75px]">{`partenaires et comités d'écoles.`}</p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="content-stretch flex items-center justify-between pt-[16px] relative shrink-0 w-full"
                        data-node-id="5:1056"
                        data-name="Container"
                      >
                        <div
                          className="content-stretch flex gap-[4px] items-center relative shrink-0"
                          data-node-id="5:1057"
                          data-name="Container"
                        >
                          <div
                            className="relative shrink-0 size-[10.667px]"
                            data-node-id="5:1058"
                            data-name="Container"
                          >
                            <img
                              alt=""
                              className="absolute block inset-0 max-w-none size-full"
                              src={imgContainer25}
                            />
                          </div>
                          <div
                            className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-ink-700 text-[11px] whitespace-nowrap"
                            data-node-id="5:1060"
                          >
                            <p className="leading-[16px]">
                              Document PDF (2.4 Mo)
                            </p>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex gap-[4px] items-center relative shrink-0"
                          data-node-id="5:1061"
                          data-name="Link"
                        >
                          <div
                            className="content-stretch flex flex-col items-start relative shrink-0"
                            data-node-id="5:1062"
                            data-name="Container"
                          >
                            <div
                              className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-warn-700 text-[14px] whitespace-nowrap"
                              data-node-id="5:1063"
                            >
                              <p className="leading-[20px]">Télécharger</p>
                            </div>
                          </div>
                          <div
                            className="relative shrink-0 size-[10.667px]"
                            data-node-id="5:1064"
                            data-name="Container"
                          >
                            <img
                              alt=""
                              className="absolute block inset-0 max-w-none size-full"
                              src={imgContainer26}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="bg-ink-500 h-[4px] relative shrink-0 w-[373.34px]"
                      data-node-id="5:1066"
                      data-name="Background"
                    />
                  </div>
                </div>
              </div>
            </div>
              <div
                className="flex w-full flex-col items-center justify-center gap-2 rounded-panel border border-dashed border-[#c7cdf5] bg-white px-6 py-14 text-center"
                data-empty-state="news"
                role="status"
                style={{ display: hiddenNews.size === 6 ? 'flex' : 'none' }}
              >
                <span aria-hidden="true" className="flex size-12 items-center justify-center rounded-pill bg-surface-tint text-brand-900">
                  <Icon name="search" size={20} />
                </span>
                <p className="font-['Montserrat:Bold'] text-[16px] font-bold text-ink-900">
                  Aucun article dans cette thématique
                </p>
                <p className="max-w-[46ch] font-['Inter:Regular'] text-[14px] text-[#5d626e]">
                 /themes' themes' Combinez « Tous les articles » avec une autre
                  catégorie pour découvrir l'ensemble de nos publications.
                </p>
                <button
                  type="button"
                  className="mt-2 cursor-pointer rounded-pill bg-brand-900 px-5 py-2.5 font-['Inter:Semi_Bold'] text-[14px] font-semibold text-white transition-colors hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004484]"
                  onClick={() => setNewsFilter('all')}
                >
                  Voir tous les articles
                </button>
              </div>

            <div
              className="content-stretch flex flex-col items-start pb-[64px] relative shrink-0 w-full"
              data-node-id="5:1079"
              data-name="Section - CARNETS DE MISSION VISUELS & CHIFFRES D'IMPACT DU MOIS:margin"
            >
              <div
                className="bg-surface-muted content-stretch flex flex-col items-start py-[64px] relative shrink-0 w-full"
                data-node-id="5:1080"
                data-name="Section - CARNETS DE MISSION VISUELS & CHIFFRES D'IMPACT DU MOIS"
              >
                <div
                  className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full shell"
                  data-node-id="5:1081"
                  data-name="Container"
                >
                  <div
                    className="content-stretch flex items-end justify-between relative shrink-0 w-full"
                    data-node-id="5:1082"
                    data-name="Container"
                  >
                    <div
                      className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0"
                      data-node-id="5:1083"
                      data-name="Container"
                    >
                      <div
                        className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                        data-node-id="5:1084"
                        data-name="Container"
                      >
                        <div
                          className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-accent-700 text-[11px] tracking-[0.55px] uppercase whitespace-nowrap"
                          data-node-id="5:1085"
                        >
                          <p className="leading-[16px]">
                            MISSIONS EN CONTINU • 10 RÉGIONS
                          </p>
                        </div>
                      </div>
                      <div
                        className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                        data-node-id="5:1086"
                        data-name="Heading 2"
                      >
                        <div
                          className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-900 text-[32px] whitespace-nowrap"
                          data-node-id="5:1087"
                        >
                          <p className="leading-[40px] mb-0">{`Indicateurs & Activités du Dernier`}</p>
                          <p className="leading-[40px]">Trimestre</p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex flex-col items-start max-w-[448px] pr-[47.87px] relative shrink-0"
                      data-node-id="5:1088"
                      data-name="Container"
                    >
                      <div
                        className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                        data-node-id="5:1089"
                      >
                        <p className="leading-[20px] mb-0">{`Chaque intervention fait l'objet d'un registre d'impact public,`}</p>
                        <p className="leading-[20px] mb-0">{`attesté par les chefs de cantons et les directeurs d'écoles`}</p>
                        <p className="leading-[20px]">publiques.</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="content-stretch flex gap-[24px] items-start justify-center relative shrink-0 w-full"
                    data-node-id="5:1090"
                    data-name="Container"
                  >
                    <div
                      className="bg-white content-stretch drop-shadow-card flex flex-[1_0_0] flex-col items-start justify-between min-w-px p-[24px] relative rounded-card"
                      data-node-id="5:1091"
                      data-name="Stat 1"
                    >
                      <div
                        className="content-stretch flex flex-col items-start pb-[16px] relative shrink-0 w-full"
                        data-node-id="5:1092"
                        data-name="Margin"
                      >
                        <div
                          className="content-stretch flex items-center justify-between relative shrink-0 w-full"
                          data-node-id="5:1093"
                          data-name="Container"
                        >
                          <div
                            className="bg-brand-100 content-stretch flex items-center justify-center relative rounded-pill shrink-0 size-[40px]"
                            data-node-id="5:1094"
                            data-name="Background"
                          >
                            <div
                              className="h-[18px] relative shrink-0 w-[22px]"
                              data-node-id="5:1095"
                              data-name="Container"
                            >
                              <img
                                alt=""
                                className="absolute block inset-0 max-w-none size-full"
                                src={imgContainer27}
                              />
                            </div>
                          </div>
                          <div
                            className="content-stretch flex flex-col items-start relative shrink-0"
                            data-node-id="5:1097"
                            data-name="Container"
                          >
                            <div
                              className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-accent-700 text-[11px] whitespace-nowrap"
                              data-node-id="5:1098"
                            >
                              <p className="leading-[16px]">+18% vs 2023</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                        data-node-id="5:1099"
                        data-name="Container"
                      >
                        <div
                          className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                          data-node-id="5:1100"
                          data-name="Container"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Montserrat:ExtraBold'] font-extrabold justify-center leading-[0] relative shrink-0 text-brand-900 text-[42px] tracking-[-1.05px] w-full"
                            data-node-id="5:1101"
                          >
                            <p className="leading-[46px]">840</p>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                          data-node-id="5:1102"
                          data-name="Container"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Montserrat:SemiBold'] font-semibold justify-center leading-[0] relative shrink-0 text-ink-900 text-[18px] w-full"
                            data-node-id="5:1103"
                          >
                            <p className="leading-[24px]">
                              Tables-bancs installées
                            </p>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0 w-full"
                          data-node-id="5:1104"
                          data-name="Container"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] w-full"
                            data-node-id="5:1105"
                          >
                            <p className="leading-[20px] mb-0">
                              Livraison directe dans 14 écoles
                            </p>
                            <p className="leading-[20px]">rurales enclavées.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="bg-white content-stretch drop-shadow-card flex flex-[1_0_0] flex-col items-start justify-between min-w-px p-[24px] relative rounded-card"
                      data-node-id="5:1106"
                      data-name="Stat 2"
                    >
                      <div
                        className="content-stretch flex flex-col items-start pb-[16px] relative shrink-0 w-full"
                        data-node-id="5:1107"
                        data-name="Margin"
                      >
                        <div
                          className="content-stretch flex items-center justify-between relative shrink-0 w-full"
                          data-node-id="5:1108"
                          data-name="Container"
                        >
                          <div
                            className="bg-accent-200 content-stretch flex items-center justify-center relative rounded-pill shrink-0 size-[40px]"
                            data-node-id="5:1109"
                            data-name="Background"
                          >
                            <div
                              className="h-[16px] relative shrink-0 w-[22px]"
                              data-node-id="5:1110"
                              data-name="Container"
                            >
                              <img
                                alt=""
                                className="absolute block inset-0 max-w-none size-full"
                                src={imgContainer28}
                              />
                            </div>
                          </div>
                          <div
                            className="content-stretch flex flex-col items-start relative shrink-0"
                            data-node-id="5:1112"
                            data-name="Container"
                          >
                            <div
                              className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-accent-700 text-[11px] whitespace-nowrap"
                              data-node-id="5:1113"
                            >
                              <p className="leading-[16px]">Objectif 100%</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                        data-node-id="5:1114"
                        data-name="Container"
                      >
                        <div
                          className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                          data-node-id="5:1115"
                          data-name="Container"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Montserrat:ExtraBold'] font-extrabold justify-center leading-[0] relative shrink-0 text-accent-700 text-[42px] tracking-[-1.05px] w-full"
                            data-node-id="5:1116"
                          >
                            <p className="leading-[46px]">3 250</p>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                          data-node-id="5:1117"
                          data-name="Container"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Montserrat:SemiBold'] font-semibold justify-center leading-[0] relative shrink-0 text-ink-900 text-[18px] w-full"
                            data-node-id="5:1118"
                          >
                            <p className="leading-[24px] mb-0">{`Manuels & Manuels`}</p>
                            <p className="leading-[24px]">scolaires</p>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0 w-full"
                          data-node-id="5:1119"
                          data-name="Container"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] w-full"
                            data-node-id="5:1120"
                          >
                            <p className="leading-[20px] mb-0">
                              Kits individuels complets pour
                            </p>
                            <p className="leading-[20px]">
                              écoliers du CP au CM2.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="bg-white content-stretch drop-shadow-card flex flex-[1_0_0] flex-col items-start justify-between min-w-px p-[24px] relative rounded-card"
                      data-node-id="5:1121"
                      data-name="Stat 3"
                    >
                      <div
                        className="content-stretch flex flex-col items-start pb-[16px] relative shrink-0 w-full"
                        data-node-id="5:1122"
                        data-name="Margin"
                      >
                        <div
                          className="content-stretch flex items-center justify-between relative shrink-0 w-full"
                          data-node-id="5:1123"
                          data-name="Container"
                        >
                          <div
                            className="bg-warn-100 content-stretch flex items-center justify-center relative rounded-pill shrink-0 size-[40px]"
                            data-node-id="5:1124"
                            data-name="Background"
                          >
                            <div
                              className="h-[20px] relative shrink-0 w-[16px]"
                              data-node-id="5:1125"
                              data-name="Container"
                            >
                              <img
                                alt=""
                                className="absolute block inset-0 max-w-none size-full"
                                src={imgContainer29}
                              />
                            </div>
                          </div>
                          <div
                            className="content-stretch flex flex-col items-start relative shrink-0"
                            data-node-id="5:1127"
                            data-name="Container"
                          >
                            <div
                              className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-warn-900 text-[11px] whitespace-nowrap"
                              data-node-id="5:1128"
                            >
                              <p className="leading-[16px]">
                                Santé Zéro Choléra
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                        data-node-id="5:1129"
                        data-name="Container"
                      >
                        <div
                          className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                          data-node-id="5:1130"
                          data-name="Container"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Montserrat:ExtraBold'] font-extrabold justify-center leading-[0] relative shrink-0 text-warn-900 text-[42px] tracking-[-1.05px] w-full"
                            data-node-id="5:1131"
                          >
                            <p className="leading-[46px]">5</p>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                          data-node-id="5:1132"
                          data-name="Container"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Montserrat:SemiBold'] font-semibold justify-center leading-[0] relative shrink-0 text-ink-900 text-[18px] w-full"
                            data-node-id="5:1133"
                          >
                            <p className="leading-[24px]">{`Points d'eau autonomes`}</p>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0 w-full"
                          data-node-id="5:1134"
                          data-name="Container"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] w-full"
                            data-node-id="5:1135"
                          >
                            <p className="leading-[20px] mb-0">
                              Forages solaires avec
                            </p>
                            <p className="leading-[20px] mb-0">
                              maintenance communautaire
                            </p>
                            <p className="leading-[20px]">pérenne.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="bg-white content-stretch drop-shadow-card flex flex-[1_0_0] flex-col items-start justify-between min-w-px p-[24px] relative rounded-card"
                      data-node-id="5:1136"
                      data-name="Stat 4"
                    >
                      <div
                        className="content-stretch flex flex-col items-start pb-[16px] relative shrink-0 w-full"
                        data-node-id="5:1137"
                        data-name="Margin"
                      >
                        <div
                          className="content-stretch flex items-center justify-between relative shrink-0 w-full"
                          data-node-id="5:1138"
                          data-name="Container"
                        >
                          <div
                            className="bg-brand-200 content-stretch flex items-center justify-center relative rounded-pill shrink-0 size-[40px]"
                            data-node-id="5:1139"
                            data-name="Background"
                          >
                            <div
                              className="h-[16px] relative shrink-0 w-[20px]"
                              data-node-id="5:1140"
                              data-name="Container"
                            >
                              <img
                                alt=""
                                className="absolute block inset-0 max-w-none size-full"
                                src={imgContainer30}
                              />
                            </div>
                          </div>
                          <div
                            className="content-stretch flex flex-col items-start relative shrink-0"
                            data-node-id="5:1142"
                            data-name="Container"
                          >
                            <div
                              className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-900 text-[11px] whitespace-nowrap"
                              data-node-id="5:1143"
                            >
                              <p className="leading-[16px]">100% Inclusif</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                        data-node-id="5:1144"
                        data-name="Container"
                      >
                        <div
                          className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                          data-node-id="5:1145"
                          data-name="Container"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Montserrat:ExtraBold'] font-extrabold justify-center leading-[0] relative shrink-0 text-brand-900 text-[42px] tracking-[-1.05px] w-full"
                            data-node-id="5:1146"
                          >
                            <p className="leading-[46px]">180</p>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                          data-node-id="5:1147"
                          data-name="Container"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Montserrat:SemiBold'] font-semibold justify-center leading-[0] relative shrink-0 text-ink-900 text-[18px] w-full"
                            data-node-id="5:1148"
                          >
                            <p className="leading-[24px] mb-0">{`Enseignants & Maîtres`}</p>
                            <p className="leading-[24px]">outillés</p>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0 w-full"
                          data-node-id="5:1149"
                          data-name="Container"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] w-full"
                            data-node-id="5:1150"
                          >
                            <p className="leading-[20px] mb-0">
                              Modules pédagogiques de
                            </p>
                            <p className="leading-[20px]">{`sauvegarde de l'enfant.`}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="content-stretch flex flex-col items-start pb-[64px] relative shrink-0 w-full shell"
              data-node-id="5:1151"
              data-name="Section - ENCADRÉ DÉONTOLOGIE & PROTECTION DE L'ENFANT (CHARTE ÉTHIQUE DU MAGAZINE):margin"
            >
              <div
                className="bg-surface-tint content-stretch flex flex-col items-start overflow-clip p-[40px] relative rounded-panel shadow-raised shrink-0 w-full"
                data-node-id="5:1152"
                data-name="Section - ENCADRÉ DÉONTOLOGIE & PROTECTION DE L'ENFANT (CHARTE ÉTHIQUE DU MAGAZINE)"
              >
                <div
                  className="absolute bg-[rgba(127,252,151,0.4)] blur-[20px] bottom-[-32.5px] right-[-32px] rounded-pill size-[224px]"
                  data-node-id="5:1153"
                  data-name="Overlay+Blur"
                />
                <div
                  className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full"
                  data-node-id="5:1154"
                  data-name="Container"
                >
                  <div
                    className="bg-accent-700 content-stretch flex flex-col items-center justify-center relative rounded-panel shrink-0 size-[64px]"
                    data-node-id="5:1155"
                    data-name="Background"
                  >
                    <div
                      className="-translate-y-1/2 absolute bg-[rgba(255,255,255,0)] left-0 rounded-panel shadow-float size-[64px] top-1/2"
                      data-node-id="5:1156"
                      data-name="Overlay+Shadow"
                    />
                    <div
                      className="h-[28.333px] relative shrink-0 w-[22.667px]"
                      data-node-id="5:1157"
                      data-name="Container"
                    >
                      <img
                        alt=""
                        className="absolute block inset-0 max-w-none size-full"
                        src={imgContainer31}
                      />
                    </div>
                  </div>
                  <div
                    className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px relative"
                    data-node-id="5:1159"
                    data-name="Container"
                  >
                    <div
                      className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full"
                      data-node-id="5:1160"
                      data-name="Container"
                    >
                      <div
                        className="content-stretch flex flex-col items-start relative shrink-0"
                        data-node-id="5:1161"
                        data-name="Heading 3"
                      >
                        <div
                          className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-900 text-[20px] whitespace-nowrap"
                          data-node-id="5:1162"
                        >
                          <p className="leading-[28px]">{`Charte Déontologique & Sauvegarde de la Dignité de l'Enfant`}</p>
                        </div>
                      </div>
                      <div
                        className="bg-[rgba(0,110,45,0.15)] content-stretch flex flex-col items-start px-[12px] py-[2px] relative rounded-pill shrink-0"
                        data-node-id="5:1163"
                        data-name="Overlay"
                      >
                        <div
                          className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-accent-700 text-[11px] whitespace-nowrap"
                          data-node-id="5:1164"
                        >
                          <p className="leading-[16px]">
                            CIDE • UNESCO • MINAS
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                      data-node-id="5:1165"
                      data-name="Container"
                    >
                      <div
                        className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[16px] w-full"
                        data-node-id="5:1166"
                      >
                        <p className="leading-[26px] mb-0">
                          « Engagement déontologique : Conformément à notre
                          politique de tolérance zéro et à la Convention
                          Internationale des Droits de
                        </p>
                        <p className="leading-[26px] mb-0">{`l'Enfant, aucune photo ne porte atteinte à la dignité des élèves. Les visages et situations sont publiés avec consentement parental`}</p>
                        <p className="leading-[26px]">libre et éclairé. »</p>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex gap-[16px] items-center pt-[7.5px] relative shrink-0 w-full"
                      data-node-id="5:1167"
                      data-name="Container"
                    >
                      <div
                        className="content-stretch flex gap-[4px] items-center relative shrink-0"
                        data-node-id="5:1168"
                        data-name="Link"
                      >
                        <div
                          className="relative shrink-0 size-[12px]"
                          data-node-id="5:1169"
                          data-name="Container"
                        >
                          <img
                            alt=""
                            className="absolute block inset-0 max-w-none size-full"
                            src={imgContainer32}
                          />
                        </div>
                        <div
                          className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-brand-900 text-[12px] whitespace-nowrap"
                          data-node-id="5:1171"
                        >
                          <p className="leading-[16px]">{`Télécharger le protocole de prise de vue & droit à l'image`}</p>
                        </div>
                      </div>
                      <div
                        className="content-stretch flex flex-col items-start relative shrink-0"
                        data-node-id="5:1172"
                        data-name="Container"
                      >
                        <div
                          className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-300 text-[12px] whitespace-nowrap"
                          data-node-id="5:1173"
                        >
                          <p className="leading-[16px]" data-decorative-separator="true">•</p>
                        </div>
                      </div>
                      <div
                        className="content-stretch flex gap-[4px] items-center relative shrink-0"
                        data-node-id="5:1174"
                        data-name="Container"
                      >
                        <div
                          className="h-[8.017px] relative shrink-0 w-[10.867px]"
                          data-node-id="5:1175"
                          data-name="Container"
                        >
                          <img
                            alt=""
                            className="absolute block inset-0 max-w-none size-full"
                            src={imgContainer33}
                          />
                        </div>
                        <div
                          className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[12px] whitespace-nowrap"
                          data-node-id="5:1177"
                        >
                          <p className="leading-[16px]">
                            Audit annuel de conformité éthique
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="content-stretch flex flex-col items-start pb-[64px] relative shrink-0 w-full shell"
              data-node-id="5:1178"
              data-name="Section - INSCRIPTION À LA LETTRE D'INFORMATION TRIMESTRIELLE:margin"
            >
              <div
                className="bg-brand-900 content-stretch flex flex-col items-start overflow-clip p-[48px] relative rounded-panel shadow-hero shrink-0 w-full"
                data-node-id="5:1179"
                data-name="Section - INSCRIPTION À LA LETTRE D'INFORMATION TRIMESTRIELLE"
              >
                <div
                  className="absolute bg-gradient-to-r from-[#004484] inset-[0_0_0.5px_0] opacity-90 to-[#004484] via-1/2 via-[#0b5cab]"
                  data-node-id="5:1180"
                  data-name="Gradient decoratif subtle"
                />
                <div
                  className="absolute bg-[rgba(127,252,151,0.2)] blur-[32px] right-0 rounded-pill size-[320px] top-[-64px]"
                  data-node-id="5:1181"
                  data-name="Overlay+Blur"
                />
                <div
                  className="content-stretch flex gap-[32px] items-center relative shrink-0 w-full"
                  data-node-id="5:1182"
                  data-name="Container"
                >
                  <div
                    className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px relative"
                    data-node-id="5:1183"
                    data-name="Container"
                  >
                    <div
                      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                      data-node-id="5:1184"
                      data-name="Container"
                    >
                      <div
                        className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-accent-300 text-[11px] tracking-[0.55px] uppercase w-full"
                        data-node-id="5:1185"
                      >
                        <p className="leading-[16px]">
                          LA LETTRE DE LIAISON PÉRIODIQUE
                        </p>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                      data-node-id="5:1186"
                      data-name="Heading 2"
                    >
                      <div
                        className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[36px] text-white w-full"
                        data-node-id="5:1187"
                      >
                        <p className="leading-[44px] mb-0">
                          Recevez nos carnets de
                        </p>
                        <p className="leading-[44px]">
                          bord et bilans de mission
                        </p>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0 w-full"
                      data-node-id="5:1188"
                      data-name="Container"
                    >
                      <div
                        className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-brand-300 text-[16px] w-full"
                        data-node-id="5:1189"
                      >
                        <p className="leading-[26px] mb-0">
                          Recevez nos carnets de bord et bilans de mission
                          directement par
                        </p>
                        <p className="leading-[26px] mb-0">
                          email ou WhatsApp. Aucune sollicitation intempestive :
                          nous
                        </p>
                        <p className="leading-[26px]">
                          partageons uniquement des avancées réelles et
                          transparentes.
                        </p>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex gap-[16px] items-center pt-[8px] relative shrink-0 w-full"
                      data-node-id="5:1190"
                      data-name="Container"
                    >
                      <div
                        className="content-stretch flex gap-[4px] items-center relative shrink-0"
                        data-node-id="5:1191"
                        data-name="Container"
                      >
                        <div
                          className="h-[13.5px] relative shrink-0 w-[15.75px]"
                          data-node-id="5:1192"
                          data-name="Container"
                        >
                          <img
                            alt=""
                            className="absolute block inset-0 max-w-none size-full"
                            src={imgContainer34}
                          />
                        </div>
                        <div
                          className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap"
                          data-node-id="5:1194"
                        >
                          <p className="leading-[16px]">4 numéros par an</p>
                        </div>
                      </div>
                      <div
                        className="content-stretch flex flex-col items-start relative shrink-0"
                        data-node-id="5:1195"
                        data-name="Container"
                      >
                        <div
                          className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap"
                          data-node-id="5:1196"
                        >
                          <p className="leading-[16px]" data-decorative-separator="true">•</p>
                        </div>
                      </div>
                      <div
                        className="content-stretch flex gap-[4px] items-center relative shrink-0"
                        data-node-id="5:1197"
                        data-name="Container"
                      >
                        <div
                          className="relative shrink-0 size-[15px]"
                          data-node-id="5:1198"
                          data-name="Container"
                        >
                          <img
                            alt=""
                            className="absolute block inset-0 max-w-none size-full"
                            src={imgContainer35}
                          />
                        </div>
                        <div
                          className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap"
                          data-node-id="5:1200"
                        >
                          <p className="leading-[16px]">
                            Alerte WhatsApp disponible
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="bg-surface-subtle content-stretch flex flex-[1_0_0] flex-col items-start min-w-px p-[32px] relative rounded-card"
                    data-node-id="5:1201"
                    data-name="Background"
                  >
                    <div
                      className="absolute bg-[rgba(255,255,255,0)] inset-[0_0_0.5px_0] rounded-card shadow-float"
                      data-node-id="5:1202"
                      data-name="Overlay+Shadow"
                    />
                    <div
                      className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full"
                      data-node-id="5:1203"
                      data-name="Form"
                    >
                      <div
                        className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full"
                        data-node-id="5:1204"
                        data-name="Container"
                      >
                        <div
                          className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                          data-node-id="5:1205"
                          data-name="Label"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-900 text-[12px] w-full"
                            data-node-id="5:1206"
                          >
                            <p className="leading-[16px]">
                              Adresse email professionnelle ou personnelle
                            </p>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                          data-node-id="5:1207"
                          data-name="Container"
                        >
                          <div
                            className="bg-surface-muted content-stretch flex items-start justify-center overflow-clip pb-[14px] pl-[40px] pr-[16px] pt-[13px] relative rounded-control shrink-0 w-full"
                            data-node-id="5:1208"
                            data-name="Input"
                          >
                            <div
                              className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative"
                              data-node-id="5:1209"
                              data-name="Container"
                            >
                              <div
                                className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-ink-500 text-[14px] w-full"
                                data-node-id="5:1210"
                              >
                                <p className="leading-[normal]">
                                  exemple@domaine.cm
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            className="absolute h-[12px] left-[13.5px] top-[15px] w-[15px]"
                            data-node-id="5:1211"
                            data-name="Icon"
                          >
                            <img
                              alt=""
                              className="absolute block inset-0 max-w-none size-full"
                              src={imgIcon2}
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full"
                        data-node-id="5:1212"
                        data-name="Container"
                      >
                        <div
                          className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                          data-node-id="5:1213"
                          data-name="Label"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-900 text-[12px] w-full"
                            data-node-id="5:1214"
                          >
                            <p className="leading-[16px]">
                              Numéro WhatsApp (optionnel pour alertes directes
                              de mission)
                            </p>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                          data-node-id="5:1215"
                          data-name="Container"
                        >
                          <div
                            className="bg-surface-muted content-stretch flex items-start justify-center overflow-clip pb-[14px] pl-[40px] pr-[16px] pt-[13px] relative rounded-control shrink-0 w-full"
                            data-node-id="5:1216"
                            data-name="Input"
                          >
                            <div
                              className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative"
                              data-node-id="5:1217"
                              data-name="Container"
                            >
                              <div
                                className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-ink-500 text-[14px] w-full"
                                data-node-id="5:1218"
                              >
                                <p className="leading-[normal]">
                                  +237 6XX XX XX XX
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            className="absolute left-[13.5px] size-[15px] top-[13.5px]"
                            data-node-id="5:1219"
                            data-name="Icon"
                          >
                            <img
                              alt=""
                              className="absolute block inset-0 max-w-none size-full"
                              src={imgIcon3}
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        className="content-stretch flex gap-[8px] items-start pt-[4px] relative shrink-0 w-full"
                        data-node-id="5:1220"
                        data-name="Container"
                      >
                        <div
                          className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0"
                          data-node-id="5:1221"
                          data-name="Input:margin"
                        >
                          <div
                            className="bg-white border border-[#767676] border-solid relative rounded-chip shrink-0 size-[13px]"
                            data-node-id="5:1222"
                            data-name="Input"
                          />
                        </div>
                        <div
                          className="content-stretch flex flex-col items-start pr-[6.56px] relative shrink-0"
                          data-node-id="5:1223"
                          data-name="Label"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[13px] whitespace-nowrap"
                            data-node-id="5:1224"
                          >
                            <p className="leading-[16.25px] mb-0">{`J'accepte de recevoir les résumés d'action trimestriels et les rapports`}</p>
                            <p className="leading-[16.25px]">{`publics de Children's Smile Cameroun.`}</p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-full"
                        data-node-id="5:1225"
                        data-name="Button:margin"
                      >
                        <div
                          className="bg-warn-700 content-stretch flex gap-[8px] items-center justify-center relative rounded-pill shrink-0 w-full btn-md btn"
                          data-node-id="5:1226"
                          data-name="Button"
                        >
                          <div
                            className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-pill shadow-float"
                            data-node-id="5:1227"
                            data-name="Button:shadow"
                          />
                          <div
                            className="content-stretch flex flex-col items-center relative shrink-0"
                            data-node-id="5:1228"
                            data-name="Container"
                          >
                            <div
                              className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap"
                              data-node-id="5:1229"
                            >
                              <p className="leading-[20px]">{`S'abonner gratuitement`}</p>
                            </div>
                          </div>
                          <div
                            className="h-[12px] relative shrink-0 w-[14.25px]"
                            data-node-id="5:1230"
                            data-name="Container"
                          >
                            <img
                              alt=""
                              className="absolute block inset-0 max-w-none size-full"
                              src={imgContainer36}
                            />
                          </div>
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
          className="bg-surface-muted border-[rgba(194,198,211,0.3)] border-solid border-t content-stretch flex flex-col items-start relative shrink-0 w-full"
          data-node-id="5:1232"
          data-name="Footer"
        >
          <div
            className="content-stretch flex flex-col gap-[40px] items-start py-[40px] relative shrink-0 w-full shell"
            data-node-id="5:1233"
            data-name="Container"
          >
            <div
              className="content-stretch flex gap-[40px] items-start justify-center relative shrink-0 w-full"
              data-node-id="5:1234"
              data-name="Container"
            >
              <div
                className="flex-[1_0_0] h-[304.25px] min-w-px relative"
                data-node-id="5:1235"
                data-name="Container"
              >
                <div
                  className="absolute content-stretch flex gap-[12px] items-center left-0 right-0 top-0"
                  data-node-id="5:1236"
                  data-name="Container"
                >
                  <div
                    className="max-w-[262px] relative rounded-pill shrink-0 size-[32px]"
                    data-node-id="5:1237"
                    data-name="Logo Children's Smile Cameroun"
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-pill">
                      <img
                        alt=""
                        className="absolute left-0 max-w-none size-full top-0"
                        src={imgLogoChildrensSmileCameroun}
                      />
                    </div>
                  </div>
                  <div
                    className="content-stretch flex flex-col items-start relative shrink-0"
                    data-node-id="5:1238"
                    data-name="Container"
                  >
                    <div
                      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                      data-node-id="5:1239"
                      data-name="Container"
                    >
                      <div
                        className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-900 text-[20px] whitespace-nowrap"
                        data-node-id="5:1240"
                      >
                        <p className="leading-[25px]">{`Children's Smile`}</p>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                      data-node-id="5:1241"
                      data-name="Container"
                    >
                      <div
                        className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-ink-700 text-[11px] tracking-[1.1px] uppercase whitespace-nowrap"
                        data-node-id="5:1242"
                      >
                        <p className="leading-[16px]">CAMEROUN</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="absolute content-stretch flex flex-col items-start left-0 right-0 top-[55.75px]"
                  data-node-id="5:1243"
                  data-name="Container"
                >
                  <div
                    className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                    data-node-id="5:1244"
                  >
                    <p className="leading-[22.75px] mb-0">
                      Organisation humanitaire à but non
                    </p>
                    <p className="leading-[22.75px] mb-0">
                      lucratif dédiée à la protection,
                    </p>
                    <p className="leading-[22.75px] mb-0">{`l'éducation civique, la santé et`}</p>
                    <p className="leading-[22.75px] mb-0">{`l'épanouissement des enfants`}</p>
                    <p className="leading-[22.75px] mb-0">
                      vulnérables de 3 à 15 ans dans les
                    </p>
                    <p className="leading-[22.75px] mb-0">
                      zones rurales et périurbaines isolées
                    </p>
                    <p className="leading-[22.75px]">
                      des 10 régions du Cameroun.
                    </p>
                  </div>
                </div>
                <div
                  className="absolute content-stretch flex flex-col gap-[4px] items-start left-0 right-0 top-[232.25px]"
                  data-node-id="5:1245"
                  data-name="Container"
                >
                  <div
                    className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                    data-node-id="5:1246"
                    data-name="Container"
                  >
                    <div
                      className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-ink-900 text-[12px] w-full"
                      data-node-id="5:1247"
                    >
                      <p className="leading-[16px]">
                        Agrément Ministériel Officiel :
                      </p>
                    </div>
                  </div>
                  <div
                    className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                    data-node-id="5:1248"
                    data-name="Container"
                  >
                    <div
                      className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[12px] w-full"
                      data-node-id="5:1249"
                    >
                      <p className="leading-[16px]">
                        N° 000214/A/MINAT/SG/DAP/SDLP/SAC
                      </p>
                    </div>
                  </div>
                  <div
                    className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                    data-node-id="5:1250"
                    data-name="Container"
                  >
                    <div
                      className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[12px] w-full"
                      data-node-id="5:1251"
                    >
                      <p className="leading-[16px] mb-0">
                        Enregistrée sous le régime de la loi N°
                      </p>
                      <p className="leading-[16px]">90/053</p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px pb-[112.25px] relative"
                data-node-id="5:1252"
                data-name="Container"
              >
                <div
                  className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full"
                  data-node-id="5:1253"
                  data-name="Heading 3"
                >
                  <div
                    className="h-[17.083px] relative shrink-0 w-[17.5px]"
                    data-node-id="5:1254"
                    data-name="Container"
                  >
                    <img
                      alt=""
                      className="absolute block inset-0 max-w-none size-full"
                      src={imgContainer37}
                    />
                  </div>
                  <div
                    className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-900 text-[18px] whitespace-nowrap"
                    data-node-id="5:1256"
                  >
                    <p className="leading-[24px]">{`Piliers d'Intervention`}</p>
                  </div>
                </div>
                <div
                  className="content-stretch flex flex-col gap-[7.5px] items-start relative shrink-0 w-full"
                  data-node-id="5:1257"
                  data-name="List"
                >
                  <div
                    className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full"
                    data-node-id="5:1258"
                    data-name="Item → Link"
                  >
                    <div
                      className="bg-brand-900 relative rounded-pill shrink-0 size-[6px]"
                      data-node-id="5:1259"
                      data-name="Background"
                    />
                    <div
                      className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                      data-node-id="5:1260"
                    >
                      <p className="leading-[20px]">{`Scolarisation & Kits Pédagogiques`}</p>
                    </div>
                  </div>
                  <div
                    className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full"
                    data-node-id="5:1261"
                    data-name="Item → Link"
                  >
                    <div
                      className="bg-accent-700 relative rounded-pill shrink-0 size-[6px]"
                      data-node-id="5:1262"
                      data-name="Background"
                    />
                    <div
                      className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                      data-node-id="5:1263"
                    >
                      <p className="leading-[20px]">{`Cantines Solidaires & Nutrition Rurale`}</p>
                    </div>
                  </div>
                  <div
                    className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full"
                    data-node-id="5:1264"
                    data-name="Item → Link"
                  >
                    <div
                      className="bg-warn-700 relative rounded-pill shrink-0 size-[6px]"
                      data-node-id="5:1265"
                      data-name="Background"
                    />
                    <div
                      className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                      data-node-id="5:1266"
                    >
                      <p className="leading-[20px]">{`Protection Infantile & État Civil`}</p>
                    </div>
                  </div>
                  <div
                    className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full"
                    data-node-id="5:1267"
                    data-name="Item → Link"
                  >
                    <div
                      className="bg-brand-700 relative rounded-pill shrink-0 size-[6px]"
                      data-node-id="5:1268"
                      data-name="Background"
                    />
                    <div
                      className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                      data-node-id="5:1269"
                    >
                      <p className="leading-[20px]">{`Santé Préventive & Eau Potable`}</p>
                    </div>
                  </div>
                  <div
                    className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full"
                    data-node-id="5:1270"
                    data-name="Item → Link"
                  >
                    <div
                      className="bg-accent-300 relative rounded-pill shrink-0 size-[6px]"
                      data-node-id="5:1271"
                      data-name="Background"
                    />
                    <div
                      className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                      data-node-id="5:1272"
                    >
                      <p className="leading-[20px] mb-0">{`Mentorat & Autonomisation`}</p>
                      <p className="leading-[20px]">Communautaire</p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px pb-[88.25px] relative"
                data-node-id="5:1273"
                data-name="Container"
              >
                <div
                  className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full"
                  data-node-id="5:1274"
                  data-name="Heading 3"
                >
                  <div
                    className="h-[16.667px] relative shrink-0 w-[13.333px]"
                    data-node-id="5:1275"
                    data-name="Container"
                  >
                    <img
                      alt=""
                      className="absolute block inset-0 max-w-none size-full"
                      src={imgContainer38}
                    />
                  </div>
                  <div
                    className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-900 text-[18px] whitespace-nowrap"
                    data-node-id="5:1277"
                  >
                    <p className="leading-[24px] mb-0">{`Transparence &`}</p>
                    <p className="leading-[24px]">Gouvernance</p>
                  </div>
                </div>
                <div
                  className="content-stretch flex flex-col gap-[7.5px] items-start relative shrink-0 w-full"
                  data-node-id="5:1278"
                  data-name="List"
                >
                  <div
                    className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full"
                    data-node-id="5:1279"
                    data-name="Item → Link"
                  >
                    <div
                      className="h-[13.333px] relative shrink-0 w-[10.667px]"
                      data-node-id="5:1280"
                      data-name="Container"
                    >
                      <img
                        alt=""
                        className="absolute block inset-0 max-w-none size-full"
                        src={imgContainer39}
                      />
                    </div>
                    <div
                      className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                      data-node-id="5:1282"
                    >
                      <p className="leading-[20px]">{`Rapports Annuels & Audits CEMAC`}</p>
                    </div>
                  </div>
                  <div
                    className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full"
                    data-node-id="5:1283"
                    data-name="Item → Link"
                  >
                    <div
                      className="relative shrink-0 size-[13.333px]"
                      data-node-id="5:1284"
                      data-name="Container"
                    >
                      <img
                        alt=""
                        className="absolute block inset-0 max-w-none size-full"
                        src={imgContainer40}
                      />
                    </div>
                    <div
                      className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                      data-node-id="5:1286"
                    >
                      <p className="leading-[20px]">{`Comptes Certifiés BEAC & MinFi`}</p>
                    </div>
                  </div>
                  <div
                    className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full"
                    data-node-id="5:1287"
                    data-name="Item → Link"
                  >
                    <div
                      className="h-[8px] relative shrink-0 w-[16px]"
                      data-node-id="5:1288"
                      data-name="Container"
                    >
                      <img
                        alt=""
                        className="absolute block inset-0 max-w-none size-full"
                        src={imgContainer41}
                      />
                    </div>
                    <div
                      className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                      data-node-id="5:1290"
                    >
                      <p className="leading-[20px] mb-0">{`Conseil d'Administration`}</p>
                      <p className="leading-[20px]">Indépendant</p>
                    </div>
                  </div>
                  <div
                    className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full"
                    data-node-id="5:1291"
                    data-name="Item → Link"
                  >
                    <div
                      className="h-[13.333px] relative shrink-0 w-[14.673px]"
                      data-node-id="5:1292"
                      data-name="Container"
                    >
                      <img
                        alt=""
                        className="absolute block inset-0 max-w-none size-full"
                        src={imgContainer42}
                      />
                    </div>
                    <div
                      className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                      data-node-id="5:1294"
                    >
                      <p className="leading-[20px]">{`Partenariats Institutionnels & ONGs`}</p>
                    </div>
                  </div>
                  <div
                    className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full"
                    data-node-id="5:1295"
                    data-name="Item → Link"
                  >
                    <div
                      className="relative shrink-0 size-[12px]"
                      data-node-id="5:1296"
                      data-name="Container"
                    >
                      <img
                        alt=""
                        className="absolute block inset-0 max-w-none size-full"
                        src={imgContainer43}
                      />
                    </div>
                    <div
                      className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                      data-node-id="5:1298"
                    >
                      <p className="leading-[20px]">{`Suivi Terrain & Taux d'Impact 92%`}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px pb-[104.25px] relative"
                data-node-id="5:1299"
                data-name="Container"
              >
                <div
                  className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full"
                  data-node-id="5:1300"
                  data-name="Heading 3"
                >
                  <div
                    className="h-[15px] relative shrink-0 w-[16.667px]"
                    data-node-id="5:1301"
                    data-name="Container"
                  >
                    <img
                      alt=""
                      className="absolute block inset-0 max-w-none size-full"
                      src={imgContainer44}
                    />
                  </div>
                  <div
                    className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-900 text-[18px] whitespace-nowrap"
                    data-node-id="5:1303"
                  >
                    <p className="leading-[24px]">{`Ligne Directe & Soutien`}</p>
                  </div>
                </div>
                <div
                  className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full"
                  data-node-id="5:1304"
                  data-name="Container"
                >
                  <div
                    className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full"
                    data-node-id="5:1305"
                    data-name="Container"
                  >
                    <div
                      className="h-[15.5px] relative shrink-0 w-[13.5px]"
                      data-node-id="5:1306"
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
                      data-node-id="5:1308"
                      data-name="Container"
                    >
                      <div
                        className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                        data-node-id="5:1309"
                        data-name="Container"
                      >
                        <div
                          className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-ink-900 text-[14px] whitespace-nowrap"
                          data-node-id="5:1310"
                        >
                          <p className="leading-[20px]">Permanence Siège :</p>
                        </div>
                      </div>
                      <div
                        className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                        data-node-id="5:1311"
                        data-name="Container"
                      >
                        <div
                          className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                          data-node-id="5:1312"
                        >
                          <p className="leading-[20px]">+237 699 09 86 88</p>
                        </div>
                      </div>
                      <div
                        className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                        data-node-id="5:1313"
                        data-name="Container"
                      >
                        <div
                          className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                          data-node-id="5:1314"
                        >
                          <p className="leading-[20px]">+237 650 88 11 55</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-full"
                    data-node-id="5:1315"
                    data-name="Margin"
                  >
                    <div
                      className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full"
                      data-node-id="5:1316"
                      data-name="Container"
                    >
                      <div
                        className="h-[17px] relative shrink-0 w-[15px]"
                        data-node-id="5:1317"
                        data-name="Margin"
                      >
                        <img
                          alt=""
                          className="absolute block inset-0 max-w-none size-full"
                          src={imgMargin1}
                        />
                      </div>
                      <div
                        className="content-stretch flex flex-col items-start relative shrink-0"
                        data-node-id="5:1319"
                        data-name="Container"
                      >
                        <div
                          className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                          data-node-id="5:1320"
                          data-name="Container"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-ink-900 text-[14px] whitespace-nowrap"
                            data-node-id="5:1321"
                          >
                            <p className="leading-[20px]">
                              WhatsApp Coordination :
                            </p>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                          data-node-id="5:1322"
                          data-name="Container"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                            data-node-id="5:1323"
                          >
                            <p className="leading-[20px]">
                              +237 699 09 86 88 (Direct Terrain)
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-full"
                    data-node-id="5:1324"
                    data-name="Margin"
                  >
                    <div
                      className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full"
                      data-node-id="5:1325"
                      data-name="Container"
                    >
                      <div
                        className="h-[14px] relative shrink-0 w-[16.5px]"
                        data-node-id="5:1326"
                        data-name="Margin"
                      >
                        <img
                          alt=""
                          className="absolute block inset-0 max-w-none size-full"
                          src={imgMargin2}
                        />
                      </div>
                      <div
                        className="content-stretch flex flex-col items-start relative shrink-0"
                        data-node-id="5:1328"
                        data-name="Container"
                      >
                        <div
                          className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                          data-node-id="5:1329"
                          data-name="Container"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-ink-900 text-[14px] whitespace-nowrap"
                            data-node-id="5:1330"
                          >
                            <p className="leading-[20px]">
                              Canaux de Dons Certifiés :
                            </p>
                          </div>
                        </div>
                        <div
                          className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                          data-node-id="5:1331"
                          data-name="Container"
                        >
                          <div
                            className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[12px] whitespace-nowrap"
                            data-node-id="5:1332"
                          >
                            <p className="leading-[16px]">{`Orange Money & MTN MoMo officiels`}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="border-[rgba(194,198,211,0.3)] border-solid border-t content-stretch flex items-center justify-between pt-[24px] relative shrink-0 w-full"
              data-node-id="5:1333"
              data-name="HorizontalBorder"
            >
              <div
                className="content-stretch flex flex-col items-start relative shrink-0"
                data-node-id="5:1334"
                data-name="Container"
              >
                <div
                  className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                  data-node-id="5:1335"
                >
                  <p className="leading-[20px]">{`© 2025 Children's Smile Cameroun. Tous droits réservés.`}</p>
                </div>
              </div>
              <div
                className="content-stretch flex gap-[16px] items-center justify-center relative shrink-0"
                data-node-id="5:1336"
                data-name="Container"
              >
                <div
                  className="content-stretch flex flex-col items-start relative shrink-0"
                  data-node-id="5:1337"
                  data-name="Link"
                >
                  <div
                    className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[12px] whitespace-nowrap"
                    data-node-id="5:1338"
                  >
                    <p className="leading-[16px]">{`Politique de Sauvegarde de l'Enfance`}</p>
                  </div>
                </div>
                <div
                  className="content-stretch flex flex-col items-start relative shrink-0"
                  data-node-id="5:1339"
                  data-name="Container"
                >
                  <div
                    className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-300 text-[12px] whitespace-nowrap"
                    data-node-id="5:1340"
                  >
                    <p className="leading-[16px]" data-decorative-separator="true">•</p>
                  </div>
                </div>
                <div
                  className="content-stretch flex flex-col items-start relative shrink-0"
                  data-node-id="5:1341"
                  data-name="Link"
                >
                  <div
                    className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[12px] whitespace-nowrap"
                    data-node-id="5:1342"
                  >
                    <p className="leading-[16px]">{`Mentions Légales & RGPD`}</p>
                  </div>
                </div>
                <div
                  className="content-stretch flex flex-col items-start relative shrink-0"
                  data-node-id="5:1343"
                  data-name="Container"
                >
                  <div
                    className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-300 text-[12px] whitespace-nowrap"
                    data-node-id="5:1344"
                  >
                    <p className="leading-[16px]" data-decorative-separator="true">•</p>
                  </div>
                </div>
                <div
                  className="content-stretch flex flex-col items-start relative shrink-0"
                  data-node-id="5:1345"
                  data-name="Link"
                >
                  <div
                    className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[12px] whitespace-nowrap"
                    data-node-id="5:1346"
                  >
                    <p className="leading-[16px]">{`Code d'éthique et Déontologie`}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute backdrop-blur-[6px] bg-[rgba(250,248,255,0.95)] content-stretch flex flex-col items-start left-0 shadow-[0px_1px_8px_0px_rgba(11,92,171,0.08)] top-0 w-full max-w-shell"
          data-node-id="5:1347"
          data-name="Header"
        >
          <div
            className="bg-brand-900 content-stretch flex flex-col items-start py-[4px] relative shrink-0 w-full shell"
            data-node-id="5:1348"
            data-name="Background"
          >
            <div
              className="content-stretch flex items-center justify-between relative shrink-0 w-full shell"
              data-node-id="5:1349"
              data-name="Container"
            >
              <div
                className="content-stretch flex gap-[16px] items-center relative shrink-0"
                data-node-id="5:1350"
                data-name="Container"
              >
                <div
                  className="bg-brand-700 content-stretch flex gap-[4px] items-center px-[8px] py-[2px] relative rounded-pill shrink-0"
                  data-node-id="5:1351"
                  data-name="Background"
                >
                  <div
                    className="h-[12.25px] relative shrink-0 w-[12.833px]"
                    data-node-id="5:1352"
                    data-name="Container"
                  >
                    <img
                      alt=""
                      className="absolute block inset-0 max-w-none size-full"
                      src={imgContainer45}
                    />
                  </div>
                  <div
                    className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-300 text-[11px] tracking-[0.55px] uppercase whitespace-nowrap"
                    data-node-id="5:1354"
                  >
                    <p className="leading-[16px]">
                      ONG AGRÉÉE RÉPUBLIQUE DU CAMEROUN - 10 RÉGIONS
                    </p>
                  </div>
                </div>
                <div
                  className="content-stretch flex gap-[3.99px] items-center relative shrink-0"
                  data-node-id="5:1355"
                  data-name="Container"
                >
                  <div
                    className="relative shrink-0 size-[10.5px]"
                    data-node-id="5:1356"
                    data-name="Container"
                  >
                    <img
                      alt=""
                      className="absolute block inset-0 max-w-none size-full"
                      src={imgContainer46}
                    />
                  </div>
                  <div
                    className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-brand-100 text-[12px] whitespace-nowrap"
                    data-node-id="5:1358"
                  >
                    <p className="leading-[16px]">
                      +237 699 09 86 88 / 650 88 11 55
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="content-stretch flex gap-[16px] items-center relative shrink-0"
                data-node-id="5:1359"
                data-name="Container"
              >
                <div
                  className="content-stretch flex gap-[3.99px] items-center relative shrink-0"
                  data-node-id="5:1360"
                  data-name="Container"
                >
                  <div
                    className="relative shrink-0 size-[11.667px]"
                    data-node-id="5:1361"
                    data-name="Container"
                  >
                    <img
                      alt=""
                      className="absolute block inset-0 max-w-none size-full"
                      src={imgContainer47}
                    />
                  </div>
                  <div
                    className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-brand-100 text-[12px] whitespace-nowrap"
                    data-node-id="5:1363"
                  >
                    <p className="leading-[16px]">
                      Yaoundé • Douala • Grand-Nord • Est
                    </p>
                  </div>
                </div>
                <div
                  className="bg-accent-700 content-stretch flex flex-col items-start px-[8px] py-[2px] relative rounded-pill shrink-0"
                  data-node-id="5:1364"
                  data-name="Background"
                >
                  <div
                    className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[11px] text-white whitespace-nowrap"
                    data-node-id="5:1365"
                  >
                    <p className="leading-[16px]">{`Orange & MTN MoMo OK`}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="content-stretch flex h-[80px] items-center justify-between relative shrink-0 w-full shell"
            data-node-id="5:1366"
            data-name="Container"
          >
            <div
              className="content-stretch flex gap-[12px] items-center relative shrink-0"
              data-node-id="5:1367"
              data-name="Link"
            >
              <div
                className="max-w-[221.47000122070312px] relative rounded-pill shrink-0 size-[32px]"
                data-node-id="5:1368"
                data-name="Children's Smile Cameroun"
              >
                <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-pill">
                  <img
                    alt=""
                    className="absolute left-0 max-w-none size-full top-0"
                    src={imgLogoChildrensSmileCameroun}
                  />
                </div>
              </div>
              <div
                className="content-stretch flex flex-col items-start relative shrink-0"
                data-node-id="5:1369"
                data-name="Container"
              >
                <div
                  className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                  data-node-id="5:1370"
                  data-name="Container"
                >
                  <div
                    className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-brand-900 text-[20px] tracking-[-0.5px] whitespace-nowrap"
                    data-node-id="5:1371"
                  >
                    <p className="leading-[25px]">{`Children's Smile`}</p>
                  </div>
                </div>
                <div
                  className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                  data-node-id="5:1372"
                  data-name="Container"
                >
                  <div
                    className="[word-break:break-word] flex flex-col font-['Montserrat:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-ink-700 text-[11px] tracking-[1.1px] uppercase whitespace-nowrap"
                    data-node-id="5:1373"
                  >
                    <p className="leading-[16px] mb-0">{`CAMEROUN • ENFANCE &`}</p>
                    <p className="leading-[16px]">AVENIR</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="content-stretch flex gap-[4px] items-center relative shrink-0"
              data-node-id="5:1374"
              data-name="Nav"
            >
              <div
                className="content-stretch flex flex-col items-start px-[12px] py-[8px] relative shrink-0"
                data-node-id="5:1375"
                data-name="Link"
              >
                <div
                  className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                  data-node-id="5:1376"
                >
                  <p className="leading-[20px]">Accueil</p>
                </div>
              </div>
              <div
                className="content-stretch flex flex-col items-start px-[12px] py-[8px] relative shrink-0"
                data-node-id="5:1377"
                data-name="Link"
              >
                <div
                  className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                  data-node-id="5:1378"
                >
                  <p className="leading-[20px] mb-0">À</p>
                  <p className="leading-[20px]">propos</p>
                </div>
              </div>
              <div
                className="content-stretch flex flex-col items-start pl-[12px] pr-[13.88px] py-[8px] relative shrink-0"
                data-node-id="5:1379"
                data-name="Link"
              >
                <div
                  className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                  data-node-id="5:1380"
                >
                  <p className="leading-[20px] mb-0">Nos</p>
                  <p className="leading-[20px]">actions</p>
                </div>
              </div>
              <div
                className="content-stretch flex flex-col items-start pl-[12px] pr-[14.82px] py-[8px] relative shrink-0"
                data-node-id="5:1381"
                data-name="Link"
              >
                <div
                  className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                  data-node-id="5:1382"
                >
                  <p className="leading-[20px] mb-0">Nos</p>
                  <p className="leading-[20px]">projets</p>
                </div>
              </div>
              <div
                className="content-stretch flex flex-col items-start pl-[12px] pr-[22px] py-[8px] relative shrink-0"
                data-node-id="5:1383"
                data-name="Link"
              >
                <div
                  className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                  data-node-id="5:1384"
                >
                  <p className="leading-[20px] mb-0">Notre</p>
                  <p className="leading-[20px]">impact</p>
                </div>
              </div>
              <div
                className="content-stretch flex flex-col items-start px-[12px] py-[8px] relative shrink-0"
                data-node-id="5:1385"
                data-name="Link"
              >
                <div
                  className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-brand-900 text-[14px] whitespace-nowrap"
                  data-node-id="5:1386"
                >
                  <p className="leading-[20px]">Actualités</p>
                </div>
              </div>
              <div
                className="content-stretch flex flex-col items-start pl-[12px] pr-[17.22px] py-[8px] relative shrink-0"
                data-node-id="5:1387"
                data-name="Link"
              >
                <div
                  className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                  data-node-id="5:1388"
                >
                  <p className="leading-[20px] mb-0">Nous</p>
                  <p className="leading-[20px]">soutenir</p>
                </div>
              </div>
              <div
                className="content-stretch flex flex-col items-start px-[12px] py-[8px] relative shrink-0"
                data-node-id="5:1389"
                data-name="Link"
              >
                <div
                  className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-ink-700 text-[14px] whitespace-nowrap"
                  data-node-id="5:1390"
                >
                  <p className="leading-[20px]">Contact</p>
                </div>
              </div>
            </div>
            <div
              className="content-stretch flex gap-[16.01px] items-center relative shrink-0"
              data-node-id="5:1391"
              data-name="Container"
            >
              <div
                className="bg-accent-700 content-stretch flex items-center pl-[16px] pr-[41.9px] relative rounded-pill shrink-0 btn-md btn"
                data-node-id="5:1392"
                data-name="Link"
              >
                <div
                  className="absolute bg-[rgba(255,255,255,0)] inset-[0_0.16px_0_0] rounded-pill shadow-[0px_2px_8px_-2px_rgba(0,110,45,0.3)]"
                  data-node-id="5:1393"
                  data-name="Link:shadow"
                />
                <div
                  className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap"
                  data-node-id="5:1394"
                >
                  <p className="leading-[20px]">Devenir</p>
                </div>
                <div
                  className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap"
                  data-node-id="5:1395"
                >
                  <p className="leading-[20px]">Partenaire</p>
                </div>
              </div>
              <div
                className="[word-break:break-word] bg-warn-700 content-stretch drop-shadow-[0px_4px_7px_rgba(163,57,0,0.35)] flex font-['Inter:Semi_Bold'] font-semibold items-center leading-[0] not-italic pl-[20px] pr-[36.15px] relative rounded-pill shrink-0 text-[14px] text-center text-white whitespace-nowrap btn-md btn"
                data-node-id="5:1396"
                data-name="Link"
              >
                <div
                  className="btn-label flex flex-col justify-center relative"
                  data-node-id="5:1397"
                >
                  <p className="leading-[20px]">Nous</p>
                </div>
                <div
                  className="flex flex-col justify-center relative shrink-0"
                  data-node-id="5:1398"
                >
                  <p className="leading-[20px]">Soutenir</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
