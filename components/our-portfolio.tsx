'use client'

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const OurPortfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all')

  const filters = [
    { id: 'all', label: 'All Cases' },
    { id: 'surgery', label: 'Surgery' },
    { id: 'dental', label: 'Dental' },
    { id: 'cardiology', label: 'Cardiology' },
    { id: 'neurology', label: 'Neurology' },
  ]

  const portfolioItems = [
    {
      id: 1,
      title: "Advanced Cardiac Surgery",
      category: "surgery",
      description: "Successful complex cardiac procedure",
      image: "/images/portfolio_1.png",
      stats: "98% Success Rate",
    },
    {
      id: 2,
      title: "Modern Dental Care",
      category: "dental",
      description: "State-of-the-art dental treatments",
      image: "/images/portfolio_2.jpg",
      stats: "5000+ Patients",
    },
    {
      id: 3,
      title: "Heart Diagnostics",
      category: "cardiology",
      description: "Comprehensive heart health assessment",
      image: "/images/portfolio_3.jpg",
      stats: "24/7 Care",
    },
    {
      id: 4,
      title: "Brain Mapping",
      category: "neurology",
      description: "Advanced neurological diagnostics",
      image: "/images/portfolio_4.jpg",
      stats: "15+ Years Experience",
    },
    {
      id: 5,
      title: "Minimally Invasive Surgery",
      category: "surgery",
      description: "Latest surgical techniques",
      image: "/images/portfolio_5.jpg",
      stats: "Quick Recovery",
    },
    {
      id: 6,
      title: "Preventive Care",
      category: "cardiology",
      description: "Heart disease prevention program",
      image: "/images/portfolio_6.jpg",
      stats: "Ongoing Support",
    },
  ]

  const filteredItems = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter)

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-white overflow-hidden py-24">
      {/* Decorative elements */}
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
            OUR PORTFOLIO
            <span className="w-6 h-px bg-blue-600"></span>
          </h2>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mt-2 mb-6">
            Discover Our Medical Excellence
          </h1>
          <p className="text-blue-600/80 text-lg max-w-3xl mx-auto">
            Explore our comprehensive portfolio of medical services and success stories,
            showcasing our commitment to excellence in healthcare.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filter) => (
            <Button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              variant={activeFilter === filter.id ? "default" : "outline"}
              className={`
                rounded-full px-6 
                ${activeFilter === filter.id 
                  ? 'bg-blue-600 text-white' 
                  : 'text-blue-600 hover:text-blue-700'}
              `}
            >
              {filter.label}
            </Button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-semibold text-white mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    {item.title}
                  </h3>
                  <p className="text-blue-100 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300">
                    <span className="text-sm font-medium text-blue-200">
                      {item.stats}
                    </span>
                    <span className="text-blue-200 text-sm">Learn More →</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

export default OurPortfolio

