'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, BookOpen, FileText, Home, LogOut } from 'lucide-react'
import { signOut } from '@/lib/auth'

const adminNav = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Journal Registry', href: '/admin/journals', icon: BookOpen },
  { label: 'Calls Manager', href: '/admin/calls', icon: FileText },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleSignOut() {
    await signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <div className="flex h-screen flex-col border-r border-white/10 bg-ink w-56">
      {/* Header */}
      <div className="border-b border-white/10 px-6 py-4">
        <h1 className="font-serif text-lg font-semibold text-gold">Admin Portal</h1>
        <p className="text-xs text-text-soft">Network Administration</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-6">
        {adminNav.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xs px-3 py-2.5 text-sm transition-colors ${
                isActive
                  ? 'bg-gold/20 text-gold'
                  : 'text-text-soft hover:bg-white/5 hover:text-slate-100'
              }`}
            >
              <Icon className="size-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 px-3 py-4 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xs px-3 py-2.5 text-sm text-text-soft transition-colors hover:bg-white/5 hover:text-slate-100"
        >
          <Home className="size-5" />
          Back to Hub
        </Link>
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-xs px-3 py-2.5 text-sm text-rust transition-colors hover:bg-rust/10"
        >
          <LogOut className="size-5" />
          Sign Out
        </button>
      </div>
    </div>
  )
}
