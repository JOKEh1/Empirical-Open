import Link from "next/link"
import type { ReactNode } from "react"
import { ArrowLeft, BookOpen, MessageSquare, Search } from "lucide-react"

const highlights = [
  { icon: Search, text: "Search 40,000+ peer-reviewed articles from across Africa" },
  { icon: BookOpen, text: "Follow journals hosted by universities and institutions" },
  { icon: MessageSquare, text: "Join scholarly discussions on the research you care about" },
]

export function AuthShell({
  eyebrow,
  title,
  subtitle,
  children,
  footer,
}: {
  eyebrow: string
  title: string
  subtitle: string
  children: ReactNode
  footer?: ReactNode
}) {
  return (
    <main className="flex min-h-svh flex-col bg-ink text-paper-raised lg:flex-row">
      {/* Brand panel */}
      <section className="relative hidden overflow-hidden border-r border-white/10 lg:flex lg:w-[46%] lg:flex-col lg:justify-between lg:p-12">
        <div
          className="pointer-events-none absolute -left-24 -top-28 size-[460px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 40% 40%, rgba(201,138,44,.2), transparent 70%)",
          }}
          aria-hidden="true"
        />

        <Link href="/" className="relative flex items-center gap-2.5">
          <span
            className="size-9 shrink-0 rounded-full"
            style={{
              background:
                "conic-gradient(from 220deg, var(--gold), var(--jade) 55%, var(--gold))",
            }}
            aria-hidden="true"
          />
          <span className="font-serif text-xl font-semibold tracking-tight">
            Empirical<span className="text-gold-soft">Open</span>
          </span>
        </Link>

        <div className="relative">
          <p className="mb-4 flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.12em] text-gold-soft">
            <span className="inline-block h-px w-5 bg-gold-soft" />
            Africa&apos;s research, one front door
          </p>
          <h2 className="max-w-md text-balance font-serif text-3xl font-semibold leading-[1.12]">
            One account for every journal on the continent.
          </h2>
          <ul className="mt-8 flex flex-col gap-4">
            {highlights.map((h) => (
              <li key={h.text} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-xs bg-white/5 text-gold-soft ring-1 ring-white/10">
                  <h.icon className="size-4" />
                </span>
                <span className="text-[14.5px] leading-relaxed text-paper-raised/75">
                  {h.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative font-mono text-xs text-paper-raised/40">
          EmpiricalOpen Central Hub
        </p>
      </section>

      {/* Form panel */}
      <section className="flex flex-1 flex-col px-6 py-8 sm:px-10 md:py-12">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-paper-raised/70 transition-colors hover:text-paper-raised"
          >
            <ArrowLeft className="size-4" />
            Back to hub
          </Link>
          <Link href="/" className="flex items-center gap-2 lg:hidden">
            <span
              className="size-7 shrink-0 rounded-full"
              style={{
                background:
                  "conic-gradient(from 220deg, var(--gold), var(--jade) 55%, var(--gold))",
              }}
              aria-hidden="true"
            />
            <span className="font-serif text-base font-semibold tracking-tight">
              Empirical<span className="text-gold-soft">Open</span>
            </span>
          </Link>
        </div>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-10">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.12em] text-gold-soft">
            {eyebrow}
          </p>
          <h1 className="text-balance font-serif text-3xl font-semibold leading-tight md:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-pretty leading-relaxed text-paper-raised/70">
            {subtitle}
          </p>

          <div className="mt-8">{children}</div>

          {footer && (
            <div className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-paper-raised/70">
              {footer}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
