import { useMemo, useState } from "react"
import {
  Bell,
  Building2,
  Edit3,
  MapPin,
  Phone,
  Plus,
  Settings,
  Shield,
  Trash2,
  Users,
} from "@/components/icons"
import {
  useAdminSettings,
  useAdminShell,
  type AdminAntennaRow,
  type AdminUserRow,
} from "@/lib/admin"
import {
  createAntenna,
  createUser,
  deleteAntenna,
  deleteUser,
  setNotificationPref,
  updateAntenna,
  updateOrganisation,
  updateUser,
} from "@/lib/repositories"
import {
  regionFromLabel,
  type AntennaStatus,
  type PublicationStatus,
  type UserRole,
} from "@/lib/models"
import { authConfigured, manageAuthUser } from "@/lib/auth"
import {
  EntityFormDialog,
  notify,
  type EntityFormField,
  type EntityFormValue,
} from "../components/flows"
import { DataTable, SegmentedTabs } from "../components/table"

/** Form wording to stored value, so the labels stay in one place. */
const ANTENNA_STATUS_FROM_LABEL: Record<string, AntennaStatus> = {
  Actif: "active",
  Alerte: "alert",
  "Hors ligne": "offline",
}

const USER_ROLE_FROM_LABEL: Record<string, UserRole> = {
  "Super Admin": "super_admin",
  "Admin Antenne": "antenna_admin",
  Éditeur: "editor",
  "Commissaire aux comptes": "auditor",
}
const antennaFormFields: EntityFormField[] = [
  {
    name: "nom",
    label: "Nom de l’antenne",
    required: true,
    placeholder: "Ex. Antenne Bertoua",
  },
  {
    name: "type",
    label: "Type",
    type: "select",
    required: true,
    options: ["Coordination Nationale", "Délégation régionale", "Point focal"],
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
  { name: "responsable", label: "Responsable", required: true },
  {
    name: "email",
    label: "E-mail de l’antenne",
    type: "email",
    required: true,
  },
  {
    name: "telephone",
    label: "Téléphone",
    type: "tel",
    required: true,
    placeholder: "+237 6XX XX XX XX",
    pattern: "^\\+237[ ]?6[0-9 ]{8,}$",
    help: "Utilisez le format international camerounais.",
  },
  {
    name: "statut",
    label: "Statut",
    type: "select",
    required: true,
    options: ["Actif", "Alerte", "Hors ligne"],
  },
]
const userFormFields: EntityFormField[] = [
  { name: "nom", label: "Nom complet", required: true },
  { name: "email", label: "Adresse e-mail", type: "email", required: true },
  {
    name: "role",
    label: "Rôle",
    type: "select",
    required: true,
    options: [
      "Super Admin",
      "Admin Antenne",
      "Éditeur",
      "Commissaire aux comptes",
    ],
  },
  {
    name: "region",
    label: "Périmètre régional",
    required: true,
    placeholder: "Ex. National ou Littoral",
  },
  {
    name: "password",
    label: "Mot de passe",
    type: "password",
    placeholder: authConfigured ? "Requis à la création" : "Pas utilisé en démonstration",
    required: authConfigured,
    help: authConfigured
      ? "À la création, définissez le mot de passe initial. En modification, laissez vide pour ne pas le changer."
      : "Le portail de démonstration utilise un code commun — ce champ est ignoré.",
  },
  { name: "actif", label: "Compte actif", type: "checkbox" },
]

const orgFormFields: EntityFormField[] = [
  {
    name: "name",
    label: "Nom de l’organisation",
    required: true,
    help: "Affiché dans le pied de page et sur les reçus de don.",
  },
  { name: "subtitle", label: "Sous-titre", placeholder: "CAMEROUN • COORDINATION" },
  { name: "seat", label: "Siège", placeholder: "Yaoundé Siège" },
  {
    name: "legalApproval",
    label: "Agrément / mentions légales",
    type: "textarea",
    help: "Numéro d’agrément affiché au pied de page.",
  },
  {
    name: "email",
    label: "E-mail de contact",
    type: "email",
    required: true,
    help: "Adresse utilisée par le formulaire de contact du site public.",
  },
  {
    name: "phones",
    label: "Téléphones (un par ligne)",
    type: "textarea",
    required: true,
  },
  { name: "whatsapp", label: "WhatsApp de coordination" },
  { name: "emergencyLabel", label: "Intitulé de l’astreinte" },
  { name: "emergencyPhone", label: "Numéro d’astreinte", type: "tel" },
  { name: "emergencyDetail", label: "Détail de l’astreinte" },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState(0)
  const {
    antennes: antennaRecords,
    tabs,
    users: userRecords,
    notifications,
    security,
    organisation,
  } = useAdminSettings()
  // The organisation record owns the duty number, and the shell projection is
  // where it is read from. Settings used to print a second copy of it inline,
  // so editing the record never changed this panel.
  const { emergency } = useAdminShell()
  const [createOpen, setCreateOpen] = useState(false)
  const [editingAntennaId, setEditingAntennaId] = useState<string | null>(null)
  const [editingUserId, setEditingUserId] = useState<string | null>(null)
  const [userFormOpen, setUserFormOpen] = useState(false)
  const [orgFormOpen, setOrgFormOpen] = useState(false)
  const coveredRegions = new Set(
    antennaRecords
      .map((antenna) => antenna.region)
      .filter((region) => region !== "À définir"),
  ).size

  const toggleNotification = (id: string, label: string, next: boolean) => {
    void setNotificationPref(id, next)
    notify(`${label} : notifications ${next ? "activées" : "désactivées"}.`)
  }

  /** Stable across unrelated re-renders so the dialogs keep the text already
   *  typed instead of resetting every time another tab's write republishes. */
  const antennaInitialValues = useMemo(
    (): Record<string, EntityFormValue> | undefined => {
      const antenna = antennaRecords.find(
        (item) => item.id === editingAntennaId,
      )
      if (!antenna) {
        return {
          type: "Délégation régionale",
          statut: "Actif",
        }
      }
      return {
        nom: antenna.nom,
        type: antenna.type,
        region: antenna.region,
        responsable: antenna.responsable,
        email: antenna.email,
        telephone: antenna.telephone,
        statut: antenna.statut,
      }
    },
    [editingAntennaId, antennaRecords],
  )

  const userInitialValues = useMemo(
    (): Record<string, EntityFormValue> | undefined => {
      const user = userRecords.find((item) => item.id === editingUserId)
      return user
        ? {
            nom: user.nom,
            email: user.email,
            role: user.role,
            region: user.region,
            password: "",
            actif: user.actif,
          }
        : undefined
    },
    [editingUserId, userRecords],
  )

  return (
    <div className="flex flex-col gap-6 max-w-[1520px] px-4 py-5 sm:px-6 lg:px-10 lg:py-6">
      <div>
        <div className="flex gap-2 items-center mb-1">
          <Settings size={20} className="text-[#424751]" />
          <h1 className="font-['Montserrat'] font-bold text-[#131b2e] text-[24px]">
            Paramètres & Antennes
          </h1>
        </div>
        <p className="font-['Inter'] text-[#424751] text-[14px]">
          Configuration du réseau territorial — {coveredRegions} région
          {coveredRegions > 1 ? "s" : ""} coordonnée
          {coveredRegions > 1 ? "s" : ""} depuis Yaoundé
        </p>
      </div>

      {/* Tabs */}
      <SegmentedTabs
        tabs={tabs.map((label, i) => ({
          key: i,
          label: (
            <>
              {i === 0 && <MapPin size={12} />}
              {i === 1 && <Users size={12} />}
              {i === 2 && <Bell size={12} />}
              {i === 3 && <Shield size={12} />}
              {i === 4 && <Building2 size={12} />}
              {label}
            </>
          ),
        }))}
        active={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === 0 && (
        <>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="font-['Montserrat'] font-bold text-[#131b2e] text-[16px]">
                Réseau des Antennes
              </p>
              <p className="font-['Inter'] text-[#424751] text-sm">
                {antennaRecords.length} antenne
                {antennaRecords.length > 1 ? "s" : ""} — synchronisation en
                temps réel
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setEditingAntennaId(null)
                setCreateOpen(true)
              }}
              className="bg-[#004484] flex gap-1.5 items-center px-4 py-2.5 rounded-full text-white font-['Inter'] font-bold text-sm shadow-sm"
            >
              <Plus size={14} />
              Nouvelle Antenne
            </button>
          </div>

          <div className="bg-white rounded-[12px] shadow-[0_1px_2px_rgba(0,0,0,0.05)] overflow-hidden">
            <DataTable
              caption="Réseau des antennes régionales"
              minWidth={700}
              columns={[
                { label: "ANTENNE" },
                { label: "RÉGION" },
                { label: "RESPONSABLE" },
                { label: "CONTACT" },
                { label: "PROJETS" },
                { label: "SYNCHRO" },
                { label: "STATUT" },
                { label: "ACTIONS" },
              ]}
            >
              {antennaRecords.map((ant: AdminAntennaRow) => (
                    <tr
                      key={ant.id}
                      className="border-t border-[#f2f3ff] hover:bg-[#faf8ff] transition-colors"
                    >
                      <td className="px-4 py-3">
                        <p className="font-['Montserrat'] font-bold text-[#131b2e] text-sm">
                          {ant.nom}
                        </p>
                        <p className="font-['Inter'] text-[#727783] text-xs">
                          {ant.type}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <span className="bg-[#eaedff] font-['Montserrat'] font-semibold text-[#424751] text-xs px-2 py-0.5 rounded-full">
                          {ant.region}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-['Inter'] text-[#424751] text-xs">
                          {ant.responsable}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1 items-center">
                          <Phone size={10} className="text-[#727783]" />
                          <span className="font-['Inter'] text-[#424751] text-xs">
                            {ant.telephone}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-['Montserrat'] font-bold text-[#004484] text-sm">
                          {ant.projets}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1.5 items-center">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{
                              backgroundColor:
                                ant.synchro === "En ligne"
                                  ? "#006e2d"
                                  : "#ba1a1a",
                            }}
                          />
                          <span className="font-['Inter'] text-[#424751] text-xs">
                            {ant.synchro}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="font-['Montserrat'] font-bold text-xs px-2 py-0.5 rounded-full"
                          style={{
                            color: ant.statutColor,
                            backgroundColor: ant.statutBg,
                          }}
                        >
                          {ant.statut}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            aria-label={`Modifier ${ant.nom}`}
                            onClick={() => {
                              setEditingAntennaId(ant.id)
                              setCreateOpen(true)
                            }}
                            className="flex size-10 items-center justify-center rounded-full text-[#004484] hover:bg-[#eaedff] hover:text-[#0b5cab]"
                          >
                            <Edit3 size={13} />
                          </button>
                          <button
                            type="button"
                            aria-label={`Supprimer ${ant.nom}`}
                            onClick={() => {
                              if (
                                window.confirm(
                                  `Supprimer ${ant.nom} du réseau ?`,
                                )
                              ) {
                                void deleteAntenna(ant.id)
                                notify(`${ant.nom} a été supprimée du réseau.`)
                              }
                            }}
                            className="flex size-10 items-center justify-center rounded-full text-[#727783] hover:bg-[#ffdad6] hover:text-[#ba1a1a]"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
            </DataTable>
          </div>

          <div className="bg-[#dae2fd] rounded-xl p-4 flex gap-3 items-start">
            <Phone size={16} className="text-[#7c2900] mt-0.5 shrink-0" />
            <div>
              <p className="font-['Montserrat'] font-bold text-[#7c2900] text-xs uppercase tracking-[0.5px]">
                {emergency.label}
              </p>
              <p className="font-['Montserrat'] font-bold text-[#131b2e] text-[16px]">
                {emergency.phone || "À renseigner"}
              </p>
              <p className="font-['Inter'] text-[#424751] text-xs">
                {emergency.detail || "Aucun détail"}
              </p>
            </div>
          </div>
        </>
      )}

      {activeTab === 1 && (
        <div className="bg-white rounded-[12px] shadow-[0_1px_2px_rgba(0,0,0,0.05)] p-6">
          <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <p className="font-['Montserrat'] font-bold text-[#131b2e] text-[16px]">
              Gestion des Utilisateurs
            </p>
            <button
              type="button"
              onClick={() => {
                setEditingUserId(null)
                setUserFormOpen(true)
              }}
              className="flex min-h-10 items-center gap-2 rounded-full bg-[#004484] px-4 text-sm font-bold text-white"
            >
              <Plus size={14} />
              Nouvel utilisateur
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {userRecords.map((u: AdminUserRow) => (
              <div
                key={u.nom}
                className="flex flex-col items-start justify-between gap-3 p-3 rounded-xl bg-[#f2f3ff] sm:flex-row sm:items-center"
              >
                <div className="flex gap-3 items-center">
                  <div className="w-9 h-9 bg-[#eaedff] rounded-full flex items-center justify-center">
                    <Users size={16} className="text-[#004484]" />
                  </div>
                  <div>
                    <p className="font-['Montserrat'] font-bold text-[#131b2e] text-sm">
                      {u.nom}
                    </p>
                    <p className="font-['Inter'] text-[#727783] text-xs">
                      {u.role} • {u.region}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <span
                    className={`font-['Montserrat'] font-bold text-xs px-2 py-0.5 rounded-full ${
                      u.actif
                        ? "bg-[#7cf994] text-[#006e2d]"
                        : "bg-[#ffdad6] text-[#ba1a1a]"
                    }`}
                  >
                    {u.actif ? "Actif" : "Inactif"}
                  </span>
                  <button
                    type="button"
                    aria-label={`Modifier ${u.nom}`}
                    onClick={() => {
                      setEditingUserId(u.id)
                      setUserFormOpen(true)
                    }}
                    className="flex size-10 items-center justify-center rounded-full text-[#004484] hover:bg-[#eaedff]"
                  >
                    <Edit3 size={13} />
                  </button>
                  <button
                    type="button"
                    aria-label={`Supprimer ${u.nom}`}
                    onClick={() => {
                      if (
                        window.confirm(
                          `Révoquer l'accès de ${u.nom} à la console ?`,
                        )
                      ) {
                        void (async () => {
                          let authWarning = ""
                          if (authConfigured) {
                            const managed = await manageAuthUser({
                              action: "delete",
                              authId: u.authId,
                              email: u.email,
                            })
                            if (!managed.ok) {
                              authWarning = `${managed.error} ` +
                                "Le profil local est supprimé, mais le compte d’accès peut rester actif."
                            }
                          }
                          void deleteUser(u.id)
                          notify(
                            `${u.nom} n'a plus accès à la console.${authWarning ? ` ${authWarning}` : ""}`,
                            authWarning ? "info" : "success",
                          )
                        })()
                      }
                    }}
                    className="flex size-10 items-center justify-center rounded-full text-[#727783] hover:bg-[#ffdad6] hover:text-[#ba1a1a]"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 2 && (
        <div className="bg-white rounded-[12px] shadow-[0_1px_2px_rgba(0,0,0,0.05)] p-6">
          <p className="font-['Montserrat'] font-bold text-[#131b2e] text-[16px] mb-4">
            Paramètres de Notifications
          </p>
          <div className="flex flex-col gap-3">
            {notifications.map((notif) => (
              <div
                key={notif.label}
                className="flex items-center justify-between gap-4 p-3 rounded-xl bg-[#f2f3ff]"
              >
                <div>
                  <p className="font-['Montserrat'] font-bold text-[#131b2e] text-sm">
                    {notif.label}
                  </p>
                  <p className="font-['Inter'] text-[#727783] text-xs">
                    {notif.description}
                  </p>
                </div>
                <div
                  role="switch"
                  tabIndex={0}
                  aria-checked={notif.enabled}
                  aria-label={notif.label}
                  onClick={() =>
                    toggleNotification(notif._id, notif.label, !notif.enabled)
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault()
                      toggleNotification(notif._id, notif.label, !notif.enabled)
                    }
                  }}
                  className={`w-10 h-6 rounded-full relative cursor-pointer transition-colors ${
                    notif.enabled ? "bg-[#006e2d]" : "bg-[#e2e7ff]"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                      notif.enabled ? "left-5" : "left-1"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 3 && (
        <div className="bg-white rounded-[12px] shadow-[0_1px_2px_rgba(0,0,0,0.05)] p-6">
          <p className="font-['Montserrat'] font-bold text-[#131b2e] text-[16px] mb-2">
            Sécurité & Conformité
          </p>
          <p className="font-['Inter'] text-[#424751] text-sm mb-4">
            {organisation?.legalApproval ?? "—"}
          </p>
          <div className="flex flex-col gap-3">
            {security.map(
              (item: { label: string; statut: string; ok: boolean }) => (
                <div
                  key={item.label}
                  className="flex flex-col items-start justify-between gap-3 p-3 rounded-xl bg-[#f2f3ff] sm:flex-row sm:items-center"
                >
                  <div className="flex gap-2 items-center">
                    <Shield
                      size={14}
                      className={item.ok ? "text-[#006e2d]" : "text-[#ba1a1a]"}
                    />
                    <span className="font-['Inter'] text-[#424751] text-sm">
                      {item.label}
                    </span>
                  </div>
                  <span
                    className={`font-['Montserrat'] font-bold text-xs px-2 py-0.5 rounded-full ${
                      item.ok
                        ? "bg-[#7cf994] text-[#006e2d]"
                        : "bg-[#ffdad6] text-[#ba1a1a]"
                    }`}
                  >
                    {item.statut}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      )}
      {activeTab === 4 && (
        <div className="bg-white rounded-[12px] shadow-[0_1px_2px_rgba(0,0,0,0.05)] p-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="font-['Montserrat'] font-bold text-[#131b2e] text-[16px]">
                Identité & coordonnées
              </p>
              <p className="font-['Inter'] text-[#424751] text-sm">
                Ce que le site public affiche — pied de page, formulaire de
                contact, mentions d’agrément
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOrgFormOpen(true)}
              className="bg-[#004484] flex gap-1.5 items-center px-4 py-2.5 rounded-full text-white font-['Inter'] font-bold text-sm shadow-sm"
            >
              <Edit3 size={14} />
              Modifier
            </button>
          </div>
          <dl className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              { label: "Nom", value: organisation?.name },
              { label: "Sous-titre", value: organisation?.subtitle },
              { label: "Siège", value: organisation?.seat },
              { label: "Agrément", value: organisation?.legalApproval },
              { label: "E-mail de contact", value: organisation?.contact.email },
              {
                label: "Téléphones",
                value: organisation?.contact.phones.join(" • "),
              },
              { label: "WhatsApp", value: organisation?.contact.whatsapp },
              {
                label: "Astreinte",
                value: organisation
                  ? `${organisation.emergency.label} — ${organisation.emergency.phone}`
                  : undefined,
              },
            ].map((row) => (
              <div
                key={row.label}
                className="rounded-xl bg-[#f2f3ff] px-3 py-2.5"
              >
                <dt className="font-['Inter'] font-bold text-[#727783] text-[11px] uppercase tracking-[0.55px]">
                  {row.label}
                </dt>
                <dd className="font-['Inter'] text-[#131b2e] text-sm">
                  {row.value ?? "—"}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}
      <EntityFormDialog
        open={orgFormOpen}
        title="Identité & coordonnées"
        description="Ces valeurs alimentent le site public : le pied de page et la page de contact les lisent directement."
        fields={orgFormFields}
        initialValues={
          organisation
            ? {
                name: organisation.name,
                subtitle: organisation.subtitle,
                seat: organisation.seat,
                legalApproval: organisation.legalApproval,
                email: organisation.contact.email,
                phones: organisation.contact.phones.join("\n"),
                whatsapp: organisation.contact.whatsapp,
                emergencyLabel: organisation.emergency.label,
                emergencyPhone: organisation.emergency.phone,
                emergencyDetail: organisation.emergency.detail,
              }
            : {}
        }
        onClose={() => setOrgFormOpen(false)}
        onSubmit={async (values) => {
          const phones = String(values.phones)
            .split("\n")
            .map((phone) => phone.trim())
            .filter(Boolean)
          if (!phones.length) {
            notify("Indiquez au moins un numéro de téléphone.", "info")
            return false
          }
          const updated = await updateOrganisation({
            name: String(values.name).trim(),
            subtitle: String(values.subtitle).trim(),
            seat: String(values.seat).trim(),
            legalApproval: String(values.legalApproval).trim(),
            contact: {
              email: String(values.email).trim().toLocaleLowerCase("fr"),
              phones,
              whatsapp: String(values.whatsapp).trim(),
            },
            emergency: {
              label: String(values.emergencyLabel).trim(),
              phone: String(values.emergencyPhone).trim(),
              detail: String(values.emergencyDetail).trim(),
            },
          })
          if (!updated) {
            notify("Enregistrement impossible.", "info")
            return false
          }
          notify("Identité de l’organisation mise à jour — le site public suit.")
          return true
        }}
      />

      <EntityFormDialog
        open={createOpen}
        title={editingAntennaId ? "Modifier l’antenne" : "Nouvelle antenne"}
        description="Renseignez l’organisation territoriale, le contact opérationnel et l’état de synchronisation."
        fields={antennaFormFields}
        initialValues={antennaInitialValues}
        submitLabel={editingAntennaId ? "Enregistrer" : "Créer l’antenne"}
        onClose={() => {
          setCreateOpen(false)
          setEditingAntennaId(null)
        }}
        onSubmit={(values) => {
          const region = regionFromLabel(String(values.region))
          if (!region) {
            notify("Sélectionnez une région du réseau national.", "info")
            return false
          }
          const nom = String(values.nom).trim()
          const status =
            ANTENNA_STATUS_FROM_LABEL[String(values.statut)] ?? "active"
          const payload = {
            code: "",
            name: nom,
            type: String(values.type),
            region,
            manager: String(values.responsable).trim(),
            email: String(values.email).trim().toLocaleLowerCase("fr"),
            phone: String(values.telephone).trim(),
            status,
            lastSyncAt: new Date().toISOString(),
          }
          const request = editingAntennaId
            ? updateAntenna(editingAntennaId, payload)
            : createAntenna({
                ...payload,
                code: `ANT-${Date.now().toString(36).toUpperCase()}`,
              })
          return request
            .then(() => {
              setCreateOpen(false)
              setEditingAntennaId(null)
              notify(
                editingAntennaId
                  ? `${nom} a été mise à jour.`
                  : `${nom} a été créée.`,
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
      <EntityFormDialog
        open={userFormOpen}
        title={editingUserId ? "Modifier l’utilisateur" : "Nouvel utilisateur"}
        description="Définissez l’identité, le rôle et le périmètre d’accès de cet utilisateur."
        fields={userFormFields}
        initialValues={userInitialValues}
        submitLabel={editingUserId ? "Enregistrer" : "Créer l’utilisateur"}
        onClose={() => {
          setEditingUserId(null)
          setUserFormOpen(false)
        }}
        onSubmit={(values) => {
          const nom = String(values.nom).trim()
          const email = String(values.email).trim().toLocaleLowerCase("fr")
          // Uniqueness is enforced here rather than by a database constraint,
          // because the message has to be readable to the coordinator.
          if (
            userRecords.some(
              (user) => user.email === email && user.id !== editingUserId,
            )
          ) {
            notify("Cette adresse e-mail est déjà utilisée.", "info")
            return false
          }
          if (
            !editingUserId &&
            userRecords.some(
              (user) =>
                user.nom.toLocaleLowerCase("fr") ===
                nom.toLocaleLowerCase("fr"),
            )
          ) {
            notify("Un utilisateur portant ce nom existe déjà.", "info")
            return false
          }
          const role = USER_ROLE_FROM_LABEL[String(values.role)] ?? "auditor"
          const row = {
            name: nom,
            email,
            role,
            region:
              String(values.role) === "Super Admin"
                ? null
                : regionFromLabel(String(values.region)),
            active: Boolean(values.actif) || String(values.role) === "Super Admin",
          }
          // Provisioning the credential happens first so the settings panel
          // can pass the Supabase Auth id it returns into the profile.
          const existingAuthId =
            (editingUserId
              ? userRecords.find((u) => u.id === editingUserId)?.authId
              : "") ?? ""
          const needCredential = !existingAuthId
          const password = String(values.password ?? "")
          if (authConfigured && needCredential && !password.trim()) {
            notify(
              "Un mot de passe initial est requis pour créer l’accès.",
              "info",
            )
            return false
          }
          return (async () => {
            let authId = existingAuthId
            let authWarning = ""
            if (authConfigured) {
              const managed = await manageAuthUser({
                action: needCredential ? "create" : "update",
                email,
                authId: authId || undefined,
                password: password.trim() || undefined,
                name: nom,
                role,
                active: row.active,
              })
              if (!managed.ok) {
                authWarning = managed.error
              } else if (managed.authId) {
                authId = managed.authId
              }
            }
            const saved = editingUserId
              ? await updateUser(editingUserId, {
                  ...row,
                  ...(authId ? { authId } : {}),
                })
              : await createUser({
                  ...row,
                  // An "Admin Antenne" is useless until attached to a
                  // territorial outpost, so a brand-new one lands on the
                  // first antenna.
                  antennaId:
                    row.role === "antenna_admin"
                      ? antennaRecords[0]?.id ?? null
                      : null,
                  ...(authId ? { authId } : {}),
                })
            if (!saved) {
              notify("Enregistrement impossible.", "info")
              return false
            }
            setEditingUserId(null)
            setUserFormOpen(false)
            notify(
              editingUserId
                ? `Le profil de ${nom} a été mis à jour.`
                : `Le compte de ${nom} a été créé.` +
                    (authWarning ? ` ${authWarning}` : ""),
              authWarning ? "info" : "success",
            )
            return true
          })().catch((error: unknown) => {
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
