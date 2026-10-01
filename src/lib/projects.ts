export type ProjectCategory = 'school' | 'water' | 'books' | 'health'

export type ProjectStatus = 'delivered' | 'in_progress' | 'preparing'

export type Project = {
  /** Stable slug: this is the route segment and the admin record key. */
  slug: string
  title: string
  excerpt: string
  category: ProjectCategory
  categoryLabel: string
  region: string
  location: string
  status: ProjectStatus
  statusLabel: string
  /** 0-100. Replaces the hardcoded `inset-[0_60%_0_0]` progress fills. */
  progress: number
  /** Primary impact figure shown above the meter. */
  impactLabel: string
  impactValue: string
  /** Secondary line under the value, e.g. the current milestone. */
  impactNote: string
  /** Denormalised funding totals so a card never has to sum transactions. */
  raised: number
  target: number
  contributions: number
  donors: number
  primaryCta: string
  secondaryCta: string
  image: string
}

export const PROJECTS: Project[] = [
  {
    slug: 'rehabilitation-ecole-dimako',
    title: "Réhabilitation de l'école primaire publique de Dimako",
    excerpt:
      "Réfection complète de 3 salles de classe endommagées, remplacement total de la toiture avec étanchéité renforcée, et livraison de 120 bancs-pupitres fabriqués localement.",
    category: 'school',
    categoryLabel: 'Écoles & Salles de classe',
    region: 'Est',
    location: 'Dimako • Est',
    status: 'delivered',
    statusLabel: 'Réalisé & Livré',
    progress: 100,
    impactLabel: 'Impact constaté',
    impactValue: '340 élèves réintégrés',
    impactNote: '100% Réalisé',
    raised: 18_400_000,
    target: 18_400_000,
    contributions: 214,
    donors: 187,
    primaryCta: 'Fiche détaillée & Bilan',
    secondaryCta: 'Voir le rapport photo',
    image: '8894c.png',
  },
  {
    slug: 'forage-mora-wash',
    title: "Forage d'eau potable et bloc sanitaire sécurisé à Mora",
    excerpt:
      "Création d'un point d'adduction d'eau à 65 mètres de profondeur et construction de latrines écologiques séparées filles/garçons pour 800 écoliers.",
    category: 'water',
    categoryLabel: 'Eau potable & WASH',
    region: 'Extrême-Nord',
    location: 'Mora • Extrême-Nord',
    status: 'in_progress',
    statusLabel: 'En cours',
    progress: 75,
    impactLabel: 'Bénéficiaires directs',
    impactValue: '800 écoliers',
    impactNote: 'Pompe installée',
    raised: 21_300_000,
    target: 28_400_000,
    contributions: 268,
    donors: 231,
    primaryCta: 'Consulter le chantier',
    secondaryCta: 'Finaliser ce projet',
    image: '6a646.png',
  },
  {
    slug: 'bibliotheque-penja',
    title: 'Bibliothèque rurale et malle aux livres de Penja',
    excerpt:
      "Acquisition et aménagement d'un fonds documentaire de 1 200 livres jeunesse francophones et anglophones, caisses mobiles et mobilier fabriqué sur place.",
    category: 'books',
    categoryLabel: 'Bibliothèques & Livres',
    region: 'Littoral',
    location: 'Penja • Littoral',
    status: 'in_progress',
    statusLabel: 'En cours',
    progress: 40,
    impactLabel: 'Ouvrages ciblés',
    impactValue: '1 200 livres',
    impactNote: 'Mobilier fabriqué',
    raised: 9_600_000,
    target: 24_000_000,
    contributions: 143,
    donors: 126,
    primaryCta: 'Détails du fonds',
    secondaryCta: 'Parrainer',
    image: '70a8f.png',
  },
  {
    slug: 'kits-secourisme-ngambe-tikar',
    title: 'Équipement didactique et kits secourisme à Ngambé-Tikar',
    excerpt:
      "Dotation en armoires à pharmacie d'urgence, déparasitage annuel et mallettes de premier secours pour 6 écoles primaires de brousse.",
    category: 'health',
    categoryLabel: 'Santé & Secours',
    region: 'Centre',
    location: "Ngambé-Tikar • Centre",
    status: 'preparing',
    statusLabel: 'En préparation',
    progress: 15,
    impactLabel: 'Couverture planifiée',
    impactValue: '6 écoles / 920 enfants',
    impactNote: "Phase d'achat groupé",
    raised: 4_050_000,
    target: 27_000_000,
    contributions: 62,
    donors: 58,
    primaryCta: "Consulter l'inventaire",
    secondaryCta: 'Soutenir ce lot',
    image: '8894c.png',
  },
  {
    slug: 'toiture-maternelle-foumban',
    title: 'Rénovation de la toiture de la maternelle bilingue de Foumban',
    excerpt:
      'Remplacement de 420 m² de charpente fragilisée par les infiltrations, isolation thermique etPose de tuiles locales certifiées.',
    category: 'school',
    categoryLabel: 'Écoles & Salles de classe',
    region: 'Ouest',
    location: 'Foumban • Ouest',
    status: 'preparing',
    statusLabel: 'En préparation',
    progress: 15,
    impactLabel: 'Surface toiture',
    impactValue: '420 m² à sécuriser',
    impactNote: 'Devis communautaire validé',
    raised: 3_600_000,
    target: 24_000_000,
    contributions: 48,
    donors: 44,
    primaryCta: 'Voir le dossier technique',
    secondaryCta: 'Adopter ce toit',
    image: '6a646.png',
  },
  {
    slug: 'kits-scolaires-batouri',
    title: 'Don de 250 kits scolaires complets au Cycle 1 & 2 à Batouri',
    excerpt:
      "Distribution directe aux orphelins et enfants de réfugiés : cartables imperméables, boîtes de craies, cahiers, ardoises et manuels officiels.",
    category: 'school',
    categoryLabel: 'Éducation & Bourses',
    region: 'Est',
    location: 'Batouri • Est',
    status: 'delivered',
    statusLabel: 'Réalisé & Distribué',
    progress: 100,
    impactLabel: 'Dotations remises',
    impactValue: '250 kits complets',
    impactNote: '100% Clôturé',
    raised: 12_500_000,
    target: 12_500_000,
    contributions: 156,
    donors: 149,
    primaryCta: 'Rapport photographique',
    secondaryCta: 'Voir le bilan',
    image: '70a8f.png',
  },
]

export const projectBySlug = (slug: string) => PROJECTS.find((p) => p.slug === slug)

export const raisedFor = (p: Project) => p.raised
export const targetFor = (p: Project) => p.target
export const pctFor = (p: Project) => (p.target === 0 ? 0 : Math.round((p.raised / p.target) * 100))
