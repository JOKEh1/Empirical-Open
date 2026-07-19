const columns = [
  {
    heading: "Discover",
    links: ["Search articles", "Browse journals", "Calls for papers"],
  },
  {
    heading: "For institutions",
    links: ["Host your journal", "Onboarding guide", "Editor dashboard"],
  },
  {
    heading: "About",
    links: ["EmpiricalOpen", "Contact"],
  },
]

export function SiteFooter() {
  return (
    <footer className="bg-ink text-paper-raised/60">
      <div className="mx-auto max-w-[1180px] px-6 pb-7 pt-11 md:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div className="flex flex-wrap gap-x-14 gap-y-8">
            {columns.map((col) => (
              <div key={col.heading}>
                <h3 className="mb-3.5 font-mono text-[11px] uppercase tracking-[0.08em] text-gold-soft">
                  {col.heading}
                </h3>
                <ul className="flex flex-col gap-2.5 text-[13px]">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="transition-colors hover:text-paper-raised">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="font-serif text-lg font-semibold text-paper-raised">
            Empirical<span className="text-gold-soft">Open</span>
          </div>
        </div>

        <div className="mt-9 border-t border-white/10 pt-5 text-xs">
          © 2026 EmpiricalOpen — a product of Midach Academic Support Services Ltd.
          Demo interface for design review.
        </div>
      </div>
    </footer>
  )
}
