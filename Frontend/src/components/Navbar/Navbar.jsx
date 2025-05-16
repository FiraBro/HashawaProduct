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
import { useCart } from "../context/cartContext"; // import context

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cartCount } = useCart(); // get cartCount from context
  const isLoggedIn = localStorage.getItem("token");

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.announcementBar}>
        <p>Free shipping on orders over $50 | 30-day return policy</p>
      </div>

      <div className={styles.mainNav}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <span className={styles.logoPrimary}>ABDI</span>
            <span className={styles.logoSecondary}>HOPE</span>
          </div>

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

            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <a
                  href="#products"
                  className={styles.navLink}
                  onClick={(e) => handleSmoothScroll(e, "#products")}
                >
                  Products
                </a>
              </li>
              <li className={styles.navItem}>
                <a
                  href="#service"
                  className={styles.navLink}
                  onClick={(e) => handleSmoothScroll(e, "#service")}
                >
                  Services
                </a>
              </li>
              <li className={styles.navItem}>
                <a
                  href="#contact"
                  className={styles.navLink}
                  onClick={(e) => handleSmoothScroll(e, "#contact")}
                >
                  Contact
                </a>
              </li>
            </ul>

            <div className={styles.navItem}>
              <Link to="/track" className={styles.navLink}>
                Track Order
              </Link>
            </div>
          </nav>

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

            {isLoggedIn && (
              <Link to="/cart" className={styles.cartIcon}>
                <FaShoppingCart />
                {cartCount > 0 && (
                  <span className={styles.cartCount}>{cartCount}</span>
                )}
                <span className={styles.iconText}>Cart</span>
              </Link>
            )}

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
