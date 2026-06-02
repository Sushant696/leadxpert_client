"use server"
import { redirect } from 'next/navigation'

import { UserRole, UserRoles } from '@/types/user'
import { getCurrentUserAction } from "@/features/auth/auth-action"

interface RouteProtectionResult {
  isAuthenticated: boolean
  user: any | null
  role: UserRole | null
}

export async function protectAdminRoute(): Promise<RouteProtectionResult> {
  const result = await getCurrentUserAction()

  // Not authenticated or session expired
  if (!result.success || result.sessionExpired || !result.data) {
    redirect('/login?session=expired')
  }

  // Not an admin
  if (result.data.role !== UserRoles.ADMIN) {
    redirect('/unauthorized?type=admin')
  }

  return {
    isAuthenticated: true,
    user: result.data,
    role: result.data.role
  }
}

export async function protectUserRoute(): Promise<RouteProtectionResult> {
  const result = await getCurrentUserAction()

  // Not authenticated or session expired
  if (!result.success || result.sessionExpired || !result.data) {
    redirect('/login?session=expired')
  }

  // Admin trying to access user routes
  if (result.data.role === UserRoles.ADMIN) {
    redirect('/admin')
  }

  return {
    isAuthenticated: true,
    user: result.data,
    role: result.data.role
  }
}

// Generic protection that just checks authentication
export async function protectRoute(): Promise<RouteProtectionResult> {
  const result = await getCurrentUserAction()

  if (!result.success || result.sessionExpired || !result.data) {
    redirect('/login?session=expired')
  }

  return {
    isAuthenticated: true,
    user: result.data,
    role: result.data.role
  }
}
