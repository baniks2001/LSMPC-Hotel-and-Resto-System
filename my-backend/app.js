const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const orderRoutes = require('./routes/orderRoutes'); // Import order routes
const reservationRoutes = require('./routes/reservationRoutes'); 
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());


// Use the order routes for API
app.use('/api', orderRoutes);
app.use('/api', reservationRoutes);


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
