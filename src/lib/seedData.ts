import type {
  AlertDoc,
  AntennaDoc,
  ArticleDoc,
  CampaignDoc,
  ComplianceRowDoc,
  GovernanceDoc,
  ImpactScopeDoc,
  MilestoneDoc,
  NotificationPrefDoc,
  OrganisationDoc,
  ProjectDoc,
  ReportDoc,
  SchoolDoc,
  SecurityCheckDoc,
  TestimonialDoc,
  TransactionDoc,
  UserDoc,
} from "./models"
import { CAMEROON_REGIONS } from "./models"

/**
 * One dataset for the whole app.
 *
 * Schools are the hub: every project, article, transaction and alert below
 * points at a school, which is what lets the backoffice answer "what happened
 * at this school" using records the public site already publishes, and lets a
 * figure shown in `/admin` be a sum over the same rows the homepage renders.
 *
 * Nothing here carries a colour, a badge or a KPI. Those are derived in
 * `admin.ts`, so a status change cannot leave a stale colour behind, and no
 * figure is stored twice.
 */

/**
 * Identifiers are derived from the human-readable code an entity already
 * carries, so a reference written next to the data (`schoolId('SCH-MORA')`)
 * resolves to the row it names. Positional ids would not survive a reorder.
 */
export const normaliseCode = (code: string) =>
  code.toLowerCase().replace(/[^a-z0-9]+/g, "_")

export const schoolId = (code: string) => `school_${normaliseCode(code)}`
export const antennaId = (code: string) => `antenna_${normaliseCode(code)}`

/* ------------------------------------------------------------------ */
/* Antennas (declared first: schools reference them)                    */
/* ------------------------------------------------------------------ */

export const antennas: Omit<AntennaDoc, "_id">[] = [
  {
    code: "ANT-YDE",
    name: "Siège Yaoundé",
    type: "Coordination Nationale",
    region: "Centre",
    manager: "Dr. Estelle Mballa",
    email: "yaounde@childrensmile.cm",
    phone: "+237 699 09 86 88",
    status: "active",
    lastSyncAt: "2025-02-28T06:12:00.000Z",
  },
  {
    code: "ANT-DLA",
    name: "Antenne Douala",
    type: "Délégation régionale",
    region: "Littoral",
    manager: "M. Ekwalla Jean-Pierre",
    email: "douala@childrensmile.cm",
    phone: "+237 677 12 34 56",
    status: "active",
    lastSyncAt: "2025-02-28T06:10:00.000Z",
  },
  {
    code: "ANT-BAT",
    name: "Antenne Batouri",
    type: "Délégation régionale",
    region: "East",
    manager: "Mme Atanga Rose",
    email: "batouri@childrensmile.cm",
    phone: "+237 655 44 55 66",
    status: "active",
    lastSyncAt: "2025-02-27T18:40:00.000Z",
  },
  {
    code: "ANT-GAR",
    name: "Antenne Garoua",
    type: "Délégation régionale",
    region: "North",
    manager: "M. Hamadou Bouba",
    email: "garoua@childrensmile.cm",
    phone: "+237 699 77 88 99",
    status: "active",
    lastSyncAt: "2025-02-26T09:05:00.000Z",
  },
  {
    code: "ANT-KOU",
    name: "Antenne Kousséri",
    type: "Délégation régionale",
    region: "Far North",
    manager: "Mme Fatime Moussa",
    email: "kousseri@childrensmile.cm",
    phone: "+237 688 11 22 33",
    status: "alert",
    lastSyncAt: "2025-02-24T07:22:00.000Z",
  },
]

/* ------------------------------------------------------------------ */
/* Schools (the hub)                                                    */
/* ------------------------------------------------------------------ */

/**
 * School codes are stable identifiers; names and localities are display data.
 * `budget` is the cost of the works on site, which is what the backoffice
 * reconciles the campaign `target` against.
 */
export const schools: Omit<SchoolDoc, "_id">[] = [
  {
    code: "SCH-DIMAKO",
    name: "École Publique de Dimako",
    locality: "Haut-Nyong",
    region: "East",
    scope: "Réhabilitation 3 classes & toiture",
    status: "delivered",
    pupils: 340,
    girls: 181,
    budget: 18400000,
    progress: 100,
    ape: "signed",
    antennaId: antennaId("ANT-YDE"),
    latitude: "4.6167",
    longitude: "13.2333",
    coverImage: "",
    description:
      "Réfection de trois salles de classe, reprise totale de la toiture avec étanchéité renforcée et 120 bancs-pupitres fabriqués en bois massif camerounais.",
    startDate: "2024-06-03",
    endDate: "2024-11-18",
    updatedAt: "2025-02-20T08:00:00.000Z",
  },
  {
    code: "SCH-MORA",
    name: "École Primaire de Mora",
    locality: "Mayo-Kebbi",
    region: "Far North",
    scope: "Forage 65 m & bloc sanitaire WASH",
    status: "in_progress",
    pupils: 800,
    girls: 412,
    budget: 28400000,
    progress: 75,
    ape: "signed",
    antennaId: antennaId("ANT-KOU"),
    latitude: "7.4000",
    longitude: "12.8500",
    coverImage: "",
    description:
      "Forage descendu à 65 mètres avec pompe à énergie solaire, latrines écologiques séparées filles/garçons et comité parental formé à l'entretien.",
    startDate: "2024-09-16",
    endDate: "",
    updatedAt: "2025-02-27T11:30:00.000Z",
  },
  {
    code: "SCH-PENJA",
    name: "École Publique de Penja",
    locality: "Moungo",
    region: "Littoral",
    scope: "Bibliothèque rurale & malle aux livres",
    status: "in_progress",
    pupils: 610,
    girls: 318,
    budget: 24000000,
    progress: 40,
    ape: "signed",
    antennaId: antennaId("ANT-DLA"),
    latitude: "4.0167",
    longitude: "9.7000",
    coverImage: "",
    description:
      "Fonds documentaire bilingue de 1 200 ouvrages de jeunesse, caisses mobiles et mobilier fabriqué sur place par les menuisiers locaux.",
    startDate: "2024-11-04",
    endDate: "",
    updatedAt: "2025-02-25T14:15:00.000Z",
  },
  {
    code: "SCH-FOUMBAN",
    name: "Maternelle Bilingue de Foumban",
    locality: "Mounafoum",
    region: "West",
    scope: "Réfection toiture 420 m² & isolation",
    status: "preparing",
    pupils: 145,
    girls: 78,
    budget: 24000000,
    progress: 15,
    ape: "pending",
    antennaId: antennaId("ANT-GAR"),
    latitude: "6.8500",
    longitude: "11.5167",
    coverImage: "",
    description:
      "Remplacement de 420 m² de charpente fragilisée par les infiltrations, isolation thermique et pose de tuiles locales certifiées.",
    startDate: "",
    endDate: "",
    updatedAt: "2025-02-22T10:05:00.000Z",
  },
  {
    code: "SCH-NGAMBE",
    name: "École de Brousse de Ngambé-Tikar",
    locality: "Mbomb'om",
    region: "Centre",
    scope: "Kits secourisme & équipement didactique",
    status: "preparing",
    pupils: 920,
    girls: 471,
    budget: 27000000,
    progress: 15,
    ape: "refused",
    antennaId: antennaId("ANT-YDE"),
    latitude: "6.4667",
    longitude: "12.8333",
    coverImage: "",
    description:
      "Dotation de six écoles de brousse en armoires de pharmacie d'urgence, mallettes de premier secours et déparasitage annuel inscrit au budget de fonctionnement.",
    startDate: "",
    endDate: "",
    updatedAt: "2025-02-19T09:45:00.000Z",
  },
  {
    code: "SCH-KOUSSERI",
    name: "École Rurale de Kousséri",
    locality: "Logone-et-Chari",
    region: "Far North",
    scope: "Réhabilitation & point d'eau",
    status: "at_risk",
    pupils: 520,
    girls: 264,
    budget: 15500000,
    progress: 20,
    ape: "pending",
    antennaId: antennaId("ANT-KOU"),
    latitude: "12.0833",
    longitude: "15.0333",
    coverImage: "",
    description:
      "Site retenu pour un chantier de réhabilitation complète et un point d'eau, dont la pompe est en panne depuis trois semaines.",
    startDate: "2024-10-02",
    endDate: "",
    updatedAt: "2025-02-28T05:50:00.000Z",
  },
  {
    code: "SCH-BATOURI",
    name: "École Publique de Batouri",
    locality: "Boumba et Bomba",
    region: "East",
    scope: "Kits scolaires &store anti-cyclone",
    status: "at_risk",
    pupils: 310,
    girls: 152,
    budget: 12500000,
    progress: 85,
    ape: "signed",
    antennaId: antennaId("ANT-BAT"),
    latitude: "4.4333",
    longitude: "13.6833",
    coverImage: "",
    description:
      "Distribution de 250 kits scolaires complets aux orphelins et enfants de réfugiés, dans un bâtiment dont la toiture a été endommagée par une tornade.",
    startDate: "2024-08-12",
    endDate: "",
    updatedAt: "2025-02-28T08:15:00.000Z",
  },
]

/** Lookup by stable code, so the rows below can be written in any order. */
/* ------------------------------------------------------------------ */
/* Projects (public campaigns)                                          */
/* ------------------------------------------------------------------ */

export const projects: Omit<ProjectDoc, "_id">[] = [
  {
    slug: "rehabilitation-ecole-dimako",
    title: "Réhabilitation de l'école primaire publique de Dimako",
    excerpt:
      "Réfection complète de 3 salles de classe endommagées, remplacement total de la toiture avec étanchéité renforcée, et livraison de 120 bancs-pupitres fabriqués localement.",
    body: [
      "L'école primaire publique de Dimako accueillait 340 élèves dans trois salles dont les toitures fuyaient depuis plusieurs saisons des pluies. Les flaques d'eau stagnaient sur les tables-bancs et le taux de réussite était resté bloqué à 48,5%.",
      "Le chantier a été conduit avec le comité de parents d'élèves et un atelier de menuiserie local. 120 bancs-pupitres ont été fabriqués en bois massif camerounais, et la toiture a été reprise avec une étanchéité renforcée.",
      "Les photos du chantier, le procès-verbal de réception et les factures visées sont archivés et consultables sur demande.",
    ],
    category: "school",
    categoryLabel: "Écoles & Salles de classe",
    region: "Est",
    location: "Dimako • Est",
    status: "delivered",
    statusLabel: "Réalisé & Livré",
    progress: 100,
    impactLabel: "Impact constaté",
    impactValue: "340 élèves bénéficiaires",
    impactNote: "100% Réalisé",
    image: "8894c.png",
    raised: 18400000,
    target: 18400000,
    contributions: 214,
    donors: 187,
    milestones: [
      { label: "Diagnostic et devis", done: true },
      { label: "Chantier toiture", done: true },
      { label: "Mobilier fabriqué", done: true },
      { label: "Réception officielle", done: true },
    ],
    primaryCta: "Fiche détaillée & Bilan",
    secondaryCta: "Voir le rapport photo",
    publishedAt: "2024-11-18",
    publication: { status: "published", visible: true, featured: true },
    schoolId: schoolId("SCH-DIMAKO"),
    consentVerified: true,
    startDate: "2024-06-03",
    endDate: "2024-11-18",
    latitude: "4.6167",
    longitude: "13.2333",
  },
  {
    slug: "forage-mora-wash",
    title: "Forage d'eau potable et bloc sanitaire sécurisé à Mora",
    excerpt:
      "Création d'un point d'adduction d'eau à 65 mètres de profondeur et construction de latrines écologiques séparées filles/garçons pour 800 écoliers.",
    body: [
      "À Mora, l'eau potable provenait d'un point de puisage distant que les écolières franchissaient chaque matin sur plusieurs centaines de mètres.",
      "Le forage est descendu à 65 mètres et équipé d'une pompe à énergie solaire. Le bloc sanitaire attenant sépare les espaces filles et garçons et est entretenu par un comité parental formé.",
      "La phase finale porte sur la finition du bloc sanitaire et la réception du chantier.",
    ],
    category: "water",
    categoryLabel: "Eau potable & WASH",
    region: "Extrême-Nord",
    location: "Mora • Extrême-Nord",
    status: "in_progress",
    statusLabel: "En cours",
    progress: 75,
    impactLabel: "Bénéficiaires directs",
    impactValue: "800 écoliers",
    impactNote: "Pompe installée",
    image: "6a646.png",
    raised: 21300000,
    target: 28400000,
    contributions: 268,
    donors: 231,
    milestones: [
      { label: "Forage réalisé", done: true },
      { label: "Pompe solaire", done: true },
      { label: "Bloc sanitaire", done: false },
      { label: "Réception", done: false },
    ],
    primaryCta: "Consulter le chantier",
    secondaryCta: "Finaliser ce projet",
    publishedAt: "2025-01-06",
    publication: { status: "published", visible: true, featured: true },
    schoolId: schoolId("SCH-MORA"),
    consentVerified: true,
    startDate: "2024-09-16",
    endDate: "",
    latitude: "7.4000",
    longitude: "12.8500",
  },
  {
    slug: "bibliotheque-penja",
    title: "Bibliothèque rurale et malle aux livres de Penja",
    excerpt:
      "Acquisition et aménagement d'un fonds documentaire de 1 200 livres jeunesse francophones et anglophones, caisses mobiles et mobilier fabriqué sur place.",
    body: [
      "Le fonds documentaire est constitué en bilingue, français et anglais, pour 1 200 ouvrages de jeunesse.",
      "Le mobilier est fabriqué localement. Une malle pédagogique itinérante circule entre les écoles de la zone.",
      "L'ouverture de la bibliothèque est conditionnée par la réception des ouvrages sur les trois caisses mobiles.",
    ],
    category: "books",
    categoryLabel: "Bibliothèques & Livres",
    region: "Littoral",
    location: "Penja • Littoral",
    status: "in_progress",
    statusLabel: "En cours",
    progress: 40,
    impactLabel: "Ouvrages ciblés",
    impactValue: "1 200 livres",
    impactNote: "Mobilier fabriqué",
    image: "70a8f.png",
    raised: 9600000,
    target: 24000000,
    contributions: 143,
    donors: 126,
    milestones: [
      { label: "Fonds identifié", done: true },
      { label: "Mobilier fabriqué", done: true },
      { label: "Livres réceptionnés", done: false },
      { label: "Ouverture", done: false },
    ],
    primaryCta: "Détails du fonds",
    secondaryCta: "Parrainer",
    publishedAt: "2025-02-03",
    publication: { status: "published", visible: true, featured: false },
    schoolId: schoolId("SCH-PENJA"),
    consentVerified: true,
    startDate: "2024-11-04",
    endDate: "",
    latitude: "4.0167",
    longitude: "9.7000",
  },
  {
    slug: "kits-secourisme-ngambe-tikar",
    title: "Équipement didactique et kits secourisme à Ngambé-Tikar",
    excerpt:
      "Dotation en armoires à pharmacie d'urgence, déparasitage annuel et mallettes de premier secours pour 6 écoles primaires de brousse.",
    body: [
      "Six écoles primaires de brousse sont équipées d'armoires de pharmacie d'urgence et de mallettes de premier secours.",
      "Un déparasitage annuel est inscrit au budget de fonctionnement du programme.",
      "Le marché groupé reste à boucler avant l'acheminement des lots.",
    ],
    category: "health",
    categoryLabel: "Santé & Secours",
    region: "Centre",
    location: "Ngambé-Tikar • Centre",
    status: "preparing",
    statusLabel: "En préparation",
    progress: 15,
    impactLabel: "Couverture planifiée",
    impactValue: "6 écoles / 920 enfants",
    impactNote: "Phase d'achat groupé",
    image: "8894c.png",
    raised: 4050000,
    target: 27000000,
    contributions: 62,
    donors: 58,
    milestones: [
      { label: "Inventaire des écoles", done: true },
      { label: "Marché groupé", done: false },
      { label: "Livraison", done: false },
      { label: "Formation gestes qui sauvent", done: false },
    ],
    primaryCta: "Consulter l'inventaire",
    secondaryCta: "Soutenir ce lot",
    publishedAt: "2025-02-24",
    publication: { status: "published", visible: true, featured: false },
    schoolId: schoolId("SCH-NGAMBE"),
    consentVerified: true,
    startDate: "",
    endDate: "",
    latitude: "6.4667",
    longitude: "12.8333",
  },
  {
    slug: "toiture-maternelle-foumban",
    title: "Rénovation de la toiture de la maternelle bilingue de Foumban",
    excerpt:
      "Remplacement de 420 m² de charpente fragilisée par les infiltrations, isolation thermique et pose de tuiles locales certifiées.",
    body: [
      "Les infiltrations ont fragilisé 420 m² de charpente de la maternelle bilingue de Foumban.",
      "Le devis communautaire est validé. La phase de financement et de pose des tuiles locales certifiées reste à boucler.",
      "L'accord.parent-chef de village est en attente de signature avant le démarrage des travaux.",
    ],
    category: "school",
    categoryLabel: "Écoles & Salles de classe",
    region: "Ouest",
    location: "Foumban • Ouest",
    status: "preparing",
    statusLabel: "En préparation",
    progress: 15,
    impactLabel: "Surface toiture",
    impactValue: "420 m² à sécuriser",
    impactNote: "Devis communautaire validé",
    image: "6a646.png",
    raised: 3600000,
    target: 24000000,
    contributions: 48,
    donors: 44,
    milestones: [
      { label: "Devis communautaire", done: true },
      { label: "Financement", done: false },
      { label: "Charpente", done: false },
      { label: "Pose tuiles", done: false },
    ],
    primaryCta: "Voir le dossier technique",
    secondaryCta: "Adopter ce toit",
    publishedAt: "2025-02-11",
    publication: { status: "published", visible: true, featured: false },
    schoolId: schoolId("SCH-FOUMBAN"),
    consentVerified: false,
    startDate: "",
    endDate: "",
    latitude: "6.8500",
    longitude: "11.5167",
  },
  {
    slug: "kits-scolaires-batouri",
    title: "Don de 250 kits scolaires complets au Cycle 1 & 2 à Batouri",
    excerpt:
      "Distribution directe aux orphelins et enfants de réfugiés : cartables imperméables, boîtes de craies, cahiers, ardoises et manuels officiels.",
    body: [
      "250 kits scolaires complets ont été distribués aux orphelins et enfants de réfugiés de Batouri.",
      "Chaque kit comprend cartable imperméable, boîte de craies, cahier, ardoise et manuels officiels.",
      "La toiture de deux classes a été endommagée par une tornade ; la réparation est suivie par l'antenne de Batouri.",
    ],
    category: "school",
    categoryLabel: "Éducation & Bourses",
    region: "Est",
    location: "Batouri • Est",
    status: "delivered",
    statusLabel: "Réalisé & Distribué",
    progress: 100,
    impactLabel: "Dotations remises",
    impactValue: "250 kits complets",
    impactNote: "100% Clôturé",
    image: "70a8f.png",
    raised: 12500000,
    target: 12500000,
    contributions: 156,
    donors: 149,
    milestones: [
      { label: "Liste des bénéficiaires", done: true },
      { label: "Achat groupé", done: true },
      { label: "Distribution", done: true },
      { label: "Rapport photo", done: true },
    ],
    primaryCta: "Rapport photographique",
    secondaryCta: "Voir le bilan",
    publishedAt: "2024-12-09",
    publication: { status: "published", visible: true, featured: true },
    schoolId: schoolId("SCH-BATOURI"),
    consentVerified: true,
    startDate: "2024-08-12",
    endDate: "",
    latitude: "4.4333",
    longitude: "13.6833",
  },
]

/* ------------------------------------------------------------------ */
/* Articles (public news)                                               */
/* ------------------------------------------------------------------ */

export const articles: Omit<ArticleDoc, "_id">[] = [
  {
    slug: "forage-solaire-mora-scolarisation-filles",
    title:
      "Forage solaire à Mora : quand l'accès à l'eau potable stabilise la scolarisation des jeunes filles",
    excerpt:
      "L'installation d'une borne fontaine sécurisée à proximité immédiate de l'école a réduit de deux heures le temps de corvée quotidienne et modifié la régularité des présences.",
    body: [
      "Avant l'installation, les élèves de Mora prélevaient l'eau à un point de puisage distant. Le trajet matinal était une source de déscolarisation, en particulier pour les jeunes filles.",
      "La borne fontaine sécurisée, adossée à l'enceinte de l'école, a ramené la collecte à quelques minutes. L'équipe de la mission hydraulique a formé les filles et garçons à l'usage du point d'eau et à l'entretien de la pompe.",
      "Le suivi sur douze mois montre une assiduité en hausse et une baisse des accidents hydriques relevés par le comité parental.",
    ],
    categories: ["field", "protection"],
    categoryDisplay: "EAU & SANTÉ SCOLAIRE",
    kicker: "Mission Hydraulique",
    location: "Mora • Extrême-Nord",
    publishedAt: "2025-01-28",
    readingMinutes: 4,
    image: "6a646.png",
    featured: true,
    stats: [],
    relatedProjects: ["forage-mora-wash"],
    publication: { status: "published", visible: true, featured: true },
    schoolId: schoolId("SCH-MORA"),
    author: "Dr. Estelle Mballa",
    format: "photo",
    tags: ["Eau potable", "Scolarisation des filles", "WASH"],
    seoTitle:
      "Forage solaire à Mora : l'accès à l'eau et la scolarisation des jeunes filles",
    seoDescription:
      "Comment une borne fontaine sécurisée à Mora a réduit le temps de corvée quotidienne et stabilisé la présence des jeunes filles à l'école.",
    consentVerified: true,
  },
  {
    slug: "bilinguisme-ecoles-rurales",
    title:
      "Enseigner en français et en anglais : le pari des écoles rurales de Penja",
    excerpt:
      "Matériel pédagogique bilingue, formation des enseignants et ateliers de lecture partagé pour accompagner le double cycle scolaire.",
    body: [
      "Le double cycle scolaire suppose des enseignants capables de tenir la classe dans les deux langues.",
      "Un corpus de manuels bilingues a été remis aux écoles de la zone, accompagné de sessions de mutualisation des pratiques pédagogiques.",
      "Les ateliers de lecture partagée associent les élèves des deux cycles autour de la malle itinérante.",
    ],
    categories: ["education", "field"],
    categoryDisplay: "ÉDUCATION & BILINGUISME",
    kicker: "Pédagogie Rurale",
    location: "Penja • Littoral",
    publishedAt: "2025-01-15",
    readingMinutes: 5,
    image: "70a8f.png",
    featured: false,
    stats: [],
    relatedProjects: ["bibliotheque-penja"],
    publication: { status: "published", visible: true, featured: false },
    schoolId: schoolId("SCH-PENJA"),
    author: "M. Ekwalla Jean-Pierre",
    format: "article",
    tags: ["Bilinguisme", "Pédagogie", "Lecture"],
    seoTitle:
      "Enseigner en français et en anglais dans les écoles rurales de Penja",
    seoDescription:
      "Matériel pédagogique bilingue, formation des enseignants et ateliers de lecture partagée pour accompagner le double cycle scolaire.",
    consentVerified: true,
  },
  {
    slug: "rapport-gouvernance-2024",
    title:
      "Rapport de gouvernance 2024 : ce que nos comptes disent de nos engagements",
    excerpt:
      "Le rapport annuel présente les comptes certifiés, l'allocation des ressources par chantier et les résultats du comité de surveillance indépendant.",
    body: [
      "Le rapport présente les comptes certifiés conformes et l'allocation des ressources par chantier.",
      "Le comité de surveillance, indépendant de la direction, en a attesté la conformité.",
      "L'allocation par chantier est consultable chantier par chantier dans la médiathèque.",
    ],
    categories: ["association"],
    categoryDisplay: "VIE ASSOCIATIVE & GOUVERNANCE",
    kicker: "Audit Certifié",
    location: "Siège • Yaoundé",
    publishedAt: "2024-12-20",
    readingMinutes: 7,
    image: "8894c.png",
    featured: false,
    stats: [],
    relatedProjects: [],
    publication: { status: "published", visible: true, featured: false },
    schoolId: null,
    author: "Dr. Estelle Mballa",
    format: "report",
    tags: ["Gouvernance", "Comptes certifiés", "Transparence"],
    seoTitle:
      "Rapport de gouvernance 2024 : comptes certifiés et allocation par chantier",
    seoDescription:
      "Comptes certifiés, allocation des ressources par chantier et conclusions du comité de surveillance indépendant.",
    consentVerified: true,
  },
  {
    slug: "formation-gestes-qui-sauvent",
    title:
      "Gestes qui sauvent : formation des directeurs d'école à Ngambé-Tikar",
    excerpt:
      "Deux sessions de formation pilote ont équipé les directeurs de six écoles de brousse en mallettes de premier secours et en gestes d'urgence.",
    body: [
      "Deux sessions de formation pilote ont été dispensées aux directeurs de six écoles de brousse.",
      "Chaque établissement dispose désormais d'une mallette de premier secours et d'un protocole d'urgence écrit.",
      "L'équipement complet des écoles reste conditionné à la clôture du marché groupé.",
    ],
    categories: ["protection", "stories"],
    categoryDisplay: "PROTECTION DE L'ENFANT",
    kicker: "Formation Pilote",
    location: "Ngambé-Tikar • Centre",
    publishedAt: "2024-12-05",
    readingMinutes: 4,
    image: "8894c.png",
    featured: false,
    stats: [],
    relatedProjects: ["kits-secourisme-ngambe-tikar"],
    publication: { status: "published", visible: true, featured: false },
    schoolId: schoolId("SCH-NGAMBE"),
    author: "Mme Fatime Moussa",
    format: "article",
    tags: ["Protection", "Formation", "Urgences scolaires"],
    seoTitle:
      "Gestes qui sauvent : formation des directeurs d'école à Ngambé-Tikar",
    seoDescription:
      "Deux sessions de formation pilote ont équipé les directeurs de six écoles de brousse en mallettes de premier secours et en gestes d'urgence.",
    consentVerified: true,
  },
  {
    slug: "partenariat-economie-locale-douala",
    title:
      "Partenariat avec l'économie locale : le bois au service des écoles de l'Est",
    excerpt:
      "Un partnership avec des entreprises de Douala et de la diaspora finance la transformation de bois local certifié en mobilier scolaire livré dans l'Est.",
    body: [
      "Un partnership finance la transformation de bois local certifié en mobilier scolaire.",
      "Les menuisiers de la région sont formés et rémunérés sur place.",
      "120 bancs-pupitres en bois massif camerounais ont été livrés à Dimako dans le cadre de ce partenariat.",
    ],
    categories: ["association", "stories"],
    categoryDisplay: "PARTENARIATS & MÉCÉNAT",
    kicker: "Économie Locale",
    location: "Douala & Diaspora",
    publishedAt: "2024-11-18",
    readingMinutes: 5,
    image: "6a646.png",
    featured: false,
    stats: [],
    relatedProjects: ["rehabilitation-ecole-dimako"],
    publication: { status: "published", visible: true, featured: false },
    schoolId: schoolId("SCH-DIMAKO"),
    author: "M. Ekwalla Jean-Pierre",
    format: "article",
    tags: ["Partenariat", "Mobilier scolaire", "Économie locale"],
    seoTitle:
      "Partenariat avec l'économie locale : le bois au service des écoles de l'Est",
    seoDescription:
      "Comment un partenariat avec des entreprises de Douala et de la diaspora finance la transformation de bois local certifié en mobilier scolaire.",
    consentVerified: true,
  },
  {
    slug: "circulaire-rentree-scolaire",
    title:
      "Note d'orientation sur la rentrée scolaire adressée aux délégations départementales",
    excerpt:
      "Téléchargez la circulaire officielle adressée à toutes les délégations départementales partenaires et comités d'écoles.",
    body: [
      "La circulaire fixe le cadre de la rentrée scolaire pour l'ensemble des écoles partenaires.",
      "Elle est adressée à toutes les délégations départementales partenaires et aux comités d'écoles.",
    ],
    categories: ["official"],
    categoryDisplay: "COMMUNIQUÉ OFFICIEL",
    kicker: "Circulaire Officielle",
    location: "Direction Générale - Yaoundé",
    publishedAt: "2024-11-02",
    readingMinutes: 3,
    document: { label: "Document PDF (2.4 Mo)", sizeMb: 2.4 },
    image: "70a8f.png",
    featured: false,
    stats: [],
    relatedProjects: [],
    publication: { status: "published", visible: true, featured: false },
    schoolId: null,
    author: "Direction Générale",
    format: "report",
    tags: ["Circulaire", "Rentrée scolaire"],
    seoTitle: "Note d'orientation sur la rentrée scolaire",
    seoDescription:
      "Cadre de la rentrée scolaire pour l'ensemble des écoles partenaires et comités d'écoles.",
    consentVerified: true,
  },
]

/* ------------------------------------------------------------------ */
/* Alerts                                                               */
/* ------------------------------------------------------------------ */

export const alerts: Omit<AlertDoc, "_id">[] = [
  {
    ref: "A-001",
    title: "Toiture arrachée suite tornade",
    detail:
      "Ventviolent de 120 km/h ayant arraché la totalité du toit de 2 classes. 310 enfants sans abri scolaire.",
    schoolId: schoolId("SCH-BATOURI"),
    status: "handling",
    priority: "urgent",
    childrenAffected: 310,
    reportedAt: "2025-02-28T08:15:00.000Z",
    resolvedAt: null,
  },
  {
    ref: "A-002",
    title: "Pompe du forage en panne",
    detail:
      "La pompe solaire de Mora ne redémarre plus depuis 17 jours. 800 écoliers sans point d'eau sécurisé sur site.",
    schoolId: schoolId("SCH-MORA"),
    status: "open",
    priority: "urgent",
    childrenAffected: 800,
    reportedAt: "2025-02-26T06:40:00.000Z",
    resolvedAt: null,
  },
  {
    ref: "A-003",
    title: "Infiltrations en salle de classe",
    detail:
      "Reprise de joints et réfection de 12 m² de plafond à traiter avant la saison des pluies.",
    schoolId: schoolId("SCH-KOUSSERI"),
    status: "open",
    priority: "medium",
    childrenAffected: 140,
    reportedAt: "2025-02-24T09:05:00.000Z",
    resolvedAt: null,
  },
  {
    ref: "A-004",
    title: "Inventaire pharmacie incomplet",
    detail:
      "Trois écoles de brousse de la zone ont consommé leur stock de secours avant réapprovisionnement.",
    schoolId: schoolId("SCH-NGAMBE"),
    status: "resolved",
    priority: "low",
    childrenAffected: 60,
    reportedAt: "2025-02-18T14:20:00.000Z",
    resolvedAt: "2025-02-21T10:00:00.000Z",
  },
]

/* ------------------------------------------------------------------ */
/* Transactions                                                         */
/* ------------------------------------------------------------------ */

/**
 * The audit trail behind every project total. `raised` on a project is the
 * authoritative cumulative figure; these rows explain how it was reached and
 * are what the treasury reconciles against.
 */
export const donors = [
  { name: "A. Fotso", city: "Douala" },
  { name: "M. Ngo Bell", city: "Yaoundé" },
  { name: "L. Tchoupo", city: "Dschang" },
  { name: "S. Eyenga", city: "Bafoussam" },
  { name: "P. Atangana", city: "Garoua" },
  { name: "C. Mbarga", city: "Kribi" },
]

export const amounts = [10000, 25000, 50000, 150000, 5000, 100000]
export const countries = ["Cameroun", "France", "Canada", "Belgique", "Sénégal"]
export const rails: TransactionDoc["rail"][] = [
  "mtn-momo",
  "orange-money",
  "card",
  "bank",
  "sepa",
]
export const purposes: TransactionDoc["purpose"][] = [
  "school",
  "water",
  "books",
  "health",
  "general",
]

export const transactions: Omit<TransactionDoc, "_id">[] = Array.from(
  { length: 48 },
  (_, i) => {
    const project = projects[i % projects.length]
    const donor = donors[i % donors.length]
    const status: TransactionDoc["status"] =
      i % 11 === 0
        ? "pending"
        : i % 17 === 0
          ? "failed"
          : i % 23 === 0
            ? "refunded"
            : "succeeded"
    const created = new Date(
      Date.UTC(2025, 1, 1 + (i % 28), 9 + (i % 9), (i * 7) % 60),
    )
    // A third of the ledger is unattributed general giving, which is why the
    // project totals and the ledger total are deliberately different sums.
    const earmarked = i % 3 !== 0
    return {
      reference: `CS-2025-${String(4000 + i)}`,
      projectSlug: earmarked ? project.slug : null,
      campaignSlug: null,
      schoolId: earmarked ? project.schoolId : null,
      donorName: donor.name,
      donorEmail: `donateur${i + 1}@example.org`,
      donorCountry: countries[i % countries.length],
      amount: amounts[i % amounts.length],
      currency: "XOF",
      rail: rails[i % rails.length],
      frequency: i % 3 === 0 ? "monthly" : "one_time",
      status,
      purpose: purposes[i % purposes.length],
      createdAt: created.toISOString(),
      settledAt:
        status === "pending"
          ? null
          : new Date(created.getTime() + 60000).toISOString(),
    }
  },
)

/* ------------------------------------------------------------------ */
/* Campaign, governance and reports                                     */
/* ------------------------------------------------------------------ */

export const campaigns: Omit<CampaignDoc, "_id">[] = [
  {
    slug: "campagne-annuelle-2025",
    title: "Campagne annuelle 2025",
    target: 22000000,
    startsAt: "2025-01-01T00:00:00.000Z",
    endsAt: "2025-12-31T00:00:00.000Z",
    active: true,
  },
]

export const governance: Omit<GovernanceDoc, "_id">[] = [
  {
    title: "Comptes certifiés CAC",
    detail:
      "Allocation des ressources par chantier, auditée par un commissaire aux comptes indépendant.",
    articleSlug: "rapport-gouvernance-2024",
  },
  {
    title: "100 % des dons traçables",
    detail:
      "Chaque don est rattaché à un chantier et à une référence comptable, du formulaire au grand livre.",
    articleSlug: null,
  },
  {
    title: "Achats locaux & conformes",
    detail:
      "Mobilier et matériaux achetés auprès de scieries et artisans agréés camerounais, sur facture visée.",
    articleSlug: "partenariat-economie-locale-douala",
  },
]

export const reports: Omit<ReportDoc, "_id">[] = [
  {
    ref: "RAP-2024-A",
    title: "Bilan annuel d'impact éducatif & chantiers scolaires 2024",
    type: "Rapport annuel",
    period: "Janv – Déc 2024",
    pages: 68,
    producedAt: "2025-01-31",
    publication: { status: "published", visible: true, featured: true },
  },
  {
    ref: "RAP-2024-S",
    title: "Rapport semi-annuel II 2024",
    type: "Rapport semestriel",
    period: "Juil – Déc 2024",
    pages: 41,
    producedAt: "2025-01-15",
    publication: { status: "published", visible: true, featured: false },
  },
  {
    ref: "RAP-2025-Q1",
    title: "Rapport trimestriel T1 2025",
    type: "Rapport trimestriel",
    period: "Janv – Mars 2025",
    pages: 24,
    producedAt: "2025-04-04",
    publication: { status: "scheduled", visible: false, featured: false },
  },
  {
    ref: "RAP-CEMAC-2024",
    title: "Déclaration réglementaire CEMAC 2024",
    type: "Déclaration réglementaire",
    period: "Exercice 2024",
    pages: 52,
    producedAt: "2025-02-20",
    publication: { status: "published", visible: true, featured: false },
  },
  {
    ref: "RAP-APE-2024",
    title: "Registre des accords parent-chef de village 2024",
    type: "Registre APE",
    period: "Exercice 2024",
    pages: 17,
    producedAt: "2025-02-10",
    publication: { status: "review", visible: false, featured: false },
  },
]

export const complianceRows: Omit<ComplianceRowDoc, "_id">[] = [
  {
    key: "spend-evidence",
    label: "Justificatifs d'emploi des fonds",
    value: 96,
  },
  {
    key: "image-consents",
    label: "Consentements images des enfants",
    value: 88,
  },
  { key: "cemac-compliance", label: "Conformité CEMAC", value: 100 },
  {
    key: "antenna-reports",
    label: "Rapports d'antenne publiés",
    value: 74,
  },
  { key: "ape-signed", label: "Accords APE signés", value: 62 },
]

export const milestones: Omit<MilestoneDoc, "_id">[] = [
  { label: "Clôture des comptes 2024", date: "31 Jan 2025" },
  { label: "Rapport trimestriel T1", date: "04 Apr 2025" },
  { label: "Assemblée générale", date: "28 Jun 2025" },
]

export const testimonials: Omit<TestimonialDoc, "_id">[] = [
  {
    quote:
      "Depuis le forage, mes filles arrivent à l'école avant les garçons. Le comité parental tient enfin les comptes de l'eau.",
    author: "Aissatou D.",
    schoolId: schoolId("SCH-MORA"),
  },
  {
    quote:
      "La bibliothèque est devenue la salle la plus fréquentée de l'école. Les élèves lisent le soir à la lampe.",
    author: "Marcel T.",
    schoolId: schoolId("SCH-PENJA"),
  },
  {
    quote:
      "Les 250 kits ont changé le quotidien de mes élèves. Il manque encore un local de stockage abrité.",
    author: "Sylvie N.",
    schoolId: schoolId("SCH-BATOURI"),
  },
]

/* ------------------------------------------------------------------ */
/* People, preferences and organisation                                  */
/* ------------------------------------------------------------------ */

export const users: Omit<UserDoc, "_id">[] = [
  {
    name: "Dr. Estelle Mballa",
    email: "utilisateur1@childrensmile.cm",
    role: "super_admin",
    region: null,
    active: true,
    antennaId: antennaId("ANT-YDE"),
  },
  {
    name: "M. Ekwalla Jean-Pierre",
    email: "utilisateur2@childrensmile.cm",
    role: "antenna_admin",
    region: "Littoral",
    active: true,
    antennaId: antennaId("ANT-DLA"),
  },
  {
    name: "Mme Atanga Rose",
    email: "utilisateur3@childrensmile.cm",
    role: "antenna_admin",
    region: "East",
    active: true,
    antennaId: antennaId("ANT-BAT"),
  },
  {
    name: "M. Hamadou Bouba",
    email: "utilisateur4@childrensmile.cm",
    role: "editor",
    region: "North",
    active: true,
    antennaId: antennaId("ANT-GAR"),
  },
  {
    name: "M. Tanyi Bello",
    email: "utilisateur5@childrensmile.cm",
    role: "auditor",
    region: null,
    active: true,
    antennaId: null,
  },
]

export const notificationPrefs: Omit<NotificationPrefDoc, "_id">[] = [
  {
    key: "urgent-alerts",
    label: "Alertes urgentes terrain",
    description: "Notification immédiate pour urgences APE",
    enabled: true,
  },
  {
    key: "new-donations",
    label: "Nouveaux dons reçus",
    description: "Alerte pour chaque don Mobile Money & virement",
    enabled: true,
  },
  {
    key: "monthly-report",
    label: "Rapport mensuel",
    description: "Envoi automatique le 1er de chaque mois",
    enabled: true,
  },
  {
    key: "project-updates",
    label: "Mises à jour chantiers",
    description: "Notification sur changement d’avancement",
    enabled: false,
  },
]

export const securityChecks: Omit<SecurityCheckDoc, "_id">[] = [
  {
    key: "2fa",
    label: "Authentification à deux facteurs",
    status: "Activé",
    ok: true,
  },
  {
    key: "encryption",
    label: "Chiffrement des données sensibles",
    status: "Activé",
    ok: true,
  },
  {
    key: "audit-log",
    label: "Journalisation des accès",
    status: "Activé",
    ok: true,
  },
  {
    key: "rgpd",
    label: "Conformité RGPD & protection données",
    status: "Conforme",
    ok: true,
  },
]

export const organisation: Omit<OrganisationDoc, "_id">[] = [
  {
    name: "Children's Smile",
    subtitle: "CAMEROUN • COORDINATION",
    seat: "Yaoundé Siège",
    legalApproval: "N° 000214/A/MINAT/SG/DAP/SDLP/SAC",
    emergency: {
      label: "ASTREINTE URGENCES TERRAIN",
      phone: "+237 699 09 86 88",
      detail: "Permanence 24/7 • Référent CEMAC",
    },
    administrator: {
      name: "Dr. Estelle Mballa",
      role: "SUPER ADMIN",
      title: "Coordination Nationale Cameroun",
      avatar: "/assets/9d472.png",
    },
    searchPlaceholder: "Rechercher école, projet, donateur MTN/Orange, PV...",
    contact: {
      email: "contact@childrensmile-cm.org",
      phones: ["+237 699 09 86 88", "+237 650 88 11 55"],
      whatsapp: "+237 699 09 86 88 (Direct Terrain)",
    },
  },
]

/**
 * Regional impact rows, one per region the register can hold.
 *
 * `pupils`, `girls`, `schools` and `share` are left at zero here on purpose:
 * `repositories.ts` derives them from the schools collection so the map can
 * never disagree with the school register. The list is derived from
 * `CAMEROON_REGIONS` rather than written out, because a school opened in a
 * region missing from it would silently vanish from the impact module while
 * still counting in the national totals.
 */
export const impactRegionsInScope: Omit<ImpactScopeDoc, "_id">[] =
  CAMEROON_REGIONS.map((region) => ({ region }))

/* ------------------------------------------------------------------ */
/* Seeding                                                              */
/* ------------------------------------------------------------------ */

/** One row of the canonical dataset, in the exact shape the Supabase
 *  `documents` table and the in-memory store both keep. */
export type SeedRow = {
  collection: string
  id: string
  data: Record<string, unknown>
}

/**
 * The canonical dataset as rows, id for id with what `seed()` used to write
 * into the store. Both the app's own seed and the Supabase migration script
 * consume this, so the remote snapshot can never drift from the mock DB.
 */
export function buildSeedRows(): SeedRow[] {
  const rows: SeedRow[] = []
  const add = <T extends { _id: string },>(
    name: string,
    list: Omit<T, "_id">[],
    idOf: (row: Omit<T, "_id">, index: number) => string,
  ) => {
    for (const [index, row] of list.entries()) {
      const id = idOf(row, index)
      rows.push({
        collection: name,
        id,
        data: { ...row, _id: id } as unknown as Record<string, unknown>,
      })
    }
  }

  add("antennas", antennas, (row) => antennaId(row.code))
  add("schools", schools, (row) => schoolId(row.code))
  add("projects", projects, (row) =>
    `project_${normaliseCode(row.slug)}`,
  )
  add("articles", articles, (row) => `article_${normaliseCode(row.slug)}`)
  add("alerts", alerts, (row) => `alert_${normaliseCode(row.ref)}`)
  add("transactions", transactions, (row) =>
    `tx_${normaliseCode(row.reference)}`,
  )
  add("campaigns", campaigns, (row) => `campaign_${normaliseCode(row.slug)}`)
  add("governance", governance, (_row, index) => `gov_${index + 1}`)
  add("reports", reports, (row) => `report_${normaliseCode(row.ref)}`)
  add("complianceRows", complianceRows, (row) =>
    `compliance_${normaliseCode(row.key)}`,
  )
  add("milestones", milestones, (row) =>
    `milestone_${normaliseCode(row.label)}`,
  )
  add("testimonials", testimonials, (_row, index) => `testi_${index + 1}`)
  add("users", users, (row) => `user_${normaliseCode(row.email)}`)
  add("notificationPrefs", notificationPrefs, (row) =>
    `notif_${normaliseCode(row.key)}`,
  )
  add("securityChecks", securityChecks, (row) =>
    `sec_${normaliseCode(row.key)}`,
  )
  add("organisation", organisation, (_row, index) => `org_${index + 1}`)
  add("impactRegions", impactRegionsInScope, (row) =>
    `impact_${normaliseCode(row.region)}`,
  )
  return rows
}
