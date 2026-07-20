"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, MailCheck, Mail, Send } from "lucide-react"
import { AuthShell } from "@/components/auth/auth-shell"
import { AuthField } from "@/components/auth/auth-field"

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [touched, setTouched] = useState(false)
  const [sent, setSent] = useState(false)

  const emailError = touched && !emailPattern.test(email) ? "Enter a valid email address." : ""

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setTouched(true)
    if (emailPattern.test(email)) {
      setSent(true)
    }
  }

  return (
    <AuthShell
      eyebrow="Account recovery"
      title={sent ? "Check your email" : "Reset your password"}
      subtitle={
        sent
          ? `If an account exists for ${email}, we've sent a link to reset your password.`
          : "Enter the email linked to your account and we'll send you a secure reset link."
      }
      footer={
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 font-medium text-gold-soft hover:underline"
        >
          <ArrowLeft className="size-4" />
          Back to sign in
        </Link>
      }
    >
      {sent ? (
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 rounded-xs border border-jade/40 bg-jade/10 px-4 py-4">
            <MailCheck className="size-6 shrink-0 text-jade-soft" />
            <p className="text-sm leading-relaxed text-jade-soft">
              Reset link sent. The link expires in 30 minutes for your security.
            </p>
          </div>
          <p className="text-sm leading-relaxed text-paper-raised/70">
            Didn&apos;t receive it? Check your spam folder or{" "}
            <button
              type="button"
              onClick={() => setSent(false)}
              className="font-medium text-gold-soft hover:underline"
            >
              try another email address
            </button>
            .
          </p>
        </div>
      ) : (
        <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
          <AuthField
            id="email"
            label="Email address"
            type="email"
            icon={Mail}
            value={email}
            onChange={setEmail}
            placeholder="you@university.edu"
            autoComplete="email"
            error={emailError}
            valid={emailPattern.test(email)}
            required
          />

          <button
            type="submit"
            className="mt-1 inline-flex items-center justify-center gap-2 rounded-xs bg-gold px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-gold-soft"
          >
            <Send className="size-4" />
            Send reset link
          </button>
        </form>
      )}
    </AuthShell>
  )
}
