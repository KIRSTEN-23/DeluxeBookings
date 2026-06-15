const express = require("express");
const cors = require("cors");

const authRoutes = require("./features/auth/authRoutes");
const userRoutes = require("./features/users/userRoutes");
const listingRoutes = require("./features/listings/listingRoutes");
const bookingRoutes = require("./features/bookings/bookingRoutes");
const reviewRoutes = require("./features/reviews/reviewRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Deluxe Bookings API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes);

module.exports = app;