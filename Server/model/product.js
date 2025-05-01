import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    basePrice: Number,
    category: String,

    variants: [
      {
        color: { type: String, required: true },
        images: [String],
        stock: Number,
        price: Number, // optional override
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
