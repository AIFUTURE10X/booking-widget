"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronRight, Copy, Palette, Wrench, Calendar } from "lucide-react";
import { industryConfigs, getIndustryList } from "@/lib/configs";
import { venueConfigs, getVenueList } from "@/lib/configs/venues";
import type { WidgetConfig, ReservationWidgetConfig } from "@/lib/types";

const SERVICE_STEPS = ["Type", "Industry", "Business Info", "Services", "Embed Code"];
const VENUE_STEPS = ["Type", "Venue", "Business Info", "Facilities", "Embed Code"];

const INDUSTRY_META: Record<string, { emoji: string; color: string; bg: string }> = {
  plumbing:        { emoji: "\uD83D\uDEB0", color: "#0891b2", bg: "#ecfeff" },
  "pest-control":  { emoji: "\uD83D\uDC1C", color: "#dc2626", bg: "#fef2f2" },
  hvac:            { emoji: "\u2744\uFE0F",  color: "#2563eb", bg: "#eff6ff" },
  locksmith:       { emoji: "\uD83D\uDD10", color: "#ca8a04", bg: "#fefce8" },
  cleaning:        { emoji: "\u2728",        color: "#0d9488", bg: "#f0fdfa" },
  landscaping:     { emoji: "\uD83C\uDF3F", color: "#16a34a", bg: "#f0fdf4" },
  electrical:      { emoji: "\u26A1",        color: "#f59e0b", bg: "#fffbeb" },
  roofing:         { emoji: "\uD83C\uDFE0", color: "#ea580c", bg: "#fff7ed" },
  painting:        { emoji: "\uD83C\uDFA8", color: "#7c3aed", bg: "#f5f3ff" },
  fencing:         { emoji: "\uD83D\uDEA7", color: "#64748b", bg: "#f8fafc" },
  handyman:        { emoji: "\uD83D\uDD27", color: "#0369a1", bg: "#f0f9ff" },
  "garage-doors":  { emoji: "\uD83D\uDCE6", color: "#78716c", bg: "#fafaf9" },
  "pool-service":  { emoji: "\uD83D\uDEBF", color: "#06b6d4", bg: "#ecfeff" },
  solar:           { emoji: "\u2600\uFE0F",  color: "#eab308", bg: "#fefce8" },
  security:        { emoji: "\uD83D\uDD12", color: "#4f46e5", bg: "#eef2ff" },
  removalists:     { emoji: "\uD83D\uDE9A", color: "#b45309", bg: "#fffbeb" },
  towing:          { emoji: "\uD83D\uDE8C", color: "#be123c", bg: "#fff1f2" },
  dental:          { emoji: "\uD83E\uDDB7", color: "#0891b2", bg: "#ecfeff" },
  "beauty-salon":  { emoji: "\uD83D\uDC87", color: "#db2777", bg: "#fdf2f8" },
  "real-estate":      { emoji: "\uD83C\uDFE2", color: "#059669", bg: "#ecfdf5" },
  "carpet-cleaning":  { emoji: "\uD83E\uDDF9", color: "#7c3aed", bg: "#f5f3ff" },
  "window-cleaning":  { emoji: "\uD83E\uDE9F", color: "#0284c7", bg: "#f0f9ff" },
  "tree-services":    { emoji: "\uD83E\uDE93", color: "#15803d", bg: "#f0fdf4" },
  concreting:         { emoji: "\uD83E\uDDF1", color: "#78716c", bg: "#fafaf9" },
  tiling:             { emoji: "\u2B1C",        color: "#0891b2", bg: "#ecfeff" },
  plastering:         { emoji: "\uD83C\uDFE0", color: "#a16207", bg: "#fefce8" },
  "skip-bins":        { emoji: "\uD83D\uDDD1\uFE0F", color: "#16a34a", bg: "#f0fdf4" },
  glazier:            { emoji: "\uD83E\uDE9E", color: "#2563eb", bg: "#eff6ff" },
  "appliance-repair": { emoji: "\uD83D\uDD0C", color: "#ea580c", bg: "#fff7ed" },
  "pet-grooming":     { emoji: "\uD83D\uDC36", color: "#db2777", bg: "#fdf2f8" },
};

const PRESET_COLORS = [
  "#0891b2", "#2563eb", "#7c3aed", "#db2777",
  "#ea580c", "#16a34a", "#ca8a04", "#dc2626",
];

export default function OnboardingPage() {
  const router = useRouter();
  const industries = getIndustryList();
  const venues = getVenueList();

  // Widget type: "service" or "venue"
  const [widgetType, setWidgetType] = useState<"" | "service" | "venue">("");

  const [step, setStep] = useState(0);
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedVenue, setSelectedVenue] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [phone, setPhone] = useState("");
  const [notifyEmail, setNotifyEmail] = useState("");
  const [accentColor, setAccentColor] = useState("#0891b2");

  // Service booking state
  const [enabledCategories, setEnabledCategories] = useState<string[]>([]);
  const [enabledServices, setEnabledServices] = useState<Record<string, Record<string, string[]>>>({});

  // Venue booking state
  const [enabledFacilities, setEnabledFacilities] = useState<string[]>([]);
  const [enabledActivities, setEnabledActivities] = useState<string[]>([]);

  const [saving, setSaving] = useState(false);
  const [savedConfigId, setSavedConfigId] = useState("");
  const [copied, setCopied] = useState(false);

  const industryConfig = selectedIndustry ? industryConfigs[selectedIndustry] : null;
  const venueConfig = selectedVenue ? venueConfigs[selectedVenue] : null;

  const steps = widgetType === "venue" ? VENUE_STEPS : SERVICE_STEPS;
  const accentTheme = widgetType === "venue" ? "#7c3aed" : "#0891b2";

  // ─── Service booking helpers ───────────────────────────────────

  function toggleCategory(catId: string) {
    setEnabledCategories((prev) =>
      prev.includes(catId) ? prev.filter((c) => c !== catId) : [...prev, catId]
    );
  }

  function toggleService(catId: string, serviceType: string, service: string) {
    setEnabledServices((prev) => {
      const copy = { ...prev };
      if (!copy[catId]) copy[catId] = {};
      if (!copy[catId][serviceType]) copy[catId][serviceType] = [];

      const arr = copy[catId][serviceType];
      if (arr.includes(service)) {
        copy[catId][serviceType] = arr.filter((s) => s !== service);
      } else {
        copy[catId][serviceType] = [...arr, service];
      }
      return copy;
    });
  }

  function selectAllServices(catId: string) {
    if (!industryConfig) return;
    const catServices = industryConfig.services[catId];
    if (!catServices) return;
    setEnabledServices((prev) => ({
      ...prev,
      [catId]: { ...catServices },
    }));
  }

  function isServiceEnabled(catId: string, serviceType: string, service: string): boolean {
    return enabledServices[catId]?.[serviceType]?.includes(service) || false;
  }

  function handleSelectIndustry(id: string) {
    setSelectedIndustry(id);
    const config = industryConfigs[id];
    if (config) {
      setEnabledCategories(config.categories.map((c) => c.id));
      setEnabledServices({ ...config.services });
    }
  }

  // ─── Venue booking helpers ─────────────────────────────────────

  function handleSelectVenue(id: string) {
    setSelectedVenue(id);
    setAccentColor("#7c3aed");
    const config = venueConfigs[id];
    if (config) {
      setEnabledFacilities(config.facilities.map((f) => f.id));
      setEnabledActivities([...config.activities]);
    }
  }

  function toggleFacility(facId: string) {
    setEnabledFacilities((prev) =>
      prev.includes(facId) ? prev.filter((f) => f !== facId) : [...prev, facId]
    );
  }

  function toggleActivity(act: string) {
    setEnabledActivities((prev) =>
      prev.includes(act) ? prev.filter((a) => a !== act) : [...prev, act]
    );
  }

  // ─── Save ──────────────────────────────────────────────────────

  async function handleSave() {
    setSaving(true);
    const configId = `w-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

    if (widgetType === "service") {
      const widget: WidgetConfig = {
        configId,
        industryId: selectedIndustry,
        businessName,
        phone,
        accentColor,
        notifyEmail: notifyEmail || undefined,
        enabledCategories: enabledCategories.length > 0 ? enabledCategories : undefined,
      };

      await fetch("/api/widgets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(widget),
      });
    } else {
      const widget: ReservationWidgetConfig = {
        configId,
        venueTypeId: selectedVenue,
        businessName,
        phone,
        accentColor,
        notifyEmail: notifyEmail || undefined,
        enabledFacilities: enabledFacilities.length > 0 ? enabledFacilities : undefined,
        enabledActivities: enabledActivities.length > 0 ? enabledActivities : undefined,
      };

      await fetch("/api/venue-widgets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(widget),
      });
    }

    setSavedConfigId(configId);
    setSaving(false);
    setStep(4);
  }

  // ─── Embed code ────────────────────────────────────────────────

  const embedCode = widgetType === "service"
    ? `<script
  src="https://bookbutton.io/widget.js"
  data-config="${selectedIndustry}"
  data-widget-id="${savedConfigId}"
  data-business="${businessName}"
  data-phone="${phone}"
  data-color="${accentColor}"
></script>`
    : `<script
  src="https://bookbutton.io/widget.js"
  data-type="reservation"
  data-config="${selectedVenue}"
  data-widget-id="${savedConfigId}"
  data-business="${businessName}"
  data-phone="${phone}"
  data-color="${accentColor}"
></script>`;

  function copyEmbed() {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-1">Create New Widget</h1>
      <p className="text-sm text-gray-500 mb-8">Set up a booking widget for a new client in a few steps</p>

      {/* Step indicator */}
      {widgetType && (
        <div className="flex items-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  i <= step ? "text-white" : "bg-gray-200 text-gray-500"
                }`}
                style={i <= step ? { background: accentTheme } : undefined}
              >
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className={`text-sm font-medium ${i === step ? "text-gray-900" : "text-gray-400"}`}>{s}</span>
              {i < steps.length - 1 && <ChevronRight className="h-4 w-4 text-gray-300" />}
            </div>
          ))}
        </div>
      )}

      {/* Step 0: Widget type */}
      {step === 0 && (
        <div>
          <h2 className="text-lg font-bold mb-4">What type of widget?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => { setWidgetType("service"); setStep(1); }}
              className={`p-6 rounded-xl border-2 text-left transition-all hover:shadow-md ${
                widgetType === "service" ? "border-cyan-600 bg-cyan-50" : "border-gray-200 hover:border-cyan-300"
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center mb-3">
                <Wrench className="h-6 w-6 text-cyan-600" />
              </div>
              <p className="font-bold text-base">Service Booking</p>
              <p className="text-sm text-gray-500 mt-1">&quot;Someone comes to fix something&quot;</p>
              <p className="text-xs text-gray-400 mt-2">Plumbing, electrical, cleaning, pest control, HVAC, and 16 more trades</p>
            </button>

            <button
              onClick={() => { setWidgetType("venue"); setStep(1); }}
              className={`p-6 rounded-xl border-2 text-left transition-all hover:shadow-md ${
                widgetType === "venue" ? "border-purple-600 bg-purple-50" : "border-gray-200 hover:border-purple-300"
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-3">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <p className="font-bold text-base">Reservation Booking</p>
              <p className="text-sm text-gray-500 mt-1">&quot;I&apos;m booking a time &amp; place&quot;</p>
              <p className="text-xs text-gray-400 mt-2">Courts, studios, function rooms, salons, equipment rental, and more</p>
            </button>
          </div>
        </div>
      )}

      {/* Step 1: Industry or Venue selection */}
      {step === 1 && widgetType === "service" && (
        <div>
          <h2 className="text-lg font-bold mb-4">What industry is this client in?</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {industries.map((ind) => {
              const selected = selectedIndustry === ind.id;
              const meta = INDUSTRY_META[ind.id];
              return (
                <button
                  key={ind.id}
                  onClick={() => handleSelectIndustry(ind.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${
                    selected ? "border-cyan-600 bg-cyan-50" : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                  }`}
                >
                  {meta && (
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-xl"
                      style={{ background: meta.bg }}
                    >
                      {meta.emoji}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-sm">{ind.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5 capitalize">{ind.industry.replace(/-/g, " ")}</p>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="mt-6 flex gap-3">
            <button onClick={() => { setStep(0); setWidgetType(""); }} className="px-4 py-2.5 rounded-lg border text-sm font-medium text-gray-700">
              Back
            </button>
            <button
              onClick={() => setStep(2)}
              disabled={!selectedIndustry}
              className="px-6 py-2.5 rounded-lg text-white text-sm font-medium disabled:opacity-50 hover:opacity-90 transition-colors"
              style={{ background: accentTheme }}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {step === 1 && widgetType === "venue" && (
        <div>
          <h2 className="text-lg font-bold mb-4">What type of venue?</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {venues.map((v) => {
              const selected = selectedVenue === v.id;
              const config = venueConfigs[v.id];
              const emoji = config?.facilities[0]?.emoji || "";
              return (
                <button
                  key={v.id}
                  onClick={() => handleSelectVenue(v.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    selected ? "border-purple-600 bg-purple-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{emoji}</span>
                    <div>
                      <p className="font-semibold text-sm">{v.label}</p>
                      <p className="text-xs text-gray-500 capitalize">{v.venueType.replace(/-/g, " ")}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="mt-6 flex gap-3">
            <button onClick={() => { setStep(0); setWidgetType(""); }} className="px-4 py-2.5 rounded-lg border text-sm font-medium text-gray-700">
              Back
            </button>
            <button
              onClick={() => setStep(2)}
              disabled={!selectedVenue}
              className="px-6 py-2.5 rounded-lg text-white text-sm font-medium disabled:opacity-50 hover:opacity-90 transition-colors"
              style={{ background: accentTheme }}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Business info (shared) */}
      {step === 2 && (
        <div>
          <h2 className="text-lg font-bold mb-4">Client business details</h2>
          <div className="space-y-4 max-w-md">
            <div>
              <label className="text-sm font-medium text-gray-700">Business Name *</label>
              <input
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder={widgetType === "venue" ? "e.g. City Sports Centre" : "e.g. Smith's Plumbing"}
                className="mt-1 w-full h-10 rounded-lg border border-gray-300 px-3 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Phone Number *</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 0412 345 678"
                type="tel"
                className="mt-1 w-full h-10 rounded-lg border border-gray-300 px-3 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Notification Email</label>
              <input
                value={notifyEmail}
                onChange={(e) => setNotifyEmail(e.target.value)}
                placeholder={widgetType === "venue" ? "e.g. bookings@citysports.com.au" : "e.g. jobs@smithsplumbing.com.au"}
                type="email"
                className="mt-1 w-full h-10 rounded-lg border border-gray-300 px-3 text-sm"
              />
              <p className="text-xs text-gray-400 mt-1">
                {widgetType === "venue" ? "Reservation" : "Booking"} notifications will be sent here
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                <Palette className="h-4 w-4" /> Brand Color
              </label>
              <div className="flex gap-2 mt-2">
                {PRESET_COLORS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setAccentColor(c)}
                    className="w-8 h-8 rounded-full border-2 transition-all"
                    style={{
                      background: c,
                      borderColor: accentColor === c ? "#1f2937" : "transparent",
                    }}
                  />
                ))}
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="w-8 h-8 rounded-full border cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <button onClick={() => setStep(1)} className="px-4 py-2.5 rounded-lg border text-sm font-medium text-gray-700">
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={!businessName || !phone}
              className="px-6 py-2.5 rounded-lg text-white text-sm font-medium disabled:opacity-50 hover:opacity-90 transition-colors"
              style={{ background: accentTheme }}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Services (service booking) */}
      {step === 3 && widgetType === "service" && industryConfig && (
        <div>
          <h2 className="text-lg font-bold mb-1">What services does {businessName} offer?</h2>
          <p className="text-sm text-gray-500 mb-4">Uncheck any services they don&apos;t provide. Only checked services will show in the widget.</p>

          <div className="space-y-6">
            {industryConfig.categories.map((cat) => {
              const catEnabled = enabledCategories.includes(cat.id);
              const catServices = industryConfig.services[cat.id] || {};

              return (
                <div key={cat.id} className="bg-white rounded-xl border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={catEnabled}
                        onChange={() => toggleCategory(cat.id)}
                        className="w-4 h-4 rounded"
                        style={{ accentColor: "#0891b2" }}
                      />
                      <span className="text-lg">{cat.emoji}</span>
                      <span className="font-bold text-sm">{cat.label.replace("\n", " ")}</span>
                    </label>
                    {catEnabled && (
                      <button
                        onClick={() => selectAllServices(cat.id)}
                        className="text-xs text-cyan-600 hover:underline"
                      >
                        Select all
                      </button>
                    )}
                  </div>

                  {catEnabled && Object.entries(catServices).map(([serviceType, services]) => (
                    <div key={serviceType} className="ml-7 mb-3">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">{serviceType}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {services.map((service) => {
                          const enabled = isServiceEnabled(cat.id, serviceType, service);
                          return (
                            <button
                              key={service}
                              onClick={() => toggleService(cat.id, serviceType, service)}
                              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all border ${
                                enabled
                                  ? "bg-cyan-50 border-cyan-300 text-cyan-700"
                                  : "bg-gray-50 border-gray-200 text-gray-400 line-through"
                              }`}
                            >
                              {service}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex gap-3">
            <button onClick={() => setStep(2)} className="px-4 py-2.5 rounded-lg border text-sm font-medium text-gray-700">
              Back
            </button>
            <button
              onClick={handleSave}
              disabled={saving || enabledCategories.length === 0}
              className="px-6 py-2.5 rounded-lg text-white text-sm font-medium disabled:opacity-50 hover:opacity-90 transition-colors"
              style={{ background: accentTheme }}
            >
              {saving ? "Creating..." : "Create Widget"}
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Facilities & Activities (venue booking) */}
      {step === 3 && widgetType === "venue" && venueConfig && (
        <div>
          <h2 className="text-lg font-bold mb-1">Configure {businessName}&apos;s facilities</h2>
          <p className="text-sm text-gray-500 mb-4">Uncheck any facilities or activities that don&apos;t apply.</p>

          <div className="space-y-6">
            {/* Facilities */}
            <div className="bg-white rounded-xl border p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-sm">Facilities / Spaces</h3>
                <button
                  onClick={() => setEnabledFacilities(venueConfig.facilities.map((f) => f.id))}
                  className="text-xs text-purple-600 hover:underline"
                >
                  Select all
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {venueConfig.facilities.map((fac) => {
                  const enabled = enabledFacilities.includes(fac.id);
                  return (
                    <label
                      key={fac.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                        enabled ? "border-purple-300 bg-purple-50" : "border-gray-200"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={enabled}
                        onChange={() => toggleFacility(fac.id)}
                        className="w-4 h-4 rounded"
                        style={{ accentColor: "#7c3aed" }}
                      />
                      <span className="text-lg">{fac.emoji}</span>
                      <div>
                        <p className="font-semibold text-sm">{fac.label}</p>
                        {fac.description && <p className="text-xs text-gray-500">{fac.description}</p>}
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Activities */}
            <div className="bg-white rounded-xl border p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-sm">Activities / Services</h3>
                <button
                  onClick={() => setEnabledActivities([...venueConfig.activities])}
                  className="text-xs text-purple-600 hover:underline"
                >
                  Select all
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {venueConfig.activities.map((act) => {
                  const enabled = enabledActivities.includes(act);
                  return (
                    <button
                      key={act}
                      onClick={() => toggleActivity(act)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                        enabled
                          ? "bg-purple-50 border-purple-300 text-purple-700"
                          : "bg-gray-50 border-gray-200 text-gray-400 line-through"
                      }`}
                    >
                      {act}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Operating hours (read-only info) */}
            <div className="bg-white rounded-xl border p-4">
              <h3 className="font-bold text-sm mb-2">Operating Hours</h3>
              <p className="text-sm text-gray-600">
                {venueConfig.operatingHours.open} — {venueConfig.operatingHours.close} &middot; {venueConfig.slotInterval}-min slots &middot; Max group size: {venueConfig.maxGroupSize}
              </p>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button onClick={() => setStep(2)} className="px-4 py-2.5 rounded-lg border text-sm font-medium text-gray-700">
              Back
            </button>
            <button
              onClick={handleSave}
              disabled={saving || enabledFacilities.length === 0}
              className="px-6 py-2.5 rounded-lg text-white text-sm font-medium disabled:opacity-50 hover:opacity-90 transition-colors"
              style={{ background: accentTheme }}
            >
              {saving ? "Creating..." : "Create Widget"}
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Embed code (shared) */}
      {step === 4 && (
        <div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6">
            <div className="flex items-center gap-2 mb-1">
              <Check className="h-5 w-5 text-green-600" />
              <h2 className="text-lg font-bold text-green-800">Widget Created!</h2>
            </div>
            <p className="text-sm text-green-700">
              The {widgetType === "venue" ? "reservation" : "booking"} widget for <strong>{businessName}</strong> is ready. Add the embed code below to their website.
            </p>
          </div>

          <div className="bg-gray-900 rounded-xl p-5 relative">
            <button
              onClick={copyEmbed}
              className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs font-medium hover:bg-white/20 transition-colors"
            >
              <Copy className="h-3.5 w-3.5" />
              {copied ? "Copied!" : "Copy"}
            </button>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">Embed Code</p>
            <pre className="text-sm text-green-400 whitespace-pre-wrap">{embedCode}</pre>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => router.push("/dashboard/widgets")}
              className="px-6 py-2.5 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-colors"
              style={{ background: accentTheme }}
            >
              View My Widgets
            </button>
            <button
              onClick={() => router.push("/preview")}
              className="px-4 py-2.5 rounded-lg border text-sm font-medium text-gray-700"
            >
              Preview Widget
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
