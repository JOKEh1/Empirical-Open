export const disciplines = [
  "All disciplines",
  "Agricultural Sciences",
  "Public Health",
  "Engineering",
  "Education",
  "Social Sciences",
]

export const heroStats = [
  { num: "47", label: "Journals hosted" },
  { num: "12,300+", label: "Indexed articles" },
  { num: "19", label: "Partner institutions" },
  { num: "6", label: "Open calls this month" },
]

export const editorsPick = {
  discipline: "Editor's Pick · Public Health",
  title:
    "Community health worker networks and maternal mortality reduction in rural Kaduna State: a five-year cohort analysis",
  abstract:
    "A longitudinal study of 34 primary health centres finds that structured CHW referral networks were associated with a significant reduction in maternal mortality ratios over the study period.",
  authors: "Uche N., Bello F., et al.",
  journal: "West African Journal of Public Health",
  issue: "Vol. 12, Issue 2 · 2026",
}

export const trending = [
  {
    rank: "01",
    title:
      "Low-cost water purification using moringa seed extract in peri-urban settlements",
    journal: "Journal of Sahel Agricultural Sciences",
    views: "2,840",
  },
  {
    rank: "02",
    title:
      "Predicting flood risk in the Niger Delta using satellite-derived rainfall models",
    journal: "Nigerian Journal of Computational Engineering",
    views: "2,110",
  },
  {
    rank: "03",
    title: "Teacher self-efficacy and AI-assisted lesson planning in secondary schools",
    journal: "Nigerian Journal of Educational Research",
    views: "1,760",
  },
  {
    rank: "04",
    title: "Financial inclusion and informal savings groups: evidence from Anambra State",
    journal: "Journal of African Development Economics",
    views: "1,502",
  },
]

export const callsForPapers = [
  {
    journal: "West African Journal of Public Health",
    title: "Special Issue: Climate-Sensitive Disease Surveillance",
    scope:
      "Original research and reviews on climate-linked infectious disease patterns across West African health systems.",
    daysLeft: "9 days left",
    closes: "Closes 24 Jul 2026",
    progress: 88,
    urgent: true,
  },
  {
    journal: "Journal of Sahel Agricultural Sciences",
    title: "Soil Health & Smallholder Resilience",
    scope:
      "Seeking field studies and modelling work on soil microbiome interventions for smallholder farming systems.",
    daysLeft: "41 days left",
    closes: "Closes 25 Aug 2026",
    progress: 38,
    urgent: false,
  },
  {
    journal: "Nigerian Journal of Computational Engineering",
    title: "AI Applications in Infrastructure Monitoring",
    scope:
      "Papers on machine learning approaches to structural health monitoring in African urban infrastructure.",
    daysLeft: "63 days left",
    closes: "Closes 16 Sep 2026",
    progress: 20,
    urgent: false,
  },
]

export type Journal = {
  key: string
  init: string
  name: string
  short: string
  stat: string
  fullStat: string
  desc: string
}

export const journals: Journal[] = [
  {
    key: "wa",
    init: "WA",
    name: "West African Journal of Public Health",
    short: "1,240 articles · Est. 2011",
    stat: "1,240 articles · Est. 2011",
    fullStat: "1,240 articles · Est. 2011 · Ahmadu Bello University",
    desc: "Publishes original research, systematic reviews, and health policy analysis on public health challenges across West Africa, with a focus on maternal and child health, infectious disease, and community health systems. Peer-reviewed, published quarterly.",
  },
  {
    key: "sa",
    init: "SA",
    name: "Journal of Sahel Agricultural Sciences",
    short: "860 articles · Est. 2015",
    stat: "860 articles · Est. 2015",
    fullStat: "860 articles · Est. 2015 · Bayero University Kano",
    desc: "Covers agronomy, soil science, and food security research relevant to the Sahel region, including smallholder farming systems, climate adaptation, and agricultural economics. Open access, published three times a year.",
  },
  {
    key: "nc",
    init: "NC",
    name: "Nigerian Journal of Computational Engineering",
    short: "410 articles · Est. 2019",
    stat: "410 articles · Est. 2019",
    fullStat: "410 articles · Est. 2019 · University of Nigeria, Nsukka",
    desc: "Focuses on computational methods in civil, structural, and electrical engineering, including machine learning applications in infrastructure monitoring and simulation-based design. Peer-reviewed, published biannually.",
  },
  {
    key: "ad",
    init: "AD",
    name: "Journal of African Development Economics",
    short: "970 articles · Est. 2009",
    stat: "970 articles · Est. 2009",
    fullStat: "970 articles · Est. 2009 · University of Ibadan",
    desc: "Publishes empirical and theoretical research on economic development across African economies, with recurring themes in financial inclusion, trade policy, and informal sector economics. Published quarterly.",
  },
  {
    key: "er",
    init: "ER",
    name: "Nigerian Journal of Educational Research",
    short: "1,105 articles · Est. 2013",
    stat: "1,105 articles · Est. 2013",
    fullStat: "1,105 articles · Est. 2013 · Nnamdi Azikiwe University",
    desc: "Covers pedagogy, curriculum development, and education policy research within Nigerian and broader African schooling contexts, including recent work on AI-assisted teaching methods. Published quarterly.",
  },
  {
    key: "cs",
    init: "CS",
    name: "Journal of Clinical Sciences, Enugu",
    short: "690 articles · Est. 2017",
    stat: "690 articles · Est. 2017",
    fullStat: "690 articles · Est. 2017 · University of Nigeria Teaching Hospital",
    desc: "A clinical and biomedical research journal publishing case studies, clinical trials, and diagnostic research from teaching hospitals across the region. Peer-reviewed, published biannually.",
  },
  {
    key: "en",
    init: "EN",
    name: "East African Journal of Environmental Studies",
    short: "520 articles · Est. 2020",
    stat: "520 articles · Est. 2020",
    fullStat: "520 articles · Est. 2020 · University of Nairobi",
    desc: "Publishes research on environmental science, conservation, and climate policy across East Africa, including biodiversity studies and natural resource management. Open access, published three times a year.",
  },
]

export const announcements = [
  {
    date: "12 Jul 2026",
    title: "New issue published: Vol. 12, Issue 2",
    body: "Includes 14 articles across maternal health, epidemiology, and health systems research.",
    source: "West African Journal of Public Health",
  },
  {
    date: "08 Jul 2026",
    title: "Now indexed in EmpiricalOpen and applying for DOAJ listing",
    body: "The journal has completed onboarding and joins the network's engineering and computing collection.",
    source: "Nigerian Journal of Computational Engineering",
  },
  {
    date: "02 Jul 2026",
    title: "Editorial board expanded with five new international reviewers",
    body: "New reviewers bring expertise in agroecology, remote sensing, and climate modelling.",
    source: "Journal of Sahel Agricultural Sciences",
  },
  {
    date: "28 Jun 2026",
    title: "Submission portal migrated — old links will redirect automatically",
    body: "Authors with in-progress submissions do not need to take any action.",
    source: "Journal of African Development Economics",
  },
]

export const comments = [
  {
    initials: "AO",
    color: "jade" as const,
    article: 'on "Predicting flood risk in the Niger Delta…"',
    who: "Dr. Amaka Obi",
    affiliation: "University of Port Harcourt",
    text: "Would be useful to see how this model performs against the 2022 flood data specifically — that was an outlier year for rainfall intensity in the Delta.",
  },
  {
    initials: "TM",
    color: "gold" as const,
    article: 'on "Community health worker networks and maternal mortality…"',
    who: "Tunde Makinde",
    affiliation: "Ahmadu Bello University",
    text: "Strong dataset. Curious whether CHW attrition rates were tracked as a confounder — that's usually the hardest part of sustaining these networks.",
  },
  {
    initials: "HN",
    color: "rust" as const,
    article: 'on "Financial inclusion and informal savings groups…"',
    who: "Hauwa Nasidi",
    affiliation: "Bayero University Kano",
    text: "This maps closely to what we're seeing in Kano state. Would love to see a follow-up comparing urban vs. rural adoption rates.",
  },
]
