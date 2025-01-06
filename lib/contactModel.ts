// lib/contactModel.ts
import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

export default Contact;