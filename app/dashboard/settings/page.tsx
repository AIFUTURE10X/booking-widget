"use client";

import { useEffect, useState } from "react";
import { Mail, MessageSquare, Calendar, Shield, Check, Loader2 } from "lucide-react";

interface EnvStatus {
  resend: boolean;
  sms: boolean;
  googleCalendar: boolean;
  dashboardPin: boolean;
}

export default function SettingsPage() {
  const [status, setStatus] = useState<EnvStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/settings/status")
      .then((r) => r.json())
      .then(setStatus)
      .finally(() => setLoading(false));
  }, []);

  const items = [
    {
      key: "resend" as const,
      icon: Mail,
      title: "Email Notifications (Resend)",
      desc: "Send booking notifications to business owners and confirmation emails to customers.",
      envVars: ["RESEND_API_KEY"],
      setup: "1. Sign up at resend.com\n2. Verify bookbutton.io domain\n3. Create API key\n4. Add RESEND_API_KEY to Vercel env vars",
      color: "#0891b2",
    },
    {
      key: "sms" as const,
      icon: MessageSquare,
      title: "SMS Notifications",
      desc: "Send instant SMS alerts when new bookings arrive.",
      envVars: ["SMS_WEBHOOK_URL"],
      setup: "1. Set up Twilio or MessageBird\n2. Create a webhook endpoint that sends SMS\n3. Add SMS_WEBHOOK_URL to Vercel env vars",
      color: "#16a34a",
    },
    {
      key: "googleCalendar" as const,
      icon: Calendar,
      title: "Google Calendar Integration",
      desc: "Auto-create calendar events for every booking and reservation.",
      envVars: ["GOOGLE_CALENDAR_CLIENT_EMAIL", "GOOGLE_CALENDAR_PRIVATE_KEY", "GOOGLE_CALENDAR_ID"],
      setup: "1. Create Google Cloud project\n2. Enable Calendar API\n3. Create service account + JSON key\n4. Share your calendar with the service account email\n5. Add env vars to Vercel",
      color: "#2563eb",
    },
    {
      key: "dashboardPin" as const,
      icon: Shield,
      title: "Dashboard PIN",
      desc: "Protects the dashboard with a PIN code. Default is 0000.",
      envVars: ["DASHBOARD_PIN"],
      setup: "1. Add DASHBOARD_PIN to Vercel env vars (e.g. \"5678\")\n2. Use this PIN to log into the dashboard",
      color: "#7c3aed",
    },
  ];

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-1">Settings</h1>
      <p className="text-sm text-gray-500 mb-8">Configure integrations and environment variables</p>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = status?.[item.key] ?? false;
            return (
              <div key={item.key} className="bg-white rounded-xl border p-5">
                <div className="flex items-start gap-4">
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${item.color}15` }}
                  >
                    <Icon className="h-5 w-5" style={{ color: item.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-sm">{item.title}</h3>
                      {isActive ? (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[11px] font-medium">
                          <Check className="h-3 w-3" /> Active
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 text-[11px] font-medium">
                          Not configured
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{item.desc}</p>

                    <div className="mb-3">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Required env vars:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {item.envVars.map((v) => (
                          <code key={v} className="px-2 py-0.5 rounded bg-gray-100 text-xs font-mono text-gray-600">{v}</code>
                        ))}
                      </div>
                    </div>

                    <details className="group">
                      <summary className="text-xs font-medium cursor-pointer text-gray-400 hover:text-gray-600">
                        Setup instructions
                      </summary>
                      <pre className="mt-2 text-xs text-gray-500 whitespace-pre-wrap bg-gray-50 rounded-lg p-3 border">
                        {item.setup}
                      </pre>
                    </details>
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
