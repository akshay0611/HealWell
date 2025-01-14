// middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('supabase-auth-token');
  console.log('Token:', token);
  console.log('Path:', req.nextUrl.pathname);

  if (!token && req.nextUrl.pathname.startsWith('/admin')) {
    const url = req.nextUrl.clone();
    url.pathname = '/';
    console.log('Redirecting to home due to missing token');
    return NextResponse.redirect(url);
  }

  console.log('Token valid, allowing access');
  return NextResponse.next();
}

  