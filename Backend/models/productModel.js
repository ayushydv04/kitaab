import mongoose from 'mongoose';


const productSchema = new mongoose.Schema(
    {
      // _id: { type: Number, required: true},
      pId: { type: Number, required: true},
      image: { type: String, required: true},
      name: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
      category: { type: String, required: true },
      subCategory: { type: String},
      bestSeller: { type: Boolean, default: false },
      quantity: { type: Number, required: true },
      stockStatus: { type: Boolean, required: true, default: true }
      // rating: { type: Number, required: true },
      // reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }]
  
    },
    { timestamps: true }
  );


const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;