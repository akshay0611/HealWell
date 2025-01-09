'use client'

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight, User, Calendar } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  description: string;
  imageUrl: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
}

const OurLatestBlog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('/api/blogs')
        const data = await response.json()

        if (data.success) {
          // Slice the first 3 blog posts
          setBlogPosts(data.blogs.slice(0, 3))
        } else {
          console.error("Error fetching blogs")
        }
      } catch (error) {
        console.error("Error fetching blogs:", error)
      }
    }

    fetchBlogPosts()
  }, [])

  // Helper function to format the date
const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  };
  const formattedDate = new Date(date).toLocaleDateString('en-GB', options);
  return formattedDate;
};

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-white overflow-hidden py-24">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-grid-blue-100/25 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-blue-600 font-semibold uppercase tracking-wide mb-2 flex items-center justify-center gap-2">
            <span className="w-12 h-px bg-blue-600"></span>
            OUR LATEST BLOG
            <span className="w-12 h-px bg-blue-600"></span>
          </h2>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mt-2 mb-6">
            Latest Posts & Articles
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay informed with our latest insights on healthcare innovations, community wellness, and medical advancements.
          </p>
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
              <Card className="overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-white rounded-xl border-0">
                <CardHeader className="p-0 relative group">
                  <div className="relative h-64 overflow-hidden rounded-t-xl">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 group-hover:to-black/60 transition-all duration-300" />
                    <Badge className="absolute top-4 left-4 bg-blue-500 hover:bg-blue-600 transition-colors duration-300">
                      {post.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 px-6">
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {formatDate(post.date)} {/* Format the date */}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-blue-900 group-hover:text-blue-700 transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p> {post.excerpt} </p>
                  <p className="text-gray-600 line-clamp-3">{post.description}</p>
                </CardContent>
                <CardFooter className="pt-4 pb-6 px-6 flex justify-between items-center">
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-blue-600 hover:text-blue-800 transition-colors duration-300 flex items-center group"
                  >
                    Read More 
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <Button 
            variant="outline" 
            size="lg"
            className="bg-white text-blue-600 border-blue-600 hover:bg-blue-50 transition-all duration-300 px-8 py-3 rounded-full font-semibold"
          >
            Explore All Articles
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default OurLatestBlog