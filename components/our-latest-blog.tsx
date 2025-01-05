'use client'

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight, MessageSquare, User } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

const blogPosts = [
    {
      id: 1,
      title: "Advancing Modern Healthcare Practices",
      description: "Explore how cutting-edge innovations are transforming the delivery of quality healthcare services worldwide.",
      image: "/images/modern-healthcare.svg", 
      date: "May 02, 2025",
      author: "Heal Well Team",
    },
    {
      id: 2,
      title: "The Essential Role of Hospitals in Community Health",
      description: "Discover the pivotal role hospitals play in building healthier communities and fostering well-being.",
      image: "/images/community-health.svg", 
      date: "May 02, 2025",
      author: "Heal Well Team",
    },
    {
      id: 3,
      title: "Infection Prevention: Building a Safer Tomorrow",
      description: "Learn about strategies and innovations in infection prevention to ensure a safer healthcare environment for all.",
      image: "/images/infection-prevention.svg", 
      date: "May 02, 2025",
      author: "Heal Well Team",
    },
]
  

const OurLatestBlog = () => {
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
          <h2 className="text-blue-600 font-semibold uppercase tracking-wide mb-2 flex items-center justify-center gap-2">
            <span className="w-6 h-px bg-blue-600"></span>
            OUR LATEST BLOG
            <span className="w-6 h-px bg-blue-600"></span>
          </h2>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mt-2 mb-6">
            Latest Posts & Articles
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="overflow-hidden shadow-md transition-transform transform hover:-translate-y-2 hover:shadow-lg">
                <CardHeader className="p-0 relative group">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform transform group-hover:scale-105"
                    />
                    <Badge className="absolute top-4 left-4 bg-blue-500 hover:bg-blue-600">
                      MEDICAL
                    </Badge>
                    <div className="absolute bottom-4 right-4 bg-[#0B1B3F] text-white px-3 py-1 text-sm font-semibold">
                      {post.date}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <User className="w-4 h-4 mr-1" />
                    By: {post.author}
                    <MessageSquare className="w-4 h-4 ml-4 mr-1" />
                    Comment
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-700 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600">{post.description}</p>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    Read More <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurLatestBlog
