const mongoose = require("mongoose");

const {
  LISTING_STATUS,

  PROPERTY_TYPES,

  MAX_IMAGES_PER_LISTING,
} = require("../../_config/constants");

const imageSchema = new mongoose.Schema(
  {
    url: {
      type: String,

      required: true,
    },

    alt: {
      type: String,

      default: "",
    },

    isCover: {
      type: Boolean,

      default: false,
    },
  },

  { _id: false },
);

const locationSchema = new mongoose.Schema(
  {
    destination: {
      type: String,

      required: true,

      trim: true,
    },

    country: {
      type: String,

      default: "South Africa",
    },

    province: {
      type: String,

      trim: true,
    },

    city: {
      type: String,

      required: true,

      trim: true,
    },

    suburb: {
      type: String,

      trim: true,
    },

    streetAddress: {
      type: String,

      trim: true,
    },

    postalCode: {
      type: String,

      trim: true,
    },

    displayAddress: {
      type: String,

      required: true,

      trim: true,
    },
  },

  { _id: false },
);

const adminReviewSchema = new mongoose.Schema(
  {
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",
    },

    reviewedAt: {
      type: Date,
    },

    notes: {
      type: String,

      maxlength: 1000,
    },
  },

  { _id: false },
);

const listingSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },

    title: {
      type: String,

      required: true,

      trim: true,

      minlength: 3,

      maxlength: 100,
    },

    description: {
      type: String,

      required: true,

      trim: true,

      minlength: 30,

      maxlength: 1500,
    },

    propertyType: {
      type: String,

      required: true,

      enum: Object.values(PROPERTY_TYPES),
    },

    location: {
      type: locationSchema,

      required: true,
    },

    images: {
      type: [imageSchema],

      validate: {
        validator(value) {
          return value.length <= MAX_IMAGES_PER_LISTING;
        },

        message: `A listing cannot have more than ${MAX_IMAGES_PER_LISTING} images.`,
      },

      default: [],
    },

    pricePerNight: {
      type: Number,

      required: true,

      min: 1,
    },

    oldPrice: {
      type: Number,

      min: 0,
    },

    guestCapacity: {
      type: Number,

      required: true,

      min: 1,

      max: 50,
    },

    bedrooms: {
      type: Number,

      required: true,

      min: 0,

      max: 30,
    },

    bathrooms: {
      type: Number,

      required: true,

      min: 0,

      max: 30,
    },

    beds: {
      type: String,

      trim: true,
    },

    area: {
      type: Number,

      min: 0,
    },

    amenities: {
      type: [String],

      default: [],
    },

    houseRules: {
      type: [String],

      default: [],
    },

    // checkInTime: {
    //   type: String,
    // },

    // checkOutTime: {
    //   type: String,
    // },

    // availableFrom: {
    //   type: Date,
    // },

    // availableTo: {
    //   type: Date,
    // },

    // unavailableDates: {
    //   type: [Date],

    //   default: [],
    // },

    status: {
      type: String,

      enum: Object.values(LISTING_STATUS),

      default: LISTING_STATUS.IN_REVIEW,
    },

    adminReview: {
      type: adminReviewSchema,

      default: {},
    },

    isPaused: {
      type: Boolean,

      default: false,
    },

    tags: {
      type: [String],

      default: [],
    },

    // ratingAverage: {
    //   type: Number,

    //   default: 0,

    //   min: 0,

    //   max: 10,
    // },

    // reviewCount: {
    //   type: Number,

    //   default: 0,

    //   min: 0,
    // },
  },

  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Listing", listingSchema);