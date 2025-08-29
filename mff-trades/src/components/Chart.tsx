"use client";

import { useEffect, useRef } from "react";
import { createChart, ColorType, LineStyle, ISeriesApi, CandlestickData, LineData, UTCTimestamp } from "lightweight-charts";
import useSWR from "swr";

type ChartProps = {
  symbol: string;
  timeframe: string;
};

type Candle = { time: number; open: number; high: number; low: number; close: number };

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function Chart({ symbol, timeframe }: ChartProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<ReturnType<typeof createChart> | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const lineSeriesRef = useRef<ISeriesApi<"Line"> | null>(null);

  const { data } = useSWR<{ candles: Candle[] }>(`/api/market/candles?symbol=${symbol}&tf=${timeframe}`, fetcher, {
    refreshInterval: 10_000,
  });

  useEffect(() => {
    if (!containerRef.current) return;
    if (chartRef.current) return;

    const chart = createChart(containerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: getComputedStyle(document.body).getPropertyValue("--card").trim() || "#0e1728" },
        textColor: getComputedStyle(document.body).getPropertyValue("--foreground").trim() || "#e6edf6",
      },
      grid: {
        horzLines: { color: "rgba(255,255,255,0.04)" },
        vertLines: { color: "rgba(255,255,255,0.04)" },
      },
      rightPriceScale: { borderVisible: false },
      timeScale: { borderVisible: false },
      autoSize: true,
    });

    type ChartApiMethods = {
      addCandlestickSeries: (options?: Record<string, unknown>) => ISeriesApi<"Candlestick">;
      addLineSeries: (options?: Record<string, unknown>) => ISeriesApi<"Line">;
      remove: () => void;
    };

    const chartApi = chart as unknown as ChartApiMethods;

    const series = chartApi.addCandlestickSeries({
      upColor: "#16a34a",
      downColor: "#dc2626",
      wickUpColor: "#16a34a",
      wickDownColor: "#dc2626",
      borderVisible: false,
    });

    // Example MA overlay
    const ma = chartApi.addLineSeries({ color: "#2f6df6", lineWidth: 2, lineStyle: LineStyle.Solid });

    candleSeriesRef.current = series;
    lineSeriesRef.current = ma;

    chartRef.current = chart;

    return () => {
      chartApi.remove();
      chartRef.current = null;
    };
  }, []);

  useEffect(() => {
    // no-op effect retained for potential future updates
  }, [data]);

  useEffect(() => {
    if (!chartRef.current || !data?.candles?.length) return;
    const series = candleSeriesRef.current;
    const line = lineSeriesRef.current;
    if (!series || !line) return;

    const candlesData: CandlestickData<UTCTimestamp>[] = data.candles.map((c) => ({ time: c.time as unknown as UTCTimestamp, open: c.open, high: c.high, low: c.low, close: c.close }));
    series.setData(candlesData);

    // simple MA for demo
    const ma = movingAverage(data.candles, 10).map((v, i) => ({ time: data.candles[i].time as unknown as UTCTimestamp, value: v ?? data.candles[i].close }));
    line.setData(ma as LineData<UTCTimestamp>[]);
  }, [data]);

  return <div ref={containerRef} className="w-full h-[480px]" />;
}

function movingAverage(candles: Candle[], period: number): (number | undefined)[] {
  const result: (number | undefined)[] = [];
  let sum = 0;
  for (let i = 0; i < candles.length; i++) {
    sum += candles[i].close;
    if (i >= period) {
      sum -= candles[i - period].close;
    }
    result.push(i + 1 >= period ? sum / period : undefined);
  }
  return result;
}

