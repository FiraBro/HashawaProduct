import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
const app = express();
import morgan from "morgan";
// Import routes
app.use(morgan("dev"));
import productRoute from "./route/product.js";
import userRoute from "./route/user.js";
import cartRouter from "./route/cart.js";
import orderRouter from "./route/order.js";
import reviewRouter from "./route/reviewRoutes.js";
import userRouter from "./route/updateUser.js";
import { generalLimiter } from "./middleware/generalLimit.js";

// Load environment variables
dotenv.config();

// Enable CORS
app.use(cors());
app.use(generalLimiter);
// Middleware to parse JSON
app.use(express.json());

// Serve static files from the "uploads" folder
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Connect to MongoDB
mongoose
.connect(process.env.MONGODB_URI)
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });
  
  // Mount API routes
app.use("/api/v3/user", userRoute);
app.use("/api/v3/product", productRoute);
app.use("/api/v3/cart", cartRouter);
app.use("/api/v3/order", orderRouter);
app.use("/api/v3/review", reviewRouter);
app.use("/api/v3/update", userRouter);

// Start server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
