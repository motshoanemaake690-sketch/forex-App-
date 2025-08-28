import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const BASES: Record<string, number> = {
  EURUSD: 1.10,
  GBPUSD: 1.27,
  USDJPY: 150.0,
  USDCHF: 0.90,
  USDCAD: 1.35,
  AUDUSD: 0.66,
  NZDUSD: 0.61,
  XAUUSD: 2300,
  XAGUSD: 28,
  US500: 5200,
  NAS100: 18500,
  US30: 39000,
};

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const prices: Record<string, number> = {};
  const now = Date.now() / 1000;
  for (const [sym, base] of Object.entries(BASES)) {
    const noise = (Math.sin(now / 10 + hash(sym)) + Math.cos(now / 25 + hash(sym))) * (base * 0.0005);
    prices[sym] = base + noise;
  }
  return NextResponse.json({ prices });
}

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = Math.imul(31, h) + s.charCodeAt(i) | 0;
  return Math.abs(h);
}

