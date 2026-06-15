// features/bookings/sellerBookingController.js

const Booking = require("./sellerBookingSchema");

const getSellerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ checkIn: 1 });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getSellerBookings,
};