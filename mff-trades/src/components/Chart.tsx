"use client";

import { useEffect, useRef } from "react";
import { createChart, IChartApi, ColorType, LineStyle } from "lightweight-charts";
import useSWR from "swr";

type ChartProps = {
  symbol: string;
  timeframe: string;
};

type Candle = { time: number; open: number; high: number; low: number; close: number };

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function Chart({ symbol, timeframe }: ChartProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);

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

    const series = chart.addCandlestickSeries({
      upColor: "#16a34a",
      downColor: "#dc2626",
      wickUpColor: "#16a34a",
      wickDownColor: "#dc2626",
      borderVisible: false,
    });

    // Example MA overlay
    const ma = chart.addLineSeries({ color: "#2f6df6", lineWidth: 2, lineStyle: LineStyle.Solid });

    chartRef.current = chart;

    return () => {
      chart.remove();
      chartRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!chartRef.current || !data?.candles?.length) return;
    const chart = chartRef.current;
    const cs = (chart as any).getSeries();
  }, [data]);

  useEffect(() => {
    if (!chartRef.current || !data?.candles?.length) return;
    const chart = chartRef.current;
    const series = (chart as any).serieses()[0];
    series.setData(
      data.candles.map((c) => ({ time: c.time as any, open: c.open, high: c.high, low: c.low, close: c.close }))
    );

    // simple MA for demo
    const line = (chart as any).serieses()[1];
    const ma = movingAverage(data.candles, 10).map((v, i) => ({ time: data.candles[i].time as any, value: v || data.candles[i].close }));
    line.setData(ma);
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

