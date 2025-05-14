// import React, { useEffect, useState } from "react";
// import { productService } from "../../Service/productService"; // Import the productService
// import styles from "./Product.module.css";

// const Product = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null); // To handle errors
//   console.log(products);
//   useEffect(() => {
//     // Fetch products using the productService
//     productService
//       .getAllProducts()
//       .then((data) => {
//         setProducts(data); // Assuming the response structure is correct
//         setLoading(false); // Set loading to false once data is fetched
//       })
//       .catch((err) => {
//         console.error("Error fetching data:", err);
//         setError("Failed to load products"); // Set error message
//         setLoading(false); // Set loading to false even if there is an error
//       });
//   }, []);

//   if (loading) {
//     return <p>Loading products...</p>; // Show loading message while fetching data
//   }

//   if (error) {
//     return <p>{error}</p>; // Show error message if any error occurs
//   }

//   if (!products || products.length === 0) {
//     return <p>No Products Available</p>;
//   }

//   return (
//     <div className={styles.container}>
//       {products.map((product) => (
//         <div key={product._id} className={styles.card}>
//           <h2 className={styles.name}>{product.name}</h2>
//           <p className={styles.description}>{product.description}</p>
//           <p className={styles.category}>Category: {product.category}</p>
//           <p className={styles.price}>Base Price: ${product.basePrice}</p>

//           <div className={styles.variants}>
//             {product.variants.map((variant) => (
//               <div key={variant._id} className={styles.variant}>
//                 <h4 className={styles.color}>Color: {variant.color}</h4>
//                 <p>Price: ${variant.price}</p>
//                 <p>Stock: {variant.stock}</p>
//                 <div className={styles.images}>
//                   {Array.isArray(variant.variants)
//                     ? variant.variants.map((img, idx) => (
//                         // <img key={idx} src={img} alt={`variant-${idx}`} />
//                         <img
//                           key={idx}
//                           src={`http://localhost:3000/uploads/${img}`}
//                           alt={`variant-${idx}`}
//                           crossOrigin="anonymous"
//                         />
//                       ))
//                     : Object.values(variant.images).map((img, idx) => (
//                         <img key={idx} src={img} alt={`variant-${idx}`} />
//                       ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Product;

import React, { useEffect, useState } from "react";
import { productService } from "../../Service/productService"; // Import the productService
import styles from "./Product.module.css";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // To handle errors
  console.log(products);

  useEffect(() => {
    // Fetch products using the productService
    productService
      .getAllProducts()
      .then((data) => {
        setProducts(data); // Assuming the response structure is correct
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("Failed to load products"); // Set error message
        setLoading(false); // Set loading to false even if there is an error
      });
  }, []);

  if (loading) {
    return <p>Loading products...</p>; // Show loading message while fetching data
  }

  if (error) {
    return <p>{error}</p>; // Show error message if any error occurs
  }

  if (!products || products.length === 0) {
    return <p>No Products Available</p>;
  }

  return (
    <div className={styles.container}>
      {products.map((product) => (
        <div key={product._id} className={styles.card}>
          <h2 className={styles.name}>{product.name}</h2>
          <p className={styles.description}>{product.description}</p>
          <p className={styles.category}>Category: {product.category}</p>
          <p className={styles.price}>Base Price: ${product.basePrice}</p>

          <div className={styles.variants}>
            {product.variants.map((variant) => (
              <div key={variant._id} className={styles.variant}>
                <h4 className={styles.color}>Color: {variant.color}</h4>
                <p>Price: ${variant.price}</p>
                <p>Stock: {variant.stock}</p>
                <div className={styles.images}>
                  {/* Handle images */}
                  {Object.values(variant.images).map((img, idx) => (
                    <img
                      key={idx}
                      src={`http://localhost:3000/uploads/${img}`}
                      alt={`variant-${idx}`}
                      crossOrigin="anonymous"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
