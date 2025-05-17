import React, { useState } from "react";
import styles from "./ReviewPop.module.css";
import { reviewService } from "../../Service/reviewService"; 

const ReviewPopup = ({ onClose, product }) => {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await reviewService.submitReview({
        productId: product._id,
        title,
        rating,
        comment,
      });
      alert("Review submitted successfully!");
      onClose();
    } catch (error) {
      console.error("Review submission failed:", error);
      alert("Failed to submit review. Please try again.");
    }
  };

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupBox}>
        <button className={styles.closeBtn} onClick={onClose}>
          ×
        </button>
        <h2>Review {product.name}</h2>

        <form onSubmit={handleSubmit} className={styles.reviewForm}>
          <div className={styles.formGroup}>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter review title"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Rating:</label>
            <div className={styles.starRating}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={styles.star}
                  style={{ color: star <= rating ? "#ffc107" : "#e0e0e0" }}
                  onClick={() => setRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Comment:</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="4"
              placeholder="Write your review..."
            />
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={!title.trim() || !rating || !comment.trim()}
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewPopup;
