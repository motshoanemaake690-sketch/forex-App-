import { NextResponse } from "next/server";

// Placeholder: integrate Trading Economics / EconDB / ForexFactory API here.
export async function GET() {
  const events = [
    { time: "2025-09-17T18:00:00Z", impact: "High", title: "FOMC Rate Decision", currency: "USD" },
    { time: "2025-09-18T07:00:00Z", impact: "Medium", title: "BoE Rate Decision", currency: "GBP" },
  ];
  return NextResponse.json({ events });
}

