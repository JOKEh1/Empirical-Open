export type SubmissionStatus = 'draft' | 'submitted' | 'under-review' | 'revision-requested' | 'accepted' | 'rejected'

export interface CoAuthor {
  id: string
  name: string
  orcidId: string
  email: string
  affiliation: string
}

export interface SubmissionFile {
  id: string
  name: string
  type: 'manuscript' | 'supplementary' | 'figure'
  size: number
  uploadedAt: string
}

export interface RevisionNote {
  id: string
  date: string
  type: 'review' | 'action-required' | 'status-update'
  title: string
  message: string
  reviewer?: string
}

export interface Submission {
  id: string
  title: string
  abstract: string
  keywords: string[]
  targetJournals: string[]
  discipline: string
  status: SubmissionStatus
  authors: CoAuthor[]
  files: SubmissionFile[]
  submittedAt?: string
  revisions: RevisionNote[]
  viewCount?: number
  downloadCount?: number
}

export interface AuthorProfile {
  id: string
  name: string
  orcidId: string
  institution: string
  email: string
  bio: string
  submissions: Submission[]
}

export const authorProfile: AuthorProfile = {
  id: 'author-001',
  name: 'Dr. Patricia Okonkwo',
  orcidId: '0000-0001-2345-6789',
  institution: 'University of Lagos',
  email: 'p.okonkwo@unilag.edu.ng',
  bio: 'Researcher in public health and epidemiology with focus on infectious diseases in West Africa.',
  submissions: [
    {
      id: 'sub-001',
      title: 'Impact of Climate Change on Vector-Borne Disease Transmission in Sub-Saharan Africa',
      abstract: 'This study examines the relationship between rising temperatures and the geographical distribution of malaria and dengue vectors across sub-Saharan Africa from 2000-2023.',
      keywords: ['climate change', 'malaria', 'dengue', 'vector ecology', 'epidemiology'],
      targetJournals: ['wa-public-health', 'global-epidemiology'],
      discipline: 'Public Health',
      status: 'under-review',
      authors: [
        {
          id: 'auth-001',
          name: 'Dr. Patricia Okonkwo',
          orcidId: '0000-0001-2345-6789',
          email: 'p.okonkwo@unilag.edu.ng',
          affiliation: 'University of Lagos',
        },
        {
          id: 'auth-002',
          name: 'Dr. Jude Ihemedu',
          orcidId: '0000-0002-3456-7890',
          email: 'j.ihemedu@unilag.edu.ng',
          affiliation: 'University of Lagos',
        },
      ],
      files: [
        {
          id: 'file-001',
          name: 'manuscript-v2.pdf',
          type: 'manuscript',
          size: 2500000,
          uploadedAt: '2024-03-15',
        },
        {
          id: 'file-002',
          name: 'supplementary-figures.pdf',
          type: 'supplementary',
          size: 850000,
          uploadedAt: '2024-03-15',
        },
      ],
      submittedAt: '2024-03-15',
      revisions: [
        {
          id: 'rev-001',
          date: '2024-03-15',
          type: 'status-update',
          title: 'Manuscript submitted',
          message: 'Your manuscript has been successfully submitted to the journal.',
        },
        {
          id: 'rev-002',
          date: '2024-04-01',
          type: 'status-update',
          title: 'Under review',
          message: 'Your manuscript has been assigned to reviewers.',
        },
        {
          id: 'rev-003',
          date: '2024-05-10',
          type: 'action-required',
          title: 'Revision requested',
          message: 'The editorial team has reviewed your manuscript and minor revisions are requested.',
          reviewer: 'Dr. Anne Mensah',
        },
      ],
      viewCount: 124,
      downloadCount: 8,
    },
    {
      id: 'sub-002',
      title: 'Sustainable Agricultural Practices for Food Security in Smallholder Farms',
      abstract: 'An empirical study of adoption rates and economic outcomes of climate-smart agriculture techniques among smallholder farmers in Nigeria.',
      keywords: ['agriculture', 'sustainability', 'food security', 'smallholder farms', 'climate-smart'],
      targetJournals: ['agricultural-innovation'],
      discipline: 'Agricultural Science',
      status: 'revision-requested',
      authors: [
        {
          id: 'auth-001',
          name: 'Dr. Patricia Okonkwo',
          orcidId: '0000-0001-2345-6789',
          email: 'p.okonkwo@unilag.edu.ng',
          affiliation: 'University of Lagos',
        },
        {
          id: 'auth-003',
          name: 'Dr. Aminata Diallo',
          orcidId: '0000-0003-4567-8901',
          email: 'a.diallo@unisenegl.edu',
          affiliation: 'Université Cheikh Anta Diop de Dakar',
        },
      ],
      files: [
        {
          id: 'file-003',
          name: 'manuscript-agriculture.pdf',
          type: 'manuscript',
          size: 3100000,
          uploadedAt: '2024-02-20',
        },
      ],
      submittedAt: '2024-02-20',
      revisions: [
        {
          id: 'rev-004',
          date: '2024-02-20',
          type: 'status-update',
          title: 'Manuscript submitted',
          message: 'Your manuscript has been successfully submitted.',
        },
        {
          id: 'rev-005',
          date: '2024-03-15',
          type: 'action-required',
          title: 'Major revisions requested',
          message: 'Please address the following comments from the reviewers and resubmit within 60 days.',
          reviewer: 'Dr. Kwame Asante',
        },
      ],
      viewCount: 89,
      downloadCount: 5,
    },
    {
      id: 'sub-003',
      title: 'Digital Health Interventions for Community Health Workers',
      abstract: 'Evaluating the effectiveness of mobile health applications in improving service delivery by community health workers in rural Nigeria.',
      keywords: ['digital health', 'mHealth', 'community health', 'implementation', 'evaluation'],
      targetJournals: ['wa-public-health'],
      discipline: 'Public Health',
      status: 'draft',
      authors: [
        {
          id: 'auth-001',
          name: 'Dr. Patricia Okonkwo',
          orcidId: '0000-0001-2345-6789',
          email: 'p.okonkwo@unilag.edu.ng',
          affiliation: 'University of Lagos',
        },
      ],
      files: [],
      revisions: [
        {
          id: 'rev-006',
          date: '2024-06-01',
          type: 'status-update',
          title: 'Draft created',
          message: 'Your submission draft has been created.',
        },
      ],
    },
  ],
}

export function getAuthorProfile(): AuthorProfile {
  return authorProfile
}

export function getSubmission(id: string): Submission | undefined {
  return authorProfile.submissions.find((s) => s.id === id)
}

export function getAllSubmissions(): Submission[] {
  return authorProfile.submissions
}

export function getSubmissionsByStatus(status: SubmissionStatus): Submission[] {
  return authorProfile.submissions.filter((s) => s.status === status)
}

export function getSubmissionStats() {
  const submissions = authorProfile.submissions
  return {
    total: submissions.length,
    draft: submissions.filter((s) => s.status === 'draft').length,
    submitted: submissions.filter((s) => s.status === 'submitted').length,
    underReview: submissions.filter((s) => s.status === 'under-review').length,
    revisionRequested: submissions.filter((s) => s.status === 'revision-requested').length,
    accepted: submissions.filter((s) => s.status === 'accepted').length,
    rejected: submissions.filter((s) => s.status === 'rejected').length,
    totalDownloads: submissions.reduce((acc, s) => acc + (s.downloadCount || 0), 0),
    totalViews: submissions.reduce((acc, s) => acc + (s.viewCount || 0), 0),
  }
}
