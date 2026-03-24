"use client";

import { useEffect, useState } from "react";
import { Loader2, TrendingUp, Calendar, Users, DollarSign, BarChart3 } from "lucide-react";

interface WidgetStats {
  configId: string;
  businessName: string;
  accentColor: string;
  total: number;
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
}

interface ReservationStats {
  configId: string;
  businessName: string;
  accentColor: string;
  total: number;
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
}

export default function StatsPage() {
  const [bookingStats, setBookingStats] = useState<WidgetStats[]>([]);
  const [reservationStats, setReservationStats] = useState<ReservationStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/stats/bookings").then((r) => r.json()).catch(() => []),
      fetch("/api/stats/reservations").then((r) => r.json()).catch(() => []),
    ]).then(([bookings, reservations]) => {
      setBookingStats(bookings);
      setReservationStats(reservations);
    }).finally(() => setLoading(false));
  }, []);

  const totalBookings = bookingStats.reduce((sum, w) => sum + w.total, 0);
  const totalReservations = reservationStats.reduce((sum, r) => sum + r.total, 0);
  const totalCompleted = bookingStats.reduce((sum, w) => sum + w.completed, 0) + reservationStats.reduce((sum, r) => sum + r.completed, 0);
  const totalPending = bookingStats.reduce((sum, w) => sum + w.pending, 0) + reservationStats.reduce((sum, r) => sum + r.pending, 0);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Stats & Analytics</h1>
        <p className="text-sm text-gray-500">Booking and reservation stats per client</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        </div>
      ) : (
        <>
          {/* Overview cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl border p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-cyan-50 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-cyan-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalBookings}</p>
                  <p className="text-xs text-gray-500">Service Bookings</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalReservations}</p>
                  <p className="text-xs text-gray-500">Reservations</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalCompleted}</p>
                  <p className="text-xs text-gray-500">Completed</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalPending}</p>
                  <p className="text-xs text-gray-500">Pending</p>
                </div>
              </div>
            </div>
          </div>

          {/* Per-client service booking stats */}
          {bookingStats.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-cyan-600" /> Service Bookings by Client
              </h2>
              <div className="bg-white rounded-xl border overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left px-5 py-3 font-semibold text-gray-600">Client</th>
                      <th className="text-center px-3 py-3 font-semibold text-gray-600">Total</th>
                      <th className="text-center px-3 py-3 font-semibold text-yellow-600">Pending</th>
                      <th className="text-center px-3 py-3 font-semibold text-blue-600">Confirmed</th>
                      <th className="text-center px-3 py-3 font-semibold text-green-600">Completed</th>
                      <th className="text-center px-3 py-3 font-semibold text-red-600">Cancelled</th>
                      <th className="text-center px-3 py-3 font-semibold text-gray-600">Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookingStats.map((w) => {
                      const rate = w.total > 0 ? Math.round((w.completed / w.total) * 100) : 0;
                      return (
                        <tr key={w.configId} className="border-b last:border-0 hover:bg-gray-50">
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: w.accentColor }} />
                              <span className="font-medium">{w.businessName}</span>
                            </div>
                          </td>
                          <td className="text-center px-3 py-3 font-bold">{w.total}</td>
                          <td className="text-center px-3 py-3">
                            {w.pending > 0 && <span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 text-xs">{w.pending}</span>}
                          </td>
                          <td className="text-center px-3 py-3">
                            {w.confirmed > 0 && <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs">{w.confirmed}</span>}
                          </td>
                          <td className="text-center px-3 py-3">
                            {w.completed > 0 && <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-800 text-xs">{w.completed}</span>}
                          </td>
                          <td className="text-center px-3 py-3">
                            {w.cancelled > 0 && <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-800 text-xs">{w.cancelled}</span>}
                          </td>
                          <td className="text-center px-3 py-3">
                            <span className={`text-xs font-semibold ${rate >= 50 ? "text-green-600" : rate >= 25 ? "text-amber-600" : "text-gray-400"}`}>
                              {rate}%
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Per-client reservation stats */}
          {reservationStats.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-purple-600" /> Reservations by Client
              </h2>
              <div className="bg-white rounded-xl border overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left px-5 py-3 font-semibold text-gray-600">Client</th>
                      <th className="text-center px-3 py-3 font-semibold text-gray-600">Total</th>
                      <th className="text-center px-3 py-3 font-semibold text-yellow-600">Pending</th>
                      <th className="text-center px-3 py-3 font-semibold text-blue-600">Confirmed</th>
                      <th className="text-center px-3 py-3 font-semibold text-green-600">Completed</th>
                      <th className="text-center px-3 py-3 font-semibold text-red-600">Cancelled</th>
                      <th className="text-center px-3 py-3 font-semibold text-gray-600">Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservationStats.map((r) => {
                      const rate = r.total > 0 ? Math.round((r.completed / r.total) * 100) : 0;
                      return (
                        <tr key={r.configId} className="border-b last:border-0 hover:bg-gray-50">
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: r.accentColor }} />
                              <span className="font-medium">{r.businessName}</span>
                            </div>
                          </td>
                          <td className="text-center px-3 py-3 font-bold">{r.total}</td>
                          <td className="text-center px-3 py-3">
                            {r.pending > 0 && <span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 text-xs">{r.pending}</span>}
                          </td>
                          <td className="text-center px-3 py-3">
                            {r.confirmed > 0 && <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs">{r.confirmed}</span>}
                          </td>
                          <td className="text-center px-3 py-3">
                            {r.completed > 0 && <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-800 text-xs">{r.completed}</span>}
                          </td>
                          <td className="text-center px-3 py-3">
                            {r.cancelled > 0 && <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-800 text-xs">{r.cancelled}</span>}
                          </td>
                          <td className="text-center px-3 py-3">
                            <span className={`text-xs font-semibold ${rate >= 50 ? "text-green-600" : rate >= 25 ? "text-amber-600" : "text-gray-400"}`}>
                              {rate}%
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Revenue tracking placeholder */}
          <div>
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" /> Revenue Tracking
            </h2>
            <div className="bg-white rounded-xl border p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-3">
                <DollarSign className="h-7 w-7 text-green-400" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Coming with Stripe Integration</h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto">
                Revenue tracking will be available once payment integration is set up. You&apos;ll see per-client revenue, monthly totals, and growth trends.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
