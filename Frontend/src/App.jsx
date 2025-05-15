import React from "react";
import HomePage from "./Pages/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthForm from "./components/Auth/AuthForm";

// 1. Define your routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path:'/login',
    element:<AuthForm />
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}
