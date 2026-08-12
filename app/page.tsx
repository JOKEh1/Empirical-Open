import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Spotlight } from "@/components/spotlight"
import { CallsForPapers } from "@/components/calls-for-papers"
import { HostedJournals } from "@/components/hosted-journals"
import { Announcements } from "@/components/announcements"
import { Discussion } from "@/components/discussion"
import { SiteFooter } from "@/components/site-footer"
import { createClient } from "@/lib/supabase/server"
import { getHomepageData } from "@/lib/queries/homepage"

export default async function Page() {
  const supabase = await createClient()
  const data = await getHomepageData(supabase)

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#0f172a]">
      <SiteHeader />
      <main>
        <Hero heroStats={data.heroStats} />
        <Spotlight editorsPick={data.editorsPick} trending={data.trending} />
        <CallsForPapers cfps={data.cfps} />
        <HostedJournals journals={data.journals} moreCount={data.moreJournalsCount} />
        <Announcements announcements={data.announcements} />
        <Discussion comments={data.comments} />
      </main>
      <SiteFooter />
    </div>
  )
}
