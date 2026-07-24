"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { disciplines, heroStats } from "@/lib/hub-data"

export function Hero() {
  const [active, setActive] = useState("All disciplines")
  const [query, setQuery] = useState("soil microbiome Sahel")

  return (
    <section className="relative overflow-hidden bg-ink text-paper-raised">
      {/* soft radial glow */}
      <div
        className="pointer-events-none absolute -right-32 -top-40 size-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, rgba(201,138,44,.18), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1180px] px-6 pb-16 pt-14 md:px-8 md:pt-16">
        <p className="mb-4 flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.12em] text-gold-soft">
          <span className="inline-block h-px w-5 bg-gold-soft" />
          Africa&apos;s research, one front door
        </p>

        <h1 className="max-w-3xl text-balance font-serif text-4xl font-semibold leading-[1.08] md:text-[47px]">
          Search, read, and discuss peer-reviewed research from journals across
          Africa.
        </h1>

        <p className="mt-5 max-w-xl text-pretty leading-relaxed text-paper-raised/70 md:text-[16.5px]">
          EmpiricalOpen aggregates journals hosted by universities and research
          institutions into a single searchable index — full text stays with the
          publishing journal.
        </p>

        {/* Search panel */}
        <form
          className="mt-9 flex max-w-[720px] flex-col gap-2 rounded-xs bg-paper-raised p-2 shadow-2xl sm:flex-row"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex flex-1 items-center gap-2 px-3">
            <Search className="size-5 shrink-0 text-text-soft" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles, authors, journals, or keywords…"
              className="w-full bg-transparent py-3 text-[15px] text-slate-900 outline-none placeholder:text-slate-500 hover:placeholder:text-slate-600 focus:placeholder:text-slate-600"
              aria-label="Search"
            />
          </div>
          <button
            type="submit"
            className="rounded-xs bg-ink px-6 py-3.5 text-sm font-semibold text-paper-raised transition-colors hover:bg-ink-soft"
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
                    ? "border-gold bg-gold font-medium text-ink"
                    : "border-paper-raised/30 text-paper-raised/85 hover:border-paper-raised/60"
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
              <dd className="font-serif text-[26px] font-semibold text-gold-soft">
                {s.num}
              </dd>
              <p className="mt-0.5 text-xs text-paper-raised/60">{s.label}</p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
