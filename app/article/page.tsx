import Link from "next/link"
import { CalendarDays, Eye, Quote } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { ArticleFilters } from "@/components/article/article-filters"
import { createClient } from "@/lib/supabase/server"
import { listArticles } from "@/lib/queries/articles"
import { listJournalOptions } from "@/lib/queries/journals"
import type { JournalArticle } from "@/lib/queries/types"

const PAGE_SIZE = 20

function formatDate(date: string) {
  if (!date) return ""
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`))
}

function ArticleCard({ article }: { article: JournalArticle }) {
  return (
    <article className="flex flex-col gap-5 border-b border-[#e0dbd0] py-7 first:pt-0 last:border-b-0">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-[#64748b]">
          <span className="rounded-full bg-[#f1eee6] px-3 py-1 text-[#475569]">{article.discipline}</span>
          <span className="text-[#94a3b8]">Indexed article</span>
        </div>
        <h2 className="max-w-3xl font-serif text-2xl font-semibold leading-tight text-[#0f172a]">
          <Link className="transition-colors hover:text-[#9a681c]" href={`/article/${article.id}`}>
            {article.title}
          </Link>
        </h2>
        <Link className="w-fit text-sm font-semibold text-[#1b6b5a] hover:underline" href={`/journals/${article.journalId}`}>
          {article.journal}
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#475569]">
        <span>{article.authors}</span>
        {article.publicationDate && (
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-4 text-[#64748b]" aria-hidden="true" />
            {formatDate(article.publicationDate)}
          </span>
        )}
      </div>

      <p className="line-clamp-2 max-w-3xl text-sm leading-6 text-[#475569]">{article.abstract}</p>

      <div className="flex flex-wrap items-center gap-2 text-xs text-[#475569]">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e0dbd0] bg-white px-3 py-1.5">
          <Eye className="size-3.5 text-[#64748b]" aria-hidden="true" />
          {article.views.toLocaleString()} views
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e0dbd0] bg-white px-3 py-1.5">
          <Quote className="size-3.5 text-[#64748b]" aria-hidden="true" />
          {article.citations} citations
        </span>
      </div>
    </article>
  )
}

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; discipline?: string; journal?: string; page?: string }>
}) {
  const sp = await searchParams
  const page = Number(sp.page) > 0 ? Number(sp.page) : 1
  const supabase = await createClient()

  const [{ articles, total }, journalOptions] = await Promise.all([
    listArticles(supabase, { query: sp.q, discipline: sp.discipline, journalId: sp.journal, page, pageSize: PAGE_SIZE }),
    listJournalOptions(supabase),
  ])

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  function pageHref(targetPage: number) {
    const params = new URLSearchParams()
    if (sp.q) params.set("q", sp.q)
    if (sp.discipline) params.set("discipline", sp.discipline)
    if (sp.journal) params.set("journal", sp.journal)
    if (targetPage > 1) params.set("page", String(targetPage))
    const qs = params.toString()
    return `/article${qs ? `?${qs}` : ""}`
  }

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#0f172a]">
      <SiteHeader />
      <main>
        <section className="border-b border-[#263858] bg-[#14213d] text-white">
          <div className="mx-auto max-w-[1180px] px-6 py-14 md:px-8 md:py-16">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-[#e9c98a]">Empirical Open index</p>
            <h1 className="max-w-2xl font-serif text-4xl font-semibold leading-tight text-white md:text-5xl">Browse Articles</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#c9c4b0]">
              Browse indexed open-access research published across Empirical Open journals.
            </p>

            <ArticleFilters journalOptions={journalOptions} />
          </div>
        </section>

        <section className="mx-auto max-w-[1180px] px-6 py-10 md:px-8 md:py-14">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#64748b]">Master catalog</p>
              <h2 className="mt-2 font-serif text-2xl font-semibold text-[#0f172a]">Indexed research</h2>
            </div>
            <p className="text-sm text-[#475569]">Showing {articles.length} of {total} articles</p>
          </div>

          <div className="bg-white px-5 py-2 shadow-[0_8px_30px_rgba(15,23,42,0.05)] md:px-8">
            {articles.length > 0 ? (
              articles.map((article) => <ArticleCard key={article.id} article={article} />)
            ) : (
              <div className="py-16 text-center">
                <h2 className="font-serif text-xl font-semibold text-[#0f172a]">No articles found</h2>
                <p className="mt-2 text-sm text-[#475569]">Try a different search term or filter.</p>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-6 text-sm">
              {page > 1 ? (
                <Link href={pageHref(page - 1)} className="font-medium text-[#1b6b5a] hover:underline">
                  ← Previous
                </Link>
              ) : (
                <span className="text-[#94a3b8]">← Previous</span>
              )}
              <span className="text-[#475569]">
                Page {page} of {totalPages}
              </span>
              {page < totalPages ? (
                <Link href={pageHref(page + 1)} className="font-medium text-[#1b6b5a] hover:underline">
                  Next →
                </Link>
              ) : (
                <span className="text-[#94a3b8]">Next →</span>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
