"use client"

import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { ArticlePreview } from "@/components/journal/article-preview"
import { getJournalById } from "@/lib/journals-data"
import { ArrowLeft, BookOpen, Users, Calendar, Globe, Award } from "lucide-react"

export default function JournalDetailPage() {
  const params = useParams()
  const router = useRouter()
  const journal = getJournalById(params.id as string)

  if (!journal) {
    return (
      <>
        <SiteHeader />
        <div className="flex h-[60vh] items-center justify-center bg-background">
          <div className="text-center">
            <p className="text-paper-raised/70">Journal not found.</p>
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
          <div className="mx-auto max-w-[1180px] px-6 py-4 md:px-8">
            <button
              type="button"
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-soft transition-colors"
            >
              <ArrowLeft className="size-4" />
              Back
            </button>
          </div>
        </div>

        {/* Header section */}
        <div className="border-b border-white/10 bg-ink">
          <div className="mx-auto max-w-[1180px] px-6 py-12 md:px-8">
            <div className="mb-4 flex items-center gap-4">
              <div
                className="flex size-16 items-center justify-center rounded-xs font-serif text-2xl font-bold text-paper"
                style={{
                  background:
                    journal.discipline === "Public Health"
                      ? "var(--jade)"
                      : journal.discipline === "Agricultural Sciences"
                        ? "var(--rust)"
                        : journal.discipline === "Engineering"
                          ? "var(--gold)"
                          : journal.discipline === "Education"
                            ? "var(--gold)"
                            : journal.discipline === "Social Sciences"
                              ? "var(--jade)"
                              : journal.discipline === "Clinical Sciences"
                                ? "var(--rust)"
                                : "var(--jade)",
                }}
              >
                {journal.initials}
              </div>
              <div>
                <p className="text-xs font-medium text-gold">
                  {journal.discipline.toUpperCase()}
                </p>
                <h1 className="font-serif text-2xl font-bold text-paper-raised">
                  {journal.name}
                </h1>
              </div>
            </div>

            <p className="mb-6 max-w-2xl leading-relaxed text-paper-raised/80">
              {journal.description}
            </p>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              <div>
                <p className="text-xs font-medium text-paper-raised/60">Articles</p>
                <p className="mt-1 font-serif text-xl font-semibold text-gold">
                  {journal.articlesCount.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-paper-raised/60">Founded</p>
                <p className="mt-1 font-serif text-xl font-semibold text-gold">
                  {journal.foundedYear}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-paper-raised/60">Frequency</p>
                <p className="mt-1 font-serif text-xl font-semibold text-gold">
                  {journal.frequency}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-paper-raised/60">Editor in Chief</p>
                <p className="mt-1 font-mono text-xs font-medium text-gold truncate">
                  {journal.editorInChief.split(" ").slice(1).join(" ")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-[1180px] px-6 py-12 md:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main content */}
            <div className="lg:col-span-2">
              <h2 className="mb-6 font-serif text-2xl font-bold text-paper-raised">
                Recent articles
              </h2>

              <div className="space-y-4">
                {journal.articles.map((article) => (
                  <ArticlePreview key={article.id} article={article} showJournal={false} />
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Institution */}
              <div className="rounded-xs border border-white/10 bg-paper p-5">
                <p className="mb-2 inline-flex items-center gap-2 text-xs font-semibold text-ink">
                  <Globe className="size-3.5" />
                  Institution
                </p>
                <p className="font-serif text-sm font-semibold text-ink">
                  {journal.institution}
                </p>
              </div>

              {/* Editorial board */}
              <div className="rounded-xs border border-white/10 bg-paper p-5">
                <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold text-ink">
                  <Users className="size-3.5" />
                  Editorial board
                </p>
                <ul className="space-y-2">
                  {journal.editorialBoard.map((member) => (
                    <li key={member} className="text-xs text-ink-soft">
                      {member}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Indexing */}
              <div className="rounded-xs border border-white/10 bg-paper p-5">
                <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold text-ink">
                  <Award className="size-3.5" />
                  Indexed in
                </p>
                <ul className="space-y-1.5">
                  {journal.indexing.map((index) => (
                    <li key={index} className="text-xs text-ink-soft">
                      {index}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <button className="w-full rounded-xs bg-gold px-4 py-3 font-semibold text-ink transition-colors hover:bg-gold-soft">
                Submit your work
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
