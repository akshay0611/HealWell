'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { LayoutDashboard, Calendar, Users, Clock, Settings, BookOpen, LogOut, Briefcase } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/time-table', label: 'Time Table', icon: Calendar },
  { href: '/admin/appointments', label: 'Appointments', icon: Clock },
  { href: '/admin/doctors', label: 'Doctors', icon: Users },
  { href: '/admin/blogs', label: 'Blogs', icon: BookOpen },
  { href: '/admin/careers', label: 'Careers', icon: Briefcase }, 
  { href: '/admin/volunteers', label: 'Volunteers', icon: Users }, 
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminNavigation() {
  const pathname = usePathname()
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <motion.nav 
      className="bg-white shadow-xl h-screen flex flex-col"
      initial={{ width: 256 }}
      animate={{ width: isExpanded ? 256 : 80 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6 bg-gradient-to-r from-purple-700 to-indigo-600">
        <motion.h1 
          className="text-2xl font-bold text-white truncate"
          initial={{ opacity: 1 }}
          animate={{ opacity: isExpanded ? 1 : 0 }}
        >
          HealWell Admin
        </motion.h1>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute top-4 -right-4 bg-white shadow-md rounded-full"
      >
        {isExpanded ? '<' : '>'}
      </Button>
      <ul className="flex-grow mt-6 space-y-1 overflow-y-auto">
        <TooltipProvider>
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link 
                      href={item.href}
                      className={`flex items-center px-6 py-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 ${
                        isActive ? 'bg-indigo-50 text-indigo-600 border-r-4 border-indigo-600 font-medium' : ''
                      }`}
                    >
                      <item.icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`} />
                      <motion.span 
                        className="ml-3"
                        initial={{ opacity: 1, width: 'auto' }}
                        animate={{ opacity: isExpanded ? 1 : 0, width: isExpanded ? 'auto' : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.label}
                      </motion.span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={10}>
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              </li>
            )
          })}
        </TooltipProvider>
      </ul>
      <motion.div 
        className="p-4 bg-gray-50 border-t border-gray-200"
        initial={{ opacity: 1, height: 'auto' }}
        animate={{ opacity: isExpanded ? 1 : 0, height: isExpanded ? 'auto' : 0 }}
      >
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/placeholder-avatar.jpg" alt="Admin" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              Admin User
            </p>
            <p className="text-sm text-gray-500 truncate">
              admin@healwell.com
            </p>
          </div>
        </div>
        <Link href="/" className="w-full">
  <Button 
    variant="outline" 
    className="w-full mt-4 text-indigo-600 hover:text-indigo-700"
  >
    <LogOut className="w-4 h-4 mr-2" />
    Logout
  </Button>
</Link>
      </motion.div>
    </motion.nav>
  )
}