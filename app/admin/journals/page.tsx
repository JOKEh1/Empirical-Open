'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { Plus, CheckCircle, AlertCircle, Clock, Trash2, RefreshCw, Settings, PauseCircle } from 'lucide-react'
import { getCurrentUser } from '@/lib/auth'

type JournalStatus = 'active' | 'pending' | 'paused'

interface RegisteredJournal {
  id: string
  name: string
  oaiEndpoint: string
  homepage: string
  submissionUrl: string
  institution: string
  status: JournalStatus
  lastHealthCheck: string
  contactEmail?: string
  articlesHarvested?: number
  lastSyncStatus?: 'successful' | 'failed' | 'pending'
  platformVersion?: string
  metadataFormat?: string
}

const mockJournals: RegisteredJournal[] = [
  {
    id: '1',
    name: 'West African Journal of Public Health',
    oaiEndpoint: 'https://ajol.info/oai',
    homepage: 'https://ajol.info/public-health',
    submissionUrl: 'https://ojs.ajol.info/submit/public-health',
    institution: 'Ahmadu Bello University',
    status: 'active',
    lastHealthCheck: '2 hours ago',
    contactEmail: 'editor@abuhealth.edu.ng',
    articlesHarvested: 142,
    lastSyncStatus: 'successful',
    platformVersion: 'OJS 3.3.0',
    metadataFormat: 'oai_dc',
  },
  {
    id: '2',
    name: 'Journal of Sahel Agricultural Sciences',
    oaiEndpoint: 'https://ajol.info/oai',
    homepage: 'https://ajol.info/agriculture',
    submissionUrl: 'https://ojs.ajol.info/submit/agriculture',
    institution: 'University of Ouagadougou',
    status: 'active',
    lastHealthCheck: '1 hour ago',
    contactEmail: 'contact@ouagadougou-ag.edu.bf',
    articlesHarvested: 89,
    lastSyncStatus: 'successful',
    platformVersion: 'OJS 3.2.1',
    metadataFormat: 'oai_dc',
  },
]

const statusConfig = {
  active: { icon: CheckCircle, color: 'text-jade', bg: 'bg-jade/10', label: 'Active' },
  pending: { icon: Clock, color: 'text-gold', bg: 'bg-gold/10', label: 'Pending' },
  paused: { icon: AlertCircle, color: 'text-rust', bg: 'bg-rust/10', label: 'Paused' },
}

export default function JournalRegistry() {
  const router = useRouter()
  const [journals, setJournals] = useState<RegisteredJournal[]>(mockJournals)
  const [showForm, setShowForm] = useState(false)
  const [expandedJournal, setExpandedJournal] = useState<string | null>(null)
  const [syncingId, setSyncingId] = useState<string | null>(null)

  useEffect(() => {
    // UX guard only; middleware.ts enforces this server-side.
    let cancelled = false
    getCurrentUser().then((user) => {
      if (cancelled) return
      if (!user) {
        router.push('/login?redirect=/admin/journals')
      } else if (user.role !== 'admin') {
        router.push('/')
      }
    })
    return () => {
      cancelled = true
    }
  }, [router])
  const [formData, setFormData] = useState({
    name: '',
    oaiEndpoint: '',
    homepage: '',
    submissionUrl: '',
    institution: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newJournal: RegisteredJournal = {
      id: Date.now().toString(),
      ...formData,
      status: 'pending',
      lastHealthCheck: 'Just now',
    }
    setJournals([...journals, newJournal])
    setFormData({ name: '', oaiEndpoint: '', homepage: '', submissionUrl: '', institution: '' })
    setShowForm(false)
  }

  const deleteJournal = (id: string) => {
    setJournals(journals.filter((j) => j.id !== id))
  }

  const handleManualSync = (id: string) => {
    setSyncingId(id)
    setTimeout(() => {
      setJournals(journals.map((j) => 
        j.id === id 
          ? { ...j, lastHealthCheck: 'Just now', lastSyncStatus: 'successful' }
          : j
      ))
      setSyncingId(null)
    }, 1500)
  }

  const handleEditSettings = (id: string) => {
    // In a real app, this would open a settings modal
    alert(`Edit settings for journal ${id}`)
  }

  const handlePauseEndpoint = (id: string) => {
    setJournals(journals.map((j) =>
      j.id === id
        ? { ...j, status: j.status === 'paused' ? 'active' : 'paused' }
        : j
    ))
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />

      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-6xl px-8 py-10">
          {/* Header */}
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h1 className="font-serif text-3xl font-semibold text-paper mb-2">
                Journal Registry
              </h1>
              <p className="text-text-soft">
                Register OJS journals with OAI-PMH endpoints and health monitoring
              </p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 rounded-xs bg-gold px-4 py-2.5 font-semibold text-ink transition-colors hover:bg-gold-soft"
            >
              <Plus className="size-5" />
              Register Journal
            </button>
          </div>

          {/* Registration Form */}
          {showForm && (
            <div className="mb-10 rounded-xs border border-white/10 bg-paper-raised/50 p-8">
              <h2 className="font-serif text-xl font-semibold text-paper mb-6">New Journal Registration</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-paper mb-2">
                      Journal Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Full journal title"
                      className="w-full rounded-xs border border-white/10 bg-ink px-4 py-2.5 text-slate-900 placeholder:text-slate-500 hover:placeholder:text-slate-600 focus:placeholder:text-slate-600 focus:border-gold focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-paper mb-2">
                      Host Institution
                    </label>
                    <input
                      type="text"
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      placeholder="University or organization"
                      className="w-full rounded-xs border border-white/10 bg-ink px-4 py-2.5 text-slate-900 placeholder:text-slate-500 hover:placeholder:text-slate-600 focus:placeholder:text-slate-600 focus:border-gold focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-paper mb-2">
                    OAI-PMH Endpoint URL
                  </label>
                  <input
                    type="url"
                    value={formData.oaiEndpoint}
                    onChange={(e) => setFormData({ ...formData, oaiEndpoint: e.target.value })}
                    placeholder="https://example.org/oai"
                    className="w-full rounded-xs border border-white/10 bg-ink px-4 py-2.5 text-slate-900 placeholder:text-slate-500 hover:placeholder:text-slate-600 focus:placeholder:text-slate-600 focus:border-gold focus:outline-none"
                    required
                  />
                  <p className="text-xs text-text-soft mt-1">
                    OAI-PMH endpoint for harvesting article metadata
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-paper mb-2">
                      Journal Homepage URL
                    </label>
                    <input
                      type="url"
                      value={formData.homepage}
                      onChange={(e) => setFormData({ ...formData, homepage: e.target.value })}
                      placeholder="https://journal.example.org"
                      className="w-full rounded-xs border border-white/10 bg-ink px-4 py-2.5 text-slate-900 placeholder:text-slate-500 hover:placeholder:text-slate-600 focus:placeholder:text-slate-600 focus:border-gold focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-paper mb-2">
                      Submission URL (OJS)
                    </label>
                    <input
                      type="url"
                      value={formData.submissionUrl}
                      onChange={(e) => setFormData({ ...formData, submissionUrl: e.target.value })}
                      placeholder="https://ojs.example.org/submit"
                      className="w-full rounded-xs border border-white/10 bg-ink px-4 py-2.5 text-slate-900 placeholder:text-slate-500 hover:placeholder:text-slate-600 focus:placeholder:text-slate-600 focus:border-gold focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="rounded-xs bg-gold px-6 py-2.5 font-semibold text-ink transition-colors hover:bg-gold-soft"
                  >
                    Register Journal
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="rounded-xs border border-white/10 px-6 py-2.5 font-medium text-paper transition-colors hover:bg-white/5"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Journals List */}
          <div className="space-y-4">
            {journals.map((journal) => {
              const statusInfo = statusConfig[journal.status]
              const StatusIcon = statusInfo.icon
              const isExpanded = expandedJournal === journal.id
              const isSyncing = syncingId === journal.id
              const syncStatusColor = {
                successful: 'text-jade',
                failed: 'text-rust',
                pending: 'text-gold',
              }[journal.lastSyncStatus || 'pending']
              
              return (
                <div
                  key={journal.id}
                  className="rounded-xs border border-white/10 bg-paper-raised/50 overflow-hidden transition-all"
                >
                  <div className="p-6">
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-serif text-lg font-semibold text-paper mb-1">
                          {journal.name}
                        </h3>
                        <p className="text-sm text-text-soft">{journal.institution}</p>
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
                          {journal.oaiEndpoint}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-text-soft mb-1">Homepage</p>
                        <a
                          href={journal.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gold hover:underline text-xs"
                        >
                          Visit site
                        </a>
                      </div>
                      <div>
                        <p className="text-xs text-text-soft mb-1">Health Status</p>
                        <p className="text-paper text-xs">Last checked: {journal.lastHealthCheck}</p>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={() => setExpandedJournal(isExpanded ? null : journal.id)}
                        className="flex-1 rounded-xs border border-white/10 px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-white/5"
                      >
                        {isExpanded ? 'Hide Details' : 'View Details'}
                      </button>
                      <button
                        onClick={() => deleteJournal(journal.id)}
                        className="rounded-xs border border-rust/30 px-4 py-2 text-sm font-medium text-rust transition-colors hover:bg-rust/10"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>

                  {/* Expandable Details Panel */}
                  {isExpanded && (
                    <div className="border-t border-white/10 bg-ink px-6 py-6 animate-in fade-in-0 slide-in-from-top-2 duration-300">
                      <div className="space-y-6">
                        {/* OAI-PMH Sync Health Section */}
                        <div>
                          <h4 className="font-semibold text-paper mb-4 text-sm">OAI-PMH Sync Health</h4>
                          <div className="grid gap-4 md:grid-cols-4 text-sm">
                            <div className="rounded-xs border border-white/10 bg-paper-raised/50 p-4">
                              <p className="text-xs text-text-soft mb-2">Total Articles Harvested</p>
                              <p className="font-semibold text-paper">{journal.articlesHarvested || 0}</p>
                            </div>
                            <div className="rounded-xs border border-white/10 bg-paper-raised/50 p-4">
                              <p className="text-xs text-text-soft mb-2">Last Sync Status</p>
                              <p className={`font-semibold capitalize ${syncStatusColor}`}>
                                {journal.lastSyncStatus || 'Pending'}
                              </p>
                            </div>
                            <div className="rounded-xs border border-white/10 bg-paper-raised/50 p-4">
                              <p className="text-xs text-text-soft mb-2">Platform Version</p>
                              <p className="font-mono text-xs text-paper">{journal.platformVersion}</p>
                            </div>
                            <div className="rounded-xs border border-white/10 bg-paper-raised/50 p-4">
                              <p className="text-xs text-text-soft mb-2">Metadata Format</p>
                              <p className="font-mono text-xs text-paper">{journal.metadataFormat}</p>
                            </div>
                          </div>
                        </div>

                        {/* Contact Information */}
                        <div>
                          <h4 className="font-semibold text-paper mb-3 text-sm">Primary Contact</h4>
                          <div className="rounded-xs border border-white/10 bg-paper-raised/50 p-4">
                            <p className="text-sm text-paper">
                              <span className="text-text-soft">Email: </span>
                              <a href={`mailto:${journal.contactEmail}`} className="text-gold hover:underline">
                                {journal.contactEmail}
                              </a>
                            </p>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div>
                          <h4 className="font-semibold text-paper mb-3 text-sm">Actions</h4>
                          <div className="flex flex-wrap gap-3">
                            <button
                              onClick={() => handleManualSync(journal.id)}
                              disabled={isSyncing}
                              className="flex items-center gap-2 rounded-xs bg-jade/20 border border-jade/50 px-4 py-2 text-sm font-medium text-jade transition-all hover:bg-jade/30 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <RefreshCw className={`size-4 ${isSyncing ? 'animate-spin' : ''}`} />
                              {isSyncing ? 'Syncing...' : 'Trigger Manual Sync'}
                            </button>
                            <button
                              onClick={() => handleEditSettings(journal.id)}
                              className="flex items-center gap-2 rounded-xs bg-gold/20 border border-gold/50 px-4 py-2 text-sm font-medium text-gold transition-all hover:bg-gold/30"
                            >
                              <Settings className="size-4" />
                              Edit Settings
                            </button>
                            <button
                              onClick={() => handlePauseEndpoint(journal.id)}
                              className={`flex items-center gap-2 rounded-xs px-4 py-2 text-sm font-medium transition-all border ${
                                journal.status === 'paused'
                                  ? 'bg-jade/20 border-jade/50 text-jade hover:bg-jade/30'
                                  : 'bg-rust/20 border-rust/50 text-rust hover:bg-rust/30'
                              }`}
                            >
                              <PauseCircle className="size-4" />
                              {journal.status === 'paused' ? 'Resume Endpoint' : 'Pause Endpoint'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
