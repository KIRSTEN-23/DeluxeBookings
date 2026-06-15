const Booking = require("../../features/bookings/bookingSchema");

const getSellerBookings = async (req, res) => {
  try {
    const sellerId = req.user.id;

    const bookings = await Booking.find({ seller: sellerId })
      .populate("listing")
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch seller bookings.",
      error: error.message,
    });
  }
};

const getSellerBookingById = async (req, res) => {
  try {
    const sellerId = req.user.id;

    const booking = await Booking.findOne({
      _id: req.params.id,
      seller: sellerId,
    })
      .populate("listing")
      .populate("user", "name email");

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found.",
      });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch booking.",
      error: error.message,
    });
  }
};

const confirmBooking = async (req, res) => {
  try {
    const sellerId = req.user.id;

    const booking = await Booking.findOneAndUpdate(
      {
        _id: req.params.id,
        seller: sellerId,
      },
      {
        status: "confirmed",
      },
      {
        new: true,
      }
    );

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found.",
      });
    }

    res.status(200).json({
      message: "Booking confirmed successfully.",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to confirm booking.",
      error: error.message,
    });
  }
};

const cancelBookingBySeller = async (req, res) => {
  try {
    const sellerId = req.user.id;

    const booking = await Booking.findOneAndUpdate(
      {
        _id: req.params.id,
        seller: sellerId,
      },
      {
        status: "cancelled",
      },
      {
        new: true,
      }
    );

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found.",
      });
    }

    res.status(200).json({
      message: "Booking cancelled successfully.",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to cancel booking.",
      error: error.message,
    });
  }
};

module.exports = {
  getSellerBookings,
  getSellerBookingById,
  confirmBooking,
  cancelBookingBySeller,
};