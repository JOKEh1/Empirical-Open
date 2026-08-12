// Shared view-model types for the real Supabase-backed query layer.
// These intentionally mirror the shapes of the old lib/*-data.ts mock
// modules so presentational components need minimal changes — only the
// data source moves from static arrays to real queries.

export const DISCIPLINES = [
  "All disciplines",
  "Agricultural Sciences",
  "Public Health",
  "Engineering",
  "Education",
  "Social Sciences",
  "Clinical Sciences",
  "Environmental Studies",
] as const

export type Discipline = (typeof DISCIPLINES)[number]

export type JournalArticle = {
  id: string
  title: string
  authors: string
  abstract: string
  publicationDate: string
  journal: string
  journalId: string
  discipline: string
  views: number
  citations: number
}

export type JournalDetail = {
  id: string
  name: string
  initials: string
  discipline: string
  foundedYear: number | null
  institution: string
  articlesCount: number
  description: string
  editorInChief: string
  editorialBoard: string[]
  frequency: string
  indexing: string[]
  articles: JournalArticle[]
}

export type CFPDetail = {
  id: string
  journal: string
  journalId: string
  title: string
  scope: string
  fullDescription: string
  daysLeft: number
  closes: string
  closesDate: string
  progress: number
  urgent: boolean
  disciplines: string[]
  guidelines: string[]
  ojsLink: string
  contactEmail: string
  submissionsCount: number
}

export type CommentReply = {
  id: string
  authorName: string
  authorAffiliation: string
  authorInitials: string
  authorColor: "jade" | "gold" | "rust"
  text: string
  timestamp: string
  likes: number
  verified: boolean
}

export type Comment = {
  id: string
  articleId: string
  articleTitle: string
  authorName: string
  authorAffiliation: string
  authorInitials: string
  authorColor: "jade" | "gold" | "rust"
  text: string
  timestamp: string
  likes: number
  verified: boolean
  replies: CommentReply[]
}

export type AnnouncementItem = {
  id: string
  title: string
  body: string
  source: string
  publishedAt: string
}
