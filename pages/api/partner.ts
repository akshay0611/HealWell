import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';
import Partner from '../../lib/Partner';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect(); // Ensure database connection is established

  switch (req.method) {
    case 'POST':
      try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
          return res.status(400).json({ message: 'All fields are required.' });
        }

        const newPartner = new Partner({ name, email, message });
        await newPartner.save();

        return res
          .status(201)
          .json({ message: 'Partner application submitted successfully!' });
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Error processing partner application:', error);
          return res.status(500).json({
            message: 'An error occurred while submitting your application.',
            error: error.message,
          });
        }
        console.error('Unknown error:', error);
        return res.status(500).json({ message: 'An unknown error occurred.' });
      }

    case 'GET':
      try {
        const partners = await Partner.find(); // Fetch all partner applications
        return res.status(200).json({ success: true, data: partners });
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Error fetching partner applications:', error);
          return res
            .status(500)
            .json({ message: 'Error fetching partner applications.' });
        }
        console.error('Unknown error:', error);
        return res.status(500).json({ message: 'An unknown error occurred.' });
      }

    case 'DELETE':
      try {
        const { id } = req.query;

        if (!id) {
          return res
            .status(400)
            .json({ message: 'An ID parameter is required to delete a partner.' });
        }

        const deletedPartner = await Partner.findByIdAndDelete(id);

        if (!deletedPartner) {
          return res
            .status(404)
            .json({ message: 'Partner application not found.' });
        }

        return res
          .status(200)
          .json({ message: 'Partner application deleted successfully.' });
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Error deleting partner application:', error);
          return res
            .status(500)
            .json({ message: 'Error deleting partner application.' });
        }
        console.error('Unknown error:', error);
        return res.status(500).json({ message: 'An unknown error occurred.' });
      }

    default:
      return res.status(405).json({ message: 'Method Not Allowed.' });
  }
};

export default handler;