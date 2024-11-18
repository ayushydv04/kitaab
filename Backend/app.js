import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

// App config
const app = express();
const port = process.env.PORT || 5000;
connectDB()
connectCloudinary()



// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable Cross-Origin requests

// API endpoints

app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get('/', (req, res)=>{
  res.send("API Working")
})






// const mongoose = require('mongoose');
// const productRoutes = require('./src/routes/productRoutes'); // Assuming routes are in src/routes
// const { connectToDB } = require('./db/conn'); // Import the DB connection logic


// // Connect to MongoDB
// connectToDB(); // Call your MongoDB connection function

// Routes
// app.use(productRoutes); // Use product routes

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
