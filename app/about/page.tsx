'use client'

import React from "react";
import { motion } from "framer-motion";
import { TopBar } from "@/components/top-bar";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, User, Shield, Stethoscope, Award, Clock, Calendar, ArrowRight, ChevronRight } from 'lucide-react';
import Image from "next/image";
import Footer from "@/components/footer"
import Link from 'next/link'
import ChatComponent from "@/components/ChatComponent"; 

const AboutPage = () => {
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
            About <span className="text-blue-300">Heal Well</span>
          </motion.h1>
          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto text-center leading-relaxed"
          >
            Redefining healthcare through innovation, compassion, and excellence.
          </motion.p>
        </div>
      </motion.section>

      {/* Mission Statement */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-8 text-center">Our Mission</h2>
          <p className="text-lg text-blue-600/80 max-w-3xl mx-auto text-center leading-relaxed">
            Heal Well is committed to redefining healthcare through a seamless integration of 
            advanced medical technology and personalized, compassionate care. We aim to empower 
            our community with accessible, high-quality healthcare services that prioritize 
            patient well-being and foster a healthier society.
          </p>
        </div>
      </motion.section>

      {/* Core Values */}
      <section className="py-20 bg-gradient-to-br from-white via-blue-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-12 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Heart, title: "Compassion", description: "We approach every patient with empathy, understanding, and genuine care." },
              { icon: User, title: "Patient-Centric", description: "Your health and comfort are at the forefront of our priorities." },
              { icon: Shield, title: "Integrity", description: "We uphold the highest standards of honesty, transparency, and ethical practices." },
              { icon: Stethoscope, title: "Excellence", description: "We continuously strive for excellence in all aspects of healthcare delivery." },
              { icon: Award, title: "Innovation", description: "We embrace cutting-edge technologies to enhance patient care and outcomes." },
              { icon: Clock, title: "Timeliness", description: "We value your time and ensure efficient, prompt service at every interaction." }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1 group">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                      <value.icon className="w-8 h-8 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-semibold text-blue-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">{value.title}</h3>
                    <p className="text-blue-600/70 group-hover:text-blue-600/90 transition-colors duration-300">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-12 text-center">Our Approach</h2>
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
                    Personalized Care
                  </h3>
                  <p className="text-blue-600/80 leading-relaxed">
                    We recognize that each patient is unique. Our approach combines advanced diagnostics 
                    with tailored treatment plans, ensuring that you receive care specifically designed 
                    for your individual needs and circumstances.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center">
                    <ChevronRight className="w-6 h-6 mr-2 text-blue-500" />
                    Advanced Technology
                  </h3>
                  <p className="text-blue-600/80 leading-relaxed">
                    Heal Well invests in state-of-the-art medical technology to provide precise diagnoses 
                    and effective treatments. From advanced imaging systems to innovative therapeutic 
                    techniques, we harness technology to optimize patient outcomes and experiences.
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
                  src="/images/about_1.jpg"
                  alt="Advanced medical technology in use"
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

      {/* Team Highlight */}
      <section className="py-20 bg-gradient-to-br from-white via-blue-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-12 text-center">Meet Our Experts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Dr. John Smith", role: "Cardiologist", image: "/images/teammember_1.jpg" },
              { name: "Dr. Michael Wilson", role: "General Practitioner", image: "/images/teammember_2.avif" },
              { name: "Dr. Robert Brown", role: "Senior Physician", image: "/images/teammember_3.jpg" }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="text-center group"
              >
                <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={192}
                    height={192}
                    className="object-cover w-full h-full transition-all group-hover:scale-110 duration-300"
                  />
                  <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-blue-800 group-hover:text-blue-600 transition-colors duration-300">{member.name}</h3>
                <p className="text-blue-600/70 group-hover:text-blue-600/90 transition-colors duration-300">{member.role}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Link href="/doctors">
        <Button
          size="lg"
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 rounded-xl text-lg shadow-blue-200/50 shadow-lg transition-all duration-300 group"
        >
          Meet Our Full Team
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </Link>
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
            Experience World-Class Healthcare
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl mb-8 max-w-2xl mx-auto"
          >
            Take the first step towards optimal health. Schedule your appointment with our expert team today.
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
          <Calendar className="w-5 h-5 mr-2 group-hover:animate-pulse" />
          Book Your Consultation
        </Button>
      </Link>
    </motion.div>
        </div>
      </section>
      <Footer/>
      <ChatComponent /> 
    </div>
  );
};

export default AboutPage;
