// pages/api/doctor.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getAllDoctors, createDoctor } from '@/lib/doctor'; // Adjust the path based on your directory structure
import dbConnect from '@/lib/dbConnect'; // Ensure you have a database connection utility

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect(); // Connect to your database before performing operations

  try {
    if (req.method === 'GET') {
      // Fetch all doctors
      const doctors = await getAllDoctors();
      return res.status(200).json({ success: true, data: doctors });
    } else if (req.method === 'POST') {
      // Create a new doctor
      const doctorData = req.body;
      const newDoctor = await createDoctor(doctorData);
      return res.status(201).json({ success: true, data: newDoctor });
    } else {
      // Method not allowed
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).json({ success: false, message: `Method ${req.method} not allowed` });
    }
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return res.status(500).json({ success: false, message: errorMessage });
  }
};

export default handler;
