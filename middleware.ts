import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Only protect /admin routes
  if (pathname.startsWith('/admin')) {
    // Allow these public auth pages without a session
    const publicRoutes = ['/admin/login', '/admin/forgot-password', '/admin/reset-password']
    if (publicRoutes.some(route => pathname.startsWith(route))) {
      return NextResponse.next()
    }

    // Check for the secure cookie
    const session = req.cookies.get('admin_session')?.value

    if (session !== 'authenticated') {
      // Not authenticated, redirect to login
      const loginUrl = new URL('/admin/login', req.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}