import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Globe, BookOpen, Users, Zap, ArrowRight } from "lucide-react"

export const metadata = {
  title: "About EmpiricalOpen",
  description: "Learn about EmpiricalOpen's mission to democratize access to African research.",
}

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero section */}
        <section className="bg-background border-b border-line">
          <div className="mx-auto max-w-[1180px] px-6 py-16 md:px-8 md:py-24">
            <div className="max-w-3xl">
              <h1 className="font-serif text-4xl font-bold text-gold md:text-5xl mb-6">
                About EmpiricalOpen
              </h1>
              <p className="text-lg text-text-soft leading-relaxed mb-8">
                EmpiricalOpen is an open-access aggregator that brings African research to the world. 
                We partner with universities and research institutions across Africa to make their peer-reviewed 
                research discoverable, accessible, and integrated into the global academic conversation.
              </p>
            </div>
          </div>
        </section>

        {/* Mission section */}
        <section className="border-b border-line">
          <div className="mx-auto max-w-[1180px] px-6 py-14 md:px-8 md:py-20">
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <h2 className="font-serif text-2xl font-bold text-gold mb-4">Our Mission</h2>
                <p className="text-text-soft leading-relaxed mb-6">
                  We believe African research deserves a global stage. By aggregating journals hosted by 
                  African universities and research institutions into a single, searchable platform, we're 
                  democratizing access to knowledge and amplifying African voices in academia.
                </p>
                <p className="text-text-soft leading-relaxed">
                  Our vision is to create a sustainable infrastructure that allows universities to maintain 
                  editorial independence while gaining visibility in the global research ecosystem.
                </p>
              </div>
              <div className="space-y-6">
                <div className="rounded-xs border border-white/10 bg-paper p-6">
                  <Globe className="h-8 w-8 text-jade mb-3" />
                  <h3 className="font-semibold text-ink mb-2">Global Reach</h3>
                  <p className="text-sm text-ink-soft">
                    Making African research discoverable across the world while supporting local research communities.
                  </p>
                </div>
                <div className="rounded-xs border border-white/10 bg-paper p-6">
                  <BookOpen className="h-8 w-8 text-gold mb-3" />
                  <h3 className="font-semibold text-ink mb-2">Open Access</h3>
                  <p className="text-sm text-ink-soft">
                    All indexed content is freely accessible, removing barriers to knowledge dissemination.
                  </p>
                </div>
                <div className="rounded-xs border border-white/10 bg-paper p-6">
                  <Users className="h-8 w-8 text-rust mb-3" />
                  <h3 className="font-semibold text-ink mb-2">Community-Driven</h3>
                  <p className="text-sm text-ink-soft">
                    Built with university partners to ensure the platform meets real research community needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About company section */}
        <section className="border-b border-line">
          <div className="mx-auto max-w-[1180px] px-6 py-14 md:px-8 md:py-20">
            <h2 className="font-serif text-2xl font-bold text-gold mb-8">Powered by Midach Academic Support Services Ltd</h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <p className="text-text-soft leading-relaxed mb-6">
                  EmpiricalOpen is a product of <span className="text-gold font-semibold">Midach Academic Support Services Ltd</span>, 
                  a company dedicated to supporting academic institutions across Africa in achieving global research visibility.
                </p>
                <p className="text-text-soft leading-relaxed mb-6">
                  With expertise in academic technology, research infrastructure, and open-access principles, Midach has built 
                  EmpiricalOpen as a sustainable platform that universities can depend on for decades to come.
                </p>
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-jade" />
                  <p className="text-sm text-jade font-medium">
                    Supporting African research excellence since 2024
                  </p>
                </div>
              </div>
              <div className="rounded-xs bg-paper-raised p-8">
                <h3 className="font-serif text-lg font-semibold text-ink mb-4">Our Values</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span className="text-gold font-bold">✓</span>
                    <span className="text-ink-soft"><span className="text-ink font-semibold">Accessibility:</span> Free access to African research for all</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gold font-bold">✓</span>
                    <span className="text-ink-soft"><span className="text-ink font-semibold">Equity:</span> Supporting researchers from all African regions</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gold font-bold">✓</span>
                    <span className="text-ink-soft"><span className="text-ink font-semibold">Quality:</span> Peer-reviewed research only</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gold font-bold">✓</span>
                    <span className="text-ink-soft"><span className="text-ink font-semibold">Sustainability:</span> Long-term infrastructure for universities</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gold font-bold">✓</span>
                    <span className="text-ink-soft"><span className="text-ink font-semibold">Independence:</span> Universities retain full editorial control</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="bg-paper-raised">
          <div className="mx-auto max-w-[1180px] px-6 py-14 md:px-8 md:py-20">
            <div className="rounded-xs bg-gradient-to-r from-ink to-ink/80 p-12 text-center border border-gold/20">
              <h2 className="font-serif text-2xl font-bold text-gold mb-4">Ready to Join the Network?</h2>
              <p className="text-text-soft mb-8 max-w-2xl mx-auto">
                If you represent a university or research institution with a journal you'd like to make globally discoverable, 
                we'd love to partner with you.
              </p>
              <Link
                href="/host-your-journal"
                className="inline-flex items-center gap-2 rounded-xs bg-gold px-6 py-3 font-semibold text-ink transition-colors hover:bg-gold-soft"
              >
                Learn About Hosting <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
