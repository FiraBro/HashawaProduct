import axios from "axios";

// Use environment variables for URLs
const API_BASE_URL =
  import.meta.env.VITE_AUTH_API_URL || "http://localhost:3000/api/v3/user";

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
export const passwordService = {
  forgotPassword: async (email) => {
    try {
      const { data } = await API.post("/forgot-password", { email });
      console.log(data);

      return data.message;
    } catch (error) {
      return error;
    }
  },

  resetPassword: async (token, newPassword, confirmPassword) => {
    try {
      const { data } = await API.patch(`/reset-password/${token}`, {
        password: newPassword,
        passwordConfirm: confirmPassword,
      });
      if (data.token && data.data && data.data.user) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", data.data.user.role);
        localStorage.setItem("userId", data.data.user._id);
      }
      return data;
    } catch (error) {
      return error;
    }
  },
};
