import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import CareerApplication from '@/lib/careers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const { name, email, phone, positionApplied, experience, message, references } = req.body;

      if (!name || !email || !phone || !positionApplied || !experience || !message) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
      }

      const newApplication = new CareerApplication({
        name,
        email,
        phone,
        positionApplied,
        experience,
        message,
        references,
        status: 'Pending', // Default status
      });

      await newApplication.save();

      return res.status(201).json({ success: true, message: 'Application submitted successfully.' });
    } catch (error) {
      console.error('Error saving career application:', error);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  } else if (req.method === 'GET') {
    try {
      const applications = await CareerApplication.find(); // Fetch all career applications
      return res.status(200).json({ success: true, data: applications });
    } catch (error) {
      console.error('Error fetching career applications:', error);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  } else if (req.method === 'PATCH') {
    try {
      const { id, updates } = req.body;

      if (!id) {
        return res.status(400).json({ success: false, message: 'Application ID is required for updating.' });
      }

      const updatedApplication = await CareerApplication.findByIdAndUpdate(id, updates, { new: true });

      if (!updatedApplication) {
        return res.status(404).json({ success: false, message: 'Career application not found.' });
      }

      return res.status(200).json({ success: true, message: 'Application updated successfully.', data: updatedApplication });
    } catch (error) {
      console.error('Error updating career application:', error);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ success: false, message: 'Application ID is required for deletion.' });
      }

      const deletedApplication = await CareerApplication.findByIdAndDelete(id);

      if (!deletedApplication) {
        return res.status(404).json({ success: false, message: 'Career application not found.' });
      }

      return res.status(200).json({ success: true, message: 'Application deleted successfully.' });
    } catch (error) {
      console.error('Error deleting career application:', error);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}