'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Users, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TopBar } from "@/components/top-bar"
import { Navigation } from "@/components/navigation"
import Footer from "@/components/footer"

const volunteers = [
  {
    name: "Sarah Johnson",
    role: "Community Outreach",
    image: "/images/volunteer_1.jpg",
    description: "Passionate about connecting our medical services with those in need.",
  },
  {
    name: "Michael Chen",
    role: "Patient Support",
    image: "/images/volunteer_2.jpg",
    description: "Dedicated to ensuring patients feel comfortable and cared for during their stay.",
  },
  {
    name: "Emily Rodriguez",
    role: "Health Education",
    image: "/images/volunteer_3.jpg",
    description: "Committed to spreading awareness about preventive healthcare in our community.",
  },
  {
    name: "David Patel",
    role: "Administrative Support",
    image: "/images/volunteer_4.jpg",
    description: "Helps keep our operations running smoothly behind the scenes.",
  },
]

const VolunteersPage = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white">
      <TopBar />
      <Navigation />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative bg-gradient-to-r from-blue-600 to-blue-800 py-24 md:py-32 overflow-hidden"
      >
        <div className="absolute inset-0 bg-blue-900 opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.h1
            {...fadeInUp}
            className="text-4xl md:text-6xl font-bold text-white mb-6 text-center"
          >
            Our <span className="text-blue-300">Volunteers</span>
          </motion.h1>
          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto text-center leading-relaxed"
          >
            Meet the compassionate individuals who donate their time and skills to make a difference in our community&apos;s health and well-being.
          </motion.p>
        </div>
      </motion.section>

      {/* Volunteers Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-12 text-center">Our Dedicated Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {volunteers.map((volunteer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1 group">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                      <Image
                        src={volunteer.image}
                        alt={volunteer.name}
                        width={128}
                        height={128}
                        className="object-cover w-full h-full transition-all group-hover:scale-110 duration-300"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-blue-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">{volunteer.name}</h3>
                    <p className="text-blue-600 font-medium mb-2">{volunteer.role}</p>
                    <p className="text-blue-600/70 group-hover:text-blue-600/90 transition-colors duration-300">{volunteer.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Volunteer Section */}
      <section className="py-20 bg-gradient-to-br from-white via-blue-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-12 text-center">Why Volunteer With Us?</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center">
                    <ChevronRight className="w-6 h-6 mr-2 text-blue-500" />
                    Make a Difference
                  </h3>
                  <p className="text-blue-600/80 leading-relaxed">
                    Directly impact the lives of patients and their families in our community. Your time and skills can bring comfort and hope to those in need.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center">
                    <ChevronRight className="w-6 h-6 mr-2 text-blue-500" />
                    Gain Valuable Experience
                  </h3>
                  <p className="text-blue-600/80 leading-relaxed">
                    Whether you are considering a career in healthcare or simply want to give back, volunteering provides invaluable insights and experiences.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center">
                    <ChevronRight className="w-6 h-6 mr-2 text-blue-500" />
                    Flexible Opportunities
                  </h3>
                  <p className="text-blue-600/80 leading-relaxed">
                    We offer a variety of volunteer roles to match your skills, interests, and availability. From patient support to administrative tasks, there is a place for everyone.
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-white rounded-[2rem] transform rotate-3" />
              <div className="relative z-10 transform -rotate-3 transition-transform duration-300 hover:rotate-0">
                <Image
                  src="/images/volunteer_group.jpg"
                  alt="Volunteer group"
                  width={600}
                  height={400}
                  className="rounded-[2rem] shadow-lg shadow-blue-100/50 object-cover"
                />
                <div className="absolute inset-0 rounded-[2rem] ring-1 ring-blue-100" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900 opacity-20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Join Our Volunteer Team
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl mb-8 max-w-2xl mx-auto"
          >
            Make a difference in your community and gain valuable experience. Start your volunteer journey with us today!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link href="/volunteer-application">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-100 px-8 py-6 rounded-xl text-lg shadow-blue-800/50 shadow-lg transition-all duration-300 group"
              >
                <Users className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Apply to Volunteer
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default VolunteersPage