import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { announcements } from "@/lib/hub-data"
import { Calendar, Building2 } from "lucide-react"

export const metadata = {
  title: "Network Announcements | EmpiricalOpen",
  description: "Latest announcements and updates from across the EmpiricalOpen journal network",
}

export default function AnnouncementsPage() {
  // Sort announcements by date (newest first)
  const sortedAnnouncements = [...announcements].sort((a, b) => {
    const dateA = new Date(a.date.split(" ").reverse().join("-")).getTime()
    const dateB = new Date(b.date.split(" ").reverse().join("-")).getTime()
    return dateB - dateA
  })

  // Format date for display
  const formatDate = (dateStr: string) => {
    const parts = dateStr.split(" ")
    const day = parts[0]
    const month = parts[1]
    const year = parts[2]
    return `${month} ${day}, ${year}`
  }

  return (
    <div className="min-h-screen bg-paper text-foreground">
      <SiteHeader />
      <main>
        {/* Hero section */}
        <section className="border-b border-line bg-paper-raised">
          <div className="mx-auto max-w-[1180px] px-6 py-16 md:px-8 md:py-20">
            <div className="space-y-4">
              <div className="inline-block rounded-xs border border-gold/30 px-3 py-1">
                <span className="text-xs font-medium text-gold uppercase tracking-wide">Across the network</span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-semibold text-ink max-w-2xl">
                Network Announcements
              </h1>
              <p className="text-lg text-text-soft max-w-2xl">
                Stay updated with the latest news, journal launches, indexing updates, and community announcements from EmpiricalOpen journals and partners.
              </p>
            </div>
          </div>
        </section>

        {/* Announcements feed */}
        <section className="py-14 md:py-20">
          <div className="mx-auto max-w-[900px] px-6 md:px-8">
            {/* Timeline */}
            <div className="space-y-0">
              {sortedAnnouncements.map((announcement, idx) => {
                const isLast = idx === sortedAnnouncements.length - 1

                return (
                  <article
                    key={`${announcement.date}-${announcement.title}`}
                    className={`grid gap-4 md:grid-cols-[140px_1fr_auto] md:items-start py-8 px-0 md:gap-8 ${
                      !isLast ? "border-b border-line" : ""
                    }`}
                  >
                    {/* Date */}
                    <div className="flex items-center gap-2 md:flex-col md:items-start md:gap-2">
                      <Calendar className="size-4 text-gold flex-shrink-0 md:hidden" />
                      <time className="font-mono text-sm text-text-soft md:text-xs">
                        {formatDate(announcement.date)}
                      </time>
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <h2 className="font-serif text-xl md:text-[18px] font-semibold text-ink leading-snug">
                        {announcement.title}
                      </h2>
                      <p className="text-[14px] text-text-soft leading-relaxed">
                        {announcement.body}
                      </p>
                    </div>

                    {/* Source badge */}
                    <div className="flex items-center gap-2">
                      <Building2 className="size-3.5 text-jade flex-shrink-0 hidden md:block" />
                      <div className="inline-flex items-center gap-1.5 rounded-xs border border-jade/30 bg-jade/5 px-3 py-1.5 text-xs font-medium text-jade whitespace-nowrap md:flex-col md:items-start md:gap-0 md:border-none md:bg-transparent md:px-0 md:py-0">
                        <span className="hidden md:block text-[11px] uppercase tracking-wide opacity-75">From</span>
                        <span className="md:text-[12px]">{announcement.source}</span>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>

            {/* Empty state */}
            {sortedAnnouncements.length === 0 && (
              <div className="rounded-xs border border-line bg-paper-raised p-12 text-center">
                <p className="text-text-soft">No announcements at the moment.</p>
              </div>
            )}

            {/* Info banner */}
            <div className="mt-16 rounded-xs border border-gold/30 bg-gold/5 p-6 space-y-3">
              <h3 className="font-semibold text-ink">Subscribe to announcements</h3>
              <p className="text-sm text-text-soft">
                Want to receive email digests of journal announcements? Sign up for our network newsletter and stay informed about new issues, calls for papers, and community updates.
              </p>
              <button className="inline-block rounded-xs bg-gold px-4 py-2 font-semibold text-ink transition-colors hover:bg-gold-soft">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
