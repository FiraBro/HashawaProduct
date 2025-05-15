import React, { useState } from "react";
import { reviewService } from "../services/reviewService";
import StarRating from "./StarRating";
import styles from "../styles/ReviewForm.module.css";

const ReviewForm = ({ productId, onReviewSubmit }) => {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await reviewService.submitReview({
        productId,
        rating,
        title,
        comment,
      });
      onReviewSubmit();
      setRating(0);
      setTitle("");
      setComment("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.reviewForm}>
      <h3>Write a Review</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Rating</label>
          <StarRating rating={rating} onRatingChange={setRating} />
        </div>

        <div className={styles.formGroup}>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength="100"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Review</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            maxLength="500"
            rows="5"
          />
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <button
          type="submit"
          disabled={isSubmitting || rating === 0}
          className={styles.submitButton}
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
