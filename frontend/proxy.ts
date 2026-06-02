import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname
  const searchParams = request.nextUrl.searchParams
  const hasAccessToken = request.cookies.has('accessToken')
  const hasRefreshToken = request.cookies.has('refreshToken')
  const hasAnyToken = hasAccessToken || hasRefreshToken

  const isPublicPath = path === '/' || path === '/login' || path === '/register'
  const isProtectedPath = path.startsWith('/dashboard')
  const isSessionExpired = searchParams.get('session') === 'expired'

  if (isSessionExpired && hasAnyToken) {
    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.delete('accessToken')
    response.cookies.delete('refreshToken')
    return response
  }
  if (isPublicPath && hasAnyToken && !isSessionExpired) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if (isProtectedPath && !hasAnyToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

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
