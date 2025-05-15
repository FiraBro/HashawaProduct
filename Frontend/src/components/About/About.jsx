// import React, { useState } from "react";
// import styles from "../About/About.module.css";

// const About = () => {
//   const colorOptions = [
//     {
//       name: "Classic Red",
//       image: "/images/shoe-red.jpg",
//       colorCode: "#E53935",
//       description: "Vibrant red for a bold statement",
//     },
//     {
//       name: "Navy Blue",
//       image: "/images/shoe-blue.jpg",
//       colorCode: "#1A237E",
//       description: "Sophisticated navy for timeless style",
//     },
//     {
//       name: "Charcoal Black",
//       image: "/images/shoe-black.jpg",
//       colorCode: "#212121",
//       description: "Sleek black for versatile pairing",
//     },
//     {
//       name: "Cream White",
//       image: "/images/shoe-white.jpg",
//       colorCode: "#FAFAFA",
//       description: "Clean white for fresh looks",
//     },
//   ];

//   const [currentSelection, setCurrentSelection] = useState(colorOptions[0]);
//   const [activeIndex, setActiveIndex] = useState(0);

//   const handleSelection = (option, index) => {
//     setCurrentSelection(option);
//     setActiveIndex(index);
//   };

//   return (
//     <section className={styles.about} id="about">
//       <div className={styles.sectionHeader}>
//         <h2 className={styles.sectionTitle}>Available Colors</h2>
//         <p className={styles.sectionSubtitle}>Find your perfect match</p>
//       </div>

//       <div className={styles.colorSelector}>
//         <div className={styles.colorDisplay}>
//           <div className={styles.mainImageContainer}>
//             <img
//               src={currentSelection.image}
//               alt={currentSelection.name}
//               className={styles.mainImage}
//             />
//             <div
//               className={styles.colorBadge}
//               style={{ backgroundColor: currentSelection.colorCode }}
//             >
//               {currentSelection.name}
//             </div>
//           </div>
//           <div className={styles.colorInfo}>
//             <h3 className={styles.colorName}>{currentSelection.name}</h3>
//             <p className={styles.colorDescription}>
//               {currentSelection.description}
//             </p>
//             <div className={styles.colorSwatches}>
//               {colorOptions.map((option, index) => (
//                 <button
//                   key={index}
//                   className={`${styles.swatch} ${
//                     activeIndex === index ? styles.active : ""
//                   }`}
//                   style={{ backgroundColor: option.colorCode }}
//                   onClick={() => handleSelection(option, index)}
//                   aria-label={`Select ${option.name} color`}
//                 >
//                   {activeIndex === index && (
//                     <span className={styles.checkmark}>✓</span>
//                   )}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className={styles.colorOptions}>
//           {colorOptions.map((option, index) => (
//             <div
//               key={index}
//               className={`${styles.optionCard} ${
//                 activeIndex === index ? styles.activeCard : ""
//               }`}
//               onClick={() => handleSelection(option, index)}
//               onMouseEnter={() => handleSelection(option, index)}
//             >
//               <div className={styles.optionImageContainer}>
//                 <img
//                   src={option.image}
//                   alt={option.name}
//                   className={styles.optionImage}
//                 />
//               </div>
//               <div className={styles.optionDetails}>
//                 <h4>{option.name}</h4>
//                 <div
//                   className={styles.colorSample}
//                   style={{ backgroundColor: option.colorCode }}
//                 ></div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default About;

import React, { useState, useEffect } from "react";
import styles from "../About/About.module.css";
import { fetchColorOptions } from "../../services/api";

const About = () => {
  const [colorOptions, setColorOptions] = useState([]);
  const [currentSelection, setCurrentSelection] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadColorOptions = async () => {
      try {
        const options = await fetchColorOptions();
        setColorOptions(options);
        if (options.length > 0) {
          setCurrentSelection(options[0]);
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadColorOptions();
  }, []);

  const handleSelection = (option, index) => {
    setCurrentSelection(option);
    setActiveIndex(index);
  };

  if (loading) {
    return (
      <section className={styles.about} id="about">
        <div className={styles.loading}>Loading color options...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.about} id="about">
        <div className={styles.error}>Error: {error}</div>
      </section>
    );
  }

  if (!colorOptions.length) {
    return (
      <section className={styles.about} id="about">
        <div className={styles.empty}>No color options available</div>
      </section>
    );
  }

  return (
    <section className={styles.about} id="about">
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Available Colors</h2>
        <p className={styles.sectionSubtitle}>Find your perfect match</p>
      </div>

      <div className={styles.colorSelector}>
        <div className={styles.colorDisplay}>
          <div className={styles.mainImageContainer}>
            <img
              src={currentSelection.image}
              alt={currentSelection.name}
              className={styles.mainImage}
            />
            <div className={styles.colorBadge} style={{ backgroundColor: currentSelection.colorCode }}>
              {currentSelection.name}
            </div>
          </div>
          <div className={styles.colorInfo}>
            <h3 className={styles.colorName}>{currentSelection.name}</h3>
            <p className={styles.colorDescription}>{currentSelection.description}</p>
            <div className={styles.colorSwatches}>
              {colorOptions.map((option, index) => (
                <button
                  key={option.id || index}
                  className={`${styles.swatch} ${activeIndex === index ? styles.active : ''}`}
                  style={{ backgroundColor: option.colorCode }}
                  onClick={() => handleSelection(option, index)}
                  aria-label={`Select ${option.name} color`}
                >
                  {activeIndex === index && (
                    <span className={styles.checkmark}>✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.colorOptions}>
          {colorOptions.map((option, index) => (
            <div
              key={option.id || index}
              className={`${styles.optionCard} ${activeIndex === index ? styles.activeCard : ''}`}
              onClick={() => handleSelection(option, index)}
              onMouseEnter={() => handleSelection(option, index)}
            >
              <div className={styles.optionImageContainer}>
                <img
                  src={option.image}
                  alt={option.name}
                  className={styles.optionImage}
                />
              </div>
              <div className={styles.optionDetails}>
                <h4>{option.name}</h4>
                <div
                  className={styles.colorSample}
                  style={{ backgroundColor: option.colorCode }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
