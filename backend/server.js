const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/luxurybooking";

console.log(process.env.MONGO_URI);
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.use("/api/reviews", require("./routes/reviewRoutes"));
    app.use("/api/seller", require("./routes/sellerRoutes"));
    app.use("/api/bookings", require("./routes/bookingRoutes"));

    app.get("/", (req, res) => {
      res.send("API Running");
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });