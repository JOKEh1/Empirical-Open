"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Heart } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { getCurrentUser } from "@/lib/auth"

export function SaveButton({ articleId }: { articleId: string }) {
  const [userId, setUserId] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)
  const [pending, setPending] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function load() {
      const user = await getCurrentUser()
      if (cancelled) return
      if (!user) {
        setReady(true)
        return
      }
      setUserId(user.id)
      const { data } = await createClient()
        .from("saved_articles")
        .select("article_id")
        .eq("user_id", user.id)
        .eq("article_id", articleId)
        .maybeSingle()
      if (!cancelled) {
        setSaved(!!data)
        setReady(true)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [articleId])

  async function toggle() {
    if (!userId || pending) return
    setPending(true)
    const supabase = createClient()
    if (saved) {
      const { error } = await supabase
        .from("saved_articles")
        .delete()
        .eq("user_id", userId)
        .eq("article_id", articleId)
      if (!error) setSaved(false)
    } else {
      const { error } = await supabase.from("saved_articles").insert({ user_id: userId, article_id: articleId })
      if (!error) setSaved(true)
    }
    setPending(false)
  }

  if (!ready) {
    return (
      <span className="inline-flex items-center gap-1 text-paper-raised/40">
        <Heart className="size-4" />
        Save
      </span>
    )
  }

  if (!userId) {
    return (
      <Link
        href={`/login?redirect=/article/${articleId}`}
        className="inline-flex items-center gap-1 text-paper-raised/60 hover:text-paper-raised transition-colors"
      >
        <Heart className="size-4" />
        Save
      </Link>
    )
  }

  return (
    <button
      onClick={toggle}
      disabled={pending}
      className={`inline-flex items-center gap-1 transition-colors disabled:opacity-60 ${
        saved ? "text-rust" : "text-paper-raised/60 hover:text-paper-raised"
      }`}
    >
      <Heart className="size-4" fill={saved ? "currentColor" : "none"} />
      {saved ? "Saved" : "Save"}
    </button>
  )
}
