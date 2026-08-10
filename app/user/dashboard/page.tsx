'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Bookmark, Settings, Mail, Lock, LogOut, Heart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { getCurrentUser, signOut, updatePassword, updateEmail, updateProfileName, type User } from '@/lib/auth'

// Mock saved articles data
const mockSavedArticles = [
  {
    id: 'article-001',
    title: 'Community health worker networks and maternal mortality reduction in rural Kaduna State: a five-year cohort analysis',
    authors: 'Dr. Amara Okafor, Prof. Chidi Nnamdi',
    journal: 'West African Journal of Public Health',
    date: 'March 15, 2024',
    discipline: 'Public Health',
    views: 342,
    citations: 12,
  },
  {
    id: 'article-002',
    title: 'Low-cost water purification using moringa seed extract in peri-urban settlements',
    authors: 'Dr. Kofi Mensah, Dr. Ama Asante',
    journal: 'Journal of Environmental Engineering',
    date: 'February 28, 2024',
    discipline: 'Agricultural Sciences',
    views: 156,
    citations: 5,
  },
]

export default function UserDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [activeTab, setActiveTab] = useState<'bookmarks' | 'settings'>('bookmarks')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [profileNotice, setProfileNotice] = useState<string | null>(null)
  const [passwordNotice, setPasswordNotice] = useState<string | null>(null)

  useEffect(() => {
    // UX guard only; middleware.ts enforces this server-side.
    let cancelled = false
    getCurrentUser().then((u) => {
      if (cancelled) return
      if (!u) {
        router.push('/login?redirect=/user/dashboard')
        return
      }
      setUser(u)
      setEmail(u.email)
      setName(u.name)
    })
    return () => {
      cancelled = true
    }
  }, [router])
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordNotice(null)
    if (newPassword !== confirmPassword || newPassword.length < 8) {
      setPasswordNotice('Passwords must match and be at least 8 characters.')
      return
    }
    const { error } = await updatePassword(newPassword)
    if (error) {
      setPasswordNotice(error)
      return
    }
    setPasswordNotice('Password updated successfully.')
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setShowPasswordForm(false)
  }

  const handleProfileSave = async () => {
    setProfileNotice(null)
    const messages: string[] = []
    if (user && name.trim() && name.trim() !== user.name) {
      const { error } = await updateProfileName(user.id, name.trim())
      messages.push(error ? `Name: ${error}` : 'Name updated.')
    }
    if (user && email.trim() && email.trim() !== user.email) {
      const { error } = await updateEmail(email.trim())
      messages.push(error ? `Email: ${error}` : 'Confirmation sent to your new email address.')
    }
    setProfileNotice(messages.length ? messages.join(' ') : 'Nothing to update.')
  }

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <main className="min-h-screen bg-ink">
      {/* Header with back button */}
      <div className="border-b border-white/10 bg-paper-raised/5 px-6 py-6">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="flex items-center gap-2 text-sm text-text-soft hover:text-paper mb-4">
            <ArrowLeft className="size-4" />
            Back to Discover
          </Link>
          <div className="flex items-center gap-4">
            <div className="size-16 rounded-full bg-gradient-to-br from-gold to-gold/60 flex items-center justify-center">
              <span className="text-2xl font-serif font-semibold text-ink">
                {name?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
            <div>
              <h1 className="font-serif text-3xl font-bold text-paper">{name || 'Your Profile'}</h1>
              <p className="text-sm text-text-soft">{email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-white/10 bg-paper-raised/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('bookmarks')}
              className={`py-4 px-1 font-medium transition-colors border-b-2 ${
                activeTab === 'bookmarks'
                  ? 'border-gold text-gold'
                  : 'border-transparent text-text-soft hover:text-paper'
              }`}
            >
              <div className="flex items-center gap-2">
                <Bookmark className="size-5" />
                Saved Articles
              </div>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-4 px-1 font-medium transition-colors border-b-2 ${
                activeTab === 'settings'
                  ? 'border-gold text-gold'
                  : 'border-transparent text-text-soft hover:text-paper'
              }`}
            >
              <div className="flex items-center gap-2">
                <Settings className="size-5" />
                Account Settings
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Saved Articles Tab */}
        {activeTab === 'bookmarks' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-bold text-paper mb-1">Saved Articles</h2>
              <p className="text-text-soft">Articles you've bookmarked for later reading</p>
            </div>

            {mockSavedArticles.length > 0 ? (
              <div className="space-y-4">
                {mockSavedArticles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/article/${article.id}`}
                    className="block group rounded-xs border border-white/10 bg-paper-raised/50 p-6 transition-all hover:border-gold/50 hover:bg-paper-raised/80"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-3 mb-2">
                          <Heart className="size-5 mt-0.5 flex-shrink-0 text-gold" />
                          <h3 className="font-serif text-lg font-semibold text-paper group-hover:text-gold transition-colors">
                            {article.title}
                          </h3>
                        </div>
                        <p className="text-sm text-text-soft mb-2">{article.authors}</p>
                      </div>
                      <div className="rounded-xs bg-white/5 border border-white/10 px-3 py-1 text-xs font-medium text-paper-raised whitespace-nowrap">
                        {article.discipline}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-text-soft">
                      <div className="flex gap-4">
                        <span>{article.journal}</span>
                        <span>{article.date}</span>
                      </div>
                      <div className="flex gap-4">
                        <span>{article.views} views</span>
                        <span>{article.citations} citations</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-xs border border-white/10 bg-paper-raised/50 p-12 text-center">
                <Bookmark className="size-12 mx-auto text-text-soft/40 mb-3" />
                <p className="text-paper mb-2">No saved articles yet</p>
                <p className="text-sm text-text-soft mb-6">Bookmark articles to save them for later</p>
                <Link
                  href="/journals"
                  className="inline-block rounded-xs bg-gold px-6 py-2 font-semibold text-ink hover:bg-gold-soft transition-colors"
                >
                  Browse Journals
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Account Settings Tab */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl space-y-8">
            <div>
              <h2 className="font-serif text-2xl font-bold text-paper mb-1">Account Settings</h2>
              <p className="text-text-soft">Manage your profile and account preferences</p>
            </div>

            {/* Profile Information */}
            <div className="rounded-xs border border-white/10 bg-paper-raised/50 p-6">
              <h3 className="font-semibold text-paper mb-6 flex items-center gap-2">
                <Mail className="size-5" />
                Profile Information
              </h3>

              <form className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-paper mb-2">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xs border border-white/20 bg-white/5 px-4 py-2.5 text-paper placeholder-text-soft/50 transition-colors hover:border-white/30 focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-paper mb-2">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xs border border-white/20 bg-white/5 px-4 py-2.5 text-paper placeholder-text-soft/50 transition-colors hover:border-white/30 focus:border-gold focus:outline-none"
                  />
                </div>

                {profileNotice && (
                  <p className="text-sm text-gold-soft">{profileNotice}</p>
                )}
                <button
                  type="button"
                  onClick={handleProfileSave}
                  className="rounded-xs bg-gold px-6 py-2.5 font-semibold text-ink hover:bg-gold-soft transition-colors"
                >
                  Save Changes
                </button>
              </form>
            </div>

            {/* Password */}
            <div className="rounded-xs border border-white/10 bg-paper-raised/50 p-6">
              <h3 className="font-semibold text-paper mb-6 flex items-center gap-2">
                <Lock className="size-5" />
                Password
              </h3>

              {passwordNotice && (
                <p className="mb-4 text-sm text-gold-soft">{passwordNotice}</p>
              )}
              {!showPasswordForm ? (
                <button
                  onClick={() => setShowPasswordForm(true)}
                  className="rounded-xs border border-white/20 px-6 py-2.5 font-medium text-paper transition-colors hover:border-white/40 hover:bg-white/5"
                >
                  Change Password
                </button>
              ) : (
                <form className="space-y-5" onSubmit={handlePasswordChange}>
                  <div>
                    <label className="block text-sm font-medium text-paper mb-2">Current Password</label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full rounded-xs border border-white/20 bg-white/5 px-4 py-2.5 text-paper placeholder-text-soft/50 transition-colors hover:border-white/30 focus:border-gold focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-paper mb-2">New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full rounded-xs border border-white/20 bg-white/5 px-4 py-2.5 text-paper placeholder-text-soft/50 transition-colors hover:border-white/30 focus:border-gold focus:outline-none"
                      required
                      minLength={8}
                    />
                    <p className="text-xs text-text-soft mt-1">Minimum 8 characters</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-paper mb-2">Confirm Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full rounded-xs border border-white/20 bg-white/5 px-4 py-2.5 text-paper placeholder-text-soft/50 transition-colors hover:border-white/30 focus:border-gold focus:outline-none"
                      required
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="rounded-xs bg-gold px-6 py-2.5 font-semibold text-ink hover:bg-gold-soft transition-colors"
                    >
                      Update Password
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowPasswordForm(false)}
                      className="rounded-xs border border-white/20 px-6 py-2.5 font-medium text-paper transition-colors hover:border-white/40 hover:bg-white/5"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Sign Out */}
            <div className="rounded-xs border border-rust/30 bg-rust/5 p-6">
              <h3 className="font-semibold text-paper mb-3 flex items-center gap-2">
                <LogOut className="size-5 text-rust" />
                Sign Out
              </h3>
              <p className="text-sm text-text-soft mb-4">Sign out from your account on this device</p>
              <button
                onClick={handleSignOut}
                className="rounded-xs border border-rust/50 px-6 py-2.5 font-medium text-rust hover:bg-rust/10 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
