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
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
