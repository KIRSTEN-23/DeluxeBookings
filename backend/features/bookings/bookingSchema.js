const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    totalPrice: Number,
    
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: false,
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
    },

    addons: {
      type: [String],
      default: [],
    },

    destination: {
      type: String,
      required: true,
      trim: true,
    },

    suite: {
      type: String,
      required: true,
      trim: true,
    },

    checkIn: {
      type: String,
      required: true,
    },

    checkOut: {
      type: String,
      required: true,
    },

    guests: {
      type: Number,
      required: true,
      min: 1,
    },

    specialRequest: {
      type: String,
      default: "",
      trim: true,
    },

    status: {
      type: String,
      default: "confirmed",
      trim: true,
    },
  },

  {
    timestamps: true,
  },
);
