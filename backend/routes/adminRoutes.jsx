console.log("ADMIN ROUTES LOADED");

const express = require("express");
const router = express.Router();

const {
  getAllListingsAdmin,
  getListingsInReview,
  getListingForReview,
  approveListing,
  rejectListing,
} = require("../features/listings/adminListingController");

// To add:
// const verifyToken = require("../middleware/verifyToken");
// const requireRole = require("../middleware/requireRole");

router.get("/listings", getAllListingsAdmin);
router.get("/listings/review", getListingsInReview);
router.get("/listings/:id", getListingForReview);
router.patch("/listings/:id/approve", approveListing);
router.patch("/listings/:id/reject", rejectListing);

module.exports = router;