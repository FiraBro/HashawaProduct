import React from 'react';
import styles from '../Hero/Hero.module.css';

const Hero = () => (
  <section className={styles.hero} id="home">
    <div className={styles.heroContent}>
      <div
        className={styles.contentBg}
        style={{ backgroundImage: "url('/shoe.jpg')" }}
      ></div>
      <div className={styles.contentText}>
        <h1>Welcome to Abdihope Shoe Store</h1>
        <p>Your one-stop shop for the latest shoe trends!</p>
        <a href="#products" className={styles.btn}>Shop Now</a>
      </div>
    </div>
  </section>
);

export default Hero;