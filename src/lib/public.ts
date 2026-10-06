/**
 * Live reads for the public site.
 *
 * The public pages used to load in a `useEffect` and keep the result in
 * `useState`. That cost a frame where the catalogue looked empty, and it meant
 * a project published in the backoffice did not reach the public grid until
 * the page was reloaded. These hooks read the same collections the backoffice
 * writes to, so the public site re-renders on every store revision.
 *
 * The repository functions stay the right tool for one-off reads and writes;
 * these are for the views that render a list.
 */

import { useLiveValue, useStoreReady } from "./live"
import {
  isPublic,
  REGION_LABELS,
  settledAmount,
  type ArticleDoc,
  type CampaignDoc,
  type OrganisationDoc,
  type ProjectDoc,
  type Region,
  type SchoolDoc,
  type TestimonialDoc,
  type TransactionDoc,
} from "./models"
import {
  articles as articleCollection,
  campaigns as campaignCollection,
  organisation as organisationCollection,
  projects as projectCollection,
  schools as schoolCollection,
  testimonials as testimonialCollection,
  transactions as transactionCollection,
  type Doc,
} from "./db"

const EMPTY: never[] = []

const read = <T extends Doc,>(
  collection: { snapshot: () => Doc[] },
  ready: boolean,
): T[] => (ready ? collection.snapshot() as T[] : EMPTY as T[])

const byDateDesc = (a: { publishedAt: string }, b: { publishedAt: string }) =>
  b.publishedAt.localeCompare(a.publishedAt)

/** Published and visible projects, newest first. */
export function usePublishedProjects(): ProjectDoc[] {
  const ready = useStoreReady()
  return useLiveValue(() =>
    read<ProjectDoc>(projectCollection, ready)
      .filter((project) => isPublic(project.publication))
      .sort(byDateDesc),
  )
}

/** Published and visible articles, newest first. */
export function usePublishedArticles(): ArticleDoc[] {
  const ready = useStoreReady()
  return useLiveValue(() =>
    read<ArticleDoc>(articleCollection, ready)
      .filter((article) => isPublic(article.publication))
      .sort(byDateDesc),
  )
}

/** The schools the public site counts its reach from. */
export function usePublicSchools(): SchoolDoc[] {
  const ready = useStoreReady()
  return useLiveValue(() => read<SchoolDoc>(schoolCollection, ready))
}

/** Confirmed gifts, for the public transparency figures. */
export function usePublicGifts(): TransactionDoc[] {
  const ready = useStoreReady()
  return useLiveValue(() =>
    read<TransactionDoc>(transactionCollection, ready).filter(
      (transaction) => transaction.status === "succeeded",
    ),
  )
}

export function usePublicTestimonials(): TestimonialDoc[] {
  const ready = useStoreReady()
  return useLiveValue(() => read<TestimonialDoc>(testimonialCollection, ready))
}

/** The active fundraising campaign and how much of its target is confirmed. */
export function useActiveCampaign(): {
  slug: string
  title: string
  target: number
  settled: number
  /** 0–100, floored like the admin collection tiles. */
  progress: number
} | null {
  const ready = useStoreReady()
  return useLiveValue(() => {
    const rows = read<CampaignDoc>(campaignCollection, ready)
    const campaign = rows.find((c) => c.active) ?? rows[0]
    if (!campaign) return null
    const settled = settledAmount(
      read<TransactionDoc>(transactionCollection, ready),
    )
    const progress =
      campaign.target > 0
        ? Math.min(100, Math.floor((settled / campaign.target) * 100))
        : 0
    return {
      slug: campaign.slug,
      title: campaign.title,
      target: campaign.target,
      settled,
      progress,
    }
  })
}

/**
 * The impact figures the Notre Impact page's maps and headline cards render.
 *
 * Every count is derived from the same collections the backoffice edits, so a
 * school opened in the register or a gift confirmed in the treasury moves the
 * public numbers on the next render.
 */
export function usePublicImpact(): {
  coveredRegions: number
  totalPupils: number
  girlsPct: number
  totalSchools: number
  regions: { name: string; pupils: number; schools: number; share: number }[]
  testimonials: {
    author: string
    initials: string
    school: string
    quote: string
  }[]
} {
  const ready = useStoreReady()
  return useLiveValue(() => {
    const schools = read<SchoolDoc>(schoolCollection, ready)
    const testimonials = read<TestimonialDoc>(testimonialCollection, ready)
    const schoolsByRegion = new Map<string, { pupils: number; count: number }>()
    for (const school of schools) {
      const key = REGION_LABELS[school.region as Region] ?? school.region
      const row = schoolsByRegion.get(key) ?? { pupils: 0, count: 0 }
      row.pupils += school.pupils
      row.count += 1
      schoolsByRegion.set(key, row)
    }
    const totalPupils = schools.reduce((sum, school) => sum + school.pupils, 0)
    const totalGirls = schools.reduce((sum, school) => sum + school.girls, 0)
    const regions = (Object.keys(REGION_LABELS) as Region[]).map((regionKey) => {
      const name = REGION_LABELS[regionKey]
      const row = schoolsByRegion.get(name)
      return {
        name,
        pupils: row?.pupils ?? 0,
        schools: row?.count ?? 0,
        share: totalPupils ? Math.round(((row?.pupils ?? 0) / totalPupils) * 100) : 0,
      }
    })
    const bySchool = new Map(schools.map((school) => [school._id, school]))
    return {
      coveredRegions: regions.filter((region) => region.pupils > 0).length,
      totalPupils,
      girlsPct: totalPupils && totalGirls ? Math.round((totalGirls / totalPupils) * 100) : 0,
      totalSchools: schools.length,
      regions,
      testimonials: testimonials.map((item) => {
        const school = bySchool.get(item.schoolId)
        const words = item.author
          .replace(/^M\.?\s+|^Mme?\s+/i, "")
          .split(/\s+/)
          .filter(Boolean)
        return {
          author: item.author,
          initials: words
            .slice(0, 2)
            .map((word) => word[0].toLocaleUpperCase("fr"))
            .join(""),
          school: school?.name ?? "",
          quote: item.quote,
        }
      }),
    }
  })
}

/**
 * Values mirrored from `seed.ts` for the frame before the store is ready and
 * for the case where the row has not been seeded yet. The footer renders these
 * as-is, so they must stay identical to the seeded defaults or the site would
 * flicker between two spellings of the same details.
 */
const ORGANISATION_FALLBACK: Omit<OrganisationDoc, "_id"> = {
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
}

/**
 * The organisation identity record the public chrome renders from — name,
 * duty numbers, legal mentions. Editing it in Settings changes the footer
 * without touching the template.
 */
export function useOrganisation(): Omit<OrganisationDoc, "_id"> {
  const ready = useStoreReady()
  return useLiveValue(() => {
    const row = read<OrganisationDoc>(organisationCollection, ready)[0]
    if (!row) return ORGANISATION_FALLBACK
    const { _id: ignored, ...rest } = row
    void ignored
    return rest
  })
}
