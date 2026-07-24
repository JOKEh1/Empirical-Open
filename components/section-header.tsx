import Link from "next/link"
import { ArrowRight } from "lucide-react"

type SectionHeaderProps = {
  tag: string
  title: string
  viewAll?: string
  viewAllHref?: string
}

export function SectionHeader({ tag, title, viewAll, viewAllHref }: SectionHeaderProps) {
  return (
    <div className="mb-7 flex items-end justify-between gap-4">
      <div>
        <span className="mb-2 block font-mono text-[11.5px] uppercase tracking-[0.1em] text-jade">
          {tag}
        </span>
        <h2 className="font-serif text-2xl font-semibold text-gold md:text-[29px]">{title}</h2>
      </div>
      {viewAll && (
        <Link
          href={viewAllHref || "#"}
          className="group inline-flex shrink-0 items-center gap-1 border-b border-text-soft pb-0.5 text-[13.5px] font-medium text-text-soft transition-colors hover:border-ink hover:text-ink"
        >
          {viewAll}
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  )
}
