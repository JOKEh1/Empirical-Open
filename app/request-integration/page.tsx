"use client"

import { FormEvent, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, Mail } from "lucide-react"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { getCurrentUser, type User } from "@/lib/auth"
import { createClient } from "@/lib/supabase/client"

const fields = [
  { id: "journalName", label: "Journal Name", type: "text", required: true },
  { id: "issn", label: "eISSN / ISSN", type: "text", placeholder: "e.g., 2040-0743" },
  { id: "website", label: "Journal / OJS Website URL", type: "url", required: true },
  {
    id: "oaiPmhEndpoint",
    label: "OAI-PMH Endpoint URL",
    type: "url",
    placeholder: "https://your-journal.org/oai",
    required: true,
  },
  { id: "institution", label: "Publishing Institution / University", type: "text" },
  { id: "contact", label: "Contact Person Name & Role", type: "text" },
  { id: "email", label: "Contact Email Address", type: "email", required: true },
]

export default function RequestIntegrationPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [submitted, setSubmitted] = useState(false)
  const [pending, setPending] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [values, setValues] = useState<Record<string, string>>({})

  // UX guard only; middleware.ts enforces this server-side.
  useEffect(() => {
    let cancelled = false
    getCurrentUser().then((u) => {
      if (cancelled) return
      if (!u) {
        router.push("/login?redirect=/request-integration")
        return
      }
      setUser(u)
      setValues((v) => ({ ...v, email: v.email || u.email, contact: v.contact || u.name }))
      setCheckingAuth(false)
    })
    return () => {
      cancelled = true
    }
  }, [router])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)
    if (pending) return

    setPending(true)
    const { error } = await createClient()
      .from("integration_requests")
      .insert({
        journal_name: values.journalName ?? "",
        issn: values.issn ?? "",
        website_url: values.website ?? "",
        oai_pmh_endpoint: values.oaiPmhEndpoint ?? "",
        institution: values.institution ?? "",
        contact_name: values.contact ?? "",
        contact_email: values.email ?? "",
        notes: values.notes ?? "",
      })
    setPending(false)

    if (error) {
      setFormError(error.message)
      return
    }
    setSubmitted(true)
  }

  if (checkingAuth) {
    return (
      <>
        <SiteHeader />
        <main className="min-h-screen bg-[#faf9f6]" />
        <SiteFooter />
      </>
    )
  }

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#faf9f6] text-[#0f172a]">
        <div className="mx-auto max-w-3xl px-6 py-12 md:px-8 md:py-20">
          <Link
            href="/onboarding"
            className="mb-10 inline-flex items-center gap-2 text-sm text-[#475569] transition-colors hover:text-[#0f172a]"
          >
            <ArrowLeft className="size-4" />
            Journal onboarding guide
          </Link>

          <header className="mb-10">
            <p className="mb-4 inline-flex rounded-full border border-[#d97706]/30 bg-[#fff7ed] px-3 py-1 font-mono text-xs font-medium uppercase tracking-[0.14em] text-[#b45309]">
              Partner with Empirical Open
            </p>
            <h1 className="max-w-2xl font-serif text-4xl font-semibold leading-tight text-[#0f172a] md:text-5xl">
              Apply for Journal Integration
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#475569]">
              Submit your journal's OJS and OAI-PMH details to join our open-access discovery network and increase your publication&apos;s global visibility.
            </p>
            {user && (
              <p className="mt-3 text-sm text-[#64748b]">
                Signed in as <span className="font-medium text-[#0f172a]">{user.email}</span>
              </p>
            )}
          </header>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
            {submitted ? (
              <div className="py-10 text-center">
                <CheckCircle2 className="mx-auto size-12 text-[#b45309]" />
                <h2 className="mt-5 font-serif text-2xl font-semibold text-[#0f172a]">Request received</h2>
                <p className="mx-auto mt-3 max-w-md leading-relaxed text-[#475569]">
                  Thank you for sharing your journal details. Our editorial board reviews requests within 3-5 business days.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false)
                    setValues({ email: user?.email ?? "", contact: user?.name ?? "" })
                  }}
                  className="mt-6 text-sm font-semibold text-[#b45309] underline underline-offset-4"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                {formError && (
                  <p className="rounded-md border border-rust/40 bg-rust/10 px-3 py-2.5 text-sm text-rust">
                    {formError}
                  </p>
                )}
                {fields.map((field) => (
                  <div key={field.id} className="flex flex-col gap-2">
                    <label htmlFor={field.id} className="text-sm font-semibold text-[#0f172a]">
                      {field.label}{field.required ? " *" : ""}
                    </label>
                    <input
                      id={field.id}
                      name={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      required={field.required}
                      value={values[field.id] ?? ""}
                      onChange={(e) => setValues((v) => ({ ...v, [field.id]: e.target.value }))}
                      className="h-11 rounded-md border border-slate-300 bg-white px-3 text-sm text-[#0f172a] outline-none transition-colors placeholder:text-[#94a3b8] focus:border-[#d97706] focus:ring-2 focus:ring-[#d97706]/20"
                    />
                    {field.id === "oaiPmhEndpoint" && (
                      <p className="text-xs text-[#64748b]">
                        The OAI-PMH endpoint we'll harvest article metadata from once approved.
                      </p>
                    )}
                  </div>
                ))}

                <div className="flex flex-col gap-2">
                  <label htmlFor="notes" className="text-sm font-semibold text-[#0f172a]">Brief Description / Notes</label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={5}
                    value={values.notes ?? ""}
                    onChange={(e) => setValues((v) => ({ ...v, notes: e.target.value }))}
                    className="resize-y rounded-md border border-slate-300 bg-white px-3 py-3 text-sm text-[#0f172a] outline-none transition-colors placeholder:text-[#94a3b8] focus:border-[#d97706] focus:ring-2 focus:ring-[#d97706]/20"
                    placeholder="Tell us about your journal, archive, and publishing model."
                  />
                </div>

                <div className="flex flex-col items-start gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <button
                      type="submit"
                      disabled={pending}
                      className="rounded-md bg-[#d97706] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#b45309] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {pending ? "Submitting…" : "Submit Request"}
                    </button>
                    <p className="mt-3 text-xs text-[#64748b]">Our editorial board reviews requests within 3-5 business days.</p>
                  </div>
                  <a href="mailto:support@empiricalopen.org" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f172a] underline decoration-[#d97706] underline-offset-4 hover:text-[#b45309]">
                    <Mail className="size-4" />
                    Prefer email?
                  </a>
                </div>
              </form>
            )}
          </div>

          <aside className="mt-6 rounded-xl border border-[#f3d4a3] bg-[#fff7ed] p-5 text-sm leading-relaxed text-[#475569]">
            Prefer email? Contact our integration team directly at{" "}
            <a href="mailto:support@empiricalopen.org" className="font-semibold text-[#0f172a] underline decoration-[#d97706] underline-offset-4">
              support@empiricalopen.org
            </a>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
