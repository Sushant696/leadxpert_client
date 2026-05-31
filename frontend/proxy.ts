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
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if (isProtectedPath && !hasAnyToken) {
    return NextResponse.redirect(new URL('/login', request.url))
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
