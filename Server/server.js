import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRoute from "./route/product.js";
import userRoute from "./route/user.js";
import cartRouter from "./route/cart.js";
import orderRouter from "./routes/order.js";

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Exit if DB connection fails
  });

app.use("/api/v3/product", productRoute);
app.use("/api/v3/user", userRoute);
app.use("/api/v3/cart", cartRouter);
app.use("/api/orders", orderRouter);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
