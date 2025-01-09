'use client';

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { TopBar } from '@/components/top-bar';
import { Navigation } from '@/components/navigation';
import Footer from '@/components/footer';
import { ArrowLeft, Calendar, Clock, User, Tag } from 'lucide-react';
import './blogStyles.css';

interface BlogPost {
  title: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
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
    return <div>Loading...</div>;
  }

  if (!blogPost) {
    return <div>Blog post not found</div>;
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
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </button>

          <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-8 sm:p-10">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {blogPost.title}
              </h1>
              <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6">
                <div className="flex items-center mr-4 mb-2">
                  <User className="w-4 h-4 mr-1" />
                  <span>{blogPost.author}</span>
                </div>
                <div className="flex items-center mr-4 mb-2">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{formatDate(blogPost.date)}</span>
                </div>
                <div className="flex items-center mr-4 mb-2">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{blogPost.readTime}</span>
                </div>
                <div className="flex items-center mb-2">
                  <Tag className="w-4 h-4 mr-1" />
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
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogDetailPage;