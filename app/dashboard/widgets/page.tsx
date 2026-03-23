"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Copy, ExternalLink, Trash2, Loader2, PlusCircle } from "lucide-react";
import type { WidgetConfig } from "@/lib/types";

export default function WidgetsPage() {
  const [widgets, setWidgets] = useState<WidgetConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState("");

  useEffect(() => {
    fetch("/api/widgets")
      .then((r) => r.json())
      .then(setWidgets)
      .finally(() => setLoading(false));
  }, []);

  function copyEmbed(w: WidgetConfig) {
    const code = `<script src="https://booking.yourdomain.com/widget.js" data-widget-id="${w.configId}" data-business="${w.businessName}" data-phone="${w.phone}" data-color="${w.accentColor}"></script>`;
    navigator.clipboard.writeText(code);
    setCopiedId(w.configId);
    setTimeout(() => setCopiedId(""), 2000);
  }

  async function handleDelete(configId: string) {
    if (!confirm("Delete this widget config?")) return;
    await fetch("/api/widgets", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ configId }),
    });
    setWidgets((prev) => prev.filter((w) => w.configId !== configId));
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">My Widgets</h1>
          <p className="text-sm text-gray-500">{widgets.length} configured widgets</p>
        </div>
        <Link
          href="/dashboard/onboarding"
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-cyan-600 text-white text-sm font-medium hover:bg-cyan-700 transition-colors"
        >
          <PlusCircle className="h-4 w-4" /> New Widget
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        </div>
      ) : widgets.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg font-medium">No widgets configured</p>
          <p className="text-sm mt-1">Create your first widget to get started</p>
          <Link
            href="/dashboard/onboarding"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg bg-cyan-600 text-white text-sm font-medium hover:bg-cyan-700"
          >
            <PlusCircle className="h-4 w-4" /> Create Widget
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {widgets.map((w) => (
            <div key={w.configId} className="bg-white rounded-xl border p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ background: w.accentColor }}>
                    {w.businessName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">{w.businessName}</h3>
                    <p className="text-xs text-gray-400">{w.configId}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(w.configId)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-1.5 text-sm text-gray-600 mb-4">
                <p>Phone: {w.phone}</p>
                {w.notifyEmail && <p>Notify: {w.notifyEmail}</p>}
                <div className="flex items-center gap-2">
                  <span>Color:</span>
                  <div className="w-4 h-4 rounded-full" style={{ background: w.accentColor }} />
                  <span className="text-xs font-mono text-gray-400">{w.accentColor}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => copyEmbed(w)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <Copy className="h-3.5 w-3.5" />
                  {copiedId === w.configId ? "Copied!" : "Copy Embed"}
                </button>
                <Link
                  href="/preview"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> Preview
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
