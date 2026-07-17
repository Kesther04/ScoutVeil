// src/app/router.tsx
import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout";
import { AuthPage } from "../modules/auth";
import Home from "./Home";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/auth/login", element: <AuthPage /> },
      { path: "/auth/register", element: <AuthPage /> },
      { path: "/auth/forgot-password", element: <AuthPage /> },
      { path: "/auth/reset-password", element: <AuthPage /> },
      { path: "/auth/complete-profile", element: <AuthPage /> },
    ],
  },
]);