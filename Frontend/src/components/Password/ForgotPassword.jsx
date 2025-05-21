import { useState } from "react";
import passwordService from "../../Service/passwordService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    try {
      await passwordService.forgotPassword(email);
      toast.success("Password reset link sent. Check your email.");
      setEmail(""); // Optionally clear the input
    } catch (error) {
      const msg = error.response?.data?.message || error.message;
      setErrorMsg(msg);
      toast.error("Error: " + msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={styles.container}>
      <ToastContainer position="top-center" autoClose={2000} />
      <section style={styles.card} aria-labelledby="forgot-password-title">
        <h1 id="forgot-password-title" style={styles.heading}>
          Forgot Password
        </h1>
        <form onSubmit={handleSubmit} style={styles.form} aria-busy={loading}>
          <label htmlFor="email" style={{ display: "none" }}>
            Email address
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            autoFocus
            disabled={loading}
            aria-describedby={errorMsg ? "forgot-error" : undefined}
          />
          {errorMsg && (
            <div
              id="forgot-error"
              style={{
                color: "#f44336",
                fontSize: "0.95rem",
                marginBottom: "0.5rem",
              }}
              role="alert"
            >
              {errorMsg}
            </div>
          )}
          <button
            type="submit"
            style={{
              ...styles.button,
              ...(loading ? styles.buttonDisabled : {}),
            }}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </section>
    </main>
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

export default ForgotPassword;
