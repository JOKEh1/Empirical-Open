'use client'

import Link from 'next/link'
import { getCommentsByArticleId } from '@/lib/discussion-data'
import { CommentCard } from '@/components/discussion/comment-card'
import { MessageCircle, LogIn } from 'lucide-react'

export function ArticleDiscussion({ articleId }: { articleId: string }) {
  const comments = getCommentsByArticleId(articleId)
  const isAuthenticated = false // This would be replaced with actual auth check

  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-[900px] px-6 py-14 md:px-8">
        <div className="mb-8 flex items-center gap-2">
          <MessageCircle className="size-6 text-gold" />
          <h2 className="font-serif text-2xl font-semibold text-ink md:text-3xl">
            Reader Discussion
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          {/* Main discussion thread */}
          <div>
            {comments.length === 0 ? (
              <div className="rounded-xs border border-line bg-paper-raised p-6 text-center">
                <MessageCircle className="mx-auto mb-3 size-8 text-text-soft" />
                <p className="text-sm text-text-soft">No comments on this article yet.</p>
                <p className="mt-1 text-xs text-text-soft">Be the first to share your thoughts.</p>
              </div>
            ) : (
              <div className="divide-y divide-line">
                {comments.map((comment) => (
                  <CommentCard key={comment.id} comment={comment} />
                ))}
              </div>
            )}

            {/* Sign-in prompt for unauthenticated users */}
            {!isAuthenticated && comments.length > 0 && (
              <div className="mt-8 rounded-xs border-2 border-gold/30 bg-gold/5 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gold/20">
                    <LogIn className="size-5 text-gold" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1 font-semibold text-ink">
                      Sign in with your institutional email to comment
                    </h3>
                    <p className="mb-4 text-sm text-text-soft">
                      Readers from verified academic institutions can join the conversation. Your affiliation helps build credibility in our community discussion.
                    </p>
                    <div className="flex gap-3">
                      <Link
                        href="/login"
                        className="inline-flex items-center gap-2 rounded-xs bg-gold px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-gold-soft"
                      >
                        <LogIn className="size-4" />
                        Sign in
                      </Link>
                      <Link
                        href="/discussions"
                        className="inline-flex items-center gap-2 rounded-xs border border-gold/50 px-4 py-2 text-sm font-medium text-gold transition-colors hover:border-gold hover:bg-gold/5"
                      >
                        View all discussions
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="h-fit">
            <div className="rounded-xs border border-line bg-paper-raised p-5">
              <h3 className="mb-3 font-serif text-base font-semibold text-ink">
                Discussion guidelines
              </h3>

              <ul className="space-y-3 text-[13px] text-text-soft">
                <li className="flex gap-2">
                  <span className="mt-1 inline-block size-1 shrink-0 rounded-full bg-jade" />
                  <span>Be respectful and constructive</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 inline-block size-1 shrink-0 rounded-full bg-jade" />
                  <span>Focus on the research, not the author</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 inline-block size-1 shrink-0 rounded-full bg-jade" />
                  <span>Cite evidence or ask questions</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 inline-block size-1 shrink-0 rounded-full bg-jade" />
                  <span>Avoid self-promotion</span>
                </li>
              </ul>

              <div className="mt-5 border-t border-line pt-5">
                <div className="mb-2 text-xs font-semibold text-ink">
                  {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
                </div>
                <Link
                  href="/discussions"
                  className="text-xs font-medium text-gold hover:text-gold-soft transition-colors"
                >
                  View all discussions →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
