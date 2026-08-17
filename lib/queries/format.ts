// Small date/progress formatting helpers shared by the query layer.
// No schema changes required: CFP "progress" is derived from the real
// created_at -> closes_date window (time elapsed since the call was
// posted), and "urgent" uses the same <=14-days threshold the CFP
// detail page already used.

export function daysLeftFrom(closesDate: string): number {
  const now = new Date()
  const closes = new Date(`${closesDate}T23:59:59`)
  return Math.max(0, Math.ceil((closes.getTime() - now.getTime()) / 86_400_000))
}

export function formatCloses(closesDate: string): string {
  const d = new Date(`${closesDate}T00:00:00`)
  return `Closes ${d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}`
}

export function progressFrom(createdAt: string, closesDate: string): number {
  const start = new Date(createdAt).getTime()
  const end = new Date(`${closesDate}T23:59:59`).getTime()
  const now = Date.now()
  if (end <= start) return 100
  const pct = ((now - start) / (end - start)) * 100
  return Math.min(100, Math.max(0, Math.round(pct)))
}

export function isUrgent(closesDate: string): boolean {
  return daysLeftFrom(closesDate) <= 14
}

export function formatRelativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const sec = Math.floor(diffMs / 1000)
  if (sec < 60) return "just now"
  const min = Math.floor(sec / 60)
  if (min < 60) return `${min} minute${min === 1 ? "" : "s"} ago`
  const hr = Math.floor(min / 60)
  if (hr < 24) return `${hr} hour${hr === 1 ? "" : "s"} ago`
  const day = Math.floor(hr / 24)
  if (day < 30) return `${day} day${day === 1 ? "" : "s"} ago`
  const month = Math.floor(day / 30)
  if (month < 12) return `${month} month${month === 1 ? "" : "s"} ago`
  const year = Math.floor(month / 12)
  return `${year} year${year === 1 ? "" : "s"} ago`
}

/** "Jul 12, 2026" — used on the full announcements page. */
export function formatDateLong(dateStr: string): string {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(
    new Date(`${dateStr}T00:00:00`),
  )
}

/** "12 Jul 2026" — used in compact homepage widgets. */
export function formatDateShort(dateStr: string): string {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}
