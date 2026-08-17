import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/lib/database.types"
import type { JournalArticle } from "./types"
import { mapArticleRow, type ArticleWithJournal } from "./articles"

type DB = SupabaseClient<Database>

/** The current user's bookmarked articles, newest saved first. */
export async function listSavedArticles(supabase: DB, userId: string): Promise<JournalArticle[]> {
  const { data, error } = await supabase
    .from("saved_articles")
    .select("created_at, articles(*, journals(name))")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
  if (error) throw error

  return (data ?? [])
    .map((row) => row.articles as unknown as ArticleWithJournal | null)
    .filter((a): a is ArticleWithJournal => !!a)
    .map(mapArticleRow)
}

export async function unsaveArticle(supabase: DB, userId: string, articleId: string): Promise<void> {
  const { error } = await supabase
    .from("saved_articles")
    .delete()
    .eq("user_id", userId)
    .eq("article_id", articleId)
  if (error) throw error
}
