import React, { useEffect, useState } from "react";
import { productService } from "../../Service/productService";
import { cartService } from "../../Service/cartService";
import { useCart } from "../../components/context/cartContext";
import styles from "./Product.module.css";
import { toast } from "react-toastify";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  const { fetchCartCount } = useCart();

  useEffect(() => {
    productService
      .getAllProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);

        const initialImageState = {};
        data.forEach((product) => {
          product.variants.forEach((variant) => {
            initialImageState[`${product._id}-${variant._id}`] = 0;
          });
        });
        setCurrentImageIndex(initialImageState);
      })
      .catch((err) => {
        setError("Failed to load products");
        setLoading(false);
      });
  }, []);

  const navigateImage = (productId, variantId, direction) => {
    setCurrentImageIndex((prev) => {
      const key = `${productId}-${variantId}`;
      const variantImages =
        products
          .find((p) => p._id === productId)
          ?.variants.find((v) => v._id === variantId)?.images || {};
      const imagesCount = Object.values(variantImages).length;

      let newIndex;
      if (direction === "next") {
        newIndex = (prev[key] + 1) % imagesCount;
      } else {
        newIndex = (prev[key] - 1 + imagesCount) % imagesCount;
      }

      return {
        ...prev,
        [key]: newIndex,
      };
    });
  };

  const addToCart = async (product, variant) => {
    try {
      const payload = {
        productId: product._id,
        variantColor: variant.color,
        quantity: 1,
      };
      await cartService.addToCart(payload);
      await fetchCartCount();
      toast.success(`${product.name} (${variant.color}) added to cart!`);
    } catch (err) {
      toast.error(err.message || "Failed to add item to cart");
    }
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;
  if (!products || products.length === 0) return <p>No Products Available</p>;

  return (
    <div className={styles.container} id="products">
      {products.map((product) => (
        <div key={product._id} className={styles.card}>
          <h2 className={styles.name}>{product.name}</h2>
          <p className={styles.description}>{product.description}</p>
          <p className={styles.category}>Category: {product.category}</p>
          <p className={styles.price}>Base Price: ${product.basePrice}</p>

          <div className={styles.variants}>
            {product.variants.map((variant) => {
              const variantKey = `${product._id}-${variant._id}`;
              const images = Object.values(variant.images);
              const currentIndex = currentImageIndex[variantKey] || 0;
              const hasMultipleImages = images.length > 1;

              return (
                <div key={variant._id} className={styles.variant}>
                  <h4 className={styles.color}>Color: {variant.color}</h4>
                  <p>Price: ${variant.price}</p>
                  <p>Stock: {variant.stock}</p>

                  <div className={styles.imageContainer}>
                    {images.length > 0 && (
                      <>
                        <img
                          src={`http://localhost:3000/uploads/${images[currentIndex]}`}
                          alt={`${product.name}-${variant.color}`}
                          className={styles.mainImage}
                        />
                        {hasMultipleImages && (
                          <div className={styles.imageNavigation}>
                            <button
                              onClick={() =>
                                navigateImage(product._id, variant._id, "prev")
                              }
                              className={styles.navButton}
                            >
                              &lt;
                            </button>
                            <span className={styles.imageCounter}>
                              {currentIndex + 1}/{images.length}
                            </span>
                            <button
                              onClick={() =>
                                navigateImage(product._id, variant._id, "next")
                              }
                              className={styles.navButton}
                            >
                              &gt;
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  <button
                    onClick={() => addToCart(product, variant)}
                    className={styles.addToCartButton}
                    disabled={variant.stock <= 0}
                  >
                    {variant.stock > 0 ? "Add to Cart" : "Out of Stock"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
