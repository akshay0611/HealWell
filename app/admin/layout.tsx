import { ReactNode } from 'react';
import AdminNavigation from '@/components/admin-navigation';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const revalidate = 0; // Disable caching for authentication-sensitive routes

export default async function AdminLayout({ children }: { children: ReactNode }) {
  // Initialize Supabase server-side client
  const supabase = createServerComponentClient({ cookies });

  // Fetch the authenticated user's session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Redirect unauthenticated users to the sign-in page
  if (!session) {
    redirect('/admin-signin');
  }

  // Render the admin layout for authenticated users
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminNavigation />
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <div className="container mx-auto px-6 py-8">{children}</div>
      </main>
    </div>
  );
}