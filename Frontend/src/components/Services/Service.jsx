import React from "react";
import styles from "../Services/Service.module.css";
// import { FaTruck, FaRefresh, FaHeadset } from 'react-icons/fa';

import { FaTruck, FaSync, FaHeadset } from "react-icons/fa";

const Service = () => (
  <section className={styles.services} id="service">
    <h1>Our Services</h1>
    <div className={styles.serviceContainer}>
      <div className={styles.serviceBox}>
        <FaTruck />
        <h2>Free Shipping</h2>
        <p>Enjoy free shipping on all orders over $50!</p>
      </div>
      <div className={styles.serviceBox}>
        <FaSync />
        <h2>Easy Returns</h2>
        <p>Hassle-free returns within 30 days of purchase.</p>
      </div>
      <div className={styles.serviceBox}>
        <FaHeadset />
        <h2>24/7 Support</h2>
        <p>Our customer support team is here to help you anytime.</p>
      </div>
    </div>
  </section>
);

export default Service;
