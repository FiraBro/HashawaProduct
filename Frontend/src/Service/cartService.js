import axios from "axios";
import { authService } from "./authService";

const API_URL = "http://localhost:3000/api/v3/cart";

export const cartService = {
  addToCart: async ({ productId, variantColor, quantity }) => {
    try {
      const response = await axios.post(
        `${API_URL}/add`,
        { productId, variantColor, quantity },
        { headers: authService.authHeader() }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to add to cart" };
    }
  },

  removeFromCart: async ({ productId, variantColor }) => {
    try {
      const response = await axios.post(
        `${API_URL}/remove`,
        { productId, variantColor },
        { headers: authService.authHeader() }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to remove from cart" };
    }
  },

  getCart: async () => {
    try {
      const response = await axios.get(`${API_URL}/get`, {
        headers: authService.authHeader(),
      });
      return response;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch cart" };
    }
  },

  updateCartQuantity: async ({ productId, variantColor, action }) => {
    try {
      const response = await axios.put(
        `${API_URL}/update-quantity`,
        { productId, variantColor, action },
        { headers: authService.authHeader() }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to update quantity" };
    }
  },
};
