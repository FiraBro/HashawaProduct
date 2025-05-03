import express from "express";
import {
  createProduct,
  deleteProduct,
} from "../controller/productController.js";

const productRoute = express.Router();

productRoute.post("/", createProduct);
productRoute.delete("/:id", deleteProduct); // if you want to expose delete as well

export default productRoute;
