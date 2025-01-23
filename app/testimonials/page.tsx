'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Star, MessageSquare, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TopBar } from "@/components/top-bar"
import { Navigation } from "@/components/navigation"
import Footer from "@/components/footer"
import ChatComponent from '@/components/ChatComponent'

const testimonials = [
  {
    name: "Emily Thompson",
    role: "Patient",
    image: "/images/partner_2.png",
    content: "The care I received at Heal Well was exceptional. The staff was attentive, and the doctors took the time to explain everything thoroughly. I felt truly cared for throughout my treatment.",
    rating: 5,
  },
  {
    name: "John Martinez",
    role: "Family Member",
    image: "/images/partner_2.png",
    content: "When my mother needed urgent care, Heal Well was there for us. The efficiency and compassion shown by every team member made a difficult time much easier to handle.",
    rating: 5,
  },
  {
    name: "Sarah Lee",
    role: "Patient",
    image: "/images/partner_2.png",
    content: "I've been a patient at Heal Well for years, and I'm always impressed by their commitment to staying at the forefront of medical technology while maintaining a personal touch.",
    rating: 5,
  },
  {
    name: "Michael Wong",
    role: "Healthcare Professional",
    image: "/images/partner_2.png",
    content: "As a referring physician, I have complete confidence in Heal Well. Their expertise and patient-centered approach consistently result in positive outcomes for my patients.",
    rating: 5,
  },
  {
    name: "Rachel Green",
    role: "Patient",
    image: "/images/partner_2.png",
    content: "The preventive care program at Heal Well has been life-changing. Their holistic approach to health has helped me make significant improvements to my overall well-being.",
    rating: 5,
  },
  {
    name: "David Schwimmer",
    role: "Family Member",
    image: "/images/partner_2.png",
    content: "During my father's extended stay, the Heal Well team became like family. Their dedication to patient care and family support is truly commendable.",
    rating: 5,
  },
]

const TestimonialsPage = () => {
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
            Patient <span className="text-blue-300">Testimonials</span>
          </motion.h1>
          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto text-center leading-relaxed"
          >
            Hear from our patients about their experiences and the exceptional care they received at Heal Well.
          </motion.p>
        </div>
      </motion.section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-12 text-center">What Our Patients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1 group">
                  <CardContent className="p-6 flex flex-col">
                    <div className="flex items-center mb-4">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={60}
                        height={60}
                        className="rounded-full mr-4"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-blue-800 group-hover:text-blue-600 transition-colors duration-300">{testimonial.name}</h3>
                        <p className="text-blue-600/70">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-blue-600/80 mb-4 flex-grow">{testimonial.content}</p>
                    <div className="flex items-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Highlights */}
      <section className="py-20 bg-gradient-to-br from-white via-blue-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-12 text-center">Why Patients Choose Us</h2>
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
                    Exceptional Care
                  </h3>
                  <p className="text-blue-600/80 leading-relaxed">
                    Our patients consistently praise the high level of care and attention they receive from our dedicated medical staff.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center">
                    <ChevronRight className="w-6 h-6 mr-2 text-blue-500" />
                    Cutting-Edge Technology
                  </h3>
                  <p className="text-blue-600/80 leading-relaxed">
                    We invest in the latest medical technologies to ensure accurate diagnoses and effective treatments for our patients.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center">
                    <ChevronRight className="w-6 h-6 mr-2 text-blue-500" />
                    Compassionate Approach
                  </h3>
                  <p className="text-blue-600/80 leading-relaxed">
                    Our team is known for their empathy and understanding, providing emotional support alongside medical treatment.
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
                  src="/images/testimonial.jpg"
                  alt="Patient receiving care"
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
            Experience Our Care
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl mb-8 max-w-2xl mx-auto"
          >
            Join the many satisfied patients who have experienced the Heal Well difference. Schedule your appointment today.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link href="/appointment">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-100 px-8 py-6 rounded-xl text-lg shadow-blue-800/50 shadow-lg transition-all duration-300 group"
              >
                <MessageSquare className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Book Your Consultation
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ChatComponent/>
    </div>
  )
}

export default TestimonialsPage

