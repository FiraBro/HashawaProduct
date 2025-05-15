import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
} from "../controller/productController.js";
import { Protect, restrictTo } from "../controller/authController.js";
import {upload}  from "../middleware/upload.js";

const productRoute = express.Router();
productRoute.get("/", getAllProduct);
productRoute.post(
  "/create",
  upload, // or use upload.fields(...) if you want stricter control
  createProduct
);
productRoute.delete("/:id", deleteProduct);

export default productRoute;
