// pages/api/contact.ts

import { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '../../lib/dbConnect';
import Contact from '../../lib/contactModel';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDb();

  if (req.method === 'POST') {
    try {
      const { name, email, subject, message } = req.body; 

      // Create a new contact and set the default status as "Pending"
      const newContact = new Contact({
        name,
        email,
        subject,
        message,
        status: 'Pending', // Default status
      });

      await newContact.save();

      res.status(200).json({ success: true, message: 'Message sent successfully.' });
    } catch (error) {
      console.error('Error saving contact form submission:', error);
      res.status(500).json({ success: false, message: 'Something went wrong.' });
    }
  } else if (req.method === 'GET') {
    try {
      const contacts = await Contact.find(); // Fetch all contact messages
      res.status(200).json({ success: true, data: contacts });
    } catch (error) {
      console.error('Error fetching contacts:', error);
      res.status(500).json({ success: false, message: 'Something went wrong.' });
    }
  } else if (req.method === 'PATCH') {
    try {
      const { id, updates } = req.body;

      if (!id) {
        return res.status(400).json({ success: false, message: 'Contact ID is required for updating.' });
      }

      const updatedContact = await Contact.findByIdAndUpdate(id, updates, { new: true });

      if (!updatedContact) {
        return res.status(404).json({ success: false, message: 'Contact not found.' });
      }

      res.status(200).json({ success: true, message: 'Contact updated successfully.', data: updatedContact });
    } catch (error) {
      console.error('Error updating contact:', error);
      res.status(500).json({ success: false, message: 'Something went wrong.' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.query; // Use query instead of body for DELETE

      if (!id) {
        return res.status(400).json({ success: false, message: 'Contact ID is required for deletion.' });
      }

      const deletedContact = await Contact.findByIdAndDelete(id);

      if (!deletedContact) {
        return res.status(404).json({ success: false, message: 'Contact not found.' });
      }

      res.status(200).json({ success: true, message: 'Contact deleted successfully.' });
    } catch (error) {
      console.error('Error deleting contact:', error);
      res.status(500).json({ success: false, message: 'Something went wrong.' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
