import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { UserRoles } from './types/user'

function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname
  const hasAccessToken = request.cookies.has('accessToken')
  const hasRefreshToken = request.cookies.has('refreshToken')
  const hasAnyToken = hasAccessToken || hasRefreshToken
  const userRole = request.cookies.get('userRole')?.value

  const isPublicPath = path === '/' || path === '/login' || path === '/register'
  const isUserDashboard = path.startsWith('/dashboard')
  const isAdminDashboard = path.startsWith('/admin')
  const isProtectedPath = isUserDashboard || isAdminDashboard

  // Redirect authenticated users away from public paths (login/register)
  if (isPublicPath && hasAnyToken) {
    if (userRole === UserRoles.ADMIN) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Redirect unauthenticated users from protected paths to login
  if (isProtectedPath && !hasAnyToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect admins trying to access user dashboard to admin dashboard
  if (isUserDashboard && hasAnyToken && userRole === UserRoles.ADMIN) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  // Redirect non-admins trying to access admin dashboard to unauthorized page
  if (isAdminDashboard && hasAnyToken && userRole !== UserRoles.ADMIN) {
    return NextResponse.redirect(new URL('/unauthorized?type=admin', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/register',
    '/admin/:path*',
    '/dashboard/:path*',
  ],
}

export default proxy
