"use client"

import { disciplines } from "@/lib/journals-data"

interface DisciplineFilterProps {
  selected: string
  onSelect: (discipline: string) => void
}

export function DisciplineFilter({ selected, onSelect }: DisciplineFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {disciplines.map((d) => (
        <button
          key={d}
          onClick={() => onSelect(d)}
          className={`rounded-xs px-3 py-1.5 text-sm font-medium transition-all ${
            selected === d
              ? "bg-gold text-ink"
              : "border border-white/20 text-paper-raised hover:border-white/40"
          }`}
        >
          {d}
        </button>
      ))}
    </div>
  )
}
