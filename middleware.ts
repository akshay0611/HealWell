import { NextResponse, type NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Check API routes first
  if (req.nextUrl.pathname.startsWith('/api')) {
    // Skip authentication for public API routes (adjust as needed)
    if (req.nextUrl.pathname.startsWith('/api/auth')) {
      return res
    }

    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return new NextResponse(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }
  }

  // Existing admin route protection
  if (req.nextUrl.pathname.startsWith('/admin')) {
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      const signInUrl = new URL('/admin-signin', req.url)
      return NextResponse.redirect(signInUrl)
    }
  }

  return res
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/:path*' // Protect all API routes
  ]
}