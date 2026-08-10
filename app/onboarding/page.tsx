import Link from "next/link"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export const metadata = {
  title: "Journal Onboarding & Hosting Guide — Empirical Open",
  description:
    "Learn how partner journals can host and increase the visibility of their research on Empirical Open.",
}

const services = [
  "Free metadata and full-text PDF hosting for accepted partner journals.",
  "A dedicated journal homepage with clear publication and editorial information.",
  "Global search indexing so readers can discover your articles across disciplines.",
  "Open-access infrastructure designed to support durable, accessible scholarly communication.",
]

const criteria = [
  "Publishes peer-reviewed original research.",
  "Has a registered eISSN or another verifiable journal identifier.",
  "Maintains an active editorial board with institutional affiliations.",
  "Publishes clear copyright, licensing, and access policies.",
]

const process = [
  "Request the journal application form from the Empirical Open team.",
  "Provide representative back-issue PDFs and the journal's current archive information.",
  "Submit author guidelines, including formatting, submission, and publication requirements.",
  "Detail the journal's peer-review protocols, editorial roles, and decision process.",
]

const resources = [
  { label: "Creative Commons licensing", href: "https://creativecommons.org/licenses/" },
  { label: "COPE publishing ethics", href: "https://publicationethics.org/guidance" },
  { label: "Crossref DOI management", href: "https://www.crossref.org/documentation/" },
  {
    label: "Plagiarism detection best practices",
    href: "https://publicationethics.org/resources/flowcharts/plagiarism-submitted-manuscript",
  },
]

function GuideSection({
  number,
  title,
  children,
}: {
  number: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="border-t border-[#d9d5cc] py-10 md:py-12">
      <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.16em] text-[#64748b]">
        {number}
      </p>
      <h2 className="mb-5 font-serif text-2xl font-semibold text-[#0f172a] md:text-3xl">
        {title}
      </h2>
      {children}
    </section>
  )
}

export default function OnboardingPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#faf9f6] text-[#0f172a]">
        <div className="mx-auto max-w-4xl px-6 py-10 md:px-8 md:py-16">
          <nav aria-label="Breadcrumb" className="mb-12 text-sm text-[#64748b]">
            <Link href="/" className="hover:text-[#0f172a]">
              Home
            </Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <Link href="/about" className="hover:text-[#0f172a]">
              Resources
            </Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-[#0f172a]">Journal Onboarding Guide</span>
          </nav>

          <header className="border-b border-[#d9d5cc] pb-12">
            <p className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.16em] text-[#64748b]">
              Empirical Open resource
            </p>
            <h1 className="max-w-3xl font-serif text-4xl font-semibold leading-tight text-[#0f172a] md:text-5xl">
              Hosting Your Journal on Empirical Open
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#475569]">
              Empirical Open helps partner journals increase the global visibility and digital
              access of their research by connecting scholarly work with readers everywhere.
            </p>
          </header>

          <GuideSection number="01" title="Services Provided to Partner Journals">
            <ul className="list-disc space-y-3 pl-6 leading-relaxed text-[#475569] marker:text-[#c88d2d]">
              {services.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </GuideSection>

          <GuideSection number="02" title="Criteria for Inclusion">
            <ul className="list-disc space-y-3 pl-6 leading-relaxed text-[#475569] marker:text-[#c88d2d]">
              {criteria.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </GuideSection>

          <GuideSection number="03" title="Application & Submission Process">
            <ol className="list-decimal space-y-4 pl-6 leading-relaxed text-[#475569] marker:font-semibold marker:text-[#0f172a]">
              {process.map((item) => <li key={item} className="pl-2">{item}</li>)}
            </ol>
          </GuideSection>

          <GuideSection number="04" title="Publishing Ethics & Resources">
            <p className="mb-5 leading-relaxed text-[#475569]">
              Partner journals should follow transparent, responsible publishing practices. The
              following references provide useful standards and implementation guidance:
            </p>
            <ul className="space-y-3">
              {resources.map((resource) => (
                <li key={resource.href}>
                  <a
                    href={resource.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#0f172a] underline decoration-[#c88d2d] underline-offset-4 hover:text-[#c88d2d]"
                  >
                    {resource.label}
                  </a>
                </li>
              ))}
            </ul>
          </GuideSection>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
