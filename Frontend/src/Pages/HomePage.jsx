import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Products from "../components/Product/Product";
import Services from "../components/Services/Service";
import Footer from "../components/Footer/Footer";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import Testimonials from "../components/Testimonial/Testimonial";

function HomePage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Products />
      <Services />
      <Testimonials />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default HomePage;
