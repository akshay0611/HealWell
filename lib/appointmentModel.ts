import mongoose, { Schema, Document } from 'mongoose';

interface IAppointment extends Document {
  name: string;
  phone: string;
  email: string;
  department: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
}

const appointmentSchema: Schema<IAppointment> = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    department: { type: String, required: true },
    preferredDate: { type: String, required: true },
    preferredTime: { type: String, required: true },
    message: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.models.Appointment || mongoose.model<IAppointment>('Appointment', appointmentSchema);

export default Appointment;
