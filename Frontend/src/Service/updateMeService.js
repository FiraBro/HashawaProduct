import axios from "axios";
import { authService } from "./authService";

const API_URL = "http://localhost:3000/api/v3/update";

// Update user profile (name, email, and optional userImage)
export const updateUserProfile = async (data) => {
  const formData = new FormData();

  if (data.name) formData.append("name", data.name);
  if (data.email) formData.append("email", data.email);
  if (data.userImage) formData.append("userImage", data.userImage); // must match multer field

  try {
    const response = await axios.patch(`${API_URL}/updateMe`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...authService.authHeader(), // ✅ Automatically includes Authorization header
      },
    });

    console.log("✅ Profile updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error updating user profile:", error);
    throw error.response?.data || { message: "Unknown error" };
  }
};
