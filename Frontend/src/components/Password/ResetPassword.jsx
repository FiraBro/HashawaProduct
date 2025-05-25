import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { passwordService } from "../../Service/passwordService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await passwordService.resetPassword(token, newPassword, confirmPassword);
      toast.success("Password reset successful. You can now log in.");
      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (err) {
      toast.error(
        "Error resetting password: " +
          (err.response?.data?.message || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <ToastContainer position="top-center" autoClose={2000} />
      <div style={styles.card}>
        <h1 style={styles.heading}>Reset Password</h1>
        <form onSubmit={handleResetPassword} style={styles.form}>
          <input
            type="password"
            required
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={styles.input}
            minLength={8}
          />
          <input
            type="password"
            required
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={styles.input}
            minLength={8}
          />
          <button
            type="submit"
            style={{
              ...styles.button,
              ...(loading || newPassword !== confirmPassword
                ? styles.buttonDisabled
                : {}),
            }}
            disabled={loading || newPassword !== confirmPassword}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #4f8cff 0%, #6ee7b7 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  card: {
    background: "#fff",
    padding: "2rem 2.5rem",
    borderRadius: "16px",
    boxShadow: "0 4px 32px rgba(0,0,0,0.10)",
    width: "100%",
    maxWidth: "400px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heading: {
    marginBottom: "1.5rem",
    color: "#2563eb",
    fontWeight: 700,
    fontSize: "2rem",
    letterSpacing: "0.5px",
  },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.75rem 1rem",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "1rem",
    outline: "none",
    transition: "border 0.2s",
    width: "100%",
    boxSizing: "border-box",
  },
  button: {
    padding: "0.75rem 1rem",
    borderRadius: "8px",
    background: "linear-gradient(90deg, #4f8cff 0%, #38bdf8 100%)",
    color: "#fff",
    fontWeight: 600,
    fontSize: "1rem",
    border: "none",
    cursor: "pointer",
    transition: "background 0.2s, opacity 0.2s",
    marginTop: "0.5rem",
  },
  buttonDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
  },
};

export default ResetPasswordPage;
