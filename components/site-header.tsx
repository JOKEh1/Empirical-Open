"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ArrowRight } from "lucide-react"
import { isAuthenticated, onAuthChange } from "@/lib/auth"

const navLinks = [
  { label: "Discover", href: "/" },
  { label: "Journals", href: "/journals" },
  { label: "Calls for Papers", href: "/calls-for-papers" },
  { label: "Announcements", href: "/announcements" },
  { label: "Discussions", href: "/discussions" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement>(null)

  // Check auth status on mount and stay in sync with sign-in/out
  useEffect(() => {
    let cancelled = false
    isAuthenticated().then((ok) => {
      if (!cancelled) setIsLoggedIn(ok)
    })
    const unsubscribe = onAuthChange((loggedIn) => setIsLoggedIn(loggedIn))
    return () => {
      cancelled = true
      unsubscribe()
    }
  }, [])
  
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (open && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        const header = menuRef.current.closest('header')
        if (header && !header.contains(event.target as Node)) {
          setOpen(false)
        }
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  // Close menu when scrolling
  useEffect(() => {
    function handleScroll() {
      if (open) {
        setOpen(false)
      }
    }

    if (open) {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [open])

  return (
    <div className="sticky top-0 z-40">
      {/* Main header */}
      <header ref={menuRef} className="relative border-b border-white/10 bg-ink text-paper-raised">
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
            {navLinks.map((l) => {
              const active = isActive(l.href)
              return (
                <Link
                  key={l.label}
                  href={l.href}
                  className={`relative py-1.5 transition-opacity hover:opacity-100 ${
                    active ? "opacity-100" : "opacity-80"
                  }`}
                >
                  {l.label}
                  {active && (
                    <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-gold" />
                  )}
                </Link>
              )
            })}
            {isLoggedIn && (
              <Link
                href="/calls-for-papers"
                className="flex items-center gap-2 rounded-md bg-[#c88d2d] px-4 py-2 font-semibold text-[#0f172a] transition-colors hover:bg-amber-500"
              >
                Submit an article
                <ArrowRight className="size-4" />
              </Link>
            )}
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
          <div className="absolute top-full left-0 right-0 z-50 border-t border-white/10 bg-ink md:hidden">
            <nav className="mx-auto flex max-w-[1180px] flex-col px-6 py-4">
              {navLinks.map((l) => {
                const active = isActive(l.href)
                return (
                  <Link
                    key={l.label}
                    href={l.href}
                    className={`border-b border-white/10 py-3 text-sm ${
                      active ? "text-gold-soft" : "opacity-85"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                )
              })}
              {isLoggedIn && (
                <Link
                  href="/calls-for-papers"
                  className="flex items-center justify-center gap-2 border-b border-white/10 py-3 font-semibold text-[#0f172a] rounded-md bg-[#c88d2d] hover:bg-amber-500 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Submit an article
                  <ArrowRight className="size-4" />
                </Link>
              )}
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
