import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Spotlight } from "@/components/spotlight"
import { CallsForPapers } from "@/components/calls-for-papers"
import { HostedJournals } from "@/components/hosted-journals"
import { Announcements } from "@/components/announcements"
import { Discussion } from "@/components/discussion"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#0f172a]">
      <SiteHeader />
      <main>
        <Hero />
        <Spotlight />
        <CallsForPapers />
        <HostedJournals />
        <Announcements />
        <Discussion />
      </main>
      <SiteFooter />
    </div>
  )
}
