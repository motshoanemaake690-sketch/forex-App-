"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useSession } from "next-auth/react";

const Chart = dynamic(() => import("@/components/Chart"), { ssr: false });

export default function DashboardPage() {
  const { data } = useSession();
  const [symbol, setSymbol] = useState("EURUSD");
  const [timeframe, setTimeframe] = useState("1H");

  return (
    <main className="container py-6 space-y-6">
      <h2 className="text-lg font-medium">Welcome{data?.user ? `, ${data.user.name || data.user.email}` : ""}</h2>
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="bg-card border border-white/10 rounded-md px-3 py-2"
        >
          <option>EURUSD</option>
          <option>GBPUSD</option>
          <option>USDJPY</option>
          <option>USDCAD</option>
          <option>AUDUSD</option>
        </select>
        <div className="inline-flex rounded-md overflow-hidden border border-white/10">
          {["1M", "5M", "15M", "1H", "4H", "D"].map((tf) => (
            <button
              key={tf}
              className={`px-3 py-2 text-sm ${timeframe === tf ? "bg-accent text-white" : "bg-card text-white/80"}`}
              onClick={() => setTimeframe(tf)}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>
      <div className="rounded-lg bg-card border border-white/10 p-2">
        <Chart symbol={symbol} timeframe={timeframe} />
      </div>
    </main>
  );
}

