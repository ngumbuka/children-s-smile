import { db } from './db'
import type { ArticleDoc, ProjectDoc, TransactionDoc } from './models'

const projects: Omit<ProjectDoc, '_id'>[] = [
  {
    slug: 'rehabilitation-ecole-dimako',
    title: "Réhabilitation de l'école primaire publique de Dimako",
    excerpt:
      "Réfection complète de 3 salles de classe endommagées, remplacement total de la toiture avec étanchéité renforcée, et livraison de 120 bancs-pupitres fabriqués localement.",
    body: [
      "L'école primaire publique de Dimako accueillait 340 élèves dans trois salles dont les toitures fuyaient depuis plusieurs saisons des pluies. Les flaques d'eau stagnaient sur les tables-bancs et le taux de réussite était resté bloqué à 48,5%.",
      "Le chantier a été conduit avec le comité de parents d'élèves et un atelier de menuiserie local. 120 bancs-pupitres ont été fabriqués en bois massif camerounais, et la toiture a été reprise avec une étanchéité renforcée.",
      "Les photos du chantier, le procès-verbal de réception et les factures visées sont archivés et consultables sur demande.",
    ],
    category: 'school',
    categoryLabel: 'Écoles & Salles de classe',
    region: 'Est',
    location: 'Dimako • Est',
    status: 'delivered',
    statusLabel: 'Réalisé & Livré',
    progress: 100,
    impactLabel: 'Impact constaté',
    impactValue: '340 élèves bénéficiaires',
    impactNote: '100% Réalisé',
    image: '8894c.png',
    raised: 18400000,
    target: 18400000,
    contributions: 214,
    donors: 187,
    milestones: [
      { label: 'Diagnostic et devis', done: true },
      { label: 'Chantier toiture', done: true },
      { label: 'Mobilier fabriqué', done: true },
      { label: 'Réception officielle', done: true },
    ],
    primaryCta: 'Fiche détaillée & Bilan',
    secondaryCta: 'Voir le rapport photo',
    publishedAt: '2024-11-18',
  },
  {
    slug: 'forage-mora-wash',
    title: "Forage d'eau potable et bloc sanitaire sécurisé à Mora",
    excerpt:
      "Création d'un point d'adduction d'eau à 65 mètres de profondeur et construction de latrines écologiques séparées filles/garçons pour 800 écoliers.",
    body: [
      "À Mora, l'eau potable provenait d'un point de puisage distant que les écolières franchissaient chaque matin sur plusieurs centaines de mètres.",
      "Le forage est descendu à 65 mètres et équipé d'une pompe à énergie solaire. Le bloc sanitaire attenant sépare les espaces filles et garçons et est entretenu par un comité parental formé.",
      "La phase finale porte sur la finition du bloc sanitaire et la réception du chantier.",
    ],
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
    image: '6a646.png',
    raised: 21300000,
    target: 28400000,
    contributions: 268,
    donors: 231,
    milestones: [
      { label: 'Forage réalisé', done: true },
      { label: 'Pompe solaire', done: true },
      { label: 'Bloc sanitaire', done: false },
      { label: 'Réception', done: false },
    ],
    primaryCta: 'Consulter le chantier',
    secondaryCta: 'Finaliser ce projet',
    publishedAt: '2025-01-06',
  },
  {
    slug: 'bibliotheque-penja',
    title: 'Bibliothèque rurale et malle aux livres de Penja',
    excerpt:
      "Acquisition et aménagement d'un fonds documentaire de 1 200 livres jeunesse francophones et anglophones, caisses mobiles et mobilier fabriqué sur place.",
    body: [
      "Le fonds documentaire est constitué en bilingue, français et anglais, pour 1 200 ouvrages de jeunesse.",
      "Le mobilier est fabriqué localement. Une malle pédagogique itinérante circule entre les écoles de la zone.",
    ],
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
    image: '70a8f.png',
    raised: 9600000,
    target: 24000000,
    contributions: 143,
    donors: 126,
    milestones: [
      { label: 'Fonds identifié', done: true },
      { label: 'Mobilier fabriqué', done: true },
      { label: 'Livres réceptionnés', done: false },
      { label: 'Ouverture', done: false },
    ],
    primaryCta: 'Détails du fonds',
    secondaryCta: 'Parrainer',
    publishedAt: '2025-02-03',
  },
  {
    slug: 'kits-secourisme-ngambe-tikar',
    title: 'Équipement didactique et kits secourisme à Ngambé-Tikar',
    excerpt:
      "Dotation en armoires à pharmacie d'urgence, déparasitage annuel et mallettes de premier secours pour 6 écoles primaires de brousse.",
    body: [
      "Six écoles primaires de brousse sont équipées d'armoires à pharmacie d'urgence et de mallettes de premier secours.",
      "Un déparasitage annuel est inscrit au budget de fonctionnement du programme.",
    ],
    category: 'health',
    categoryLabel: 'Santé & Secours',
    region: 'Centre',
    location: 'Ngambé-Tikar • Centre',
    status: 'preparing',
    statusLabel: 'En préparation',
    progress: 15,
    impactLabel: 'Couverture planifiée',
    impactValue: '6 écoles / 920 enfants',
    impactNote: "Phase d'achat groupé",
    image: '8894c.png',
    raised: 4050000,
    target: 27000000,
    contributions: 62,
    donors: 58,
    milestones: [
      { label: 'Inventaire des écoles', done: true },
      { label: 'Marché groupé', done: false },
      { label: 'Livraison', done: false },
      { label: 'Formation gestes qui sauvent', done: false },
    ],
    primaryCta: "Consulter l'inventaire",
    secondaryCta: 'Soutenir ce lot',
    publishedAt: '2025-02-24',
  },
  {
    slug: 'toiture-maternelle-foumban',
    title: 'Rénovation de la toiture de la maternelle bilingue de Foumban',
    excerpt:
      'Remplacement de 420 m² de charpente fragilisée par les infiltrations, isolation thermique et pose de tuiles locales certifiées.',
    body: [
      "Les infiltrations ont fragilisé 420 m² de charpente de la maternelle bilingue de Foumban.",
      "Le devis communautaire est validé. La phase de financement et de pose des tuiles locales certifiées reste à boucler.",
    ],
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
    image: '6a646.png',
    raised: 3600000,
    target: 24000000,
    contributions: 48,
    donors: 44,
    milestones: [
      { label: 'Devis communautaire', done: true },
      { label: 'Financement', done: false },
      { label: 'Charpente', done: false },
      { label: 'Pose tuiles', done: false },
    ],
    primaryCta: 'Voir le dossier technique',
    secondaryCta: 'Adopter ce toit',
    publishedAt: '2025-02-11',
  },
  {
    slug: 'kits-scolaires-batouri',
    title: 'Don de 250 kits scolaires complets au Cycle 1 & 2 à Batouri',
    excerpt:
      "Distribution directe aux orphelins et enfants de réfugiés : cartables imperméables, boîtes de craies, cahiers, ardoises et manuels officiels.",
    body: [
      "250 kits scolaires complets ont été distribués aux orphelins et enfants de réfugiés de Batouri.",
      "Chaque kit comprend cartable imperméable, boîte de craies, cahiers, ardoise et manuels officiels.",
    ],
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
    image: '70a8f.png',
    raised: 12500000,
    target: 12500000,
    contributions: 156,
    donors: 149,
    milestones: [
      { label: 'Liste des bénéficiaires', done: true },
      { label: 'Achat groupé', done: true },
      { label: 'Distribution', done: true },
      { label: 'Rapport photo', done: true },
    ],
    primaryCta: 'Rapport photographique',
    secondaryCta: 'Voir le bilan',
    publishedAt: '2024-12-09',
  },
]

const articles: Omit<ArticleDoc, '_id'>[] = [
  {
    slug: 'forage-solaire-mora-scolarisation-filles',
    title: "Forage solaire à Mora : quand l'accès à l'eau potable stabilise la scolarisation des jeunes filles",
    excerpt:
      "L'installation d'une borne fontaine sécurisée à proximité immédiate de l'école a réduit de deux heures le temps de corvée quotidienne et modifié la régularité des présences.",
    body: [
      "Avant l'installation, les élèves de Mora prélevaient l'eau à un point de puisage distant. Le trajet matinal était une source de déscolarisation, en particulier pour les jeunes filles.",
      "La borne fontaine sécurisée, adossée à l'enceinte de l'école, a ramené la collecte à quelques minutes. L'équipe de la mission hydraulique a formé les filles et garçons à l'usage du point d'eau et à l'entretien de la pompe.",
      "Le suivi sur douze mois montre une assiduité en hausse et une baisse des accidents hydriques relevés par le comité parental.",
    ],
    categories: ['field', 'protection'],
    categoryDisplay: 'EAU & SANTÉ SCOLAIRE',
    kicker: 'Mission Hydraulique',
    location: 'Mora • Extrême-Nord',
    publishedAt: '2025-01-28',
    readingMinutes: 4,
    image: '6a646.png',
    featured: false,
    stats: [],
    relatedProjects: ['forage-mora-wash'],
  },
  {
    slug: 'bilinguisme-ecoles-rurales',
    title: 'Enseigner en français et en anglais : le pari des écoles rurales de Penja',
    excerpt:
      "Matériel pédagogique bilingue, formation des enseignants et ateliers de lecture partagé pour accompagner le double cycle scolaire.",
    body: [
      "Le double cycle scolaire suppose des enseignants capables de tenir la classe dans les deux langues.",
      "Un corpus de manuels bilingues a été remis aux écoles de la zone, accompagné de sessions de mutualisation des pratiques pédagogiques.",
    ],
    categories: ['education', 'field'],
    categoryDisplay: 'ÉDUCATION & BILINGUISME',
    kicker: 'Pédagogie Rurale',
    location: 'Penja • Littoral',
    publishedAt: '2025-01-15',
    readingMinutes: 5,
    image: '70a8f.png',
    featured: false,
    stats: [],
    relatedProjects: ['bibliotheque-penja'],
  },
  {
    slug: 'rapport-gouvernance-2024',
    title: "Rapport de gouvernance 2024 : ce que nos comptes disent de nos engagements",
    excerpt:
      "Le rapport annuel présente les comptes certifiés, l'allocation des ressources par chantier et les résultats du comité de surveillance indépendant.",
    body: [
      "Le rapport présente les comptes certifiés conformes et l'allocation des ressources par chantier.",
      "Le comité de surveillance, indépendant de la direction, en a attesté la conformité.",
    ],
    categories: ['association'],
    categoryDisplay: 'VIE ASSOCIATIVE & GOUVERNANCE',
    kicker: 'Audit Certifié',
    location: 'Siège • Yaoundé',
    publishedAt: '2024-12-20',
    readingMinutes: 7,
    image: '8894c.png',
    featured: false,
    stats: [],
    relatedProjects: [],
  },
  {
    slug: 'formation-gestes-qui-sauvent',
    title: "Gestes qui sauvent : formation des directeurs d'école à Ngambé-Tikar",
    excerpt:
      "Deux sessions de formation pilote ont équipé les directeurs de six écoles de brousse en mallettes de premier secours et en gestes d'urgence.",
    body: [
      "Deux sessions de formation pilote ont été dispensées aux directeurs de six écoles de brousse.",
      "Chaque établissement dispose désormais d'une mallette de premier secours et d'un protocole d'urgence écrit.",
    ],
    categories: ['protection', 'stories'],
    categoryDisplay: "PROTECTION DE L'ENFANT",
    kicker: 'Formation Pilote',
    location: 'Ngambé-Tikar • Centre',
    publishedAt: '2024-12-05',
    readingMinutes: 4,
    image: '8894c.png',
    featured: false,
    stats: [],
    relatedProjects: ['kits-secourisme-ngambe-tikar'],
  },
  {
    slug: 'partenariat-economie-locale-douala',
    title: "Partenariat avec l'économie locale : le bois au service des écoles de l'Est",
    excerpt:
      "Un partnership avec des entreprises de Douala et de la diaspora finance la transformation de bois local certifié en mobilier scolaire livré dans l'Est.",
    body: [
      "Un partnership finance la transformation de bois local certifié en mobilier scolaire.",
      "Les menuisiers de la région sont formés et rémunérés sur place.",
    ],
    categories: ['association', 'stories'],
    categoryDisplay: 'PARTENARIATS & MÉCÉNAT',
    kicker: 'Économie Locale',
    location: 'Douala & Diaspora',
    publishedAt: '2024-11-18',
    readingMinutes: 5,
    image: '6a646.png',
    featured: false,
    stats: [],
    relatedProjects: ['rehabilitation-ecole-dimako'],
  },
  {
    slug: 'circulaire-rentree-scolaire',
    title: "Note d'orientation sur la rentrée scolaire adressée aux délégations départementales",
    excerpt:
      "Téléchargez la circulaire officielle adressée à toutes les délégations départementales partenaires et comités d'écoles.",
    body: [
      "La circulaire fixe le cadre de la rentrée scolaire pour l'ensemble des écoles partenaires.",
      "Elle est adressée à toutes les délégations départementales partenaires et aux comités d'écoles.",
    ],
    categories: ['official'],
    categoryDisplay: 'COMMUNIQUÉ OFFICIEL',
    kicker: 'Circulaire Officielle',
    location: 'Direction Générale - Yaoundé',
    publishedAt: '2024-11-02',
    readingMinutes: 3,
    document: { label: 'Document PDF (2.4 Mo)', sizeMb: 2.4 },
    image: '70a8f.png',
    featured: false,
    stats: [],
    relatedProjects: [],
  },
]

/**
 * Contribution records. Each project totals are kept denormalised on the
 * project document for cheap rendering; these rows are the audit trail the
 * admin backoffice reconciles against.
 */
const transactions: Omit<TransactionDoc, '_id'>[] = Array.from({ length: 48 }, (_, i) => {
  const p = projects[i % projects.length]
  const amounts = [10000, 25000, 50000, 150000, 5000, 100000]
  const amount = amounts[i % amounts.length]
  const status: TransactionDoc['status'] =
    i % 11 === 0 ? 'pending' : i % 17 === 0 ? 'failed' : i % 23 === 0 ? 'refunded' : 'succeeded'
  const d = new Date(Date.UTC(2025, 2, 1 + (i % 28), 9 + (i % 9), (i * 7) % 60))
  const assigned = p.slug === 'kits-secourisme-ngambe-tikar' ? null : p.slug
  return {
    reference: `CS-2025-${String(4000 + i)}`,
    projectSlug: assigned,
    campaignSlug: null,
    donorName: ['A. Fotso', 'M. Ngo Bell', 'L. Tchoupo', 'S. Eyenga', 'P. Atangana', 'C. Mbarga'][i % 6],
    donorEmail: `donateur${i + 1}@example.org`,
    donorCountry: ['Cameroun', 'France', 'Canada', 'Belgique', 'Sénégal'][i % 5],
    amount,
    currency: 'XOF',
    channel: (['mobile', 'card', 'bank', 'sepa'] as const)[i % 4],
    frequency: i % 3 === 0 ? 'monthly' : 'one_time',
    status,
    createdAt: d.toISOString(),
    settledAt: status === 'pending' ? null : new Date(d.getTime() + 60000).toISOString(),
  }
})

let seeded = false

export async function seed() {
  if (seeded) return
  seeded = true
  const pc = db.collection<ProjectDoc & { _id: string }>('projects')
  const ac = db.collection<ArticleDoc & { _id: string }>('articles')
  const tc = db.collection<TransactionDoc & { _id: string }>('transactions')
  if ((await pc.count()) === 0) {
    for (const p of projects) await pc.insert(p)
  }
  if ((await ac.count()) === 0) {
    for (const a of articles) await ac.insert(a)
  }
  if ((await tc.count()) === 0) {
    for (const t of transactions) await tc.insert(t)
  }
}
