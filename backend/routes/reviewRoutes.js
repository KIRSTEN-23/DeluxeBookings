const express = require("express");

const router = express.Router();

const Review = require("./../features/reviews/reviewSchema");

router.post("/", async (req, res) => {
  try {
    const review = new Review(req.body);

    await review.save();

    res.status(201).json({
      success: true,
      message: "Review Saved",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find().sort({
      createdAt: -1,
    });

    res.json(reviews);
  } catch (error) {
    console.error("GET /api/reviews error:", error);
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;