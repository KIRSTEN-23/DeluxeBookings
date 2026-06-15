console.log("SELLER ROUTES LOADED");

const express = require("express");
const router = express.Router();

const {
  getSellerListings,
  getSellerListingById,
  createSellerListing,
  updateSellerListing,
  publishSellerListing,
  unpublishSellerListing,
  deleteSellerListing,
} = require("../features/listings/sellerListingController");

// To add:
// const verifyToken = require("../middleware/verifyToken");
// const requireRole = require("../middleware/requireRole");

router.get("/listings", getSellerListings);
router.get("/listings/:id", getSellerListingById);
router.post("/listings", createSellerListing);
router.put("/listings/:id", updateSellerListing);
router.patch("/listings/:id/publish", publishSellerListing);
router.patch("/listings/:id/unpublish", unpublishSellerListing);
router.delete("/listings/:id", deleteSellerListing);

module.exports = router;
