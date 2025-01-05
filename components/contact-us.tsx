'use client'

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const ContactUs = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Handle form submission logic here
    console.log("Form submitted")
  }

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-white overflow-hidden py-24">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-grid-blue-100/25 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-blue-600 font-semibold uppercase tracking-wide mb-2 flex items-center gap-2">
              <span className="w-6 h-px bg-blue-600"></span>
              CONTACT US
            </h2>
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-8">
              Make An Appointment<br />
              Apply For Treatments
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input type="text" placeholder="Your name" required />
                <Input type="email" placeholder="Your email" required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input type="text" placeholder="Your Subject" required />
                <Input type="tel" placeholder="Your phone" required />
              </div>
              <Textarea placeholder="Your comments" rows={4} required />
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                Send Request
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <Image
              src="/placeholder.svg"
              alt="Medical Professionals Meeting"
              width={600}
              height={400}
              className="rounded-2xl shadow-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactUs

