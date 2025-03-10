import { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '@/lib/dbConnect';
import Blog, { IBlog } from '@/lib/blogModel';

// Handler for the `/api/blogs/[id]` route
export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  await connectDb();

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const blog: IBlog | null = await Blog.findById(id as string);
      if (!blog) {
        return res.status(404).json({ success: false, message: 'Blog Not Found' });
      }
      res.status(200).json({ success: true, blog });
    } catch (error) {
      console.error('Error fetching blog:', error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const deletedBlog = await Blog.findByIdAndDelete(id as string);
      if (!deletedBlog) {
        return res.status(404).json({ success: false, message: 'Blog Not Found' });
      }
      res.status(200).json({ success: true, message: 'Blog deleted successfully' });
    } catch (error) {
      console.error('Error deleting blog:', error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  } else if (req.method === 'PATCH') {
    try {
      const updates = req.body;

      const updatedBlog = await Blog.findByIdAndUpdate(id as string, updates, { new: true });

      if (!updatedBlog) {
        return res.status(404).json({ success: false, message: 'Blog Not Found' });
      }

      res.status(200).json({ success: true, message: 'Blog updated successfully', blog: updatedBlog });
    } catch (error) {
      console.error('Error updating blog:', error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}