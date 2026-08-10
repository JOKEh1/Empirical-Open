'use client'

// Real authentication built on Supabase Auth + the profiles table.
// Client-side helpers for use in 'use client' components.
// Server-side route protection lives in middleware.ts.

import { createClient } from '@/lib/supabase/client'
import type { UserRole, AvatarColor } from '@/lib/database.types'

export type User = {
  id: string
  email: string
  name: string
  affiliation: string
  role: UserRole
  avatarColor: AvatarColor
  verified: boolean
}

function supabase() {
  return createClient()
}

async function profileFor(id: string, email: string): Promise<User> {
  const { data } = await supabase()
    .from('profiles')
    .select('name, affiliation, role, avatar_color, verified')
    .eq('id', id)
    .single()

  return {
    id,
    email,
    name: data?.name ?? email.split('@')[0],
    affiliation: data?.affiliation ?? '',
    role: data?.role ?? 'user',
    avatarColor: data?.avatar_color ?? 'jade',
    verified: data?.verified ?? false,
  }
}

/** Current signed-in user with profile, or null. */
export async function getCurrentUser(): Promise<User | null> {
  const { data } = await supabase().auth.getUser()
  if (!data.user) return null
  return profileFor(data.user.id, data.user.email ?? '')
}

export async function isAuthenticated(): Promise<boolean> {
  const { data } = await supabase().auth.getSession()
  return data.session !== null
}

export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser()
  return user?.role === 'admin'
}

export async function signIn(email: string, password: string): Promise<{ error: string | null }> {
  const { error } = await supabase().auth.signInWithPassword({ email, password })
  return { error: error ? friendlyError(error.message) : null }
}

export async function signUp(params: {
  email: string
  password: string
  name: string
  affiliation?: string
}): Promise<{ error: string | null; needsEmailConfirm: boolean }> {
  const { data, error } = await supabase().auth.signUp({
    email: params.email,
    password: params.password,
    options: {
      data: { name: params.name, affiliation: params.affiliation ?? '' },
    },
  })
  if (error) return { error: friendlyError(error.message), needsEmailConfirm: false }
  return { error: null, needsEmailConfirm: data.session === null }
}

export async function signOut(): Promise<void> {
  await supabase().auth.signOut()
}

export async function requestPasswordReset(email: string): Promise<{ error: string | null }> {
  const { error } = await supabase().auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  })
  return { error: error ? friendlyError(error.message) : null }
}

export async function updatePassword(newPassword: string): Promise<{ error: string | null }> {
  const { error } = await supabase().auth.updateUser({ password: newPassword })
  return { error: error ? friendlyError(error.message) : null }
}

export async function updateProfileName(
  userId: string,
  name: string,
): Promise<{ error: string | null }> {
  const { error } = await supabase().from('profiles').update({ name }).eq('id', userId)
  return { error: error ? error.message : null }
}

export async function updateEmail(newEmail: string): Promise<{ error: string | null }> {
  const { error } = await supabase().auth.updateUser({ email: newEmail })
  return { error: error ? friendlyError(error.message) : null }
}

/** Subscribe to auth state changes; returns unsubscribe. */
export function onAuthChange(cb: (loggedIn: boolean) => void): () => void {
  const { data } = supabase().auth.onAuthStateChange((_event, session) => {
    cb(session !== null)
  })
  return () => data.subscription.unsubscribe()
}

function friendlyError(message: string): string {
  if (/invalid login credentials/i.test(message)) return 'Incorrect email or password.'
  if (/already registered/i.test(message)) return 'An account with this email already exists.'
  if (/rate limit/i.test(message)) return 'Too many attempts. Please wait a moment and try again.'
  if (/password should be/i.test(message)) return 'Password must be at least 6 characters.'
  return message
}
