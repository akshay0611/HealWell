import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import Appointment from '@/lib/appointmentModel';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Handling POST method for creating appointments
  if (req.method === 'POST') {
    const { name, phone, email, department, preferredDate, preferredTime, message } = req.body;

    try {
      await dbConnect();

      const newAppointment = new Appointment({
        name,
        phone,
        email,
        department,
        preferredDate,
        preferredTime,
        message,
      });

      await newAppointment.save();

      return res.status(201).json({ success: true, message: 'Appointment booked successfully!' });
    } catch (error) {
      console.error('Error booking appointment:', error);
      return res.status(500).json({ success: false, message: 'Error booking appointment' });
    }
  } 
  // Handling GET method for fetching appointments
  else if (req.method === 'GET') {
    try {
      await dbConnect();

      const appointments = await Appointment.find(); // Fetch all appointments
      return res.status(200).json({ success: true, data: appointments });
    } catch (error) {
      console.error('Error fetching appointments:', error);
      return res.status(500).json({ success: false, message: 'Error fetching appointments' });
    }
  } 
  // Handling DELETE method for deleting an appointment by ID
  else if (req.method === 'DELETE') {
    const { appointmentId } = req.query;

    try {
      await dbConnect();

      const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);

      if (!deletedAppointment) {
        return res.status(404).json({ success: false, message: 'Appointment not found' });
      }

      return res.status(200).json({ success: true, message: 'Appointment deleted successfully!' });
    } catch (error) {
      console.error('Error deleting appointment:', error);
      return res.status(500).json({ success: false, message: 'Error deleting appointment' });
    }
  } 
  // Handling any unsupported HTTP methods
  else {
    return res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
  }
};

export default handler;