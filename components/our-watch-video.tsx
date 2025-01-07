'use client'

import React from "react"
import { motion } from "framer-motion"
import { ChevronRight, Stethoscope, Heart, Users } from 'lucide-react'
import { Button } from "@/components/ui/button"

const HealWellVideo = () => {
  return (
    <section className="relative bg-[#0B1B3F] overflow-hidden py-16 lg:py-24">
      <div className="container mx-auto px-4 relative z-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
            <iframe
              width="100%"
              height="100%"
              src="https://youtu.be/D61Cc7i-PXI?si=rvwPeEUE50IveHCg"
              title="Heal Well Healthcare Services"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            ></iframe>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h2 className="text-blue-400 font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-8 h-px bg-blue-400"></span>
              OUR COMMITMENT TO CARE
            </h2>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Heal Well
              <br />
              <span className="text-blue-300">Healthcare Services</span>
            </h1>
            <p className="text-white/80 text-lg mb-8 max-w-xl leading-relaxed">
              At Heal Well, we are dedicated to providing exceptional healthcare services. 
              Our team of experienced professionals uses cutting-edge technology to ensure 
              the best possible care for our patients.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                'State-of-the-art Facilities',
                'Compassionate Care Team',
                'Comprehensive Health Services'
              ].map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center text-white/90"
                >
                  {index === 0 && <Stethoscope className="w-5 h-5 mr-3 text-blue-400" />}
                  {index === 1 && <Heart className="w-5 h-5 mr-3 text-blue-400" />}
                  {index === 2 && <Users className="w-5 h-5 mr-3 text-blue-400" />}
                  {item}
                </motion.li>
              ))}
            </ul>
            <Button
              className="bg-white text-blue-900 hover:bg-blue-50 group text-lg px-6 py-3 rounded-full"
              size="lg"
            >
              Learn More
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 0.1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="absolute bottom-12 right-12 text-white"
      >
        <Stethoscope className="w-32 h-32" />
      </motion.div>
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400 rounded-full filter blur-3xl opacity-10 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full filter blur-3xl opacity-10 translate-x-1/2 translate-y-1/2" />
    </section>
  )
}

export default HealWellVideo

