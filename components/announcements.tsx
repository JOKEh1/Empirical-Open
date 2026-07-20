import { SectionHeader } from "@/components/section-header"
import { announcements } from "@/lib/hub-data"

export function Announcements() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-[1180px] px-6 py-14 md:px-8">
        <SectionHeader
          tag="Across the network"
          title="Announcements"
          viewAll="View all"
        />

        <div className="flex flex-col">
          {announcements.map((a) => (
            <article
              key={a.title}
              className="grid gap-2 border-b border-line py-5 first:pt-0 last:border-none md:grid-cols-[120px_1fr_auto] md:items-baseline md:gap-5"
            >
              <time className="font-mono text-xs text-text-soft">{a.date}</time>
              <div>
                <h3 className="text-[15px] font-semibold text-ink">{a.title}</h3>
                <p className="mt-0.5 text-[13px] text-text-soft">{a.body}</p>
              </div>
              <span className="whitespace-nowrap text-xs font-medium text-jade">
                {a.source}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
