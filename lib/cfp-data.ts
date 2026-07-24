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

export const callsForPapersDetail: CFPDetail[] = [
  {
    id: "cfp-001",
    journal: "West African Journal of Public Health",
    journalId: "wa-public-health",
    title: "Special Issue: Climate-Sensitive Disease Surveillance",
    scope:
      "Original research and reviews on climate-linked infectious disease patterns across West African health systems.",
    fullDescription: `This special issue seeks manuscripts exploring how climate variability influences disease surveillance systems and epidemiological patterns across West Africa. We welcome original research, systematic reviews, and methodological innovations that advance our understanding of climate-sensitive diseases in African contexts.

Topics of interest include (but are not limited to):
• Vector-borne disease dynamics under changing rainfall and temperature
• Seasonal forecasting for disease outbreak prevention
• Integration of climate data into public health surveillance
• Health systems adaptation to climate variability
• Community-based early warning systems

Submissions from early-career researchers and scholars based in Africa are strongly encouraged.`,
    daysLeft: 9,
    closes: "Closes 24 Jul 2026",
    closesDate: "2026-07-24",
    progress: 88,
    urgent: true,
    disciplines: ["Public Health", "Environmental Studies"],
    guidelines: [
      "Manuscripts should be 5,000-8,000 words",
      "Include structured abstract (250-300 words)",
      "Submit in English or French",
      "Follow ICMJE guidelines for authorship",
      "Open access publication at no APC"
    ],
    ojsLink: "https://ojs.wajph.org/index.php/submissions",
    contactEmail: "editorial@wajph.org",
    submissionsCount: 12,
  },
  {
    id: "cfp-002",
    journal: "Journal of Sahel Agricultural Sciences",
    journalId: "sahel-agriculture",
    title: "Soil Health & Smallholder Resilience",
    scope:
      "Seeking field studies and modelling work on soil microbiome interventions for smallholder farming systems.",
    fullDescription: `Sustainable intensification in the Sahel requires approaches that enhance soil health while maintaining economic viability for smallholder farmers. This special issue highlights innovations in soil science, agroecology, and agricultural technology that improve soil quality and crop resilience.

We welcome:
• Field trials of soil amendment strategies
• Modeling studies on soil-water-crop interactions
• Farmer participatory research outcomes
• Indigenous knowledge integrated with science
• Cost-benefit analyses of soil interventions

Manuscripts should address real-world applicability and scalability for African farming communities.`,
    daysLeft: 41,
    closes: "Closes 25 Aug 2026",
    closesDate: "2026-08-25",
    progress: 38,
    urgent: false,
    disciplines: ["Agricultural Sciences", "Environmental Studies"],
    guidelines: [
      "Article length: 4,500-7,500 words",
      "Include methods and reproducibility information",
      "Data availability statement required",
      "Figures and tables should be publication-ready",
      "No submission fee"
    ],
    ojsLink: "https://ojs.jsas.org/submit",
    contactEmail: "submissions@jsas.org",
    submissionsCount: 8,
  },
  {
    id: "cfp-003",
    journal: "Nigerian Journal of Computational Engineering",
    journalId: "nigerian-computing",
    title: "AI Applications in Infrastructure Monitoring",
    scope:
      "Papers on machine learning approaches to structural health monitoring in African urban infrastructure.",
    fullDescription: `Infrastructure monitoring is critical to urban safety and sustainability in African cities. This issue focuses on AI and machine learning methods applied to bridge safety, building monitoring, water systems, and energy infrastructure.

Topics include:
• Computer vision for structural assessment
• IoT sensor networks and edge computing
• Anomaly detection in infrastructure systems
• Predictive maintenance algorithms
• Software systems for integrated monitoring
• Case studies from African infrastructure projects

We particularly encourage submissions from practitioners and engineers with real-world experience.`,
    daysLeft: 63,
    closes: "Closes 16 Sep 2026",
    closesDate: "2026-09-16",
    progress: 20,
    urgent: false,
    disciplines: ["Engineering", "Education"],
    guidelines: [
      "6,000-9,000 words including appendices",
      "Code/software availability preferred",
      "Datasets should be described and archived",
      "Include validation results",
      "Suitable for practitioners and researchers"
    ],
    ojsLink: "https://ojs.njce.org/submit-manuscript",
    contactEmail: "editor@njce.org",
    submissionsCount: 5,
  },
]

export function getCFPById(id: string): CFPDetail | undefined {
  return callsForPapersDetail.find((cfp) => cfp.id === id)
}

export function getAllCFPs(): CFPDetail[] {
  return callsForPapersDetail
}
