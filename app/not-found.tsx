import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SearchX } from "lucide-react"

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex min-h-[70vh] flex-col items-center justify-center gap-4 bg-[#faf9f6] px-6 text-center">
        <SearchX className="size-10 text-[#c98a2c]" />
        <h1 className="font-serif text-3xl font-semibold text-[#0f172a]">Page not found</h1>
        <p className="max-w-md text-sm text-[#475569]">
          The page you're looking for doesn't exist, or may have been moved.
        </p>
        <div className="mt-2 flex items-center gap-3">
          <Link
            href="/"
            className="rounded-xs bg-[#c98a2c] px-5 py-2.5 text-sm font-semibold text-[#14213d] transition-colors hover:bg-[#e9c98a]"
          >
            Back to home
          </Link>
          <Link
            href="/journals"
            className="rounded-xs border border-[#dad5c8] px-5 py-2.5 text-sm font-medium text-[#0f172a] transition-colors hover:border-[#c98a2c]"
          >
            Browse journals
          </Link>
        </div>
      </main>
    </>
  )
}
