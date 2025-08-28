import { NextRequest, NextResponse } from "next/server";

// Naive double top detection on provided candles
type Candle = { time: number; open: number; high: number; low: number; close: number };

export async function POST(req: NextRequest) {
  const { candles } = await req.json();
  const alerts: { type: string; message: string; time: number }[] = [];
  if (Array.isArray(candles) && candles.length > 40) {
    const tops = localMaxima(candles.map((c: Candle) => c.high));
    if (tops.length >= 2) {
      const [a, b] = tops.slice(-2);
      const near = Math.abs(a.value - b.value) / ((a.value + b.value) / 2) < 0.002; // 0.2%
      if (near) alerts.push({ type: "pattern", message: "Possible double top forming", time: candles[b.index].time });
    }
  }
  return NextResponse.json({ alerts });
}

function localMaxima(values: number[]) {
  const result: { index: number; value: number }[] = [];
  for (let i = 1; i < values.length - 1; i++) {
    if (values[i] > values[i - 1] && values[i] > values[i + 1]) {
      result.push({ index: i, value: values[i] });
    }
  }
  return result;
}

