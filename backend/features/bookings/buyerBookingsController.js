const Listing = require("../listings/listingSchema");
const mongoose = require("mongoose");
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

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: "Enter a valid email address." });
    const arrival = new Date(arrivalDate);
    const departure = new Date(departureDate);
    if (!Number.isFinite(arrival.getTime()) || !Number.isFinite(departure.getTime()) || departure <= arrival || arrival < new Date(new Date().setHours(0, 0, 0, 0))) {
      return res.status(400).json({ error: "Choose valid future dates, with departure after arrival." });
    }

    if (!mongoose.isValidObjectId(req.body.listing)) return res.status(400).json({ error: "Select a valid stay." });
    const listing = await Listing.findOne({ _id: req.body.listing, status: "published", isPaused: false });
    if (!listing) return res.status(404).json({ error: "This stay is no longer available." });
    const guests = Number(req.body.guests);
    if (!Number.isInteger(guests) || guests < 1 || guests > listing.guestCapacity) return res.status(400).json({ error: "Choose a valid guest count for this stay." });
    const nights = Math.ceil((departure - arrival) / 86400000);
    const newBooking = await Booking.create({
      listing: listing._id,
      destination: listing.location.displayAddress,
      suite: listing.title,
      guests,
      totalPrice: nights * listing.pricePerNight,
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



