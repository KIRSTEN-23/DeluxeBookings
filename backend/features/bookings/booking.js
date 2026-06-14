const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  propertyName: {
    type: String,
    required: true
  },

  checkIn: {
    type: Date,
    required: true
  },

  checkOut: {
    type: Date,
    required: true
  },

  guests: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    default: "Pending"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model(
  "Booking",
  bookingSchema
);