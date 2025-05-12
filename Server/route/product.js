import express from "express";
import {
  createProduct,
  deleteProduct,
} from "../controller/productController.js";
import { Protect, restrictTo } from "../controller/authController.js";

const productRoute = express.Router();

productRoute.post("/", Protect, createProduct);
productRoute.delete("/:id", Protect, restrictTo, deleteProduct);

export default productRoute;
