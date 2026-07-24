import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CheckCircle, Code, Terminal, Shield } from "lucide-react"

export const metadata = {
  title: "Onboarding Guide — EmpiricalOpen",
  description: "Technical guide for university IT teams on enabling OAI-PMH feeds for journal platforms.",
}

export default function OnboardingPage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero section */}
        <section className="bg-background border-b border-line">
          <div className="mx-auto max-w-[1180px] px-6 py-16 md:px-8 md:py-24">
            <div className="max-w-3xl">
              <h1 className="font-serif text-4xl font-bold text-gold md:text-5xl mb-6">
                Onboarding Guide
              </h1>
              <p className="text-lg text-text-soft leading-relaxed">
                A technical guide for university IT teams explaining how to enable OAI-PMH feeds 
                on OJS and other journal management systems.
              </p>
            </div>
          </div>
        </section>

        {/* Table of contents */}
        <section className="border-b border-line">
          <div className="mx-auto max-w-[1180px] px-6 py-14 md:px-8 md:py-20">
            <h2 className="font-serif text-xl font-bold text-gold mb-8">Quick Navigation</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                "Prerequisites & Requirements",
                "OJS Setup Instructions",
                "Alternative Platforms",
                "Testing Your Feed",
                "Monitoring & Troubleshooting",
                "Security Considerations",
              ].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                  className="rounded-xs border border-white/10 bg-paper p-4 text-ink hover:border-gold/50 transition-colors flex items-center gap-2"
                >
                  <CheckCircle className="h-4 w-4 text-jade flex-shrink-0" />
                  {item}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Prerequisites */}
        <section className="border-b border-line">
          <div className="mx-auto max-w-[1180px] px-6 py-14 md:px-8 md:py-20">
            <h2 id="prerequisites--requirements" className="font-serif text-2xl font-bold text-gold mb-6">
              Prerequisites & Requirements
            </h2>
            <div className="space-y-6">
              <p className="text-text-soft leading-relaxed">
                Before setting up OAI-PMH harvesting for EmpiricalOpen, ensure your system meets the following requirements:
              </p>
              <div className="rounded-xs bg-paper p-6 border border-white/10 space-y-4">
                <div>
                  <h3 className="font-semibold text-ink mb-2 flex items-center gap-2">
                    <Terminal className="h-5 w-5 text-gold" />
                    System Requirements
                  </h3>
                  <ul className="text-sm text-text-soft space-y-2 ml-7">
                    <li>• OJS 3.1 or later (OAI-PMH module enabled)</li>
                    <li>• PHP 7.2+ with cURL support</li>
                    <li>• MySQL 5.7+ or PostgreSQL 10+</li>
                    <li>• At least 500MB free disk space for metadata</li>
                    <li>• Public, stable domain/URL for your journal</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-ink mb-2 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-jade" />
                    Network Requirements
                  </h3>
                  <ul className="text-sm text-text-soft space-y-2 ml-7">
                    <li>• Port 80 (HTTP) and 443 (HTTPS) accessible</li>
                    <li>• SSL certificate installed (HTTPS required)</li>
                    <li>• Firewall configured to allow outbound connections</li>
                    <li>• DNS properly configured for your domain</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OJS Setup */}
        <section className="border-b border-line">
          <div className="mx-auto max-w-[1180px] px-6 py-14 md:px-8 md:py-20">
            <h2 id="ojs-setup-instructions" className="font-serif text-2xl font-bold text-gold mb-6">
              OJS Setup Instructions
            </h2>
            <div className="space-y-8">
              {[
                {
                  step: 1,
                  title: "Enable the OAI-PMH Module",
                  content: `1. Log in as Site Administrator
2. Navigate to Administration → Plugins → Generic Plugins
3. Find "OAI-PMH Plugin" in the list
4. Click "Enable" if not already enabled
5. Verify the plugin shows "Enabled" status`,
                },
                {
                  step: 2,
                  title: "Configure OAI-PMH Settings",
                  content: `1. Go to Administration → Settings → Website
2. Scroll to "OAI-PMH"
3. Set "OAI-PMH repository enabled" to YES
4. Enter your repository name (e.g., "University Journal Repository")
5. Leave "OAI-PMH base URL" at default (auto-generated)
6. Save settings`,
                },
                {
                  step: 3,
                  title: "Verify Your OAI-PMH Endpoint",
                  content: `Navigate to:
https://your-journal-domain.org/index.php/journal-name/oai

You should see XML output. If you see an error, check:
• Your domain is publicly accessible
• HTTPS certificate is valid
• The journal is published/online`,
                },
                {
                  step: 4,
                  title: "Test Basic Endpoint",
                  content: `1. Open your OAI endpoint URL above
2. Add this parameter: ?verb=Identify
3. You should see XML with your repository information
4. If successful, the endpoint is ready for EmpiricalOpen`,
                },
              ].map((section) => (
                <div key={section.step} className="rounded-xs border border-white/10 bg-paper p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-ink font-bold flex-shrink-0">
                      {section.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-ink mb-3">{section.title}</h3>
                      <pre className="text-xs text-text-soft bg-background p-3 rounded-xs overflow-x-auto whitespace-pre-wrap break-words">
                        {section.content}
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Alternative Platforms */}
        <section className="border-b border-line">
          <div className="mx-auto max-w-[1180px] px-6 py-14 md:px-8 md:py-20">
            <h2 id="alternative-platforms" className="font-serif text-2xl font-bold text-gold mb-6">
              Alternative Platforms
            </h2>
            <div className="space-y-8">
              <div className="rounded-xs border border-white/10 bg-paper p-6">
                <h3 className="font-semibold text-ink mb-3 flex items-center gap-2">
                  <Code className="h-5 w-5 text-jade" />
                  WordPress with Journal Plugin
                </h3>
                <p className="text-sm text-text-soft mb-4">
                  For WordPress-based journals, install the "OAI-PMH for Blogs" plugin:
                </p>
                <ul className="text-sm text-text-soft space-y-2 ml-4">
                  <li>1. Install plugin from WordPress.org plugin directory</li>
                  <li>2. Activate the plugin</li>
                  <li>3. Configure in Settings → OAI-PMH</li>
                  <li>4. Access endpoint at: yoursite.com/?oai_pmh</li>
                </ul>
              </div>

              <div className="rounded-xs border border-white/10 bg-paper p-6">
                <h3 className="font-semibold text-ink mb-3 flex items-center gap-2">
                  <Code className="h-5 w-5 text-rust" />
                  Custom Implementations
                </h3>
                <p className="text-sm text-text-soft">
                  For custom journal platforms, you need to implement the OAI-PMH 2.0 protocol. 
                  We recommend:
                </p>
                <ul className="text-sm text-text-soft space-y-2 ml-4 mt-3">
                  <li>• Reference: <span className="text-gold">www.openarchives.org/OAI/openarchivesprotocol.html</span></li>
                  <li>• Your endpoint must support ListIdentifiers and GetRecord verbs</li>
                  <li>• Use Dublin Core metadata format</li>
                  <li>• Contact us for technical assistance: hello@empiricalopen.org</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Testing */}
        <section className="border-b border-line">
          <div className="mx-auto max-w-[1180px] px-6 py-14 md:px-8 md:py-20">
            <h2 id="testing-your-feed" className="font-serif text-2xl font-bold text-gold mb-6">
              Testing Your Feed
            </h2>
            <div className="space-y-6">
              <p className="text-text-soft leading-relaxed">
                Before notifying EmpiricalOpen, test your OAI-PMH endpoint thoroughly:
              </p>
              <div className="rounded-xs bg-paper p-6 border border-white/10 space-y-4">
                <div>
                  <h3 className="font-semibold text-ink mb-3">Test Commands</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gold font-mono mb-1">Test Identify verb:</p>
                      <code className="text-xs bg-background p-2 rounded block text-text-soft overflow-x-auto">
                        curl "https://your-journal.org/oai?verb=Identify"
                      </code>
                    </div>
                    <div>
                      <p className="text-xs text-gold font-mono mb-1">Test ListRecords:</p>
                      <code className="text-xs bg-background p-2 rounded block text-text-soft overflow-x-auto">
                        curl "https://your-journal.org/oai?verb=ListRecords&metadataPrefix=oai_dc"
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xs bg-jade/10 border border-jade/30 px-6 py-4">
                <p className="text-sm text-jade font-medium">
                  ✓ Success: You should receive valid XML with your article metadata. 
                  If you see errors, check your OJS configuration and firewall settings.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Monitoring */}
        <section className="border-b border-line">
          <div className="mx-auto max-w-[1180px] px-6 py-14 md:px-8 md:py-20">
            <h2 id="monitoring--troubleshooting" className="font-serif text-2xl font-bold text-gold mb-6">
              Monitoring & Troubleshooting
            </h2>
            <div className="space-y-6">
              <div className="rounded-xs bg-paper p-6 border border-white/10 space-y-4">
                <div>
                  <h3 className="font-semibold text-ink mb-3">Common Issues</h3>
                  <ul className="text-sm text-text-soft space-y-3 ml-4">
                    <li><strong className="text-ink">403 Forbidden:</strong> Check firewall rules and OAI-PMH module permissions</li>
                    <li><strong className="text-ink">404 Not Found:</strong> Verify OAI-PMH endpoint URL is correct</li>
                    <li><strong className="text-ink">No records returned:</strong> Ensure articles are published in OJS</li>
                    <li><strong className="text-ink">Slow responses:</strong> Check database performance and server load</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-xs bg-paper p-6 border border-white/10">
                <h3 className="font-semibold text-ink mb-3">Maintenance</h3>
                <ul className="text-sm text-text-soft space-y-2 ml-4">
                  <li>• Monitor OAI-PMH endpoint availability weekly</li>
                  <li>• Keep OJS and plugins updated</li>
                  <li>• Review OJS error logs monthly</li>
                  <li>• Ensure SSL certificate is renewed before expiration</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Security */}
        <section className="bg-paper-raised">
          <div className="mx-auto max-w-[1180px] px-6 py-14 md:px-8 md:py-20">
            <h2 id="security-considerations" className="font-serif text-2xl font-bold text-gold mb-6">
              Security Considerations
            </h2>
            <div className="rounded-xs bg-ink border border-gold/20 p-8 space-y-4">
              <p className="text-text-soft">
                OAI-PMH endpoints expose article metadata publicly (by design), but maintain the following security practices:
              </p>
              <ul className="text-sm text-text-soft space-y-3 ml-4">
                <li>✓ Always use HTTPS for your OAI endpoint</li>
                <li>✓ Only expose published article metadata via OAI-PMH</li>
                <li>✓ Keep OJS and all plugins updated</li>
                <li>✓ Monitor access logs for suspicious patterns</li>
                <li>✓ Never expose administrative functions via OAI-PMH</li>
                <li>✓ Consider rate limiting if experiencing abuse</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Support */}
        <section>
          <div className="mx-auto max-w-[1180px] px-6 py-14 md:px-8 md:py-20">
            <div className="rounded-xs bg-paper p-8 text-center border border-white/10">
              <h2 className="font-serif text-xl font-bold text-ink mb-4">Need Technical Support?</h2>
              <p className="text-text-soft mb-6">
                Our technical team is here to help. Contact us with your OAI endpoint URL and we can assist 
                with setup, testing, and troubleshooting.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xs bg-gold px-6 py-3 font-semibold text-ink transition-colors hover:bg-gold-soft"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
