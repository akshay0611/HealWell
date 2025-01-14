import { ReactNode } from 'react'
import AdminNavigation from '@/components/admin-navigation'

export default function AdminLayout({ children }: { children: ReactNode }) {

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminNavigation />
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
      <div className="container mx-auto px-6 py-8">
          {children}
        </div>
      </main>
    </div>
   )
  }