const express = require("express");
const router = express.Router();

const verifyToken = require("../../middleware/verifyToken");

// Read Public / buyer listings
const {
  getAllAvailablePublishedListings,
  getListingById,
} = require("./buyerListingController");

router.get("/browse", getAllAvailablePublishedListings);
router.get("/browse/:id", getListingById);

// Search Public / buyer listings
const {
  searchListings,
} = require("../../features/listings/searchListingController");

router.get("/search", searchListings);


router.use("/seller", verifyToken, require("../../middleware/requireSeller"));
router.use("/admin", verifyToken, require("../../middleware/requireRole"));

// Seller listing routes
const {
  getSellerListings,
  getSellerListingById,
  createSellerListing,
  updateSellerListing,
  publishSellerListing,
  unpublishSellerListing,
  deleteSellerListing,
  resubmitSellerListing,
} = require("./sellerListingController");

router.get("/seller/my-listings", getSellerListings);
router.get("/seller/my-listings/:id", getSellerListingById);
router.post("/seller/my-listings", createSellerListing);
router.put("/seller/my-listings/:id", updateSellerListing);
router.patch("/seller/my-listings/:id/publish", publishSellerListing);
router.patch("/seller/my-listings/:id/unpublish", unpublishSellerListing);
router.delete("/seller/my-listings/:id", deleteSellerListing);
router.patch("/seller/my-listings/:id/resubmit", resubmitSellerListing);

// Admin listing routes
const {
  getAllListingsAdmin,
  getListingsInReview,
  getListingForReview,
  approveListing,
  rejectListing,
} = require("./adminListingController");

router.get("/admin/all", getAllListingsAdmin);
router.get("/admin/review", getListingsInReview);
router.get("/admin/review/:id", getListingForReview);
router.patch("/admin/review/:id/approve", approveListing);
router.patch("/admin/review/:id/reject", rejectListing);

module.exports = router;