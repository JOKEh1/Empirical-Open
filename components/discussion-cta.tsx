"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getCurrentUser, type User } from "@/lib/auth"

export function DiscussionCta() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    getCurrentUser()
      .then((u) => {
        if (active) setUser(u)
      })
      .catch(() => {
        if (active) setUser(null)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  if (loading) {
    return <div className="h-10 w-full animate-pulse rounded-xs bg-line" aria-hidden="true" />
  }

  if (!user) {
    return (
      <Link
        href="/login"
        className="block w-full rounded-xs bg-gold px-4 py-2.5 text-center text-sm font-semibold text-ink transition-colors hover:bg-gold-soft"
      >
        Sign in to comment
      </Link>
    )
  }

  return (
    <Link
      href="/discussions"
      className="block w-full rounded-xs bg-gold px-4 py-2.5 text-center text-sm font-semibold text-ink transition-colors hover:bg-gold-soft"
    >
      Start a Discussion
    </Link>
  )
}
