"use client";

import { useState } from "react";
import {
  Calendar, X, Phone, MapPin, Wrench, ChevronRight, Check,
  FileText, Clock, User, Mail,
} from "lucide-react";
import type { IndustryConfig, WidgetConfig, BookingData } from "@/lib/types";

/**
 * Embed version of the booking widget — renders the form directly (no floating button),
 * designed to run inside an iframe. Sends postMessage to parent on close/submit.
 */

const STEPS = ["Location", "Service", "Schedule", "Contact", "Review"] as const;
const STEP_ICONS = [MapPin, Wrench, Clock, User, FileText];

const INITIAL_DATA: BookingData = {
  postcode: "", category: "", serviceType: "", specificService: "",
  preferredDate: "", preferredTime: "", firstName: "", lastName: "",
  phone: "", email: "", isOwner: false, address: "", addressLine2: "",
  city: "", state: "", notes: "",
};

interface Props {
  industry: IndustryConfig;
  widget: WidgetConfig;
}

export function EmbedWidget({ industry, widget }: Props) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<BookingData>({ ...INITIAL_DATA, state: industry.states[0] || "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const accent = widget.accentColor || "#0891b2";
  const categories = widget.enabledCategories
    ? industry.categories.filter((c) => widget.enabledCategories!.includes(c.id))
    : industry.categories;
  const services = { ...industry.services, ...widget.customServices };

  function notifyParent(msg: string) {
    try { window.parent.postMessage(msg, "*"); } catch {}
  }

  function update(fields: Partial<BookingData>) {
    setData((d) => ({ ...d, ...fields }));
  }

  function canContinue(): boolean {
    switch (step) {
      case 0: return data.postcode.length >= 4;
      case 1: return !!data.category && !!data.serviceType && !!data.specificService;
      case 2: return !!data.preferredDate && !!data.preferredTime;
      case 3: return !!data.firstName && !!data.lastName && !!data.phone && !!data.email;
      case 4: return true;
      default: return false;
    }
  }

  async function handleSubmit() {
    setSubmitting(true);
    try {
      const endpoint = widget.apiEndpoint || "/api/bookings";
      await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          widgetConfigId: widget.configId,
          businessName: widget.businessName,
          submittedAt: new Date().toISOString(),
          status: "pending",
        }),
      });
      setSubmitted(true);
      notifyParent("bw:submitted");
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleClose() {
    notifyParent("bw:close");
  }

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const serviceTypes = industry.serviceTypes;
  const currentServices = services[data.category]?.[data.serviceType] || [];

  return (
    <div className="flex flex-col h-screen bg-white" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 text-white flex-shrink-0" style={{ background: accent }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center">
            <Wrench className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-bold leading-tight">{widget.businessName}</p>
            <p className="text-[11px] opacity-80">{industry.title}</p>
          </div>
        </div>
        <button onClick={handleClose} className="p-1 hover:bg-white/20 rounded-lg">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Stepper */}
      {!submitted && (
        <div className="flex items-center justify-between px-6 py-3 border-b flex-shrink-0">
          {STEPS.map((s, i) => {
            const Icon = STEP_ICONS[i];
            const active = i === step;
            const done = i < step;
            return (
              <div key={s} className="flex flex-col items-center gap-1">
                <div className="flex items-center">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                    style={{
                      background: done || active ? accent : "#e5e7eb",
                      color: done || active ? "white" : "#9ca3af",
                    }}
                  >
                    {done ? <Check className="h-3.5 w-3.5" /> : <Icon className="h-3.5 w-3.5" />}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="w-6 h-0.5 mx-0.5" style={{ background: done ? accent : "#e5e7eb" }} />
                  )}
                </div>
                <span className="text-[10px] font-medium" style={{ color: active ? accent : "#9ca3af" }}>
                  {s}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-5">
        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: `${accent}15` }}>
              <Check className="h-8 w-8" style={{ color: accent }} />
            </div>
            <h3 className="text-lg font-bold mb-2">Booking Submitted!</h3>
            <p className="text-sm text-gray-500 mb-6">
              {widget.businessName} will confirm your appointment shortly. We&apos;ll call you at {data.phone}.
            </p>
            <button onClick={handleClose} className="px-6 py-2 rounded-full text-white text-sm font-medium" style={{ background: accent }}>
              Done
            </button>
          </div>
        ) : step === 0 ? (
          <div className="space-y-4">
            <div className="text-center mb-2">
              <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background: `${accent}15` }}>
                <MapPin className="h-7 w-7" style={{ color: accent }} />
              </div>
              <h3 className="text-lg font-bold">Where are you?</h3>
              <p className="text-sm text-gray-500 mt-1">Enter your postcode so we can check service in your area.</p>
            </div>
            <div>
              <label className="text-sm font-medium">Postcode *</label>
              <input
                value={data.postcode}
                onChange={(e) => update({ postcode: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                placeholder="e.g. 2116"
                className="mt-1 w-full h-10 rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2"
                style={{ "--tw-ring-color": accent } as React.CSSProperties}
              />
            </div>
          </div>
        ) : step === 1 ? (
          <div className="space-y-5">
            <div>
              <h3 className="text-base font-bold mb-3">What do you need help with?</h3>
              <div className={`grid gap-2 ${categories.length <= 5 ? "grid-cols-5" : "grid-cols-4"}`}>
                {categories.map((cat) => {
                  const selected = data.category === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => update({ category: cat.id, serviceType: "", specificService: "" })}
                      className="relative flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all text-center"
                      style={{
                        borderColor: selected ? accent : "#e5e7eb",
                        background: selected ? `${accent}08` : "transparent",
                      }}
                    >
                      {selected && (
                        <div className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: accent }}>
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )}
                      <span className="text-2xl">{cat.emoji}</span>
                      <span className="text-[10px] font-medium leading-tight whitespace-pre-line">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {data.category && (
              <div>
                <h3 className="text-base font-bold mb-2">Please select your service.</h3>
                <div className="flex gap-2 flex-wrap">
                  {serviceTypes.map((t) => (
                    <button
                      key={t}
                      onClick={() => update({ serviceType: t, specificService: "" })}
                      className="px-4 py-1.5 rounded-full border text-sm font-medium transition-all"
                      style={{
                        borderColor: data.serviceType === t ? accent : "#d1d5db",
                        background: data.serviceType === t ? `${accent}10` : "transparent",
                        color: data.serviceType === t ? accent : "#374151",
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {data.serviceType && currentServices.length > 0 && (
              <div>
                <h3 className="text-base font-bold mb-2">
                  {data.serviceType === "Repair" ? "What needs to be repaired?" :
                   data.serviceType === "Emergency" ? "What's the emergency?" :
                   "How can we help?"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {currentServices.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => update({ specificService: opt })}
                      className="px-3 py-1.5 rounded-full border text-sm transition-all"
                      style={{
                        borderColor: data.specificService === opt ? accent : "#d1d5db",
                        background: data.specificService === opt ? `${accent}10` : "transparent",
                        color: data.specificService === opt ? accent : "#374151",
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : step === 2 ? (
          <div className="space-y-4">
            <h3 className="text-base font-bold">When do you need us?</h3>
            <div>
              <label className="text-sm font-medium">Preferred Date *</label>
              <input
                type="date"
                min={minDate}
                value={data.preferredDate}
                onChange={(e) => update({ preferredDate: e.target.value })}
                className="mt-1 w-full h-10 rounded-lg border border-gray-300 px-3 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Preferred Time *</label>
              <div className="space-y-2">
                {industry.timeSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => update({ preferredTime: slot })}
                    className="w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all"
                    style={{
                      borderColor: data.preferredTime === slot ? accent : "#e5e7eb",
                      background: data.preferredTime === slot ? `${accent}08` : "transparent",
                      color: data.preferredTime === slot ? accent : "#374151",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                        style={{ borderColor: data.preferredTime === slot ? accent : "#d1d5db" }}
                      >
                        {data.preferredTime === slot && (
                          <div className="w-2 h-2 rounded-full" style={{ background: accent }} />
                        )}
                      </div>
                      {slot}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : step === 3 ? (
          <div className="space-y-4">
            <h3 className="text-base font-bold">How should we reach you?</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">First Name *</label>
                <input value={data.firstName} onChange={(e) => update({ firstName: e.target.value })} className="mt-1 w-full h-10 rounded-lg border border-gray-300 px-3 text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium">Last Name *</label>
                <input value={data.lastName} onChange={(e) => update({ lastName: e.target.value })} className="mt-1 w-full h-10 rounded-lg border border-gray-300 px-3 text-sm" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">Phone *</label>
                <input value={data.phone} onChange={(e) => update({ phone: e.target.value })} type="tel" className="mt-1 w-full h-10 rounded-lg border border-gray-300 px-3 text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium">Email *</label>
                <input value={data.email} onChange={(e) => update({ email: e.target.value })} type="email" className="mt-1 w-full h-10 rounded-lg border border-gray-300 px-3 text-sm" />
              </div>
            </div>
            {industry.propertyQuestion && (
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.isOwner}
                  onChange={(e) => update({ isOwner: e.target.checked })}
                  className="w-4 h-4 rounded"
                  style={{ accentColor: accent }}
                />
                <span className="text-sm">{industry.propertyQuestion} *</span>
              </label>
            )}
            <div className="pt-2 border-t">
              <h3 className="text-base font-bold mb-3">Where do you need service?</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Address *</label>
                  <input value={data.address} onChange={(e) => update({ address: e.target.value })} className="mt-1 w-full h-10 rounded-lg border border-gray-300 px-3 text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium">Address Line 2</label>
                  <input value={data.addressLine2} onChange={(e) => update({ addressLine2: e.target.value })} placeholder="Apt, Unit" className="mt-1 w-full h-10 rounded-lg border border-gray-300 px-3 text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <label className="text-sm font-medium">City *</label>
                  <input value={data.city} onChange={(e) => update({ city: e.target.value })} className="mt-1 w-full h-10 rounded-lg border border-gray-300 px-3 text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium">State *</label>
                  <select
                    value={data.state}
                    onChange={(e) => update({ state: e.target.value })}
                    className="mt-1 w-full h-10 rounded-lg border border-gray-300 bg-transparent px-3 text-sm"
                  >
                    {industry.states.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2">Summary</p>
              <div className="flex items-start gap-3 mb-3">
                <Wrench className="h-5 w-5 mt-0.5" style={{ color: accent }} />
                <div>
                  <p className="font-bold text-sm capitalize">{data.category.replace(/-/g, " ")}</p>
                  <div className="flex gap-1.5 mt-1 flex-wrap">
                    <span className="text-[11px] px-2 py-0.5 rounded bg-gray-100">{data.serviceType}</span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-gray-100">{data.specificService}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="h-4 w-4" style={{ color: accent }} />
                <p className="text-sm">{data.preferredDate} — {data.preferredTime}</p>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4" style={{ color: accent }} />
                <p className="text-sm">{data.city}, {data.state}, {data.postcode}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2">Contact Info</p>
              <p className="text-sm font-bold">{data.firstName} {data.lastName}</p>
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                <Phone className="h-3.5 w-3.5" /> {data.phone}
              </div>
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                <Mail className="h-3.5 w-3.5" /> {data.email}
              </div>
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                <MapPin className="h-3.5 w-3.5" /> {data.address} {data.addressLine2}, {data.city} {data.state} {data.postcode}
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-sm font-bold mb-2">
                Additional notes <span className="text-gray-400 font-normal">(Optional)</span>
              </h3>
              <textarea
                value={data.notes}
                onChange={(e) => update({ notes: e.target.value })}
                placeholder="Provide details about your issue here"
                rows={3}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      {!submitted && (
        <div className="flex items-center justify-between px-6 py-3 border-t flex-shrink-0">
          {step === 0 ? (
            widget.phone ? (
              <a
                href={`tel:${widget.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-1.5 text-sm font-medium"
                style={{ color: accent }}
              >
                <Phone className="h-3.5 w-3.5" /> Call us now
              </a>
            ) : <div />
          ) : (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Back
            </button>
          )}
          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canContinue()}
              className="px-6 py-2 rounded-lg text-white text-sm font-medium flex items-center gap-1 disabled:opacity-50"
              style={{ background: accent }}
            >
              Continue <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-6 py-2 rounded-lg text-white text-sm font-medium disabled:opacity-50"
              style={{ background: accent }}
            >
              {submitting ? "Submitting..." : "Finish Booking"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
