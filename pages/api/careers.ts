import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import CareerApplication from '@/lib/careers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  // Handling POST request to submit a new career application
  if (req.method === 'POST') {
    try {
      const application = new CareerApplication(req.body);
      await application.save();
      return res.status(201).json({ success: true, message: 'Application submitted successfully!' });
    } catch (err) {
      // Use 'err' in the catch block to access the error message
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
      return res.status(400).json({ success: false, error: errorMessage });
    }
  }

  // Handling GET request to fetch career applications (or job openings)
  if (req.method === 'GET') {
    try {
      const applications = await CareerApplication.find();  // Assuming you want to fetch career applications
      return res.status(200).json({ success: true, data: applications });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while fetching applications.';
      return res.status(400).json({ success: false, error: errorMessage });
    }
  }

  // Return method not allowed for other HTTP methods
  return res.status(405).json({ success: false, message: 'Method not allowed.' });
}