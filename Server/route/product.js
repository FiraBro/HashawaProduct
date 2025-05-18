import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  updateProduct,
} from "../controller/productController.js";
import { Protect, restrictTo } from "../controller/authController.js";
import { upload } from "../middleware/upload.js";

const productRoute = express.Router();

// Get all products (public)
productRoute.get("/", getAllProduct);

// Create new product (protected)
productRoute.post("/create", Protect, upload, createProduct);

// Update existing product by ID (protected)
// Using upload middleware to handle variant images
productRoute.put("/:id", Protect, upload, updateProduct);

// Delete product by ID (protected)
productRoute.delete("/:id", Protect, deleteProduct);

export default productRoute;
