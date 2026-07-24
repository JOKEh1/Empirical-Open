import { type SubmissionStatus } from '@/lib/author-data'
import { AlertCircle, CheckCircle, Clock, FileText } from 'lucide-react'

interface SubmissionStatusBadgeProps {
  status: SubmissionStatus
}

export function SubmissionStatusBadge({ status }: SubmissionStatusBadgeProps) {
  const statusConfig = {
    draft: {
      label: 'Draft',
      bgColor: 'bg-slate-500/20',
      textColor: 'text-slate-300',
      icon: FileText,
    },
    submitted: {
      label: 'Submitted',
      bgColor: 'bg-jade/20',
      textColor: 'text-jade',
      icon: CheckCircle,
    },
    'under-review': {
      label: 'Under Review',
      bgColor: 'bg-gold/20',
      textColor: 'text-gold',
      icon: Clock,
    },
    'revision-requested': {
      label: 'Revision Requested',
      bgColor: 'bg-rust/20',
      textColor: 'text-rust',
      icon: AlertCircle,
    },
    accepted: {
      label: 'Accepted',
      bgColor: 'bg-jade/20',
      textColor: 'text-jade',
      icon: CheckCircle,
    },
    rejected: {
      label: 'Rejected',
      bgColor: 'bg-rust/20',
      textColor: 'text-rust',
      icon: AlertCircle,
    },
  }

  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${config.bgColor} ${config.textColor}`}>
      <Icon className="h-3.5 w-3.5" />
      {config.label}
    </span>
  )
}
