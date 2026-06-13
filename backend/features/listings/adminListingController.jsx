/*
─────────────────────────────────────────────────────────────
ADMIN LISTING CONTROLLER
─────────────────────────────────────────────────────────────

Listing moderation and approval.

Related Routes:
GET   /api/admin/listings
GET   /api/admin/listings/review
PATCH /api/admin/listings/:id/approve
PATCH /api/admin/listings/:id/reject

*/

/* MOVE THE ABOVE COMMENT To docs/ once code is implemented, 
as it only serves as guidelines for development and is not needed in the final codebase. */

/*
─────────────────────────────────────────────────────────────
USE THE FOLLOWING FUNCTION AND ROUTE SIGNATURES FOR THIS CONTROLLER


getAllListingsAdmin()
GET /api/admin/listings

getListingsInReview()
GET /api/admin/listings/review

getListingForReview()
GET /api/admin/listings/:id

approveListing()
PATCH /api/admin/listings/:id/approve

rejectListing()
PATCH /api/admin/listings/:id/reject

restoreListing()
PATCH /api/admin/listings/:id/restore

removeListing()
DELETE /api/admin/listings/:id

*/

const Listing = require("./listingSchema");
const { LISTING_STATUS } = require("../../_config/constants");

const getAllListingsAdmin = async (req, res) => {
  try {
    const listings = await Listing.find().sort({ createdAt: -1 });

    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch admin listings." });
  }
};

const getListingsInReview = async (req, res) => {
  try {
    const listings = await Listing.find({
      status: LISTING_STATUS.IN_REVIEW,
    }).sort({ createdAt: -1 });

    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch review queue." });
  }
};

const getListingForReview = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found." });
    }

    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch listing." });
  }
};

const approveListing = async (req, res) => {
  try {
    const reviewerId = req.user?._id || req.user?.id;

    const listing = await Listing.findByIdAndUpdate(
      req.params.id,
      {
        status: LISTING_STATUS.UNPUBLISHED,
        adminReview: {
          reviewedBy: reviewerId,
          reviewedAt: new Date(),
          notes: req.body.notes || "Approved.",
        },
      },
      { new: true },
    );

    if (!listing) {
      return res.status(404).json({ message: "Listing not found." });
    }

    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ message: "Failed to approve listing." });
  }
};

const rejectListing = async (req, res) => {
  try {
    const reviewerId = req.user?._id || req.user?.id;

    const listing = await Listing.findByIdAndUpdate(
      req.params.id,
      {
        status: LISTING_STATUS.REJECTED,
        adminReview: {
          reviewedBy: reviewerId,
          reviewedAt: new Date(),
          notes: req.body.notes || "Rejected.",
        },
      },
      { new: true },
    );

    if (!listing) {
      return res.status(404).json({ message: "Listing not found." });
    }

    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ message: "Failed to reject listing." });
  }
};

module.exports = {
  getAllListingsAdmin,
  getListingsInReview,
  getListingForReview,
  approveListing,
  rejectListing,
};