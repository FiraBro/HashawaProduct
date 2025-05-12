import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  variantColor: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  priceAtPurchase: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [orderItemSchema],
    status: {
      type: String,
      enum: ["placed", "packed", "shipped", "out for delivery", "delivered"],
      default: "placed",
    },
    trackingNumber: { type: String }, // optional, for courier integration
    courier: { type: String },
    history: [
      {
        status: String,
        date: { type: Date, default: Date.now },
      },
    ],
    totalAmount: Number,
    address: String,
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
