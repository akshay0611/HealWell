'use client';

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from 'next/image';
import Link from 'next/link';
import { TopBar } from "@/components/top-bar";
import { Navigation } from "@/components/navigation";
import Footer from "@/components/footer";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  category: string;
  imageUrl: string;  // Added imageUrl
}

const BlogCard: React.FC<BlogPost> = ({ _id, title, excerpt, category, imageUrl }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg"
    >
      <Link href={`/blog/${_id}`} className="block">
        {/* Use the dynamic imageUrl here */}
        <Image
          className="h-48 w-full object-cover"
          src={imageUrl || "/placeholder.jpg"} // Fallback if imageUrl is missing
          alt={title}
          width={400}
          height={200}
        />
        <div className="p-6">
          <div className="text-sm font-medium text-blue-500 mb-1">{category}</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{excerpt}</p>
          <span className="text-blue-500 hover:text-blue-600 font-medium">Read More →</span>
        </div>
      </Link>
    </motion.div>
  );
};


const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs');
        const data = await response.json();
        if (data.success) {
          setBlogPosts(data.blogs);
        }
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

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
            Health <span className="text-blue-300">Insights</span>
          </motion.h1>
          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto text-center leading-relaxed"
          >
            Stay informed with the latest medical breakthroughs, wellness tips, and healthcare news.
          </motion.p>
        </div>
      </motion.section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Recent Articles</h2>
          {loading ? (
            <div className="text-center text-gray-600">Loading...</div>
          ) : (
            <motion.div 
              variants={stagger}
              initial="initial"
              animate="animate"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {blogPosts.map((post) => (
                <motion.div key={post._id} variants={fadeInUp}>
                  <BlogCard {...post} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;