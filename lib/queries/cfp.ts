import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/lib/database.types"
import type { CFPDetail } from "./types"
import { daysLeftFrom, formatCloses, progressFrom, isUrgent } from "./format"

type DB = SupabaseClient<Database>
type CfpRow = Database["public"]["Tables"]["calls_for_papers"]["Row"]
type CfpWithJournal = CfpRow & { journals: { name: string } | null }

function mapCfpRow(row: CfpWithJournal): CFPDetail {
  return {
    id: row.id,
    journal: row.journals?.name ?? "",
    journalId: row.journal_id,
    title: row.title,
    scope: row.scope,
    fullDescription: row.full_description,
    daysLeft: daysLeftFrom(row.closes_date),
    closes: formatCloses(row.closes_date),
    closesDate: row.closes_date,
    progress: progressFrom(row.created_at, row.closes_date),
    urgent: isUrgent(row.closes_date),
    disciplines: row.disciplines ?? [],
    guidelines: (row.guidelines ?? []) as string[],
    ojsLink: row.ojs_link,
    contactEmail: row.contact_email,
    submissionsCount: row.submissions_count,
  }
}

export async function listOpenCFPs(supabase: DB): Promise<CFPDetail[]> {
  const { data, error } = await supabase
    .from("calls_for_papers")
    .select("*, journals(name)")
    .eq("status", "open")
    .order("closes_date", { ascending: true })
  if (error) throw error
  return (data ?? []).map((row) => mapCfpRow(row as CfpWithJournal))
}

export async function getCFPById(supabase: DB, id: string): Promise<CFPDetail | null> {
  const { data, error } = await supabase
    .from("calls_for_papers")
    .select("*, journals(name)")
    .eq("id", id)
    .maybeSingle()
  if (error) throw error
  return data ? mapCfpRow(data as CfpWithJournal) : null
}
