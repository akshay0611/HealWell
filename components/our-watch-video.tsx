'use client'

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Play, Shield } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const OurWatchVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section className="relative bg-[#0B1B3F] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#0B1B3F]/90 z-10" />
        <video
          className="w-full h-full object-cover"
          poster="/placeholder.svg"
          muted
          loop
          playsInline
        >
          <source src="/placeholder.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="container mx-auto px-4 py-24 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <Dialog>
              <DialogTrigger asChild>
                <button
                  className="group relative w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm 
                    hover:bg-white/20 transition-all duration-300 mx-auto lg:mx-0"
                >
                  <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                    <Play className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="absolute inset-0 border border-white/30 rounded-full animate-ping" />
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[800px] p-0 bg-black">
                <DialogTitle>
                  {/* Replace <h2> with direct text or another semantic element */}
                  <span className="sr-only">Watch Medical Care Video</span>
                </DialogTitle>
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/rRid6GCJtgc"
                    title="Professional Medical Care Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </DialogContent>
            </Dialog>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white/70 mt-6 font-medium"
            >
              WATCH VIDEO
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h2 className="text-blue-400 font-semibold uppercase tracking-wide mb-2 flex items-center gap-2">
              <span className="w-6 h-px bg-blue-400"></span>
              OUR WATCH VIDEO
            </h2>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional Medical Care<br />
              Measure Medical.
            </h1>
            <p className="text-white/70 text-lg mb-8 max-w-xl">
              We are privileged to work with hundreds of future-thinking medial,
              including many of the world&apos;s top hardware, software, and brands, feel
              safe and comfortable in establishing.
            </p>
            <Button
              className="bg-white text-blue-900 hover:bg-blue-50 group"
              size="lg"
            >
              Video More
              <Shield className="w-4 h-4 ml-2 opacity-50 group-hover:opacity-100 transition-opacity" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Decorative Shield */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 0.1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="absolute bottom-8 right-8 text-white"
      >
        <Shield className="w-24 h-24" />
      </motion.div>
    </section>
  )
}

export default OurWatchVideo
