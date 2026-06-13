const express = require("express");
const router = express.Router();

const Booking = require("../features/bookings/bookingSchema");

router.get("/", async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

router.put("/:id", async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(booking);
});

module.exports = router;