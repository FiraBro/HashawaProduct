import React, { createContext, useContext, useEffect, useState } from "react";
import { cartService } from "../../Service/cartService";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const { data } = await cartService.getCart();
      const total = data.cart.reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(total);
    } catch (err) {
      console.error("Failed to fetch cart count:", err);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      await cartService.addToCart(productId, quantity);
      fetchCartCount(); // update count after adding
    } catch (err) {
      console.error("Add to cart failed", err);
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, fetchCartCount, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
