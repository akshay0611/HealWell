import mongoose from 'mongoose';

const dbConnect = async () => {
  if (mongoose.connections[0].readyState) {
    console.log('Already connected to MongoDB');
    return;
  }

  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return;
  }
};

export default dbConnect;