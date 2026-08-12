'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { Search, ShieldCheck, ShieldOff, User as UserIcon } from 'lucide-react'
import { getCurrentUser, type User } from '@/lib/auth'
import { createClient } from '@/lib/supabase/client'

type AdminListedUser = {
  id: string
  email: string
  name: string
  affiliation: string
  role: 'admin' | 'editor' | 'user'
  avatar_color: string
  verified: boolean
  created_at: string
}

const roleBadge: Record<AdminListedUser['role'], string> = {
  admin: 'bg-gold/20 text-gold',
  editor: 'bg-jade/20 text-jade',
  user: 'bg-white/10 text-text-soft',
}

export default function AdminUsersPage() {
  const router = useRouter()
  const supabase = createClient()

  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [ready, setReady] = useState(false)
  const [users, setUsers] = useState<AdminListedUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [pendingId, setPendingId] = useState<string | null>(null)

  const loadUsers = useCallback(async () => {
    setLoading(true)
    setError(null)
    const { data, error: err } = await supabase.rpc('admin_list_users')
    if (err) setError(err.message)
    else setUsers((data as AdminListedUser[]) ?? [])
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // UX guard only; middleware.ts enforces this server-side.
    // The real gate is admin_list_users()/admin_set_user_role()
    // re-checking is_admin() on every call.
    let cancelled = false
    getCurrentUser().then((u) => {
      if (cancelled) return
      if (!u) {
        router.push('/login?redirect=/admin/users')
      } else if (u.role !== 'admin') {
        router.push('/')
      } else {
        setCurrentUser(u)
        setReady(true)
        loadUsers()
      }
    })
    return () => {
      cancelled = true
    }
  }, [router, loadUsers])

  async function handleRoleChange(target: AdminListedUser, newRole: AdminListedUser['role']) {
    setError(null)
    setPendingId(target.id)
    const { error: err } = await supabase.rpc('admin_set_user_role', {
      target_id: target.id,
      new_role: newRole,
    })
    if (err) {
      setError(err.message)
    } else {
      await loadUsers()
    }
    setPendingId(null)
  }

  const filtered = users.filter((u) => {
    const q = query.trim().toLowerCase()
    if (!q) return true
    return u.email.toLowerCase().includes(q) || u.name.toLowerCase().includes(q)
  })

  if (!ready) return null

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />

      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-5xl px-8 py-10">
          <div className="mb-10">
            <h1 className="font-serif text-3xl font-semibold text-paper mb-2">
              Registered Users
            </h1>
            <p className="text-text-soft">
              Manage registered user accounts and grant or revoke admin rights.
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-xs border border-rust/40 bg-rust/10 px-4 py-3 text-sm text-rust">
              {error}
            </div>
          )}

          <div className="mb-6 relative max-w-sm">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-soft" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or email…"
              className="w-full rounded-xs border border-white/10 bg-ink py-2.5 pl-9 pr-3 text-sm text-paper placeholder:text-text-soft/60 focus:border-gold focus:outline-none"
            />
          </div>

          {loading ? (
            <p className="text-sm text-text-soft">Loading…</p>
          ) : filtered.length === 0 ? (
            <p className="rounded-xs border border-white/10 bg-paper-raised/50 p-6 text-sm text-text-soft">
              No users found.
            </p>
          ) : (
            <div className="overflow-hidden rounded-xs border border-white/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-paper-raised/50 text-left text-xs uppercase tracking-wide text-text-soft">
                    <th className="px-4 py-3 font-medium">User</th>
                    <th className="px-4 py-3 font-medium">Affiliation</th>
                    <th className="px-4 py-3 font-medium">Role</th>
                    <th className="px-4 py-3 font-medium">Joined</th>
                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((u) => {
                    const isSelf = u.id === currentUser?.id
                    const isPending = pendingId === u.id
                    return (
                      <tr key={u.id} className="border-b border-white/5 last:border-0">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="flex size-8 items-center justify-center rounded-full bg-white/5 text-text-soft">
                              <UserIcon className="size-4" />
                            </div>
                            <div>
                              <p className="text-paper">{u.name || '—'}</p>
                              <p className="text-xs text-text-soft">{u.email}</p>
                            </div>
                            {isSelf && (
                              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-text-soft">
                                You
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-text-soft">{u.affiliation || '—'}</td>
                        <td className="px-4 py-3">
                          <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${roleBadge[u.role]}`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-text-soft">
                          {new Date(u.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex justify-end gap-2">
                            {u.role !== 'admin' ? (
                              <button
                                onClick={() => handleRoleChange(u, 'admin')}
                                disabled={isPending}
                                className="flex items-center gap-1.5 rounded-xs border border-gold/40 px-3 py-1.5 text-xs font-medium text-gold transition-colors hover:bg-gold/10 disabled:opacity-50"
                              >
                                <ShieldCheck className="size-3.5" />
                                Make admin
                              </button>
                            ) : (
                              <button
                                onClick={() => handleRoleChange(u, 'user')}
                                disabled={isPending || isSelf}
                                title={isSelf ? "You can't revoke your own admin role" : undefined}
                                className="flex items-center gap-1.5 rounded-xs border border-rust/40 px-3 py-1.5 text-xs font-medium text-rust transition-colors hover:bg-rust/10 disabled:opacity-40 disabled:cursor-not-allowed"
                              >
                                <ShieldOff className="size-3.5" />
                                Revoke admin
                              </button>
                            )}
                            {u.role === 'user' && (
                              <button
                                onClick={() => handleRoleChange(u, 'editor')}
                                disabled={isPending}
                                className="rounded-xs border border-jade/40 px-3 py-1.5 text-xs font-medium text-jade transition-colors hover:bg-jade/10 disabled:opacity-50"
                              >
                                Make editor
                              </button>
                            )}
                            {u.role === 'editor' && (
                              <button
                                onClick={() => handleRoleChange(u, 'user')}
                                disabled={isPending}
                                className="rounded-xs border border-white/10 px-3 py-1.5 text-xs font-medium text-text-soft transition-colors hover:bg-white/5 disabled:opacity-50"
                              >
                                Remove editor
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
