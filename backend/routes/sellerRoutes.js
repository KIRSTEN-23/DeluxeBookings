console.log("SELLER ROUTES LOADED");

const express = require("express");
const router = express.Router();

router.get("/listings", (req, res) => {
  res.json({ message: "Seller listings route working" });
});

router.get("/listings/:id", (req, res) => {
  res.json({
    message: "Seller single listing route working",
    listingId: req.params.id,
  });
});

router.post("/listings", (req, res) => {
  res.json({
    message: "Seller create listing route working",
    body: req.body,
  });
});

router.put("/listings/:id", (req, res) => {
  res.json({
    message: "Seller update listing route working",
    listingId: req.params.id,
    body: req.body,
  });
});

router.patch("/listings/:id/unpublish", (req, res) => {
  res.json({
    message: "Seller unpublish listing route working",
    listingId: req.params.id,
  });
});

router.patch("/listings/:id/publish", (req, res) => {
  res.json({
    message: "Seller publish listing route working",
    listingId: req.params.id,
  });
});

module.exports = router;