import Link from "next/link"
import { Clock } from "lucide-react"
import { SectionHeader } from "@/components/section-header"
import type { CFPDetail } from "@/lib/queries/types"

export function CallsForPapers({ cfps }: { cfps: CFPDetail[] }) {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-[1180px] px-6 py-14 md:px-8">
        <SectionHeader
          tag="Open submissions"
          title="Calls for Papers"
          viewAll="View all open calls"
          viewAllHref="/calls-for-papers"
        />

        <div className="grid gap-5 md:grid-cols-3">
          {cfps.map((cfp) => (
            <Link
              href={`/calls-for-papers/${cfp.id}`}
              key={cfp.id}
              className="flex flex-col gap-3.5 rounded-xs border border-line bg-paper-raised p-6 transition-colors hover:border-gold"
            >
              <p className="text-xs uppercase tracking-wide text-text-soft">
                {cfp.journal}
              </p>
              <h3 className="font-serif text-[19px] font-semibold leading-snug text-ink">
                {cfp.title}
              </h3>
              <p className="flex-1 text-[13.5px] leading-relaxed text-text-soft">
                {cfp.scope}
              </p>

              <div className="mt-auto">
                <div className="mb-1.5 flex items-baseline justify-between">
                  <span
                    className={`inline-flex items-center gap-1 font-mono text-[12.5px] font-medium ${
                      cfp.urgent ? "text-rust" : "text-jade"
                    }`}
                  >
                    <Clock className="size-3.5" />
                    {cfp.daysLeft} day{cfp.daysLeft !== 1 ? "s" : ""} left
                  </span>
                  <span className="font-mono text-[11.5px] text-text-soft">
                    {cfp.closes}
                  </span>
                </div>
                <div className="h-1 overflow-hidden rounded-full bg-line">
                  <span
                    className={`block h-full rounded-full ${
                      cfp.urgent ? "bg-rust" : "bg-gold"
                    }`}
                    style={{ width: `${cfp.progress}%` }}
                  />
                </div>
              </div>
            </Link>
          ))}
          {cfps.length === 0 && (
            <p className="text-sm text-text-soft">No open calls for papers right now.</p>
          )}
        </div>
      </div>
    </section>
  )
}
