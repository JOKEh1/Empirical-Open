'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { AdminLoading } from '@/components/admin/admin-loading'
import { Plus, Calendar, Edit2, Trash2, X, CheckCircle, PauseCircle, PlayCircle } from 'lucide-react'
import { getCurrentUser } from '@/lib/auth'
import { createClient } from '@/lib/supabase/client'
import type { Tables } from '@/lib/database.types'
import { DISCIPLINES } from '@/lib/queries/types'
import { daysLeftFrom } from '@/lib/queries/format'

const disciplineOptions = DISCIPLINES.filter((d) => d !== 'All disciplines')

type CFP = Tables<'calls_for_papers'> & { journals: { name: string } | null }
type JournalOption = { id: string; name: string }

type FormState = {
  id: string | null
  journalId: string
  title: string
  scope: string
  fullDescription: string
  closesDate: string
  disciplines: string[]
  guidelines: string
  ojsLink: string
  contactEmail: string
}

function emptyForm(): FormState {
  return {
    id: null,
    journalId: '',
    title: '',
    scope: '',
    fullDescription: '',
    closesDate: '',
    disciplines: [],
    guidelines: '',
    ojsLink: '',
    contactEmail: '',
  }
}

const statusColor: Record<string, string> = {
  open: 'bg-jade/10 text-jade',
  closed: 'bg-rust/10 text-rust',
  draft: 'bg-gold/10 text-gold',
}

export default function CallsManager() {
  const router = useRouter()
  const supabase = createClient()

  const [ready, setReady] = useState(false)
  const [calls, setCalls] = useState<CFP[]>([])
  const [journalOptions, setJournalOptions] = useState<JournalOption[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<FormState>(emptyForm())
  const [submitting, setSubmitting] = useState(false)
  const [pendingId, setPendingId] = useState<string | null>(null)

  const loadData = useCallback(async () => {
    setLoading(true)
    setError(null)
    const [{ data: callsData, error: callsErr }, { data: journalsData, error: journalsErr }] = await Promise.all([
      supabase
        .from('calls_for_papers')
        .select('*, journals(name)')
        .order('created_at', { ascending: false }),
      supabase.from('journals').select('id, name').eq('status', 'active').order('name'),
    ])
    if (callsErr || journalsErr) {
      setError(callsErr?.message ?? journalsErr?.message ?? 'Failed to load data')
    } else {
      setCalls((callsData ?? []) as CFP[])
      setJournalOptions(journalsData ?? [])
    }
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // UX guard only; middleware.ts enforces this server-side.
    let cancelled = false
    getCurrentUser().then((user) => {
      if (cancelled) return
      if (!user) {
        router.push('/login?redirect=/admin/calls')
      } else if (user.role !== 'admin') {
        router.push('/')
      } else {
        setReady(true)
        loadData()
      }
    })
    return () => {
      cancelled = true
    }
  }, [router, loadData])

  function openCreateForm() {
    setForm(emptyForm())
    setShowForm(true)
  }

  function openEditForm(call: CFP) {
    setForm({
      id: call.id,
      journalId: call.journal_id,
      title: call.title,
      scope: call.scope,
      fullDescription: call.full_description,
      closesDate: call.closes_date,
      disciplines: call.disciplines ?? [],
      guidelines: ((call.guidelines ?? []) as string[]).join('\n'),
      ojsLink: call.ojs_link,
      contactEmail: call.contact_email,
    })
    setShowForm(true)
  }

  function toggleDiscipline(discipline: string) {
    setForm((f) => ({
      ...f,
      disciplines: f.disciplines.includes(discipline)
        ? f.disciplines.filter((d) => d !== discipline)
        : [...f.disciplines, discipline],
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.journalId || !form.title.trim() || !form.closesDate) {
      setError('Journal, title, and closing date are required.')
      return
    }
    setSubmitting(true)
    setError(null)

    const payload = {
      journal_id: form.journalId,
      title: form.title.trim(),
      scope: form.scope.trim(),
      full_description: form.fullDescription.trim(),
      closes_date: form.closesDate,
      disciplines: form.disciplines,
      guidelines: form.guidelines
        .split('\n')
        .map((g) => g.trim())
        .filter(Boolean),
      ojs_link: form.ojsLink.trim(),
      contact_email: form.contactEmail.trim(),
    }

    const { error: saveErr } = form.id
      ? await supabase.from('calls_for_papers').update(payload).eq('id', form.id)
      : await supabase.from('calls_for_papers').insert({ ...payload, status: 'draft' })

    setSubmitting(false)
    if (saveErr) {
      setError(saveErr.message)
      return
    }
    setShowForm(false)
    setForm(emptyForm())
    await loadData()
  }

  async function handleSetStatus(call: CFP, status: 'open' | 'closed' | 'draft') {
    setPendingId(call.id)
    const { error: statusErr } = await supabase.from('calls_for_papers').update({ status }).eq('id', call.id)
    if (statusErr) setError(statusErr.message)
    else await loadData()
    setPendingId(null)
  }

  async function handleDelete(call: CFP) {
    if (!confirm(`Delete "${call.title}"? This can't be undone.`)) return
    setPendingId(call.id)
    const { error: delErr } = await supabase.from('calls_for_papers').delete().eq('id', call.id)
    if (delErr) setError(delErr.message)
    else setCalls((prev) => prev.filter((c) => c.id !== call.id))
    setPendingId(null)
  }

  if (!ready) return <AdminLoading />

  return (
    <div className="flex h-screen bg-[#faf9f6]">
      <AdminSidebar />

      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-6xl px-8 py-10">
          {/* Header */}
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h1 className="font-serif text-3xl font-semibold text-[#0f172a] mb-2">
                Calls for Papers Manager
              </h1>
              <p className="text-text-soft">
                Create, edit, publish, and archive special issues across the network
              </p>
            </div>
            <button
              onClick={() => (showForm ? setShowForm(false) : openCreateForm())}
              className="flex items-center gap-2 rounded-xs bg-gold px-4 py-2.5 font-semibold text-ink transition-colors hover:bg-gold-soft"
            >
              {showForm ? <X className="size-5" /> : <Plus className="size-5" />}
              {showForm ? 'Cancel' : 'Create Call'}
            </button>
          </div>

          {error && (
            <div className="mb-6 rounded-xs border border-rust/40 bg-rust/10 px-4 py-3 text-sm text-rust">
              {error}
            </div>
          )}

          {/* Form */}
          {showForm && (
            <div className="mb-10 rounded-xs border border-slate-200 bg-white p-8">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-serif text-xl font-semibold text-paper">
                  {form.id ? 'Edit Special Issue' : 'New Special Issue'}
                </h2>
                <button onClick={() => setShowForm(false)} className="text-text-soft hover:text-paper">
                  <X className="size-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-paper mb-2">Special Issue Title</label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                      placeholder="e.g., Climate Change in West Africa"
                      className="w-full rounded-xs border border-slate-200 bg-white px-4 py-2.5 text-slate-900 placeholder:text-slate-500 hover:placeholder:text-slate-600 focus:placeholder:text-slate-600 focus:border-gold focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-paper mb-2">Target Journal</label>
                    <select
                      value={form.journalId}
                      onChange={(e) => setForm((f) => ({ ...f, journalId: e.target.value }))}
                      className="w-full rounded-xs border border-white/10 bg-ink px-4 py-2.5 text-slate-900 focus:border-gold focus:outline-none"
                      required
                    >
                      <option value="">Select a journal...</option>
                      {journalOptions.map((j) => (
                        <option key={j.id} value={j.id}>
                          {j.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-paper mb-2">Scope (short summary)</label>
                  <textarea
                    value={form.scope}
                    onChange={(e) => setForm((f) => ({ ...f, scope: e.target.value }))}
                    placeholder="One or two sentences describing the scope of this call..."
                    rows={2}
                    className="w-full rounded-xs border border-white/10 bg-ink px-4 py-2.5 text-slate-900 placeholder:text-slate-500 hover:placeholder:text-slate-600 focus:placeholder:text-slate-600 focus:border-gold focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-paper mb-2">Full description</label>
                  <textarea
                    value={form.fullDescription}
                    onChange={(e) => setForm((f) => ({ ...f, fullDescription: e.target.value }))}
                    placeholder="Full call text, topics of interest, etc."
                    rows={5}
                    className="w-full rounded-xs border border-white/10 bg-ink px-4 py-2.5 text-slate-900 placeholder:text-slate-500 hover:placeholder:text-slate-600 focus:placeholder:text-slate-600 focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-paper mb-3">Relevant Disciplines</label>
                  <div className="grid gap-2 md:grid-cols-2">
                    {disciplineOptions.map((discipline) => (
                      <label key={discipline} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={form.disciplines.includes(discipline)}
                          onChange={() => toggleDiscipline(discipline)}
                          className="rounded border-white/20"
                        />
                        <span className="text-sm text-[#0f172a]">{discipline}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-paper mb-2">
                    Submission guidelines (one per line)
                  </label>
                  <textarea
                    value={form.guidelines}
                    onChange={(e) => setForm((f) => ({ ...f, guidelines: e.target.value }))}
                    placeholder={'Manuscripts should be 5,000-8,000 words\nInclude a structured abstract'}
                    rows={4}
                    className="w-full rounded-xs border border-white/10 bg-ink px-4 py-2.5 text-slate-900 placeholder:text-slate-500 hover:placeholder:text-slate-600 focus:placeholder:text-slate-600 focus:border-gold focus:outline-none"
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-paper mb-2">OJS submission link</label>
                    <input
                      type="url"
                      value={form.ojsLink}
                      onChange={(e) => setForm((f) => ({ ...f, ojsLink: e.target.value }))}
                      placeholder="https://ojs.example.org/submit"
                      className="w-full rounded-xs border border-white/10 bg-ink px-4 py-2.5 text-slate-900 placeholder:text-slate-500 hover:placeholder:text-slate-600 focus:placeholder:text-slate-600 focus:border-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-paper mb-2">Contact email</label>
                    <input
                      type="email"
                      value={form.contactEmail}
                      onChange={(e) => setForm((f) => ({ ...f, contactEmail: e.target.value }))}
                      placeholder="editorial@example.org"
                      className="w-full rounded-xs border border-white/10 bg-ink px-4 py-2.5 text-slate-900 placeholder:text-slate-500 hover:placeholder:text-slate-600 focus:placeholder:text-slate-600 focus:border-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-paper mb-2">Submission Deadline</label>
                  <div className="flex items-center gap-3">
                    <Calendar className="size-5 text-gold" />
                    <input
                      type="date"
                      value={form.closesDate}
                      onChange={(e) => setForm((f) => ({ ...f, closesDate: e.target.value }))}
                      className="flex-1 rounded-xs border border-white/10 bg-ink px-4 py-2.5 text-paper focus:border-gold focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="rounded-xs bg-gold px-6 py-2.5 font-semibold text-ink transition-colors hover:bg-gold-soft disabled:opacity-60"
                  >
                    {submitting ? 'Saving…' : form.id ? 'Save Changes' : 'Create Call for Papers'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="rounded-xs border border-slate-200 px-6 py-2.5 font-medium text-[#0f172a] transition-colors hover:bg-white/5"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Calls List */}
          {loading ? (
            <p className="text-sm text-text-soft">Loading…</p>
          ) : calls.length === 0 ? (
            <p className="rounded-xs border border-white/10 bg-paper-raised/50 p-6 text-sm text-text-soft">
              No calls for papers yet. Create one above.
            </p>
          ) : (
            <div className="space-y-4">
              {calls.map((call) => {
                const daysLeft = daysLeftFrom(call.closes_date)
                const isPending = pendingId === call.id
                return (
                  <div key={call.id} className="rounded-xs border border-white/10 bg-paper-raised/50 p-6">
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-serif text-lg font-semibold text-paper mb-1">{call.title}</h3>
                        <p className="text-sm text-text-soft mb-2">{call.journals?.name ?? 'Unknown journal'}</p>
                        <p className="text-sm leading-relaxed text-slate-100 line-clamp-2">{call.scope}</p>
                      </div>
                      <div className={`rounded-xs px-3 py-1.5 text-sm font-medium ${statusColor[call.status]}`}>
                        {call.status.charAt(0).toUpperCase() + call.status.slice(1)}
                      </div>
                    </div>

                    {call.disciplines.length > 0 && (
                      <div className="mb-4 flex flex-wrap gap-2">
                        {call.disciplines.map((discipline) => (
                          <span key={discipline} className="rounded-xs bg-jade/20 px-2.5 py-1 text-xs font-medium text-jade">
                            {discipline}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mb-4 flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2 text-text-soft">
                        <Calendar className="size-4" />
                        <span>
                          Deadline: {new Date(`${call.closes_date}T00:00:00`).toLocaleDateString()} ({daysLeft} day
                          {daysLeft === 1 ? '' : 's'} left)
                        </span>
                      </div>
                      <span className="text-text-soft">{call.submissions_count} submissions</span>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-4">
                      <button
                        onClick={() => openEditForm(call)}
                        className="flex items-center gap-2 rounded-xs border border-white/10 px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-white/5"
                      >
                        <Edit2 className="size-4" />
                        Edit
                      </button>
                      {call.status !== 'open' && (
                        <button
                          onClick={() => handleSetStatus(call, 'open')}
                          disabled={isPending}
                          className="flex items-center gap-2 rounded-xs bg-jade/20 border border-jade/50 px-4 py-2 text-sm font-medium text-jade transition-all hover:bg-jade/30 disabled:opacity-50"
                        >
                          <CheckCircle className="size-4" />
                          Publish
                        </button>
                      )}
                      {call.status === 'open' && (
                        <button
                          onClick={() => handleSetStatus(call, 'closed')}
                          disabled={isPending}
                          className="flex items-center gap-2 rounded-xs bg-rust/20 border border-rust/50 px-4 py-2 text-sm font-medium text-rust transition-all hover:bg-rust/30 disabled:opacity-50"
                        >
                          <PauseCircle className="size-4" />
                          Close
                        </button>
                      )}
                      {call.status === 'closed' && (
                        <button
                          onClick={() => handleSetStatus(call, 'draft')}
                          disabled={isPending}
                          className="flex items-center gap-2 rounded-xs border border-white/10 px-4 py-2 text-sm font-medium text-paper transition-all hover:bg-white/5 disabled:opacity-50"
                        >
                          <PlayCircle className="size-4" />
                          Reopen as draft
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(call)}
                        disabled={isPending}
                        className="rounded-xs border border-rust/30 px-4 py-2 text-sm font-medium text-rust transition-colors hover:bg-rust/10 disabled:opacity-50"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
