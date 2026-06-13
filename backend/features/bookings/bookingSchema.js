const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  customerName: String,
  propertyName: String,
  checkIn: Date,
  checkOut: Date,
  totalPrice: Number,

  status: {
    type: String,
    default: "Pending"
  }
});

module.exports = mongoose.model("Booking", bookingSchema);