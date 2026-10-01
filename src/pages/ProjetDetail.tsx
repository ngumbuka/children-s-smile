import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { Icon } from "../components/Icon"
import { ProgressMeter } from "../components/shared/ProgressMeter"
import {
  formatXOF,
  getProject,
  listProjects,
  listTransactions,
} from "../lib/repositories"
import type { ProjectDoc, TransactionDoc } from "../lib/models"

export default function ProjetDetail() {
  const { slug = "" } = useParams()
  const [project, setProject] = useState<ProjectDoc | null>(null)
  const [related, setRelated] = useState<ProjectDoc[]>([])
  const [gifts, setGifts] = useState<TransactionDoc[]>([])
  const [state, setState] = useState<"loading" | "ready" | "missing">("loading")

  useEffect(() => {
    let live = true
    setState("loading")
    void (async () => {
      const found = await getProject(slug)
      if (!live) return
      setProject(found)
      if (!found) {
        setState("missing")
        return
      }
      const [all, txs] = await Promise.all([listProjects(), listTransactions({ projectSlug: slug })])
      if (!live) return
      setRelated(
        all.filter((p) => p.slug !== slug && (p.category === found.category || p.region === found.region)).slice(0, 3),
      )
      setGifts(txs.filter((t) => t.status === "succeeded").slice(0, 5))
      setState("ready")
    })()
    return () => {
      live = false
    }
  }, [slug])

  if (state === "loading") {
    return (
      <div className="bg-surface-subtle min-h-screen text-ink-600">
        <Header />
        <main className="mx-auto w-full max-w-[1168px] px-4 py-24 text-body">Chargement du projet…</main>
        <Footer />
      </div>
    )
  }

  if (state === "missing" || !project) {
    return (
      <div className="bg-surface-subtle min-h-screen text-ink-600">
        <Header />
        <main className="mx-auto w-full max-w-[1168px] px-4 py-24">
          <p className="text-body">Ce projet n'existe pas ou n'est plus publié.</p>
          <Link className="btn btn-md btn-primary mt-6" to="/nos-projets">
            <span className="btn-label">Retour aux projets</span>
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  const remaining = Math.max(0, project.target - project.raised)

  return (
    <div className="bg-surface-subtle flex min-h-screen flex-col text-ink-900">
      <Header />

      <main className="flex-1">
        <div className="mx-auto w-full max-w-[1168px] px-4 pt-10">
          <Link className="link-back" to="/nos-projets">
            <Icon name="arrowLeftRight" className="btn-icon scale-x-[-1]" />
            <span className="btn-label">Tous les projets</span>
          </Link>
        </div>

        <section className="mx-auto w-full max-w-[1168px] px-4 pt-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="badge badge-brand">{project.categoryLabel}</span>
            <span className="badge badge-neutral">{project.location}</span>
            <span
              className={`badge ${project.status === "delivered" ? "badge-success" : "badge-warn"}`}
            >
              {project.statusLabel}
            </span>
          </div>

          <h1 className="text-h1 mt-4 max-w-[22ch] text-balance text-brand-900">{project.title}</h1>
          <p className="text-lead mt-4 max-w-[62ch] text-pretty text-ink-700">{project.excerpt}</p>
        </section>

        <section className="mx-auto mt-10 w-full max-w-[1168px] px-4">
          <div className="grid gap-6 md:grid-cols-[1fr_20rem]">
            <div className="rounded-card bg-surface p-6 shadow-raised sm:p-8">
              <h2 className="text-h3 text-brand-900">Le projet en détail</h2>
              <div className="mt-5 flex flex-col gap-4">
                {project.body.map((p, i) => (
                  <p key={i} className="text-body text-pretty text-ink-700">
                    {p}
                  </p>
                ))}
              </div>

              <h3 className="text-h4 mt-9 text-brand-900">Avancement</h3>
              <ol className="mt-4 flex flex-col gap-3">
                {project.milestones.map((m) => (
                  <li key={m.label} className="flex items-center gap-3">
                    <span
                      className={`flex size-5 shrink-0 items-center justify-center rounded-pill text-[10px] ${
                        m.done ? "bg-accent-700 text-white" : "bg-brand-200 text-brand-900"
                      }`}
                      aria-hidden="true"
                    >
                      {m.done ? "✓" : ""}
                    </span>
                    <span className={`text-small ${m.done ? "text-ink-900" : "text-ink-500"}`}>
                      {m.label}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <aside className="flex flex-col gap-4 md:sticky md:top-6 md:self-start">
              <div className="rounded-card bg-surface p-6 shadow-raised">
                <p className="text-caption text-ink-500">Financement</p>
                <ProgressMeter
                  className="mt-3"
                  value={project.progress}
                  raised={project.raised}
                  target={project.target}
                  showAmounts
                />
                <p className="mt-3 text-small text-ink-600">
                  {formatXOF(project.raised)} collectés sur {formatXOF(project.target)}
                </p>

                <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-border-subtle pt-4">
                  <div>
                    <dt className="text-caption text-ink-500">Contributions</dt>
                    <dd className="text-h4 text-brand-900">{project.contributions}</dd>
                  </div>
                  <div>
                    <dt className="text-caption text-ink-500">Donateurs</dt>
                    <dd className="text-h4 text-brand-900">{project.donors}</dd>
                  </div>
                </dl>

                <Link className="btn btn-md btn-warn btn-block mt-5" to={`/don?project=${project.slug}`}>
                  <span className="btn-label">Soutenir ce projet</span>
                  <Icon name="arrowRight" className="btn-icon" />
                </Link>
                {remaining > 0 ? (
                  <p className="mt-3 text-caption text-ink-500">
                    Il reste {formatXOF(remaining)} à collecter.
                  </p>
                ) : null}
              </div>

              <div className="rounded-card bg-surface p-6 shadow-raised">
                <p className="text-caption text-ink-500">Impact constaté</p>
                <p className="text-h3 mt-2 text-balance text-brand-900">{project.impactValue}</p>
                <p className="mt-1 text-small text-ink-600">{project.impactNote}</p>
              </div>
            </aside>
          </div>
        </section>

        {gifts.length ? (
          <section className="mx-auto mt-12 w-full max-w-[1168px] px-4">
            <h2 className="text-h3 text-brand-900">Contributions récentes</h2>
            <ul className="mt-4 grid gap-2">
              {gifts.map((t) => (
                <li
                  key={t._id}
                  className="flex items-baseline justify-between gap-4 rounded-card bg-surface px-4 py-3 text-small shadow-raised"
                >
                  <span className="text-ink-700">
                    {t.donorName} · {formatDateShort(t.createdAt)}
                  </span>
                  <span className="shrink-0 text-h4 text-brand-900">{formatXOF(t.amount)}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {related.length ? (
          <section className="mx-auto mt-12 w-full max-w-[1168px] px-4 pb-20">
            <h2 className="text-h3 text-brand-900">Projets liés</h2>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug} className="rounded-card bg-surface p-5 shadow-raised">
                  <span className="badge badge-neutral">{p.categoryLabel}</span>
                  <h3 className="text-h4 mt-3 text-balance text-brand-900">
                    <Link className="link-body" to={`/nos-projets/${p.slug}`}>
                      {p.title}
                    </Link>
                  </h3>
                  <ProgressMeter
                    className="mt-4"
                    value={p.progress}
                    raised={p.raised}
                    target={p.target}
                    size="sm"
                  />
                  <p className="mt-2 text-caption text-ink-600">{p.progress} % financé</p>
                </li>
              ))}
            </ul>
          </section>
        ) : (
          <div className="h-16" />
        )}
      </main>

      <Footer />
    </div>
  )
}

function formatDateShort(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" })
}
