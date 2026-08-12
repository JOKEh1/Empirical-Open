"use client"

import { useActionState, useEffect, useRef } from "react"
import { postComment, type CommentActionState } from "@/lib/actions/comments"

const initialState: CommentActionState = { error: null }

export function CommentComposer({
  articleId,
  parentId,
  onPosted,
  placeholder = "Share your thoughts on this article…",
  submitLabel = "Post comment",
  autoFocus = false,
}: {
  articleId: string
  parentId?: string
  onPosted?: () => void
  placeholder?: string
  submitLabel?: string
  autoFocus?: boolean
}) {
  const [state, formAction, isPending] = useActionState(postComment, initialState)
  const formRef = useRef<HTMLFormElement>(null)
  const wasPending = useRef(false)

  useEffect(() => {
    if (wasPending.current && !isPending && !state.error) {
      formRef.current?.reset()
      onPosted?.()
    }
    wasPending.current = isPending
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending])

  return (
    <form ref={formRef} action={formAction} className="space-y-3">
      <input type="hidden" name="articleId" value={articleId} />
      {parentId && <input type="hidden" name="parentId" value={parentId} />}
      <textarea
        name="body"
        required
        rows={parentId ? 3 : 4}
        maxLength={5000}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="w-full rounded-xs border border-line bg-paper px-4 py-3 text-sm text-ink placeholder:text-text-soft focus:border-gold focus:outline-none resize-none"
      />
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-xs bg-gold px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-gold-soft disabled:opacity-60"
        >
          {isPending ? "Posting…" : submitLabel}
        </button>
        {state.error && <p className="text-xs text-rust">{state.error}</p>}
      </div>
    </form>
  )
}
