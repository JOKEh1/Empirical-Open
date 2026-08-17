"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertTriangle, RotateCcw } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#faf9f6] px-6 text-center">
      <AlertTriangle className="size-10 text-rust" />
      <h1 className="font-serif text-2xl font-semibold text-[#0f172a]">Something went wrong</h1>
      <p className="max-w-md text-sm text-[#475569]">
        We hit an unexpected error loading this page. You can try again, or head back to the homepage.
      </p>
      <div className="mt-2 flex items-center gap-3">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-xs bg-[#c98a2c] px-5 py-2.5 text-sm font-semibold text-[#14213d] transition-colors hover:bg-[#e9c98a]"
        >
          <RotateCcw className="size-4" />
          Try again
        </button>
        <Link
          href="/"
          className="rounded-xs border border-[#dad5c8] px-5 py-2.5 text-sm font-medium text-[#0f172a] transition-colors hover:border-[#c98a2c]"
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}
