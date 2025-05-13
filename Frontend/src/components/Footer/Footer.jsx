import React from "react";
import styles from "../Footer/Footer.module.css";

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.footerContainer}>
      <div className={styles.card}>
        <h1>Feedback</h1>
        <form>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your feedback..." rows="4" required></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className={styles.card}>
        <h1>Contact Us</h1>
        <p>📧 info@example.com</p>
        <p>📞 +1 (123) 456-7890</p>
      </div>
      <div className={styles.card}>
        <h1>Payment Methods</h1>
        <img
          src="https://via.placeholder.com/300x100?text=Payment+Methods"
          alt="Payment"
        />
      </div>
    </div>
    <div className={styles.footerBottom}>
      <p>
        &copy; {new Date().getFullYear()} Abdihope Shoe Store. All rights
        reserved.
      </p>
      <p>Designed by Abdihope</p>
    </div>
  </footer>
);

export default Footer;
