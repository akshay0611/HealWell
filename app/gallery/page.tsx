'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Camera, ArrowRight, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TopBar } from "@/components/top-bar"
import { Navigation } from "@/components/navigation"
import Footer from "@/components/footer"

const galleryItems = [
  { id: 1, src: "/images/gallery_1.jpg", alt: "State-of-the-art operating room", category: "Facilities" },
  { id: 2, src: "/images/gallery_2.jpg", alt: "Dedicated medical staff in action", category: "Staff" },
  { id: 3, src: "/images/gallery_3.jpg", alt: "Advanced MRI machine", category: "Equipment" },
  { id: 4, src: "/images/gallery_4.jpg", alt: "Comfortable patient room", category: "Facilities" },
  { id: 5, src: "/images/gallery_5.jpg", alt: "Doctors in consultation", category: "Staff" },
  { id: 6, src: "/images/gallery_6.jpg", alt: "Modern laboratory setup", category: "Equipment" },
  { id: 7, src: "/images/gallery_7.jpg", alt: "Welcoming reception area", category: "Facilities" },
  { id: 8, src: "/images/gallery_8.jpg", alt: "Nurse attending to patient", category: "Staff" },
  { id: 9, src: "/images/gallery_9.jpg", alt: "Cutting-edge surgical tools", category: "Equipment" },
]

const GalleryPage = () => {
  const [filter, setFilter] = useState('All')
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const filteredItems = filter === 'All' ? galleryItems : galleryItems.filter(item => item.category === filter)

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
            Our <span className="text-blue-300">Gallery</span>
          </motion.h1>
          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto text-center leading-relaxed"
          >
            Explore our state-of-the-art facilities, dedicated staff, and advanced medical equipment through our image gallery.
          </motion.p>
        </div>
      </motion.section>

      {/* Gallery Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-12 text-center">Heal Well in Pictures</h2>
          
          {/* Filter Buttons */}
          <div className="flex justify-center space-x-4 mb-8">
            {['All', 'Facilities', 'Staff', 'Equipment'].map((category) => (
              <Button
                key={category}
                onClick={() => setFilter(category)}
                variant={filter === category ? "default" : "outline"}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="overflow-hidden group">
                  <CardContent className="p-0 relative">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-blue-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <p className="text-white text-center px-4">{item.alt}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Tour Section */}
      <section className="py-20 bg-gradient-to-br from-white via-blue-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-12 text-center">Take a Virtual Tour</h2>
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
                    Explore Our Facilities
                  </h3>
                  <p className="text-blue-600/80 leading-relaxed">
                    Get an in-depth look at our modern medical facilities, from our welcoming reception area to our advanced operating rooms.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center">
                    <ChevronRight className="w-6 h-6 mr-2 text-blue-500" />
                    Meet Our Team
                  </h3>
                  <p className="text-blue-600/80 leading-relaxed">
                    See our dedicated medical professionals in action and get a sense of the caring environment we've created at Heal Well.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center">
                    <ChevronRight className="w-6 h-6 mr-2 text-blue-500" />
                    View Our Technology
                  </h3>
                  <p className="text-blue-600/80 leading-relaxed">
                    Discover the cutting-edge medical equipment and technology we use to provide the best possible care for our patients.
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
                  src="/images/virtual_tour.jpg"
                  alt="Virtual tour preview"
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
            Experience Heal Well in Person
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl mb-8 max-w-2xl mx-auto"
          >
            While our gallery offers a glimpse, nothing compares to experiencing our care firsthand. Schedule a visit or consultation today.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-100 px-8 py-6 rounded-xl text-lg shadow-blue-800/50 shadow-lg transition-all duration-300 group"
              >
                <Camera className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Schedule a Visit
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default GalleryPage

