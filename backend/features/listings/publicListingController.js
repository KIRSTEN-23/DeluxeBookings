/*
─────────────────────────────────────────────────────────────
PUBLIC LISTING CONTROLLER
─────────────────────────────────────────────────────────────

Public-facing listing access.

Related Routes:
GET /api/public/listings
GET /api/public/listings/:id

*/

/* MOVE THE ABOVE COMMENT To docs/ once code is implemented, 
as it only serves as guidelines for development and is not needed in the final codebase. */

/*
─────────────────────────────────────────────────────────────
USE THE FOLLOWING FUNCTION AND ROUTE SIGNATURES FOR THIS CONTROLLER

getAllAvailablePublishedListings()
GET /api/public/listings

getListingById()
GET /api/public/listings/:id

searchListings()
GET /api/public/listings/search

getFeaturedListings()
GET /api/public/listings/featured

*/


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