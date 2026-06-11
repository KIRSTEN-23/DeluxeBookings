const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Deluxe Bookings API is running');
});

// Routes 
// app.use('/api/auth', 
// require('./routes/authRoutes')
// );

// app.use('/api/users', 
//   require('./routes/userRoutes')
// );

app.use('/api/public', 
  require('./routes/publicRoutes')
);

app.use('/api/buyer', 
  require('./routes/buyerRoutes')
);

app.use('/api/seller', 
  require('./routes/sellerRoutes')
);

app.use('/api/admin', 
  require('./routes/adminRoutes')
);

module.exports = app;