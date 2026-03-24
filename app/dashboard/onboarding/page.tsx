"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronRight, Copy, Palette } from "lucide-react";
import { industryConfigs, getIndustryList } from "@/lib/configs";
import type { WidgetConfig } from "@/lib/types";

const STEPS = ["Industry", "Business Info", "Services", "Embed Code"];

const PRESET_COLORS = [
  "#0891b2", "#2563eb", "#7c3aed", "#db2777",
  "#ea580c", "#16a34a", "#ca8a04", "#dc2626",
];

export default function OnboardingPage() {
  const router = useRouter();
  const industries = getIndustryList();

  const [step, setStep] = useState(0);
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [phone, setPhone] = useState("");
  const [notifyEmail, setNotifyEmail] = useState("");
  const [accentColor, setAccentColor] = useState("#0891b2");
  const [enabledCategories, setEnabledCategories] = useState<string[]>([]);
  const [enabledServices, setEnabledServices] = useState<Record<string, Record<string, string[]>>>({});
  const [saving, setSaving] = useState(false);
  const [savedConfigId, setSavedConfigId] = useState("");
  const [copied, setCopied] = useState(false);

  const industryConfig = selectedIndustry ? industryConfigs[selectedIndustry] : null;

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

  // When selecting industry, pre-enable all categories and services
  function handleSelectIndustry(id: string) {
    setSelectedIndustry(id);
    const config = industryConfigs[id];
    if (config) {
      setEnabledCategories(config.categories.map((c) => c.id));
      setEnabledServices({ ...config.services });
    }
  }

  async function handleSave() {
    setSaving(true);
    const configId = `w-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

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

    setSavedConfigId(configId);
    setSaving(false);
    setStep(3);
  }

  const embedCode = `<script
  src="https://booking.yourdomain.com/widget.js"
  data-config="${selectedIndustry}"
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
      <div className="flex items-center gap-2 mb-8">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                i < step ? "bg-cyan-600 text-white" :
                i === step ? "bg-cyan-600 text-white" :
                "bg-gray-200 text-gray-500"
              }`}
            >
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span className={`text-sm font-medium ${i === step ? "text-gray-900" : "text-gray-400"}`}>{s}</span>
            {i < STEPS.length - 1 && <ChevronRight className="h-4 w-4 text-gray-300" />}
          </div>
        ))}
      </div>

      {/* Step 1: Industry */}
      {step === 0 && (
        <div>
          <h2 className="text-lg font-bold mb-4">What industry is this client in?</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {industries.map((ind) => {
              const selected = selectedIndustry === ind.id;
              return (
                <button
                  key={ind.id}
                  onClick={() => handleSelectIndustry(ind.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    selected ? "border-cyan-600 bg-cyan-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <p className="font-semibold text-sm">{ind.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5 capitalize">{ind.industry.replace(/-/g, " ")}</p>
                </button>
              );
            })}
          </div>
          <div className="mt-6">
            <button
              onClick={() => setStep(1)}
              disabled={!selectedIndustry}
              className="px-6 py-2.5 rounded-lg bg-cyan-600 text-white text-sm font-medium disabled:opacity-50 hover:bg-cyan-700 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Business info */}
      {step === 1 && (
        <div>
          <h2 className="text-lg font-bold mb-4">Client business details</h2>
          <div className="space-y-4 max-w-md">
            <div>
              <label className="text-sm font-medium text-gray-700">Business Name *</label>
              <input
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. Smith's Plumbing"
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
                placeholder="e.g. jobs@smithsplumbing.com.au"
                type="email"
                className="mt-1 w-full h-10 rounded-lg border border-gray-300 px-3 text-sm"
              />
              <p className="text-xs text-gray-400 mt-1">Booking notifications will be sent here</p>
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
            <button onClick={() => setStep(0)} className="px-4 py-2.5 rounded-lg border text-sm font-medium text-gray-700">
              Back
            </button>
            <button
              onClick={() => setStep(2)}
              disabled={!businessName || !phone}
              className="px-6 py-2.5 rounded-lg bg-cyan-600 text-white text-sm font-medium disabled:opacity-50 hover:bg-cyan-700 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Services */}
      {step === 2 && industryConfig && (
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
            <button onClick={() => setStep(1)} className="px-4 py-2.5 rounded-lg border text-sm font-medium text-gray-700">
              Back
            </button>
            <button
              onClick={handleSave}
              disabled={saving || enabledCategories.length === 0}
              className="px-6 py-2.5 rounded-lg bg-cyan-600 text-white text-sm font-medium disabled:opacity-50 hover:bg-cyan-700 transition-colors"
            >
              {saving ? "Creating..." : "Create Widget"}
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Embed code */}
      {step === 3 && (
        <div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6">
            <div className="flex items-center gap-2 mb-1">
              <Check className="h-5 w-5 text-green-600" />
              <h2 className="text-lg font-bold text-green-800">Widget Created!</h2>
            </div>
            <p className="text-sm text-green-700">
              The booking widget for <strong>{businessName}</strong> is ready. Add the embed code below to their website.
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
              className="px-6 py-2.5 rounded-lg bg-cyan-600 text-white text-sm font-medium hover:bg-cyan-700 transition-colors"
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
