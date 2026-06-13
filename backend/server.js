// const path = require("path");
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// require("dotenv").config({ path: path.resolve(__dirname, ".env") });

// const app = express();

// app.use(cors());

// app.use(express.json());

// const PORT = process.env.PORT || 5000;
// const MONGO_URI = process.env.MONGO_URI;
// const insecureTls = process.env.MONGO_TLS_INSECURE === "true";

// const connectMongo = async () => {
//   if (!MONGO_URI) {
//     console.warn("Missing MONGO_URI in backend/.env. Skipping MongoDB connection.");
//     return;
//   }

//   try {
//     await mongoose.connect(MONGO_URI, {
//       tls: true,
//       tlsAllowInvalidCertificates: insecureTls,
//       tlsAllowInvalidHostnames: insecureTls,
//       serverSelectionTimeoutMS: 10000,
//     });
//     console.log("MongoDB Connected");
//   } catch (err) {
//     console.error("MongoDB connection error:", err && err.message ? err.message : err);
//     if (insecureTls) {
//       console.error("MongoDB insecure TLS fallback failed. Remove MONGO_TLS_INSECURE after fixing TLS issues.");
//     } else {
//       console.error("If this is an Atlas TLS/SSL issue, try setting MONGO_TLS_INSECURE=true in backend/.env for local debugging.");
//     }
//     console.error("Server will continue running without DB connection.");
//   }
// };

// connectMongo();

// app.use("/api/reviews", require("./routes/reviewRoutes"));

// app.listen(PORT, () => {
//   console.log(`Server Running On ${PORT}`);
// });


// booking server

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const bookingRoutes = require("./routes/sellerRoutes");

const app = express();

require("dotenv").config();



app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error(err);
  });

app.use("/api/seller", bookingRoutes);

app.listen(5000, () => {
  console.log("Server running");
});

app.get("/", (req, res) => {
  res.send("API Running");
});