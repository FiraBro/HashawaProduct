// 📁 services/colorService.js
import axios from "axios";
import { authService } from "./authService";

const API_URL = "http://localhost:3000/api/colors";

export const colorService = {
  /**
   * Get all available color options
   * @returns {Promise<Array>} Array of color options
   */
  getColorOptions: async () => {
    try {
      const response = await axios.get(`${API_URL}`);
      return response.data.data; // Assuming your backend returns { success: true, data: [...] }
    } catch (error) {
      throw (
        error.response?.data || { message: "Failed to fetch color options" }
      );
    }
  },

  /**
   * Create a new color option (admin only)
   * @param {Object} colorData - Color option data
   * @returns {Promise<Object>} Created color option
   */
  createColorOption: async (colorData) => {
    try {
      const response = await axios.post(`${API_URL}`, colorData, {
        headers: {
          ...authService.authHeader(),
          "Content-Type": "application/json",
        },
      });
      return response.data.data;
    } catch (error) {
      throw error.response?.data || { message: "Color option creation failed" };
    }
  },

  /**
   * Update an existing color option (admin only)
   * @param {string} colorId - ID of the color to update
   * @param {Object} updateData - Updated color data
   * @returns {Promise<Object>} Updated color option
   */
  updateColorOption: async (colorId, updateData) => {
    try {
      const response = await axios.patch(`${API_URL}/${colorId}`, updateData, {
        headers: authService.authHeader(),
      });
      return response.data.data;
    } catch (error) {
      throw (
        error.response?.data || { message: "Failed to update color option" }
      );
    }
  },

  /**
   * Delete a color option (admin only)
   * @param {string} colorId - ID of the color to delete
   * @returns {Promise<Object>} Deletion confirmation
   */
  deleteColorOption: async (colorId) => {
    try {
      const response = await axios.delete(`${API_URL}/${colorId}`, {
        headers: authService.authHeader(),
      });
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || { message: "Failed to delete color option" }
      );
    }
  },

  /**
   * Get a single color option by ID
   * @param {string} colorId - ID of the color to fetch
   * @returns {Promise<Object>} Color option details
   */
  getColorById: async (colorId) => {
    try {
      const response = await axios.get(`${API_URL}/${colorId}`);
      return response.data.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch color option" };
    }
  },
};
