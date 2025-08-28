import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function AnalysesPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;
  const userId = session.user.id;
  const analyses = await prisma.analysis.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, take: 50 });

  return (
    <main className="container py-8">
      <h1 className="text-xl font-semibold mb-4">Your Analyses</h1>
      <div className="grid gap-3">
        {analyses.map((a) => (
          <article key={a.id} className="rounded-lg bg-card border border-white/10 p-4">
            <div className="text-sm font-medium">{a.symbol} • {a.timeframe}</div>
            <div className="text-xs text-white/60">Bias: {a.bias} • Confidence: {a.confidence}%</div>
            {a.rationale && <p className="text-sm mt-2 whitespace-pre-wrap">{a.rationale}</p>}
          </article>
        ))}
      </div>
    </main>
  );
}

