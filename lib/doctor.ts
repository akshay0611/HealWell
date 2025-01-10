// lib/doctor.ts

import mongoose, { Schema, Document } from 'mongoose';

interface Doctor extends Document {
  name: string;
  specialty: string;
  rating: number;
  image: string;
  availability: string;
  phone: string;
  email: string;
  education: string[];
  experience: string;
  specializations: string[];
  bio: string;
}

const doctorSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  image: { type: String, required: true },
  availability: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  education: { type: [String], required: true },
  experience: { type: String, required: true },
  specializations: { type: [String], required: true },
  bio: { type: String, required: true },
}, {
  timestamps: true,
});

const DoctorModel = mongoose.models.Doctor || mongoose.model<Doctor>('Doctor', doctorSchema);

// Example function to fetch all doctors
export const getAllDoctors = async () => {
  try {
    return await DoctorModel.find();
  } catch (error) {
    throw new Error('Error fetching doctors: ' + (error as Error).message);
  }
};

// Example function to create a doctor
export const createDoctor = async (doctorData: Partial<Doctor>) => {
  try {
    const newDoctor = new DoctorModel(doctorData);
    return await newDoctor.save();
  } catch (error) {
    throw new Error('Error creating doctor: ' + (error as Error).message);
  }
};

// Export the schema and functions
export default DoctorModel;
