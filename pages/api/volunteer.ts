import { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '../../lib/dbConnect';
import Volunteer from '../../lib/volunteerModel';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDb();

  if (req.method === 'POST') {
    // Handle the POST request for creating a new volunteer application
    try {
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
  } else if (req.method === 'GET') {
    // Handle the GET request for fetching all volunteer applications
    try {
      const volunteers = await Volunteer.find();
      return res.status(200).json({ success: true, data: volunteers });
    } catch (error) {
      console.error('Error fetching volunteer applications:', error);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  } else if (req.method === 'DELETE') {
    // Handle the DELETE request for deleting a volunteer application by ID
    try {
      const { id } = req.query;

      if (!id) {
        return res
          .status(400)
          .json({ success: false, message: 'ID parameter is required.' });
      }

      const deletedVolunteer = await Volunteer.findByIdAndDelete(id);

      if (!deletedVolunteer) {
        return res
          .status(404)
          .json({ success: false, message: 'Volunteer application not found.' });
      }

      return res.status(200).json({ success: true, message: 'Application deleted successfully.' });
    } catch (error) {
      console.error('Error deleting volunteer application:', error);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  } else {
    // Handle other HTTP methods (405 Method Not Allowed)
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}