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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Volunteer =
  mongoose.models.Volunteer || mongoose.model('Volunteer', VolunteerSchema);

export default Volunteer;
