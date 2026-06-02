import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { UserRoles } from './types/user'

function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname
  const searchParams = request.nextUrl.searchParams
  const hasAccessToken = request.cookies.has('accessToken')
  const hasRefreshToken = request.cookies.has('refreshToken')
  const hasAnyToken = hasAccessToken || hasRefreshToken
  const userRole = request.cookies.get('userRole')?.value

  const isPublicPath = path === '/' || path === '/login' || path === '/register'
  const isUserDashboard = path.startsWith('/dashboard')
  const isAdminDashboard = path.startsWith('/admin')
  const isProtectedPath = isUserDashboard || isAdminDashboard
  const isSessionExpired = searchParams.get('session') === 'expired'

  if (isSessionExpired && hasAnyToken) {
    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.delete('accessToken')
    response.cookies.delete('refreshToken')
    response.cookies.delete('userRole')
    return response
  }

  if (isPublicPath && hasAnyToken && !isSessionExpired) {
    if (userRole === UserRoles.ADMIN) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if (isProtectedPath && !hasAnyToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isProtectedPath && hasAnyToken) {
    if (isUserDashboard && userRole === UserRoles.ADMIN) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }

    if (isAdminDashboard && userRole !== UserRoles.ADMIN) {
      const response = NextResponse.redirect(new URL('/unauthorized?type=admin', request.url))
      response.cookies.delete('accessToken')
      response.cookies.delete('refreshToken')
      response.cookies.delete('userRole')
      return response
    }
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
