import React, { useEffect, useState } from "react";
import styles from "../ScrollToTop/ScrollToTop.module.css";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(window.pageYOffset > 100);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    visible && (
      <button onClick={scrollToTop} className={styles.scrollTopBtn}>
        ↑
      </button>
    )
  );
};

export default ScrollToTop;
