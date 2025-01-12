import mongoose from 'mongoose';

const PartnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure each email is unique
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Pending", // Initial status
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Partner = mongoose.models.Partner || mongoose.model('Partner', PartnerSchema);

export default Partner;