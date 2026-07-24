export type CommentReply = {
  id: string
  authorName: string
  authorAffiliation: string
  authorInitials: string
  authorColor: 'jade' | 'gold' | 'rust'
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
  authorColor: 'jade' | 'gold' | 'rust'
  text: string
  timestamp: string
  likes: number
  verified: boolean
  replies: CommentReply[]
}

export const discussionComments: Comment[] = [
  {
    id: 'comment-001',
    articleId: 'article-001',
    articleTitle: 'Predicting flood risk in the Niger Delta using satellite-derived rainfall models',
    authorName: 'Dr. Amaka Obi',
    authorAffiliation: 'University of Port Harcourt',
    authorInitials: 'AO',
    authorColor: 'jade',
    text: 'Would be useful to see how this model performs against the 2022 flood data specifically — that was an outlier year for rainfall intensity in the Delta. The satellite resolution thresholds seem well-chosen for the Warri plains.',
    timestamp: '2 hours ago',
    likes: 12,
    verified: true,
    replies: [
      {
        id: 'reply-001-001',
        authorName: 'Dr. Chioma Nwankwo',
        authorAffiliation: 'Nigerian Institute of Soil Research',
        authorInitials: 'CN',
        authorColor: 'gold',
        text: 'Great question, Dr. Obi. We did test against 2022 data in Appendix D — performance degraded about 8% for extreme events, primarily due to cloud cover in that specific season. We\'re planning follow-up work on optical/SAR fusion methods.',
        timestamp: '1 hour ago',
        likes: 8,
        verified: true,
      },
    ],
  },
  {
    id: 'comment-002',
    articleId: 'article-002',
    articleTitle: 'Community health worker networks and maternal mortality reduction in rural Kaduna State',
    authorName: 'Tunde Makinde',
    authorAffiliation: 'Ahmadu Bello University',
    authorInitials: 'TM',
    authorColor: 'gold',
    text: 'Strong dataset. Curious whether CHW attrition rates were tracked as a confounder — that\'s usually the hardest part of sustaining these networks in practice.',
    timestamp: '5 hours ago',
    likes: 24,
    verified: true,
    replies: [
      {
        id: 'reply-002-001',
        authorName: 'Uche N.',
        authorAffiliation: 'Institute of Health & Development Studies',
        authorInitials: 'UN',
        authorColor: 'rust',
        text: 'You\'ve hit on our biggest limitation, Tunde. Attrition data was incomplete in one district — we discuss this in the limitations but it absolutely warrants future work. Mean tenure was 4.2 years across the cohort.',
        timestamp: '4 hours ago',
        likes: 15,
        verified: true,
      },
    ],
  },
  {
    id: 'comment-003',
    articleId: 'article-003',
    articleTitle: 'Financial inclusion and informal savings groups: evidence from Anambra State',
    authorName: 'Hauwa Nasidi',
    authorAffiliation: 'Bayero University Kano',
    authorInitials: 'HN',
    authorColor: 'rust',
    text: 'This maps closely to what we\'re seeing in Kano state. Would love to see a follow-up comparing urban vs. rural adoption rates — the intersection with mobile money seems particularly important.',
    timestamp: '1 day ago',
    likes: 18,
    verified: true,
    replies: [],
  },
  {
    id: 'comment-004',
    articleId: 'article-001',
    articleTitle: 'Predicting flood risk in the Niger Delta using satellite-derived rainfall models',
    authorName: 'Dr. Adeola Oluwaseun',
    authorAffiliation: 'Federal University of Technology Akure',
    authorInitials: 'AO',
    authorColor: 'jade',
    text: 'Excellent use of Sentinel-1 data. Did you consider seasonal groundwater contributions or are rainfall-driven surface flow assumptions sufficient for this region?',
    timestamp: '3 days ago',
    likes: 7,
    verified: true,
    replies: [
      {
        id: 'reply-004-001',
        authorName: 'Dr. Chioma Nwankwo',
        authorAffiliation: 'Nigerian Institute of Soil Research',
        authorInitials: 'CN',
        authorColor: 'gold',
        text: 'Groundwater is captured implicitly through soil saturation state variables — we validate those against GRACE satellite data. For the Niger Delta specifically, surface runoff dominates during peak rainfall, but you\'re right that groundwater dynamics matter for base flow.',
        timestamp: '3 days ago',
        likes: 9,
        verified: true,
      },
    ],
  },
  {
    id: 'comment-005',
    articleId: 'article-002',
    articleTitle: 'Community health worker networks and maternal mortality reduction in rural Kaduna State',
    authorName: 'Dr. Emeka Okafor',
    authorAffiliation: 'University of Abuja',
    authorInitials: 'EO',
    authorColor: 'gold',
    text: 'Impressive cohort design and follow-up rates. How sensitive are your findings to the referral protocol changes that occurred mid-period in one district?',
    timestamp: '4 days ago',
    likes: 5,
    verified: true,
    replies: [],
  },
]

export function getCommentsByArticleId(articleId: string): Comment[] {
  return discussionComments.filter((c) => c.articleId === articleId)
}

export function getAllDiscussionComments(): Comment[] {
  return discussionComments
}
