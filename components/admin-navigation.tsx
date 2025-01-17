'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { LayoutDashboard, Calendar, User, Clock, Settings, BookOpen, LogOut, Handshake, Briefcase, Users, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/time-table', label: 'Time Table', icon: Calendar },
  { href: '/admin/appointments', label: 'Appointments', icon: Clock },
  { href: '/admin/doctors', label: 'Doctors', icon: User },
  { href: '/admin/blogs', label: 'Blogs', icon: BookOpen },
  { href: '/admin/careers', label: 'Careers', icon: Briefcase }, 
  { href: '/admin/volunteers', label: 'Volunteers', icon: Users }, 
  { href: '/admin/partners', label: 'Partners', icon: Handshake }, 
  { href: '/admin/contacts', label: 'Contacts', icon: Users }, 
  { href: '/admin/newsletter', label: 'Newsletter', icon: Users }, 
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminNavigation() {
  const pathname = usePathname()
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <motion.nav 
      className="bg-white shadow-lg h-screen flex flex-col relative"
      initial={{ width: 256 }}
      animate={{ width: isExpanded ? 256 : 80 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6 bg-gradient-to-r from-purple-700 to-indigo-600 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"
          initial={{ opacity: 0.1 }}
          animate={{ opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
        />
        <motion.h1 
          className="text-2xl font-bold text-white truncate relative z-10"
          initial={{ opacity: 1 }}
          animate={{ opacity: isExpanded ? 1 : 0 }}
        >
          HealWell Admin
        </motion.h1>
      </div>
      
      {/* Toggle Button */}
      <Button
        variant="secondary"
        size="icon"
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute top-4 -right-4 shadow-md rounded-full z-20 bg-white hover:bg-gray-100"
      >
        {isExpanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </Button>

      {/* Scrollable Navigation Links */}
      <ScrollArea className="flex-grow mt-6">
        <ul className="space-y-1 p-2">
          <TooltipProvider>
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.href}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link 
                        href={item.href}
                        className={`flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 ${
                          isActive ? 'bg-indigo-100 text-indigo-600 font-medium' : ''
                        }`}
                      >
                        <item.icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-gray-500'}`} />
                        <motion.span 
                          className="ml-3 text-sm"
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
      </ScrollArea>

      {/* User Info and Logout */}
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
            <p className="text-xs text-gray-500 truncate">
              admin@healwell.com
            </p>
          </div>
        </div>
        <Link href="/" className="w-full block mt-4">
          <Button 
            variant="outline" 
            className="w-full text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </Link>
      </motion.div>
    </motion.nav>
  )
}