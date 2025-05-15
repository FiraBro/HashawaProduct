import React, { useEffect, useState } from "react";
import { reviewService } from "../services/reviewService";
import ReviewForm from "./ReviewForm";
import styles from "../styles/ProductReviews.module.css";

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchReviews = async () => {
    try {
      const data = await reviewService.getProductReviews(productId);
      setReviews(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const handleReviewSubmit = () => {
    setShowForm(false);
    fetchReviews();
  };

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className={styles.reviews}>
      <div className={styles.header}>
        <h3>Customer Reviews</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className={styles.reviewButton}
        >
          {showForm ? "Cancel" : "Write a Review"}
        </button>
      </div>

      {showForm && (
        <ReviewForm productId={productId} onReviewSubmit={handleReviewSubmit} />
      )}

      {reviews.length === 0 ? (
        <p>No reviews yet. Be the first to review!</p>
      ) : (
        <div className={styles.list}>
          {reviews.map((review) => (
            <div key={review._id} className={styles.review}>
              <div className={styles.meta}>
                <img
                  src={review.userId.avatar || "/images/default-avatar.png"}
                  alt={review.userId.name}
                />
                <div>
                  <h4>{review.userId.name}</h4>
                  <div className={styles.rating}>
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </div>
                  <small>
                    {new Date(review.createdAt).toLocaleDateString()}
                    {review.verifiedPurchase && (
                      <span className={styles.verified}>Verified Purchase</span>
                    )}
                  </small>
                </div>
              </div>
              <h5>{review.title}</h5>
              <p>{review.comment}</p>
              {review.images?.length > 0 && (
                <div className={styles.reviewImages}>
                  {review.images.map((img, i) => (
                    <img key={i} src={img} alt={`Review ${i + 1}`} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductReviews;
