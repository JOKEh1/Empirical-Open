"use client"

import { useState } from "react"
import { Users, BookOpen, Calendar, Eye } from "lucide-react"
import { SectionHeader } from "@/components/section-header"
import { editorsPick, trending } from "@/lib/hub-data"

const tabs = ["Editor's Picks", "Trending"] as const

export function Spotlight() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Editor's Picks")

  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-[1180px] px-6 py-14 md:px-8">
        <SectionHeader tag="Spotlight" title="From the journals" />

        <div className="mb-7 inline-flex gap-1 rounded-xs bg-line p-1">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-xs px-4 py-2 text-[13px] font-medium transition-colors ${
                tab === t
                  ? "bg-paper-raised text-ink"
                  : "text-text-soft hover:text-ink"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr]">
          {/* Featured main */}
          <article className="relative overflow-hidden rounded-xs bg-ink p-7 text-paper-raised md:p-8">
            <span className="absolute inset-y-0 left-0 w-[5px] bg-gold" />
            <p className="mb-3.5 font-mono text-[11.5px] uppercase tracking-[0.08em] text-gold-soft">
              {editorsPick.discipline}
            </p>
            <h3 className="mb-3.5 font-serif text-[22px] font-semibold leading-tight md:text-[25px]">
              {editorsPick.title}
            </h3>
            <p className="mb-5 text-sm leading-relaxed text-paper-raised/75">
              {editorsPick.abstract}
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-[12.5px] text-paper-raised/60">
              <span className="inline-flex items-center gap-1.5">
                <Users className="size-3.5" />
                {editorsPick.authors}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <BookOpen className="size-3.5" />
                {editorsPick.journal}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="size-3.5" />
                {editorsPick.issue}
              </span>
            </div>
          </article>

          {/* Trending list */}
          <div className="flex flex-col">
            {trending.map((item) => (
              <a
                key={item.rank}
                href="#"
                className="flex items-start gap-4 border-b border-line py-4 last:border-none"
              >
                <span className="w-7 shrink-0 font-serif text-[22px] font-semibold text-gold">
                  {item.rank}
                </span>
                <div className="min-w-0 flex-1">
                  <h4 className="text-[14.5px] font-semibold leading-snug">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-xs text-text-soft">{item.journal}</p>
                </div>
                <div className="shrink-0 text-right">
                  <div className="inline-flex items-center gap-1 font-mono text-[13px] font-medium">
                    <Eye className="size-3.5 text-text-soft" />
                    {item.views}
                  </div>
                  <p className="text-[10.5px] uppercase tracking-wide text-text-soft">
                    views
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
