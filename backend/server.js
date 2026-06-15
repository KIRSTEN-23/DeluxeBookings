const dotenv = require('dotenv');
const app = require('./app');
const connectDB = require('./_config/db');
const reviewRoutes = require("./routes/reviewRoutes");

dotenv.config();

const PORT = process.env.PORT || 5001;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    app.use("/api/reviews", reviewRoutes);

  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();