"use client";

import { useEffect, useState } from "react";
import { Phone, Mail, MapPin, Clock, Check, X, Loader2 } from "lucide-react";
import type { BookingSubmission } from "@/lib/types";

type Booking = BookingSubmission & { id: string };

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  pending: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Pending" },
  confirmed: { bg: "bg-blue-100", text: "text-blue-800", label: "Confirmed" },
  completed: { bg: "bg-green-100", text: "text-green-800", label: "Completed" },
  cancelled: { bg: "bg-red-100", text: "text-red-800", label: "Cancelled" },
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetch("/api/bookings")
      .then((r) => r.json())
      .then(setBookings)
      .finally(() => setLoading(false));
  }, []);

  async function updateStatus(id: string, status: string) {
    await fetch("/api/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: status as BookingSubmission["status"] } : b))
    );
  }

  const filtered = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Bookings Inbox</h1>
          <p className="text-sm text-gray-500">{bookings.length} total bookings</p>
        </div>
        <div className="flex gap-2">
          {["all", "pending", "confirmed", "completed", "cancelled"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${
                filter === s ? "bg-cyan-600 text-white" : "bg-white border text-gray-600 hover:bg-gray-50"
              }`}
            >
              {s} {s !== "all" && `(${bookings.filter((b) => b.status === s).length})`}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg font-medium">No bookings yet</p>
          <p className="text-sm mt-1">Bookings from your widget will appear here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((booking) => {
            const st = STATUS_STYLES[booking.status] || STATUS_STYLES.pending;
            return (
              <div key={booking.id} className="bg-white rounded-xl border p-5 hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-base">{booking.firstName} {booking.lastName}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${st.bg} ${st.text}`}>
                        {st.label}
                      </span>
                      <span className="text-xs text-gray-400">{booking.id}</span>
                    </div>

                    {/* Service */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <span className="px-2 py-0.5 rounded bg-gray-100 text-xs font-medium capitalize">
                        {booking.category.replace(/-/g, " ")}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-gray-100 text-xs">{booking.serviceType}</span>
                      <span className="px-2 py-0.5 rounded bg-cyan-50 text-cyan-700 text-xs font-medium">{booking.specificService}</span>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-600">
                      <div className="flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5 text-gray-400" />
                        <a href={`tel:${booking.phone}`} className="hover:text-cyan-600">{booking.phone}</a>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 text-gray-400" />
                        <a href={`mailto:${booking.email}`} className="hover:text-cyan-600 truncate">{booking.email}</a>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-gray-400" />
                        <span>{booking.preferredDate} {booking.preferredTime}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-gray-400" />
                        <span className="truncate">{booking.city}, {booking.state} {booking.postcode}</span>
                      </div>
                    </div>

                    {booking.notes && (
                      <p className="mt-2 text-sm text-gray-500 italic">&quot;{booking.notes}&quot;</p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-1.5 ml-4 flex-shrink-0">
                    {booking.status === "pending" && (
                      <>
                        <button
                          onClick={() => updateStatus(booking.id, "confirmed")}
                          className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                          title="Confirm"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => updateStatus(booking.id, "cancelled")}
                          className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                          title="Cancel"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </>
                    )}
                    {booking.status === "confirmed" && (
                      <button
                        onClick={() => updateStatus(booking.id, "completed")}
                        className="px-3 py-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 text-xs font-medium transition-colors"
                      >
                        Mark Complete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
