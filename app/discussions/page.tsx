'use client'

import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SectionHeader } from '@/components/section-header'
import { getAllDiscussionComments } from '@/lib/discussion-data'
import { CommentCard } from '@/components/discussion/comment-card'
import { ArrowLeft } from 'lucide-react'

export default function DiscussionsPage() {
  const comments = getAllDiscussionComments()

  return (
    <>
      <SiteHeader />
      <main className="bg-background">
        {/* Header */}
        <div className="border-b border-line bg-ink">
          <div className="mx-auto max-w-[1180px] px-6 py-8 md:px-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-soft transition-colors mb-6"
            >
              <ArrowLeft className="size-4" />
              Back to home
            </Link>

            <div className="flex items-start justify-between">
              <div>
                <h1 className="font-serif text-4xl font-semibold text-paper md:text-5xl">
                  Reader Discussion
                </h1>
                <p className="mt-2 text-sm text-text-soft">
                  Community feedback on articles across the EmpiricalOpen network
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="mx-auto max-w-[1180px] px-6 py-14 md:px-8">
          <SectionHeader
            tag="Active Discussions"
            title="Join the Conversation"
          />

          <div className="grid gap-12 lg:grid-cols-[1fr_340px]">
            {/* Comments thread */}
            <div>
              {comments.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-text-soft">No comments yet. Be the first to share your thoughts.</p>
                </div>
              ) : (
                <div className="divide-y divide-line">
                  {comments.map((comment) => (
                    <div key={comment.id}>
                      <div className="py-4 first:pt-0">
                        {/* Article reference */}
                        <Link
                          href={`/article/${comment.articleId}`}
                          className="mb-4 inline-flex items-center gap-1 rounded-xs bg-jade/10 px-3 py-1 text-[12px] font-medium text-jade hover:bg-jade/20 transition-colors"
                        >
                          <span className="truncate">
                            on "{comment.articleTitle.substring(0, 50)}..."
                          </span>
                        </Link>
                      </div>
                      <CommentCard comment={comment} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="h-fit space-y-6">
              {/* Info box */}
              <div className="rounded-xs border border-line bg-paper-raised p-5">
                <h3 className="mb-3 font-serif text-base font-semibold text-ink">
                  About reader discussion
                </h3>
                <p className="mb-4 text-[13px] leading-relaxed text-text-soft">
                  All commenters verify with an institutional email address. Each journal&apos;s editors moderate
                  discussions on their articles, and every comment can be flagged for review by our community standards team.
                </p>

                <div className="space-y-2 border-t border-line pt-4">
                  <div className="flex items-center gap-2 text-[13px] text-ink">
                    <span className="inline-block size-1.5 rounded-full bg-jade" />
                    Verified institutional affiliations
                  </div>
                  <div className="flex items-center gap-2 text-[13px] text-ink">
                    <span className="inline-block size-1.5 rounded-full bg-jade" />
                    One-level nested replies
                  </div>
                  <div className="flex items-center gap-2 text-[13px] text-ink">
                    <span className="inline-block size-1.5 rounded-full bg-jade" />
                    Community flagging system
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="rounded-xs border border-line bg-paper-raised p-5">
                <h3 className="mb-3 font-serif text-base font-semibold text-ink">
                  Ready to join?
                </h3>
                <p className="mb-4 text-[13px] text-text-soft">
                  Sign in with your institutional email to comment and share your research insights.
                </p>
                <Link
                  href="/login"
                  className="block rounded-xs bg-gold px-4 py-2.5 text-center text-sm font-semibold text-ink transition-colors hover:bg-gold-soft"
                >
                  Sign in to comment
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}
