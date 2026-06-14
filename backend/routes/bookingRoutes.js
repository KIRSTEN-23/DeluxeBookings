const express = require("express");
const router = express.Router();

const Booking = require("../features/bookings/booking");

router.post("/", async (req, res) => {

  try {

    const booking = new Booking(req.body);

    const savedBooking =
      await booking.save();

    res.status(201).json(savedBooking);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});