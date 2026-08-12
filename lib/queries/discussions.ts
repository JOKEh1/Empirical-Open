import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/lib/database.types"
import type { Comment, CommentReply } from "./types"
import { formatRelativeTime } from "./format"

type DB = SupabaseClient<Database>
type CommentRow = Database["public"]["Tables"]["comments"]["Row"]

function mapReply(row: CommentRow): CommentReply {
  return {
    id: row.id,
    authorName: row.author_name,
    authorAffiliation: row.author_affiliation,
    authorInitials: row.author_initials,
    authorColor: row.author_color,
    text: row.body,
    timestamp: formatRelativeTime(row.created_at),
    likes: row.likes_count,
    verified: row.verified,
  }
}

function mapTopLevel(row: CommentRow, articleTitle: string, replies: CommentRow[]): Comment {
  return {
    id: row.id,
    articleId: row.article_id,
    articleTitle,
    authorName: row.author_name,
    authorAffiliation: row.author_affiliation,
    authorInitials: row.author_initials,
    authorColor: row.author_color,
    text: row.body,
    timestamp: formatRelativeTime(row.created_at),
    likes: row.likes_count,
    verified: row.verified,
    replies: replies.map(mapReply),
  }
}

/** All comments (top-level + replies) for a single article's discussion thread. */
export async function getCommentsByArticleId(supabase: DB, articleId: string): Promise<Comment[]> {
  const [{ data: rows, error }, { data: article }] = await Promise.all([
    supabase
      .from("comments")
      .select("*")
      .eq("article_id", articleId)
      .order("created_at", { ascending: false }),
    supabase.from("articles").select("title").eq("id", articleId).maybeSingle(),
  ])
  if (error) throw error

  const all = rows ?? []
  const top = all.filter((r) => !r.parent_id)
  const repliesByParent = new Map<string, CommentRow[]>()
  for (const r of all) {
    if (r.parent_id) {
      const list = repliesByParent.get(r.parent_id) ?? []
      list.push(r)
      repliesByParent.set(r.parent_id, list)
    }
  }

  const title = article?.title ?? ""
  return top.map((t) =>
    mapTopLevel(
      t,
      title,
      (repliesByParent.get(t.id) ?? []).sort((a, b) => a.created_at.localeCompare(b.created_at)),
    ),
  )
}

/** Recent top-level comments (with their replies) across the whole network —
 * used by /discussions and the homepage discussion widget. */
export async function getRecentComments(supabase: DB, limit = 50): Promise<Comment[]> {
  const { data: topRows, error } = await supabase
    .from("comments")
    .select("*, articles(title)")
    .is("parent_id", null)
    .order("created_at", { ascending: false })
    .limit(limit)
  if (error) throw error

  const top = (topRows ?? []) as (CommentRow & { articles: { title: string } | null })[]
  if (top.length === 0) return []

  const topIds = top.map((r) => r.id)
  const { data: replyRows, error: replyError } = await supabase
    .from("comments")
    .select("*")
    .in("parent_id", topIds)
    .order("created_at", { ascending: true })
  if (replyError) throw replyError

  const repliesByParent = new Map<string, CommentRow[]>()
  for (const r of replyRows ?? []) {
    const list = repliesByParent.get(r.parent_id as string) ?? []
    list.push(r)
    repliesByParent.set(r.parent_id as string, list)
  }

  return top.map((t) => mapTopLevel(t, t.articles?.title ?? "", repliesByParent.get(t.id) ?? []))
}
