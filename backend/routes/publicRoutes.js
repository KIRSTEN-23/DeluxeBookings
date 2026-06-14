console.log("PUBLIC ROUTES LOADED");

const express = require("express");
const router = express.Router();

const {
  getAllAvailablePublishedListings,
  getListingById,
} = require("../features/listings/buyerListingController");

router.get("/browse", getAllAvailablePublishedListings);
router.get("/browse/:id", getListingById);

module.exports = router;
