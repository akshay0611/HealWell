'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Calendar, Users, Clock, Settings, BookOpen } from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/time-table', label: 'Time Table', icon: Calendar },
  { href: '/admin/appointments', label: 'Appointments', icon: Clock },
  { href: '/admin/doctors', label: 'Doctors', icon: Users },
  { href: '/admin/blogs', label: 'Blogs', icon: BookOpen },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminNavigation() {
  const pathname = usePathname()

  return (
    <nav className="w-64 bg-white shadow-lg h-screen">
      <div className="p-6 bg-gradient-to-r from-indigo-500 to-indigo-600">
        <h1 className="text-2xl font-bold text-white">HealWell Admin</h1>
      </div>
      <ul className="mt-6 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <li key={item.href}>
              <Link 
                href={item.href}
                className={`flex items-center px-6 py-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200 ${
                  isActive ? 'bg-indigo-50 text-indigo-600 border-r-4 border-indigo-600 font-medium' : ''
                }`}
              >
                <item.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`} />
                <span>{item.label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
      <div className="absolute bottom-0 w-64 p-6 bg-gray-50">
        <p className="text-sm text-gray-600">Logged in as Admin</p>
        <button className="mt-2 text-sm text-indigo-600 hover:underline">Logout</button>
      </div>
    </nav>
  )
}