'use client'

import React from 'react'
import { Users, Headphones, BarChart2, Trophy } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'

export function StatsSection() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  const stats = [
    {
      number: "567+",
      label: "Happy Patients",
      icon: Users,
    },
    {
      number: "23K+",
      label: "Support Calls Answered",
      icon: Headphones,
    },
    {
      number: "241+",
      label: "Successful Treatments",
      icon: BarChart2,
    },
    {
      number: "16K+",
      label: "Medical Awards",
      icon: Trophy,
    },
  ]

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-white overflow-hidden py-32">
      {/* Animated background */}
      <motion.div 
        className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(to_bottom,white,transparent)]"
        style={{ y }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-white/20 backdrop-blur-[2px]" />
      
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-blue-900 text-center mb-16"
        >
          Our Impact in Numbers
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center relative group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-blue-200 rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                <motion.div 
                  className="relative bg-white rounded-full p-8 shadow-lg transition-all duration-300 group-hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <stat.icon className="w-12 h-12 text-blue-500 group-hover:text-blue-600 transition-colors duration-300" />
                </motion.div>
              </div>
              <motion.div 
                className="mt-8 space-y-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="text-5xl font-bold text-blue-900 group-hover:text-blue-700 transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-xl text-blue-600/80 group-hover:text-blue-600 transition-colors duration-300">
                  {stat.label}
                </div>
              </motion.div>
              {index < stats.length - 1 && (
                <motion.div 
                  className="hidden lg:block absolute right-0 top-1/2 w-px h-24 bg-blue-200 -translate-y-1/2 group-hover:bg-blue-300 transition-all duration-300"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent" />
    </section>
  )
}

