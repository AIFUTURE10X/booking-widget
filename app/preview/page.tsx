"use client";

import { useState } from "react";
import { BookingWidget } from "@/components/widget/BookingWidget";
import { industryConfigs, getIndustryList } from "@/lib/configs";
import type { WidgetConfig } from "@/lib/types";

export default function PreviewPage() {
  const industries = getIndustryList();
  const [selectedIndustry, setSelectedIndustry] = useState("plumbing");
  const [businessName, setBusinessName] = useState("Demo Plumbing Co");
  const [phone, setPhone] = useState("0412 345 678");
  const [accentColor, setAccentColor] = useState("#0891b2");

  const industryConfig = industryConfigs[selectedIndustry];

  const widgetConfig: WidgetConfig = {
    configId: `preview-${selectedIndustry}`,
    businessName,
    phone,
    accentColor,
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Config panel */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <h1 className="text-2xl font-bold mb-1">Booking Widget Preview</h1>
          <p className="text-gray-500 text-sm mb-6">Configure and preview the widget for any industry</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Industry</label>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="mt-1 w-full h-10 rounded-lg border border-gray-300 px-3 text-sm"
              >
                {industries.map((ind) => (
                  <option key={ind.id} value={ind.id}>{ind.label}</option>
                ))}
              </select>
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
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">✓</span>
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
          <p className="text-gray-500 mb-4">This simulates how the widget appears on a client&apos;s website. Click the &quot;Book Online&quot; button in the bottom-left corner.</p>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
            Website content would be here
          </div>
        </div>

        {/* Embed code */}
        <div className="mt-8 bg-gray-900 rounded-xl p-6 text-white">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Embed Code</h3>
          <pre className="text-sm text-green-400 overflow-x-auto">
{`<script
  src="https://booking.yourdomain.com/widget.js"
  data-config="${selectedIndustry}"
  data-business="${businessName}"
  data-phone="${phone}"
  data-color="${accentColor}"
></script>`}
          </pre>
        </div>
      </div>

      {/* The actual widget */}
      {industryConfig && (
        <BookingWidget industry={industryConfig} widget={widgetConfig} />
      )}
    </div>
  );
}
