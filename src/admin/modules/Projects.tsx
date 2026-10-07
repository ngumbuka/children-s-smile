import { useMemo, useState } from "react"
import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileText,
  Filter,
  HardHat,
  MapPin,
  Plus,
  Search,
} from "@/components/icons"
import { Pagination, usePagination } from "@/components/Pagination"
import {
  useAdminProjects,
  useAdminSchoolRegister,
  type AdminProjectRow,
} from "@/lib/admin"
import { saveChantier, deleteProject } from "@/lib/repositories"
import type { ApeStatus, PublicationStatus, SchoolStatus } from "@/lib/models"
import { EmptyState, PageHeader } from "../components/ui"
import { DataTable, MiniProgress, SegmentedTabs, StatusBadge } from "../components/table"
import {
  DetailDialog,
  EntityFormDialog,
  notify,
  RichTextContent,
  type EntityFormField,
  type EntityFormValue,
} from "../components/flows"

/** Form wording to stored value, so the labels stay in one place. */
const SCHOOL_STATUS_FROM_LABEL: Record<string, SchoolStatus> = {
  "En préparation": "preparing",
  "En cours": "in_progress",
  "En alerte": "at_risk",
  Livré: "delivered",
}

const APE_FROM_LABEL: Record<string, ApeStatus> = {
  "en attente": "pending",
  "en relecture": "in_review",
  "signée": "signed",
  "refusée": "refused",
}

const summary = [
  { label: "Chantiers actifs", color: "#004484", icon: HardHat },
  { label: "Livrés", color: "#006e2d", icon: CheckCircle2 },
  { label: "En alerte", color: "#ba1a1a", icon: AlertTriangle },
  { label: "Écoles suivies", color: "#a33900", icon: MapPin },
]

const projectFormFields: EntityFormField[] = [
  {
    name: "ecole",
    label: "École",
    required: true,
    placeholder: "Nom officiel de l’établissement",
  },
  {
    name: "localite",
    label: "Localité",
    required: true,
    placeholder: "Département, région",
  },
  {
    name: "region",
    label: "Région",
    type: "select",
    required: true,
    options: [
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
    ],
  },
  {
    name: "type",
    label: "Intervention",
    type: "textarea",
    required: true,
    placeholder: "Travaux, équipements ou services prévus",
  },
  {
    name: "description",
    label: "Présentation publique",
    type: "richtext",
    required: true,
    placeholder:
      "Décrivez le contexte, le besoin, les travaux et les résultats attendus…",
  },
  {
    name: "budget",
    label: "Budget prévisionnel (FCFA)",
    type: "number",
    required: true,
    min: 1,
  },
  {
    name: "eleves",
    label: "Nombre d’écoliers bénéficiaires",
    type: "number",
    required: true,
    min: 1,
  },
  {
    name: "avancement",
    label: "Avancement (%)",
    type: "number",
    required: true,
    min: 0,
    max: 100,
  },
  {
    name: "date",
    label: "Période",
    required: true,
    placeholder: "Ex. Mars 2025",
  },
  { name: "startDate", label: "Date de début", type: "date" },
  { name: "endDate", label: "Date de fin prévue", type: "date" },
  {
    name: "fundingGoal",
    label: "Objectif public de collecte (FCFA)",
    type: "number",
    required: true,
    min: 1,
  },
  {
    name: "fundingRaised",
    label: "Montant déjà collecté (FCFA)",
    type: "number",
    required: true,
    min: 0,
  },
  {
    name: "latitude",
    label: "Latitude",
    type: "number",
    step: "any",
    placeholder: "Ex. 3.8480",
  },
  {
    name: "longitude",
    label: "Longitude",
    type: "number",
    step: "any",
    placeholder: "Ex. 11.5021",
  },
  {
    name: "coverImage",
    label: "Image de couverture",
    type: "image",
    placeholder: "URL d’une image https://…",
  },
  {
    name: "statut",
    label: "Statut opérationnel",
    type: "select",
    required: true,
    options: ["En préparation", "En cours", "En alerte", "Livré"],
  },
  {
    name: "ape",
    label: "Validation APE",
    type: "select",
    required: true,
    options: ["en attente", "en relecture", "signée", "refusée"],
  },
  {
    name: "publicationStatus",
    label: "État éditorial",
    type: "select",
    required: true,
    options: ["draft", "review", "scheduled", "published", "archived"],
    help: "Un projet doit être publié et visible pour apparaître sur le site public.",
  },
  { name: "visible", label: "Visible sur le site public", type: "checkbox" },
  { name: "featured", label: "Mettre ce projet en avant", type: "checkbox" },
  {
    name: "consentVerified",
    label: "Consentements image vérifiés",
    type: "checkbox",
  },
]

function StatusIcon({ statut }: { statut: string }) {
  if (statut === "Livré")
    return <CheckCircle2 size={13} className="text-[#006e2d]" />
  if (statut === "En alerte")
    return <AlertTriangle size={13} className="text-[#ba1a1a]" />
  return <Clock size={13} className="text-[#004484]" />
}

export default function Projects() {
  const [activeTab, setActiveTab] = useState(0)
  const [search, setSearch] = useState("")
  const projectRecords = useAdminProjects()
  const register = useAdminSchoolRegister()
  const [createOpen, setCreateOpen] = useState(false)
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] =
    useState<AdminProjectRow | null>(null)
  const statusFilters = [
    null,
    "En cours",
    "En alerte",
    "Livré",
    "En préparation",
  ]
  const statusCounts = {
    delivered: projectRecords.filter((project) => project.statut === "Livré")
      .length,
    active: projectRecords.filter((project) => project.statut === "En cours")
      .length,
    alerts: projectRecords.filter((project) => project.statut === "En alerte")
      .length,
    preparing: projectRecords.filter(
      (project) => project.statut === "En préparation",
    ).length,
  }
  const dynamicTabs = [
    `Tous (${projectRecords.length})`,
    `En cours (${statusCounts.active})`,
    `Alertes (${statusCounts.alerts})`,
    `Livrés (${statusCounts.delivered})`,
    `En préparation (${statusCounts.preparing})`,
  ]
  // One value per label above, in the same order: the previous pairing put the
  // in-progress count under "En alerte" and the at-risk count under the school
  // register.
  const summaryValues = [
    String(statusCounts.active),
    String(statusCounts.delivered),
    String(statusCounts.alerts),
    String(register.total),
  ]
  const share = (part: number) =>
    projectRecords.length ? Math.round((part / projectRecords.length) * 100) : 0
  const summarySubs = [
    `${statusCounts.active} chantier${
      statusCounts.active > 1 ? "s" : ""
    } en cours d'exécution`,
    `${share(statusCounts.delivered)} % du parc livré`,
    `${statusCounts.alerts} école${
      statusCounts.alerts > 1 ? "s" : ""
    } à suivre`,
    `${register.total} établissement${
      register.total > 1 ? "s" : ""
    } au registre`,
  ]
  const visibleProjects = projectRecords.filter((project) => {
    const matchesStatus =
      !statusFilters[activeTab] || project.statut === statusFilters[activeTab]
    const query = search.trim().toLocaleLowerCase("fr")
    const matchesSearch =
      !query ||
      project.ecole.toLocaleLowerCase("fr").includes(query) ||
      project.localite.toLocaleLowerCase("fr").includes(query) ||
      project.region.toLocaleLowerCase("fr").includes(query)
    return matchesStatus && matchesSearch
  })
  const {
    page,
    pageCount,
    pageItems: pageProjects,
    setPage,
  } = usePagination(visibleProjects, 9, `${activeTab}:${search}`)

  /** Stable across unrelated re-renders so the dialog keeps the text already
   *  typed instead of resetting every time another tab's write republishes. */
  const formInitialValues = useMemo(() => {
    const project = projectRecords.find(
      (item) => item.id === editingProjectId,
    )
    return project
      ? {
          ecole: project.ecole,
          localite: project.localite,
          region: project.region,
          type: project.type,
          description: project.description,
          budget: String(project.schoolBudget),
          eleves: String(project.eleves),
          avancement: String(project.avancement),
          date: project.date,
          startDate: project.startDate,
          endDate: project.endDate,
          fundingGoal: String(project.fundingGoal),
          fundingRaised: String(project.fundingRaised),
          latitude: project.latitude,
          longitude: project.longitude,
          coverImage: project.coverImage,
          statut: project.statut,
          ape: project.ape,
          publicationStatus: project.publication.status,
          visible: project.publication.visible,
          featured: project.publication.featured,
          consentVerified: project.consentVerified,
        }
      : {
          statut: "En préparation",
          avancement: "0",
          ape: "en attente",
          publicationStatus: "draft",
          visible: false,
          featured: false,
          consentVerified: false,
        }
  }, [editingProjectId, projectRecords]) as Record<string, EntityFormValue> | undefined

  const removeProject = (id: string, ecole: string) => {
    void deleteProject(id)
    setSelectedProject(null)
    notify(`La fiche « ${ecole} » a été supprimée.`, "info")
  }

  return (
    <div className="flex flex-col gap-6 max-w-[1520px] px-4 py-5 sm:px-6 lg:px-10 lg:py-6">
      {/* Header */}
      <PageHeader
        icon={HardHat}
        title="Chantiers & Écoles"
        subtitle={`${projectRecords.length} chantiers coordonnés avec les Comités d'APE et Scieries locales agréées`}
        trailing={
          <button
            type="button"
            onClick={() => {
              setEditingProjectId(null)
              setCreateOpen(true)
            }}
            className="bg-[#004484] flex gap-2 items-center px-4 py-2.5 rounded-full text-white font-['Inter'] font-bold text-sm shadow-sm"
          >
            <Plus size={15} />
            Nouveau Chantier
          </button>
        }
      />

      {/* Stats bar */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summary.map((stat, index: number) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] border-b-4"
            style={{ borderColor: stat.color }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-['Montserrat'] font-semibold text-[#424751] text-xs uppercase tracking-[0.5px]">
                {stat.label}
              </span>
              <span
                className="font-['Montserrat'] font-extrabold text-[20px]"
                style={{ color: stat.color }}
              >
                {summaryValues[index]}
              </span>
            </div>
            <p className="font-['Inter'] text-[#727783] text-xs">
              {summarySubs[index]}
            </p>
          </div>
        ))}
      </div>

      {/* Table card */}
      {visibleProjects.length === 0 ? (
        <EmptyState>Aucun chantier ne correspond à ces critères.</EmptyState>
      ) : null}
      <div className="bg-white rounded-[12px] shadow-[0_1px_2px_rgba(0,0,0,0.05)] overflow-hidden">
        {/* Toolbar */}
        <div className="bg-[#f2f3ff] flex flex-col items-stretch justify-between p-4 gap-4 md:flex-row md:items-center">
          <SegmentedTabs
            tabs={dynamicTabs.map((label, i) => ({ key: i, label }))}
            active={activeTab}
            onChange={setActiveTab}
          />
          <div className="flex gap-2 items-center">
            <div className="relative">
              <Search
                size={13}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#727783]"
              />
              <input
                type="text"
                aria-label="Rechercher un chantier"
                placeholder="Rechercher..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="min-h-10 w-full rounded-full border border-[#e2e7ff] bg-white py-1.5 pl-8 pr-4 text-sm font-['Inter'] text-[#131b2e] outline-none sm:w-56"
              />
            </div>
            <button
              type="button"
              onClick={() =>
                notify(
                  "Les filtres de statut sont disponibles dans les onglets.",
                  "info",
                )
              }
              className="flex min-h-10 gap-1.5 items-center bg-white border border-[#e2e7ff] px-3 py-1.5 rounded-full text-xs font-['Inter'] text-[#424751]"
            >
              <Filter size={12} />
              Filtrer
            </button>
          </div>
        </div>

        {/* Table */}
        <DataTable
          caption="Liste des chantiers et écoles"
          minWidth={800}
          columns={[
            { label: "ID" },
            { label: "ÉCOLE & LOCALITÉ" },
            { label: "TYPE D'INTERVENTION" },
            { label: "RÉGION" },
            { label: "BUDGET" },
            { label: "AVANCEMENT", width: "140px" },
            { label: "STATUT" },
            { label: "ACTIONS" },
          ]}
        >
          {pageProjects.map((p: AdminProjectRow) => (
            <tr
              key={p.id}
              className="border-t border-[#f2f3ff] hover:bg-[#faf8ff] transition-colors"
            >
              <td className="px-4 py-3">
                <span className="font-['Montserrat'] font-semibold text-[#004484] text-xs">
                  {p.id}
                </span>
              </td>
              <td className="px-4 py-3">
                <p className="font-['Montserrat'] font-bold text-[#131b2e] text-sm">
                  {p.ecole}
                </p>
                <p className="font-['Inter'] text-[#424751] text-xs flex gap-1 items-center">
                  <MapPin size={9} className="text-[#727783]" />
                  {p.localite}
                </p>
              </td>
              <td className="px-4 py-3">
                <p className="font-['Inter'] font-semibold text-[#004484] text-xs">
                  {p.type}
                </p>
                <p className="font-['Inter'] text-[#727783] text-xs">
                  {p.eleves} élèves
                </p>
              </td>
              <td className="px-4 py-3">
                <span className="bg-[#eaedff] font-['Montserrat'] font-semibold text-[#424751] text-xs px-2 py-0.5 rounded-full">
                  {p.region}
                </span>
              </td>
              <td className="px-4 py-3">
                <p className="font-['Inter'] font-semibold text-[#131b2e] text-sm">
                  {p.budget.toLocaleString("fr-FR")} F
                </p>
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2 items-center">
                  <MiniProgress value={p.avancement} color={p.statusColor} className="flex-1" />
                  <span
                    className="font-['Montserrat'] font-bold text-xs w-8 text-right"
                    style={{ color: p.statusColor }}
                  >
                    {p.avancement}%
                  </span>
                </div>
              </td>
              <td className="px-4 py-3">
                <StatusBadge color={p.statusColor} background={p.statusBg}>
                  <StatusIcon statut={p.statut} />
                  {p.statut}
                </StatusBadge>
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-col items-start gap-1">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(p)}
                    className="flex items-center gap-1 text-[#004484] font-['Inter'] text-xs hover:underline"
                  >
                    Voir fiche
                    <ChevronRight size={11} />
                  </button>
                  <span
                    className={`font-['Montserrat'] font-bold text-[8px] uppercase ${
                      p.publication.visible
                        ? "text-[#006e2d]"
                        : "text-[#727783]"
                    }`}
                  >
                    {p.publication.visible
                      ? "Visible sur le site"
                      : "Brouillon privé"}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </DataTable>

        <Pagination
          page={page}
          pageCount={pageCount}
          onChange={setPage}
          label={`Page ${page} sur ${pageCount}`}
          className="px-2 py-2"
        />

        {/* Footer */}
        <div className="bg-[#eaedff] flex flex-col gap-2 px-4 py-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-['Inter'] text-[#424751] text-sm flex gap-1.5 items-center">
            <FileText size={13} />
            100% bois et matériaux acquis auprès de scieries et artisans agréés
            camerounais
          </p>
          <span className="font-['Inter'] text-[#727783] text-xs">
            Affichage {pageProjects.length ? (page - 1) * 9 + 1 : 0}–
            {(page - 1) * 9 + pageProjects.length} sur {projectRecords.length}
          </span>
        </div>
      </div>
      <DetailDialog
        open={Boolean(selectedProject)}
        title={selectedProject?.ecole ?? ""}
        onClose={() => setSelectedProject(null)}
      >
        {selectedProject ? (
          <>
            <RichTextContent
              html={selectedProject.description}
              className="mb-5 rounded-2xl bg-[#f2f3ff] p-4"
            />
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                ["Référence", selectedProject.id],
                ["Localité", selectedProject.localite],
                ["Intervention", selectedProject.type],
                [
                  "Budget",
                  `${selectedProject.budget.toLocaleString("fr-FR")} FCFA`,
                ],
                ["Avancement", `${selectedProject.avancement}%`],
                ["Statut", selectedProject.statut],
                ["Écoliers", selectedProject.eleves.toLocaleString("fr-FR")],
                [
                  "Publication",
                  selectedProject.publication.visible
                    ? "Visible sur le site"
                    : "Brouillon privé",
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
            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() =>
                  removeProject(selectedProject.id, selectedProject.ecole)
                }
                className="mr-auto min-h-11 rounded-full border border-[#d73535] px-4 text-sm font-bold text-[#ba1a1a]"
              >
                Supprimer
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditingProjectId(selectedProject.id)
                  setSelectedProject(null)
                  setCreateOpen(true)
                }}
                className="min-h-11 rounded-full bg-[#004484] px-5 text-sm font-bold text-white"
              >
                Modifier la fiche
              </button>
            </div>
          </>
        ) : null}
      </DetailDialog>
      <EntityFormDialog
        open={createOpen}
        title={editingProjectId ? "Modifier le chantier" : "Nouveau chantier"}
        description="Renseignez les données opérationnelles et la visibilité éditoriale du projet."
        fields={projectFormFields}
        submitLabel={
          editingProjectId
            ? "Enregistrer les modifications"
            : "Créer le chantier"
        }
        initialValues={formInitialValues}
        onClose={() => {
          setCreateOpen(false)
          setEditingProjectId(null)
        }}
        onSubmit={(values) => {
          const statut = String(values.statut)
          if (
            Boolean(values.visible) &&
            values.publicationStatus !== "published"
          ) {
            notify(
              "Pour rendre le projet visible, sélectionnez l’état éditorial « published ».",
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
          if (
            Boolean(values.visible) &&
            (!values.coverImage || !values.latitude || !values.longitude)
          ) {
            notify(
              "Une image de couverture et des coordonnées géographiques sont requises pour publier le projet.",
              "info",
            )
            return false
          }
          if (
            values.startDate &&
            values.endDate &&
            String(values.endDate) < String(values.startDate)
          ) {
            notify(
              "La date de fin doit être postérieure à la date de début.",
              "info",
            )
            return false
          }
          if (Number(values.fundingRaised) > Number(values.fundingGoal)) {
            notify(
              "Le montant collecté ne peut pas dépasser l’objectif sans révision de celui-ci.",
              "info",
            )
            return false
          }
          if (statut === "Livré" && values.ape !== "signée") {
            notify(
              "Un chantier livré doit disposer d’une validation APE signée.",
              "info",
            )
            return false
          }
          const publication = {
            status: String(values.publicationStatus) as PublicationStatus,
            visible:
              String(values.publicationStatus) === "published" &&
              Boolean(values.visible),
            featured: Boolean(values.featured),
          }
          return saveChantier({
            id: editingProjectId,
            ecole: String(values.ecole),
            localite: String(values.localite),
            region: String(values.region),
            type: String(values.type),
            description: String(values.description),
            budget: Number(values.budget),
            eleves: Number(values.eleves),
            avancement: Number(values.avancement),
            date: String(values.date),
            startDate: String(values.startDate ?? ""),
            endDate: String(values.endDate ?? ""),
            fundingGoal: Number(values.fundingGoal),
            fundingRaised: Number(values.fundingRaised),
            latitude: String(values.latitude ?? ""),
            longitude: String(values.longitude ?? ""),
            coverImage: String(values.coverImage ?? ""),
            statut: SCHOOL_STATUS_FROM_LABEL[String(values.statut)],
            ape: APE_FROM_LABEL[String(values.ape)] ?? "pending",
            publication,
            consentVerified: Boolean(values.consentVerified),
          })
            .then((project) => {
              setCreateOpen(false)
              setEditingProjectId(null)
              setActiveTab(0)
              notify(
                editingProjectId
                  ? "La fiche chantier a été mise à jour."
                  : `Le chantier ${project._id} a été créé et rattaché à son école.`,
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
