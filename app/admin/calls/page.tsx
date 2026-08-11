'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { Plus, Calendar, Edit2, Trash2, X } from 'lucide-react'
import { isAuthenticated, isAdmin } from '@/lib/auth'

const disciplines = [
  'Agricultural Sciences',
  'Public Health',
  'Engineering',
  'Education',
  'Social Sciences',
  'Clinical Sciences',
  'Environmental Studies',
]

interface SpecialIssue {
  id: string
  title: string
  journal: string
  scope: string
  deadline: string
  disciplines: string[]
  status: 'open' | 'closed' | 'draft'
  createdAt: string
}

const mockCFPs: SpecialIssue[] = [
  {
    id: '1',
    title: 'Climate Change in West Africa',
    journal: 'Journal of Sahel Agricultural Sciences',
    scope: 'Articles addressing climate resilience, adaptation strategies, and sustainable agriculture in the Sahel region.',
    deadline: '2024-08-31',
    disciplines: ['Agricultural Sciences', 'Environmental Studies'],
    status: 'open',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'Digital Health Innovation',
    journal: 'West African Journal of Public Health',
    scope: 'Exploring digital technologies, telemedicine, and health information systems in African healthcare.',
    deadline: '2024-09-15',
    disciplines: ['Public Health', 'Clinical Sciences'],
    status: 'open',
    createdAt: '2024-01-10',
  },
]

export default function CallsManager() {
  const router = useRouter()
  const [calls, setCalls] = useState<SpecialIssue[]>(mockCFPs)
  const [showForm, setShowForm] = useState(false)
  const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>([])
  const [formData, setFormData] = useState({
    title: '',
    journal: '',
    scope: '',
    deadline: '',
  })

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login?redirect=/admin/calls')
    } else if (!isAdmin()) {
      router.push('/')
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newCFP: SpecialIssue = {
      id: Date.now().toString(),
      ...formData,
      disciplines: selectedDisciplines,
      status: 'draft',
      createdAt: new Date().toISOString().split('T')[0],
    }
    setCalls([...calls, newCFP])
    setFormData({ title: '', journal: '', scope: '', deadline: '' })
    setSelectedDisciplines([])
    setShowForm(false)
  }

  const toggleDiscipline = (discipline: string) => {
    setSelectedDisciplines((prev) =>
      prev.includes(discipline)
        ? prev.filter((d) => d !== discipline)
        : [...prev, discipline]
    )
  }

  const deleteCFP = (id: string) => {
    setCalls(calls.filter((c) => c.id !== id))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-jade/10 text-jade'
      case 'closed':
        return 'bg-rust/10 text-rust'
      case 'draft':
        return 'bg-gold/10 text-gold'
      default:
        return 'bg-text-soft/10 text-slate-600'
    }
  }

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
              <p className="text-slate-600">
                Create and manage special issues and calls for papers
              </p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 rounded-xs bg-gold px-4 py-2.5 font-semibold text-ink transition-colors hover:bg-gold-soft"
            >
              <Plus className="size-5" />
              Create Call
            </button>
          </div>

          {/* New Call Form */}
          {showForm && (
            <div className="mb-10 rounded-xs border border-slate-200 bg-white p-8">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-serif text-xl font-semibold text-[#0f172a]">New Special Issue</h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-slate-600 hover:text-[#0f172a]"
                >
                  <X className="size-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-[#0f172a] mb-2">
                      Special Issue Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., Climate Change in West Africa"
                      className="w-full rounded-xs border border-slate-200 bg-white px-4 py-2.5 text-slate-900 placeholder:text-slate-500 hover:placeholder:text-slate-600 focus:placeholder:text-slate-600 focus:border-gold focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0f172a] mb-2">
                      Target Journal
                    </label>
                    <select
                      value={formData.journal}
                      onChange={(e) => setFormData({ ...formData, journal: e.target.value })}
                      className="w-full rounded-xs border border-slate-200 bg-white px-4 py-2.5 text-slate-900 focus:border-gold focus:outline-none"
                      required
                    >
                      <option value="">Select a journal...</option>
                      <option value="West African Journal of Public Health">
                        West African Journal of Public Health
                      </option>
                      <option value="Journal of Sahel Agricultural Sciences">
                        Journal of Sahel Agricultural Sciences
                      </option>
                      <option value="Nigerian Computing Research Network">
                        Nigerian Computing Research Network
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0f172a] mb-2">
                    Call Scope & Description
                  </label>
                  <textarea
                    value={formData.scope}
                    onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                    placeholder="Describe the scope, themes, and topics for this special issue..."
                    rows={5}
                    className="w-full rounded-xs border border-slate-200 bg-white px-4 py-2.5 text-slate-900 placeholder:text-slate-500 hover:placeholder:text-slate-600 focus:placeholder:text-slate-600 focus:border-gold focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0f172a] mb-3">
                    Relevant Disciplines
                  </label>
                  <div className="grid gap-2 md:grid-cols-2">
                    {disciplines.map((discipline) => (
                      <label key={discipline} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedDisciplines.includes(discipline)}
                          onChange={() => toggleDiscipline(discipline)}
                          className="rounded border-white/20"
                        />
                        <span className="text-sm text-[#0f172a]">{discipline}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0f172a] mb-2">
                    Submission Deadline
                  </label>
                  <div className="flex items-center gap-3">
                    <Calendar className="size-5 text-gold" />
                    <input
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      className="flex-1 rounded-xs border border-slate-200 bg-white px-4 py-2.5 text-[#0f172a] focus:border-gold focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="rounded-xs bg-gold px-6 py-2.5 font-semibold text-ink transition-colors hover:bg-gold-soft"
                  >
                    Create Call for Papers
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
          <div className="space-y-4">
            {calls.map((call) => {
              const daysUntilDeadline = Math.ceil(
                (new Date(call.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
              )
              return (
                <div
                  key={call.id}
                  className="rounded-xs border border-slate-200 bg-white p-6"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-serif text-lg font-semibold text-[#0f172a] mb-1">
                        {call.title}
                      </h3>
                      <p className="text-sm text-slate-600 mb-2">{call.journal}</p>
                      <p className="text-sm leading-relaxed text-slate-100 line-clamp-2">
                        {call.scope}
                      </p>
                    </div>
                    <div className={`rounded-xs px-3 py-1.5 text-sm font-medium ${getStatusColor(call.status)}`}>
                      {call.status.charAt(0).toUpperCase() + call.status.slice(1)}
                    </div>
                  </div>

                  <div className="mb-4 flex flex-wrap gap-2">
                    {call.disciplines.map((discipline) => (
                      <span
                        key={discipline}
                        className="rounded-xs bg-jade/20 px-2.5 py-1 text-xs font-medium text-jade"
                      >
                        {discipline}
                      </span>
                    ))}
                  </div>

                  <div className="mb-4 flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Calendar className="size-4" />
                      <span>
                        Deadline: {new Date(call.deadline).toLocaleDateString()} ({daysUntilDeadline} days)
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button className="flex items-center gap-2 flex-1 rounded-xs border border-slate-200 px-4 py-2 text-sm font-medium text-[#0f172a] transition-colors hover:bg-white/5">
                      <Edit2 className="size-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCFP(call.id)}
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
