import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { Icon } from "../components/Icon"
import { formatDate, getArticle, getProject, listArticles, listProjects } from "../lib/repositories"
import type { ArticleDoc, ProjectDoc } from "../lib/models"

export default function ArticleDetail() {
  const { slug = "" } = useParams()
  const [article, setArticle] = useState<ArticleDoc | null>(null)
  const [related, setRelated] = useState<ArticleDoc[]>([])
  const [projects, setProjects] = useState<ProjectDoc[]>([])
  const [state, setState] = useState<"loading" | "ready" | "missing">("loading")

  useEffect(() => {
    let live = true
    setState("loading")
    void (async () => {
      const found = await getArticle(slug)
      if (!live) return
      setArticle(found)
      if (!found) {
        setState("missing")
        return
      }
      const [all, allProjects] = await Promise.all([listArticles(), listProjects()])
      if (!live) return
      const wanted = new Set(found.categories)
      setRelated(
        all
          .filter((a) => a.slug !== found.slug && a.categories.some((c) => wanted.has(c)))
          .slice(0, 3),
      )
      setProjects(allProjects.filter((p) => found.relatedProjects.includes(p.slug)).slice(0, 3))
      setState("ready")
    })()
    return () => {
      live = false
    }
  }, [slug])

  if (state === "loading") {
    return (
      <>
        <Header />
        <main className="shell py-24" role="status" aria-live="polite">
          Chargement de l'article…
        </main>
        <Footer />
      </>
    )
  }

  if (state === "missing" || !article) {
    return (
      <>
        <Header />
        <main className="shell py-24">
          <h1 className="text-h2 font-display text-ink-900">Article introuvable</h1>
          <p className="text-body text-ink-600 mt-3">
            L'article que vous cherchez n'existe pas ou a été retiré.
          </p>
          <Link className="btn btn-primary mt-6" to="/actualites">
            <span className="btn-label">Voir toutes les actualités</span>
            <Icon name="arrowRight" size={16} />
          </Link>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main>
        <article>
          <header className="bg-surface-muted">
            <div className="shell py-12 md:py-16">
              <nav aria-label="Fil d'Ariane" className="mb-6">
                <Link className="btn btn-ghost btn-sm" to="/actualites">
                  <span className="btn-label">Toutes les actualités</span>
                  <Icon name="arrowRight" size={16} />
                </Link>
              </nav>
              <p className="text-micro uppercase tracking-[1.4px] text-ink-600">{article.kicker}</p>
              <h1 className="text-h1 mt-3 font-display text-ink-900">{article.title}</h1>
              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-small text-ink-600">
                <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
                <span aria-hidden="true">·</span>
                <span>{article.location}</span>
                <span aria-hidden="true">·</span>
                <span>{article.readingMinutes} min de lecture</span>
              </div>
            </div>
          </header>

          {article.image ? (
            <div className="shell pt-8">
              <img
                alt=""
                className="aspect-[16/9] w-full rounded-card object-cover"
                loading="lazy"
                src={article.image}
              />
            </div>
          ) : null}

          <div className="shell grid gap-10 py-12 md:grid-cols-[minmax(0,1fr)_320px] md:py-16">
            <div>
              <p className="text-lead text-ink-800">{article.excerpt}</p>
              {article.body.map((paragraph, index) => (
                <p
                  className={index === 0 ? "mt-6 text-body text-ink-700" : "mt-4 text-body text-ink-700"}
                  key={paragraph.slice(0, 40)}
                >
                  {paragraph}
                </p>
              ))}

              {article.stats.length > 0 ? (
                <dl className="mt-10 grid gap-4 rounded-card bg-surface-muted p-6 sm:grid-cols-3">
                  {article.stats.map((stat) => (
                    <div key={stat.label}>
                      <dt className="text-caption text-ink-600">{stat.label}</dt>
                      <dd className="text-h4 mt-1 font-display text-ink-900">{stat.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}

              {article.document ? (
                <div className="mt-8 flex items-center justify-between gap-4 rounded-card border border-border-200 p-5">
                  <div className="flex min-w-0 items-center gap-3">
                    <Icon name="fileText" size={20} />
                    <span className="min-w-0 truncate text-body text-ink-800">
                      {article.document.label}
                    </span>
                    <span className="shrink-0 text-small text-ink-500">
                      {article.document.sizeMb} Mo
                    </span>
                  </div>
                  <button
                    className="btn btn-sm btn-secondary shrink-0"
                    disabled
                    title="Le document n'est pas encore disponible au téléchargement"
                    type="button"
                  >
                    <Icon name="download" size={16} />
                    <span className="btn-label">Télécharger</span>
                  </button>
                </div>
              ) : null}
            </div>

            <aside className="space-y-6">
              {projects.length > 0 ? (
                <section>
                  <h2 className="text-h4 font-display text-ink-900">Projets liés</h2>
                  <ul className="mt-3 space-y-3">
                    {projects.map((project) => (
                      <li key={project._id}>
                        <Link
                          className="block rounded-card border border-border-200 p-4 hover:bg-surface-muted"
                          to={`/nos-projets/${project.slug}`}
                        >
                          <span className="text-body font-semibold text-ink-900">
                            {project.title}
                          </span>
                          <span className="mt-1 block text-small text-ink-600">{project.region}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {related.length > 0 ? (
                <section>
                  <h2 className="text-h4 font-display text-ink-900">À lire aussi</h2>
                  <ul className="mt-3 space-y-3">
                    {related.map((item) => (
                      <li key={item._id}>
                        <Link className="block hover:text-brand-700" to={`/actualites/${item.slug}`}>
                          <span className="text-body text-ink-800">{item.title}</span>
                          <span className="mt-1 block text-small text-ink-500">
                            {formatDate(item.publishedAt)}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              <Link className="btn btn-primary w-full" to="/don">
                <span className="btn-label">Soutenir un projet</span>
                <Icon name="arrowRight" size={16} />
              </Link>
            </aside>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}