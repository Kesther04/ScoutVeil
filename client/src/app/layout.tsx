// src/app/RootLayout.tsx
import { Outlet } from "react-router-dom";
import { AuthProvider } from "../modules/auth";

export default function Layout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}