"use client";

import { useState, useMemo } from "react";
import {
  Calendar, X, Phone, ChevronRight, Check,
  FileText, Clock, User, Mail, Users, MapPin, Repeat, AlertCircle,
} from "lucide-react";
import type { VenueConfig, ReservationWidgetConfig, ReservationData } from "@/lib/types";

const STEPS = ["Venue", "Schedule", "Contact", "Review"] as const;
const STEP_ICONS = [MapPin, Clock, User, FileText];

const INITIAL_DATA: ReservationData = {
  facility: "", activity: "", date: "", timeSlot: "",
  duration: 0, groupSize: 1, firstName: "", lastName: "",
  phone: "", email: "", notes: "",
};

interface Props {
  venue: VenueConfig;
  widget: ReservationWidgetConfig;
  buttonText?: string;
}

/** Generate time slots from operating hours */
function generateTimeSlots(open: string, close: string, interval: number): string[] {
  const slots: string[] = [];
  const [openH, openM] = open.split(":").map(Number);
  const [closeH, closeM] = close.split(":").map(Number);
  let mins = openH * 60 + openM;
  const end = closeH * 60 + closeM;

  while (mins < end) {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
    const ampm = h < 12 ? "AM" : "PM";
    slots.push(`${hour12}:${m.toString().padStart(2, "0")} ${ampm}`);
    mins += interval;
  }
  return slots;
}

export function ReservationWidget({ venue, widget, buttonText }: Props) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [data, setData] = useState<ReservationData>({ ...INITIAL_DATA });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const accent = widget.accentColor || "#8b5cf6";

  const facilities = widget.enabledFacilities
    ? venue.facilities.filter((f) => widget.enabledFacilities!.includes(f.id))
    : venue.facilities;

  const activities = widget.enabledActivities
    ? venue.activities.filter((a) => widget.enabledActivities!.includes(a))
    : venue.activities;

  const timeSlots = useMemo(
    () => generateTimeSlots(venue.operatingHours.open, venue.operatingHours.close, venue.slotInterval),
    [venue.operatingHours.open, venue.operatingHours.close, venue.slotInterval],
  );

  function update(fields: Partial<ReservationData>) {
    setData((d) => ({ ...d, ...fields }));
  }

  function canContinue(): boolean {
    switch (step) {
      case 0: return !!data.facility && !!data.activity;
      case 1: return !!data.date && !!data.timeSlot && data.duration > 0;
      case 2: return !!data.firstName && !!data.lastName && !!data.phone && !!data.email;
      case 3: return true;
      default: return false;
    }
  }

  const hasPricing = !!venue.pricePerHour && venue.pricePerHour > 0;
  const totalPrice = hasPricing ? (venue.pricePerHour! * (data.duration / 60)) : 0;
  const currencySymbol = (venue.currency || "aud") === "aud" ? "$" : "$";

  async function handleSubmit() {
    setSubmitting(true);
    try {
      if (hasPricing) {
        // Redirect to Stripe Checkout
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            facility: selectedFacility?.label || data.facility,
            activity: data.activity,
            date: data.date,
            timeSlot: data.timeSlot,
            duration: data.duration,
            groupSize: data.groupSize,
            pricePerHour: venue.pricePerHour,
            currency: venue.currency || "aud",
            businessName: widget.businessName,
            customerEmail: data.email,
            customerName: `${data.firstName} ${data.lastName}`,
            widgetConfigId: widget.configId,
            reservationData: data,
          }),
        });
        const result = await res.json();
        if (result.url) {
          window.location.href = result.url;
          return; // Don't reset submitting — page is navigating away
        } else {
          alert(result.error || "Could not start checkout. Please try again.");
        }
      } else {
        // No pricing — submit directly
        const endpoint = widget.apiEndpoint || "/api/reservations";
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
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setData({ ...INITIAL_DATA });
    setStep(0);
    setSubmitted(false);
    setOpen(false);
  }

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const selectedFacility = facilities.find((f) => f.id === data.facility);
  const selectedDuration = venue.durations.find((d) => d.minutes === data.duration);

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 pl-5 pr-3 py-2 rounded-full shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
        style={{ background: accent }}
      >
        <span className="text-sm font-semibold text-white whitespace-nowrap">{buttonText || venue.title}</span>
        <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
          <Calendar className="h-4 w-4 text-white" />
        </div>
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={reset} />

          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 text-white flex-shrink-0" style={{ background: accent }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center">
                  <Calendar className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-bold leading-tight">{widget.businessName}</p>
                  <p className="text-[11px] opacity-80">{venue.title}</p>
                </div>
              </div>
              <button onClick={reset} className="p-1 hover:bg-white/20 rounded-lg">
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
                          <div className="w-8 h-0.5 mx-0.5" style={{ background: done ? accent : "#e5e7eb" }} />
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
                /* Success */
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: `${accent}15` }}>
                    <Check className="h-8 w-8" style={{ color: accent }} />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Reservation Submitted!</h3>
                  <p className="text-sm text-gray-500 mb-6">
                    {widget.businessName} will confirm your booking shortly. We&apos;ll contact you at {data.phone}.
                  </p>
                  <button onClick={reset} className="px-6 py-2 rounded-full text-white text-sm font-medium" style={{ background: accent }}>
                    Done
                  </button>
                </div>
              ) : step === 0 ? (
                /* Step 1: Venue — facility + activity */
                <div className="space-y-5">
                  <div>
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background: `${accent}15` }}>
                        <MapPin className="h-7 w-7" style={{ color: accent }} />
                      </div>
                      <h3 className="text-lg font-bold">Choose a facility</h3>
                      <p className="text-sm text-gray-500 mt-1">Select where you&apos;d like to book.</p>
                    </div>
                    <div className={`grid gap-2 ${facilities.length <= 4 ? "grid-cols-2" : "grid-cols-3"}`}>
                      {facilities.map((fac) => {
                        const selected = data.facility === fac.id;
                        return (
                          <button
                            key={fac.id}
                            onClick={() => update({ facility: fac.id })}
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
                            <span className="text-2xl">{fac.emoji}</span>
                            <span className="text-xs font-bold leading-tight">{fac.label}</span>
                            {fac.description && (
                              <span className="text-[10px] text-gray-500 leading-tight">{fac.description}</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {data.facility && (
                    <div>
                      <h3 className="text-base font-bold mb-2">What&apos;s the activity?</h3>
                      <div className="flex flex-wrap gap-2">
                        {activities.map((act) => (
                          <button
                            key={act}
                            onClick={() => update({ activity: act })}
                            className="px-4 py-1.5 rounded-full border text-sm font-medium transition-all"
                            style={{
                              borderColor: data.activity === act ? accent : "#d1d5db",
                              background: data.activity === act ? `${accent}10` : "transparent",
                              color: data.activity === act ? accent : "#374151",
                            }}
                          >
                            {act}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : step === 1 ? (
                /* Step 2: Schedule — date + time + duration + group size */
                <div className="space-y-4">
                  <h3 className="text-base font-bold">When do you want to come?</h3>

                  <div>
                    <label className="text-sm font-medium">Date *</label>
                    <input
                      type="date"
                      min={minDate}
                      value={data.date}
                      onChange={(e) => update({ date: e.target.value })}
                      className="mt-1 w-full h-10 rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2"
                      style={{ "--tw-ring-color": accent } as React.CSSProperties}
                    />
                  </div>

                  {data.date && (
                    <div>
                      <label className="text-sm font-medium mb-2 block">Time *</label>
                      <div className="grid grid-cols-4 gap-1.5 max-h-40 overflow-y-auto">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            onClick={() => update({ timeSlot: slot })}
                            className="px-2 py-1.5 rounded-lg border text-xs font-medium transition-all"
                            style={{
                              borderColor: data.timeSlot === slot ? accent : "#e5e7eb",
                              background: data.timeSlot === slot ? accent : "transparent",
                              color: data.timeSlot === slot ? "white" : "#374151",
                            }}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {data.timeSlot && (
                    <div>
                      <label className="text-sm font-medium mb-2 block">Duration *</label>
                      <div className="flex flex-wrap gap-2">
                        {venue.durations.map((dur) => (
                          <button
                            key={dur.minutes}
                            onClick={() => update({ duration: dur.minutes })}
                            className="px-4 py-2 rounded-lg border text-sm font-medium transition-all"
                            style={{
                              borderColor: data.duration === dur.minutes ? accent : "#d1d5db",
                              background: data.duration === dur.minutes ? `${accent}10` : "transparent",
                              color: data.duration === dur.minutes ? accent : "#374151",
                            }}
                          >
                            {dur.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {data.duration > 0 && venue.maxGroupSize > 1 && (
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        <Users className="h-3.5 w-3.5 inline mr-1" />
                        Group size
                      </label>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => update({ groupSize: Math.max(1, data.groupSize - 1) })}
                          className="w-9 h-9 rounded-lg border border-gray-300 flex items-center justify-center text-lg font-bold hover:bg-gray-50"
                        >
                          &minus;
                        </button>
                        <span className="text-lg font-bold w-8 text-center">{data.groupSize}</span>
                        <button
                          onClick={() => update({ groupSize: Math.min(venue.maxGroupSize, data.groupSize + 1) })}
                          className="w-9 h-9 rounded-lg border border-gray-300 flex items-center justify-center text-lg font-bold hover:bg-gray-50"
                        >
                          +
                        </button>
                        <span className="text-xs text-gray-400">Max {venue.maxGroupSize}</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : step === 2 ? (
                /* Step 3: Contact */
                <div className="space-y-4">
                  <h3 className="text-base font-bold">Your details</h3>
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
                </div>
              ) : (
                /* Step 4: Review & submit */
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2">Reservation Summary</p>
                    <div className="flex items-start gap-3 mb-3">
                      <MapPin className="h-5 w-5 mt-0.5" style={{ color: accent }} />
                      <div>
                        <p className="font-bold text-sm">{selectedFacility?.label}</p>
                        {selectedFacility?.description && (
                          <p className="text-xs text-gray-500">{selectedFacility.description}</p>
                        )}
                        <span className="text-[11px] px-2 py-0.5 rounded mt-1 inline-block" style={{ background: `${accent}10`, color: accent }}>
                          {data.activity}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="h-4 w-4" style={{ color: accent }} />
                      <p className="text-sm">{data.date} at {data.timeSlot}</p>
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="h-4 w-4" style={{ color: accent }} />
                      <p className="text-sm">{selectedDuration?.label || `${data.duration} min`}</p>
                    </div>
                    {data.groupSize > 1 && (
                      <div className="flex items-center gap-3">
                        <Users className="h-4 w-4" style={{ color: accent }} />
                        <p className="text-sm">{data.groupSize} people</p>
                      </div>
                    )}

                    {/* Price */}
                    {hasPricing && data.duration > 0 && (
                      <div className="mt-3 p-3 rounded-lg border-2 flex items-center justify-between" style={{ borderColor: accent, background: `${accent}08` }}>
                        <div>
                          <p className="text-xs text-gray-500">{currencySymbol}{venue.pricePerHour}/hr &times; {data.duration / 60} hr{data.duration > 60 ? "s" : ""}</p>
                          <p className="text-lg font-bold" style={{ color: accent }}>{currencySymbol}{totalPrice.toFixed(2)}</p>
                        </div>
                        <span className="text-[10px] font-semibold uppercase px-2 py-1 rounded" style={{ background: `${accent}15`, color: accent }}>
                          Pay online
                        </span>
                      </div>
                    )}
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
                  </div>

                  {/* Recurring option */}
                  <div className="border-t pt-4">
                    <h3 className="text-sm font-bold mb-2 flex items-center gap-1.5">
                      <Repeat className="h-3.5 w-3.5" style={{ color: accent }} />
                      Make it recurring? <span className="text-gray-400 font-normal">(Optional)</span>
                    </h3>
                    <div className="flex gap-2">
                      {["", "weekly", "fortnightly", "monthly"].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => update({ recurring: opt })}
                          className="px-3 py-1.5 rounded-full border text-xs font-medium transition-all"
                          style={{
                            borderColor: (data.recurring || "") === opt ? accent : "#d1d5db",
                            background: (data.recurring || "") === opt ? `${accent}10` : "transparent",
                            color: (data.recurring || "") === opt ? accent : "#374151",
                          }}
                        >
                          {opt || "One-time"}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="text-sm font-bold mb-2">
                      Additional notes <span className="text-gray-400 font-normal">(Optional)</span>
                    </h3>
                    <textarea
                      value={data.notes}
                      onChange={(e) => update({ notes: e.target.value })}
                      placeholder="Any special requests or requirements"
                      rows={3}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2"
                      style={{ "--tw-ring-color": accent } as React.CSSProperties}
                    />
                  </div>

                  {/* Cancellation policy */}
                  {venue.cancellationPolicy && (
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-gray-50 border border-gray-200">
                      <AlertCircle className="h-3.5 w-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-gray-500">{venue.cancellationPolicy}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            {!submitted && (
              <div className="flex items-center justify-between px-6 py-3 border-t flex-shrink-0">
                {step === 0 ? (
                  <a
                    href={`tel:${widget.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-1.5 text-sm font-medium"
                    style={{ color: accent }}
                  >
                    <Phone className="h-3.5 w-3.5" /> Call us
                  </a>
                ) : (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Back
                  </button>
                )}
                {step < 3 ? (
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
                    {submitting ? "Processing..." : hasPricing ? `Pay ${currencySymbol}${totalPrice.toFixed(2)} & Book` : "Confirm Reservation"}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
