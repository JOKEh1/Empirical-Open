import Link from "next/link"
import { Eye, MessageCircle, ArrowRight } from "lucide-react"
import type { JournalArticle } from "@/lib/queries/types"

interface ArticlePreviewProps {
  article: JournalArticle
  showJournal?: boolean
}

export function ArticlePreview({ article, showJournal = true }: ArticlePreviewProps) {
  return (
    <Link href={`/article/${article.id}`}>
      <div className="group rounded-xs border border-white/10 bg-paper p-5 transition-all hover:border-gold/50 hover:shadow-md">
        <div className="mb-3 flex items-start gap-3">
          <div className="flex-1 min-w-0">
            {showJournal && (
              <p className="mb-1 text-xs font-medium text-text-soft">
                {article.journal}
              </p>
            )}
            <h4 className="mb-1 font-serif text-[15px] font-semibold leading-snug text-ink group-hover:text-gold transition-colors">
              {article.title}
            </h4>
            <p className="text-xs text-ink-soft">{article.authors}</p>
          </div>
          <ArrowRight className="mt-0.5 size-4 shrink-0 flex-none transition-transform group-hover:translate-x-0.5" />
        </div>

        <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-ink">
          {article.abstract}
        </p>

        <div className="flex items-center gap-4 text-xs font-medium text-text-soft">
          <span className="inline-flex items-center gap-1">
            <Eye className="size-3.5" />
            {article.views.toLocaleString()} views
          </span>
          <span className="inline-flex items-center gap-1">
            <MessageCircle className="size-3.5" />
            {article.citations} citations
          </span>
          <span className="ml-auto">{article.publicationDate}</span>
        </div>
      </div>
    </Link>
  )
}
