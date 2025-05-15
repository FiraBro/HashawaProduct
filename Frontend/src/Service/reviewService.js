import axios from "axios";
import { authService } from "./authService";

const API_URL = "http://localhost:4000/api/reviews";

export const reviewService = {
  // Submit a new review
  submitReview: async (reviewData) => {
    try {
      const response = await axios.post(API_URL, reviewData, {
        headers: authService.authHeader()
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to submit review" };
    }
  },

  // Get reviews for a product
  getProductReviews: async (productId) => {
    try {
      const response = await axios.get(`${API_URL}/products/${productId}/reviews`);
      return response.data.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch reviews" };
    }
  },

  // Get testimonials for homepage
  getTestimonials: async () => {
    try {
      const response = await axios.get(`${API_URL}/testimonials`);
      return response.data.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch testimonials" };
    }
  }
};