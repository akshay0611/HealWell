import { NextResponse } from 'next/server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Pass the cookies function directly
  const supabase = createServerComponentClient({
    cookies: () => cookies(), // Use the cookies function directly
  });

  // Check if the user has a valid session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Redirect unauthenticated users trying to access /admin
  if (!session && req.nextUrl.pathname.startsWith('/admin')) {
    const signInUrl = new URL('/admin-signin', req.url);
    return NextResponse.redirect(signInUrl);
  }

  return res;
}

// Apply middleware to /admin and its sub-paths
export const config = {
  matcher: ['/admin/:path*'], // Protect /admin and its sub-routes
};
