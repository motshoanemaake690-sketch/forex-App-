import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="container py-12">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
            MFF TRADES
          </h1>
          <p className="text-base/7 text-white/80">
            Professional Forex analysis powered by AI. Transparent, secure, and built for traders.
          </p>
          <div className="flex gap-3">
            <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-md bg-accent text-white px-4 py-2 text-sm font-medium hover:opacity-90 transition">
              Launch App <ArrowRight size={16} />
            </Link>
            <Link href="/education" className="inline-flex items-center gap-2 rounded-md border border-white/10 px-4 py-2 text-sm font-medium hover:bg-white/5 transition">
              Education Corner
            </Link>
          </div>
          <ul className="text-sm text-white/70 grid gap-2">
            <li>• AI insights with confidence levels</li>
            <li>• Real broker/API market data</li>
            <li>• Multi-timeframe charts</li>
            <li>• Smart pattern alerts</li>
          </ul>
        </div>
        <div className="rounded-lg bg-card p-6 border border-white/5 min-h-[240px]">
          <p className="text-sm text-white/80">Preview</p>
          <div className="mt-3 h-48 w-full rounded bg-black/20" />
        </div>
      </section>
    </main>
  );
}
