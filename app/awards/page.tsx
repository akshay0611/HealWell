'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { Award, Calendar, Star, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TopBar } from "@/components/top-bar"
import { Navigation } from "@/components/navigation"
import Footer from "@/components/footer"

const awards = [
  {
    id: 1,
    title: "Excellence in Patient Care",
    organization: "National Health Association",
    year: 2023,
    description: "Recognized for outstanding patient satisfaction and care quality.",
    image: "/images/award_1.jpg"
  },
  {
    id: 2,
    title: "Innovation in Medical Technology",
    organization: "MedTech Innovators",
    year: 2022,
    description: "Awarded for implementing cutting-edge medical technologies.",
    image: "/images/award_2.jpg"
  },
  {
    id: 3,
    title: "Best Hospital Workplace",
    organization: "Healthcare Employers Association",
    year: 2023,
    description: "Honored for creating an exceptional work environment for healthcare professionals.",
    image: "/images/award_3.jpg"
  },
  {
    id: 4,
    title: "Community Health Initiative",
    organization: "Regional Health Board",
    year: 2022,
    description: "Recognized for impactful community health programs and outreach.",
    image: "/images/award_4.jpg"
  },
  {
    id: 5,
    title: "Research Excellence",
    organization: "Medical Research Foundation",
    year: 2023,
    description: "Awarded for groundbreaking research in various medical fields.",
    image: "/images/award_5.jpg"
  },
  {
    id: 6,
    title: "Environmental Sustainability",
    organization: "Green Healthcare Alliance",
    year: 2022,
    description: "Recognized for implementing eco-friendly practices in healthcare operations.",
    image: "/images/award_6.jpg"
  }
]

const AwardsPage = () => {
  const [featuredAward, setFeaturedAward] = useState(awards[0])
  const parallaxRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start start", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedAward(awards[Math.floor(Math.random() * awards.length)])
    }, 5000)
    return () => clearInterval(interval)
  }, [])

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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 text-center"
          >
            Our <span className="text-blue-300">Awards</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto text-center leading-relaxed"
          >
            Recognizing our commitment to excellence in healthcare, innovation, and community service.
          </motion.p>
        </div>
      </motion.section>

      {/* Featured Award */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-12 text-center">Featured Award</h2>
          <motion.div
            key={featuredAward.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-blue-100 to-white rounded-3xl shadow-xl overflow-hidden"
          >
            <div className="md:flex">
              <div className="md:w-1/2 relative h-64 md:h-auto">
                <Image
                  src={featuredAward.image}
                  alt={featuredAward.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-blue-800 mb-4">{featuredAward.title}</h3>
                <p className="text-blue-600 mb-2">{featuredAward.organization}</p>
                <p className="text-blue-600/70 mb-4 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {featuredAward.year}
                </p>
                <p className="text-blue-600/80">{featuredAward.description}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Awards Timeline */}
      <section ref={parallaxRef} className="py-20 bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 bg-blue-200 opacity-20 z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-12 text-center">Our Journey of Excellence</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200 z-0"></div>
            {awards.map((award, index) => (
              <motion.div
                key={award.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex items-center mb-12 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
              >
                <Card className={`w-full md:w-5/12 ${index % 2 === 0 ? 'mr-8' : 'ml-8'}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Award className="w-8 h-8 text-blue-500 mr-4" />
                      <h3 className="text-xl font-semibold text-blue-800">{award.title}</h3>
                    </div>
                    <p className="text-blue-600 mb-2">{award.organization}</p>
                    <p className="text-blue-600/70 mb-4 flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {award.year}
                    </p>
                    <p className="text-blue-600/80">{award.description}</p>
                  </CardContent>
                </Card>
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-500 rounded-full border-4 border-white z-10"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-12 text-center">What Others Say About Us</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { quote: "Heal Well's commitment to excellence is truly commendable. Their innovative approach to healthcare sets a new standard in the industry.", author: "Dr. Emily Chen, Medical Director" },
              { quote: "The awards received by Heal Well are a testament to their unwavering dedication to patient care and medical advancement.", author: "John Smith, Patient Advocate" }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex-grow">
                      <Star className="w-8 h-8 text-yellow-400 mb-4" />
                      <p className="text-blue-600/80 italic mb-4">&ldquo;{testimonial.quote}&rdquo;</p>
                    </div>
                    <p className="text-blue-800 font-semibold">{testimonial.author}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
            Experience Award-Winning Care
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl mb-8 max-w-2xl mx-auto"
          >
            Join the many satisfied patients who have experienced our commitment to excellence. Schedule your appointment today.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-100 px-8 py-6 rounded-full text-lg shadow-lg transition-all duration-300 group"
            >
              Book Your Appointment
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default AwardsPage

