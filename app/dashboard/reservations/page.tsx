"use client";

import { useEffect, useState } from "react";
import { Phone, Mail, Clock, Check, X, Loader2, Users, Calendar, MapPin } from "lucide-react";

interface Reservation {
  id: string;
  widgetConfigId: string;
  businessName: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  facility: string;
  activity: string;
  date: string;
  timeSlot: string;
  duration: number;
  groupSize: number;
  notes?: string;
  submittedAt: string;
}

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  pending: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Pending" },
  confirmed: { bg: "bg-blue-100", text: "text-blue-800", label: "Confirmed" },
  completed: { bg: "bg-green-100", text: "text-green-800", label: "Completed" },
  cancelled: { bg: "bg-red-100", text: "text-red-800", label: "Cancelled" },
};

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetch("/api/reservations")
      .then((r) => r.json())
      .then(setReservations)
      .finally(() => setLoading(false));
  }, []);

  async function updateStatus(id: string, status: string) {
    await fetch("/api/reservations", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: status as Reservation["status"] } : r))
    );
  }

  const filtered = filter === "all" ? reservations : reservations.filter((r) => r.status === filter);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Reservations</h1>
          <p className="text-sm text-gray-500">{reservations.length} total reservations</p>
        </div>
        <div className="flex gap-2">
          {["all", "pending", "confirmed", "completed", "cancelled"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${
                filter === s ? "bg-purple-600 text-white" : "bg-white border text-gray-600 hover:bg-gray-50"
              }`}
            >
              {s} {s !== "all" && `(${reservations.filter((r) => r.status === s).length})`}
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
          <p className="text-lg font-medium">No reservations yet</p>
          <p className="text-sm mt-1">Reservations from your widget will appear here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((res) => {
            const st = STATUS_STYLES[res.status] || STATUS_STYLES.pending;
            return (
              <div key={res.id} className="bg-white rounded-xl border p-5 hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-base">{res.firstName} {res.lastName}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${st.bg} ${st.text}`}>
                        {st.label}
                      </span>
                      <span className="text-xs text-gray-400">{res.id}</span>
                    </div>

                    {/* Reservation details */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 text-xs font-medium">
                        {res.facility}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-gray-100 text-xs font-medium">{res.activity}</span>
                      <span className="px-2 py-0.5 rounded bg-gray-100 text-xs">{res.duration} min</span>
                      {res.groupSize > 1 && (
                        <span className="px-2 py-0.5 rounded bg-gray-100 text-xs flex items-center gap-1">
                          <Users className="h-3 w-3" /> {res.groupSize}
                        </span>
                      )}
                    </div>

                    {/* Details grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-600">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-gray-400" />
                        <span>{res.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-gray-400" />
                        <span>{res.timeSlot}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5 text-gray-400" />
                        <a href={`tel:${res.phone}`} className="hover:text-purple-600">{res.phone}</a>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 text-gray-400" />
                        <a href={`mailto:${res.email}`} className="hover:text-purple-600 truncate">{res.email}</a>
                      </div>
                    </div>

                    {res.notes && (
                      <p className="mt-2 text-sm text-gray-500 italic">&quot;{res.notes}&quot;</p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-1.5 ml-4 flex-shrink-0">
                    {res.status === "pending" && (
                      <>
                        <button
                          onClick={() => updateStatus(res.id, "confirmed")}
                          className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                          title="Confirm"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => updateStatus(res.id, "cancelled")}
                          className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                          title="Cancel"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </>
                    )}
                    {res.status === "confirmed" && (
                      <button
                        onClick={() => updateStatus(res.id, "completed")}
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
