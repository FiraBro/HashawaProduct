import React, { useState } from "react";
import styles from "../About/About.module.css";

const About = () => {
  const [currentColor, setCurrentColor] = useState({
    color: "Classic Red",
    image: "shoe.jpg",
  });

  const handleHover = (color, image) => {
    setCurrentColor({ color, image });
  };

  return (
    <section className={styles.about} id="about">
      <h1>Available Colors</h1>
      <div className={styles.aboutContent}>
        <div className={styles.colorOptions}>
          <div onMouseOver={() => handleHover("Classic Red", "shoe.jpg")}>
            <img src="shoe-red-thumbnail.jpg" alt="Red" />
            <div>Classic Red</div>
          </div>
          <div onMouseOver={() => handleHover("Navy Blue", "shoe.jpg")}>
            <img src="shoe.jpg" alt="Blue" />
            <div>Navy Blue</div>
          </div>
        </div>
        <div className={styles.display}>
          <img src={currentColor.image} alt="Current" />
          <h2>{currentColor.color}</h2>
        </div>
      </div>
    </section>
  );
};

export default About;
