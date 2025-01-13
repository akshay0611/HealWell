// pages/api/newsletter.ts

import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';
import Newsletter from '../../lib/newsletter';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { email } = req.body;

  switch (req.method) {
    case 'POST':
      if (!email) {
        return res.status(400).json({ message: 'Email is required' });
      }

      try {
        const existingSubscriber = await Newsletter.findOne({ email });

        if (existingSubscriber) {
          return res.status(400).json({ message: 'Email is already subscribed' });
        }

        const newSubscriber = new Newsletter({ email });
        await newSubscriber.save();

        return res.status(201).json({ message: 'Successfully subscribed to the newsletter' });
      } catch (error) {
        console.error('Error subscribing to newsletter:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

    case 'GET':
      try {
        const subscribers = await Newsletter.find({});
        return res.status(200).json({ subscribers });
      } catch (error) {
        console.error('Error fetching subscribers:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

    case 'PUT':
      if (!email) {
        return res.status(400).json({ message: 'Email is required' });
      }

      try {
        const updatedSubscriber = await Newsletter.findOneAndUpdate(
          { email },
          req.body,
          { new: true }
        );

        if (!updatedSubscriber) {
          return res.status(404).json({ message: 'Subscriber not found' });
        }

        return res.status(200).json({ message: 'Subscriber updated successfully', updatedSubscriber });
      } catch (error) {
        console.error('Error updating subscriber:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

    case 'DELETE':
      if (!email) {
        return res.status(400).json({ message: 'Email is required' });
      }

      try {
        const deletedSubscriber = await Newsletter.findOneAndDelete({ email });

        if (!deletedSubscriber) {
          return res.status(404).json({ message: 'Subscriber not found' });
        }

        return res.status(200).json({ message: 'Subscriber deleted successfully' });
      } catch (error) {
        console.error('Error deleting subscriber:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

    default:
      res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
      return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}