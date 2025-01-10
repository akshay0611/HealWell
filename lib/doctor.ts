import mongoose, { Schema, Document } from 'mongoose';

export interface Doctor extends Document {  // Add export here
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

const doctorSchema = new Schema<Doctor>({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  rating: { type: Number, default: 0 },
  image: { type: String },
  availability: { type: String },
  phone: { type: String },
  email: { type: String },
  education: { type: [String] },
  experience: { type: String },
  specializations: { type: [String] },
  bio: { type: String },
});

const DoctorModel = mongoose.models.Doctor || mongoose.model('Doctor', doctorSchema);

export const getAllDoctors = async () => {
  return await DoctorModel.find();
};

export const createDoctor = async (data: Partial<Doctor>) => {
  const doctor = new DoctorModel(data);
  await doctor.save();
  return doctor;
};

export const updateDoctor = async (id: string, data: Partial<Doctor>) => {
  const doctor = await DoctorModel.findByIdAndUpdate(id, data, { new: true });
  return doctor;
};

export const deleteDoctor = async (id: string) => {
  await DoctorModel.findByIdAndDelete(id);
};