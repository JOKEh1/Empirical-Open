import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { LoadingSpinner } from "@/components/loading-spinner"

/** Keeps the sidebar shell in place while an admin page's client-side auth
 * check / data fetch is in flight, instead of a blank white flash. */
export function AdminLoading() {
  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <LoadingSpinner label="Loading admin panel…" />
      </main>
    </div>
  )
}
