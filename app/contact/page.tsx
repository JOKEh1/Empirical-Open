"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setFormData({ name: "", email: "", subject: "", message: "" })
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero section */}
        <section className="bg-background border-b border-line">
          <div className="mx-auto max-w-[1180px] px-6 py-16 md:px-8 md:py-24">
            <div className="max-w-3xl">
              <h1 className="font-serif text-4xl font-bold text-gold md:text-5xl mb-6">
                Get in Touch
              </h1>
              <p className="text-lg text-text-soft leading-relaxed">
                Have questions about EmpiricalOpen? Want to host your journal with us? Or just want to say hello? 
                We'd love to hear from you.
              </p>
            </div>
          </div>
        </section>

        {/* Contact content */}
        <section className="border-b border-line">
          <div className="mx-auto max-w-[1180px] px-6 py-14 md:px-8 md:py-20">
            <div className="grid gap-12 md:grid-cols-3">
              {/* Contact info */}
              <div className="space-y-8 md:col-span-1">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Mail className="h-5 w-5 text-gold" />
                    <h3 className="font-semibold text-ink">Email</h3>
                  </div>
                  <p className="text-sm text-text-soft ml-8">
                    <a href="mailto:hello@empiricalopen.org" className="hover:text-gold transition-colors">
                      hello@empiricalopen.org
                    </a>
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Phone className="h-5 w-5 text-jade" />
                    <h3 className="font-semibold text-ink">Phone</h3>
                  </div>
                  <p className="text-sm text-text-soft ml-8">
                    <a href="tel:+234701234567" className="hover:text-jade transition-colors">
                      +234 (0) 701 234 567
                    </a>
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="h-5 w-5 text-rust" />
                    <h3 className="font-semibold text-ink">Office</h3>
                  </div>
                  <p className="text-sm text-text-soft ml-8">
                    Midach Academic Support Services Ltd<br />
                    Lagos, Nigeria
                  </p>
                </div>
              </div>

              {/* Contact form */}
              <div className="md:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-ink mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xs border border-white/10 bg-paper px-4 py-3 text-ink placeholder-text-soft focus:outline-none focus:border-gold transition-colors"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-ink mb-2">Institutional Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xs border border-white/10 bg-paper px-4 py-3 text-ink placeholder-text-soft focus:outline-none focus:border-gold transition-colors"
                      placeholder="your@institution.edu"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-ink mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xs border border-white/10 bg-paper px-4 py-3 text-ink placeholder-text-soft focus:outline-none focus:border-gold transition-colors"
                      placeholder="What is this about?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-ink mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full rounded-xs border border-white/10 bg-paper px-4 py-3 text-ink placeholder-text-soft focus:outline-none focus:border-gold transition-colors resize-none"
                      placeholder="Your message..."
                    />
                  </div>

                  {submitted && (
                    <div className="rounded-xs bg-jade/10 border border-jade/30 px-4 py-3">
                      <p className="text-sm text-jade font-medium">
                        Thank you! Your message has been sent. We'll get back to you soon.
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded-xs bg-gold px-6 py-3 font-semibold text-ink transition-colors hover:bg-gold-soft w-full justify-center"
                  >
                    <Send className="h-4 w-4" />
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
