// import React from 'react';
// import styles from '../Product/Product.module.css';

// const Product = () => (
//   <section className={styles.products} id="products">
//     <h1>Products</h1>
//     <div className={styles.cardsContainer}>
//       <div className={styles.card}>
//         <img src="shoe.jpg" alt="Shoe" className={styles.productImage} />
//         <div className={styles.cardContent}>
//           <h2>Classic Sneaker</h2>
//           <p>$49.99</p>
//           <button className={styles.addToCartBtn}>Add to Cart</button>
//         </div>
//       </div>
//       <div className={styles.card}>
//         <img src="shoe.jpg" alt="Running Shoe" className={styles.productImage} />
//         <div className={styles.cardContent}>
//           <h2>Running Shoe</h2>
//           <p>$59.99</p>
//           <button className={styles.addToCartBtn}>Add to Cart</button>
//         </div>
//       </div>
//     </div>
//   </section>
// );

// export default Product;

import React, { useEffect, useState } from "react";
import styles from "../Product/Product.module.css";
import { productService } from "../../Service/productService"; // Adjust path as needed

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const x = productService
      .getAllProducts()
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err.message));
      console.log(x)
  }, []);

  return (
    <section className={styles.products} id="products">
      <h1>Products</h1>
      <div className={styles.cardsContainer}>
        {products.map((product) =>
          product.variants.map((variant, index) => (
            <div key={`${product._id}-${index}`} className={styles.card}>
              <img
                src={`http://localhost:5000/uploads/${variant.images.front}`}
                alt={product.name}
                className={styles.productImage}
              />
              <div className={styles.cardContent}>
                <h2>
                  {product.name} - {variant.color}
                </h2>
                <p>${variant.price}</p>
                <button className={styles.addToCartBtn}>Add to Cart</button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Product;
