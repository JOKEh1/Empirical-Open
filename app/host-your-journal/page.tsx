import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CheckCircle, Globe, Users, Zap, TrendingUp, Shield, ArrowRight } from "lucide-react"

export default function HostYourJournalPage() {
  const benefits = [
    {
      icon: Globe,
      title: "Global Visibility",
      description: "Your research reaches scholars worldwide through our centralized discovery platform.",
      color: "text-jade",
    },
    {
      icon: Users,
      title: "Reader Engagement",
      description: "Access to a community of researchers actively searching for African scholarship.",
      color: "text-gold",
    },
    {
      icon: Zap,
      title: "Automated Harvesting",
      description: "OAI-PMH integration means metadata updates happen automatically—no manual work required.",
      color: "text-rust",
    },
    {
      icon: TrendingUp,
      title: "Usage Analytics",
      description: "Track article downloads, discussions, and citations through your admin dashboard.",
      color: "text-jade",
    },
    {
      icon: Shield,
      title: "Complete Independence",
      description: "You retain full editorial control. We never modify your content or policies.",
      color: "text-gold",
    },
    {
      icon: CheckCircle,
      title: "Zero Cost Integration",
      description: "Free to join. No fees, no hidden costs. Just global reach for your research.",
      color: "text-rust",
    },
  ]

  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero section */}
        <section className="bg-background border-b border-line">
          <div className="mx-auto max-w-[1180px] px-6 py-16 md:px-8 md:py-24">
            <div className="max-w-3xl">
              <h1 className="font-serif text-4xl font-bold text-gold md:text-5xl mb-6">
                Host Your Journal with EmpiricalOpen
              </h1>
              <p className="text-lg text-text-soft leading-relaxed mb-8">
                Give your university's research global visibility. Join the network of African publishers 
                making peer-reviewed scholarship discoverable and accessible.
              </p>
              <Link
                href="/request-integration"
                className="inline-flex items-center gap-2 rounded-xs bg-gold px-6 py-3 font-semibold text-ink transition-colors hover:bg-gold-soft"
              >
                Request Integration <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Benefits section */}
        <section className="border-b border-line">
          <div className="mx-auto max-w-[1180px] px-6 py-14 md:px-8 md:py-20">
            <h2 className="font-serif text-2xl font-bold text-gold mb-12 text-center">Why Join EmpiricalOpen?</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit) => {
                const IconComponent = benefit.icon
                return (
                  <div key={benefit.title} className="rounded-xs border border-white/10 bg-paper p-6">
                    <IconComponent className={`h-8 w-8 ${benefit.color} mb-3`} />
                    <h3 className="font-semibold text-ink mb-2">{benefit.title}</h3>
                    <p className="text-sm text-ink-soft">{benefit.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* How it works section */}
        <section className="border-b border-line">
          <div className="mx-auto max-w-[1180px] px-6 py-14 md:px-8 md:py-20">
            <h2 className="font-serif text-2xl font-bold text-gold mb-12">How It Works</h2>
            <div className="grid gap-12 md:grid-cols-4">
              {[
                { step: 1, title: "Contact Us", desc: "Tell us about your journal and platform" },
                { step: 2, title: "Technical Setup", desc: "Enable OAI-PMH on your OJS or platform" },
                { step: 3, title: "Integration", desc: "We harvest and index your metadata" },
                { step: 4, title: "Launch", desc: "Your research goes global instantly" },
              ].map((item) => (
                <div key={item.step}>
                  <div className="flex items-center justify-center mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold text-ink font-bold text-lg">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="font-semibold text-ink text-center mb-2">{item.title}</h3>
                  <p className="text-sm text-text-soft text-center">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Integration CTA */}
        <section className="border-b border-line">
          <div className="mx-auto max-w-[1180px] px-6 py-14 md:px-8 md:py-20">
            <div className="max-w-2xl rounded-xs border border-white/10 bg-paper p-8 text-center">
              <h2 className="font-serif text-2xl font-bold text-gold mb-3">Ready to join the network?</h2>
              <p className="text-sm text-text-soft mb-6">
                Sign in (or create a free account) to submit your journal's details and OAI-PMH endpoint.
                Our team reviews every request before it goes live.
              </p>
              <Link
                href="/request-integration"
                className="inline-flex items-center gap-2 rounded-xs bg-gold px-6 py-3 font-semibold text-ink transition-colors hover:bg-gold-soft"
              >
                Request Integration <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ section */}
        <section className="bg-paper-raised">
          <div className="mx-auto max-w-[1180px] px-6 py-14 md:px-8 md:py-20">
            <h2 className="font-serif text-2xl font-bold text-gold mb-12">Frequently Asked Questions</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {[
                {
                  q: "What is OAI-PMH?",
                  a: "OAI-PMH (Open Archives Initiative - Protocol for Metadata Harvesting) is a standard protocol for sharing article metadata. Most journal platforms including OJS support it natively.",
                },
                {
                  q: "How quickly will our content appear?",
                  a: "After setup is complete, we harvest new articles every 24 hours. Your content typically appears in search within 48 hours.",
                },
                {
                  q: "What if we use a custom platform?",
                  a: "We can work with custom platforms too! Check our Onboarding Guide for technical details, or contact us for custom solutions.",
                },
                {
                  q: "Do we retain editorial control?",
                  a: "Absolutely. We only aggregate and index your metadata—you maintain complete control over your journal's content and policies.",
                },
                {
                  q: "Is there a cost?",
                  a: "No cost at all. EmpiricalOpen is a free service for African publishers and research institutions.",
                },
                {
                  q: "Can we remove our content?",
                  a: "Yes. You can disable OAI-PMH harvesting at any time, and we'll stop indexing your articles within 48 hours.",
                },
              ].map((faq, i) => (
                <div key={i}>
                  <h3 className="font-semibold text-ink mb-2">{faq.q}</h3>
                  <p className="text-sm text-text-soft">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
