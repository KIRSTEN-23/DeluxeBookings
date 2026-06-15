const express = require("express");
const router = express.Router();

const {
  createBooking,
  getBuyerBookings,
  getBuyerBookingById,
  cancelBooking,
} = require("../../features/bookings/buyerBookingsController");

const {
  getSellerBookings,
  getSellerBookingById,
  confirmBooking,
  cancelBookingBySeller,
} = require("../../features/bookings/sellerBookingController");

const verifyToken = require("../../middleware/verifyToken");

// Buyer booking routes
router.post("/", createBooking);

// Seller booking routes
// const { getSellerBookings } = require("./sellerBookingController");

router.get("/seller", getSellerBookings);

module.exports = router;
