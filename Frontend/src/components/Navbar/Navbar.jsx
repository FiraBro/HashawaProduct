import React, { useState } from "react";
import styles from "../Navbar/Navbar.module.css";
import {
  FaShoppingCart,
  FaUser,
  FaSearch,
  FaTimes,
  FaBars,
} from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className={styles.header}>
      {/* Top Announcement Bar */}
      <div className={styles.announcementBar}>
        <p>Free shipping on orders over $50 | 30-day return policy</p>
      </div>

      {/* Main Navigation */}
      <div className={styles.mainNav}>
        <div className={styles.container}>
          {/* Logo */}
          <div className={styles.logo}>
            <span className={styles.logoPrimary}>ABDI</span>
            <span className={styles.logoSecondary}>HOPE</span>
          </div>

          {/* Desktop Navigation */}
          <nav
            className={`${styles.nav} ${
              isMenuOpen ? styles.mobileNavActive : ""
            }`}
          >
            {/* Mobile Menu Close Button */}
            <button
              className={styles.mobileMenuClose}
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <FaTimes />
            </button>

            {/* Search Bar (Mobile) */}
            <div className={styles.mobileSearch}>
              <input
                type="text"
                placeholder="Search products..."
                className={styles.searchInput}
              />
              <button className={styles.searchButton}>
                <FaSearch />
              </button>
            </div>

            {/* Navigation Links */}
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <a
                  href="#home"
                  className={styles.navLink}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </a>
              </li>
              <li className={styles.navItem}>
                <a
                  href="#products"
                  className={styles.navLink}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </a>
              </li>
              <li className={styles.navItem}>
                <a
                  href="#service"
                  className={styles.navLink}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Services
                </a>
              </li>
              <li className={styles.navItem}>
                <a
                  href="#about"
                  className={styles.navLink}
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </a>
              </li>
              <li className={styles.navItem}>
                <a
                  href="#contact"
                  className={styles.navLink}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </a>
              </li>
            </ul>

            {/* Mobile Account Links */}
            <div className={styles.mobileAccount}>
              <a href="#login" className={styles.accountLink}>
                <FaUser /> Login/Sign Up
              </a>
              <a href="#track" className={styles.accountLink}>
                Track Order
              </a>
            </div>
          </nav>

          {/* Right Side Icons */}
          <div className={styles.navIcons}>
            {/* Search Icon (Desktop) */}
            <button
              className={styles.iconButton}
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
            >
              <FaSearch />
            </button>

            {/* Search Bar (Desktop) - appears when searchOpen is true */}
            {searchOpen && (
              <div className={styles.desktopSearch}>
                <input
                  type="text"
                  placeholder="Search for shoes..."
                  className={styles.searchInput}
                />
                <button className={styles.searchButton}>
                  <FaSearch />
                </button>
              </div>
            )}

            {/* Account */}
            <a href="#login" className={styles.iconButton}>
              <FaUser />
              <span className={styles.iconText}>Account</span>
            </a>

            {/* Cart */}
            <a href="#cart" className={styles.cartIcon}>
              <FaShoppingCart />
              <span className={styles.cartCount}>0</span>
              <span className={styles.iconText}>Cart</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              className={styles.mobileMenuToggle}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
