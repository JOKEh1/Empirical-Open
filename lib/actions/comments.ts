"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"

export type CommentActionState = { error: string | null }

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  return parts.slice(0, 2).map((p) => p[0]?.toUpperCase() ?? "").join("") || "R"
}

/** Post a top-level comment or a reply. Author fields are denormalized
 * from the poster's profile at post time (matches the schema's design —
 * comments keep a snapshot so they survive later profile edits). */
export async function postComment(
  _prevState: CommentActionState,
  formData: FormData,
): Promise<CommentActionState> {
  const articleId = String(formData.get("articleId") ?? "").trim()
  const parentIdRaw = formData.get("parentId")
  const parentId = parentIdRaw ? String(parentIdRaw).trim() : null
  const body = String(formData.get("body") ?? "").trim()

  if (!articleId) return { error: "Missing article." }
  if (!body) return { error: "Comment cannot be empty." }
  if (body.length > 5000) return { error: "Comment is too long (max 5,000 characters)." }

  const supabase = await createClient()
  const { data: userData } = await supabase.auth.getUser()
  const user = userData.user
  if (!user) return { error: "You must be signed in to comment." }

  const { data: profile } = await supabase
    .from("profiles")
    .select("name, affiliation, avatar_color, verified")
    .eq("id", user.id)
    .maybeSingle()

  const authorName = profile?.name?.trim() || user.email?.split("@")[0] || "Reader"

  const { error } = await supabase.from("comments").insert({
    article_id: articleId,
    parent_id: parentId,
    author_id: user.id,
    author_name: authorName,
    author_affiliation: profile?.affiliation ?? "",
    author_initials: initialsOf(authorName),
    author_color: profile?.avatar_color ?? "jade",
    verified: profile?.verified ?? false,
    body,
  })
  if (error) return { error: error.message }

  revalidatePath(`/article/${articleId}`)
  revalidatePath("/discussions")
  return { error: null }
}

/** RLS already restricts this to the comment's own author (or an admin),
 * so no extra ownership check is needed here — Postgres enforces it. */
export async function deleteComment(commentId: string, articleId: string): Promise<CommentActionState> {
  const supabase = await createClient()
  const { error } = await supabase.from("comments").delete().eq("id", commentId)
  if (error) return { error: error.message }

  revalidatePath(`/article/${articleId}`)
  revalidatePath("/discussions")
  return { error: null }
}

export async function setCommentLiked(
  commentId: string,
  articleId: string,
  liked: boolean,
): Promise<CommentActionState> {
  const supabase = await createClient()
  const { data: userData } = await supabase.auth.getUser()
  const user = userData.user
  if (!user) return { error: "You must be signed in to like a comment." }

  if (liked) {
    const { error } = await supabase
      .from("comment_likes")
      .insert({ comment_id: commentId, user_id: user.id })
    if (error && !/duplicate key/i.test(error.message)) return { error: error.message }
  } else {
    const { error } = await supabase
      .from("comment_likes")
      .delete()
      .eq("comment_id", commentId)
      .eq("user_id", user.id)
    if (error) return { error: error.message }
  }

  revalidatePath(`/article/${articleId}`)
  revalidatePath("/discussions")
  return { error: null }
}
