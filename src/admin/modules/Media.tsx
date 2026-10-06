import { useMemo, useState } from "react"
import {
  BookOpen,
  Calendar,
  FileText,
  Image,
  MapPin,
  Newspaper,
  Plus,
  Search,
  Video,
} from "@/components/icons"
import { Pagination, usePagination } from "@/components/Pagination"
import { useAdminArticles, type AdminArticleRow } from "@/lib/admin"
import { saveArticle, deleteArticle } from "@/lib/repositories"
import type { ArticleFormat, PublicationStatus } from "@/lib/models"
import { EmptyState, PageHeader } from "../components/ui"
import { SegmentedTabs } from "../components/table"
import {
  DetailDialog,
  EntityFormDialog,
  notify,
  RichTextContent,
  type EntityFormField,
  type EntityFormValue,
} from "../components/flows"

/** Form wording to stored value, so the labels stay in one place. */
const FORMAT_FROM_LABEL: Record<string, ArticleFormat> = {
  Article: "article",
  "Reportage Photo": "photo",
  Vidéo: "video",
  Rapport: "report",
}
const articleFormFields: EntityFormField[] = [
  {
    name: "title",
    label: "Titre",
    required: true,
    placeholder: "Titre public du contenu",
  },
  {
    name: "type",
    label: "Type de contenu",
    type: "select",
    required: true,
    options: ["Article", "Reportage Photo", "Vidéo", "Rapport"],
  },
  {
    name: "excerpt",
    label: "Résumé public",
    type: "textarea",
    required: true,
    placeholder: "Résumé affiché sur les cartes du site",
  },
  {
    name: "content",
    label: "Corps du contenu",
    type: "richtext",
    required: true,
    placeholder:
      "Rédigez le contenu complet de l’article, du reportage ou du rapport…",
  },
  {
    name: "date",
    label: "Date de publication",
    type: "date",
    required: true,
  },
  {
    name: "region",
    label: "Région ou portée",
    required: true,
    placeholder: "Ex. Littoral ou National",
  },
  { name: "author", label: "Auteur", required: true },
  {
    name: "tags",
    label: "Mots-clés",
    required: true,
    placeholder: "Séparez les mots-clés par des virgules",
  },
  {
    name: "coverImage",
    label: "URL de l’image de couverture",
    type: "url",
    placeholder: "https://…",
  },
  {
    name: "seoTitle",
    label: "Titre SEO",
    required: true,
    placeholder: "Titre affiché dans les moteurs de recherche",
  },
  {
    name: "seoDescription",
    label: "Description SEO",
    type: "textarea",
    required: true,
    placeholder: "Description courte pour le référencement",
  },
  {
    name: "publicationStatus",
    label: "État éditorial",
    type: "select",
    required: true,
    options: ["draft", "review", "scheduled", "published", "archived"],
  },
  { name: "visible", label: "Visible sur le site public", type: "checkbox" },
  { name: "featured", label: "Mettre à la une", type: "checkbox" },
  {
    name: "consentVerified",
    label: "Consentements image vérifiés",
    type: "checkbox",
  },
]

export default function Media() {
  const [activeFilter, setActiveFilter] = useState(0)
  const [search, setSearch] = useState("")
  const { articles: articleRecords, typeFilters } = useAdminArticles()
  const [createOpen, setCreateOpen] = useState(false)
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null)
  const [selectedArticle, setSelectedArticle] =
    useState<AdminArticleRow | null>(null)
  const articleIcons = {
    BookOpen: <BookOpen size={13} />,
    Image: <Image size={13} />,
    Video: <Video size={13} />,
    FileText: <FileText size={13} />,
    Newspaper: <Newspaper size={13} />,
  }
  const visibleArticles = articleRecords.filter((article) => {
    const query = search.trim().toLocaleLowerCase("fr")
    // Index into the filter strip the projection actually rendered, instead of
    // a private copy of the format vocabulary that could drift out of step.
    const matchesType =
      !typeFilters[activeFilter] || article.type === typeFilters[activeFilter]
    const matchesSearch =
      !query ||
      article.title.toLocaleLowerCase("fr").includes(query) ||
      article.excerpt.toLocaleLowerCase("fr").includes(query) ||
      article.tags.some((tag) => tag.toLocaleLowerCase("fr").includes(query))
    return matchesType && matchesSearch
  })
  const {
    page,
    pageCount,
    pageItems: pageArticles,
    setPage,
  } = usePagination(visibleArticles, 6, `${activeFilter}:${search}`)

  /** Stable across unrelated re-renders so the dialog keeps the text already
   *  typed instead of resetting every time another tab's write republishes. */
  const formInitialValues = useMemo(() => {
    const article = articleRecords.find(
      (item) => item.id === editingArticleId,
    )
    return article
      ? {
          title: article.title,
          type: article.type,
          excerpt: article.excerpt,
          content: article.content,
          date: article.publishedAt.slice(0, 10),
          region: article.region,
          author: article.author,
          tags: article.tags.join(", "),
          coverImage: article.coverImage,
          seoTitle: article.seoTitle,
          seoDescription: article.seoDescription,
          publicationStatus: article.publication.status,
          visible: article.publication.visible,
          featured: article.publication.featured,
          consentVerified: article.consentVerified,
        }
      : {
          type: "Article",
          author: "Dr. Estelle Mballa",
          publicationStatus: "draft",
          visible: false,
          featured: false,
          consentVerified: false,
        }
  }, [editingArticleId, articleRecords]) as
    | Record<string, EntityFormValue>
    | undefined

  const removeArticle = (id: string, title: string) => {
    void deleteArticle(id)
    setSelectedArticle(null)
    notify(`Le contenu « ${title} » a été supprimé.`, "info")
  }

  return (
    <div className="flex flex-col gap-6 max-w-[1520px] px-4 py-5 sm:px-6 lg:px-10 lg:py-6">
      <PageHeader
        icon={Newspaper}
        title="Articles & Médiathèque"
        subtitle="Contenus éditoriaux, témoignages terrain et rapports — protection de l'image APE garantie"
        trailing={
          <button
            type="button"
            onClick={() => {
              setEditingArticleId(null)
              setCreateOpen(true)
            }}
            className="bg-[#004484] flex gap-2 items-center px-4 py-2.5 rounded-full text-white font-['Inter'] font-bold text-sm shadow-sm"
          >
            <Plus size={15} />
            Nouvel Article
          </button>
        }
      />

      {/* Filter bar */}
      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        <SegmentedTabs
          tabs={typeFilters.map((label, i) => ({ key: i, label }))}
          active={activeFilter}
          onChange={setActiveFilter}
        />
        <div className="relative sm:ml-2">
          <Search
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#727783]"
          />
          <input
            type="text"
            aria-label="Rechercher un contenu"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="min-h-10 w-full rounded-full border border-[#e2e7ff] bg-white py-1.5 pl-8 pr-4 text-sm font-['Inter'] text-[#131b2e] outline-none sm:w-56"
          />
        </div>
      </div>

      {/* Articles grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {pageArticles.map((article) => (
          <div
            key={article.id}
            role="button"
            tabIndex={0}
            onClick={() => setSelectedArticle(article)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault()
                setSelectedArticle(article)
              }
            }}
            className="bg-white rounded-[12px] shadow-[0_1px_2px_rgba(0,0,0,0.05)] overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          >
            {/* Type banner */}
            <div
              className="h-2"
              style={{ backgroundColor: article.typeColor }}
            />
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span
                  className="inline-flex items-center gap-1 font-['Montserrat'] font-bold text-xs px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: article.typeBg,
                    color: article.typeColor,
                  }}
                >
                  {articleIcons[(article.icon as keyof typeof articleIcons)]}
                  {article.type}
                </span>
                <span className="font-['Inter'] text-[#727783] text-xs flex items-center gap-1">
                  <Calendar size={10} />
                  {article.date}
                </span>
              </div>
              <h3 className="font-['Montserrat'] font-bold text-[#131b2e] text-[14px] leading-[20px] mb-2">
                {article.title}
              </h3>
              <p className="font-['Inter'] text-[#424751] text-xs leading-[18px] mb-3">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex gap-1 items-center text-[#727783]">
                  <MapPin size={10} />
                  <span className="font-['Inter'] text-xs">
                    {article.region}
                  </span>
                </div>
                <div className="flex gap-1 flex-wrap justify-end">
                  {article.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#f2f3ff] font-['Montserrat'] font-semibold text-[#424751] text-xs px-1.5 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="border-t border-[#f2f3ff] mt-3 pt-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-['Inter'] text-[#727783] text-xs">
                    Par {article.author}
                  </span>
                  <span
                    className={`font-['Montserrat'] font-bold text-xs px-2 py-0.5 rounded-full ${
                      article.publication.visible
                        ? "bg-[#7cf994] text-[#006e2d]"
                        : "bg-[#eaedff] text-[#424751]"
                    }`}
                  >
                    {article.publication.visible
                      ? "PUBLIÉ SUR LE SITE"
                      : "PROGRAMMÉ"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        page={page}
        pageCount={pageCount}
        onChange={setPage}
        label={`Page ${page} sur ${pageCount} · ${visibleArticles.length} contenus`}
      />
      {visibleArticles.length === 0 ? (
        <EmptyState>Aucun contenu ne correspond à votre recherche.</EmptyState>
      ) : null}

      {/* Protection note */}
      <div className="bg-[#eaedff] rounded-xl p-4 flex gap-3 items-center">
        <div className="w-8 h-8 bg-[#004484] rounded-full flex items-center justify-center shrink-0">
          <FileText size={14} className="text-white" />
        </div>
        <div>
          <p className="font-['Montserrat'] font-bold text-[#131b2e] text-sm">
            Protection de l'Enfance (APE)
          </p>
          <p className="font-['Inter'] text-[#424751] text-xs">
            100% consentements d'image signés par les familles • Aucune photo
            d'enfant publiée sans autorisation écrite
          </p>
        </div>
      </div>
      <DetailDialog
        open={Boolean(selectedArticle)}
        title={selectedArticle?.title ?? ""}
        onClose={() => setSelectedArticle(null)}
      >
        {selectedArticle ? (
          <div className="space-y-4">
            <p className="text-sm font-semibold leading-relaxed text-[#424751]">
              {selectedArticle.excerpt}
            </p>
            <RichTextContent
              html={selectedArticle.content}
              className="rounded-2xl bg-[#f2f3ff] p-4"
            />
            <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                ["Type", selectedArticle.type],
                ["Région", selectedArticle.region],
                ["Auteur", selectedArticle.author],
                ["Date", selectedArticle.date],
                [
                  "Publication",
                  selectedArticle.publication.visible
                    ? "Publié sur le site"
                    : "Brouillon interne",
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
                  removeArticle(selectedArticle.id, selectedArticle.title)
                }
                className="mr-auto min-h-11 rounded-full border border-[#d73535] px-4 text-sm font-bold text-[#ba1a1a]"
              >
                Supprimer
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditingArticleId(selectedArticle.id)
                  setSelectedArticle(null)
                  setCreateOpen(true)
                }}
                className="min-h-11 rounded-full bg-[#004484] px-5 text-sm font-bold text-white"
              >
                Modifier le contenu
              </button>
            </div>
          </div>
        ) : null}
      </DetailDialog>
      <EntityFormDialog
        open={createOpen}
        title={editingArticleId ? "Modifier le contenu" : "Nouveau contenu"}
        description="Définissez les informations éditoriales utilisées par la médiathèque et le site public."
        fields={articleFormFields}
        submitLabel={
          editingArticleId
            ? "Enregistrer les modifications"
            : "Créer le contenu"
        }
        initialValues={formInitialValues}
        onClose={() => {
          setCreateOpen(false)
          setEditingArticleId(null)
        }}
        onSubmit={(values) => {
          if (
            Boolean(values.visible) &&
            values.publicationStatus !== "published"
          ) {
            notify(
              "Pour rendre le contenu visible, sélectionnez l’état éditorial « published ».",
              "info",
            )
            return false
          }
          if (Boolean(values.visible) && !Boolean(values.consentVerified)) {
            notify(
              "Les consentements image doivent être vérifiés avant publication.",
              "info",
            )
            return false
          }
          if (Boolean(values.visible) && !values.coverImage) {
            notify(
              "Une image de couverture est requise pour publier ce contenu.",
              "info",
            )
            return false
          }
          const format = FORMAT_FROM_LABEL[String(values.type)] ?? "article"
          return saveArticle({
            id: editingArticleId,
            title: String(values.title),
            type: format,
            excerpt: String(values.excerpt),
            content: String(values.content),
            date: String(values.date),
            region: String(values.region),
            author: String(values.author),
            tags: String(values.tags)
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean),
            coverImage: String(values.coverImage ?? ""),
            seoTitle: String(values.seoTitle),
            seoDescription: String(values.seoDescription),
            publication: {
              status: String(values.publicationStatus) as PublicationStatus,
              visible:
                String(values.publicationStatus) === "published" &&
                Boolean(values.visible),
              featured: Boolean(values.featured),
            },
            consentVerified: Boolean(values.consentVerified),
          })
            .then((saved) => {
              setCreateOpen(false)
              setEditingArticleId(null)
              setActiveFilter(0)
              notify(
                editingArticleId
                  ? "Le contenu éditorial a été mis à jour."
                  : `« ${saved.title} » a été ajouté à la médiathèque.`,
              )
              return true
            })
            .catch((error: unknown) => {
              notify(
                error instanceof Error
                  ? error.message
                  : "Enregistrement impossible.",
                "info",
              )
              return false
            })
        }}
      />
    </div>
  )
}
