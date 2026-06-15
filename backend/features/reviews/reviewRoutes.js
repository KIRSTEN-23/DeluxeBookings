const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Review = require("./reviewSchema");

router.post("/", async (req, res) => {
  try {

    console.log("Incoming Review:");
    console.log(req.body);

    const review = new Review(req.body);

    await review.save();

    res.status(201).json({
      success: true,
      message: "Review Saved",
    });

  } catch (error) {

    console.error("SAVE ERROR:");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


router.get("/", async (req, res) => {
  try {

    console.log(
      "Ready State:",
      mongoose.connection.readyState
    );

    const reviews = await Review.find();

    res.json(reviews);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
});


// router.get("/", async (req, res) => {

//   try {

//     const reviews =
//       await Review.find()
//       .sort({
//         createdAt: -1
//       });

//     res.json(reviews);

//     const response =
//         await axios.get(
//          "http://localhost:5000/api/reviews"
//         );

// setReviews(response.data);

//   } catch (error) {

//     res.status(500).json({
//       message: error.message
//     });

//   }

// });

module.exports = router;