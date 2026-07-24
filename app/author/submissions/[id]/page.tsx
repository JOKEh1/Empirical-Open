'use client'

import { getSubmission } from '@/lib/author-data'
import { SubmissionStatusBadge } from '@/components/author/submission-status-badge'
import { AuthorLayout } from '@/components/author/author-layout'
import Link from 'next/link'
import {
  Download,
  FileText,
  User,
  Tag,
  Calendar,
  Eye,
  AlertCircle,
  CheckCircle,
  Clock,
} from 'lucide-react'
import { notFound } from 'next/navigation'

export default async function SubmissionDetails({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const submission = getSubmission(id)

  if (!submission) {
    notFound()
  }

  const getRevisionIcon = (type: string) => {
    switch (type) {
      case 'review':
        return <FileText className="h-4 w-4" />
      case 'action-required':
        return <AlertCircle className="h-4 w-4" />
      case 'status-update':
        return <Clock className="h-4 w-4" />
      default:
        return <CheckCircle className="h-4 w-4" />
    }
  }

  const getRevisionColor = (type: string) => {
    switch (type) {
      case 'review':
        return 'text-foreground/70'
      case 'action-required':
        return 'text-rust'
      case 'status-update':
        return 'text-gold'
      default:
        return 'text-jade'
    }
  }

  const formatFileSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024)
    return mb.toFixed(2) + ' MB'
  }

  return (
    <AuthorLayout title={submission.title} showBackButton={true}>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="rounded-lg border border-white/10 bg-paper-raised p-6">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="font-serif text-2xl font-semibold text-foreground mb-3">
                {submission.title}
              </h1>
              <div className="flex items-center gap-3">
                <SubmissionStatusBadge status={submission.status} />
                <span className="text-xs text-foreground/60 flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  {submission.discipline}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-6 grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
            <div>
              <p className="text-xs text-foreground/70 mb-1">Views</p>
              <p className="flex items-center gap-2 font-serif text-lg font-semibold text-gold">
                <Eye className="h-4 w-4" />
                {submission.viewCount || 0}
              </p>
            </div>
            <div>
              <p className="text-xs text-foreground/70 mb-1">Downloads</p>
              <p className="flex items-center gap-2 font-serif text-lg font-semibold text-gold">
                <Download className="h-4 w-4" />
                {submission.downloadCount || 0}
              </p>
            </div>
            <div>
              <p className="text-xs text-foreground/70 mb-1">Submitted</p>
              <p className="text-sm font-medium text-foreground">
                {submission.submittedAt
                  ? new Date(submission.submittedAt).toLocaleDateString()
                  : 'Draft'}
              </p>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-8">
            {/* Abstract */}
            <div className="rounded-lg border border-white/10 bg-paper-raised p-6">
              <h2 className="mb-4 font-serif text-lg font-semibold text-foreground">
                Abstract
              </h2>
              <p className="text-sm leading-relaxed text-foreground/80">
                {submission.abstract}
              </p>
            </div>

            {/* Keywords */}
            <div className="rounded-lg border border-white/10 bg-paper-raised p-6">
              <h2 className="mb-4 font-serif text-lg font-semibold text-foreground">
                Keywords
              </h2>
              <div className="flex flex-wrap gap-2">
                {submission.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="inline-flex items-center rounded-full bg-gold/20 px-3 py-1 text-xs font-medium text-gold"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            {/* Revision Timeline */}
            <div className="rounded-lg border border-white/10 bg-paper-raised p-6">
              <h2 className="mb-6 font-serif text-lg font-semibold text-foreground">
                Revision Timeline
              </h2>
              <div className="space-y-6">
                {submission.revisions.map((revision, index) => (
                  <div key={revision.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${
                          revision.type === 'action-required'
                            ? 'bg-rust/20 text-rust'
                            : revision.type === 'review'
                              ? 'bg-foreground/10 text-foreground/70'
                              : 'bg-gold/20 text-gold'
                        }`}
                      >
                        {getRevisionIcon(revision.type)}
                      </div>
                      {index < submission.revisions.length - 1 && (
                        <div className="my-2 h-12 w-0.5 bg-white/10" />
                      )}
                    </div>
                    <div className="flex-1 pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-medium text-foreground">
                            {revision.title}
                          </p>
                          <p className="mt-1 text-sm text-foreground/70">
                            {revision.message}
                          </p>
                          {revision.reviewer && (
                            <p className="mt-2 text-xs text-foreground/60 flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {revision.reviewer}
                            </p>
                          )}
                        </div>
                      </div>
                      <p className="mt-2 text-xs text-foreground/50">
                        {new Date(revision.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Right Side */}
          <div className="space-y-6">
            {/* Files Section */}
            <div className="rounded-lg border border-white/10 bg-paper-raised p-6">
              <h3 className="mb-4 font-serif text-lg font-semibold text-foreground">
                Files
              </h3>
              {submission.files.length > 0 ? (
                <div className="space-y-2">
                  {submission.files.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-start gap-3 rounded-xs bg-white/5 p-3 border border-white/10"
                    >
                      <FileText className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-foreground truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-foreground/60">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                      <button className="text-gold hover:text-gold-soft transition-colors flex-shrink-0">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-foreground/60">No files uploaded</p>
              )}
            </div>

            {/* Authors Section */}
            <div className="rounded-lg border border-white/10 bg-paper-raised p-6">
              <h3 className="mb-4 font-serif text-lg font-semibold text-foreground">
                Authors
              </h3>
              <div className="space-y-3">
                {submission.authors.map((author) => (
                  <div key={author.id}>
                    <p className="text-sm font-medium text-foreground">
                      {author.name}
                    </p>
                    <p className="text-xs text-foreground/60 flex items-center gap-1 mt-0.5">
                      <User className="h-3 w-3" />
                      {author.orcidId}
                    </p>
                    <p className="text-xs text-foreground/60">{author.email}</p>
                    {author.affiliation && (
                      <p className="text-xs text-foreground/50 mt-1">
                        {author.affiliation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Target Journals */}
            <div className="rounded-lg border border-white/10 bg-paper-raised p-6">
              <h3 className="mb-4 font-serif text-lg font-semibold text-foreground">
                Target Journals
              </h3>
              <div className="space-y-2">
                {submission.targetJournals.map((journalId) => (
                  <Link
                    key={journalId}
                    href={`/journals/${journalId}`}
                    className="block text-xs font-medium text-gold hover:text-gold-soft transition-colors"
                  >
                    {journalId}
                  </Link>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            {submission.status !== 'accepted' && submission.status !== 'rejected' && (
              <div className="space-y-2">
                <button className="w-full rounded-xs bg-gold px-4 py-2.5 text-xs font-semibold text-ink transition-colors hover:bg-gold-soft">
                  Edit Submission
                </button>
                <button className="w-full rounded-xs border border-white/20 px-4 py-2.5 text-xs font-medium transition-colors hover:border-white/40">
                  Download Feedback
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthorLayout>
  )
}
