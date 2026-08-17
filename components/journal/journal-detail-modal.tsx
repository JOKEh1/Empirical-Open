'use client'

import Link from 'next/link'
import { X, ArrowRight } from 'lucide-react'
import type { JournalDetail } from '@/lib/queries/types'

interface JournalDetailModalProps {
  journal: JournalDetail | null
  onClose: () => void
}

export function JournalDetailModal({ journal, onClose }: JournalDetailModalProps) {
  if (!journal) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/55 p-6 backdrop-blur-[2px]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="journal-modal-title"
    >
      <div className="relative max-h-[86vh] w-full max-w-[560px] overflow-y-auto rounded-xs bg-paper-raised p-8 shadow-2xl md:p-9">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex size-8 items-center justify-center rounded-full border border-line text-text-soft transition-colors hover:border-ink hover:text-ink"
          aria-label="Close dialog"
        >
          <X className="size-4" />
        </button>

        <div className="mb-1.5 flex items-center gap-3.5">
          <span
            className="flex size-11 shrink-0 items-center justify-center rounded-lg font-serif text-base font-semibold"
            style={{
              background:
                journal.discipline === 'Public Health'
                  ? 'var(--jade-soft)'
                  : journal.discipline === 'Agricultural Sciences'
                    ? 'var(--rust-soft)'
                    : journal.discipline === 'Engineering'
                      ? 'var(--gold-soft)'
                      : journal.discipline === 'Education'
                        ? 'var(--gold-soft)'
                        : journal.discipline === 'Social Sciences'
                          ? 'var(--jade-soft)'
                          : journal.discipline === 'Clinical Sciences'
                            ? 'var(--rust-soft)'
                            : 'var(--jade-soft)',
              color:
                journal.discipline === 'Public Health'
                  ? 'var(--jade)'
                  : journal.discipline === 'Agricultural Sciences'
                    ? 'var(--rust)'
                    : journal.discipline === 'Engineering'
                      ? 'var(--gold)'
                      : journal.discipline === 'Education'
                        ? 'var(--gold)'
                        : journal.discipline === 'Social Sciences'
                          ? 'var(--jade)'
                          : journal.discipline === 'Clinical Sciences'
                            ? 'var(--rust)'
                            : 'var(--jade)',
            }}
          >
            {journal.initials}
          </span>
          <div>
            <h3 id="journal-modal-title" className="font-serif text-xl font-semibold leading-snug text-ink">
              {journal.name}
            </h3>
            <p className="text-[12.5px] text-text-soft">{journal.institution}</p>
          </div>
        </div>

        <span className="mb-3 block font-mono text-[11px] uppercase tracking-[0.08em] text-jade">
          {journal.discipline}
        </span>

        <p className="mb-6 text-[14.5px] leading-relaxed text-ink">
          {journal.description}
        </p>

        <div className="mb-5 space-y-2 border-t border-line pt-5">
          <div className="flex justify-between text-sm">
            <span className="text-text-soft">Founded</span>
            <span className="font-semibold text-ink">{journal.foundedYear}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-soft">Articles</span>
            <span className="font-semibold text-ink">{journal.articlesCount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-soft">Published</span>
            <span className="font-semibold text-ink">{journal.frequency}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <Link
            href={`/journals/${journal.id}`}
            className="inline-flex items-center gap-1.5 rounded-xs bg-gold px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-gold-soft"
          >
            View journal page
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
