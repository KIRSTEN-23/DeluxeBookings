//---------------------------------------------------------------------------------------
// This File Handles MongoDB Database Connection Logic for the Deluxe Bookings Backend
//---------------------------------------------------------------------------------------

const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    throw new Error("MONGO_URI is not defined in .env");
  }

  const conn = await mongoose.connect(mongoURI);

  console.log(`MongoDB connected: ${conn.connection.host}`);
};

module.exports = connectDB;
