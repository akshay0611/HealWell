'use client'

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Stethoscope, Menu, X, Calendar } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Doctors", href: "/doctors" },
    { name: "Time Table", href: "/time-table" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <nav className="bg-white py-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <Stethoscope className="w-10 h-10 text-blue-500 group-hover:text-blue-600 transition-colors duration-200" />
            <span className="text-2xl font-bold text-blue-900 group-hover:text-blue-700 transition-colors duration-200">Heal Well</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-gray-700 hover:text-blue-500 transition-colors duration-200 ${
                  pathname === item.href ? "text-blue-500 font-semibold" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/appointment" passHref>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors duration-200">
                <Calendar className="w-4 h-4 mr-2" />
                Appointment
              </Button>
            </Link>
          </div>

          {/* Mobile Navigation Toggle */}
          <button
            className="lg:hidden text-gray-700 hover:text-blue-500 transition-colors duration-200"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle mobile menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block text-gray-700 hover:text-blue-500 transition-colors duration-200 ${
                    pathname === item.href ? "text-blue-500 font-semibold" : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link href="/appointment" passHref>
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors duration-200">
                  <Calendar className="w-4 h-4 mr-2" />
                  Appointment
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

