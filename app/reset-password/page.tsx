"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, KeyRound, Lock } from "lucide-react"
import { AuthShell } from "@/components/auth/auth-shell"
import { AuthField } from "@/components/auth/auth-field"
import { isAuthenticated, updatePassword } from "@/lib/auth"

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [touched, setTouched] = useState(false)
  const [pending, setPending] = useState(false)
  const [done, setDone] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)
  const [hasSession, setHasSession] = useState<boolean | null>(null)

  // The recovery link signs the user in with a temporary session;
  // without it, password update is impossible.
  useEffect(() => {
    let cancelled = false
    // Small delay lets the Supabase client finish exchanging the
    // recovery code from the URL before we check.
    const t = setTimeout(async () => {
      const ok = await isAuthenticated()
      if (!cancelled) setHasSession(ok)
    }, 600)
    return () => {
      cancelled = true
      clearTimeout(t)
    }
  }, [])

  const passwordError =
    touched && password.length < 8 ? "Password must be at least 8 characters." : ""
  const confirmError =
    touched && confirm.length > 0 && confirm !== password ? "Passwords do not match." : ""

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setTouched(true)
    setAuthError(null)
    if (password.length < 8 || confirm !== password || pending) return

    setPending(true)
    const { error } = await updatePassword(password)
    setPending(false)

    if (error) {
      setAuthError(error)
      return
    }
    setDone(true)
    setTimeout(() => {
      router.push("/")
      router.refresh()
    }, 1500)
  }

  return (
    <AuthShell
      eyebrow="Account recovery"
      title="Choose a new password"
      subtitle="Enter and confirm a new password for your account."
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
      {hasSession === false ? (
        <div className="flex flex-col gap-4">
          <p className="rounded-xs border border-rust/40 bg-rust/10 px-3 py-2.5 text-sm text-rust">
            This reset link is invalid or has expired. Request a new one to continue.
          </p>
          <Link
            href="/forgot-password"
            className="inline-flex items-center justify-center gap-2 rounded-xs bg-gold px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-gold-soft"
          >
            Request a new link
          </Link>
        </div>
      ) : (
        <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
          {done && (
            <p className="rounded-xs border border-jade/40 bg-jade/10 px-3 py-2.5 text-sm text-jade-soft">
              Password updated. Redirecting…
            </p>
          )}
          {authError && (
            <p className="rounded-xs border border-rust/40 bg-rust/10 px-3 py-2.5 text-sm text-rust">
              {authError}
            </p>
          )}

          <AuthField
            id="password"
            label="New password"
            type="password"
            icon={Lock}
            value={password}
            onChange={setPassword}
            placeholder="At least 8 characters"
            autoComplete="new-password"
            error={passwordError}
            required
          />

          <AuthField
            id="confirm"
            label="Confirm new password"
            type="password"
            icon={Lock}
            value={confirm}
            onChange={setConfirm}
            placeholder="Re-enter your new password"
            autoComplete="new-password"
            error={confirmError}
            valid={confirm.length > 0 && confirm === password}
            required
          />

          <button
            type="submit"
            disabled={pending || hasSession === null}
            className="mt-1 inline-flex items-center justify-center gap-2 rounded-xs bg-gold px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-60"
          >
            <KeyRound className="size-4" />
            {pending ? "Updating…" : "Update password"}
          </button>
        </form>
      )}
    </AuthShell>
  )
}
