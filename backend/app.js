const express = require("express");
const cors = require("cors");

const authRoutes = require("./features/auth/authRoutes");
const userRoutes = require("./features/users/userRoutes");
const listingRoutes = require("./features/listings/listingRoutes");
const bookingRoutes = require("./features/bookings/bookingRoutes");
const reviewRoutes = require("./features/reviews/reviewRoutes");

const app = express();

app.use(cors());
app.use(express.json({ limit: "12mb" }));

app.get("/", (req, res) => {
  res.send("Deluxe Bookings API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes);

app.use((error, req, res, next) => {
  if (error.type === "entity.too.large") return res.status(413).json({ message: "The photos are too large. Use photos up to 2MB each and 6MB total." });
  if (error instanceof SyntaxError && error.status === 400) return res.status(400).json({ message: "Could not read the request. Please check your details." });
  next(error);
});

module.exports = app;