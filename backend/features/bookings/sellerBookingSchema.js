const mongoose = require("mongoose");

const sellerBookingSchema = new mongoose.Schema({
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

module.exports = mongoose.models.Booking || mongoose.model("Booking", sellerBookingSchema);