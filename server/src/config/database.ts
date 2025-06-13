import mongoose from "mongoose";

const connectDB = async (URI: string) => {
  try {
    await mongoose.connect(URI);
    console.log("Database connected...");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
