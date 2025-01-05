'use client'

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";

const OurBestService = () => {
  const services = [
    { icon: "💊", title: "Pharmacology", description: "Expert pharmaceutical care for all your medication needs." },
    { icon: "🚑", title: "Orthopedics", description: "Comprehensive orthopedic care for bone and joint health." },
    { icon: "❤️", title: "Hematology", description: "Advanced treatment for blood-related disorders and conditions." },
    { icon: "👨‍⚕️", title: "Plastic Surgery", description: "Highly skilled plastic surgeons offering reconstructive and cosmetic procedures." },
    { icon: "🧠", title: "Neurology", description: "Specialized care for brain, spinal cord, and nervous system disorders." },
    { icon: "👁️", title: "Ophthalmology", description: "State-of-the-art eye care and vision treatments." },
    { icon: "🦷", title: "Dental Care", description: "Comprehensive dental services for optimal oral health." },
    { icon: "🩺", title: "Cardiology", description: "Expert cardiovascular care for heart health and wellness." },
  ];

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
          <h2 className="text-blue-600 font-semibold uppercase tracking-wide mb-2">Our Best Services</h2>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mt-2 mb-6">Top-Rated Healthcare Services at Heal Well</h1>
          <p className="text-blue-600/80 text-lg mt-4 max-w-3xl mx-auto">
            At Heal Well, we provide world-class healthcare services across a wide range of specialties, ensuring that your health and well-being are in expert hands.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative bg-white p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl group overflow-hidden"
            >
              {/* Card background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Text content with higher z-index to stay on top of the background */}
              <div className="relative z-10">
                <div className="absolute top-4 right-4 text-4xl font-bold text-blue-100 group-hover:text-blue-200 transition-colors duration-300">
                  {(index + 1).toString().padStart(2, '0')}
                </div>
                <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-blue-900 group-hover:text-blue-700 transition-colors duration-300">{service.title}</h3>
                <p className="text-blue-600/70 group-hover:text-blue-600/90 transition-colors duration-300">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.5, duration: 0.5 }}
  className="text-center mt-16"
>
  <p className="text-blue-600/80 text-lg mb-6">
    Delivering the highest standard of healthcare for you and your loved ones at Heal Well.
  </p>
  <Link href="/">
    <Button
      className="group bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-lg shadow-lg shadow-blue-200/50 transition-all duration-300"
    >
      See More Services
      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </Button>
  </Link>
</motion.div>

      </div>
    </section>
  );
};

export default OurBestService;

