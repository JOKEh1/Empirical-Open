'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { BarChart3, Users, BookOpen, FileText, TrendingUp } from 'lucide-react'
import { isAuthenticated, isAdmin } from '@/lib/auth'

export default function AdminDashboard() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated and is admin
    if (!isAuthenticated()) {
      // Redirect to login with redirect parameter
      router.push('/login?redirect=/admin/dashboard')
    } else if (!isAdmin()) {
      // If authenticated but not admin, redirect to home
      router.push('/')
    }
  }, [])
  const stats = [
    {
      label: 'Total Journals',
      value: '47',
      change: '+2 this month',
      icon: BookOpen,
      color: 'text-jade',
    },
    {
      label: 'Active Calls',
      value: '12',
      change: '+3 pending',
      icon: FileText,
      color: 'text-gold',
    },
    {
      label: 'Registered Users',
      value: '2,847',
      change: '+156 this week',
      icon: Users,
      color: 'text-rust',
    },
    {
      label: 'Network Health',
      value: '98.5%',
      change: 'OAI-PMH: 45/47',
      icon: TrendingUp,
      color: 'text-jade',
    },
  ]

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />

      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-6xl px-8 py-10">
          {/* Header */}
          <div className="mb-10">
            <h1 className="font-serif text-3xl font-semibold text-paper mb-2">
              Admin Dashboard
            </h1>
            <p className="text-text-soft">
              Manage journals, calls for papers, and network operations
            </p>
          </div>

          {/* Stats Grid */}
          <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
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
            })}
          </div>

          {/* Quick Actions */}
          <div className="mb-12">
            <h2 className="font-serif text-xl font-semibold text-paper mb-6">
              Quick Actions
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Link
                href="/admin/journals"
                className="group rounded-xs border border-white/10 bg-paper-raised/50 p-6 transition-all hover:border-gold/50 hover:bg-paper-raised"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-paper group-hover:text-gold">
                      Register New Journal
                    </h3>
                    <p className="mt-2 text-sm text-text-soft">
                      Add OJS journals to the network with OAI-PMH endpoints
                    </p>
                  </div>
                  <BookOpen className="size-5 text-text-soft group-hover:text-gold" />
                </div>
              </Link>

              <Link
                href="/admin/calls"
                className="group rounded-xs border border-white/10 bg-paper-raised/50 p-6 transition-all hover:border-gold/50 hover:bg-paper-raised"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-paper group-hover:text-gold">
                      Create Special Issue
                    </h3>
                    <p className="mt-2 text-sm text-text-soft">
                      Manage calls for papers and set submission deadlines
                    </p>
                  </div>
                  <FileText className="size-5 text-text-soft group-hover:text-gold" />
                </div>
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="font-serif text-xl font-semibold text-paper mb-6">
              Recent Activity
            </h2>
            <div className="space-y-3 rounded-xs border border-white/10 bg-paper-raised/50 p-6">
              <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                <div>
                  <p className="text-sm text-paper">
                    Journal Registry: "Journal of Sahel Agricultural Sciences" verified
                  </p>
                  <p className="text-xs text-text-soft mt-1">2 hours ago</p>
                </div>
                <div className="flex size-2 rounded-full bg-jade" />
              </div>
              <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                <div>
                  <p className="text-sm text-paper">
                    New CFP created: "Climate Change in West Africa" Special Issue
                  </p>
                  <p className="text-xs text-text-soft mt-1">5 hours ago</p>
                </div>
                <div className="flex size-2 rounded-full bg-gold" />
              </div>
              <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                <div>
                  <p className="text-sm text-paper">
                    OAI-PMH health check: 45 of 47 journals responding
                  </p>
                  <p className="text-xs text-text-soft mt-1">1 day ago</p>
                </div>
                <div className="flex size-2 rounded-full bg-jade" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
