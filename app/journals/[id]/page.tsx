import Link from "next/link"
import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { ArticlePreview } from "@/components/journal/article-preview"
import { createClient } from "@/lib/supabase/server"
import { getJournalById } from "@/lib/queries/journals"
import { ArrowLeft, Users, Globe, Award } from "lucide-react"

const disciplineColor: Record<string, string> = {
  "Public Health": "var(--jade)",
  "Agricultural Sciences": "var(--rust)",
  Engineering: "var(--gold)",
  Education: "var(--gold)",
  "Social Sciences": "var(--jade)",
  "Clinical Sciences": "var(--rust)",
  "Environmental Studies": "var(--jade)",
}

export default async function JournalDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const journal = await getJournalById(supabase, id)

  if (!journal) {
    notFound()
  }

  return (
    <>
      <SiteHeader />
      <main className="bg-background">
        {/* Back link */}
        <div className="border-b border-white/10 bg-ink">
          <div className="mx-auto max-w-[1180px] px-6 py-4 md:px-8">
            <Link
              href="/journals"
              className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-soft transition-colors"
            >
              <ArrowLeft className="size-4" />
              Back to journals
            </Link>
          </div>
        </div>

        {/* Header section */}
        <div className="border-b border-white/10 bg-ink">
          <div className="mx-auto max-w-[1180px] px-6 py-12 md:px-8">
            <div className="mb-4 flex items-center gap-4">
              <div
                className="flex size-16 items-center justify-center rounded-xs font-serif text-2xl font-bold text-paper"
                style={{ background: disciplineColor[journal.discipline] ?? "var(--jade)" }}
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
                  {journal.foundedYear ?? "—"}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-paper-raised/60">Frequency</p>
                <p className="mt-1 font-serif text-xl font-semibold text-gold">
                  {journal.frequency || "—"}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-paper-raised/60">Editor in Chief</p>
                <p className="mt-1 font-mono text-xs font-medium text-gold truncate">
                  {journal.editorInChief.split(" ").slice(1).join(" ") || journal.editorInChief}
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
                {journal.articles.length === 0 && (
                  <p className="text-sm text-paper-raised/70">No articles published yet.</p>
                )}
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
                  {journal.institution || "—"}
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
                  {journal.editorialBoard.length === 0 && (
                    <li className="text-xs text-ink-soft">Not listed</li>
                  )}
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
                  {journal.indexing.length === 0 && (
                    <li className="text-xs text-ink-soft">Not yet indexed</li>
                  )}
                </ul>
              </div>

              {/* CTA */}
              <Link
                href="/calls-for-papers"
                className="block w-full rounded-xs bg-gold px-4 py-3 text-center font-semibold text-ink transition-colors hover:bg-gold-soft"
              >
                Submit your work
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
