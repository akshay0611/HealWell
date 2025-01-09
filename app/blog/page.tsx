'use client';

import React from "react";
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
  id: string;
  title: string;
  excerpt: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: '10 Simple Habits for a Healthier Life',
    excerpt: 'Discover easy-to-implement daily habits that can significantly improve your overall health and well-being.',
    category: 'Health & Wellness',
  },
  {
    id: '2',
    title: 'Understanding Common Heart Conditions',
    excerpt: 'Learn about the most prevalent heart conditions, their symptoms, and how to maintain a healthy heart.',
    category: 'Cardiology',
  },
  {
    id: '3',
    title: 'The Importance of Mental Health in Overall Wellness',
    excerpt: 'Explore the connection between mental and physical health, and discover strategies for maintaining good mental health.',
    category: 'Mental Health',
  },
  {
    id: '4',
    title: 'Nutrition Tips for a Balanced Diet',
    excerpt: 'Get expert advice on creating a balanced diet that meets all your nutritional needs and supports your health goals.',
    category: 'Nutrition',
  },
  {
    id: '5',
    title: 'The Latest Advancements in Cancer Research',
    excerpt: 'Stay informed about the most recent breakthroughs in cancer research and treatment options.',
    category: 'Oncology',
  },
  {
    id: '6',
    title: 'Pediatric Care: What Every Parent Should Know',
    excerpt: 'Essential information for parents on common childhood illnesses, vaccinations, and developmental milestones.',
    category: 'Pediatrics',
  },
];

const BlogCard: React.FC<BlogPost> = ({ id, title, excerpt, category }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg"
    >
      <Link href={`/blog/${id}`} className="block">
        <Image
          className="h-48 w-full object-cover"
          src="/placeholder.svg"
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
          <motion.div 
            variants={stagger}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {blogPosts.map((post) => (
              <motion.div key={post.id} variants={fadeInUp}>
                <BlogCard {...post} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;