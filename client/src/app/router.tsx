// src/app/router.tsx
import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout";
import { AuthPage } from "../modules/auth";
import Home from "./Home";
import Fallback from "./FallBack";
import DashboardShell from "./DashboardShell";

const comingSoonPaths = ["/terms", "/privacy"];

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
      ...comingSoonPaths.map((path) => ({ path, element: <Fallback /> })),
    ],
  },
  {
    element: <DashboardShell />,
    children: [
      {
        path: "/app",
        element: <div>Dashboard</div>,
        handle: {
          title: "Dashboard",
          subtitle: "Overview across all tracked competitors",
        },
      },
      {
        path: "/app/competitors",
        element: <div>Competitors</div>,
        handle: {
          title: "Competitors",
          subtitle: "Every domain you are currently tracking",
        },
      },
      {
        path: "/app/competitors/:competitorId",
        element: <div>Competitor details</div>,
        handle: {
          title: "Competitor details",
        },
      },
      {
        path: "/app/signals",
        element: <div>Signal Monitor</div>,
        handle: {
          title: "Signal Monitor",
          subtitle: "Website, hiring and public activity, in one feed",
        },
      },
      {
        path: "/app/signals/history",
        element: <div>Change history</div>,
        handle: {
          title: "Change history",
          subtitle: "Full timestamped evidence log",
        },
      },
      {
        path: "/app/osint",
        element: <div>OSINT</div>,
        handle: {
          title: "OSINT",
          subtitle: "Subdomains, DNS and infrastructure history",
        },
      },
      {
        path: "/app/digest",
        element: <div>AI Digest</div>,
        handle: {
          title: "AI Digest",
          subtitle: "This week's changes, explained in plain language",
        },
      },
      {
        path: "/app/alerts",
        element: <div>Alerts</div>,
        handle: {
          title: "Alerts",
          subtitle: "Real time notifications and delivery preferences",
        },
      },
      {
        path: "/app/settings",
        element: <div>Settings</div>,
        handle: {
          title: "Settings",
        },
      },
      {
        path: "/app/billing",
        element: <div>Billing</div>,
        handle: {
          title: "Billing",
        },
      },
    ],
  },
]);