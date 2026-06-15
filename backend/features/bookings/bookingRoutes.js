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
const { ManageMyBookings } = require("./sellerBookingController");
router.post("/", ManageMyBookings)

module.exports = router;