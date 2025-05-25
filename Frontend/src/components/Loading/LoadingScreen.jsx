import React from "react";
import styles from "./LoadingScreen.module.css";

export default function LoadingScreen() {
  return (
    <div className={styles.overlay}>
      <div className={styles.loaderWrapper}>
        <div className={styles.spinner}></div>
        <h1 className={styles.brandText}>YoyoBrand</h1>
      </div>
    </div>
  );
}
