const Booking = require("../../features/bookings/bookingSchema");

const createBooking = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      addons,
      arrivalDate,
      departureDate,
    } = req.body;

    if (!firstName || !lastName || !email || !phone || !arrivalDate || !departureDate) {
      return res.status(400).json({
        error: "Missing required personal details or booking dates.",
      });
    }

    const arrival = new Date(arrivalDate);
    const departure = new Date(departureDate);
    if (!Number.isFinite(arrival.getTime()) || !Number.isFinite(departure.getTime()) || departure <= arrival || arrival < new Date(new Date().setHours(0, 0, 0, 0))) {
      return res.status(400).json({ error: "Choose valid future dates, with departure after arrival." });
    }

    const newBooking = await Booking.create({
      firstName,
      lastName,
      email,
      phone,
      addons,
      checkIn: arrivalDate,
      checkOut: departureDate,
    });

    return res.status(201).json({
      success: true,
      message: "Guest booking saved successfully!",
      booking: newBooking,
    });
  } catch (error) {
    console.error("Database Save Error:", error.message);

    return res.status(500).json({
      error: "Could not write booking to database.",
    });
  }
};

module.exports = {
  createBooking,
};



