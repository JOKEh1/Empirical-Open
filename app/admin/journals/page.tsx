'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { AdminLoading } from '@/components/admin/admin-loading'
import {
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Trash2,
  RefreshCw,
  PauseCircle,
  Inbox,
} from 'lucide-react'
import { getCurrentUser } from '@/lib/auth'
import { createClient } from '@/lib/supabase/client'
import type { Tables } from '@/lib/database.types'

const disciplines = [
  'Agricultural Sciences',
  'Public Health',
  'Engineering',
  'Education',
  'Social Sciences',
  'Clinical Sciences',
  'Environmental Studies',
]

type IntegrationRequest = Tables<'integration_requests'>
type Journal = Tables<'journals'>

function slugify(name: string) {
  const base = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  return `${base || 'journal'}-${Date.now().toString(36).slice(-4)}`
}

const syncStatusConfig = {
  successful: { icon: CheckCircle, color: 'text-jade', bg: 'bg-jade/10', label: 'Healthy' },
  pending: { icon: Clock, color: 'text-gold', bg: 'bg-gold/10', label: 'Pending sync' },
  failed: { icon: AlertCircle, color: 'text-rust', bg: 'bg-rust/10', label: 'Sync failed' },
}

export default function JournalRegistry() {
  const router = useRouter()
  const supabase = createClient()

  const [ready, setReady] = useState(false)
  const [requests, setRequests] = useState<IntegrationRequest[]>([])
  const [journals, setJournals] = useState<Journal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [decisionPending, setDecisionPending] = useState<string | null>(null)
  const [disciplinePicks, setDisciplinePicks] = useState<Record<string, string>>({})
  const [rejectNotes, setRejectNotes] = useState<Record<string, string>>({})
  const [rejectOpenFor, setRejectOpenFor] = useState<string | null>(null)
  const [syncingId, setSyncingId] = useState<string | null>(null)
  const [expandedJournal, setExpandedJournal] = useState<string | null>(null)

  const loadData = useCallback(async () => {
    setLoading(true)
    setError(null)
    const [{ data: reqData, error: reqErr }, { data: jData, error: jErr }] = await Promise.all([
      supabase
        .from('integration_requests')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: true }),
      supabase.from('journals').select('*').order('created_at', { ascending: false }),
    ])
    if (reqErr || jErr) {
      setError(reqErr?.message ?? jErr?.message ?? 'Failed to load data')
    } else {
      setRequests(reqData ?? [])
      setJournals(jData ?? [])
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
        router.push('/login?redirect=/admin/journals')
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

  async function handleApprove(req: IntegrationRequest) {
    setDecisionPending(req.id)
    const discipline = disciplinePicks[req.id] || disciplines[0]

    const { error: journalErr } = await supabase.from('journals').insert({
      id: slugify(req.journal_name),
      name: req.journal_name,
      discipline,
      institution: req.institution,
      oai_pmh_endpoint: req.oai_pmh_endpoint,
      submission_url: req.website_url,
      status: 'active',
      sync_status: 'pending',
    })

    if (journalErr) {
      setError(journalErr.message)
      setDecisionPending(null)
      return
    }

    const { error: reqErr } = await supabase
      .from('integration_requests')
      .update({ status: 'approved', reviewed_at: new Date().toISOString() })
      .eq('id', req.id)

    if (reqErr) {
      setError(reqErr.message)
    } else {
      await loadData()
    }
    setDecisionPending(null)
  }

  async function handleReject(req: IntegrationRequest) {
    setDecisionPending(req.id)
    const { error: reqErr } = await supabase
      .from('integration_requests')
      .update({
        status: 'rejected',
        admin_note: rejectNotes[req.id] ?? '',
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', req.id)

    if (reqErr) {
      setError(reqErr.message)
    } else {
      setRejectOpenFor(null)
      await loadData()
    }
    setDecisionPending(null)
  }

  async function handleManualSync(journal: Journal) {
    setSyncingId(journal.id)
    const { error: syncErr } = await supabase
      .from('journals')
      .update({ sync_status: 'successful', last_synced_at: new Date().toISOString() })
      .eq('id', journal.id)
    if (syncErr) setError(syncErr.message)
    else await loadData()
    setSyncingId(null)
  }

  async function handleToggleArchive(journal: Journal) {
    const nextStatus = journal.status === 'archived' ? 'active' : 'archived'
    const { error: toggleErr } = await supabase
      .from('journals')
      .update({ status: nextStatus })
      .eq('id', journal.id)
    if (toggleErr) setError(toggleErr.message)
    else await loadData()
  }

  async function handleDelete(journal: Journal) {
    const { error: delErr } = await supabase.from('journals').delete().eq('id', journal.id)
    if (delErr) setError(delErr.message)
    else await loadData()
  }

  if (!ready) return <AdminLoading />

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />

      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-6xl px-8 py-10">
          {/* Header */}
          <div className="mb-10">
            <h1 className="font-serif text-3xl font-semibold text-paper mb-2">
              Journal Registry
            </h1>
            <p className="text-text-soft">
              Approve or reject incoming OJS journal integration requests, and monitor OAI-PMH
              sync health across the network.
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-xs border border-rust/40 bg-rust/10 px-4 py-3 text-sm text-rust">
              {error}
            </div>
          )}

          {/* Pending Integration Requests */}
          <div className="mb-12">
            <h2 className="font-serif text-xl font-semibold text-paper mb-6 flex items-center gap-2">
              <Inbox className="size-5 text-gold" />
              Pending Integration Requests
              {requests.length > 0 && (
                <span className="rounded-full bg-gold/20 px-2.5 py-0.5 text-xs font-semibold text-gold">
                  {requests.length}
                </span>
              )}
            </h2>

            {loading ? (
              <p className="text-sm text-text-soft">Loading…</p>
            ) : requests.length === 0 ? (
              <p className="rounded-xs border border-white/10 bg-paper-raised/50 p-6 text-sm text-text-soft">
                No pending requests. New submissions from{' '}
                <span className="font-mono text-xs">/request-integration</span> will appear here.
              </p>
            ) : (
              <div className="space-y-4">
                {requests.map((req) => (
                  <div
                    key={req.id}
                    className="rounded-xs border border-white/10 bg-paper-raised/50 p-6"
                  >
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-serif text-lg font-semibold text-paper">
                          {req.journal_name}
                        </h3>
                        <p className="text-sm text-text-soft">{req.institution || 'No institution given'}</p>
                      </div>
                      <span className="shrink-0 rounded-xs bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
                        Pending review
                      </span>
                    </div>

                    <div className="mb-4 grid gap-4 md:grid-cols-2 text-sm">
                      <div>
                        <p className="text-xs text-text-soft mb-1">Website / OJS URL</p>
                        <a
                          href={req.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gold hover:underline text-xs break-all"
                        >
                          {req.website_url}
                        </a>
                      </div>
                      <div>
                        <p className="text-xs text-text-soft mb-1">OAI-PMH Endpoint</p>
                        <p className="text-paper break-all font-mono text-xs">
                          {req.oai_pmh_endpoint || 'Not provided'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-text-soft mb-1">Contact</p>
                        <p className="text-paper text-xs">
                          {req.contact_name || '—'} ·{' '}
                          <a href={`mailto:${req.contact_email}`} className="text-gold hover:underline">
                            {req.contact_email}
                          </a>
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-text-soft mb-1">ISSN</p>
                        <p className="text-paper text-xs">{req.issn || '—'}</p>
                      </div>
                    </div>

                    {req.notes && (
                      <div className="mb-4 rounded-xs border border-white/10 bg-ink p-3">
                        <p className="text-xs text-text-soft mb-1">Submitter notes</p>
                        <p className="text-xs text-paper leading-relaxed">{req.notes}</p>
                      </div>
                    )}

                    <div className="mb-4 flex items-center gap-3">
                      <label className="text-xs text-text-soft">Assign discipline:</label>
                      <select
                        value={disciplinePicks[req.id] || disciplines[0]}
                        onChange={(e) =>
                          setDisciplinePicks((p) => ({ ...p, [req.id]: e.target.value }))
                        }
                        className="rounded-xs border border-white/10 bg-ink px-3 py-1.5 text-xs text-paper focus:border-gold focus:outline-none"
                      >
                        {disciplines.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>

                    {rejectOpenFor === req.id && (
                      <div className="mb-4">
                        <label className="mb-1.5 block text-xs text-text-soft">
                          Reason for rejection (optional, sent to submitter's record)
                        </label>
                        <textarea
                          value={rejectNotes[req.id] ?? ''}
                          onChange={(e) =>
                            setRejectNotes((n) => ({ ...n, [req.id]: e.target.value }))
                          }
                          rows={2}
                          className="w-full rounded-xs border border-white/10 bg-ink px-3 py-2 text-xs text-paper focus:border-gold focus:outline-none"
                        />
                      </div>
                    )}

                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => handleApprove(req)}
                        disabled={decisionPending === req.id}
                        className="flex items-center gap-2 rounded-xs bg-jade/20 border border-jade/50 px-4 py-2 text-sm font-medium text-jade transition-all hover:bg-jade/30 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <CheckCircle className="size-4" />
                        {decisionPending === req.id ? 'Approving…' : 'Approve & Register'}
                      </button>
                      {rejectOpenFor === req.id ? (
                        <button
                          onClick={() => handleReject(req)}
                          disabled={decisionPending === req.id}
                          className="flex items-center gap-2 rounded-xs bg-rust/20 border border-rust/50 px-4 py-2 text-sm font-medium text-rust transition-all hover:bg-rust/30 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <XCircle className="size-4" />
                          {decisionPending === req.id ? 'Rejecting…' : 'Confirm Reject'}
                        </button>
                      ) : (
                        <button
                          onClick={() => setRejectOpenFor(req.id)}
                          className="flex items-center gap-2 rounded-xs border border-rust/30 px-4 py-2 text-sm font-medium text-rust transition-colors hover:bg-rust/10"
                        >
                          <XCircle className="size-4" />
                          Reject
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Active Journal Registry */}
          <div>
            <h2 className="font-serif text-xl font-semibold text-paper mb-6">
              Active Journal Registry
            </h2>

            {loading ? (
              <p className="text-sm text-text-soft">Loading…</p>
            ) : journals.length === 0 ? (
              <p className="rounded-xs border border-white/10 bg-paper-raised/50 p-6 text-sm text-text-soft">
                No journals registered yet.
              </p>
            ) : (
              <div className="space-y-4">
                {journals.map((journal) => {
                  const statusInfo = syncStatusConfig[journal.sync_status]
                  const StatusIcon = statusInfo.icon
                  const isExpanded = expandedJournal === journal.id
                  const isSyncing = syncingId === journal.id
                  const isArchived = journal.status === 'archived'

                  return (
                    <div
                      key={journal.id}
                      className={`rounded-xs border border-white/10 bg-paper-raised/50 overflow-hidden transition-all ${isArchived ? 'opacity-60' : ''}`}
                    >
                      <div className="p-6">
                        <div className="mb-4 flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-serif text-lg font-semibold text-paper mb-1">
                              {journal.name}
                              {isArchived && (
                                <span className="ml-2 text-xs font-normal text-text-soft">(archived)</span>
                              )}
                            </h3>
                            <p className="text-sm text-text-soft">
                              {journal.institution} · {journal.discipline}
                            </p>
                          </div>
                          <div className={`flex items-center gap-2 rounded-xs px-3 py-1.5 text-sm font-medium ${statusInfo.bg}`}>
                            <StatusIcon className={`size-4 ${statusInfo.color}`} />
                            <span className={statusInfo.color}>{statusInfo.label}</span>
                          </div>
                        </div>

                        <div className="mb-4 grid gap-4 md:grid-cols-3 text-sm">
                          <div>
                            <p className="text-xs text-text-soft mb-1">OAI-PMH Endpoint</p>
                            <p className="text-paper break-all font-mono text-xs">
                              {journal.oai_pmh_endpoint || 'Not configured'}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-text-soft mb-1">Submission URL</p>
                            {journal.submission_url ? (
                              <a
                                href={journal.submission_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gold hover:underline text-xs break-all"
                              >
                                Visit site
                              </a>
                            ) : (
                              <p className="text-paper text-xs">Not configured</p>
                            )}
                          </div>
                          <div>
                            <p className="text-xs text-text-soft mb-1">Last Synced</p>
                            <p className="text-paper text-xs">
                              {journal.last_synced_at
                                ? new Date(journal.last_synced_at).toLocaleString()
                                : 'Never'}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-3 pt-2">
                          <button
                            onClick={() => setExpandedJournal(isExpanded ? null : journal.id)}
                            className="rounded-xs border border-white/10 px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-white/5"
                          >
                            {isExpanded ? 'Hide Actions' : 'Manage'}
                          </button>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="border-t border-white/10 bg-ink px-6 py-6">
                          <div className="flex flex-wrap gap-3">
                            <button
                              onClick={() => handleManualSync(journal)}
                              disabled={isSyncing}
                              className="flex items-center gap-2 rounded-xs bg-jade/20 border border-jade/50 px-4 py-2 text-sm font-medium text-jade transition-all hover:bg-jade/30 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <RefreshCw className={`size-4 ${isSyncing ? 'animate-spin' : ''}`} />
                              {isSyncing ? 'Syncing…' : 'Trigger Manual Sync'}
                            </button>
                            <button
                              onClick={() => handleToggleArchive(journal)}
                              className={`flex items-center gap-2 rounded-xs px-4 py-2 text-sm font-medium transition-all border ${
                                isArchived
                                  ? 'bg-jade/20 border-jade/50 text-jade hover:bg-jade/30'
                                  : 'bg-rust/20 border-rust/50 text-rust hover:bg-rust/30'
                              }`}
                            >
                              <PauseCircle className="size-4" />
                              {isArchived ? 'Reactivate' : 'Archive'}
                            </button>
                            <button
                              onClick={() => handleDelete(journal)}
                              className="flex items-center gap-2 rounded-xs border border-rust/30 px-4 py-2 text-sm font-medium text-rust transition-colors hover:bg-rust/10"
                            >
                              <Trash2 className="size-4" />
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
