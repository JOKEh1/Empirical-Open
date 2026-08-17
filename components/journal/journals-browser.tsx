"use client"

import { useEffect, useState } from "react"
import { DisciplineFilter } from "@/components/journal/discipline-filter"
import { JournalDetailModal } from "@/components/journal/journal-detail-modal"
import type { JournalDetail } from "@/lib/queries/types"

const disciplineColor: Record<string, string> = {
  "Public Health": "#1b6b5a",
  "Agricultural Sciences": "#b4483a",
  Engineering: "#c98a2c",
  Education: "#c98a2c",
  "Social Sciences": "#1b6b5a",
  "Clinical Sciences": "#b4483a",
  "Environmental Studies": "#1b6b5a",
}

export function JournalsBrowser({ journals }: { journals: JournalDetail[] }) {
  const [selectedDiscipline, setSelectedDiscipline] = useState("All disciplines")
  const [selectedJournal, setSelectedJournal] = useState<JournalDetail | null>(null)

  const filtered =
    selectedDiscipline === "All disciplines"
      ? journals
      : journals.filter((j) => j.discipline === selectedDiscipline)

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
      {/* Filter section */}
      <div className="mb-10">
        <h2 className="mb-4 font-serif text-lg font-semibold text-[#0f172a]">
          Filter by discipline
        </h2>
        <DisciplineFilter selected={selectedDiscipline} onSelect={setSelectedDiscipline} />
      </div>

      {/* Journals grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((journal) => (
          <button
            key={journal.id}
            onClick={() => setSelectedJournal(journal)}
            className="group rounded-xs border border-[#e0dbd0] bg-white p-6 transition-all hover:border-[#c98a2c]/50 hover:shadow-lg text-left"
          >
            <div className="mb-3 flex items-start justify-between">
              <div
                className="flex size-12 items-center justify-center rounded-xs font-serif text-lg font-bold text-white"
                style={{ background: disciplineColor[journal.discipline] ?? "#1b6b5a" }}
              >
                {journal.initials}
              </div>
              <span className="text-xs font-medium text-[#5b5a52]">
                {journal.foundedYear ?? ""}
              </span>
            </div>

            <h3 className="mb-2 text-[#14213d] font-serif text-lg font-semibold leading-snug">
              {journal.name}
            </h3>

            <p className="mb-4 text-sm text-[#475569]">
              {journal.articlesCount.toLocaleString()} articles · {journal.institution}
            </p>

            <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-[#0f172a]">
              {journal.description}
            </p>

            <div className="flex items-center justify-between pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1b6b5a]">
                Click to view details
              </span>
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-xs border border-[#e0dbd0] bg-[#faf9f6] p-8 text-center">
          <p className="text-[#475569]">
            No journals found in this discipline. Try selecting a different filter.
          </p>
        </div>
      )}

      <JournalDetailModal journal={selectedJournal} onClose={() => setSelectedJournal(null)} />
    </>
  )
}
