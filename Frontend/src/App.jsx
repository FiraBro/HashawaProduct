import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Products from "./components/Product/Product";
import About from "./components/About/About";
import Services from "./components/Services/Service";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
// import styles from "./App.module.css";

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Products />
      <About />
      <Services />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
