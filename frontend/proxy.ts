import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname

  const hasAccessToken = request.cookies.has('accessToken')
  const hasRefreshToken = request.cookies.has('refreshToken')
  const hasAnyToken = hasAccessToken || hasRefreshToken

  const isPublicPath = path === '/' || path === '/login' || path === '/register'
  const isProtectedPath = path.startsWith('/dashboard')

  if (isPublicPath && hasAnyToken) {
    // Redirecting authenticated user to dashboard  
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Access to protected routes & API wrapper will handle token validation and refresh
  if (isProtectedPath) {
    return NextResponse.next()
  }

  // access to public pages
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/register',
    '/dashboard/:path*',
  ],
}

export default proxy
