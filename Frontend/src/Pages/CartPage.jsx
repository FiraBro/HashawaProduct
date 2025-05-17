import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cartService } from "../Service/cartService";
import { useCart } from "../components/context/cartContext";
import styles from "./CartPage.module.css";
import Navbar from "../components/Navbar/Navbar";
import ReviewPopup from "../components/ReviewForm/ReviewPop";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const { fetchCartCount } = useCart();

  const [showReview, setShowReview] = useState(false); // Added
  const [selectedProduct, setSelectedProduct] = useState(null); // Added

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await cartService.getCart();
        setCartItems(data.cart?.items || []);
        setLoading(false);
        fetchCartCount();
      } catch (err) {
        setError("Failed to load cart");
        setLoading(false);
        console.error(err);
      }
    };

    fetchCart();
  }, [fetchCartCount]);

  const updateQuantity = async (productId, variantColor, action) => {
    if (isUpdating) return;
    setIsUpdating(true);
    try {
      await cartService.updateCartQuantity({ productId, variantColor, action });
      const { data } = await cartService.getCart();
      setCartItems(data.cart?.items || []);
      fetchCartCount();
    } catch (err) {
      console.error(err);
      alert("Failed to update quantity");
    } finally {
      setIsUpdating(false);
    }
  };

  const removeItem = async (productId, variantColor) => {
    if (isUpdating) return;
    setIsUpdating(true);
    try {
      await cartService.removeFromCart({ productId, variantColor });
      const { data } = await cartService.getCart();
      setCartItems(data.cart?.items || []);
      fetchCartCount();
    } catch (err) {
      console.error(err);
      alert("Failed to remove item");
    } finally {
      setIsUpdating(false);
    }
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => {
        const variant = item.product.variants.find(
          (v) => v.color === item.variantColor
        );
        return variant ? total + variant.price * item.quantity : total;
      }, 0)
      .toFixed(2);
  };

  if (loading)
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading your cart...</p>
      </div>
    );
  if (error)
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorIcon}>⚠️</div>
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className={styles.retryButton}
        >
          Try Again
        </button>
      </div>
    );

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <div className={styles.emptyCartIllustration}>
          {/* SVG icon */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
          >
            <path d="M6 2L3 6V20..." stroke="#4B5563" strokeWidth="2" />
          </svg>
        </div>
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything to your cart yet</p>
        <Link to="/" className={styles.continueShopping}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className={styles.cartContainer}>
        <div className={styles.cartHeader}>
          <h1 className={styles.cartTitle}>Your Shopping Cart</h1>
          <p className={styles.cartItemCount}>
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
          </p>
        </div>

        <div className={styles.cartContent}>
          <div className={styles.cartItems}>
            {cartItems.map((item, index) => {
              const { product, variantColor, quantity } = item;
              const variant = product.variants.find(
                (v) => v.color === variantColor
              );
              if (!variant) return null;
              const mainImage = Object.values(variant.images)[0];

              return (
                <div
                  key={`${product._id}-${variant._id}-${index}`}
                  className={styles.cartItem}
                >
                  <div className={styles.itemImage}>
                    <img
                      src={`http://localhost:3000/uploads/${mainImage}`}
                      alt={`${product.name}-${variant.color}`}
                      className={styles.productImage}
                    />
                  </div>

                  <div className={styles.itemDetails}>
                    <div className={styles.itemInfo}>
                      <h3 className={styles.productName}>{product.name}</h3>
                      <p className={styles.variantColor}>
                        <span
                          className={styles.colorSwatch}
                          style={{
                            backgroundColor: variant.color.toLowerCase(),
                          }}
                        />
                        {variant.color}
                      </p>
                      <p className={styles.itemPrice}>
                        ${variant.price.toFixed(2)}
                      </p>
                      <p
                        className={`${styles.stockStatus} ${
                          variant.stock > 0 ? styles.inStock : styles.outOfStock
                        }`}
                      >
                        {variant.stock > 0 ? "In Stock" : "Out of Stock"}
                      </p>
                    </div>

                    <div className={styles.itemActions}>
                      <div className={styles.quantityControl}>
                        <button
                          onClick={() =>
                            updateQuantity(
                              product._id,
                              variant.color,
                              "decrement"
                            )
                          }
                          disabled={quantity <= 1 || isUpdating}
                          className={styles.quantityButton}
                        >
                          −
                        </button>
                        <span className={styles.quantityValue}>{quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              product._id,
                              variant.color,
                              "increment"
                            )
                          }
                          disabled={quantity >= variant.stock || isUpdating}
                          className={styles.quantityButton}
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(product._id, variant.color)}
                        className={styles.removeButton}
                        disabled={isUpdating}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24">
                          <path
                            d="M18 6L6 18"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <path
                            d="M6 6L18 18"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                        </svg>{" "}
                        Remove
                      </button>

                      <button
                        className={styles.writeReviewButton}
                        onClick={() => {
                          setSelectedProduct(product);
                          setShowReview(true);
                        }}
                      >
                        Write a Review
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.cartSummary}>
            <div className={styles.summaryCard}>
              <h2 className={styles.summaryTitle}>Order Summary</h2>
              <div className={styles.summaryDetails}>
                <div className={styles.summaryRow}>
                  <span>Subtotal</span>
                  <span>${calculateTotal()}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Estimated Tax</span>
                  <span>${(calculateTotal() * 0.08).toFixed(2)}</span>
                </div>
                <div className={styles.summaryDivider}></div>
                <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                  <span>Total</span>
                  <span className={styles.totalPrice}>
                    $
                    {(
                      parseFloat(calculateTotal()) +
                      parseFloat(calculateTotal()) * 0.08
                    ).toFixed(2)}
                  </span>
                </div>
              </div>

              <button className={styles.checkoutButton} disabled={isUpdating}>
                {isUpdating ? (
                  <span className={styles.buttonSpinner}></span>
                ) : (
                  "Proceed to Checkout"
                )}
              </button>

              <div className={styles.paymentOptions}>
                <div className={styles.paymentIcon}>{/* Visa */}</div>
                <div className={styles.paymentIcon}>{/* Mastercard */}</div>
                <div className={styles.paymentIcon}>{/* PayPal */}</div>
              </div>

              <Link to="/" className={styles.continueShopping}>
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path d="M19 12H5" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M12 19L5 12L12 5"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Review Popup */}
      {showReview && selectedProduct && (
        <ReviewPopup
          product={selectedProduct}
          onClose={() => {
            setShowReview(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </>
  );
};

export default Cart;
