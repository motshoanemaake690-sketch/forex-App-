export default function IntroPage() {
  return (
    <main className="container py-16">
      <div className="rounded-xl bg-card border border-white/10 p-8">
        <h1 className="text-3xl font-semibold">Welcome to MFF TRADES</h1>
        <p className="mt-3 text-white/80">
          Professional Forex analysis powered by AI. Verified data sources, transparent performance metrics, and secure experience.
        </p>
        <ul className="mt-6 grid gap-2 text-sm text-white/70">
          <li>• Interactive assistant with context-aware pair analysis</li>
          <li>• Multi-timeframe charting</li>
          <li>• Smart alerts including pattern detection</li>
          <li>• Education Corner for continuous learning</li>
        </ul>
      </div>
    </main>
  );
}

