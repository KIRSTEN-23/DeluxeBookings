// features/bookings/sellerBookingController.js

const Listing = require("../listings/listingSchema");
const Booking = require("./bookingSchema");

const getSellerBookings = async (req, res) => {
  try {
    const listings = await Listing.find({ seller: req.user.id }).select("_id");
    const bookings = await Booking.find({ listing: { $in: listings.map((listing) => listing._id) } }).sort({ checkIn: 1 });

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