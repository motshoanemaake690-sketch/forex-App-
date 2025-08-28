import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// NOTE: Replace this with real provider calls (e.g., OANDA, TwelveData, Alpha Vantage)
// This route returns mock candles for now to make UI functional.

type Candle = { time: number; open: number; high: number; low: number; close: number };

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get("symbol") || "EURUSD";
  const tf = searchParams.get("tf") || "1H";

  // Mock generator - deterministic based on symbol+tf
  const seed = hash(`${symbol}-${tf}`);
  const now = Math.floor(Date.now() / 1000);
  const step = timeframeToSeconds(tf);
  const points = 300;
  const candles: Candle[] = [];

  let price = 1.1000 + ((seed % 1000) - 500) / 10_000;
  for (let i = points - 1; i >= 0; i--) {
    const t = now - i * step;
    const change = (Math.sin((i + seed) / 12) + Math.cos((i + seed) / 21)) * 0.001;
    const open = price;
    const close = open + change;
    const high = Math.max(open, close) + Math.random() * 0.0006;
    const low = Math.min(open, close) - Math.random() * 0.0006;
    candles.push({ time: t, open, high, low, close });
    price = close;
  }

  return NextResponse.json({ candles });
}

function timeframeToSeconds(tf: string): number {
  switch (tf) {
    case "1M":
      return 60;
    case "5M":
      return 300;
    case "15M":
      return 900;
    case "1H":
      return 3600;
    case "4H":
      return 14400;
    case "D":
      return 86400;
    default:
      return 3600;
  }
}

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = Math.imul(31, h) + s.charCodeAt(i) | 0;
  return Math.abs(h);
}

