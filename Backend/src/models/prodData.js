const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    _id: { type: Number, required: true},
    imageUrl: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    subCategory: { type: String},
    bestSeller: { type: String, required: true },
    quantity: { type: Number, required: true },
    stockStatus: { type: String, required: true },
    rating: { type: Number, required: true },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }]

  },
  { timestamps: true }
);

const Register = new mongoose.model("Product", productSchema);

module.exports = Register;
