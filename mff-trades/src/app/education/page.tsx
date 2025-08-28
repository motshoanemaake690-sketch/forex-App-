export default function EducationPage() {
  return (
    <main className="container py-10">
      <h1 className="text-2xl font-semibold mb-4">Education Corner</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <article className="rounded-lg bg-card border border-white/10 p-4">
          <h2 className="font-medium">What is FOMC?</h2>
          <p className="text-sm text-white/80 mt-2">
            The Federal Open Market Committee (FOMC) sets US monetary policy. FOMC meetings and statements can create volatility across USD pairs. Traders watch rate decisions, dot plots, and Powell’s press conference.
          </p>
        </article>
        <article className="rounded-lg bg-card border border-white/10 p-4">
          <h2 className="font-medium">Risk Management Basics</h2>
          <p className="text-sm text-white/80 mt-2">
            Position size based on account risk (e.g., 1%), use stop-losses beyond invalidation, and avoid correlated exposure. Keep a journal and measure win rate and expectancy.
          </p>
        </article>
      </div>
    </main>
  );
}

