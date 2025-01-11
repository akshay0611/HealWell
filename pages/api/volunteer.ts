// pages/api/volunteer.ts

import { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '../../lib/dbConnect';
import Volunteer from '../../lib/volunteerModel';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      await connectDb();

      const { name, email, message } = req.body;

      if (!name || !email || !message) {
        return res
          .status(400)
          .json({ success: false, message: 'All fields are required.' });
      }

      const newVolunteer = new Volunteer({
        name,
        email,
        message,
      });

      await newVolunteer.save();

      return res.status(200).json({ success: true, message: 'Application submitted successfully.' });
    } catch (error) {
      console.error('Error saving volunteer application:', error);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
