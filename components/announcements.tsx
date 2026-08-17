import { SectionHeader } from "@/components/section-header"
import type { AnnouncementItem } from "@/lib/queries/types"
import { formatDateShort } from "@/lib/queries/format"

export function Announcements({ announcements }: { announcements: AnnouncementItem[] }) {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-[1180px] px-6 py-14 md:px-8">
        <SectionHeader
          tag="Across the network"
          title="Announcements"
          viewAll="View all"
          viewAllHref="/announcements"
        />

        <div className="flex flex-col">
          {announcements.map((a) => (
            <article
              key={a.id}
              className="grid gap-2 border-b border-line py-5 first:pt-0 last:border-none md:grid-cols-[120px_1fr_auto] md:items-baseline md:gap-5"
            >
              <time className="font-mono text-xs text-text-soft">{formatDateShort(a.publishedAt)}</time>
              <div>
                <h3 className="text-[15px] font-semibold text-ink">{a.title}</h3>
                <p className="mt-0.5 text-[13px] text-text-soft">{a.body}</p>
              </div>
              <span className="whitespace-nowrap text-xs font-medium text-jade">
                {a.source}
              </span>
            </article>
          ))}
          {announcements.length === 0 && (
            <p className="py-5 text-sm text-text-soft">No announcement yet.</p>
          )}
        </div>
      </div>
    </section>
  )
}
