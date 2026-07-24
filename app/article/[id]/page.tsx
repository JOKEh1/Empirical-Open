"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { getArticleById } from "@/lib/journals-data"
import { ArticleDiscussion } from "@/components/discussion/article-discussion"
import {
  ArrowLeft,
  Calendar,
  BookOpen,
  Share2,
  Download,
  Heart,
  MessageCircle,
} from "lucide-react"

export default function ArticleReaderPage() {
  const params = useParams()
  const article = getArticleById(params.id as string)

  if (!article) {
    return (
      <>
        <SiteHeader />
        <div className="flex h-[60vh] items-center justify-center bg-background">
          <div className="text-center">
            <p className="text-paper-raised/70">Article not found.</p>
            <Link href="/journals" className="mt-4 inline-block text-gold hover:text-gold-soft">
              Back to journals
            </Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <SiteHeader />
      <main className="bg-background">
        {/* Back link */}
        <div className="border-b border-white/10 bg-ink">
          <div className="mx-auto max-w-[900px] px-6 py-4 md:px-8">
            <Link
              href="/journals"
              className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-soft transition-colors"
            >
              <ArrowLeft className="size-4" />
              Back to journals
            </Link>
          </div>
        </div>

        {/* Article header */}
        <div className="border-b border-white/10 bg-ink">
          <div className="mx-auto max-w-[900px] px-6 py-12 md:px-8">
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-medium text-gold">
              <BookOpen className="size-3.5" />
              {article.discipline}
            </p>

            <h1 className="mb-4 font-serif text-3xl font-bold leading-snug text-paper-raised">
              {article.title}
            </h1>

            <p className="mb-6 text-base text-paper-raised/80">{article.authors}</p>

            <div className="flex flex-wrap items-center gap-6 border-t border-white/10 pt-6 text-sm text-paper-raised/70">
              <div className="flex items-center gap-2">
                <Calendar className="size-4" />
                {new Date(article.publicationDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="size-4" />
                {article.journal}
              </div>
              <div className="ml-auto flex items-center gap-4">
                <button className="inline-flex items-center gap-1 text-paper-raised/60 hover:text-paper-raised transition-colors">
                  <Heart className="size-4" />
                  Save
                </button>
                <button className="inline-flex items-center gap-1 text-paper-raised/60 hover:text-paper-raised transition-colors">
                  <Share2 className="size-4" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-[900px] px-6 py-12 md:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main article */}
            <div className="lg:col-span-2 space-y-6">
              {/* Abstract section */}
              <section>
                <h2 className="mb-3 font-serif text-xl font-bold text-paper-raised">
                  Abstract
                </h2>
                <p className="leading-relaxed text-paper-raised/80">{article.abstract}</p>
              </section>

              {/* Article content placeholder */}
              <section className="rounded-xs border border-white/10 bg-paper p-8">
                <div className="space-y-4 text-ink">
                  <p>
                    This is a preview of the article content. Full PDF and HTML versions are available
                    for download below.
                  </p>
                  <p>
                    The complete research article, including methodology, results, discussion, and
                    references, contains the full analysis and findings from this study.
                  </p>
                  <p>
                    Readers can access the full text through institutional subscriptions or open
                    access repositories as indicated below.
                  </p>
                </div>
              </section>

              {/* Download section */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <button className="flex items-center justify-center gap-2 rounded-xs bg-gold px-5 py-3 font-semibold text-ink transition-colors hover:bg-gold-soft">
                  <Download className="size-4" />
                  Download PDF
                </button>
                <button className="flex items-center justify-center gap-2 rounded-xs border border-white/20 px-5 py-3 font-semibold text-paper-raised transition-colors hover:border-white/40">
                  <BookOpen className="size-4" />
                  Read HTML
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Metrics */}
              <div className="rounded-xs border border-white/10 bg-paper p-5">
                <h3 className="mb-4 font-serif text-sm font-bold text-ink">Article metrics</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-medium text-ink-soft">Views</p>
                    <p className="font-serif text-lg font-semibold text-gold">
                      {article.views.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-ink-soft">Citations</p>
                    <p className="font-serif text-lg font-semibold text-gold">
                      {article.citations}
                    </p>
                  </div>
                </div>
              </div>

              {/* Journal info */}
              <div className="rounded-xs border border-white/10 bg-paper p-5">
                <p className="text-xs font-medium text-ink-soft mb-2">Published in</p>
                <Link
                  href={`/journals/${article.journalId}`}
                  className="text-sm font-semibold text-ink hover:text-gold transition-colors"
                >
                  {article.journal}
                </Link>
                <p className="mt-3 text-xs text-ink-soft">
                  Volume · Issue · {new Date(article.publicationDate).getFullYear()}
                </p>
              </div>

              {/* Discussion */}
              <div className="rounded-xs border border-white/10 bg-paper p-5">
                <h3 className="mb-3 font-serif text-sm font-bold text-ink">
                  Discussion ({article.citations})
                </h3>
                <button className="w-full flex items-center justify-center gap-2 rounded-xs bg-jade px-4 py-2 text-sm font-semibold text-paper transition-colors hover:bg-jade-soft">
                  <MessageCircle className="size-4" />
                  Add comment
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Discussion section */}
        <ArticleDiscussion articleId={params.id as string} />
      </main>
    </>
  )
}
