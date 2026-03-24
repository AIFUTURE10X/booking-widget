"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { EmbedReservationWidget } from "@/components/widget/EmbedReservationWidget";
import { venueConfigs } from "@/lib/configs/venues";
import type { ReservationWidgetConfig } from "@/lib/types";

function EmbedContent() {
  const params = useSearchParams();

  const configId = params.get("config") || "tennis";
  const widgetId = params.get("widgetId") || "";
  const businessName = params.get("business") || "Business";
  const phone = params.get("phone") || "";
  const accentColor = params.get("color") || "#8b5cf6";
  const apiEndpoint = params.get("api") || "";

  const venueConfig = venueConfigs[configId];
  if (!venueConfig) {
    return <div className="p-4 text-red-500">Unknown venue config: {configId}</div>;
  }

  const widgetConfig: ReservationWidgetConfig = {
    configId: widgetId || `embed-${configId}`,
    businessName,
    phone,
    accentColor,
    apiEndpoint: apiEndpoint || undefined,
  };

  return <EmbedReservationWidget venue={venueConfig} widget={widgetConfig} />;
}

export default function EmbedReservationPage() {
  return (
    <Suspense fallback={<div />}>
      <EmbedContent />
    </Suspense>
  );
}
