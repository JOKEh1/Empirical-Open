import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/lib/database.types"
import type { JournalArticle } from "./types"

type DB = SupabaseClient<Database>
type ArticleRow = Database["public"]["Tables"]["articles"]["Row"]
type ArticleWithJournal = ArticleRow & { journals: { name: string } | null }

function mapArticleRow(row: ArticleWithJournal): JournalArticle {
  return {
    id: row.id,
    title: row.title,
    authors: row.authors,
    abstract: row.abstract,
    publicationDate: row.publication_date ?? "",
    journal: row.journals?.name ?? "",
    journalId: row.journal_id,
    discipline: row.discipline,
    views: row.views,
    citations: row.citations,
  }
}

export async function getArticleById(supabase: DB, id: string): Promise<JournalArticle | null> {
  const { data, error } = await supabase
    .from("articles")
    .select("*, journals(name)")
    .eq("id", id)
    .maybeSingle()
  if (error) throw error
  return data ? mapArticleRow(data as ArticleWithJournal) : null
}

/** Paginated, filterable article listing — the server-side replacement for the
 * old client-side `journalsDetail.flatMap(...)` + `useMemo` filtering. */
export async function listArticles(
  supabase: DB,
  opts: { query?: string; discipline?: string; journalId?: string; page?: number; pageSize?: number },
): Promise<{ articles: JournalArticle[]; total: number }> {
  const { query, discipline, journalId, page = 1, pageSize = 20 } = opts

  let q = supabase.from("articles").select("*, journals(name)", { count: "exact" })
  if (query?.trim()) q = q.textSearch("fts", query.trim(), { type: "websearch", config: "english" })
  if (discipline && discipline !== "All disciplines") q = q.eq("discipline", discipline)
  if (journalId && journalId !== "all") q = q.eq("journal_id", journalId)

  const from = (page - 1) * pageSize
  const to = from + pageSize - 1
  const { data, error, count } = await q
    .order("publication_date", { ascending: false })
    .range(from, to)
  if (error) throw error

  return { articles: (data ?? []).map((row) => mapArticleRow(row as ArticleWithJournal)), total: count ?? 0 }
}

/** Full-text + discipline search used by /search. */
export async function searchArticles(supabase: DB, query: string, discipline?: string): Promise<JournalArticle[]> {
  let q = supabase.from("articles").select("*, journals(name)")
  if (query.trim()) q = q.textSearch("fts", query.trim(), { type: "websearch", config: "english" })
  if (discipline && discipline !== "All disciplines") q = q.eq("discipline", discipline)

  const { data, error } = await q.order("views", { ascending: false })
  if (error) throw error
  return (data ?? []).map((row) => mapArticleRow(row as ArticleWithJournal))
}

export async function getTrendingArticles(supabase: DB, limit = 4): Promise<JournalArticle[]> {
  const { data, error } = await supabase
    .from("articles")
    .select("*, journals(name)")
    .order("views", { ascending: false })
    .limit(limit)
  if (error) throw error
  return (data ?? []).map((row) => mapArticleRow(row as ArticleWithJournal))
}

/** No manual curation flag exists on `articles`, so "Editor's Pick" is proxied
 * by the most-cited article — a real, independent-of-views quality signal. */
export async function getEditorsPickArticle(supabase: DB): Promise<JournalArticle | null> {
  const { data, error } = await supabase
    .from("articles")
    .select("*, journals(name)")
    .order("citations", { ascending: false })
    .limit(1)
    .maybeSingle()
  if (error) throw error
  return data ? mapArticleRow(data as ArticleWithJournal) : null
}

export async function incrementArticleViews(supabase: DB, articleId: string): Promise<void> {
  const { error } = await supabase.rpc("increment_article_views", { p_article_id: articleId })
  if (error) throw error
}

export async function getCommentCountForArticle(supabase: DB, articleId: string): Promise<number> {
  const { count, error } = await supabase
    .from("comments")
    .select("*", { count: "exact", head: true })
    .eq("article_id", articleId)
  if (error) throw error
  return count ?? 0
}
