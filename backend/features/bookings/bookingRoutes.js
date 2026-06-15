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
router.get("/seller/all", verifyToken, getSellerBookings);
router.get("/seller/:id", verifyToken, getSellerBookingById);
router.patch("/seller/:id/confirm", verifyToken, confirmBooking);
router.patch("/seller/:id/cancel", verifyToken, cancelBookingBySeller);

module.exports = router;