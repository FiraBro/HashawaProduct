import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  updateProduct,
  productImageResize,
} from "../controller/productController.js";
import { Protect, restrictTo } from "../controller/authController.js";
import { upload } from "../middleware/upload.js";

const productRoute = express.Router();

// Get all products (public)
productRoute.get("/", getAllProduct);

// Create new product (protected)
productRoute.post(
  "/create",
  Protect,
  upload,
  productImageResize,
  createProduct
);

// Update existing product by ID (protected)
// Using upload middleware to handle variant images
productRoute.put("/:id", Protect, upload, productImageResize, updateProduct);

// Delete product by ID (protected)
productRoute.delete("/:id", Protect, deleteProduct);

export default productRoute;
