import express from "express";
import {
  createReview,
  getProductReviews,
  getTestimonials,
  deleteReview,
} from "../controller/reviewController.js";
import { Protect } from "../controller/authController.js";
const reviewRouter = express.Router();

// ✅ Only protect routes that need authentication
reviewRouter.route("/").post(Protect, createReview);

reviewRouter.route("/testimonials").get(getTestimonials);

reviewRouter.route("/products/:productId/reviews").get(getProductReviews);
reviewRouter.route("/:reviewId").delete( Protect,deleteReview);

export default reviewRouter;
