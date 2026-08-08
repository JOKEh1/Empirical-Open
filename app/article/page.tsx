"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { CalendarDays, ChevronDown, Eye, Quote, Search } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { journalsDetail } from "@/lib/journals-data"
import type { JournalArticle } from "@/lib/journals-data"

const allArticles = journalsDetail.flatMap((journal) => journal.articles)
const disciplines = ["All disciplines", ...Array.from(new Set(allArticles.map((article) => article.discipline)))]
const journalOptions = ["All journals", ...journalsDetail.map((journal) => journal.name)]

function formatDate(date: string) {
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
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="size-4 text-[#64748b]" aria-hidden="true" />
          {formatDate(article.publicationDate)}
        </span>
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

export default function ArticlesPage() {
  const [query, setQuery] = useState("")
  const [discipline, setDiscipline] = useState("All disciplines")
  const [journal, setJournal] = useState("All journals")

  const filteredArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return allArticles.filter((article) => {
      const matchesQuery = !normalizedQuery || [article.title, article.authors, article.abstract, article.journal]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery)
      const matchesDiscipline = discipline === "All disciplines" || article.discipline === discipline
      const matchesJournal = journal === "All journals" || article.journal === journal
      return matchesQuery && matchesDiscipline && matchesJournal
    })
  }, [discipline, journal, query])

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

            <div className="mt-8 flex flex-col gap-3 lg:flex-row">
              <label className="flex min-h-12 flex-1 items-center gap-3 rounded-md bg-white px-4 text-[#475569]">
                <Search className="size-5 shrink-0 text-[#64748b]" aria-hidden="true" />
                <span className="sr-only">Search articles</span>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search titles, authors, journals, or keywords"
                  className="w-full bg-transparent text-sm text-[#0f172a] outline-none placeholder:text-[#64748b]"
                />
              </label>
              <FilterSelect label="Discipline" value={discipline} options={disciplines} onChange={setDiscipline} />
              <FilterSelect label="Journal" value={journal} options={journalOptions} onChange={setJournal} />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1180px] px-6 py-10 md:px-8 md:py-14">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#64748b]">Master catalog</p>
              <h2 className="mt-2 font-serif text-2xl font-semibold text-[#0f172a]">Indexed research</h2>
            </div>
            <p className="text-sm text-[#475569]">Showing {filteredArticles.length} of {allArticles.length} articles</p>
          </div>

          <div className="bg-white px-5 py-2 shadow-[0_8px_30px_rgba(15,23,42,0.05)] md:px-8">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => <ArticleCard key={article.id} article={article} />)
            ) : (
              <div className="py-16 text-center">
                <h2 className="font-serif text-xl font-semibold text-[#0f172a]">No articles found</h2>
                <p className="mt-2 text-sm text-[#475569]">Try a different search term or filter.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

function FilterSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <label className="relative flex min-h-12 min-w-48 items-center rounded-md bg-white px-4 text-[#0f172a]">
      <span className="sr-only">Filter by {label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="w-full appearance-none bg-white pr-6 text-sm text-[#0f172a] outline-none">
        {options.map((option) => <option className="bg-white text-[#0f172a]" key={option}>{option}</option>)}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 size-4 text-[#475569]" aria-hidden="true" />
    </label>
  )
}
