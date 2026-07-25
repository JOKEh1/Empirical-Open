import { Suspense } from 'react'
import Link from 'next/link'
import { AuthShell } from '@/components/auth/auth-shell'
import { LoginForm } from '@/components/auth/login-form'

function LoginFormFallback() {
  return (
    <div className="flex flex-col gap-5">
      <div className="h-10 animate-pulse rounded-xs bg-white/10" />
      <div className="h-10 animate-pulse rounded-xs bg-white/10" />
      <div className="h-10 animate-pulse rounded-xs bg-white/10" />
    </div>
  )
}

export default function LoginPage() {
  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Sign in to your account"
      subtitle="Access your saved articles, followed journals, and discussions."
      footer={
        <>
          New to EmpiricalOpen?{" "}
          <Link href="/register" className="font-medium text-gold-soft hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <Suspense fallback={<LoginFormFallback />}>
        <LoginForm />
      </Suspense>
    </AuthShell>
  )
}
