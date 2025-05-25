import React, { useEffect, useState } from "react";
import styles from "./Hero.module.css";
import { FiArrowRight } from "react-icons/fi";
import { cartService } from "../../Service/cartService"; // Adjust the import path as needed

const Hero = () => {
  const [heroImage, setHeroImage] = useState("/shoe.jpg"); // Default image

  useEffect(() => {
    const fetchCartImage = async () => {
      try {
        const response = await cartService.getCart();
        console.log(response);
        if (response.data?.items?.length > 0) {
          // Use the first item's image from cart
          const firstCartItem = response.data.items[0];
          if (firstCartItem.image) {
            setHeroImage(firstCartItem.image);
          }
        }
      } catch (error) {
        console.error("Failed to fetch cart:", error);
        // Keep default image if there's an error
      }
    };

    fetchCartImage();
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.textContent}>
          <h1 className={styles.tagline}>
            Step Into <span className={styles.highlight}>Comfort</span> and
            Style
          </h1>
          <p className={styles.subtitle}>
            Discover our premium collection designed for every step of your
            journey
          </p>
          <div className={styles.ctaContainer}>
            <button className={styles.primaryBtn}>
              Shop Now <FiArrowRight className={styles.arrowIcon} />
            </button>
            <button className={styles.secondaryBtn}>New Arrivals</button>
          </div>
        </div>

        <div className={styles.imageContainer}>
          <img
            src={heroImage}
            alt="Premium running shoe"
            className={styles.heroImage}
          />
          <div className={styles.badge}>
            <span>New Collection</span>
          </div>
        </div>
      </div>

      {/* Optional: Brand showcase strip */}
      <div className={styles.brandStrip}>
        <span>Nike</span>
        <span>Adidas</span>
        <span>Puma</span>
        <span>New Balance</span>
        <span>Reebok</span>
      </div>
    </section>
  );
};

export default Hero;
