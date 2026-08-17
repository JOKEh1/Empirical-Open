import { SiteHeader } from "@/components/site-header"
import { JournalsBrowser } from "@/components/journal/journals-browser"
import { Zap } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { listActiveJournals } from "@/lib/queries/journals"

export default async function JournalsPage() {
  const supabase = await createClient()
  const journals = await listActiveJournals(supabase)
  const disciplineCount = new Set(journals.map((j) => j.discipline)).size

  return (
    <>
      <SiteHeader />
      <main className="bg-[#faf9f6]">
        {/* Header section */}
        <div className="border-b border-[#e0dbd0] bg-[#14213d]">
          <div className="mx-auto max-w-[1180px] px-6 py-16 md:px-8">
            <div className="mb-2 inline-flex items-center gap-2 rounded-xs bg-white/5 px-3 py-1">
              <Zap className="size-4 text-[#e9c98a]" />
              <span className="text-xs font-medium text-white">JOURNAL DIRECTORY</span>
            </div>

            <h1 className="mb-3 font-serif text-4xl font-bold text-white">
              Discover Academic Journals
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-[#c9c4b0]">
              Browse {journals.length} open-access journals across {disciplineCount} disciplines, hosted
              and indexed by EmpiricalOpen. Filter by field to find research relevant to
              your work.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-[1180px] px-6 py-12 md:px-8">
          <JournalsBrowser journals={journals} />
        </div>
      </main>
    </>
  )
}
