import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

function proxy(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/' || path === '/login' || path === '/register'
  const isProtectedPath = path.startsWith('/dashboard')

  // Redirect to login if accessing protected route without token
  if (isProtectedPath && !accessToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect to dashboard if accessing auth pages with valid token
  if ((isPublicPath) && accessToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
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
