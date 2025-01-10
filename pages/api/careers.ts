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
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
      return res.status(400).json({ success: false, error: errorMessage });
    }
  }

  // Handling GET request to fetch career applications
  if (req.method === 'GET') {
    try {
      const applications = await CareerApplication.find();
      return res.status(200).json({ success: true, data: applications });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while fetching applications.';
      return res.status(400).json({ success: false, error: errorMessage });
    }
  }

  // Handling DELETE request to delete a career application
  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ success: false, error: 'Application ID is required.' });
      }

      // Find and delete the application by ID
      const deletedApplication = await CareerApplication.findByIdAndDelete(id);

      if (!deletedApplication) {
        return res.status(404).json({ success: false, error: 'Application not found.' });
      }

      return res.status(200).json({ success: true, message: 'Application deleted successfully!' });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred while deleting the application.';
      return res.status(400).json({ success: false, error: errorMessage });
    }
  }

  // Return method not allowed for other HTTP methods
  return res.status(405).json({ success: false, message: 'Method not allowed.' });
}