import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
} from "../controller/productController.js";
import { Protect, restrictTo } from "../controller/authController.js";
import { upload } from "../middleware/upload.js";

const productRoute = express.Router();
productRoute.get("/", getAllProduct);
productRoute.post(
  "/create",
  upload,           // ✅ This handles parsing form-data and populates req.body and req.files
  createProduct
);
productRoute.delete("/:id", deleteProduct);

export default productRoute;
