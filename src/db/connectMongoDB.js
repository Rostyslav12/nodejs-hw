
import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log('✅ MongoDB connection established successfully');
  } catch (error) {
    console.error('MongoDB connection error name:', error.name);
    console.error('MongoDB connection error:', error.message);

    if (error.reason?.servers) {
      for (const [address, server] of error.reason.servers) {
        console.error(`Server: ${address}`);
        console.error('Server error:', server.error?.message);
        console.error('Server type:', server.type);
      }
    }

    if (error.cause) {
      console.error('Cause:', error.cause);
    }

    process.exit(1);
  }
};
