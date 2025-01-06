// pages/api/contact.ts
import { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '../../lib/dbConnect';
import Contact from '../../lib/contactModel';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      await connectDb();

      const { name, email, subject, message } = req.body;

      const newContact = new Contact({
        name,
        email,
        subject,
        message,
      });

      await newContact.save();

      res.status(200).json({ success: true, message: 'Message sent successfully.' });
    } catch (error) {
      console.error('Error saving contact form submission:', error);
      res.status(500).json({ success: false, message: 'Something went wrong.' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}