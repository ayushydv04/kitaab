// src/routes/productRoutes.js
const express = require('express');
const Product = require('../models/prodData'); // Import Product model
const router = express.Router();

// Route to add a product
router.post('/add', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to get all products
router.get('/collection', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
