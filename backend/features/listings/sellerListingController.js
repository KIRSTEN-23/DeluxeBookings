const mongoose = require("mongoose");
const Listing = require("./listingSchema");
const { LISTING_STATUS } = require("../../_config/constants");
const TEMP_SELLER_ID = "6a15854044273245363d26c6";

const getTempSellerId = () => {
  return new mongoose.Types.ObjectId(TEMP_SELLER_ID);
};

const getSellerListings = async (req, res) => {
  try {
    const sellerId = getTempSellerId();

    const listings = await Listing.find({ seller: sellerId }).sort({
      createdAt: -1,
    });


    res.status(200).json(listings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch seller listings." });
  }
};

const getSellerListingById = async (req, res) => {
  try {
    const sellerId = new mongoose.Types.ObjectId(TEMP_SELLER_ID);

    const listing = await Listing.findOne({
      _id: req.params.id,
      seller: sellerId,
    });

    if (!listing) {
      return res.status(404).json({ message: "Listing not found." });
    }

    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch seller listing." });
  }
};

const createSellerListing = async (req, res) => {
  try {
    const sellerId = getTempSellerId();

    const listing = await Listing.create({
      ...req.body,
      seller: sellerId,
      status: LISTING_STATUS.IN_REVIEW,
    });

    res.status(201).json(listing);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create listing.",
      error: error.message,
    });
  }
};

const updateSellerListing = async (req, res) => {
  try {
    const sellerId = getTempSellerId();

    const listing = await Listing.findOneAndUpdate(
      {
        _id: req.params.id,
        seller: sellerId,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!listing) {
      return res.status(404).json({ message: "Listing not found." });
    }

    res.status(200).json(listing);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update listing.",
      error: error.message,
    });
  }
};

const publishSellerListing = async (req, res) => {
  try {
    const sellerId = getTempSellerId();

    const listing = await Listing.findOneAndUpdate(
      {
        _id: req.params.id,
        seller: sellerId,
        status: LISTING_STATUS.UNPUBLISHED,
      },
      {
        status: LISTING_STATUS.PUBLISHED,
        isPaused: false,
      },
      { new: true },
    );

    if (!listing) {
      return res.status(400).json({
        message: "Only approved unpublished listings can be published.",
      });
    }

    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ message: "Failed to publish listing." });
  }
};

const unpublishSellerListing = async (req, res) => {
  try {
    const sellerId = getTempSellerId();

    const listing = await Listing.findOneAndUpdate(
      {
        _id: req.params.id,
        seller: sellerId,
      },
      {
        status: LISTING_STATUS.UNPUBLISHED,
      },
      { new: true },
    );

    if (!listing) {
      return res.status(404).json({ message: "Listing not found." });
    }

    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ message: "Failed to unpublish listing." });
  }
};

const deleteSellerListing = async (req, res) => {
  try {
    const sellerId = getTempSellerId();

    const listing = await Listing.findOneAndDelete({
      _id: req.params.id,

      seller: sellerId,
    });

    if (!listing) {
      return res.status(404).json({ message: "Listing not found." });
    }

    res.status(200).json({
      message: "Listing permanently deleted.",

      listingId: req.params.id,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete listing." });
  }
};

module.exports = {
  getSellerListings,
  getSellerListingById,
  createSellerListing,
  updateSellerListing,
  publishSellerListing,
  unpublishSellerListing,
  deleteSellerListing,
};
