import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import Appointment from '@/lib/appointmentModel';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const { name, phone, email, department, preferredDate, preferredTime, message } = req.body;

      if (!name || !phone || !email || !department || !preferredDate || !preferredTime) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
      }

      const newAppointment = new Appointment({
        name,
        phone,
        email,
        department,
        preferredDate,
        preferredTime,
        message,
        status: 'Pending', // Default status
      });

      await newAppointment.save();

      return res.status(201).json({ success: true, message: 'Appointment booked successfully!' });
    } catch (error) {
      console.error('Error booking appointment:', error);
      return res.status(500).json({ success: false, message: 'Error booking appointment' });
    }
  } else if (req.method === 'GET') {
    try {
      const appointments = await Appointment.find(); // Fetch all appointments
      return res.status(200).json({ success: true, data: appointments });
    } catch (error) {
      console.error('Error fetching appointments:', error);
      return res.status(500).json({ success: false, message: 'Error fetching appointments' });
    }
  } else if (req.method === 'PATCH') {
    try {
      const { id, updates } = req.body;

      if (!id) {
        return res.status(400).json({ success: false, message: 'Appointment ID is required for updating.' });
      }

      const updatedAppointment = await Appointment.findByIdAndUpdate(id, updates, { new: true });

      if (!updatedAppointment) {
        return res.status(404).json({ success: false, message: 'Appointment not found.' });
      }

      return res.status(200).json({ success: true, message: 'Appointment updated successfully.', data: updatedAppointment });
    } catch (error) {
      console.error('Error updating appointment:', error);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { appointmentId } = req.query;

      if (!appointmentId) {
        return res.status(400).json({ success: false, message: 'Appointment ID is required for deletion.' });
      }

      const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);

      if (!deletedAppointment) {
        return res.status(404).json({ success: false, message: 'Appointment not found' });
      }

      return res.status(200).json({ success: true, message: 'Appointment deleted successfully!' });
    } catch (error) {
      console.error('Error deleting appointment:', error);
      return res.status(500).json({ success: false, message: 'Error deleting appointment' });
    }
  } else {
    return res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
  }
};

export default handler;