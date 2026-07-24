"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { DisciplineFilter } from "@/components/journal/discipline-filter"
import { JournalCard } from "@/components/journal/journal-card"
import { filterJournalsByDiscipline } from "@/lib/journals-data"
import { Zap } from "lucide-react"

export default function JournalsPage() {
  const [selected, setSelected] = useState("All disciplines")
  const filtered = filterJournalsByDiscipline(selected)

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
              <JournalCard key={journal.id} journal={journal} />
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
      </main>
    </>
  )
}
