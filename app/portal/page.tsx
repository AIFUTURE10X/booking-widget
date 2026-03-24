"use client";

import { useState } from "react";
import { Phone, Mail, Clock, Check, X, Loader2, Search, Calendar, MapPin } from "lucide-react";

interface Booking {
  id: string;
  businessName: string;
  status: string;
  category: string;
  serviceType: string;
  specificService: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  submittedAt: string;
}

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  pending: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Pending" },
  confirmed: { bg: "bg-blue-100", text: "text-blue-800", label: "Confirmed" },
  completed: { bg: "bg-green-100", text: "text-green-800", label: "Completed" },
  cancelled: { bg: "bg-red-100", text: "text-red-800", label: "Cancelled" },
};

export default function PortalPage() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch() {
    if (!email && !phone) return;
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (email) params.set("email", email);
      if (phone) params.set("phone", phone);
      const res = await fetch(`/api/portal?${params}`);
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      } else {
        setError("Could not find bookings. Check your details and try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
    setSearched(true);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-sm text-gray-500 mt-1">Look up your booking history</p>
        </div>

        {/* Search form */}
        <div className="bg-white rounded-xl border p-6 mb-6">
          <h2 className="font-bold text-sm mb-4">Find your bookings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-500 flex items-center gap-1">
                <Mail className="h-3 w-3" /> Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                type="email"
                className="mt-1 w-full h-10 rounded-lg border border-gray-300 px-3 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 flex items-center gap-1">
                <Phone className="h-3 w-3" /> Phone
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0412 345 678"
                type="tel"
                className="mt-1 w-full h-10 rounded-lg border border-gray-300 px-3 text-sm"
              />
            </div>
          </div>
          <button
            onClick={handleSearch}
            disabled={loading || (!email && !phone)}
            className="mt-4 w-full h-10 rounded-lg bg-cyan-600 text-white text-sm font-medium flex items-center justify-center gap-2 hover:bg-cyan-700 disabled:opacity-50 transition-colors"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            {loading ? "Searching..." : "Find My Bookings"}
          </button>
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        </div>

        {/* Results */}
        {searched && !loading && (
          bookings.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <Calendar className="h-8 w-8 mx-auto mb-2" />
              <p className="font-medium">No bookings found</p>
              <p className="text-sm mt-1">Check your email or phone and try again</p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-gray-500">{bookings.length} booking{bookings.length !== 1 ? "s" : ""} found</p>
              {bookings.map((b) => {
                const st = STATUS_STYLES[b.status] || STATUS_STYLES.pending;
                return (
                  <div key={b.id} className="bg-white rounded-xl border p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-sm">{b.businessName}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${st.bg} ${st.text}`}>
                        {st.label}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <span className="px-2 py-0.5 rounded bg-gray-100 text-xs font-medium capitalize">
                        {b.category.replace(/-/g, " ")}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-gray-100 text-xs">{b.serviceType}</span>
                      <span className="px-2 py-0.5 rounded bg-cyan-50 text-cyan-700 text-xs font-medium">{b.specificService}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-gray-400" />
                        <span>{b.preferredDate}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-gray-400" />
                        <span>{b.preferredTime}</span>
                      </div>
                    </div>
                    {b.notes && (
                      <p className="mt-2 text-sm text-gray-500 italic">&quot;{b.notes}&quot;</p>
                    )}
                    <p className="mt-2 text-xs text-gray-400">{b.id}</p>
                  </div>
                );
              })}
            </div>
          )
        )}
      </div>
    </div>
  );
}
