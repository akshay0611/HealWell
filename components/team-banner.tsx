'use client'

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Users, Award, ArrowRight } from 'lucide-react';
import Link from "next/link";

export function TeamBanner() {
  return (
    <div className="relative bg-gradient-to-br from-white to-blue-50 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-grid-blue-100/25 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
      
      <div className="container mx-auto py-16">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden">
              {/* Decorative shapes */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-100 rounded-full opacity-50 blur-2xl" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-200 rounded-full opacity-50 blur-2xl" />
              
              {/* Main image */}
              <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl shadow-blue-100/50">
                <Image
                  src="/images/team_1.jpg"
                  alt="Medical Team"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />
              </div>

              {/* Stats overlay */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg"
              >
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <Users className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                    <div className="text-blue-900 font-bold">50+</div>
                    <div className="text-blue-600/80 text-sm">Specialists</div>
                  </div>
                  <div className="text-center border-x border-blue-100">
                    <Award className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                    <div className="text-blue-900 font-bold">15+</div>
                    <div className="text-blue-600/80 text-sm">Years Exp.</div>
                  </div>
                  <div className="text-center">
                    <Calendar className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                    <div className="text-blue-900 font-bold">24/7</div>
                    <div className="text-blue-600/80 text-sm">Support</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-8 lg:p-12 flex flex-col justify-between h-full"
          >
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                Our Medical Team
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 leading-tight">
                Meet Our Expert Medical Team
              </h2>
              <p className="text-blue-600/80 text-lg leading-relaxed">
                Our dedicated professionals work tirelessly to provide top-notch 
                medical services, ensuring every detail contributes to the highest 
                quality care. With decades of combined experience, our team brings 
                expertise and compassion to every patient interaction.
              </p>
            </div>
            
            <motion.div
              className="mt-8 space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <Link href="/appointment" passHref>
                <Button
                  className="group bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 rounded-xl text-lg shadow-lg shadow-blue-200/50 transition-all duration-300 relative z-10"
                  size="lg"
                >
                  Schedule a Consultation
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <p className="text-blue-600/60 text-sm">
                * Our team is available 24/7 for emergency consultations
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
