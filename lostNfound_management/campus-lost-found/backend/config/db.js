import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Keep database setup in one place so server.js stays easy to read.
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
