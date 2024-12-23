import mongoose from "mongoose";
import "dotenv/config";

const MONGO_URI = process.env.MONGO_URI || "";

/**
 * Establishes the connection with the db
 */
export const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connection successful");
  } catch (error) {
    console.error("Error during the db connection: ", error);
  }
};
