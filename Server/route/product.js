import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
} from "../controller/productController.js";
import { Protect, restrictTo } from "../controller/authController.js";

const productRoute = express.Router();
productRoute.get("/", getAllProduct);
productRoute.post(
  "/create",
  createProduct
);
productRoute.delete("/:id",Protect, deleteProduct);

export default productRoute;
