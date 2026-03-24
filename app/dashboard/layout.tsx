"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Inbox, Settings, PlusCircle, Eye, CalendarCheck, BarChart3, Lock, LogOut, Cog } from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard/bookings", label: "Bookings", icon: Inbox },
  { href: "/dashboard/reservations", label: "Reservations", icon: CalendarCheck },
  { href: "/dashboard/stats", label: "Stats", icon: BarChart3 },
  { href: "/dashboard/widgets", label: "My Widgets", icon: Settings },
  { href: "/dashboard/onboarding", label: "New Widget", icon: PlusCircle },
  { href: "/dashboard/settings", label: "Settings", icon: Cog },
  { href: "/preview", label: "Preview", icon: Eye },
];

const AUTH_KEY = "bb_dashboard_auth";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = sessionStorage.getItem(AUTH_KEY);
    if (stored === "true") {
      setAuthenticated(true);
    }
    setChecking(false);
  }, []);

  async function handleLogin() {
    setError("");
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });
      if (res.ok) {
        sessionStorage.setItem(AUTH_KEY, "true");
        setAuthenticated(true);
      } else {
        setError("Invalid PIN. Try again.");
      }
    } catch {
      setError("Something went wrong.");
    }
  }

  function handleLogout() {
    sessionStorage.removeItem(AUTH_KEY);
    setAuthenticated(false);
    setPin("");
  }

  if (checking) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-cyan-600 border-t-transparent rounded-full animate-spin" />
    </div>;
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg border p-8 w-full max-w-sm">
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-full bg-cyan-50 flex items-center justify-center mx-auto mb-3">
              <Lock className="h-7 w-7 text-cyan-600" />
            </div>
            <h1 className="text-xl font-bold">Dashboard Login</h1>
            <p className="text-sm text-gray-500 mt-1">Enter your dashboard PIN to continue</p>
          </div>
          <div>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="Enter PIN"
              className="w-full h-12 rounded-lg border border-gray-300 px-4 text-center text-lg tracking-[0.3em] font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500"
              autoFocus
            />
            {error && <p className="text-sm text-red-500 text-center mt-2">{error}</p>}
            <button
              onClick={handleLogin}
              disabled={!pin}
              className="w-full mt-4 h-11 rounded-lg bg-cyan-600 text-white font-medium hover:bg-cyan-700 disabled:opacity-50 transition-colors"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r flex flex-col flex-shrink-0">
        <div className="px-5 py-5 border-b">
          <h1 className="text-lg font-bold text-gray-900">BookingWidget</h1>
          <p className="text-xs text-gray-500">Dashboard</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active ? "bg-cyan-50 text-cyan-700" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="px-3 pb-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors w-full"
          >
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
