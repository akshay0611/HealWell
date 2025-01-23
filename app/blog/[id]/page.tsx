'use client';

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { TopBar } from '@/components/top-bar';
import { Navigation } from '@/components/navigation';
import Footer from '@/components/footer';
import { ArrowLeft, Calendar, Clock, User, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import './blogStyles.css';
import ChatComponent from '@/components/ChatComponent';

interface BlogPost {
  title: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl: string;
}

const BlogDetailPage = () => {
  const params = useParams();
  const id = params?.id as string | undefined;

  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${id}`);
        const data = await response.json();
        if (data.success) {
          setBlogPost(data.blog);
        }
      } catch (error) {
        console.error('Failed to fetch blog:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white via-blue-50 to-white">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white via-blue-50 to-white">
        <h2 className="text-2xl font-bold text-gray-800">Blog post not found</h2>
      </div>
    );
  }

  // Format the date to dd/mm/yyyy format
  const formatDate = (date: string) => {
    const parsedDate = new Date(date);
    const day = parsedDate.getDate().toString().padStart(2, '0');
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
    const year = parsedDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white">
      <TopBar />
      <Navigation />

      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.button
            onClick={() => window.history.back()}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-8"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Blog
          </motion.button>

          <motion.article 
            className="bg-white rounded-xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative h-64 sm:h-80 md:h-96">
              <Image
                src={blogPost.imageUrl || '/placeholder.svg'}
                alt="Blog post cover"
                layout="fill"
                objectFit="cover"
                className="transition-opacity duration-300 ease-in-out"
              />
            </div>
            <div className="px-6 py-8 sm:p-10">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {blogPost.title}
              </h1>
              <div className="flex flex-wrap items-center text-sm text-gray-600 mb-8">
                <div className="flex items-center mr-6 mb-2">
                  <User className="w-5 h-5 mr-2 text-blue-500" />
                  <span>{blogPost.author}</span>
                </div>
                <div className="flex items-center mr-6 mb-2">
                  <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                  <span>{formatDate(blogPost.date)}</span>
                </div>
                <div className="flex items-center mr-6 mb-2">
                  <Clock className="w-5 h-5 mr-2 text-blue-500" />
                  <span>{blogPost.readTime}</span>
                </div>
                <div className="flex items-center mb-2">
                  <Tag className="w-5 h-5 mr-2 text-blue-500" />
                  <span>{blogPost.category}</span>
                </div>
              </div>
              <div className="blog-content">
                <div
                  className="prose prose-lg prose-blue max-w-none"
                  dangerouslySetInnerHTML={{ __html: blogPost.content }}
                ></div>
              </div>
            </div>
          </motion.article>
        </div>
      </main>

      <Footer />
      <ChatComponent/>
    </div>
  );
};

export default BlogDetailPage;