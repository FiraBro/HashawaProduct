import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.footerContainer}>
        <div className={styles.footerSection}>
          <h3 className={styles.footerHeading}>Shop</h3>
          <ul className={styles.footerList}>
            <li>Men's Shoes</li>
            <li>Women's Shoes</li>
            <li>Kids' Shoes</li>
            <li>New Arrivals</li>
            <li>Best Sellers</li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3 className={styles.footerHeading}>Help</h3>
          <ul className={styles.footerList}>
            <li>Customer Service</li>
            <li>Track Order</li>
            <li>Returns & Exchanges</li>
            <li>Shipping Info</li>
            <li>FAQ</li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3 className={styles.footerHeading}>About Us</h3>
          <ul className={styles.footerList}>
            <li>Our Story</li>
            <li>Sustainability</li>
            <li>Careers</li>
            <li>Press</li>
            <li>Store Locator</li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3 className={styles.footerHeading}>Connect</h3>
          <div className={styles.socialIcons}>
            <span className={styles.icon}>FB</span>
            <span className={styles.icon}>IG</span>
            <span className={styles.icon}>TW</span>
            <span className={styles.icon}>YT</span>
          </div>
          <div className={styles.newsletter}>
            <p>Subscribe to our newsletter</p>
            <div className={styles.newsletterForm}>
              <input type="email" placeholder="Your email" />
              <button type="submit">→</button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>© {new Date().getFullYear()} SoleMate Shoes. All rights reserved.</p>
        <div className={styles.legalLinks}>
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Cookie Policy</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
