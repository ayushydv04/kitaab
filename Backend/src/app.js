const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes'); // Assuming routes are in src/routes
const { connectToDB } = require('./db/conn'); // Import the DB connection logic

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Enable Cross-Origin requests
app.use(express.json()); // Parse JSON request bodies

// // Connect to MongoDB
// connectToDB(); // Call your MongoDB connection function

// Routes
app.use(productRoutes); // Use product routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
