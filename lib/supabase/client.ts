import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/lib/database.types'

// Browser-side Supabase client. Use in 'use client' components.
// Preview-safe fallbacks keep the client constructible when Supabase is not configured.
const SUPABASE_URL_FALLBACK = 'https://placeholder.supabase.co'
const SUPABASE_ANON_KEY_FALLBACK = 'preview-anon-key'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || SUPABASE_URL_FALLBACK
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || SUPABASE_ANON_KEY_FALLBACK

  return createBrowserClient<Database>(url, anonKey)
}
