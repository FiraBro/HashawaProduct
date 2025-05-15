// import React from "react";
// import styles from "../Services/Service.module.css";
// // import { FaTruck, FaRefresh, FaHeadset } from 'react-icons/fa';

// import { FaTruck, FaSync, FaHeadset } from "react-icons/fa";

// const Service = () => (
//   <section className={styles.services} id="service">
//     <h1>Our Services</h1>
//     <div className={styles.serviceContainer}>
//       <div className={styles.serviceBox}>
//         <FaTruck />
//         <h2>Free Shipping</h2>
//         <p>Enjoy free shipping on all orders over $50!</p>
//       </div>
//       <div className={styles.serviceBox}>
//         <FaSync />
//         <h2>Easy Returns</h2>
//         <p>Hassle-free returns within 30 days of purchase.</p>
//       </div>
//       <div className={styles.serviceBox}>
//         <FaHeadset />
//         <h2>24/7 Support</h2>
//         <p>Our customer support team is here to help you anytime.</p>
//       </div>
//     </div>
//   </section>
// );

// export default Service;

import React from "react";
import styles from "../Services/Service.module.css";
import { FaTruck, FaSync, FaHeadset, FaShieldAlt } from "react-icons/fa";

const Service = () => (
  <section className={styles.services} id="service">
    <div className={styles.sectionHeader}>
      <h2 className={styles.sectionTitle}>Premium Services</h2>
      <p className={styles.sectionSubtitle}>
        Enhancing your shopping experience
      </p>
    </div>

    <div className={styles.serviceContainer}>
      <div className={styles.serviceBox}>
        <div className={styles.iconContainer}>
          <FaTruck className={styles.serviceIcon} />
        </div>
        <h3 className={styles.serviceTitle}>Free & Fast Shipping</h3>
        <p className={styles.serviceDescription}>
          Free express delivery on all orders over $50. Receive your order
          within 2-3 business days.
        </p>
      </div>

      <div className={styles.serviceBox}>
        <div className={styles.iconContainer}>
          <FaSync className={styles.serviceIcon} />
        </div>
        <h3 className={styles.serviceTitle}>Hassle-Free Returns</h3>
        <p className={styles.serviceDescription}>
          30-day return policy. No questions asked. We make returns simple and
          convenient.
        </p>
      </div>

      <div className={styles.serviceBox}>
        <div className={styles.iconContainer}>
          <FaHeadset className={styles.serviceIcon} />
        </div>
        <h3 className={styles.serviceTitle}>Dedicated Support</h3>
        <p className={styles.serviceDescription}>
          Our expert team is available 24/7 to assist you with any questions or
          concerns.
        </p>
      </div>

      <div className={styles.serviceBox}>
        <div className={styles.iconContainer}>
          <FaShieldAlt className={styles.serviceIcon} />
        </div>
        <h3 className={styles.serviceTitle}>Secure Payments</h3>
        <p className={styles.serviceDescription}>
          Your transactions are 100% secure with our advanced encryption
          technology.
        </p>
      </div>
    </div>
  </section>
);

export default Service;
