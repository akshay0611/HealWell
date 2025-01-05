'use client'

import { Users, Headphones, BarChart2, Trophy } from 'lucide-react'
import { motion } from 'framer-motion'

export function StatsSection() {
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
    <div className="relative bg-gradient-to-br from-blue-50 to-white overflow-hidden py-24">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-grid-blue-100/25 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
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
                <div className="absolute inset-0 bg-blue-200 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                <div className="relative bg-white rounded-full p-6 shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                  <stat.icon className="w-10 h-10 text-blue-500 group-hover:text-blue-600 transition-colors duration-300" />
                </div>
              </div>
              <div className="mt-6 space-y-2">
                <div className="text-4xl font-bold text-blue-900 group-hover:text-blue-700 transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-lg text-blue-600/80 group-hover:text-blue-600 transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
              {index < stats.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 w-px h-16 bg-blue-200 -translate-y-1/2 group-hover:bg-blue-300 transition-all duration-300" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

