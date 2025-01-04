'use client'

import { Button } from "@/components/ui/button";
import { Headphones, UserRound, ArrowRight, Plus } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <div className="relative bg-gradient-to-br from-white to-blue-50 overflow-hidden py-24">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-grid-blue-100/25 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
      
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl shadow-blue-100/50">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Medical Team"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="absolute bottom-8 -right-8 bg-blue-500 text-white p-6 rounded-2xl shadow-lg"
            >
              <div className="text-center">
                <div className="text-4xl font-bold">26+</div>
                <div className="text-sm font-medium mt-1">Years of Excellence</div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -bottom-12 left-12 w-48 h-48 rounded-2xl overflow-hidden shadow-xl"
            >
              <Image
                src="/placeholder.svg?height=200&width=200"
                alt="Medical Care"
                width={200}
                height={200}
                className="object-cover transition-transform duration-700 hover:scale-110"
              />
            </motion.div>
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 bg-blue-100 text-blue-600 py-8 px-4 rounded-r-2xl shadow-lg">
              <div
                className="vertical-text transform -rotate-180 font-semibold tracking-wider"
                style={{ writingMode: "vertical-rl" }}
              >
                How We Work
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div>
              <div className="text-blue-600 font-semibold mb-4 tracking-wider">ABOUT US</div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-blue-900 leading-tight">
                Over 26 Years of Providing Exceptional Medical Care
              </h2>
              <p className="text-blue-600/80 text-lg leading-relaxed">
  We are proud to collaborate with forward-thinking medical institutions, 
  including some of the world&apos;s leading healthcare brands. Our mission is 
  to provide safe, comfortable, and innovative healthcare solutions accessible to everyone.
</p>

            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                { icon: Headphones, title: "Client Support", description: "Our dedicated team ensures personalized assistance for all your healthcare needs." },
                { icon: UserRound, title: "Doctor Support", description: "Our experienced medical professionals provide expert guidance at every step of your journey." }
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
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex items-center gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <p className="text-blue-600/80 text-lg">
                  Discover more about our medical services and team{" "}
                  <Link href="#" className="text-blue-500 font-semibold hover:text-blue-600 transition-colors duration-300 inline-flex items-center group">
                    READ MORE 
                    <Plus className="w-4 h-4 ml-1 transform group-hover:rotate-90 transition-transform duration-300" />
                  </Link>
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <Button className="group bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 rounded-xl text-lg shadow-lg shadow-blue-200/50 transition-all duration-300">
                  Learn More
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

