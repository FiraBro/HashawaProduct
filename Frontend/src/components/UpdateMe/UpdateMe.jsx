import { useState } from "react";
import { updateUserProfile } from "../../Service/updateMeService";
import styles from "./UpdateMe.module.css";

export default function UpdateProfileForm({ token, currentUser }) {
  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [userImage, setUserImage] = useState(null);
  const [preview, setPreview] = useState(currentUser?.userImageURL || "");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUserImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const data = await updateUserProfile({ name, email, userImage }, token);
      setStatus({ type: "success", message: "Profile updated successfully!" });
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Update failed." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.heading}>Update Profile</h2>

      {status.message && (
        <div
          className={`${styles.alert} ${
            status.type === "success" ? styles.success : styles.error
          }`}
        >
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.profilePreview}>
          <img
            src={preview || "/default-avatar.png"}
            alt="Preview"
            className={styles.avatar}
          />
          <label className={styles.uploadLabel}>
            Change Photo
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={styles.fileInput}
            />
          </label>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Name</label>
          <input
            type="text"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Email</label>
          <input
            type="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}
