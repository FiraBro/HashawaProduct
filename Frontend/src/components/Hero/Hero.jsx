import React from "react";
import styles from "./Hero.module.css";
import { FiArrowRight } from "react-icons/fi";

const Hero = () => {
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
            src="/shoe.jpg"
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
