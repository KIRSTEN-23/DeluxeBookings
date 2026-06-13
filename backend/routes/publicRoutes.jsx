console.log("PUBLIC ROUTES LOADED");

const express = require("express");
const router = express.Router();

const {
  getAllAvailablePublishedListings,
  getListingById,
} = require("../features/listings/publicListingController");

router.get("/listings", getAllAvailablePublishedListings);
router.get("/listings/:id", getListingById);

module.exports = router;
