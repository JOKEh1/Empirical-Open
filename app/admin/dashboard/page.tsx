'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { AdminLoading } from '@/components/admin/admin-loading'
import { AnnouncementsManager } from '@/components/admin/announcements-manager'
import { BookOpen, Users, FileText, TrendingUp } from 'lucide-react'
import { getCurrentUser } from '@/lib/auth'
import { createClient } from '@/lib/supabase/client'
import { getAdminStats, getRecentActivity, type AdminStats, type ActivityItem } from '@/lib/queries/admin'

const toneDot: Record<ActivityItem['tone'], string> = {
  jade: 'bg-jade',
  gold: 'bg-gold',
  rust: 'bg-rust',
}

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const min = Math.floor(diffMs / 60000)
  if (min < 1) return 'just now'
  if (min < 60) return `${min} minute${min === 1 ? '' : 's'} ago`
  const hr = Math.floor(min / 60)
  if (hr < 24) return `${hr} hour${hr === 1 ? '' : 's'} ago`
  const day = Math.floor(hr / 24)
  return `${day} day${day === 1 ? '' : 's'} ago`
}

export default function AdminDashboard() {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [activity, setActivity] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)

  const loadData = useCallback(async () => {
    setLoading(true)
    const supabase = createClient()
    const [statsData, activityData] = await Promise.all([
      getAdminStats(supabase),
      getRecentActivity(supabase, 8),
    ])
    setStats(statsData)
    setActivity(activityData)
    setLoading(false)
  }, [])

  useEffect(() => {
    // UX guard only; middleware.ts enforces this server-side.
    let cancelled = false
    getCurrentUser().then((user) => {
      if (cancelled) return
      if (!user) {
        router.push('/login?redirect=/admin/dashboard')
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

  if (!ready) return <AdminLoading />

  const syncHealthLabel =
    stats && stats.syncableJournals > 0
      ? `${Math.round((stats.syncedJournals / stats.syncableJournals) * 100)}%`
      : '—'
  const syncHealthDetail =
    stats && stats.syncableJournals > 0
      ? `OAI-PMH: ${stats.syncedJournals}/${stats.syncableJournals} synced`
      : 'No journals configured for sync yet'

  const statCards = stats
    ? [
        {
          label: 'Active Journals',
          value: String(stats.activeJournals),
          change: `${stats.pendingIntegrationRequests} pending request${stats.pendingIntegrationRequests === 1 ? '' : 's'}`,
          icon: BookOpen,
          color: 'text-jade',
        },
        {
          label: 'Open Calls',
          value: String(stats.openCalls),
          change: `${stats.closedCalls} closed`,
          icon: FileText,
          color: 'text-gold',
        },
        {
          label: 'Registered Users',
          value: stats.totalUsers.toLocaleString(),
          change: `${stats.adminUsers} admin${stats.adminUsers === 1 ? '' : 's'}`,
          icon: Users,
          color: 'text-rust',
        },
        {
          label: 'Network Health',
          value: syncHealthLabel,
          change: syncHealthDetail,
          icon: TrendingUp,
          color: 'text-jade',
        },
      ]
    : []

  return (
    <div className="flex h-screen bg-[#faf9f6]">
      <AdminSidebar />

      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-6xl px-8 py-10">
          {/* Header */}
          <div className="mb-10">
            <h1 className="font-serif text-3xl font-semibold text-[#0f172a] mb-2">
              Admin Dashboard
            </h1>
            <p className="text-slate-600">
              Manage journals, calls for papers, and network operations
            </p>
          </div>

          {/* Stats Grid */}
          <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {loading ? (
              <p className="text-sm text-text-soft">Loading stats…</p>
            ) : (
              statCards.map((stat) => {
                const Icon = stat.icon
                return (
                  <div
                    key={stat.label}
                    className="rounded-xs border border-white/10 bg-paper-raised/50 p-6 backdrop-blur"
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <p className="text-sm text-text-soft">{stat.label}</p>
                        <p className="mt-2 font-serif text-3xl font-semibold text-paper">
                          {stat.value}
                        </p>
                      </div>
                      <Icon className={`size-6 ${stat.color}`} />
                    </div>
                    <p className="text-xs text-text-soft">{stat.change}</p>
                  </div>
                )
              })
            )}
          </div>

          {/* Quick Actions */}
          <div className="mb-12">
            <h2 className="font-serif text-xl font-semibold text-[#0f172a] mb-6">
              Quick Actions
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Link
                href="/admin/journals"
                className="group rounded-xs border border-slate-200 bg-white p-6 transition-all hover:border-gold/50 hover:bg-paper-raised"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-paper group-hover:text-gold">
                      Review Journal Registry
                    </h3>
                    <p className="mt-2 text-sm text-text-soft">
                      Approve or reject integration requests, manage active journals
                    </p>
                  </div>
                  <BookOpen className="size-5 text-slate-600 group-hover:text-gold" />
                </div>
              </Link>

              <Link
                href="/admin/calls"
                className="group rounded-xs border border-slate-200 bg-white p-6 transition-all hover:border-gold/50 hover:bg-paper-raised"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-[#0f172a] group-hover:text-gold">
                      Create Special Issue
                    </h3>
                    <p className="mt-2 text-sm text-slate-600">
                      Manage calls for papers and set submission deadlines
                    </p>
                  </div>
                  <FileText className="size-5 text-slate-600 group-hover:text-gold" />
                </div>
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mb-12">
            <h2 className="font-serif text-xl font-semibold text-paper mb-6">
              Recent Activity
            </h2>
            <div className="space-y-3 rounded-xs border border-white/10 bg-paper-raised/50 p-6">
              {loading ? (
                <p className="text-sm text-text-soft">Loading…</p>
              ) : activity.length === 0 ? (
                <p className="text-sm text-text-soft">No recent activity yet.</p>
              ) : (
                activity.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-3 border-b border-white/5 last:border-0"
                  >
                    <div>
                      <p className="text-sm text-paper">{item.label}</p>
                      <p className="text-xs text-text-soft mt-1">{timeAgo(item.timestamp)}</p>
                    </div>
                    <div className={`flex size-2 rounded-full ${toneDot[item.tone]}`} />
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Announcements */}
          <AnnouncementsManager />
        </div>
      </main>
    </div>
  )
}
