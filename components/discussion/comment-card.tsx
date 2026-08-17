"use client"

import Link from "next/link"
import { Heart, Flag, Reply, Trash2 } from "lucide-react"
import type { Comment, CommentReply } from "@/lib/queries/types"
import { useState, useTransition } from "react"
import { CommentComposer } from "@/components/discussion/comment-composer"
import { deleteComment, setCommentLiked } from "@/lib/actions/comments"

const avatarColor: Record<string, string> = {
  jade: "bg-jade",
  gold: "bg-gold",
  rust: "bg-rust",
}

export function CommentCard({
  comment,
  currentUserId = null,
  likedCommentIds = [],
  isAdmin = false,
}: {
  comment: Comment
  currentUserId?: string | null
  likedCommentIds?: string[]
  isAdmin?: boolean
}) {
  const [liked, setLiked] = useState(likedCommentIds.includes(comment.id))
  const [likes, setLikes] = useState(comment.likes)
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const [isPending, startTransition] = useTransition()

  if (deleted) return null

  function handleLike() {
    if (!currentUserId) return
    const next = !liked
    setLiked(next)
    setLikes((n) => n + (next ? 1 : -1))
    startTransition(async () => {
      const res = await setCommentLiked(comment.id, comment.articleId, next)
      if (res.error) {
        setLiked(!next)
        setLikes((n) => n + (next ? -1 : 1))
      }
    })
  }

  function handleDelete() {
    const confirmMsg = isOwnComment
      ? "Delete this comment? This can't be undone."
      : "Delete this comment as an admin? This can't be undone."
    if (!confirm(confirmMsg)) return
    startTransition(async () => {
      const res = await deleteComment(comment.id, comment.articleId)
      if (!res.error) setDeleted(true)
    })
  }

  const isOwnComment = !!currentUserId && comment.authorId === currentUserId
  const canDelete = isOwnComment || isAdmin

  return (
    <div className="border-b border-line py-6 last:border-none">
      {/* Main comment */}
      <div className="flex gap-4">
        <div
          className={`flex size-10 shrink-0 items-center justify-center rounded-full font-serif text-sm font-semibold text-paper-raised ${avatarColor[comment.authorColor]}`}
          title={`${comment.authorName} - ${comment.authorAffiliation}`}
        >
          {comment.authorInitials}
        </div>

        <div className="flex-1">
          {/* Author info with verified badge */}
          <div className="mb-2 flex items-center gap-2">
            <span className="text-sm font-semibold text-ink">{comment.authorName}</span>
            {comment.verified && (
              <span className="inline-flex items-center gap-1 rounded-xs bg-jade/20 px-2 py-0.5 text-[11px] font-medium text-jade">
                ✓ Verified
              </span>
            )}
          </div>

          {/* Affiliation */}
          <p className="mb-2 text-xs text-text-soft">{comment.authorAffiliation}</p>

          {/* Comment text */}
          <p className="mb-3 text-sm leading-relaxed text-[#0f172a]">{comment.text}</p>

          {/* Metadata and actions */}
          <div className="flex items-center gap-4 text-xs text-text-soft">
            <span>{comment.timestamp}</span>
            <button
              onClick={handleLike}
              disabled={!currentUserId || isPending}
              title={currentUserId ? undefined : "Sign in to like comments"}
              className={`inline-flex items-center gap-1 transition-colors disabled:cursor-not-allowed ${
                liked ? "text-rust" : "hover:text-rust"
              }`}
            >
              <Heart className="size-4" fill={liked ? "currentColor" : "none"} />
              {likes}
            </button>
            <button className="inline-flex items-center gap-1 hover:text-gold">
              <Flag className="size-4" />
              Flag
            </button>
            <button
              onClick={() => setShowReplyForm((v) => !v)}
              className="inline-flex items-center gap-1 hover:text-gold"
            >
              <Reply className="size-4" />
              Reply
            </button>
            {canDelete && (
              <button
                onClick={handleDelete}
                disabled={isPending}
                title={isOwnComment ? undefined : "Delete as admin"}
                className="inline-flex items-center gap-1 text-text-soft hover:text-rust disabled:opacity-60"
              >
                <Trash2 className="size-4" />
                Delete
              </button>
            )}
          </div>

          {/* Replies */}
          {comment.replies.length > 0 && (
            <div className="mt-4 space-y-4 border-l-2 border-line pl-4">
              {comment.replies.map((reply) => (
                <ReplyCard
                  key={reply.id}
                  reply={reply}
                  articleId={comment.articleId}
                  currentUserId={currentUserId}
                  likedCommentIds={likedCommentIds}
                  isAdmin={isAdmin}
                />
              ))}
            </div>
          )}

          {/* Reply form */}
          {showReplyForm && (
            <div className="mt-4 rounded-xs border border-line bg-paper-raised p-3">
              {currentUserId ? (
                <CommentComposer
                  articleId={comment.articleId}
                  parentId={comment.id}
                  placeholder="Write a reply…"
                  submitLabel="Post reply"
                  autoFocus
                  onPosted={() => setShowReplyForm(false)}
                />
              ) : (
                <>
                  <p className="text-sm text-text-soft">
                    Sign in with your institutional email to reply to this comment.
                  </p>
                  <Link
                    href={`/login?redirect=/article/${comment.articleId}`}
                    className="mt-2 inline-block text-sm font-medium text-gold hover:text-gold-soft"
                  >
                    Sign in to reply
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ReplyCard({
  reply,
  articleId,
  currentUserId,
  likedCommentIds,
  isAdmin = false,
}: {
  reply: CommentReply
  articleId: string
  currentUserId: string | null
  likedCommentIds: string[]
  isAdmin?: boolean
}) {
  const [liked, setLiked] = useState(likedCommentIds.includes(reply.id))
  const [likes, setLikes] = useState(reply.likes)
  const [deleted, setDeleted] = useState(false)
  const [isPending, startTransition] = useTransition()

  if (deleted) return null

  function handleLike() {
    if (!currentUserId) return
    const next = !liked
    setLiked(next)
    setLikes((n) => n + (next ? 1 : -1))
    startTransition(async () => {
      const res = await setCommentLiked(reply.id, articleId, next)
      if (res.error) {
        setLiked(!next)
        setLikes((n) => n + (next ? -1 : 1))
      }
    })
  }

  function handleDelete() {
    const confirmMsg = isOwnReply
      ? "Delete this reply? This can't be undone."
      : "Delete this reply as an admin? This can't be undone."
    if (!confirm(confirmMsg)) return
    startTransition(async () => {
      const res = await deleteComment(reply.id, articleId)
      if (!res.error) setDeleted(true)
    })
  }

  const isOwnReply = !!currentUserId && reply.authorId === currentUserId
  const canDelete = isOwnReply || isAdmin

  return (
    <div className="flex gap-3">
      <div
        className={`flex size-8 shrink-0 items-center justify-center rounded-full font-serif text-xs font-semibold text-paper-raised ${avatarColor[reply.authorColor]}`}
        title={`${reply.authorName} - ${reply.authorAffiliation}`}
      >
        {reply.authorInitials}
      </div>

      <div className="flex-1">
        <div className="mb-1 flex items-center gap-2">
          <span className="text-xs font-semibold text-ink">{reply.authorName}</span>
          {reply.verified && (
            <span className="inline-flex items-center gap-1 rounded-xs bg-jade/20 px-1.5 py-0.5 text-[10px] font-medium text-jade">
              ✓ Verified
            </span>
          )}
        </div>

        <p className="mb-1 text-[11px] text-text-soft">{reply.authorAffiliation}</p>

        <p className="mb-2 text-xs leading-relaxed text-[#0f172a]">{reply.text}</p>

        <div className="flex items-center gap-3 text-[11px] text-text-soft">
          <span>{reply.timestamp}</span>
          <button
            onClick={handleLike}
            disabled={!currentUserId || isPending}
            title={currentUserId ? undefined : "Sign in to like comments"}
            className={`inline-flex items-center gap-1 transition-colors disabled:cursor-not-allowed ${
              liked ? "text-rust" : "hover:text-rust"
            }`}
          >
            <Heart className="size-3" fill={liked ? "currentColor" : "none"} />
            {likes}
          </button>
          {canDelete && (
            <button
              onClick={handleDelete}
              disabled={isPending}
              title={isOwnReply ? undefined : "Delete as admin"}
              className="inline-flex items-center gap-1 hover:text-rust disabled:opacity-60"
            >
              <Trash2 className="size-3" />
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
