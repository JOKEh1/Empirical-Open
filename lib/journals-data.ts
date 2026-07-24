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
  foundedYear: number
  institution: string
  articlesCount: number
  description: string
  editorInChief: string
  editorialBoard: string[]
  frequency: string
  indexing: string[]
  articles: JournalArticle[]
}

export const disciplines = [
  "All disciplines",
  "Agricultural Sciences",
  "Public Health",
  "Engineering",
  "Education",
  "Social Sciences",
  "Clinical Sciences",
  "Environmental Studies",
]

export const journalsDetail: JournalDetail[] = [
  {
    id: "wa-public-health",
    name: "West African Journal of Public Health",
    initials: "WA",
    discipline: "Public Health",
    foundedYear: 2011,
    institution: "Ahmadu Bello University",
    articlesCount: 1240,
    description:
      "Publishes original research, systematic reviews, and health policy analysis on public health challenges across West Africa, with a focus on maternal and child health, infectious disease, and community health systems. Peer-reviewed, published quarterly.",
    editorInChief: "Prof. Adeyinka Ogunwale",
    editorialBoard: [
      "Dr. Chioma Ejiofor",
      "Dr. Kwame Asante",
      "Dr. Miriam Olanike",
      "Dr. Hassan Abdullahi",
      "Prof. Awa Diallo",
    ],
    frequency: "Quarterly",
    indexing: ["PubMed", "AJOL", "DOAJ", "Google Scholar"],
    articles: [
      {
        id: "article-001",
        title:
          "Community health worker networks and maternal mortality reduction in rural Kaduna State: a five-year cohort analysis",
        authors: "Uche N., Bello F., Olayemi T., et al.",
        abstract:
          "A longitudinal study of 34 primary health centres finds that structured CHW referral networks were associated with a significant reduction in maternal mortality ratios over the study period.",
        publicationDate: "2026-07-12",
        journal: "West African Journal of Public Health",
        journalId: "wa-public-health",
        discipline: "Public Health",
        views: 1240,
        citations: 18,
      },
      {
        id: "article-002",
        title: "Epidemiology of vaccine hesitancy across West African capitals",
        authors: "Amara K., Mensah O., Diallo M., et al.",
        abstract:
          "A cross-sectional survey of 4,800 parents in five West African capitals examines vaccine hesitancy drivers and identifies regional patterns in COVID-19 vaccination uptake.",
        publicationDate: "2026-06-28",
        journal: "West African Journal of Public Health",
        journalId: "wa-public-health",
        discipline: "Public Health",
        views: 890,
        citations: 12,
      },
      {
        id: "article-003",
        title:
          "Water sanitation and stunting in under-five children: mixed methods evidence from urban slums",
        authors: "Okafor B., Mensah-Boateng C., Sani A., et al.",
        abstract:
          "Integrating household surveys, focus groups, and biological sampling, this study quantifies the relationship between water access quality and childhood malnutrition.",
        publicationDate: "2026-05-15",
        journal: "West African Journal of Public Health",
        journalId: "wa-public-health",
        discipline: "Public Health",
        views: 650,
        citations: 8,
      },
    ],
  },
  {
    id: "sahel-agriculture",
    name: "Journal of Sahel Agricultural Sciences",
    initials: "SA",
    discipline: "Agricultural Sciences",
    foundedYear: 2015,
    institution: "Bayero University Kano",
    articlesCount: 860,
    description:
      "Covers agronomy, soil science, and food security research relevant to the Sahel region, including smallholder farming systems, climate adaptation, and agricultural economics. Open access, published three times a year.",
    editorInChief: "Prof. Ibrahim Maiduguri",
    editorialBoard: [
      "Dr. Fatima Hassan",
      "Dr. Abubakar Sani",
      "Dr. Sadiya Garba",
      "Dr. Ousséni Traoré",
      "Dr. Adama Ndiaye",
    ],
    frequency: "Three times per year",
    indexing: ["AJOL", "DOAJ", "Google Scholar", "AGORA"],
    articles: [
      {
        id: "article-004",
        title: "Low-cost water purification using moringa seed extract in peri-urban settlements",
        authors: "Abdulahi Z., Bukhari R., Musa K., et al.",
        abstract:
          "Field trials in three Sahel cities demonstrate that moringa seed-based water treatment offers a low-cost alternative to conventional chlorination, with sustained community adoption in two of three sites.",
        publicationDate: "2026-07-10",
        journal: "Journal of Sahel Agricultural Sciences",
        journalId: "sahel-agriculture",
        discipline: "Agricultural Sciences",
        views: 2840,
        citations: 22,
      },
      {
        id: "article-005",
        title: "Soil microbiome responses to biochar amendments in millet cultivation systems",
        authors: "Adama D., Sow M., Koita S., et al.",
        abstract:
          "Metagenomic analysis reveals significant shifts in soil bacterial communities following biochar incorporation, with positive effects on nitrogen availability and plant biomass.",
        publicationDate: "2026-06-05",
        journal: "Journal of Sahel Agricultural Sciences",
        journalId: "sahel-agriculture",
        discipline: "Agricultural Sciences",
        views: 720,
        citations: 15,
      },
    ],
  },
  {
    id: "nigerian-computing",
    name: "Nigerian Journal of Computational Engineering",
    initials: "NC",
    discipline: "Engineering",
    foundedYear: 2019,
    institution: "University of Nigeria, Nsukka",
    articlesCount: 410,
    description:
      "Focuses on computational methods in civil, structural, and electrical engineering, including machine learning applications in infrastructure monitoring and simulation-based design. Peer-reviewed, published biannually.",
    editorInChief: "Dr. Emeka Nwankwo",
    editorialBoard: [
      "Prof. Okechukwu Onwuka",
      "Dr. Ngozi Okafor",
      "Dr. Ejiro Anebi",
      "Dr. Chinedu Okonkwo",
      "Prof. Peter Alabi",
    ],
    frequency: "Biannually",
    indexing: ["Google Scholar", "DOAJ", "AJOL"],
    articles: [
      {
        id: "article-006",
        title: "Predicting flood risk in the Niger Delta using satellite-derived rainfall models",
        authors: "Adekunle O., Chukwu I., Okafor T., et al.",
        abstract:
          "A machine learning ensemble trained on TRMM satellite data predicts intra-seasonal flood risk with 87% accuracy, providing early warning for vulnerable populations.",
        publicationDate: "2026-07-08",
        journal: "Nigerian Journal of Computational Engineering",
        journalId: "nigerian-computing",
        discipline: "Engineering",
        views: 2110,
        citations: 19,
      },
      {
        id: "article-007",
        title: "Structural health monitoring of high-rise buildings using neural networks",
        authors: "Ezenwoke C., Ikechukwu L., Usman R., et al.",
        abstract:
          "Deep learning models trained on accelerometer arrays demonstrate promising results in real-time damage detection and localization in Lagos-based commercial buildings.",
        publicationDate: "2026-05-20",
        journal: "Nigerian Journal of Computational Engineering",
        journalId: "nigerian-computing",
        discipline: "Engineering",
        views: 580,
        citations: 10,
      },
    ],
  },
  {
    id: "african-dev-econ",
    name: "Journal of African Development Economics",
    initials: "AD",
    discipline: "Social Sciences",
    foundedYear: 2009,
    institution: "University of Ibadan",
    articlesCount: 970,
    description:
      "Publishes empirical and theoretical research on economic development across African economies, with recurring themes in financial inclusion, trade policy, and informal sector economics. Published quarterly.",
    editorInChief: "Prof. Kayode Olayinka",
    editorialBoard: [
      "Prof. Ade Mobolaji",
      "Dr. Folake Adebayo",
      "Dr. Abimbola Fawole",
      "Dr. Kofi Mensah",
      "Prof. Kwesi Botchwey",
    ],
    frequency: "Quarterly",
    indexing: ["EconLit", "JSTOR", "Google Scholar", "DOAJ"],
    articles: [
      {
        id: "article-008",
        title: "Financial inclusion and informal savings groups: evidence from Anambra State",
        authors: "Okafor N., Ejiro M., Chidebere L., et al.",
        abstract:
          "Survey data from 2,100 informal savings groups shows that mobile money integration increases savings accumulation by 34%, with gender-differentiated effects across rural and urban areas.",
        publicationDate: "2026-07-01",
        journal: "Journal of African Development Economics",
        journalId: "african-dev-econ",
        discipline: "Social Sciences",
        views: 1502,
        citations: 25,
      },
    ],
  },
  {
    id: "nigerian-education",
    name: "Nigerian Journal of Educational Research",
    initials: "ER",
    discipline: "Education",
    foundedYear: 2013,
    institution: "Nnamdi Azikiwe University",
    articlesCount: 1105,
    description:
      "Covers pedagogy, curriculum development, and education policy research within Nigerian and broader African schooling contexts, including recent work on AI-assisted teaching methods. Published quarterly.",
    editorInChief: "Prof. Raji Olumide",
    editorialBoard: [
      "Dr. Olayinka Adebayo",
      "Dr. Chiamaka Okonkwo",
      "Dr. Ayo Okafor",
      "Prof. Victor Igwe",
      "Dr. Abimbola Adeyemi",
    ],
    frequency: "Quarterly",
    indexing: ["ERIC", "Google Scholar", "AJOL", "DOAJ"],
    articles: [
      {
        id: "article-009",
        title: "Teacher self-efficacy and AI-assisted lesson planning in secondary schools",
        authors: "Okafor A., Onwuegbuzie N., Chidubem K., et al.",
        abstract:
          "A mixed-methods study of 45 secondary teachers using AI-powered lesson planning tools shows significant improvements in student engagement and learning outcomes.",
        publicationDate: "2026-07-02",
        journal: "Nigerian Journal of Educational Research",
        journalId: "nigerian-education",
        discipline: "Education",
        views: 1760,
        citations: 20,
      },
    ],
  },
  {
    id: "clinical-sciences",
    name: "Journal of Clinical Sciences, Enugu",
    initials: "CS",
    discipline: "Clinical Sciences",
    foundedYear: 2017,
    institution: "University of Nigeria Teaching Hospital",
    articlesCount: 690,
    description:
      "A clinical and biomedical research journal publishing case studies, clinical trials, and diagnostic research from teaching hospitals across the region. Peer-reviewed, published biannually.",
    editorInChief: "Prof. Chinedu Okafor",
    editorialBoard: [
      "Dr. Nkemdilim Anyanwu",
      "Dr. Emeka Mbakwem",
      "Dr. Chioma Ezeoke",
      "Dr. Ikechukwu Onuaguluchi",
      "Prof. Ifeanyi Enwerem",
    ],
    frequency: "Biannually",
    indexing: ["Google Scholar", "AJOL", "PubMed Central"],
    articles: [
      {
        id: "article-010",
        title: "Efficacy of artemisinin-based combination therapy in malaria-TB co-infection",
        authors: "Mbakwem E., Eze C., Okafor C., et al.",
        abstract:
          "A 24-week randomized controlled trial in 180 co-infected patients shows improved treatment outcomes with adjusted dosing protocols.",
        publicationDate: "2026-06-15",
        journal: "Journal of Clinical Sciences, Enugu",
        journalId: "clinical-sciences",
        discipline: "Clinical Sciences",
        views: 420,
        citations: 7,
      },
    ],
  },
  {
    id: "east-african-env",
    name: "East African Journal of Environmental Studies",
    initials: "EN",
    discipline: "Environmental Studies",
    foundedYear: 2020,
    institution: "University of Nairobi",
    articlesCount: 520,
    description:
      "Publishes research on environmental science, conservation, and climate policy across East Africa, including biodiversity studies and natural resource management. Open access, published three times a year.",
    editorInChief: "Dr. Peter Kipchoge",
    editorialBoard: [
      "Prof. Grace Kariuki",
      "Dr. Samuel Ochieng",
      "Dr. Jane Wangari",
      "Dr. David Kiplagat",
      "Prof. Josphine Mwangi",
    ],
    frequency: "Three times per year",
    indexing: ["Google Scholar", "DOAJ", "AJOL"],
    articles: [
      {
        id: "article-011",
        title: "Biodiversity loss and ecosystem services in the East African highlands",
        authors: "Kipchoge P., Kariuki G., Ochieng S., et al.",
        abstract:
          "Meta-analysis of 120 studies quantifies the relationship between habitat loss and reduced pollination services across elevation gradients.",
        publicationDate: "2026-07-05",
        journal: "East African Journal of Environmental Studies",
        journalId: "east-african-env",
        discipline: "Environmental Studies",
        views: 680,
        citations: 11,
      },
    ],
  },
]

export function getJournalById(id: string): JournalDetail | undefined {
  return journalsDetail.find((j) => j.id === id)
}

export function getArticleById(id: string): JournalArticle | undefined {
  for (const journal of journalsDetail) {
    const article = journal.articles.find((a) => a.id === id)
    if (article) return article
  }
  return undefined
}

export function filterJournalsByDiscipline(discipline: string): JournalDetail[] {
  if (discipline === "All disciplines") return journalsDetail
  return journalsDetail.filter((j) => j.discipline === discipline)
}
