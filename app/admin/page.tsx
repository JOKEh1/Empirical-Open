import { redirect } from 'next/navigation'

// Per the role spec, "/admin" is the main admin dashboard.
// middleware.ts already gates every /admin/* path (auth + role
// check), so this bare route just lands on the canonical URL.
export default function AdminIndexPage() {
  redirect('/admin/dashboard')
}
