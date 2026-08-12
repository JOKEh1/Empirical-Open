import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/lib/database.types"
import type { JournalDetail, JournalArticle } from "./types"

type DB = SupabaseClient<Database>

function mapArticleRow(row: Database["public"]["Tables"]["articles"]["Row"], journalName: string): JournalArticle {
  return {
    id: row.id,
    title: row.title,
    authors: row.authors,
    abstract: row.abstract,
    publicationDate: row.publication_date ?? "",
    journal: journalName,
    journalId: row.journal_id,
    discipline: row.discipline,
    views: row.views,
    citations: row.citations,
  }
}

/** Active journals for the public directory, with a real per-journal article count. */
export async function listActiveJournals(supabase: DB): Promise<JournalDetail[]> {
  const { data, error } = await supabase
    .from("journals")
    .select("*, articles(count)")
    .eq("status", "active")
    .order("name")
  if (error) throw error

  return (data ?? []).map((j) => {
    const articles = j.articles as unknown as { count: number }[] | null
    return {
      id: j.id,
      name: j.name,
      initials: j.initials,
      discipline: j.discipline,
      foundedYear: j.founded_year,
      institution: j.institution,
      articlesCount: articles?.[0]?.count ?? 0,
      description: j.description,
      editorInChief: j.editor_in_chief,
      editorialBoard: (j.editorial_board ?? []) as string[],
      frequency: j.frequency,
      indexing: j.indexing ?? [],
      articles: [],
    }
  })
}

export async function getJournalById(supabase: DB, id: string): Promise<JournalDetail | null> {
  const { data: j, error } = await supabase.from("journals").select("*").eq("id", id).maybeSingle()
  if (error) throw error
  if (!j) return null

  const { data: articles, error: articlesError } = await supabase
    .from("articles")
    .select("*")
    .eq("journal_id", id)
    .order("publication_date", { ascending: false })
  if (articlesError) throw articlesError

  return {
    id: j.id,
    name: j.name,
    initials: j.initials,
    discipline: j.discipline,
    foundedYear: j.founded_year,
    institution: j.institution,
    articlesCount: articles?.length ?? 0,
    description: j.description,
    editorInChief: j.editor_in_chief,
    editorialBoard: (j.editorial_board ?? []) as string[],
    frequency: j.frequency,
    indexing: j.indexing ?? [],
    articles: (articles ?? []).map((a) => mapArticleRow(a, j.name)),
  }
}

/** {id, name} pairs for the article-listing journal filter dropdown. */
export async function listJournalOptions(supabase: DB): Promise<{ id: string; name: string }[]> {
  const { data, error } = await supabase
    .from("journals")
    .select("id, name")
    .eq("status", "active")
    .order("name")
  if (error) throw error
  return data ?? []
}
