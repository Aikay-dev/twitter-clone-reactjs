import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import App from "./App";
import Authentication from "./pages/auth/Authentication";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate replace to="/Home" />,
    errorElement: <ErrorPage />
  },
  {
    path: "/Home",
    element: <App />
  },
  {
    path: "/Login",
    element: <Authentication />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
