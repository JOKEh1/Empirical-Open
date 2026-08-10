"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { disciplines, heroStats } from "@/lib/hub-data"

export function Hero() {
  const router = useRouter()
  const [active, setActive] = useState("All disciplines")
  const [query, setQuery] = useState("soil microbiome Sahel")

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const params = new URLSearchParams()
    
    if (query.trim()) {
      params.append("q", query.trim())
    }
    
    if (active !== "All disciplines") {
      params.append("discipline", active)
    }
    
    const searchUrl = `/search${params.toString() ? `?${params.toString()}` : ""}`
    router.push(searchUrl)
  }

  return (
    <section className="relative overflow-hidden bg-[#14213d] text-[#fbfaf6]">
      {/* soft radial glow - top right */}
      <div
        className="pointer-events-none absolute -right-32 -top-40 size-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, rgba(201,138,44,.18), transparent 70%)",
        }}
        aria-hidden="true"
      />
      
      {/* soft radial glow - top left (mirrored) */}
      <div
        className="pointer-events-none absolute -left-32 -top-40 size-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 65% 35%, rgba(201,138,44,.18), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1180px] px-6 pb-16 pt-14 md:px-8 md:pt-16">
        <p className="mb-4 flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.12em] text-[#e9c98a]">
          <span className="inline-block h-px w-5 bg-[#e9c98a]" />
          Africa&apos;s research, one front door
        </p>

        <h1 className="max-w-3xl text-balance font-serif text-4xl font-semibold leading-[1.08] text-white md:text-[47px]">
          Search, read, and discuss peer-reviewed research from journals across
          Africa.
        </h1>

        <p className="mt-5 max-w-xl text-pretty leading-relaxed text-[#c9c4b0] md:text-[16.5px]">
          EmpiricalOpen aggregates journals hosted by universities and research
          institutions into a single searchable index — full text stays with the
          publishing journal.
        </p>

        {/* Search panel */}
        <form
          className="mt-9 flex max-w-[720px] flex-col gap-2 rounded-xs bg-[#fbfaf6] p-2 shadow-2xl sm:flex-row"
          onSubmit={handleSearch}
        >
          <div className="flex flex-1 items-center gap-2 px-3">
            <Search className="size-5 shrink-0 text-[#5b5a52]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles, authors, journals, or keywords…"
              className="w-full bg-transparent py-3 text-[15px] text-[#0f172a] outline-none placeholder:text-[#475569] hover:placeholder:text-[#1e293b] focus:placeholder:text-[#1e293b]"
              aria-label="Search"
            />
          </div>
          <button
            type="submit"
            className="rounded-xs bg-[#14213d] px-6 py-3.5 text-sm font-semibold text-[#fbfaf6] transition-colors hover:bg-[#233258]"
          >
            Search
          </button>
        </form>

        {/* Discipline chips */}
        <div className="mt-4 flex flex-wrap gap-2.5">
          {disciplines.map((d) => {
            const on = d === active
            return (
              <button
                key={d}
                onClick={() => setActive(d)}
                className={`rounded-full border px-3.5 py-1.5 text-[12.5px] transition-colors ${
                  on
                    ? "border-[#c98a2c] bg-[#c98a2c] font-medium text-[#14213d]"
                    : "border-[rgba(251,250,246,0.3)] text-[#d4cdc0] hover:border-[rgba(251,250,246,0.6)]"
                }`}
              >
                {d}
              </button>
            )
          })}
        </div>

        {/* Stats */}
        <dl className="mt-11 grid grid-cols-2 gap-8 sm:flex sm:gap-12">
          {heroStats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-serif text-[26px] font-semibold text-[#e9c98a]">
                {s.num}
              </dd>
              <p className="mt-0.5 text-xs text-[#a89f8f]">{s.label}</p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
