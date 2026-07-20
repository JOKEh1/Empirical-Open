"use client"

import { useEffect, useState } from "react"
import { X, ArrowRight, ExternalLink } from "lucide-react"
import { SectionHeader } from "@/components/section-header"
import { journals, type Journal } from "@/lib/hub-data"

export function HostedJournals() {
  const [selected, setSelected] = useState<Journal | null>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSelected(null)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [selected])

  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-[1180px] px-6 py-14 md:px-8">
        <SectionHeader
          tag="The network"
          title="Hosted journals"
          viewAll="Browse full directory"
        />

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {journals.map((j) => (
            <button
              key={j.key}
              onClick={() => setSelected(j)}
              className="group flex flex-col gap-2 rounded-xs border border-line bg-paper-raised p-5 text-left transition-all hover:-translate-y-0.5 hover:border-gold"
            >
              <span className="flex size-9 items-center justify-center rounded-md bg-jade-soft font-serif text-sm font-semibold text-jade">
                {j.init}
              </span>
              <h3 className="text-[13.5px] font-semibold leading-snug text-ink">{j.name}</h3>
              <p className="text-[11.5px] text-text-soft">{j.short}</p>
            </button>
          ))}

          <div className="flex flex-col gap-2 rounded-xs border border-line bg-paper-raised/60 p-5">
            <span className="flex size-9 items-center justify-center rounded-md bg-jade-soft font-serif text-sm font-semibold text-jade">
              +43
            </span>
            <h3 className="text-[13.5px] font-semibold leading-snug text-text-soft">
              More journals
            </h3>
            <p className="text-[11.5px] text-text-soft">Browse the full directory</p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/55 p-6 backdrop-blur-[2px]"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelected(null)
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="journal-modal-title"
        >
          <div className="relative max-h-[86vh] w-full max-w-[560px] overflow-y-auto rounded-xs bg-paper-raised p-8 shadow-2xl md:p-9">
            <button
              onClick={() => setSelected(null)}
              className="absolute right-5 top-5 flex size-8 items-center justify-center rounded-full border border-line text-text-soft transition-colors hover:border-ink hover:text-ink"
              aria-label="Close dialog"
            >
              <X className="size-4" />
            </button>

            <div className="mb-1.5 flex items-center gap-3.5">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-jade-soft font-serif text-base font-semibold text-jade">
                {selected.init}
              </span>
              <h3
                id="journal-modal-title"
                className="font-serif text-xl font-semibold leading-snug text-ink"
              >
                {selected.name}
              </h3>
            </div>
            <p className="mb-5 mt-1 text-[12.5px] text-text-soft">
              {selected.fullStat}
            </p>

            <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.08em] text-jade">
              About this journal
            </span>
            <p className="mb-6 text-[14.5px] leading-relaxed text-ink">
              {selected.desc}
            </p>

            <div className="flex flex-wrap gap-2.5">
              <a
                href="#"
                className="inline-flex items-center gap-1.5 rounded-xs bg-gold px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-gold-soft"
              >
                Submit an article
                <ArrowRight className="size-4" />
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-1.5 rounded-xs border border-line px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink"
              >
                Visit journal site
                <ExternalLink className="size-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
