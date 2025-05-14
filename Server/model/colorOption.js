import mongoose from "mongoose";

const colorOptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  colorCode: {
    type: String,
    required: true,
    match: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
  },
  description: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  available: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model("ColorOption", colorOptionSchema);
