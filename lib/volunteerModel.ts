// lib/volunteerModel.ts

import mongoose from 'mongoose';

const VolunteerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: { type: String, default: 'Pending' },  // Add status field here
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Volunteer =
  mongoose.models.Volunteer || mongoose.model('Volunteer', VolunteerSchema);

export default Volunteer;
