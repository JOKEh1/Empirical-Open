import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/lib/database.types"
import type { AnnouncementItem } from "./types"

type DB = SupabaseClient<Database>

export async function listAnnouncements(supabase: DB, limit?: number): Promise<AnnouncementItem[]> {
  let q = supabase.from("announcements").select("*").order("published_at", { ascending: false })
  if (limit) q = q.limit(limit)
  const { data, error } = await q
  if (error) throw error
  return (data ?? []).map((a) => ({
    id: a.id,
    title: a.title,
    body: a.body,
    source: a.source,
    publishedAt: a.published_at,
  }))
}
