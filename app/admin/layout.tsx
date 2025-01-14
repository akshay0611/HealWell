'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import AdminNavigation from '@/components/admin-navigation';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const user = useAuth();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (user === null && !loading) {
      // Redirect only after confirming that user is null and loading is complete
      router.replace('/'); 
    }
  }, [user, loading, router]);

  useEffect(() => {
    // Update loading state when the user is fetched
    if (user !== undefined) {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  // Render the layout only if the user is authenticated
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminNavigation />
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <div className="container mx-auto px-6 py-8">{children}</div>
      </main>
    </div>
  );
}
