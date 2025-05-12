import express from "express";
const cartRouter = express.Router();
import {
  addToCart,
  removeFromCart,
  getCart,
} from "../controller/cartController";
import { Protect } from "../controller/authController";
cartRouter.post("/add", Protect, addToCart);
cartRouter.post("/remove", Protect, removeFromCart);
cartRouter.get("/get", Protect, getCart);
