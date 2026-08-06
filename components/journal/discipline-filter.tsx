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
              ? "bg-[#c98a2c] text-[#0f172a]"
              : "border border-[#dad5c8] bg-white text-[#0f172a] hover:border-[#c98a2c]"
          }`}
        >
          {d}
        </button>
      ))}
    </div>
  )
}
