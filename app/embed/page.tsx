"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { EmbedWidget } from "@/components/widget/EmbedWidget";
import { industryConfigs } from "@/lib/configs";
import type { WidgetConfig } from "@/lib/types";

function EmbedContent() {
  const params = useSearchParams();

  const configId = params.get("config") || "plumbing";
  const widgetId = params.get("widgetId") || "";
  const businessName = params.get("business") || "Business";
  const phone = params.get("phone") || "";
  const accentColor = params.get("color") || "#0891b2";
  const apiEndpoint = params.get("api") || "";

  const industryConfig = industryConfigs[configId];
  if (!industryConfig) {
    return <div className="p-4 text-red-500">Unknown industry config: {configId}</div>;
  }

  const widgetConfig: WidgetConfig = {
    configId: widgetId || `embed-${configId}`,
    businessName,
    phone,
    accentColor,
    apiEndpoint: apiEndpoint || undefined,
  };

  return <EmbedWidget industry={industryConfig} widget={widgetConfig} />;
}

export default function EmbedPage() {
  return (
    <Suspense fallback={<div />}>
      <EmbedContent />
    </Suspense>
  );
}
