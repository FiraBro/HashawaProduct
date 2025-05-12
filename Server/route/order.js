import express from "express";
import {
  placeOrder,
  getOrderTracking,
  updateOrderStatus,
} from "../controller/orderController.js";
import { Protect } from "../controller/authController.js";

const orderRouter = express.Router();

// 🛒 Place order from cart
orderRouter.post("/place", Protect, placeOrder);

// 📦 Track order
orderRouter.get("/track/:orderId", Protect, getOrderTracking);

// 🛠 Admin: Update order status
orderRouter.put("/status/:orderId", Protect, updateOrderStatus);

export default orderRouter;
