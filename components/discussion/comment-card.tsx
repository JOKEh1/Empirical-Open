'use client'

import { Heart, Flag, Reply } from 'lucide-react'
import type { Comment, CommentReply } from '@/lib/discussion-data'
import { useState } from 'react'

const avatarColor: Record<string, string> = {
  jade: 'bg-jade',
  gold: 'bg-gold',
  rust: 'bg-rust',
}

export function CommentCard({ comment }: { comment: Comment }) {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(comment.likes)
  const [showReplyForm, setShowReplyForm] = useState(false)

  const handleLike = () => {
    setLiked(!liked)
    setLikes(liked ? likes - 1 : likes + 1)
  }

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
          <p className="mb-3 text-sm leading-relaxed text-slate-100">{comment.text}</p>

          {/* Metadata and actions */}
          <div className="flex items-center gap-4 text-xs text-text-soft">
            <span>{comment.timestamp}</span>
            <button
              onClick={handleLike}
              className={`inline-flex items-center gap-1 transition-colors ${
                liked ? 'text-rust' : 'hover:text-rust'
              }`}
            >
              <Heart className="size-4" fill={liked ? 'currentColor' : 'none'} />
              {likes}
            </button>
            <button className="inline-flex items-center gap-1 hover:text-gold">
              <Flag className="size-4" />
              Flag
            </button>
            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="inline-flex items-center gap-1 hover:text-gold"
            >
              <Reply className="size-4" />
              Reply
            </button>
          </div>

          {/* Replies */}
          {comment.replies.length > 0 && (
            <div className="mt-4 space-y-4 border-l-2 border-line pl-4">
              {comment.replies.map((reply) => (
                <ReplyCard key={reply.id} reply={reply} />
              ))}
            </div>
          )}

          {/* Reply form placeholder */}
          {showReplyForm && (
            <div className="mt-4 rounded-xs border border-line bg-paper-raised p-3">
              <p className="text-sm text-text-soft">
                Sign in with your institutional email to reply to this comment.
              </p>
              <button className="mt-2 text-sm font-medium text-gold hover:text-gold-soft">
                Sign in to reply
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ReplyCard({ reply }: { reply: CommentReply }) {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(reply.likes)

  const handleLike = () => {
    setLiked(!liked)
    setLikes(liked ? likes - 1 : likes + 1)
  }

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

        <p className="mb-2 text-xs leading-relaxed text-slate-100">{reply.text}</p>

        <div className="flex items-center gap-3 text-[11px] text-text-soft">
          <span>{reply.timestamp}</span>
          <button
            onClick={handleLike}
            className={`inline-flex items-center gap-1 transition-colors ${
              liked ? 'text-rust' : 'hover:text-rust'
            }`}
          >
            <Heart className="size-3" fill={liked ? 'currentColor' : 'none'} />
            {likes}
          </button>
        </div>
      </div>
    </div>
  )
}
