"use client";

import { useEffect, useMemo, useState } from "react";

type Instrument = { symbol: string; name: string; category: "Forex" | "Commodities" | "Indices" };

const forexPairs = [
  "EURUSD","GBPUSD","USDJPY","USDCHF","USDCAD","AUDUSD","NZDUSD","EURGBP","EURJPY","GBPJPY","AUDJPY","EURNZD","GBPNZD","EURCAD","CADJPY","CHFJPY","AUDCAD","AUDCHF","EURCHF","GBPCAD"
];
const commodities = ["XAUUSD","XAGUSD","UKOIL","USOIL","XPTUSD","XPDUSD"];
const indices = ["US30","US500","NAS100","UK100","DE40","JP225","HK50"];

const instruments: Instrument[] = [
  ...forexPairs.map((s) => ({ symbol: s, name: s, category: "Forex" as const })),
  ...commodities.map((s) => ({ symbol: s, name: s, category: "Commodities" as const })),
  ...indices.map((s) => ({ symbol: s, name: s, category: "Indices" as const })),
];

export default function WatchlistPage() {
  const [query, setQuery] = useState("");
  const [tick, setTick] = useState<Record<string, number>>({});

  useEffect(() => {
    let mounted = true;
    async function poll() {
      const res = await fetch("/api/ticks");
      if (res.ok) {
        const data = await res.json();
        if (mounted) setTick(data.prices);
      }
      if (mounted) setTimeout(poll, 2000);
    }
    poll();
    return () => { mounted = false; };
  }, []);

  const grouped = useMemo(() => {
    const q = query.trim().toUpperCase();
    const filtered = q ? instruments.filter((i) => i.symbol.includes(q)) : instruments;
    return {
      Forex: filtered.filter((i) => i.category === "Forex"),
      Commodities: filtered.filter((i) => i.category === "Commodities"),
      Indices: filtered.filter((i) => i.category === "Indices"),
    };
  }, [query]);

  return (
    <main className="container py-6">
      <div className="flex items-center gap-3 mb-4">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search instruments" className="bg-card border border-white/10 rounded-md px-3 py-2 w-full max-w-sm" />
      </div>
      {(["Forex","Commodities","Indices"] as const).map((cat) => (
        <section key={cat} className="mb-6">
          <h3 className="text-sm font-medium text-white/80 mb-2">{cat}</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {grouped[cat].map((i) => (
              <div key={i.symbol} className="rounded-md bg-card border border-white/10 p-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">{i.symbol}</div>
                  <div className="text-xs text-white/60">{i.name}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm">{tick[i.symbol]?.toFixed(5) ?? "-"}</div>
                  <div className="text-[10px] text-white/50">live</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}

