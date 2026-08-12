import Link from "next/link"
import { Clock, ArrowRight } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { createClient } from "@/lib/supabase/server"
import { listOpenCFPs } from "@/lib/queries/cfp"

export const metadata = {
  title: "Open Calls for Papers | EmpiricalOpen",
  description: "View all open calls for papers and special issues across EmpiricalOpen journals",
}

export default async function CallsForPapersPage() {
  const supabase = await createClient()
  const cfps = await listOpenCFPs(supabase)

  return (
    <div className="min-h-screen bg-paper text-foreground">
      <SiteHeader />
      <main>
        {/* Hero section */}
        <section className="border-b border-line bg-paper-raised">
          <div className="mx-auto max-w-[1180px] px-6 py-16 md:px-8 md:py-20">
            <div className="space-y-4">
              <div className="inline-block rounded-xs border border-gold/30 px-3 py-1">
                <span className="text-xs font-medium text-gold uppercase tracking-wide">Open submissions</span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-semibold text-ink max-w-2xl">
                Calls for Papers
              </h1>
              <p className="text-lg text-text-soft max-w-2xl">
                Discover open submission deadlines and special issues across our network of {cfps.length} journals. Filter by discipline or deadline urgency.
              </p>
            </div>
          </div>
        </section>

        {/* CFP Directory */}
        <section className="py-14 md:py-20">
          <div className="mx-auto max-w-[1180px] px-6 md:px-8">
            <div className="space-y-4">
              {cfps.map((cfp) => (
                <Link href={`/calls-for-papers/${cfp.id}`} key={cfp.id}>
                  <article className="group rounded-xs border border-line bg-paper-raised p-6 transition-all hover:border-gold hover:shadow-md cursor-pointer">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                      {/* Content */}
                      <div className="flex-1 space-y-3">
                        <p className="text-xs uppercase tracking-wide text-text-soft">
                          {cfp.journal}
                        </p>
                        <h2 className="font-serif text-[22px] md:text-[24px] font-semibold text-ink group-hover:text-gold transition-colors">
                          {cfp.title}
                        </h2>
                        <p className="text-[14px] text-text-soft leading-relaxed">
                          {cfp.scope}
                        </p>

                        {/* Discipline badges */}
                        <div className="flex flex-wrap gap-2 pt-2">
                          {cfp.disciplines.map((discipline) => (
                            <span
                              key={discipline}
                              className="inline-block text-xs px-2.5 py-1 rounded-xs border border-jade/30 text-jade bg-jade/5"
                            >
                              {discipline}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Deadline section */}
                      <div className="flex flex-col gap-4 md:w-64 md:flex-shrink-0">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Clock className={`size-4 ${cfp.urgent ? "text-rust" : "text-gold"}`} />
                            <span className={`font-mono text-sm font-medium ${cfp.urgent ? "text-rust" : "text-gold"}`}>
                              {cfp.daysLeft} day{cfp.daysLeft !== 1 ? "s" : ""} left
                            </span>
                          </div>
                          <p className="text-xs text-text-soft font-mono">
                            {cfp.closes}
                          </p>
                        </div>

                        {/* Progress bar */}
                        <div className="space-y-1">
                          <div className="h-1.5 overflow-hidden rounded-full bg-line">
                            <span
                              className={`block h-full rounded-full transition-all ${
                                cfp.urgent ? "bg-rust" : "bg-gold"
                              }`}
                              style={{ width: `${cfp.progress}%` }}
                            />
                          </div>
                          <p className="text-xs text-text-soft text-right">
                            {cfp.progress}% deadline passed
                          </p>
                        </div>

                        {/* CTA */}
                        <div className="flex items-center gap-2 text-sm font-medium text-gold group-hover:gap-3 transition-all">
                          Learn more
                          <ArrowRight className="size-4" />
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {/* Empty state */}
            {cfps.length === 0 && (
              <div className="rounded-xs border border-line bg-paper-raised p-12 text-center">
                <p className="text-text-soft">No open calls at the moment. Check back soon!</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
