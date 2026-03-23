import fs from "fs";
import path from "path";
import type { WidgetConfig } from "../types";

/**
 * Simple file-based widget config storage for MVP.
 * Replace with a real database later.
 */

const DATA_DIR = path.join(process.cwd(), ".data");
const WIDGETS_FILE = path.join(DATA_DIR, "widgets.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readWidgets(): WidgetConfig[] {
  ensureDataDir();
  if (!fs.existsSync(WIDGETS_FILE)) return [];
  const raw = fs.readFileSync(WIDGETS_FILE, "utf-8");
  return JSON.parse(raw);
}

function writeWidgets(widgets: WidgetConfig[]) {
  ensureDataDir();
  fs.writeFileSync(WIDGETS_FILE, JSON.stringify(widgets, null, 2));
}

export function saveWidget(widget: WidgetConfig): string {
  const widgets = readWidgets();
  // Generate ID if not set
  if (!widget.configId) {
    widget.configId = `w-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  }
  // Update if exists, otherwise add
  const idx = widgets.findIndex((w) => w.configId === widget.configId);
  if (idx >= 0) {
    widgets[idx] = widget;
  } else {
    widgets.push(widget);
  }
  writeWidgets(widgets);
  return widget.configId;
}

export function getAllWidgets(): WidgetConfig[] {
  return readWidgets();
}

export function getWidget(configId: string): WidgetConfig | null {
  return readWidgets().find((w) => w.configId === configId) || null;
}

export function deleteWidget(configId: string): boolean {
  const widgets = readWidgets();
  const filtered = widgets.filter((w) => w.configId !== configId);
  if (filtered.length === widgets.length) return false;
  writeWidgets(filtered);
  return true;
}
