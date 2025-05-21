const passwordService = {
  forgotPassword: async (email) => {
    try {
      const { data } = await API.post("/auth/forgot-password", { email });
      return data.message;
    } catch (error) {
      return handleError(error);
    }
  },

  resetPassword: async (token, newPassword, confirmPassword) => {
    try {
      const { data } = await API.patch(`/auth/reset-password/${token}`, {
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
      return handleError(error);
    }
  },
};
