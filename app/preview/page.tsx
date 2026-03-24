"use client";

import { useState } from "react";
import { BookingWidget } from "@/components/widget/BookingWidget";
import { ReservationWidget } from "@/components/widget/ReservationWidget";
import { industryConfigs, getIndustryList } from "@/lib/configs";
import { venueConfigs, getVenueList } from "@/lib/configs/venues";
import type { WidgetConfig, ReservationWidgetConfig } from "@/lib/types";
import { Wrench, Calendar } from "lucide-react";

export default function PreviewPage() {
  const industries = getIndustryList();
  const venues = getVenueList();

  const [widgetType, setWidgetType] = useState<"service" | "reservation">("service");
  const [selectedIndustry, setSelectedIndustry] = useState("plumbing");
  const [selectedVenue, setSelectedVenue] = useState("tennis");
  const [businessName, setBusinessName] = useState("Demo Plumbing Co");
  const [phone, setPhone] = useState("0412 345 678");
  const [accentColor, setAccentColor] = useState("#0891b2");

  const industryConfig = industryConfigs[selectedIndustry];
  const venueConfig = venueConfigs[selectedVenue];

  const serviceWidgetConfig: WidgetConfig = {
    configId: `preview-${selectedIndustry}`,
    businessName,
    phone,
    accentColor,
  };

  const reservationWidgetConfig: ReservationWidgetConfig = {
    configId: `preview-${selectedVenue}`,
    businessName,
    phone,
    accentColor,
  };

  function handleTypeChange(type: "service" | "reservation") {
    setWidgetType(type);
    if (type === "reservation") {
      setAccentColor("#8b5cf6");
      setBusinessName("Demo Sports Centre");
    } else {
      setAccentColor("#0891b2");
      setBusinessName("Demo Plumbing Co");
    }
  }

  const embedCode = widgetType === "service"
    ? `<script
  src="https://bookbutton.io/widget.js"
  data-config="${selectedIndustry}"
  data-business="${businessName}"
  data-phone="${phone}"
  data-color="${accentColor}"
></script>`
    : `<script
  src="https://bookbutton.io/widget.js"
  data-type="reservation"
  data-config="${selectedVenue}"
  data-business="${businessName}"
  data-phone="${phone}"
  data-color="${accentColor}"
></script>`;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Config panel */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <h1 className="text-2xl font-bold mb-1">Widget Preview</h1>
          <p className="text-gray-500 text-sm mb-6">Configure and preview both service booking and reservation widgets</p>

          {/* Type toggle */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => handleTypeChange("service")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                widgetType === "service"
                  ? "bg-cyan-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Wrench className="h-4 w-4" /> Service Booking
            </button>
            <button
              onClick={() => handleTypeChange("reservation")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                widgetType === "reservation"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Calendar className="h-4 w-4" /> Reservation Booking
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                {widgetType === "service" ? "Industry" : "Venue Type"}
              </label>
              {widgetType === "service" ? (
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="mt-1 w-full h-10 rounded-lg border border-gray-300 px-3 text-sm"
                >
                  {industries.map((ind) => (
                    <option key={ind.id} value={ind.id}>{ind.label}</option>
                  ))}
                </select>
              ) : (
                <select
                  value={selectedVenue}
                  onChange={(e) => setSelectedVenue(e.target.value)}
                  className="mt-1 w-full h-10 rounded-lg border border-gray-300 px-3 text-sm"
                >
                  {venues.map((v) => (
                    <option key={v.id} value={v.id}>{v.label}</option>
                  ))}
                </select>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Business Name</label>
              <input
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="mt-1 w-full h-10 rounded-lg border border-gray-300 px-3 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Phone</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 w-full h-10 rounded-lg border border-gray-300 px-3 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Brand Color</label>
              <div className="flex gap-2 mt-2 flex-wrap">
                {[
                  { color: "#0891b2", name: "Teal" },
                  { color: "#2563eb", name: "Blue" },
                  { color: "#16a34a", name: "Green" },
                  { color: "#dc2626", name: "Red" },
                  { color: "#ea580c", name: "Orange" },
                  { color: "#7c3aed", name: "Purple" },
                  { color: "#db2777", name: "Pink" },
                  { color: "#ca8a04", name: "Gold" },
                  { color: "#0f172a", name: "Navy" },
                  { color: "#374151", name: "Slate" },
                ].map((c) => (
                  <button
                    key={c.color}
                    onClick={() => setAccentColor(c.color)}
                    className="group relative w-9 h-9 rounded-lg border-2 transition-all hover:scale-110"
                    style={{
                      background: c.color,
                      borderColor: accentColor === c.color ? "white" : "transparent",
                      boxShadow: accentColor === c.color ? `0 0 0 2px ${c.color}` : "none",
                    }}
                    title={c.name}
                  >
                    {accentColor === c.color && (
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">&#10003;</span>
                    )}
                  </button>
                ))}
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="w-9 h-9 rounded-lg border border-gray-300 cursor-pointer"
                  title="Custom color"
                />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-5 h-5 rounded" style={{ background: accentColor }} />
                <span className="text-xs text-gray-400 font-mono">{accentColor}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview area */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-sm border p-8">
          <h2 className="text-xl font-bold mb-2">Your Website</h2>
          <p className="text-gray-500 mb-4">
            This simulates how the widget appears on a client&apos;s website. Click the
            {widgetType === "service" ? ' "Book Online"' : ' "Book a Court"'} button in the bottom-right corner.
          </p>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
            Website content would be here
          </div>
        </div>

        {/* Embed code */}
        <div className="mt-8 bg-gray-900 rounded-xl p-6 text-white">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Embed Code</h3>
          <pre className="text-sm text-green-400 overflow-x-auto whitespace-pre-wrap">{embedCode}</pre>
        </div>
      </div>

      {/* The actual widget */}
      {widgetType === "service" && industryConfig && (
        <BookingWidget industry={industryConfig} widget={serviceWidgetConfig} />
      )}
      {widgetType === "reservation" && venueConfig && (
        <ReservationWidget venue={venueConfig} widget={reservationWidgetConfig} />
      )}
    </div>
  );
}
