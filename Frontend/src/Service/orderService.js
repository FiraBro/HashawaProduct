// 📁 services/orderService.js
import axios from "axios";
import { authService } from "./authService";

const API_URL = "http://localhost:3000/api/orders";

export const orderService = {
  placeOrder: async (address) => {
    try {
      const response = await axios.post(
        `${API_URL}`,
        { address },
        { headers: authService.authHeader() }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Order placement failed" };
    }
  },

  getOrderTracking: async (orderId) => {
    try {
      const response = await axios.get(`${API_URL}/${orderId}`, {
        headers: authService.authHeader(),
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to get order tracking" };
    }
  },

  updateOrderStatus: async (orderId, status) => {
    try {
      const response = await axios.put(
        `${API_URL}/${orderId}`,
        { status },
        { headers: authService.authHeader() }
      );
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || { message: "Failed to update order status" }
      );
    }
  },
};
