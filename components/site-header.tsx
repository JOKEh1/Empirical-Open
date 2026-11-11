"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Menu, X, LogOut, ShieldCheck, ChevronDown } from "lucide-react"
import { getCurrentUser, onAuthChange, signOut, type User } from "@/lib/auth"

const navLinks = [
  { label: "Discover", href: "/" },
  { label: "Journals", href: "/journals" },
  { label: "Calls for Papers", href: "/calls-for-papers" },
  { label: "Announcements", href: "/announcements" },
  { label: "Discussions", href: "/discussions" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  // Check auth status on mount and stay in sync with sign-in/out
  useEffect(() => {
    let cancelled = false
    getCurrentUser().then((u) => {
      if (!cancelled) setUser(u)
    })
    const unsubscribe = onAuthChange((loggedIn) => {
      if (!loggedIn) {
        setUser(null)
      } else {
        getCurrentUser().then((u) => {
          if (!cancelled) setUser(u)
        })
      }
    })
    return () => {
      cancelled = true
      unsubscribe()
    }
  }, [])

  const isLoggedIn = user !== null

  async function handleSignOut() {
    await signOut()
    setOpen(false)
    setProfileOpen(false)
    router.push("/")
    router.refresh()
  }

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

  // Close profile dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false)
      }
    }

    if (profileOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [profileOpen])

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
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {isLoggedIn ? (
              <>
                {user?.role === "admin" && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-1.5 rounded-xs border border-gold/40 px-3 py-2 text-sm font-medium text-gold-soft transition-colors hover:border-gold/70"
                  >
                    <ShieldCheck className="size-4" />
                    Admin
                  </Link>
                )}
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen((v) => !v)}
                    className="flex items-center gap-2 rounded-xs border border-white/30 py-1.5 pl-1.5 pr-3 text-sm font-medium transition-colors hover:border-white/60"
                    aria-haspopup="menu"
                    aria-expanded={profileOpen}
                  >
                    <span
                      className="flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-ink"
                      style={{ background: `var(--${user?.avatarColor ?? "jade"})` }}
                      aria-hidden="true"
                    >
                      {(user?.name || user?.email || "?").charAt(0).toUpperCase()}
                    </span>
                    <span className="max-w-[140px] truncate">{user?.name || "Account"}</span>
                    <ChevronDown
                      className={`size-4 transition-transform ${profileOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {profileOpen && (
                    <div
                      className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-md border border-white/10 bg-ink shadow-xl"
                      role="menu"
                    >
                      <Link
                        href="/dashboard"
                        onClick={() => setProfileOpen(false)}
                        className="flex flex-col gap-0.5 border-b border-white/10 px-4 py-3 transition-colors hover:bg-white/5"
                        role="menuitem"
                      >
                        <span className="truncate text-sm font-semibold text-paper-raised">
                          {user?.name || "Account"}
                        </span>
                        <span className="truncate text-xs text-paper-raised/60">
                          {user?.email}
                        </span>
                      </Link>
                      <Link
                        href="/host-your-journal"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-paper-raised/85 transition-colors hover:bg-white/5 hover:text-paper-raised"
                        role="menuitem"
                      >
                        Index a Journal
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="flex w-full items-center gap-2 border-t border-white/10 px-4 py-3 text-left text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300"
                        role="menuitem"
                      >
                        <LogOut className="size-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
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
              </>
            )}
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
              <div className="mt-4 flex flex-col gap-3">
                {isLoggedIn ? (
                  <>
                    {user?.role === "admin" && (
                      <Link
                        href="/admin"
                        className="flex items-center justify-center gap-1.5 rounded-xs border border-gold/40 px-4 py-2.5 text-center text-sm font-medium text-gold-soft"
                        onClick={() => setOpen(false)}
                      >
                        <ShieldCheck className="size-4" />
                        Admin
                      </Link>
                    )}
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2.5 rounded-xs border border-white/30 px-4 py-2.5 text-sm font-medium"
                      onClick={() => setOpen(false)}
                    >
                      <span
                        className="flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-ink"
                        style={{ background: `var(--${user?.avatarColor ?? "jade"})` }}
                        aria-hidden="true"
                      >
                        {(user?.name || user?.email || "?").charAt(0).toUpperCase()}
                      </span>
                      <span className="flex min-w-0 flex-col">
                        <span className="truncate">{user?.name || "Account"}</span>
                        <span className="truncate text-xs text-paper-raised/60">{user?.email}</span>
                      </span>
                    </Link>
                    <Link
                      href="/host-your-journal"
                      className="flex items-center justify-center gap-1.5 rounded-xs border border-white/30 px-4 py-2.5 text-center text-sm font-medium"
                      onClick={() => setOpen(false)}
                    >
                      Index a Journal
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center justify-center gap-1.5 rounded-xs px-4 py-2.5 text-center text-sm font-medium text-red-400"
                    >
                      <LogOut className="size-4" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>
    </div>
  )
}
