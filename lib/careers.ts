// lib/careers.ts
import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const CareerApplicationSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
  },
  phone: {
    type: String,
    required: true,
    match: [/^\+?[1-9]\d{1,14}$/, 'Please use a valid phone number.'],
  },
  positionApplied: {
    type: String,
    required: true,
    enum: ['doctor', 'nurse', 'administrator', 'technician'],
  },
  experience: {
    type: Number,
    required: true,
    min: 0,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  references: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

// Check if the model already exists to avoid OverwriteModelError
const CareerApplication = models.CareerApplication || model('CareerApplication', CareerApplicationSchema);

export default CareerApplication;