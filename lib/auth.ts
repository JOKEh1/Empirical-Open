// Simple auth simulation for demo purposes
// In production, this would integrate with a real auth system (Better Auth, Supabase, etc.)

export type User = {
  id: string
  email: string
  role: "admin" | "editor" | "user"
  name: string
}

// Simulated auth store (in production, this would use sessions/cookies)
// Initialize with a demo admin user for testing the admin dashboard
let currentUser: User | null = {
  id: "demo-admin-001",
  email: "admin@empiricalopen.org",
  role: "admin",
  name: "Admin User",
}

export function setCurrentUser(user: User | null) {
  currentUser = user
}

export function getCurrentUser(): User | null {
  return currentUser
}

export function isAuthenticated(): boolean {
  return currentUser !== null
}

export function isAdmin(): boolean {
  return currentUser?.role === "admin"
}

export function logout() {
  currentUser = null
}
