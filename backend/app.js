const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Deluxe Bookings API is running');
});

// Routes will be added here later
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use)('/api/public', publicRoutes);
// app.use('/api/buyer', buyerRoutes);
// app.use('/api/seller', sellerRoutes);
// app.use('/api/admin', adminRoutes);

module.exports = app;