import React, { useState } from "react";
import styles from "../Navbar/Navbar.module.css";
import modalStyles from "../Navbar/Modal.module.css";
import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaUser,
  FaSearch,
  FaTimes,
  FaBars,
  FaEdit,
} from "react-icons/fa";
import { useCart } from "../context/cartContext";
import UpdateProfileForm from "../UpdateMe/UpdateMe"; // Make sure this path is correct

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const { cartCount } = useCart();
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
    <>
      <header className={styles.header}>
        <div className={styles.announcementBar}>
          <p>Free shipping on orders over 2000 Birr | 5-day return policy</p>
        </div>

        <div className={styles.mainNav}>
          <div className={styles.container}>
            <a href="/" className={styles.logo}>
              <span className={styles.logoPrimary}>Yoyo</span>
              <span className={styles.logoSecondary}>Brand</span>
            </a>

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

              {isLoggedIn && (
                <div className={styles.oneItem}>

                  <div className={styles.navItem}>
                    
                    <Link to="/track" className={styles.navLink}>
                      Track Order
                    </Link>
                  </div>
                  <div className={styles.navItem}>
                    <button
                      className={styles.navBtn}
                      onClick={() => setShowUpdateModal(true)}
                    >
                      <FaEdit className={styles.navBtnIcon} />
                      Me
                    </button>
                  </div>
                </div>
              )}
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

      {/* Modal for Update Profile */}
      {showUpdateModal && (
        <div
          className={modalStyles.modalOverlay}
          onClick={() => setShowUpdateModal(false)}
        >
          <div
            className={modalStyles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={modalStyles.closeButton}
              onClick={() => setShowUpdateModal(false)}
            >
              ×
            </button>
            <UpdateProfileForm />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
