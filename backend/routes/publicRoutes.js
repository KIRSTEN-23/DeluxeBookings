console.log("PUBLIC ROUTES LOADED");

const express = require("express");

const router = express.Router();

router.get("/listings", (req, res) => {
  res.json({ message: "Public listings route working" });
});

router.get("/listings/:id", (req, res) => {
  res.json({
    message: "Public single listing route working",

    listingId: req.params.id,
  });
});

module.exports = router;
