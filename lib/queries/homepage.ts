import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/lib/database.types"
import { listActiveJournals } from "./journals"
import { getTrendingArticles, getEditorsPickArticle } from "./articles"
import { listOpenCFPs } from "./cfp"
import { listAnnouncements } from "./announcements"
import { getRecentComments } from "./discussions"

type DB = SupabaseClient<Database>

/** One aggregated fetch for the homepage — every widget's data in parallel,
 * computed from real tables instead of the old hub-data.ts mock constants. */
export async function getHomepageData(supabase: DB) {
  const [journals, trending, editorsPick, cfps, announcements, comments, articlesCountRes] = await Promise.all([
    listActiveJournals(supabase),
    getTrendingArticles(supabase, 4),
    getEditorsPickArticle(supabase),
    listOpenCFPs(supabase),
    listAnnouncements(supabase, 4),
    getRecentComments(supabase, 3),
    supabase.from("articles").select("*", { count: "exact", head: true }),
  ])

  const totalJournals = journals.length
  const totalArticles = articlesCountRes.count ?? 0
  const institutions = new Set(journals.map((j) => j.institution).filter(Boolean))

  const heroStats = [
    { num: String(totalJournals), label: "Journals hosted" },
    { num: totalArticles.toLocaleString(), label: "Indexed articles" },
    { num: String(institutions.size), label: "Partner institutions" },
    { num: String(cfps.length), label: "Open calls for papers" },
  ]

  return {
    heroStats,
    editorsPick,
    trending,
    cfps: cfps.slice(0, 3),
    journals: journals.slice(0, 4),
    moreJournalsCount: Math.max(0, totalJournals - 4),
    announcements,
    comments,
  }
}
