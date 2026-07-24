"use client"

import { useState, useEffect } from "react"
import { SiteHeader } from "@/components/site-header"
import { DisciplineFilter } from "@/components/journal/discipline-filter"
import { JournalDetailModal } from "@/components/journal/journal-detail-modal"
import { filterJournalsByDiscipline, journalsDetail } from "@/lib/journals-data"
import { Zap } from "lucide-react"
import type { JournalDetail } from "@/lib/journals-data"

export default function JournalsPage() {
  const [selected, setSelected] = useState("All disciplines")
  const [selectedJournal, setSelectedJournal] = useState<JournalDetail | null>(null)
  const filtered = filterJournalsByDiscipline(selected)

  // Handle escape key and body overflow
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSelectedJournal(null)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = selectedJournal ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [selectedJournal])

  return (
    <>
      <SiteHeader />
      <main className="bg-background">
        {/* Header section */}
        <div className="border-b border-white/10 bg-ink">
          <div className="mx-auto max-w-[1180px] px-6 py-16 md:px-8">
            <div className="mb-2 inline-flex items-center gap-2 rounded-xs bg-white/5 px-3 py-1">
              <Zap className="size-4 text-gold" />
              <span className="text-xs font-medium">JOURNAL DIRECTORY</span>
            </div>

            <h1 className="mb-3 font-serif text-4xl font-bold text-paper-raised">
              Discover Academic Journals
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-paper-raised/80">
              Browse {filtered.length} open-access journals across eight disciplines, hosted
              and indexed by EmpiricalOpen. Filter by field to find research relevant to
              your work.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-[1180px] px-6 py-12 md:px-8">
          {/* Filter section */}
          <div className="mb-10">
            <h2 className="mb-4 font-serif text-lg font-semibold text-paper-raised">
              Filter by discipline
            </h2>
            <DisciplineFilter selected={selected} onSelect={setSelected} />
          </div>

          {/* Journals grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((journal) => (
              <button
                key={journal.id}
                onClick={() => setSelectedJournal(journal)}
                className="group rounded-xs border border-white/10 bg-paper p-6 transition-all hover:border-gold/50 hover:shadow-lg text-left"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div
                    className="flex size-12 items-center justify-center rounded-xs font-serif text-lg font-bold text-paper"
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
                  <span className="text-xs font-medium text-text-soft">
                    {journal.foundedYear}
                  </span>
                </div>

                <h3 className="mb-2 text-ink font-serif text-lg font-semibold leading-snug">
                  {journal.name}
                </h3>

                <p className="mb-4 text-sm text-ink-soft">
                  {journal.articlesCount.toLocaleString()} articles · {journal.institution}
                </p>

                <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-ink">
                  {journal.description}
                </p>

                <div className="flex items-center justify-between pt-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-jade">
                    Click to view details
                  </span>
                </div>
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="rounded-xs border border-white/10 bg-white/5 p-8 text-center">
              <p className="text-paper-raised/70">
                No journals found in this discipline. Try selecting a different filter.
              </p>
            </div>
          )}
        </div>

        {/* Journal Detail Modal */}
        <JournalDetailModal journal={selectedJournal} onClose={() => setSelectedJournal(null)} />
      </main>
    </>
  )
}
