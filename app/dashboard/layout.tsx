"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Inbox, Settings, PlusCircle, Eye } from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard/bookings", label: "Bookings", icon: Inbox },
  { href: "/dashboard/widgets", label: "My Widgets", icon: Settings },
  { href: "/dashboard/onboarding", label: "New Widget", icon: PlusCircle },
  { href: "/preview", label: "Preview", icon: Eye },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

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
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
