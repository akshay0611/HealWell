'use client'

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Stethoscope, Menu, X, ChevronDown, User } from 'lucide-react'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Doctors", href: "/doctors" },
    { name: "Time Table", href: "/time-table" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
    {
      name: "Contributors",
      items: [
        { name: "Volunteers", href: "/volunteers" },
        { name: "Partners", href: "/partners" },
      ],
    },
    {
      name: "Resources",
      items: [
        { name: "Testimonials", href: "/testimonials" },
        { name: "Gallery", href: "/gallery" },
      ],
    },
    {
      name: "Opportunities",
      items: [
        { name: "Careers", href: "/careers" },
        { name: "Awards", href: "/awards" },
      ],
    },
  ]

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown((prev) => (prev === dropdown ? null : dropdown))
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between py-4">
          <div className="flex items-center justify-between w-full lg:w-auto">
            <Link href="/" className="flex items-center space-x-2 group">
              <Stethoscope className="w-10 h-10 text-blue-500 group-hover:text-blue-600 transition-colors duration-200" />
              <span className="text-2xl font-bold text-blue-900 group-hover:text-blue-700 transition-colors duration-200">Heal Well</span>
            </Link>
            <button
              className="lg:hidden text-gray-700 hover:text-blue-500 transition-colors duration-200"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle mobile menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-wrap items-center justify-center space-x-6 mt-4 lg:mt-0">
            {navItems.map((item) => {
              if (item.items) {
                return (
                  <div
                    key={item.name}
                    className="relative group"
                    onMouseEnter={() => setOpenDropdown(item.name)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-500 transition-colors duration-200">
                      <span>{item.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {openDropdown === item.name && (
                      <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 shadow-lg rounded-md py-2 z-10">
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2 text-gray-700 hover:text-blue-500 hover:bg-gray-100 transition-colors duration-200"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-gray-700 hover:text-blue-500 transition-colors duration-200 ${
                    pathname === item.href ? "text-blue-500 font-semibold" : ""
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>

          <div className="hidden lg:flex items-center mt-4 lg:mt-0">
            <Link href="/auth" passHref>
              <User className="w-6 h-6 text-blue-500 hover:text-blue-600 transition-colors duration-200 cursor-pointer" />
            </Link>
          </div>
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
              {navItems.map((item) => {
                if (item.items) {
                  return (
                    <div key={item.name} className="space-y-2">
                      <button
                        className="flex items-center justify-between w-full text-gray-700 hover:text-blue-500 transition-colors duration-200"
                        onClick={() => toggleDropdown(item.name)}
                      >
                        <span>{item.name}</span>
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      {openDropdown === item.name && (
                        <div className="space-y-2 pl-4">
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block text-gray-700 hover:text-blue-500 transition-colors duration-200"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                }
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block text-gray-700 hover:text-blue-500 transition-colors duration-200 ${
                      pathname === item.href ? "text-blue-500 font-semibold" : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              })}
              <Link href="/auth" passHref>
                <User className="w-6 h-6 text-blue-500 hover:text-blue-600 transition-colors duration-200 cursor-pointer mx-auto" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}