import React from "react";
import HomePage from "./Pages/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthForm from "./components/Auth/AuthForm";
import Cart from "./Pages/CartPage";
import TrackOrder from "./Pages/TrackOrderPage";

// 1. Define your routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path:'/login',
    element:<AuthForm />
  },
  {
    path:'/cart',
    element:<Cart />
  },{
    path:'/track',
    element:<TrackOrder />
  }

]);

export default function App() {
  return <RouterProvider router={router} />;
}
