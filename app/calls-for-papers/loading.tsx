import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { LoadingSpinner } from "@/components/loading-spinner"

export default function Loading() {
  return (
    <div className="min-h-screen bg-paper text-foreground">
      <SiteHeader />
      <main>
        <LoadingSpinner label="Loading calls for papers…" />
      </main>
      <SiteFooter />
    </div>
  )
}
