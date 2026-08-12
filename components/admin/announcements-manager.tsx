"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Megaphone, Plus, Trash2, X } from "lucide-react"
import type { Tables } from "@/lib/database.types"

type Announcement = Tables<"announcements">

const emptyForm = { title: "", body: "", source: "", published_at: new Date().toISOString().slice(0, 10) }

export function AnnouncementsManager() {
  const supabase = createClient()
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [submitting, setSubmitting] = useState(false)

  async function load() {
    setLoading(true)
    const { data, error: loadErr } = await supabase
      .from("announcements")
      .select("*")
      .order("published_at", { ascending: false })
    if (loadErr) setError(loadErr.message)
    else setAnnouncements(data ?? [])
    setLoading(false)
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title.trim() || !form.body.trim()) return
    setSubmitting(true)
    setError(null)
    const { error: insertErr } = await supabase.from("announcements").insert({
      title: form.title.trim(),
      body: form.body.trim(),
      source: form.source.trim(),
      published_at: form.published_at,
    })
    setSubmitting(false)
    if (insertErr) {
      setError(insertErr.message)
      return
    }
    setForm(emptyForm)
    setShowForm(false)
    await load()
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this announcement?")) return
    const { error: delErr } = await supabase.from("announcements").delete().eq("id", id)
    if (delErr) setError(delErr.message)
    else setAnnouncements((prev) => prev.filter((a) => a.id !== id))
  }

  return (
    <div className="rounded-xs border border-white/10 bg-paper-raised/50 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-serif text-xl font-semibold text-paper flex items-center gap-2">
          <Megaphone className="size-5 text-gold" />
          Announcements
        </h2>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-2 rounded-xs bg-gold px-3 py-1.5 text-sm font-semibold text-ink transition-colors hover:bg-gold-soft"
        >
          {showForm ? <X className="size-4" /> : <Plus className="size-4" />}
          {showForm ? "Cancel" : "New announcement"}
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-xs border border-rust/40 bg-rust/10 px-4 py-3 text-sm text-rust">{error}</div>
      )}

      {showForm && (
        <form onSubmit={handleCreate} className="mb-6 space-y-4 rounded-xs border border-white/10 bg-ink p-5">
          <div>
            <label className="block text-xs font-medium text-text-soft mb-1.5">Title</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="w-full rounded-xs border border-white/10 bg-paper-raised/50 px-3 py-2 text-sm text-paper focus:border-gold focus:outline-none"
              placeholder="New issue published: Vol. 12, Issue 3"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-soft mb-1.5">Body</label>
            <textarea
              required
              rows={3}
              value={form.body}
              onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
              className="w-full rounded-xs border border-white/10 bg-paper-raised/50 px-3 py-2 text-sm text-paper focus:border-gold focus:outline-none resize-none"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-text-soft mb-1.5">Source (journal/team)</label>
              <input
                type="text"
                value={form.source}
                onChange={(e) => setForm((f) => ({ ...f, source: e.target.value }))}
                className="w-full rounded-xs border border-white/10 bg-paper-raised/50 px-3 py-2 text-sm text-paper focus:border-gold focus:outline-none"
                placeholder="EmpiricalOpen Editorial Team"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-soft mb-1.5">Published date</label>
              <input
                type="date"
                value={form.published_at}
                onChange={(e) => setForm((f) => ({ ...f, published_at: e.target.value }))}
                className="w-full rounded-xs border border-white/10 bg-paper-raised/50 px-3 py-2 text-sm text-paper focus:border-gold focus:outline-none"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-xs bg-gold px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-gold-soft disabled:opacity-60"
          >
            {submitting ? "Publishing…" : "Publish announcement"}
          </button>
        </form>
      )}

      {loading ? (
        <p className="text-sm text-text-soft">Loading…</p>
      ) : announcements.length === 0 ? (
        <p className="text-sm text-text-soft">No announcements yet.</p>
      ) : (
        <div className="divide-y divide-white/10">
          {announcements.map((a) => (
            <div key={a.id} className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0">
              <div className="min-w-0">
                <p className="text-sm font-medium text-paper truncate">{a.title}</p>
                <p className="mt-0.5 text-xs text-text-soft">
                  {a.published_at} {a.source && `· ${a.source}`}
                </p>
              </div>
              <button
                onClick={() => handleDelete(a.id)}
                className="shrink-0 rounded-xs p-1.5 text-text-soft transition-colors hover:bg-rust/10 hover:text-rust"
                aria-label="Delete announcement"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
