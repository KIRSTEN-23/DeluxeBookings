const Listing = require("./listingSchema");
const { LISTING_STATUS } = require("../../_config/constants");

const getAllAvailablePublishedListings = async (req, res) => {
  try {
    const listings = await Listing.find({
      status: LISTING_STATUS.PUBLISHED,
      isPaused: false,
    }).sort({ createdAt: -1 });

    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch public listings." });
  }
};

const getListingById = async (req, res) => {
  try {
    const listing = await Listing.findOne({
      _id: req.params.id,
      status: LISTING_STATUS.PUBLISHED,
      isPaused: false,
    });

    if (!listing) {
      return res.status(404).json({ message: "Listing not found." });
    }

    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch listing." });
  }
};

module.exports = {
  getAllAvailablePublishedListings,
  getListingById,
};