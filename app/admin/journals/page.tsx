'use client'

import { useState } from 'react'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { Plus, CheckCircle, AlertCircle, Clock, Trash2 } from 'lucide-react'

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
  },
]

const statusConfig = {
  active: { icon: CheckCircle, color: 'text-jade', bg: 'bg-jade/10', label: 'Active' },
  pending: { icon: Clock, color: 'text-gold', bg: 'bg-gold/10', label: 'Pending' },
  paused: { icon: AlertCircle, color: 'text-rust', bg: 'bg-rust/10', label: 'Paused' },
}

export default function JournalRegistry() {
  const [journals, setJournals] = useState<RegisteredJournal[]>(mockJournals)
  const [showForm, setShowForm] = useState(false)
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
              return (
                <div
                  key={journal.id}
                  className="rounded-xs border border-white/10 bg-paper-raised/50 p-6"
                >
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
                    <button className="flex-1 rounded-xs border border-white/10 px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-white/5">
                      View Details
                    </button>
                    <button
                      onClick={() => deleteJournal(journal.id)}
                      className="rounded-xs border border-rust/30 px-4 py-2 text-sm font-medium text-rust transition-colors hover:bg-rust/10"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
