import { NextRequest, NextResponse } from "next/server";
import { saveWidget, getAllWidgets, deleteWidget } from "@/lib/storage/widgets";

/** GET /api/widgets — list all configured widgets */
export async function GET() {
  return NextResponse.json(getAllWidgets());
}

/** POST /api/widgets — create or update a widget config */
export async function POST(req: NextRequest) {
  try {
    const widget = await req.json();
    if (!widget.businessName || !widget.configId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const id = saveWidget(widget);
    return NextResponse.json({ success: true, configId: id });
  } catch {
    return NextResponse.json({ error: "Invalid widget data" }, { status: 400 });
  }
}

/** DELETE /api/widgets — delete a widget config */
export async function DELETE(req: NextRequest) {
  try {
    const { configId } = await req.json();
    if (!configId) {
      return NextResponse.json({ error: "Missing configId" }, { status: 400 });
    }
    const deleted = deleteWidget(configId);
    if (!deleted) {
      return NextResponse.json({ error: "Widget not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
