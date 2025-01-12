// pages/api/volunteer.ts

import { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '../../lib/dbConnect';
import Volunteer from '../../lib/volunteerModel';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDb();

  if (req.method === 'POST') {
    try {
      const { name, email, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
      }

      const newVolunteer = new Volunteer({
        name,
        email,
        message,
        status: 'Pending', // Default status
      });

      await newVolunteer.save();

      return res.status(200).json({ success: true, message: 'Application submitted successfully.' });
    } catch (error) {
      console.error('Error saving volunteer application:', error);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  } else if (req.method === 'GET') {
    try {
      const volunteers = await Volunteer.find(); // Fetch all volunteer applications
      return res.status(200).json({ success: true, data: volunteers });
    } catch (error) {
      console.error('Error fetching volunteer applications:', error);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  } else if (req.method === 'PATCH') {
    try {
      const { id, updates } = req.body;

      if (!id) {
        return res.status(400).json({ success: false, message: 'Volunteer ID is required for updating.' });
      }

      const updatedVolunteer = await Volunteer.findByIdAndUpdate(id, updates, { new: true });

      if (!updatedVolunteer) {
        return res.status(404).json({ success: false, message: 'Volunteer application not found.' });
      }

      return res.status(200).json({ success: true, message: 'Application updated successfully.', data: updatedVolunteer });
    } catch (error) {
      console.error('Error updating volunteer application:', error);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ success: false, message: 'Volunteer ID is required for deletion.' });
      }

      const deletedVolunteer = await Volunteer.findByIdAndDelete(id);

      if (!deletedVolunteer) {
        return res.status(404).json({ success: false, message: 'Volunteer application not found.' });
      }

      return res.status(200).json({ success: true, message: 'Application deleted successfully.' });
    } catch (error) {
      console.error('Error deleting volunteer application:', error);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}