'use client'

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Facebook, Twitter, Linkedin } from "lucide-react"

const OurTeamMember = () => {
  const teamMembers = [
    {
      image: "/placeholder.svg",
      name: "Dr. John Smith",
      role: "Cardiologist",
      specialty: "Heart & Vascular",
    },
    {
      image: "/placeholder.svg",
      name: "Dr. Michael Wilson",
      role: "General Practitioner",
      specialty: "Family Medicine",
    },
    {
      image: "/placeholder.svg",
      name: "Dr. Robert Brown",
      role: "Senior Physician",
      specialty: "Internal Medicine",
    },
    {
      image: "/placeholder.svg",
      name: "Dr. Sarah Johnson",
      role: "Dentist",
      specialty: "Dental Care",
    },
  ]

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-white overflow-hidden py-24">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-grid-blue-100/25 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-blue-600 font-semibold uppercase tracking-wide mb-2 flex items-center justify-center gap-2">
            <span className="w-6 h-px bg-blue-600"></span>
            OUR TEAM MEMBER
            <span className="w-6 h-px bg-blue-600"></span>
          </h2>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mt-2 mb-6">
            Meet Our Specialists This<br />Doctor Meeting
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src={member.image}
                  alt={`Photo of ${member.name}`}
                  width={400}
                  height={500}
                  className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Overlay with Social Links */}
                <div className="absolute inset-0 bg-blue-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex gap-4">
                    <a
                      href="#"
                      aria-label={`Facebook profile of ${member.name}`}
                      className="p-2 bg-white rounded-full text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a
                      href="#"
                      aria-label={`Twitter profile of ${member.name}`}
                      className="p-2 bg-white rounded-full text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a
                      href="#"
                      aria-label={`LinkedIn profile of ${member.name}`}
                      className="p-2 bg-white rounded-full text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="text-center mt-4">
                <h3 className="text-xl font-semibold text-blue-900">{member.name}</h3>
                <p className="text-blue-600 font-medium">{member.role}</p>
                <p className="text-blue-600/70">{member.specialty}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurTeamMember
