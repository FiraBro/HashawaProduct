import express from "express";
import {
  createReview,
  getProductReviews,
  getTestimonials,
} from "../controller/reviewController.js";
// import protect from "../controller/authController.js";

const reviewRouter = express.Router();

reviewRouter.route("/").post(createReview);

reviewRouter.route("/testimonials").get(getTestimonials);

reviewRouter.route("/products/:productId/reviews").get(getProductReviews);

export default reviewRouter;
