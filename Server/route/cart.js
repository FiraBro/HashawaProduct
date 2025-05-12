import express from "express";
const cartRouter = express.Router();
import {
  addToCart,
  removeFromCart,
  getCart
} from "../controller/cartController.js";
import { Protect } from "../controller/authController.js";
cartRouter.post("/add", Protect, addToCart);
cartRouter.post("/remove", Protect, removeFromCart);
cartRouter.get("/get", Protect, getCart);

export default cartRouter;
