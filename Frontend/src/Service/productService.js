// 📁 services/productService.js
import axios from "axios";
import { authService } from "./authService";

const API_URL =
  import.meta.env.VITE_PRODUCT_API_URL ||
  "http://localhost:3000/api/v3/product";

export const productService = {
  createProduct: async (formData) => {
    try {
      const response = await axios.post(`${API_URL}`, formData, {
        headers: {
          ...authService.authHeader(),
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Product creation failed" };
    }
  },

  deleteProduct: async (productId) => {
    try {
      const response = await axios.delete(`${API_URL}/${productId}`, {
        headers: authService.authHeader(),
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to delete product" };
    }
  },

  getAllProducts: async () => {
    try {
      const response = await axios.get(`${API_URL}`);
      console.log(response);
      return response.data.data.product;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch products" };
    }
  },
};
