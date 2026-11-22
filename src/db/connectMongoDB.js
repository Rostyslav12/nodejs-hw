
import dns from 'node:dns';
import mongoose from 'mongoose';

// Use public DNS servers for MongoDB SRV records
dns.setServers(['8.8.8.8', '1.1.1.1']);

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    throw error;
  }
};
