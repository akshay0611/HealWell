'use client'

import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const Footer = () => {
  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle subscription logic here
    console.log("Subscribed to newsletter")
  }

  return (
    <footer className="bg-[#0B1B3F] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center mb-4">
              <Image src="/placeholder.svg" alt="Heal Well Logo" width={40} height={40} />
              <span className="ml-2 text-2xl font-bold">Heal Well</span>
            </Link>
            <p className="text-gray-300 mb-4">
              Providing world-class healthcare services to improve the quality of life for our patients.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </motion.div>

          <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, delay: 0.1 }}
>
  <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
  <ul className="space-y-2">
    {[
      { name: 'About Us', href: '/about' },
      { name: 'Our Services', href: '/services' },
      { name: 'Our Team', href: '/doctors' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Blog', href: '/blog' },
    ].map((item) => (
      <li key={item.name}>
        <Link href={item.href} className="text-gray-300 hover:text-white transition-colors">
          {item.name}
        </Link>
      </li>
    ))}
  </ul>
</motion.div>


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Mail size={20} className="mr-2 text-blue-400" />
                <a href="mailto:info@healwell.com" className="text-gray-300 hover:text-white transition-colors">
                  info@healwell.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 text-blue-400" />
                <a href="tel:+91 9876543210" className="text-gray-300 hover:text-white transition-colors">
                +91 9876543210
                </a>
              </li>
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 mt-1 text-blue-400" />
                <span className="text-gray-300">
                  123 Safdurgunj,<br />New Delhi , India
                </span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for the latest updates and health tips.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                required
              />
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
                Subscribe
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Heal Well. All rights reserved.</p>
          <p>
            Made with <span className="text-red-500">♥</span> by Akshay
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

