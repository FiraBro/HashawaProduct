import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import AuthForm from "./components/Auth/AuthForm";
import Cart from "./Pages/CartPage";
import TrackOrder from "./Pages/TrackOrderPage";
import LoadingScreen from "./components/Loading/LoadingScreen";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <AuthForm /> },
  { path: "/cart", element: <Cart /> },
  { path: "/track", element: <TrackOrder /> },
]);

export default function App() {
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, 1800); // Slightly longer to allow smooth animation
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isAppLoading && <LoadingScreen />}
      {!isAppLoading && <RouterProvider router={router} />}
    </>
  );
}
