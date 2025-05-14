
// 📁 services/cartService.js
import axios from 'axios';
import { authService } from './authService';

const API_URL = 'http://localhost:3000/api/cart';

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
      throw error.response?.data || { message: 'Failed to add to cart' };
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
      throw error.response?.data || { message: 'Failed to remove from cart' };
    }
  },

  getCart: async () => {
    try {
      const response = await axios.get(`${API_URL}`, {
        headers: authService.authHeader(),
      });
      return response.data.cart;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch cart' };
    }
  },
};
