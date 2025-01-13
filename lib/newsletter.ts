import mongoose, { Schema, Document } from 'mongoose';

interface INewsletter extends Document {
  email: string;
  subscribedAt: Date;
}

const NewsletterSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
});

// Check if the model already exists to avoid OverwriteModelError
const Newsletter =
  mongoose.models.Newsletter ||
  mongoose.model<INewsletter>('Newsletter', NewsletterSchema);

export default Newsletter;
