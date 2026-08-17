import { SiteHeader } from "@/components/site-header"
import { LoadingSpinner } from "@/components/loading-spinner"

export default function Loading() {
  return (
    <>
      <SiteHeader />
      <main className="bg-background">
        <LoadingSpinner label="Loading article…" />
      </main>
    </>
  )
}
