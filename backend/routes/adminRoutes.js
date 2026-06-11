console.log("ADMIN ROUTES LOADED");

const express = require("express");
const router = express.Router();

// Get moderation queue
router.get("/listings/queue", (req, res) => {
  res.json({
    message: "Admin: get listings awaiting moderation",
  });
});

// Get single queued listing
router.get("/listings/queue/:id", (req, res) => {
  res.json({
    message: "Admin: get queued listing",
    listingId: req.params.id,
  });
});

// Approve listing
router.patch("/listings/:id/approve", (req, res) => {
  res.json({
    message: "Admin: approve listing",
    listingId: req.params.id,
  });
});

// Reject listing
router.patch("/listings/:id/reject", (req, res) => {
  res.json({
    message: "Admin: reject listing",
    listingId: req.params.id,
  });
});

module.exports = router;