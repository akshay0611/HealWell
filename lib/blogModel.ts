import mongoose, { Document, Schema, Model, model } from 'mongoose';

// Define the Blog interface
export interface IBlog extends Document {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: Date;
  readTime: string;
  category: string;
  imageUrl: string;  // Added imageUrl for blog-specific images
}

// Define the Blog Schema
const BlogSchema: Schema = new Schema<IBlog>({
  title: {
    type: String,
    required: true,
  },
  excerpt: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  readTime: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,  // Store the image URL here
    required: true,
  },
});

// Export the Blog model
const Blog: Model<IBlog> = mongoose.models.Blog || model<IBlog>('Blog', BlogSchema);
export default Blog;