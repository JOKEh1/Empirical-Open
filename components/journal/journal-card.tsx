import Link from "next/link"
import { ArrowRight, BookOpen } from "lucide-react"
import type { JournalDetail } from "@/lib/journals-data"

interface JournalCardProps {
  journal: JournalDetail
}

export function JournalCard({ journal }: JournalCardProps) {
  return (
    <Link href={`/journals/${journal.id}`}>
      <div className="group rounded-xs border border-white/10 bg-paper p-6 transition-all hover:border-gold/50 hover:shadow-lg">
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
            <BookOpen className="size-3.5" />
            Explore journal
          </span>
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}
