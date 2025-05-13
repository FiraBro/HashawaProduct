import React from "react";
import styles from "../Header/Header.module.css";
import { FaShoppingCart } from "react-icons/fa";

const Header = () => {
  return (
    <header className={styles.animatedHeader}>
      <div className={styles.container1}>
        <div className={styles.logo} id="headerLogo">
          abdihope
        </div>
        <nav className={styles.navbar}>
          <ul className={styles.navList}>
            <li>
              <a href="#home" className={styles.navLink}>
                Home
              </a>
            </li>
            <li>
              <a href="#products" className={styles.navLink}>
                Products
              </a>
            </li>
            <li>
              <a href="#service" className={styles.navLink}>
                Service
              </a>
            </li>
            <li>
              <a href="#about" className={styles.navLink}>
                About
              </a>
            </li>
            <li>
              <a href="#contact" className={styles.navLink}>
                Login/Sign-up
              </a>
            </li>
            <li>
              <a href="track-section.html" id="trackLink">
                Track Order
              </a>
            </li>
            <li>
              <a href="cart.html" className={styles.cartIcon}>
                <span className={styles.cartIconWrapper}>
                  <FaShoppingCart /> <span className={styles.cartCount}>0</span>
                </span>
              </a>
            </li>
          </ul>
          {/* Mobile Menu Toggle and Mobile Menu Container would go here */}
        </nav>
      </div>
      <div className={styles.gradientOverlay}></div>
    </header>
  );
};

export default Header;
