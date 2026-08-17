export function LoadingSpinner({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex min-h-[40vh] w-full flex-col items-center justify-center gap-3 py-24">
      <span
        className="size-8 animate-spin rounded-full border-2 border-gold/30 border-t-gold"
        aria-hidden="true"
      />
      <p className="text-sm text-text-soft">{label}</p>
    </div>
  )
}
