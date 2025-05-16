import React, { useState } from "react";
import styles from "../Navbar/Navbar.module.css";
import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaUser,
  FaSearch,
  FaTimes,
  FaBars,
} from "react-icons/fa";
import { useCart } from "../context/cartContext"; // ✅ import context

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cartCount } = useCart(); // ✅ get cartCount from context
  const isLoggedIn = localStorage.getItem("token");

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
                <Link
                  to="/home"
                  className={styles.navLink}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link
                  to="/products"
                  className={styles.navLink}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link
                  to="/service"
                  className={styles.navLink}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Services
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link
                  to="/contact"
                  className={styles.navLink}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
            </ul>

            <div className={styles.navItem}>
              <Link to="/track" className={styles.navLink}>
                Track Order
              </Link>
            </div>
          </nav>

          {/* Right Side Icons */}
          <div className={styles.navIcons}>
            <button
              className={styles.iconButton}
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
            >
              <FaSearch />
            </button>

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

            {/* Account / Logout */}
            {isLoggedIn ? (
              <button
                className={styles.iconButton}
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.reload();
                }}
              >
                <FaUser />
                <span className={styles.iconText}>Logout</span>
              </button>
            ) : (
              <Link to="/login" className={styles.iconButton}>
                <FaUser />
                <span className={styles.iconText}>Account</span>
              </Link>
            )}

            {/* Cart */}
            {isLoggedIn && (
              <Link to="/cart" className={styles.cartIcon}>
                <FaShoppingCart />
                {cartCount > 0 && (
                  <span className={styles.cartCount}>{cartCount}</span>
                )}
                <span className={styles.iconText}>Cart</span>
              </Link>
            )}

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
