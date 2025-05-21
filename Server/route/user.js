import express from "express";
import { login, register } from "../controller/authController.js";
import { authLimiter } from "../middleware/authLimit.js";
const userRoute = express.Router();
userRoute.post("/register", authLimiter, register);
userRoute.post("/login", authLimiter, login);

export default userRoute;
