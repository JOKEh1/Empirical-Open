"use client"

import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { searchArticles } from "@/lib/journals-data"
import { disciplines } from "@/lib/hub-data"
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Eye,
  MessageCircle,
  Search as SearchIcon,
} from "lucide-react"

function SearchContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const discipline = searchParams.get("discipline") || "All disciplines"
  const [selectedDiscipline, setSelectedDiscipline] = useState(discipline)

  const results = searchArticles(query, selectedDiscipline === "All disciplines" ? undefined : selectedDiscipline)

  return (
    <>
      <SiteHeader />
      <main className="bg-background">
        {/* Back and header */}
        <div className="border-b border-white/10 bg-ink">
          <div className="mx-auto max-w-[1000px] px-6 py-4 md:px-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-soft transition-colors"
            >
              <ArrowLeft className="size-4" />
              Back to home
            </Link>
          </div>
        </div>

        {/* Search header */}
        <div className="border-b border-white/10 bg-ink">
          <div className="mx-auto max-w-[1000px] px-6 py-12 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <SearchIcon className="size-6 text-gold" />
              <h1 className="font-serif text-3xl font-bold text-paper-raised">Search Results</h1>
            </div>
            
            {query && (
              <p className="text-base text-paper-raised/80">
                Found <span className="font-semibold text-gold">{results.length}</span> result{results.length !== 1 ? "s" : ""} for{" "}
                <span className="font-semibold text-paper-raised">"{query}"</span>
                {selectedDiscipline !== "All disciplines" && (
                  <>
                    {" "}in <span className="font-semibold text-paper-raised">{selectedDiscipline}</span></>
                )}
              </p>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="border-b border-white/10 bg-background">
          <div className="mx-auto max-w-[1000px] px-6 py-6 md:px-8">
            <h3 className="mb-3 text-sm font-medium text-paper-raised/80">Filter by discipline:</h3>
            <div className="flex flex-wrap gap-2">
              {disciplines.map((d) => {
                const isActive = d === selectedDiscipline
                return (
                  <button
                    key={d}
                    onClick={() => setSelectedDiscipline(d)}
                    className={`rounded-full border px-3.5 py-1.5 text-[12.5px] transition-colors ${
                      isActive
                        ? "border-gold bg-gold font-medium text-ink"
                        : "border-paper-raised/30 text-paper-raised/85 hover:border-paper-raised/60"
                    }`}
                  >
                    {d}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mx-auto max-w-[1000px] px-6 py-12 md:px-8">
          {results.length === 0 ? (
            <div className="rounded-xs border border-white/10 bg-ink p-8 text-center">
              <SearchIcon className="mx-auto size-12 mb-4 text-text-soft opacity-50" />
              <h2 className="text-xl font-semibold text-paper-raised mb-2">No results found</h2>
              <p className="text-paper-raised/70">
                {query ? (
                  <>
                    Try adjusting your search terms or browse by discipline.{" "}
                    <Link href="/journals" className="text-gold hover:text-gold-soft">
                      View all journals
                    </Link>
                    .
                  </>
                ) : (
                  <>
                    Enter a search term above to find articles.{" "}
                    <Link href="/journals" className="text-gold hover:text-gold-soft">
                      Browse journals
                    </Link>
                    .
                  </>
                )}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {results.map((article) => (
                <Link
                  key={article.id}
                  href={`/article/${article.id}`}
                  className="group block rounded-xs border border-white/10 bg-ink p-6 transition-all hover:border-gold/50 hover:shadow-lg"
                >
                  <div className="mb-2 flex items-start justify-between gap-4">
                    <div>
                      <p className="mb-2 inline-flex items-center gap-2 text-xs font-medium text-gold">
                        <BookOpen className="size-3.5" />
                        {article.discipline}
                      </p>
                      <h2 className="mb-2 font-serif text-lg font-semibold leading-snug text-paper-raised group-hover:text-gold transition-colors">
                        {article.title}
                      </h2>
                    </div>
                  </div>

                  <p className="mb-3 text-sm text-paper-raised/80">{article.authors}</p>

                  <p className="mb-4 line-clamp-2 text-sm text-paper-raised/70">{article.abstract}</p>

                  <div className="flex flex-wrap items-center gap-4 border-t border-white/10 pt-4 text-xs text-paper-raised/60">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="size-3.5" />
                      {new Date(article.publicationDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="size-3.5" />
                      {article.journal}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Eye className="size-3.5" />
                      {article.views.toLocaleString()} views
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MessageCircle className="size-3.5" />
                      {article.citations} citations
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="h-screen bg-background" />}>
      <SearchContent />
    </Suspense>
  )
}
