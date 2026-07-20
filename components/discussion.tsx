import { Quote } from "lucide-react"
import { SectionHeader } from "@/components/section-header"
import { comments } from "@/lib/hub-data"

const avatarColor: Record<string, string> = {
  jade: "bg-jade",
  gold: "bg-gold",
  rust: "bg-rust",
}

export function Discussion() {
  return (
    <section>
      <div className="mx-auto max-w-[1180px] px-6 py-14 md:px-8">
        <SectionHeader tag="Reader discussion" title="Join the conversation" />

        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="flex flex-col">
            {comments.map((c) => (
              <div
                key={c.who}
                className="flex gap-3.5 border-b border-line py-5 last:border-none"
              >
                <span
                  className={`flex size-9 shrink-0 items-center justify-center rounded-full font-serif text-sm font-semibold text-paper-raised ${avatarColor[c.color]}`}
                  aria-hidden="true"
                >
                  {c.initials}
                </span>
                <div>
                  <span className="mb-1.5 block text-[11.5px] text-jade">
                    {c.article}
                  </span>
                  <p className="mb-0.5 text-[13.5px] font-semibold text-ink">
                    {c.who}
                    <span className="ml-1.5 text-xs font-normal text-text-soft">
                      {c.affiliation}
                    </span>
                  </p>
                  <p className="text-sm leading-relaxed text-ink">{c.text}</p>
                </div>
              </div>
            ))}
          </div>

          <aside className="h-fit rounded-xs border border-line bg-paper-raised p-6">
            <Quote className="mb-3 size-6 text-gold" />
            <h3 className="mb-3 font-serif text-[15px] font-semibold text-ink">
              How discussion works
            </h3>
            <p className="mb-5 text-[13px] leading-relaxed text-text-soft">
              Readers verify with an institutional email to comment. Each
              journal&apos;s editors moderate discussion on their own articles, and
              every comment can be flagged for review.
            </p>
            <button className="w-full rounded-xs bg-gold px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-gold-soft">
              Sign in to comment
            </button>
          </aside>
        </div>
      </div>
    </section>
  )
}
