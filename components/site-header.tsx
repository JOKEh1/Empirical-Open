"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "Discover", href: "/", active: true },
  { label: "Journals", href: "/journals" },
  { label: "Calls for Papers", href: "/calls-for-papers" },
  { label: "Announcements", href: "/announcements" },
  { label: "Discussions", href: "#" },
]

const topLinks = ["For Institutions", "Host Your Journal", "Help"]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <div className="sticky top-0 z-40">
      {/* Top bar */}
      <div className="hidden bg-ink text-paper-raised md:block">
        <div className="mx-auto flex h-9 max-w-[1180px] items-center justify-between px-8 text-xs tracking-wide">
          <span className="opacity-60">DEMO — EmpiricalOpen Central Hub</span>
          <div className="flex items-center gap-5">
            {topLinks.map((l) => (
              <a
                key={l}
                href="#"
                className="opacity-80 transition-opacity hover:opacity-100 hover:underline"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="border-b border-white/10 bg-ink text-paper-raised">
        <div className="mx-auto flex h-[76px] max-w-[1180px] items-center justify-between px-6 md:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <span
              className="size-9 shrink-0 rounded-full"
              style={{
                background:
                  "conic-gradient(from 220deg, var(--gold), var(--jade) 55%, var(--gold))",
              }}
              aria-hidden="true"
            />
            <span className="font-serif text-xl font-semibold tracking-tight">
              Empirical<span className="text-gold-soft">Open</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm lg:flex">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className={`relative py-1.5 transition-opacity hover:opacity-100 ${
                  l.active ? "opacity-100" : "opacity-80"
                }`}
              >
                {l.label}
                {l.active && (
                  <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-gold" />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/login"
              className="rounded-xs border border-white/30 px-4 py-2 text-sm font-medium transition-colors hover:border-white/60"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="rounded-xs bg-gold px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-gold-soft"
            >
              Register
            </Link>
          </div>

          <button
            className="inline-flex size-9 items-center justify-center rounded-xs border border-white/20 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="border-t border-white/10 bg-ink md:hidden">
            <nav className="mx-auto flex max-w-[1180px] flex-col px-6 py-4">
              {navLinks.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className={`border-b border-white/10 py-3 text-sm ${
                    l.active ? "text-gold-soft" : "opacity-85"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-4 flex flex-col gap-3">
                <Link
                  href="/login"
                  className="rounded-xs border border-white/30 px-4 py-2.5 text-center text-sm font-medium"
                  onClick={() => setOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="rounded-xs bg-gold px-4 py-2.5 text-center text-sm font-semibold text-ink"
                  onClick={() => setOpen(false)}
                >
                  Register
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </div>
  )
}
