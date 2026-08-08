import Link from "next/link"
import { Clock, ArrowLeft, ExternalLink, CheckCircle } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { getCFPById, getAllCFPs } from "@/lib/cfp-data"
import { notFound } from "next/navigation"

export const generateStaticParams = async () => {
  const cfps = getAllCFPs()
  return cfps.map((cfp) => ({
    id: cfp.id,
  }))
}

export const generateMetadata = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const cfp = getCFPById(id)
  if (!cfp) return { title: "Call not found" }
  return {
    title: `${cfp.title} | ${cfp.journal}`,
    description: cfp.scope,
  }
}

export default async function CFPDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const cfp = getCFPById(id)

  if (!cfp) {
    notFound()
  }

  const deadlineDate = new Date(cfp.closesDate)
  const isUrgent = cfp.daysLeft <= 14

  return (
    <div className="min-h-screen bg-paper text-foreground">
      <SiteHeader />
      <main>
        {/* Header */}
        <section className="border-b border-line bg-paper-raised">
          <div className="mx-auto max-w-[1180px] px-6 py-12 md:px-8 md:py-16">
            <Link
              href="/calls-for-papers"
              className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-ink opacity-80 hover:opacity-100"
            >
              <ArrowLeft className="size-4" />
              Back to all calls
            </Link>

            <div className="space-y-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-wide text-text-soft">
                    {cfp.journal}
                  </p>
                  <h1 className="font-serif text-4xl md:text-5xl font-semibold text-ink">
                    {cfp.title}
                  </h1>
                </div>

                {/* Deadline badge */}
                <div className={`rounded-xs px-4 py-3 ${isUrgent ? "bg-rust/10 border border-rust" : "bg-gold/10 border border-gold"}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className={`size-4 ${isUrgent ? "text-rust" : "text-gold"}`} />
                    <span className={`font-mono font-semibold ${isUrgent ? "text-rust" : "text-gold"}`}>
                      {cfp.daysLeft} day{cfp.daysLeft !== 1 ? "s" : ""} left
                    </span>
                  </div>
                  <p className="text-xs text-ink opacity-75">{cfp.closes}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-14 md:py-20">
          <div className="mx-auto max-w-[1180px] px-6 md:px-8">
            <div className="grid gap-12 md:grid-cols-3">
              {/* Main content */}
              <div className="md:col-span-2 space-y-8">
                {/* Scope */}
                <div className="space-y-3">
                  <h2 className="font-serif text-2xl font-semibold text-ink">Scope</h2>
                  <p className="text-[15px] leading-relaxed text-text-soft">
                    {cfp.scope}
                  </p>
                </div>

                {/* Full description */}
                <div className="space-y-3">
                  <h2 className="font-serif text-2xl font-semibold text-ink">Details</h2>
                  <div className="prose prose-sm max-w-none text-[14px] leading-relaxed text-text-soft whitespace-pre-line">
                    {cfp.fullDescription}
                  </div>
                </div>

                {/* Guidelines */}
                <div className="space-y-3">
                  <h2 className="font-serif text-2xl font-semibold text-ink">Submission Guidelines</h2>
                  <ul className="space-y-2">
                    {cfp.guidelines.map((guideline, idx) => (
                      <li key={idx} className="flex gap-3 text-[14px]">
                        <CheckCircle className="size-4 text-jade flex-shrink-0 mt-0.5" />
                        <span className="text-text-soft">{guideline}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Submit CTA */}
                <div className="rounded-xs border border-line bg-paper-raised p-8 space-y-4">
                  <h3 className="font-serif text-xl font-semibold text-ink">Ready to submit?</h3>
                  <p className="text-sm text-text-soft">
                    Submit your manuscript through the journal's OJS portal. Questions? Contact the editorial team.
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <a
                      href={cfp.ojsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xs bg-gold px-4 py-2.5 font-semibold text-ink transition-colors hover:bg-gold-soft"
                    >
                      Submit
                      <ExternalLink className="size-4" />
                    </a>
                    <a
                      href={`mailto:${cfp.contactEmail}`}
                      className="flex items-center justify-center gap-2 rounded-xs border border-ink px-4 py-2.5 font-semibold text-ink transition-colors hover:bg-ink/5"
                    >
                      Contact Editorial Team
                    </a>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Progress */}
                <div className="rounded-xs border border-line bg-paper-raised p-6 space-y-4">
                  <h3 className="font-semibold text-ink">Deadline Progress</h3>
                  <div className="space-y-3">
                    <div className="h-2 overflow-hidden rounded-full bg-line">
                      <span
                        className={`block h-full rounded-full transition-all ${
                          isUrgent ? "bg-rust" : "bg-gold"
                        }`}
                        style={{ width: `${cfp.progress}%` }}
                      />
                    </div>
                    <div className="text-sm space-y-1">
                      <p className="flex justify-between text-xs">
                        <span>Time remaining:</span>
                        <span className="font-mono font-semibold">{cfp.daysLeft} days</span>
                      </p>
                      <p className="flex justify-between text-xs">
                        <span>Deadline passes:</span>
                        <span className="font-mono">{cfp.progress}%</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="rounded-xs border border-line bg-paper-raised p-6 space-y-4">
                  <h3 className="font-semibold text-ink">Statistics</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-text-soft uppercase tracking-wide mb-1">Submissions received</p>
                      <p className="text-2xl font-semibold text-gold">{cfp.submissionsCount}</p>
                    </div>
                  </div>
                </div>

                {/* Disciplines */}
                <div className="rounded-xs border border-line bg-paper-raised p-6 space-y-4">
                  <h3 className="font-semibold text-ink">Disciplines</h3>
                  <div className="flex flex-wrap gap-2">
                    {cfp.disciplines.map((discipline) => (
                      <span
                        key={discipline}
                        className="inline-block text-xs px-3 py-1.5 rounded-xs border border-jade/30 text-jade bg-jade/5"
                      >
                        {discipline}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact */}
                <div className="rounded-xs border border-line bg-paper-raised p-6 space-y-4">
                  <h3 className="font-semibold text-ink">Contact</h3>
                  <div className="space-y-2">
                    <p className="text-xs text-text-soft uppercase tracking-wide">Email</p>
                    <a
                      href={`mailto:${cfp.contactEmail}`}
                      className="text-sm font-medium text-gold hover:underline break-all"
                    >
                      {cfp.contactEmail}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
