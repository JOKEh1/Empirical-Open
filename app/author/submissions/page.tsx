'use client'

import Link from 'next/link'
import { AuthorLayout } from '@/components/author/author-layout'
import { SubmissionStatusBadge } from '@/components/author/submission-status-badge'
import { getAllSubmissions, type Submission } from '@/lib/author-data'
import { Eye, Download, FileText } from 'lucide-react'

export default function AllSubmissions() {
  const submissions = getAllSubmissions()

  return (
    <AuthorLayout title="All Submissions" showBackButton={true}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-foreground/70">
            Showing {submissions.length} submission{submissions.length !== 1 ? 's' : ''}
          </p>
          <Link
            href="/submit"
            className="flex items-center gap-2 rounded-xs bg-gold px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-gold-soft"
          >
            <FileText className="h-4 w-4" />
            Submit New Manuscript
          </Link>
        </div>

        <div className="space-y-3">
          {submissions.map((submission: Submission) => (
            <Link
              key={submission.id}
              href={`/author/submissions/${submission.id}`}
              className="group block rounded-lg border border-white/10 bg-paper-raised p-4 transition-colors hover:border-gold/40 hover:bg-white/5"
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="font-serif text-base font-semibold text-foreground group-hover:text-gold transition-colors">
                      {submission.title}
                    </h3>
                    <SubmissionStatusBadge status={submission.status} />
                  </div>
                  <p className="mb-3 text-sm text-foreground/70 line-clamp-2">
                    {submission.abstract}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-foreground/60 flex-wrap">
                    <span className="inline-flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      {submission.discipline}
                    </span>
                    {submission.submittedAt && (
                      <span>
                        Submitted:{' '}
                        {new Date(submission.submittedAt).toLocaleDateString()}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1">
                      {submission.revisions.length} update
                      {submission.revisions.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 text-xs text-foreground/60 flex-shrink-0">
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
    </AuthorLayout>
  )
}
