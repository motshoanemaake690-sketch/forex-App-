import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { z } from "zod";

const BodySchema = z.object({ symbol: z.string().min(6).max(10), timeframe: z.string() });

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "Missing OPENAI_API_KEY" }, { status: 500 });
  const json = await req.json();
  const parsed = BodySchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const { symbol, timeframe } = parsed.data;
  const client = new OpenAI({ apiKey });

  const system = `Return forex bias as JSON with fields: bias (bullish/bearish/neutral), confidence (0-100), rationale (short).`;
  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: system },
      { role: "user", content: `Symbol: ${symbol}, Timeframe: ${timeframe}. Provide in JSON only.` },
    ],
    temperature: 0.2,
    response_format: { type: "json_object" as any },
  });
  const content = completion.choices[0]?.message?.content ?? "{}";
  return new NextResponse(content, { headers: { "Content-Type": "application/json" } });
}

