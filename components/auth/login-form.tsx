'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Lock, LogIn, Mail } from 'lucide-react'
import { AuthField } from '@/components/auth/auth-field'
import { setCurrentUser } from '@/lib/auth'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [touched, setTouched] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const emailError = touched && !emailPattern.test(email) ? 'Enter a valid email address.' : ''
  const passwordError = touched && password.length < 1 ? 'Password is required.' : ''

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        // Simulate successful login - set user as admin for demo
        setCurrentUser({
          id: 'user-001',
          email: email,
          role: 'admin',
          name: email.split('@')[0],
        })

        // Redirect to the intended page or dashboard
        router.push(redirectTo)
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [submitted, redirectTo, router, email])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setTouched(true)
    if (emailPattern.test(email) && password.length >= 1) {
      setSubmitted(true)
    }
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
      {submitted && (
        <p className="rounded-xs border border-jade/40 bg-jade/10 px-3 py-2.5 text-sm text-jade-soft">
          Signed in successfully. Redirecting to your hub…
        </p>
      )}

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

      <div className="flex flex-col gap-1.5">
        <AuthField
          id="password"
          label="Password"
          type="password"
          icon={Lock}
          value={password}
          onChange={setPassword}
          placeholder="Enter your password"
          autoComplete="current-password"
          error={passwordError}
          required
        />
        <div className="flex items-center justify-between pt-1">
          <label className="flex cursor-pointer items-center gap-2 text-[13px] text-paper-raised/75">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="size-4 rounded-xs border-white/25 bg-white/5 accent-gold"
            />
            Remember me
          </label>
          <Link
            href="/forgot-password"
            className="text-[13px] text-gold-soft transition-colors hover:underline"
          >
            Forgot password?
          </Link>
        </div>
      </div>

      <button
        type="submit"
        className="mt-1 inline-flex items-center justify-center gap-2 rounded-xs bg-gold px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-gold-soft"
      >
        <LogIn className="size-4" />
        Sign in
      </button>
    </form>
  )
}
