// src/app/router.tsx
import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout";
import { AuthPage } from "../modules/auth";
import Home from "./Home";
import Fallback from "./FallBack";
import DashboardShell from "./DashboardShell";
import { DashboardPage } from "../modules/dashboard";
import { CompetitorsPage, CompetitorDetailsPage } from "../modules/competitors";
import { SignalMonitorPage, ChangeHistoryPage } from "../modules/signal-monitor";

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
        {
          element: <DashboardShell />,
          children: [
            {
              path: "/app",
              element: <DashboardPage />,
              handle: { title: "Dashboard", subtitle: "Overview across all tracked competitors" },
            },
            {
              path: "/app/competitors",
              element: <CompetitorsPage />,
              handle: { title: "Competitors", subtitle: "Every domain you are currently tracking" },
            },
            {
              path: "/app/competitors/:competitorId",
              element: <CompetitorDetailsPage />,
              handle: { title: "Competitor details" },
            },
            {
              path: "/app/signals",
              element: <SignalMonitorPage />,
              handle: { title: "Signal Monitor", subtitle: "Website, hiring and public activity, in one feed" },
            },
            {
              path: "/app/signals/history",
              element: <ChangeHistoryPage />,
              handle: { title: "Change history", subtitle: "Full timestamped evidence log" },
            },
            // OSINT / digest / alerts / settings / billing unchanged for now
            // ...
          ],
        },
    ],
  },

]);