import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { Icon } from "../components/Icon"
import { formatDate } from "../lib/repositories"
import { usePublishedArticles, usePublishedProjects } from "../lib/public"
import { useStoreReady } from "../lib/live"
import { ARTICLE_FORMAT_LABELS } from "../lib/models"

const assetPathPrefix = "/assets"

/** Covers stored asset names ("8894c.png") and absolute URLs alike. */
const assetUrl = (src: string) =>
  src && !/^(https?:)?\/\//.test(src) && !src.startsWith("data:")
    ? `${assetPathPrefix}/${src}`
    : src

/** Two-letter monogram for the byline avatar, honour name prefixes as the
 *  Impact tooltip does. */
const initialsFor = (name: string) =>
  name
    .replace(/^M[\.]?\s+|^Mme[\.]?\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toLocaleUpperCase("fr"))
    .join("")

const copyText = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    const textarea = document.createElement("textarea")
    textarea.value = text
    textarea.style.position = "fixed"
    textarea.style.opacity = "0"
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand("copy")
    textarea.remove()
  }
}

/** Editorial section rule: a swash, a smallcaps title and a hairline. */
function SectionRule({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-6 bg-brand-900" aria-hidden="true" />
      <h2 className="font-display text-caption font-bold uppercase tracking-[0.18em] text-ink-900">
        {children}
      </h2>
      <span className="h-px flex-1 bg-border-subtle" aria-hidden="true" />
    </div>
  )
}

export default function ArticleDetail() {
  const { slug = "" } = useParams()
  const ready = useStoreReady()
  // Live reads off the shared store: publishing or editing an article in the
  // backoffice updates this page in every open tab without a reload.
  const articles = usePublishedArticles()
  const allProjects = usePublishedProjects()
  const [copied, setCopied] = useState(false)

  const article = articles.find((a) => a.slug === slug) ?? null
  const related = article
    ? articles
        .filter(
          (a) =>
            a.slug !== article.slug &&
            a.categories.some((c) => article.categories.includes(c)),
        )
        .slice(0, 3)
    : []
  const projects = article
    ? allProjects
        .filter((p) => article.relatedProjects.includes(p.slug))
        .slice(0, 3)
    : []

  // One tab title and meta description per story, taken from the fields the
  // backoffice edits, so shared links and search results read the right copy.
  useEffect(() => {
    if (!article) return
    document.title = article.seoTitle || article.title
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", article.seoDescription || article.excerpt)
  }, [article])

  const copyLink = () => {
    void copyText(window.location.href)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  const shareHref = article
    ? `https://api.whatsapp.com/send?text=${encodeURIComponent(
        `${article.title} — ${window.location.href}`,
      )}`
    : "#"

  if (!ready) {
    return (
      <>
        <Header />
        <main
          id="main-content"
          tabIndex={-1}
          className="shell py-24"
          role="status"
          aria-live="polite"
        >
          Chargement de l'article…
        </main>
        <Footer />
      </>
    )
  }

  // A record the backoffice has not published is a draft: the detail route
  // treats it as missing rather than previewing unpublished work.
  if (!article) {
    return (
      <>
        <Header />
        <main id="main-content" tabIndex={-1} className="shell py-24">
          <h1 className="text-h2 font-display text-ink-900">
            Article introuvable
          </h1>
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

  const formatLabel = ARTICLE_FORMAT_LABELS[article.format]

  return (
    <>
      <Header />

      <main id="main-content" tabIndex={-1}>
        <article>
          {/* Editorial masthead: thin masthead rule, smallcaps overline, an
              oversized headline, a standfirst and a hairline byline bar. */}
          <header className="border-b border-border-subtle bg-white">
            <div className="w-full bg-brand-900" style={{ height: 3 }} />
            <div className="shell py-10 md:py-14">
              <nav aria-label="Fil d'Ariane" className="mb-10">
                <Link
                  className="inline-flex items-center gap-2 font-display text-caption font-semibold uppercase tracking-[0.16em] text-ink-600 hover:text-brand-700"
                  to="/actualites"
                >
                  <Icon name="arrowRight" size={14} className="-scale-x-100" />
                  Toutes les actualités
                </Link>
              </nav>

              <div className="flex flex-wrap items-center gap-2.5">
                <p className="font-display text-caption font-bold uppercase tracking-[0.2em] text-brand-700">
                  {article.categoryDisplay}
                </p>
                {formatLabel ? (
                  <span className="rounded-full border border-border-subtle px-2.5 py-0.5 font-display text-caption font-semibold uppercase tracking-[0.14em] text-ink-600">
                    {formatLabel}
                  </span>
                ) : null}
              </div>

              <h1 className="font-display font-extrabold tracking-[-0.02em] text-ink-900 text-h1 md:text-[2.5rem] md:leading-[1.18] mt-4">
                {article.title}
              </h1>

              <p className="mt-3 font-display text-caption font-medium uppercase tracking-[0.18em] text-ink-500">
                {article.kicker}
              </p>

              <p className="mt-6 max-w-[46rem] text-lead text-ink-700 md:text-h4">
                {article.excerpt}
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t border-border-subtle pt-4">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-3 text-small text-ink-600">
                  <span className="flex items-center gap-2">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-900 font-display text-xs font-bold text-white"
                      aria-hidden="true"
                    >
                      {initialsFor(article.author)}
                    </span>
                    <span className="font-display font-bold text-ink-900">
                      {article.author}
                    </span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Icon name="calendar" size={14} />
                    <time dateTime={article.publishedAt}>
                      {formatDate(article.publishedAt)}
                    </time>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Icon name="mapPin" size={14} />
                    {article.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Icon name="clock" size={14} />
                    {article.readingMinutes} min de lecture
                  </span>
                </div>

                <div className="hidden items-center gap-2 md:flex">
                  <a
                    aria-label="Partager sur WhatsApp"
                    className="btn btn-sm btn-ghost"
                    href={shareHref}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Icon name="whatsapp" size={16} />
                  </a>
                  <button
                    aria-label="Copier le lien"
                    className="btn btn-sm btn-ghost"
                    onClick={copyLink}
                    type="button"
                  >
                    <Icon name={copied ? "check" : "copy"} size={16} />
                  </button>
                </div>
              </div>
            </div>
          </header>

          {article.image ? (
            <div className="shell pt-8 md:grid md:grid-cols-[minmax(0,1fr)_320px] md:gap-10 md:pt-12">
              <img
                alt=""
                className="aspect-[16/9] w-full rounded-card object-cover"
                loading="lazy"
                src={assetUrl(article.image)}
              />
            </div>
          ) : null}

          <div className="shell grid gap-12 py-12 md:grid-cols-[minmax(0,1fr)_320px] md:gap-10 md:py-16">
            <div className="max-w-[42rem]">
              {article.body.map((paragraph, index) => (
                <p
                  className={
                    index === 0
                      ? "mt-7 text-h4 leading-[1.9] text-ink-700 first-letter:float-left first-letter:mt-1 first-letter:mr-3 first-letter:font-display first-letter:text-[3.4em] first-letter:font-extrabold first-letter:leading-[0.82] first-letter:text-brand-900"
                      : "mt-5 text-h4 leading-[1.9] text-ink-700"
                  }
                  key={paragraph.slice(0, 40)}
                >
                  {paragraph}
                </p>
              ))}

              {article.stats.length > 0 ? (
                <section className="mt-12">
                  <SectionRule>Chiffres clés</SectionRule>
                  <dl className="mt-4 grid gap-5 rounded-card border-l-4 border-brand-900 bg-surface-muted p-6 sm:grid-cols-3">
                    {article.stats.map((stat) => (
                      <div key={stat.label}>
                        <dt className="text-caption text-ink-600">
                          {stat.label}
                        </dt>
                        <dd className="mt-1 font-display text-h2 font-extrabold text-brand-900">
                          {stat.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>
              ) : null}

              {article.tags.length > 0 ? (
                <section className="mt-12">
                  <SectionRule>Mots-clés</SectionRule>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <li
                        className="rounded-full border border-border-subtle px-3 py-1 text-small text-ink-600"
                        key={tag}
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              <div className="mt-10 flex items-center gap-3 border-t border-border-subtle pt-6">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-900 font-display text-sm font-bold text-white"
                  aria-hidden="true"
                >
                  {initialsFor(article.author)}
                </span>
                <div>
                  <p className="font-display text-caption font-semibold uppercase tracking-[0.18em] text-ink-500">
                    Rédigé par
                  </p>
                  <p className="text-body font-semibold text-ink-900">
                    {article.author}
                  </p>
                </div>
              </div>

              <div className="mt-10 flex flex-col gap-4 border-t border-border-subtle pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-display text-caption font-semibold uppercase tracking-[0.18em] text-ink-500">
                  Partager cet article
                </p>
                <div className="flex flex-wrap gap-2">
                  <a
                    className="btn btn-sm btn-secondary"
                    href={shareHref}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Icon name="whatsapp" size={16} />
                    <span className="btn-label">WhatsApp</span>
                  </a>
                  <button
                    aria-live="polite"
                    className="btn btn-sm btn-secondary"
                    onClick={copyLink}
                    type="button"
                  >
                    <Icon name={copied ? "check" : "copy"} size={16} />
                    <span className="btn-label">
                      {copied ? "Lien copié !" : "Copier le lien"}
                    </span>
                  </button>
                </div>
              </div>

              {article.document ? (
                <div className="mt-8 flex items-center justify-between gap-4 rounded-card border border-border-subtle p-5">
                  <div className="flex min-w-0 items-center gap-3">
                    <Icon name="fileText" size={20} />
                    <span className="min-w-0 truncate text-body text-ink-700">
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

            <aside className="space-y-10 md:sticky md:top-8 md:self-start">
              {projects.length > 0 ? (
                <section>
                  <SectionRule>Projets liés</SectionRule>
                  <ul className="mt-4 space-y-3">
                    {projects.map((project) => (
                      <li key={project._id}>
                        <Link
                          className="block rounded-card border border-border-subtle p-4 hover:border-brand-200 hover:bg-surface-muted"
                          to={`/nos-projets/${project.slug}`}
                        >
                          <span className="text-body font-semibold text-ink-900">
                            {project.title}
                          </span>
                          <span className="mt-1 block text-small text-ink-600">
                            {project.region}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {related.length > 0 ? (
                <section>
                  <SectionRule>À lire aussi</SectionRule>
                  <ul className="mt-4">
                    {related.map((item, index) => (
                      <li key={item._id} className="border-t border-border-subtle">
                        <Link
                          className="group flex gap-3 py-3"
                          to={`/actualites/${item.slug}`}
                        >
                          <span
                            className="pt-0.5 font-display text-h2 font-extrabold text-brand-100"
                            aria-hidden="true"
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="min-w-0">
                            <span className="font-display block text-caption font-semibold uppercase tracking-[0.16em] text-brand-700">
                              {item.categoryDisplay}
                            </span>
                            <span className="mt-0.5 block text-body font-semibold leading-[1.5] text-ink-900 group-hover:text-brand-700">
                              {item.title}
                            </span>
                            <span className="mt-1 block text-small text-ink-500">
                              {formatDate(item.publishedAt)}
                            </span>
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: article.title,
            description: article.excerpt,
            datePublished: article.publishedAt,
            author: { "@type": "Person", name: article.author },
            publisher: {
              "@type": "Organization",
              name: "Children's Smile Cameroun",
            },
            locationCreated: { "@type": "Place", name: article.location },
            mainEntityOfPage: `${window.location.origin}/actualites/${article.slug}`,
          }),
        }}
      />
    </>
  )
}