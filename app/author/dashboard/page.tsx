'use client'

import Link from 'next/link'
import { AuthorLayout } from '@/components/author/author-layout'
import { SubmissionStatusBadge } from '@/components/author/submission-status-badge'
import { getAuthorProfile, getSubmissionStats, type Submission } from '@/lib/author-data'
import { FileText, Download, Eye, Plus } from 'lucide-react'

export default function AuthorDashboard() {
  const profile = getAuthorProfile()
  const stats = getSubmissionStats()

  const statCards = [
    { label: 'Total Submissions', value: stats.total, icon: FileText, color: 'text-gold' },
    { label: 'Under Review', value: stats.underReview, icon: Clock, color: 'text-gold' },
    { label: 'Revisions Needed', value: stats.revisionRequested, icon: AlertCircle, color: 'text-rust' },
    { label: 'Total Downloads', value: stats.totalDownloads, icon: Download, color: 'text-jade' },
  ]

  const recentSubmissions = profile.submissions.slice(0, 5)

  return (
    <AuthorLayout title="Dashboard" showBackButton={false}>
      <div className="space-y-12">
        {/* Profile Section */}
        <div className="rounded-lg border border-white/10 bg-paper-raised p-6">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-gold">Welcome back, {profile.name.split(' ')[0]}</h2>
          <p className="text-sm text-foreground/80">{profile.bio}</p>
          <div className="mt-4 space-y-2">
            <p className="text-xs text-foreground/60">
              <span className="font-medium">ORCID ID:</span> {profile.orcidId}
            </p>
            <p className="text-xs text-foreground/60">
              <span className="font-medium">Institution:</span> {profile.institution}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((card) => {
            const Icon = card.icon
            return (
              <div
                key={card.label}
                className="rounded-lg border border-white/10 bg-paper-raised p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-foreground/70 mb-1">{card.label}</p>
                    <p className="font-serif text-2xl font-semibold text-foreground">
                      {card.value}
                    </p>
                  </div>
                  <Icon className={`h-8 w-8 ${card.color} opacity-60`} />
                </div>
              </div>
            )
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/submit"
            className="flex items-center justify-center gap-2 rounded-xs bg-gold px-6 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-gold-soft"
          >
            <Plus className="h-4 w-4" />
            Submit New Manuscript
          </Link>
          <Link
            href="/author/submissions"
            className="flex items-center justify-center gap-2 rounded-xs border border-white/20 px-6 py-2.5 text-sm font-medium transition-colors hover:border-white/40"
          >
            <FileText className="h-4 w-4" />
            View All Submissions
          </Link>
        </div>

        {/* Recent Submissions */}
        <div>
          <h3 className="mb-6 font-serif text-xl font-semibold text-foreground">
            Recent Submissions
          </h3>
          <div className="space-y-3">
            {recentSubmissions.map((submission: Submission) => (
              <Link
                key={submission.id}
                href={`/author/submissions/${submission.id}`}
                className="group block rounded-lg border border-white/10 bg-paper-raised p-4 transition-colors hover:border-gold/40 hover:bg-white/5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-serif text-sm font-semibold text-foreground group-hover:text-gold transition-colors truncate">
                        {submission.title}
                      </h4>
                      <SubmissionStatusBadge status={submission.status} />
                    </div>
                    <p className="mb-2 text-xs text-foreground/60 line-clamp-2">
                      {submission.abstract}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-foreground/50">
                      <span>{submission.discipline}</span>
                      {submission.submittedAt && (
                        <span>Submitted: {new Date(submission.submittedAt).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 text-right text-xs text-foreground/60 flex-shrink-0">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>{submission.viewCount || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      <span>{submission.downloadCount || 0}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AuthorLayout>
  )
}

import { Clock, AlertCircle } from 'lucide-react'
