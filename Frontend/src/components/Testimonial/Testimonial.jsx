import React, { useEffect, useState } from 'react';
import { reviewService } from '../../Service/reviewService';
import styles from '../Testimonial/Testimonial.module.css';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await reviewService.getTestimonials();
        setTestimonials(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) return <div>Loading testimonials...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className={styles.testimonials}>
      <h2>What Our Customers Say</h2>
      <div className={styles.grid}>
        {testimonials.map((testimonial) => (
          <div key={testimonial._id} className={styles.card}>
            <div className={styles.header}>
              <img 
                src={testimonial.userId.avatar || '/images/default-avatar.png'} 
                alt={testimonial.userId.name}
                className={styles.avatar}
              />
              <div>
                <h4>{testimonial.userId.name}</h4>
                <div className={styles.rating}>
                  {'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}
                </div>
              </div>
            </div>
            <h5>{testimonial.title}</h5>
            <p>{testimonial.comment}</p>
            <div className={styles.product}>
              <span>Purchased:</span>
              <img 
                src={testimonial.productId.mainImage} 
                alt={testimonial.productId.name}
              />
              <p>{testimonial.productId.name}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;