import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/lib/database.types"

type DB = SupabaseClient<Database>

export type AdminStats = {
  activeJournals: number
  archivedJournals: number
  pendingIntegrationRequests: number
  openCalls: number
  closedCalls: number
  totalUsers: number
  adminUsers: number
  /** Journals with an OAI-PMH endpoint configured — the only ones a sync
   * health percentage is meaningful for. */
  syncableJournals: number
  syncedJournals: number
}

export async function getAdminStats(supabase: DB): Promise<AdminStats> {
  const [
    activeJournalsRes,
    archivedJournalsRes,
    pendingRequestsRes,
    openCallsRes,
    closedCallsRes,
    totalUsersRes,
    adminUsersRes,
    syncableJournalsRes,
    syncedJournalsRes,
  ] = await Promise.all([
    supabase.from("journals").select("*", { count: "exact", head: true }).eq("status", "active"),
    supabase.from("journals").select("*", { count: "exact", head: true }).eq("status", "archived"),
    supabase.from("integration_requests").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("calls_for_papers").select("*", { count: "exact", head: true }).eq("status", "open"),
    supabase.from("calls_for_papers").select("*", { count: "exact", head: true }).eq("status", "closed"),
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "admin"),
    supabase.from("journals").select("*", { count: "exact", head: true }).neq("oai_pmh_endpoint", ""),
    supabase
      .from("journals")
      .select("*", { count: "exact", head: true })
      .neq("oai_pmh_endpoint", "")
      .eq("sync_status", "successful"),
  ])

  return {
    activeJournals: activeJournalsRes.count ?? 0,
    archivedJournals: archivedJournalsRes.count ?? 0,
    pendingIntegrationRequests: pendingRequestsRes.count ?? 0,
    openCalls: openCallsRes.count ?? 0,
    closedCalls: closedCallsRes.count ?? 0,
    totalUsers: totalUsersRes.count ?? 0,
    adminUsers: adminUsersRes.count ?? 0,
    syncableJournals: syncableJournalsRes.count ?? 0,
    syncedJournals: syncedJournalsRes.count ?? 0,
  }
}

export type ActivityItem = {
  id: string
  kind: "journal" | "cfp" | "integration"
  label: string
  timestamp: string
  tone: "jade" | "gold" | "rust"
}

/** A merged, timestamp-sorted feed of recent admin-relevant events —
 * replaces the three hardcoded "Recent Activity" rows. */
export async function getRecentActivity(supabase: DB, limit = 8): Promise<ActivityItem[]> {
  const [journalsRes, cfpsRes, requestsRes] = await Promise.all([
    supabase.from("journals").select("id, name, created_at").order("created_at", { ascending: false }).limit(limit),
    supabase
      .from("calls_for_papers")
      .select("id, title, created_at, journals(name)")
      .order("created_at", { ascending: false })
      .limit(limit),
    supabase
      .from("integration_requests")
      .select("id, journal_name, status, reviewed_at, created_at")
      .order("created_at", { ascending: false })
      .limit(limit),
  ])

  const items: ActivityItem[] = []

  for (const j of journalsRes.data ?? []) {
    items.push({ id: `journal-${j.id}`, kind: "journal", label: `Journal registered: "${j.name}"`, timestamp: j.created_at, tone: "jade" })
  }
  for (const c of cfpsRes.data ?? []) {
    const journalName = (c as unknown as { journals: { name: string } | null }).journals?.name
    items.push({
      id: `cfp-${c.id}`,
      kind: "cfp",
      label: `New call for papers: "${c.title}"${journalName ? ` (${journalName})` : ""}`,
      timestamp: c.created_at,
      tone: "gold",
    })
  }
  for (const r of requestsRes.data ?? []) {
    if (r.status === "pending") {
      items.push({ id: `req-${r.id}`, kind: "integration", label: `Integration request received: "${r.journal_name}"`, timestamp: r.created_at, tone: "gold" })
    } else if (r.reviewed_at) {
      items.push({
        id: `req-${r.id}`,
        kind: "integration",
        label: `Integration request ${r.status}: "${r.journal_name}"`,
        timestamp: r.reviewed_at,
        tone: r.status === "approved" ? "jade" : "rust",
      })
    }
  }

  return items.sort((a, b) => b.timestamp.localeCompare(a.timestamp)).slice(0, limit)
}
