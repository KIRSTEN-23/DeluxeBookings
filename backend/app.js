const express = require("express");
const cors = require("cors");
const app = express();

// const authRoutes = require("./routes/authRoutes");
// const userRoutes = require("./routes/userRoutes");
// const publicRoutes = require("./routes/publicRoutes");
// const buyerRoutes = require("./routes/buyerRoutes");
const sellerRoutes = require("./routes/sellerRoutes");
// const adminRoutes = require("./routes/adminRoutes");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Deluxe Bookings API is running");
});

// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/public", publicRoutes);
// app.use("/api/buyer", buyerRoutes);
// app.use("/api/seller", sellerRoutes);
// app.use("/api/admin", adminRoutes);

//routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const bookingRoutes = require('./routes/checkoutRoutes');
app.use("/api", bookingRoutes);

const searchRoutes = require('./routes/searchRoutes');
app.use("/api", searchRoutes);

module.exports = app;
