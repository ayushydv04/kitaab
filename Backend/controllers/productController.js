import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// function for add product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller, pId, quantity, stockStatus, rating, review } = req.body;

        // Access the single uploaded image file
        const imageFile = req.file;

        // Check if the image file is uploaded
        if (!imageFile) {
            return res.json({ success: false, message: "Image is required" });
        }

        // Upload image to Cloudinary and get the URL
        const result = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
        const imageUrl = result.secure_url;

        // Prepare product data
        const productData = {
            pId,
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            quantity: Number(quantity),
            stockStatus: stockStatus === "true" ? true : false,
            rating: rating ? Number(rating) : 0,
            review: review || [],
            image: imageUrl,
            date: Date.now()
        };

        // Create and save the product
        const product = new productModel(productData);
        await product.save();

        res.json({ success: true, message: "Product Added" });
    } catch (error) {
        console.error(error); // Log the specific error for easier debugging
        res.json({ success: false, message: error.message });
    }
};

// function for listing products
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// function for removing product
const removeProduct = async (req, res) => {
    try {
        const { pId } = req.body;

        // Find and delete the product by custom pId
        const deletedProduct = await productModel.findOneAndDelete({ pId });

        if (!deletedProduct) {
            return res.json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, message: "Product Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// function for single product info
const singleProduct = async (req, res) => {
    try {
        const { pId } = req.body;

        // Find the product by custom pId
        const product = await productModel.findOne({ pId });

        if (!product) {
            return res.json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, product });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


export { listProducts, addProduct, removeProduct, singleProduct };
