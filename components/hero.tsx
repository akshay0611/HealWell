'use client'

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Hospital, Phone, Calendar } from 'lucide-react';
import { motion } from "framer-motion";

export function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-white via-blue-50 to-white overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-grid-blue-100/25 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-16 h-16 bg-gradient-to-br from-blue-100 to-white rounded-2xl flex items-center justify-center shadow-sm border border-blue-100"
            >
              <Hospital className="w-10 h-10 text-blue-500" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-blue-950">
              World-Class Healthcare Services in{' '}
              <span className="text-blue-500 relative inline-block">
                India
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-1 bg-blue-200"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                />
              </span>
            </h1>
            <p className="text-blue-600/80 text-lg max-w-xl leading-relaxed">
              Located in the heart of India, our hospital is dedicated to
              providing affordable and comprehensive medical care to people
              across the nation. With advanced technology, expert doctors,
              and compassionate staff, we strive to meet the unique healthcare
              needs of every individual.
            </p>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-blue-800">
                Trusted by Millions Across the Country
              </h3>
              <motion.a 
                href="tel:+919876543210" 
                className="group flex items-center text-blue-500 hover:text-blue-600 transition-colors duration-300 text-lg"
                whileHover={{ scale: 1.02 }}
              >
                <Phone className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                For Immediate Assistance, Call Us: +91 98765 43210
              </motion.a>
            </div>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 rounded-xl text-lg shadow-blue-200/50 shadow-lg transition-all duration-300 flex items-center justify-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book an Appointment
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-blue-200 bg-white/50 backdrop-blur-sm text-blue-600 hover:bg-blue-50 hover:border-blue-300 px-8 py-6 rounded-xl text-lg transition-all duration-300"
                >
                  Explore Our Services
                </Button>
              </motion.div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-white rounded-[2rem] transform rotate-3" />
            <div className="relative z-10 transform -rotate-3 transition-transform duration-300 hover:rotate-0">
              <Image
                src="/images/hero_1.jpg"
                alt="Team of Indian Medical Professionals"
                width={600}
                height={400}
                className="rounded-[2rem] shadow-lg shadow-blue-100/50 object-cover"
              />
              <div className="absolute inset-0 rounded-[2rem] ring-1 ring-blue-100" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

