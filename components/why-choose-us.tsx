'use client'

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { AmbulanceIcon as FirstAid, Syringe, Heart, PillIcon as Pills, Home, FlaskRoundIcon as Flask } from 'lucide-react'

const WhyChooseUs = () => {
  const features = [
    {
      icon: FirstAid,
      title: "Expert Care",
      description: "Medical competitor research startup to financial",
    },
    {
      icon: Syringe,
      title: "Emergency Help",
      description: "Medical competitor research startup to financial",
    },
    {
      icon: Heart,
      title: "Qualified Doctors",
      description: "Medical competitor research startup to financial",
    },
    {
      icon: Pills,
      title: "Medical Advices",
      description: "Medical competitor research startup to financial",
    },
    {
      icon: Home,
      title: "Medical Research",
      description: "Medical competitor research startup to financial",
    },
    {
      icon: Flask,
      title: "Affordable Prices",
      description: "Medical competitor research startup to financial",
    },
  ]

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-white overflow-hidden py-24">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-grid-blue-100/25 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <h2 className="text-blue-600 font-semibold uppercase tracking-wide mb-2 flex items-center gap-2">
                <span className="w-6 h-px bg-blue-600"></span>
                WHY CHOOSE US
                <span className="w-6 h-px bg-blue-600"></span>
              </h2>
              <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mt-2">
                Medical Ready To Get This<br />Health Solution.
              </h1>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex gap-4 group"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-white rounded-lg shadow-lg flex items-center justify-center group-hover:bg-blue-50 transition-colors duration-300">
                      <feature.icon className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-blue-600/70">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500 rounded-full opacity-20 blur-3xl" />
            <div className="relative">
              <Image
                src="/placeholder.svg"
                alt="Medical Professionals"
                width={600}
                height={700}
                className="rounded-2xl shadow-xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs

