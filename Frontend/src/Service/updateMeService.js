import axios from "axios";

const API_URL = "https://localhost/api/v3/update"; // Replace with your actual API URL

// Update user profile (name, email, and optional userImage)
export const updateUserProfile = async (data, token) => {
  const formData = new FormData();

  // Append name and email if provided
  if (data.name) formData.append("name", data.name);
  if (data.email) formData.append("email", data.email);

  // Append image file if available
  if (data.userImage) {
    formData.append("userImage", data.userImage); // Must match field name expected by multer
  }

  try {
    const response = await axios.patch(`${API_URL}/update-me`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error.response?.data || { message: "Unknown error" };
  }
};
