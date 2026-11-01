// features/bookings/sellerBookingController.js

const Booking = require("./bookingSchema");

const getSellerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ checkIn: 1 });

    res.status(200).json(bookings.map((booking) => ({
      ...booking.toObject(),
      customerName: `${booking.firstName} ${booking.lastName}`,
      propertyName: booking.suite,
      nights: Math.round((new Date(booking.checkOut) - new Date(booking.checkIn)) / 86400000),
    })));
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getSellerBookings,
};