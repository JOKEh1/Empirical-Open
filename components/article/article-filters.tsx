"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { ChevronDown, Search } from "lucide-react"
import { DISCIPLINES } from "@/lib/queries/types"

export function ArticleFilters({ journalOptions }: { journalOptions: { id: string; name: string }[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("q") ?? "")

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "")
  }, [searchParams])

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (!value || value === "all" || value === "All disciplines") {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    params.delete("page")
    router.push(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    updateParam("q", query.trim())
  }

  const journalValue = searchParams.get("journal") ?? "all"
  const disciplineValue = searchParams.get("discipline") ?? "All disciplines"

  return (
    <div className="mt-8 flex flex-col gap-3 lg:flex-row">
      <form
        onSubmit={handleSubmit}
        className="flex min-h-12 flex-1 items-center gap-3 rounded-md bg-white px-4 text-[#475569]"
      >
        <Search className="size-5 shrink-0 text-[#64748b]" aria-hidden="true" />
        <label className="sr-only" htmlFor="article-search">
          Search articles
        </label>
        <input
          id="article-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search titles, authors, journals, or keywords"
          className="w-full bg-transparent text-sm text-[#0f172a] outline-none placeholder:text-[#64748b]"
        />
      </form>

      <FilterSelect
        label="Discipline"
        value={disciplineValue}
        options={[...DISCIPLINES]}
        onChange={(v) => updateParam("discipline", v)}
      />

      <FilterSelect
        label="Journal"
        value={journalValue}
        options={["all", ...journalOptions.map((j) => j.id)]}
        optionLabels={Object.fromEntries([
          ["all", "All journals"],
          ...journalOptions.map((j) => [j.id, j.name]),
        ])}
        onChange={(v) => updateParam("journal", v)}
      />
    </div>
  )
}

function FilterSelect({
  label,
  value,
  options,
  optionLabels,
  onChange,
}: {
  label: string
  value: string
  options: string[]
  optionLabels?: Record<string, string>
  onChange: (value: string) => void
}) {
  return (
    <label className="relative flex min-h-12 min-w-48 items-center rounded-md bg-white px-4 text-[#0f172a]">
      <span className="sr-only">Filter by {label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full appearance-none bg-white pr-6 text-sm text-[#0f172a] outline-none"
      >
        {options.map((option) => (
          <option className="bg-white text-[#0f172a]" key={option} value={option}>
            {optionLabels?.[option] ?? option}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 size-4 text-[#475569]" aria-hidden="true" />
    </label>
  )
}
