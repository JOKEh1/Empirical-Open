"use client"

import { useState } from "react"
import Link from "next/link"
import { Building2, Lock, Mail, User, UserPlus } from "lucide-react"
import { AuthShell } from "@/components/auth/auth-shell"
import { AuthField } from "@/components/auth/auth-field"

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function scorePassword(pw: string) {
  let score = 0
  if (pw.length >= 8) score++
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++
  if (/\d/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++
  return score
}

const strengthMeta = [
  { label: "Too weak", color: "bg-rust", text: "text-rust" },
  { label: "Weak", color: "bg-rust", text: "text-rust" },
  { label: "Fair", color: "bg-gold", text: "text-gold-soft" },
  { label: "Good", color: "bg-gold", text: "text-gold-soft" },
  { label: "Strong", color: "bg-jade", text: "text-jade-soft" },
]

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [affiliation, setAffiliation] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [agree, setAgree] = useState(false)
  const [touched, setTouched] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const score = scorePassword(password)
  const meta = strengthMeta[score]

  const nameError = touched && name.trim().length < 2 ? "Please enter your full name." : ""
  const emailError = touched && !emailPattern.test(email) ? "Enter a valid email address." : ""
  const passwordError =
    touched && password.length > 0 && score < 2 ? "Choose a stronger password." : ""
  const confirmError =
    touched && confirm.length > 0 && confirm !== password ? "Passwords do not match." : ""
  const agreeError = touched && !agree ? "You must accept the terms to continue." : ""

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setTouched(true)
    if (
      name.trim().length >= 2 &&
      emailPattern.test(email) &&
      score >= 2 &&
      confirm === password &&
      password.length > 0 &&
      agree
    ) {
      setSubmitted(true)
    }
  }

  return (
    <AuthShell
      eyebrow="Get started"
      title="Create your account"
      subtitle="Join researchers across the continent. It only takes a minute."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-gold-soft hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
        {submitted && (
          <p className="rounded-xs border border-jade/40 bg-jade/10 px-3 py-2.5 text-sm text-jade-soft">
            Account created. Check your inbox to verify your email.
          </p>
        )}

        <AuthField
          id="name"
          label="Full name"
          icon={User}
          value={name}
          onChange={setName}
          placeholder="Amara Okafor"
          autoComplete="name"
          error={nameError}
          valid={name.trim().length >= 2}
          required
        />

        <AuthField
          id="affiliation"
          label="Institution or affiliation"
          icon={Building2}
          value={affiliation}
          onChange={setAffiliation}
          placeholder="University of Lagos (optional)"
          autoComplete="organization"
        />

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

        <div className="flex flex-col gap-2">
          <AuthField
            id="password"
            label="Password"
            type="password"
            icon={Lock}
            value={password}
            onChange={setPassword}
            placeholder="At least 8 characters"
            autoComplete="new-password"
            error={passwordError}
            required
          />
          {password.length > 0 && (
            <div className="flex items-center gap-3">
              <div className="flex h-1.5 flex-1 gap-1">
                {[0, 1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className={`h-full flex-1 rounded-full transition-colors ${
                      i < score ? meta.color : "bg-white/10"
                    }`}
                  />
                ))}
              </div>
              <span className={`font-mono text-[11px] ${meta.text}`}>{meta.label}</span>
            </div>
          )}
        </div>

        <AuthField
          id="confirm"
          label="Confirm password"
          type="password"
          icon={Lock}
          value={confirm}
          onChange={setConfirm}
          placeholder="Re-enter your password"
          autoComplete="new-password"
          error={confirmError}
          valid={confirm.length > 0 && confirm === password}
          required
        />

        <div className="flex flex-col gap-1.5">
          <label className="flex cursor-pointer items-start gap-2.5 text-[13px] leading-relaxed text-paper-raised/75">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mt-0.5 size-4 shrink-0 rounded-xs border-white/25 bg-white/5 accent-gold"
            />
            <span>
              I agree to the{" "}
              <a href="#" className="text-gold-soft hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-gold-soft hover:underline">
                Privacy Policy
              </a>
              .
            </span>
          </label>
          {agreeError && <p className="text-xs text-rust">{agreeError}</p>}
        </div>

        <button
          type="submit"
          className="mt-1 inline-flex items-center justify-center gap-2 rounded-xs bg-gold px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-gold-soft"
        >
          <UserPlus className="size-4" />
          Create account
        </button>
      </form>
    </AuthShell>
  )
}
