// pages/api/doctor.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getAllDoctors, createDoctor, updateDoctor, deleteDoctor } from '@/lib/doctor'; // Add the new functions
import dbConnect from '@/lib/dbConnect';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  try {
    if (req.method === 'GET') {
      const doctors = await getAllDoctors();
      return res.status(200).json({ success: true, data: doctors });
    } else if (req.method === 'POST') {
      const doctorData = req.body;
      const newDoctor = await createDoctor(doctorData);
      return res.status(201).json({ success: true, data: newDoctor });
    } else if (req.method === 'PUT') {
      const { id } = req.query;
      const doctorData = req.body;
      const updatedDoctor = await updateDoctor(id as string, doctorData);
      return res.status(200).json({ success: true, data: updatedDoctor });
    } else if (req.method === 'DELETE') {
      const { id } = req.query;
      await deleteDoctor(id as string);
      return res.status(204).json({ success: true });
    } else {
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).json({ success: false, message: `Method ${req.method} not allowed` });
    }
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return res.status(500).json({ success: false, message: errorMessage });
  }
};

export default handler;