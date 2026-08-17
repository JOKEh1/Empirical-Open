import { SiteHeader } from "@/components/site-header"
import { LoadingSpinner } from "@/components/loading-spinner"

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#0f172a]">
      <SiteHeader />
      <main>
        <LoadingSpinner label="Loading articles…" />
      </main>
    </div>
  )
}
