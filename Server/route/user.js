import express from "express";
import {
  login,
  register,
  forgotPassword,
  resetPassword,
} from "../controller/authController.js";
import { authLimiter } from "../middleware/authLimit.js";

const userRoute = express.Router();
userRoute.post("/register", authLimiter, register);
userRoute.post("/login", authLimiter, login);

userRoute.post("/forgot-password", forgotPassword);
userRoute.patch("/reset-password/:token", resetPassword);
export default userRoute;
