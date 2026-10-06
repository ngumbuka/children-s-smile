import { useMemo } from "react"
import { Link } from "react-router-dom"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { Icon } from "../components/Icon"
import type { IconName } from "../components/Icon"
import { formatXOF } from "../lib/repositories"
import { usePublicGifts, usePublishedProjects } from "../lib/public"

const assetPathPrefix = "/assets"
const imgHero = `${assetPathPrefix}/1720c.png`
const imgLogo = `${assetPathPrefix}/1fe61.png`
const imgMission = `${assetPathPrefix}/c5599.png`
const imgProjectClassroom = `${assetPathPrefix}/8894c.png`
const imgProjectWater = `${assetPathPrefix}/6a646.png`
const imgProjectNutrition = `${assetPathPrefix}/70a8f.png`
const imgCheck = `${assetPathPrefix}/2d5a7.svg`

const pillars = [
  {
    icon: "graduationCap",
    title: "Scolarisation",
    desc: `Fournitures, manuels, mobilier scolaire et accompagnement pédagogique pour les enfants des zones rurales.`,
    color: "bg-surface-tint",
  },
  {
    icon: "utensils",
    title: "Cantines solidaires",
    desc: `Des repas réguliers pour favoriser l'assiduité, la concentration et la réussite de chaque élève.`,
    color: "bg-[#e9f8ef]",
  },
  {
    icon: "shieldCheck",
    title: "Protection infantile",
    desc: `État civil, écoute et protection des droits fondamentaux des enfants les plus vulnérables.`,
    color: "bg-[#fff1e8]",
  },
  {
    icon: "heartPulse",
    title: "Santé & eau potable",
    desc: `Accès à l'eau, prévention sanitaire et kits d'hygiène au cœur des communautés scolaires.`,
    color: "bg-[#ebf3fc]",
  },
]

const steps = [
  {
    number: "01",
    title: "Écouter le terrain",
    desc: `Les besoins sont identifiés avec les écoles, les familles et les autorités locales.`,
  },
  {
    number: "02",
    title: "Agir avec la communauté",
    desc: `Artisans et bénévoles locaux participent à chaque étape de la mise en œuvre.`,
  },
  {
    number: "03",
    title: `Mesurer l'impact`,
    desc: `Chaque action est documentée, suivie et partagée avec nos donateurs et partenaires.`,
  },
]

export default function Accueil() {
  const published = usePublishedProjects()
  const gifts = usePublicGifts()

  const projects = useMemo(() => published.slice(0, 3), [published])

  const stats = useMemo(() => {
    const total = gifts.reduce((acc, gift) => acc + gift.amount, 0)
    const donors = new Set(gifts.map((gift) => gift.donorEmail)).size
    return [
      { value: String(donors), label: "Donateurs", color: "text-accent-700" },
      {
        value: formatXOF(total).replace(/\u00a0/g, " "),
        label: "Collecté à ce jour",
        color: "text-brand-900",
      },
      {
        value: String(published.length),
        label: "Projets documentés",
        color: "text-warn-700",
      },
      {
        value: String(new Set(published.map((doc) => doc.region)).size),
        label: "Régions couvertes",
        color: "text-brand-700",
      },
    ]
  }, [gifts, published])

  return (
    <div className="bg-surface-subtle flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      <main id="main-content" className="flex flex-col w-full">
        <section className="relative bg-brand-900 flex min-h-[620px] items-center overflow-hidden py-16 w-full sm:min-h-[680px] sm:py-20 lg:py-24">
          <div className="absolute inset-0 overflow-hidden">
            <img
              alt="Équipe et bénéficiaires de Children's Smile Cameroun dans une salle de classe"
              className="h-full w-full object-cover opacity-30"
              src={imgHero}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#003566] via-[rgba(0,68,132,0.92)] to-[rgba(0,68,132,0.68)]" />
          <div className="relative flex flex-col gap-7 items-start mx-auto w-full shell">
            <div className="bg-[rgba(255,255,255,0.12)] border border-[rgba(255,255,255,0.2)] flex gap-3 items-center px-4 py-2 rounded-pill">
              <img alt="" className="rounded-pill size-7" src={imgLogo} />
              <p className="font-['Montserrat'] font-bold text-white text-[10px] tracking-[1.4px] uppercase sm:text-xs">
                ONG camerounaise agréée • 10 régions
              </p>
            </div>
            <div className="flex flex-col gap-5 max-w-[820px]">
              <h1 className="font-['Montserrat'] font-extrabold text-white text-4xl leading-[1.15] tracking-[-1px] sm:text-5xl lg:text-6xl">
                Chaque enfant mérite une école, un repas et un avenir.
              </h1>
              <p className="font-['Inter'] font-normal text-brand-100 text-base leading-7 max-w-[720px] sm:text-lg sm:leading-8">
                {`Children's Smile Cameroun agit aux côtés des communautés pour rendre l'éducation, la santé et la protection accessibles aux enfants de 3 à 15 ans.`}
              </p>
            </div>
            <div className="flex flex-col gap-3 w-full sm:flex-row sm:w-auto">
              <Link
                to="/nous-soutenir"
                className="bg-warn-700 drop-shadow-[0px_4px_7px_rgba(163,57,0,0.35)] flex justify-center rounded-pill hover:bg-warn-800 transition-colors btn-lg btn"
              >
                <p className="font-['Inter'] font-bold text-sm text-white">
                  Soutenir une action
                </p>
              </Link>
              <Link
                to="/nos-projets"
                className="bg-[rgba(255,255,255,0.12)] border border-[rgba(255,255,255,0.35)] flex justify-center rounded-pill hover:bg-[rgba(255,255,255,0.22)] transition-colors btn-lg btn"
              >
                <p className="font-['Inter'] font-semibold text-sm text-white">
                  Voir nos projets
                </p>
              </Link>
            </div>
            <p className="font-['Inter'] font-semibold text-brand-300 text-xs leading-5">
              Dons sécurisés • Actions suivies • Impact documenté
            </p>
          </div>
        </section>

        <section
          aria-label="Notre impact en chiffres"
          className="bg-white border-b border-surface-tint w-full"
        >
          <div className="grid grid-cols-2 w-full lg:grid-cols-4 shell">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="border-b border-r border-surface-tint flex flex-col gap-1 items-center justify-center min-h-28 px-3 py-6 text-center lg:border-b-0 lg:min-h-32"
              >
                <p
                  className={`font-['Montserrat'] font-extrabold text-3xl sm:text-4xl ${stat.color}`}
                >
                  {stat.value}
                </p>
                <p className="font-['Inter'] font-semibold text-ink-700 text-xs sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className=" py-16 w-full sm:py-20 lg:py-24">
          <div className="grid gap-10 items-center mx-auto w-full lg:grid-cols-2 lg:gap-16 shell">
            <div className="relative">
              <img
                alt="Enfants souriants dans une classe rurale au Cameroun"
                className="aspect-[4/3] object-cover rounded-xl w-full"
                src={imgMission}
              />
              <div className="absolute bg-white bottom-4 left-4 max-w-[240px] p-4 rounded-xl shadow-[0px_8px_30px_rgba(0,68,132,0.16)] sm:bottom-6 sm:left-6">
                <p className="font-['Montserrat'] font-extrabold text-accent-700 text-2xl">
                  Depuis 2017
                </p>
                <p className="font-['Inter'] font-semibold text-ink-700 text-xs leading-5">
                  Aux côtés des enfants et de leurs communautés.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-6 items-start">
              <div className="flex flex-col gap-3">
                <p className="font-['Montserrat'] font-bold text-accent-700 text-[11px] tracking-[1.1px] uppercase">
                  Notre mission
                </p>
                <h2 className="font-['Montserrat'] font-bold text-brand-900 text-3xl leading-tight sm:text-4xl">
                  Transformer durablement le quotidien des enfants
                </h2>
                <p className="font-['Inter'] font-normal text-ink-700 text-base leading-7">
                  Nous construisons des réponses concrètes avec les acteurs
                  locaux. Une salle réhabilitée, un point d'eau ou une cantine
                  deviennent le point de départ d'une communauté plus forte.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  "Des projets conçus avec les communautés",
                  "Des achats et emplois privilégiés localement",
                  "Un suivi transparent de chaque intervention",
                ].map((item) => (
                  <div key={item} className="flex gap-3 items-center">
                    <img alt="" className="size-5 shrink-0" src={imgCheck} />
                    <p className="font-['Inter'] font-semibold text-ink-900 text-sm">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
              <Link
                to="/a-propos"
                className="font-['Inter'] font-bold text-brand-900 text-sm hover:text-brand-700 transition-colors"
              >
                Découvrir notre histoire →
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-surface-muted py-16 w-full sm:py-20 lg:py-24">
          <div className="flex flex-col gap-10 items-center mx-auto w-full shell">
            <div className="flex flex-col gap-3 items-center max-w-[720px] text-center">
              <p className="font-['Montserrat'] font-bold text-accent-700 text-[11px] tracking-[1.1px] uppercase">
                Nos piliers d'action
              </p>
              <h2 className="font-['Montserrat'] font-bold text-brand-900 text-3xl leading-tight sm:text-4xl">
                Agir sur tous les leviers de l'enfance
              </h2>
              <p className="font-['Inter'] font-normal text-ink-700 text-base leading-7">
                Nos programmes répondent aux besoins essentiels qui permettent à
                un enfant d'apprendre, de grandir et de se protéger.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 w-full sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {pillars.map((pillar) => (
                <Link
                  key={pillar.title}
                  to="/nos-actions"
                  aria-label={`En savoir plus sur ${pillar.title}`}
                  className="bg-white border border-surface-tint flex flex-col gap-4 items-start p-6 rounded-xl shadow-[0px_2px_10px_rgba(0,68,132,0.05)] card-lift hover:border-brand-300 focus-visible:outline-2 focus-visible:outline-brand-700"
                >
                  <div
                    className={`${pillar.color} flex items-center justify-center rounded-pill size-12`}
                  >
                    <Icon
                      className="text-brand-900 max-h-6 max-w-6"
                      name={pillar.icon as IconName}
                    />
                  </div>
                  <h3 className="font-['Montserrat'] font-bold text-brand-900 text-lg">
                    {pillar.title}
                  </h3>
                  <p className="font-['Inter'] font-normal text-ink-700 text-sm leading-6">
                    {pillar.desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 w-full sm:py-20 lg:py-24">
          <div className="flex flex-col gap-10 mx-auto w-full shell">
            <div className="flex flex-col gap-5 items-start justify-between lg:flex-row lg:items-end">
              <div className="flex flex-col gap-3 max-w-[700px]">
                <p className="font-['Montserrat'] font-bold text-warn-700 text-[11px] tracking-[1.1px] uppercase">
                  Sur le terrain
                </p>
                <h2 className="font-['Montserrat'] font-bold text-brand-900 text-3xl leading-tight sm:text-4xl">
                  Des projets utiles, visibles et durables
                </h2>
                <p className="font-['Inter'] font-normal text-ink-700 text-base leading-7">
                  Découvrez comment votre soutien se transforme en solutions
                  concrètes dans les écoles et les villages.
                </p>
              </div>
              <Link
                to="/nos-projets"
                className="font-['Inter'] font-bold text-brand-900 text-sm hover:text-brand-700 transition-colors"
              >
                Tous nos projets →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {projects.map((project) => (
                <Link
                  className="border border-surface-tint flex flex-col overflow-hidden rounded-xl hover:border-brand-700 transition-colors card-lift"
                  key={project._id}
                  to={`/nos-projets/${project.slug}`}
                >
                  <img
                    alt={project.title}
                    className="aspect-[16/10] object-cover w-full"
                    src={`${assetPathPrefix}/${project.image}`}
                  />
                  <div className="flex flex-1 flex-col gap-3 items-start p-5 sm:p-6">
                    <p className="bg-[#e9f8ef] font-['Montserrat'] font-bold px-3 py-1 rounded-pill text-accent-700 text-[10px] tracking-[0.5px] uppercase">
                      {project.region}
                    </p>
                    <h3 className="line-clamp-2 font-['Montserrat'] font-bold text-brand-900 text-xl leading-7">
                      {project.title}
                    </h3>
                    <p className="line-clamp-3 font-['Inter'] font-normal text-ink-700 text-sm leading-6">
                      {project.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className=" py-16 w-full sm:py-20 lg:py-24">
          <div className="flex flex-col gap-10 mx-auto w-full shell">
            <div className="flex flex-col gap-3 max-w-[700px]">
              <p className="font-['Montserrat'] font-bold text-accent-700 text-[11px] tracking-[1.1px] uppercase">
                Notre méthode
              </p>
              <h2 className="font-['Montserrat'] font-bold text-brand-900 text-3xl leading-tight sm:text-4xl">
                Du besoin identifié à l'impact mesuré
              </h2>
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              {steps.map((step) => (
                <article
                  key={step.number}
                  className="bg-white border border-surface-tint flex gap-5 items-start p-6 rounded-xl lg:flex-col card-lift"
                >
                  <p className="font-['Montserrat'] font-extrabold text-[#5c7599] text-3xl">
                    {step.number}
                  </p>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-['Montserrat'] font-bold text-brand-900 text-lg">
                      {step.title}
                    </h3>
                    <p className="font-['Inter'] font-normal text-ink-700 text-sm leading-6">
                      {step.desc}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-brand-900 py-16 w-full sm:py-20">
          <div className="grid gap-10 items-center mx-auto w-full lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 shell">
            <div className="flex flex-col gap-5 items-start">
              <p className="font-['Montserrat'] font-bold text-accent-300 text-[11px] tracking-[1.1px] uppercase">
                Transparence & confiance
              </p>
              <h2 className="font-['Montserrat'] font-bold text-white text-3xl leading-tight sm:text-4xl">
                Votre don suit un chemin clair jusqu'au terrain
              </h2>
              <p className="font-['Inter'] font-normal text-brand-100 text-base leading-7">
                88 % des contributions sont directement engagées dans les
                programmes. Nos opérations sont documentées et soumises à un
                suivi régulier.
              </p>
              <Link
                to="/notre-impact"
                className="font-['Inter'] font-bold text-white text-sm hover:text-accent-300 transition-colors"
              >
                Consulter notre impact →
              </Link>
            </div>
            <div className="bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] flex flex-col gap-5 p-6 rounded-xl sm:p-8">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="font-['Montserrat'] font-extrabold text-white text-5xl">
                    88%
                  </p>
                  <p className="font-['Inter'] font-semibold text-brand-100 text-sm">
                    directement sur le terrain
                  </p>
                </div>
                <p className="font-['Montserrat'] font-bold text-accent-300 text-sm">
                  Impact direct
                </p>
              </div>
              <div className="bg-[rgba(255,255,255,0.18)] h-3 overflow-hidden rounded-pill w-full">
                <div className="bg-accent-300 h-full rounded-pill w-[88%]" />
              </div>
              <div className="border-t border-[rgba(255,255,255,0.18)] grid grid-cols-2 gap-4 pt-5">
                <div>
                  <p className="font-['Montserrat'] font-bold text-white text-xl">
                    Loi 90/053
                  </p>
                  <p className="font-['Inter'] text-brand-300 text-xs">
                    Agrément officiel
                  </p>
                </div>
                <div>
                  <p className="font-['Montserrat'] font-bold text-white text-xl">
                    CEMAC
                  </p>
                  <p className="font-['Inter'] text-brand-300 text-xs">
                    Suivi bancaire
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface-muted px-4 py-16 w-full sm:px-8 sm:py-20 lg:px-14">
          <div className="bg-white border border-surface-tint flex flex-col gap-6 items-center max-w-[960px] mx-auto px-5 py-10 rounded-xl text-center w-full sm:px-10 sm:py-14">
            <p className="font-['Montserrat'] font-bold text-warn-700 text-[11px] tracking-[1.1px] uppercase">
              Agir maintenant
            </p>
            <h2 className="font-['Montserrat'] font-bold text-brand-900 text-3xl leading-tight max-w-[680px] sm:text-4xl">
              Ensemble, faisons grandir les sourires et les possibilités
            </h2>
            <p className="font-['Inter'] font-normal text-ink-700 text-base leading-7 max-w-[620px]">
              Un don, un partenariat ou quelques heures de bénévolat peuvent
              ouvrir une nouvelle voie à un enfant.
            </p>
            <div className="flex flex-col gap-3 w-full sm:flex-row sm:justify-center sm:w-auto">
              <Link
                to="/don"
                className="bg-warn-700 flex justify-center rounded-pill hover:bg-warn-800 transition-colors btn-lg btn"
              >
                <p className="font-['Inter'] font-bold text-sm text-white">
                  Faire un don sécurisé
                </p>
              </Link>
              <Link
                to="/contact"
                className="border border-brand-900 flex justify-center rounded-pill hover:bg-surface-tint transition-colors btn-lg btn"
              >
                <p className="font-['Inter'] font-bold text-brand-900 text-sm">
                  Devenir partenaire
                </p>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
