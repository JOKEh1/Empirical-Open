'use client'

import Link from 'next/link'
import { ArrowLeft, Home } from 'lucide-react'

interface AuthorLayoutProps {
  children: React.ReactNode
  title: string
  showBackButton?: boolean
}

export function AuthorLayout({ children, title, showBackButton = true }: AuthorLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-white/10 bg-paper">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            {showBackButton && (
              <Link
                href="/author/dashboard"
                className="inline-flex items-center gap-1 text-sm text-foreground/70 transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
            )}
            <h1 className="font-serif text-xl font-semibold text-foreground">{title}</h1>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xs border border-white/20 px-3 py-2 text-sm transition-colors hover:border-white/40"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-[1180px] px-6 py-12">{children}</main>
    </div>
  )
}
