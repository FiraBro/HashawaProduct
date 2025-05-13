import React from 'react';
import styles from '../Product/Product.module.css';

const Product = () => (
  <section className={styles.products} id="products">
    <h1>Products</h1>
    <div className={styles.cardsContainer}>
      <div className={styles.card}>
        <img src="shoe.jpg" alt="Shoe" className={styles.productImage} />
        <div className={styles.cardContent}>
          <h2>Classic Sneaker</h2>
          <p>$49.99</p>
          <button className={styles.addToCartBtn}>Add to Cart</button>
        </div>
      </div>
      <div className={styles.card}>
        <img src="shoe.jpg" alt="Running Shoe" className={styles.productImage} />
        <div className={styles.cardContent}>
          <h2>Running Shoe</h2>
          <p>$59.99</p>
          <button className={styles.addToCartBtn}>Add to Cart</button>
        </div>
      </div>
    </div>
  </section>
);

export default Product;