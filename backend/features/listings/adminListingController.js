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