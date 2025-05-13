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
        images: {
          front: { type: String, required: true },
          side: { type: String, required: true },
          back: { type: String, required: true },
        },
        stock: { type: Number, default: 0 },
        price: Number, // optional override
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
