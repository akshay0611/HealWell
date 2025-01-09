// pages/api/blogs/index.ts

import { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '@/lib/dbConnect';
import Blog, { IBlog } from '@/lib/blogModel';

// Handler for the `/api/blogs` route
export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  await connectDb();

  if (req.method === 'GET') {
    try {
      const blogs: IBlog[] = await Blog.find();
      res.status(200).json({ success: true, blogs });
    } catch (error) {
      console.error('Error fetching blogs:', error); // Log the error
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  } else if (req.method === 'POST') {
    // Handle POST request to create a new blog
    try {
      const { title, excerpt, content, author, readTime, category, imageUrl } = req.body;
      
      // Create a new blog document
      const newBlog = new Blog({
        title,
        excerpt,
        content,
        author,
        date: new Date(),
        readTime,
        category,
        imageUrl,
      });

      await newBlog.save();

      res.status(201).json({ success: true, message: 'Blog created successfully', blog: newBlog });
    } catch (error) {
      console.error('Error creating blog:', error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
