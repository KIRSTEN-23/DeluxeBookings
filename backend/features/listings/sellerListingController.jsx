/*
─────────────────────────────────────────────────────────────
SELLER LISTING CONTROLLER
─────────────────────────────────────────────────────────────

Seller-owned listing management.

Related Routes:
Related Routes:

// GET    /api/seller/listings
// POST   /api/seller/listings
// GET    /api/seller/listings/:id
// PUT    /api/seller/listings/:id
// DELETE /api/seller/listings/:id

*/

/* MOVE THE ABOVE COMMENT To docs/ once code is implemented, 
as it only serves as guidelines for development and is not needed in the final codebase. */

/*
─────────────────────────────────────────────────────────────
USE THE FOLLOWING FUNCTION AND ROUTE SIGNATURES FOR THIS CONTROLLER

getSellerListings()
GET /api/seller/listings

getSellerListingById()
GET /api/seller/listings/:id

createSellerListing()
POST /api/seller/listings

updateSellerListing()
PUT /api/seller/listings/:id

submitListingForReview()
PATCH /api/seller/listings/:id/submit

publishListing()
PATCH /api/seller/listings/:id/publish

unpublishListing()
PATCH /api/seller/listings/:id/unpublish

deleteSellerListing()
DELETE /api/seller/listings/:id

*/

const Listing = require("./listingSchema");
const { LISTING_STATUS } = require("../../_config/constants");

const getSellerListings = async (req, res) => {
  try {
    const sellerId = req.user?._id || req.user?.id;

    const listings = await Listing.find({ seller: sellerId }).sort({
      createdAt: -1,
    });

    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch seller listings." });
  }
};

const getSellerListingById = async (req, res) => {
  try {
    const sellerId = req.user?._id || req.user?.id;

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
    const sellerId = req.user?._id || req.user?.id;

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
    const sellerId = req.user?._id || req.user?.id;

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

const publishListing = async (req, res) => {
  try {
    const sellerId = req.user?._id || req.user?.id;

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

const unpublishListing = async (req, res) => {
  try {
    const sellerId = req.user?._id || req.user?.id;

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
    const sellerId = req.user?._id || req.user?.id;

    const listing = await Listing.findOneAndUpdate(
      {
        _id: req.params.id,
        seller: sellerId,
      },
      {
        status: LISTING_STATUS.UNPUBLISHED,
        isPaused: true,
      },
      { new: true },
    );

    if (!listing) {
      return res.status(404).json({ message: "Listing not found." });
    }

    res.status(200).json({
      message: "Listing removed from public view.",
      listing,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove listing." });
  }
};

module.exports = {
  getSellerListings,
  getSellerListingById,
  createSellerListing,
  updateSellerListing,
  publishListing,
  unpublishListing,
  deleteSellerListing,
};