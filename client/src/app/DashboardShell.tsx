import { useState } from "react";
import type { ReactElement } from "react";
import { NavLink, Outlet, useLocation, useMatches } from "react-router-dom";
import {
  LayoutGrid,
  Users,
  Radar,
  Fingerprint,
  Sparkles,
  Bell,
  Search,
  Plus,
  ChevronDown,
} from "lucide-react";
import Logo from "../shared/components/Logo";

/* ------------------------------------------------------------------ */
/*  DashboardShell                                                      */
/*  Shared chrome for every authenticated ScoutVeil screen: top bar    */
/*  plus left sidebar. Rendered once at the /app route level, pages    */
/*  render into it through an Outlet, so Dashboard, Competitors,       */
/*  Signal Monitor, OSINT, Digest and Alerts never rebuild the frame.  */
/*                                                                      */
/*  Page title and subtitle come from each route's handle rather than  */
/*  props, so the shell has no knowledge of which page is active,      */
/*  it just reads whatever the matched route declares.                 */
/*                                                                      */
/*  Same dark, amber accent language as the marketing site: void bg,   */
/*  signal amber, paper text, ghost secondary text. No grid texture    */
/*  here, this is a working surface, not the hero.                     */
/* ------------------------------------------------------------------ */

type NavItem = {
  label: string;
  to: string;
  icon: typeof LayoutGrid;
};

const primaryNav: NavItem[] = [
  { label: "Dashboard", to: "/app", icon: LayoutGrid },
  { label: "Competitors", to: "/app/competitors", icon: Users },
  { label: "Signal Monitor", to: "/app/signals", icon: Radar },
  { label: "OSINT", to: "/app/osint", icon: Fingerprint },
  { label: "AI Digest", to: "/app/digest", icon: Sparkles },
  { label: "Alerts", to: "/app/alerts", icon: Bell },
];

/* Fallback titles keyed by pathname, used when a route has no handle.
   Add an entry here whenever a new top level page is wired up without
   a route handle yet. */
const fallbackTitles: Record<string, { title: string; subtitle?: string }> = {
  "/app": {
    title: "Dashboard",
    subtitle: "Overview across all tracked competitors",
  },
  "/app/competitors": {
    title: "Competitors",
    subtitle: "Every domain you are currently tracking",
  },
  "/app/signals": {
    title: "Signal Monitor",
    subtitle: "Website, hiring and public activity, in one feed",
  },
  "/app/osint": {
    title: "OSINT",
    subtitle: "Subdomains, DNS and infrastructure history",
  },
  "/app/digest": {
    title: "AI Digest",
    subtitle: "This week's changes, explained in plain language",
  },
  "/app/alerts": {
    title: "Alerts",
    subtitle: "Real time notifications and delivery preferences",
  },
};

/* A route can opt into a custom heading with:
   { path: "...", handle: { title: "...", subtitle: "..." } } */
type RouteHandle = { title?: string; subtitle?: string };

function usePageHeading() {
  const location = useLocation();
  const matches = useMatches();

  const withHandle = [...matches]
    .reverse()
    .find((m) => (m.handle as RouteHandle | undefined)?.title);

  if (withHandle) {
    const handle = withHandle.handle as RouteHandle;
    return { title: handle.title ?? "", subtitle: handle.subtitle };
  }

  return (
    fallbackTitles[location.pathname] ?? {
      title: "ScoutVeil",
      subtitle: undefined,
    }
  );
}

/* ------------------------------- Sidebar ------------------------------- */

function Sidebar() {
  return (
    <aside className="hidden lg:flex lg:flex-col w-64 shrink-0 border-r border-white/5 bg-[#0B0D14] h-screen sticky top-0">
      <div className="h-18 flex items-center px-6 border-b border-white/5">
        <Logo />
      </div>

      <div className="px-4 pt-5">
        <button className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#E8A64A] hover:bg-[#F0B96B] transition-colors text-[#0B0D14] text-sm font-medium px-4 py-2.5">
          <Plus className="w-4 h-4" />
          Add competitor
        </button>
      </div>

      <nav className="flex-1 px-3 pt-6 space-y-1">
        {primaryNav.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/app"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  isActive
                    ? "bg-[#E8A64A]/10 text-[#F0B96B]"
                    : "text-[#94A3B8] hover:text-[#E4E2ED] hover:bg-white/4"
                }`
              }
            >
              <Icon className="w-4 h-4" strokeWidth={1.75} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="px-4 pb-5 pt-4 border-t border-white/5">
        <div className="rounded-xl border border-white/10 bg-white/2 px-4 py-3">
          <p className="text-xs font-medium text-[#E4E2ED] mb-1">Public sources only</p>
          <p className="text-[11px] text-[#94A3B8] leading-relaxed">
            Passive recon, no active scanning.
          </p>
        </div>
      </div>
    </aside>
  );
}

/* -------------------------------- Topbar -------------------------------- */

function Topbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { title, subtitle } = usePageHeading();

  return (
    <header className="sticky top-0 z-30 h-18 flex items-center gap-6 border-b border-white/5 bg-[#0B0D14]/90 backdrop-blur-md px-6">
      <div className="min-w-0">
        <h1 className="text-lg font-medium text-[#E4E2ED] truncate">{title}</h1>
        {subtitle && (
          <p className="text-xs text-[#94A3B8] truncate">{subtitle}</p>
        )}
      </div>

      <div className="flex-1 max-w-md relative hidden md:block">
        <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search competitors, signals, domains"
          className="w-full bg-white/4 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm text-[#E4E2ED] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#E8A64A]/40"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        <button
          aria-label="Notifications"
          className="relative w-9 h-9 rounded-lg border border-white/10 bg-white/2 hover:bg-white/5 transition-colors flex items-center justify-center"
        >
          <Bell className="w-4 h-4 text-[#94A3B8]" strokeWidth={1.75} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#E8A64A]" />
        </button>

        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/2 hover:bg-white/5 transition-colors pl-1 pr-2 py-1"
          >
            <div className="w-7 h-7 rounded-full bg-[#E8A64A]/15 flex items-center justify-center text-xs font-medium text-[#F0B96B]">
              KO
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8]" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg border border-white/10 bg-[#12141D] shadow-xl py-1">
              <a
                href="/app/settings"
                className="block px-3 py-2 text-sm text-[#E4E2ED] hover:bg-white/5"
              >
                Settings
              </a>
              <a
                href="/app/billing"
                className="block px-3 py-2 text-sm text-[#E4E2ED] hover:bg-white/5"
              >
                Billing
              </a>
              <div className="my-1 border-t border-white/5" />
              <a
                href="/auth/login"
                className="block px-3 py-2 text-sm text-[#E85A4A] hover:bg-white/5"
              >
                Log out
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

/* -------------------------------- Shell -------------------------------- */

export default function DashboardShell(): ReactElement {
  return (
    <div className="min-h-screen bg-[#0B0D14] flex">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar />
        <main className="flex-1 px-6 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}