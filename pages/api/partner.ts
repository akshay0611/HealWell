import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';
import Partner from '../../lib/Partner';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      // Connect to the database
      await dbConnect();

      const { name, email, message } = req.body;

      // Validate the request body
      if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required.' });
      }

      // Create a new partner application
      const newPartner = new Partner({ name, email, message });

      // Save to the database
      await newPartner.save();

      // Respond with success
      res.status(201).json({ message: 'Partner application submitted successfully!' });
    } catch (error: unknown) {
      // Type assertion to 'Error' for better type safety
      if (error instanceof Error) {
        console.error('Error processing partner application:', error); // Log the error
        res.status(500).json({ message: 'An error occurred while submitting your application.', error: error.message });
      } else {
        // Fallback for unknown error types
        console.error('Unknown error:', error);
        res.status(500).json({ message: 'An unknown error occurred.' });
      }
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed.' });
  }
};

export default handler;