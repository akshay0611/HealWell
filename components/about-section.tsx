'use client'

import { Button } from "@/components/ui/button";
import { Headphones, UserRound, ArrowRight, Plus, Award, Users, Building2 } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <div className="relative bg-gradient-to-br from-white to-blue-50 overflow-hidden py-24">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-grid-blue-100/25 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
      
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl shadow-blue-100/50">
              <Image
                src="/images/aboutus_1.jpg"
                alt="Medical Team"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent" />
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="absolute -bottom-10 -right-10 bg-white p-6 rounded-2xl shadow-xl"
            >
              <div className="text-center">
                <div className="text-5xl font-bold text-blue-600">26+</div>
                <div className="text-sm font-medium mt-1 text-blue-500">Years of Excellence</div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -left-10 top-1/4 bg-blue-500 text-white p-4 rounded-full shadow-lg"
            >
              <Award className="w-8 h-8" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="absolute -right-5 top-1/3 bg-blue-100 text-blue-600 p-4 rounded-full shadow-lg"
            >
              <Users className="w-8 h-8" />
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div>
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-blue-600 font-semibold mb-4 tracking-wider inline-block bg-blue-100 px-4 py-2 rounded-full"
              >
                ABOUT US
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-blue-900 leading-tight"
              >
                Pioneering Healthcare Excellence for Over Two Decades
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-blue-600/80 text-lg leading-relaxed"
              >
                We are proud to collaborate with forward-thinking medical institutions, 
                including some of the world&apos;s leading healthcare brands. Our mission is 
                to provide safe, comfortable, and innovative healthcare solutions accessible to everyone.
              </motion.p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                { icon: Headphones, title: "24/7 Client Support", description: "Round-the-clock assistance for all your healthcare needs." },
                { icon: UserRound, title: "Expert Doctor Support", description: "Guidance from experienced medical professionals at every step." },
                { icon: Building2, title: "State-of-the-Art Facilities", description: "Cutting-edge medical equipment and comfortable environments." },
                { icon: Award, title: "Accredited Services", description: "Internationally recognized for our quality healthcare services." }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className="group"
                >
                  <div className="flex items-start gap-4 p-6 rounded-xl bg-white shadow-lg transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl">
                    <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-500 transition-colors duration-300">
                      <item.icon className="w-6 h-6 text-blue-500 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-blue-900 mb-2">{item.title}</h3>
                      <p className="text-blue-600/70">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link href="/services">
                  <Button className="group bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 rounded-xl text-lg shadow-lg shadow-blue-200/50 transition-all duration-300 relative z-10 overflow-hidden w-full sm:w-auto">
                    <span className="relative z-10">Explore Our Services</span>
                    <span className="absolute inset-0 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                  </Button>
                </Link>
                
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}