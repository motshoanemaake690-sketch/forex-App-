import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { z } from "zod";

const BodySchema = z.object({
  pair: z.string().min(6).max(10),
  messages: z.array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().min(1) })).min(1),
});

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Missing OPENAI_API_KEY" }, { status: 500 });
  }

  const json = await req.json();
  const parsed = BodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { pair, messages } = parsed.data;

  const system = `You are a professional Forex trading assistant for MFF TRADES. Be transparent about uncertainty and do not provide signals without clear justifications. Use verified sources and standard institutional terminology. Include risk management notes and indicate confidence (0-100%).`;

  const client = new OpenAI({ apiKey });
  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: system },
      { role: "user", content: `Pair: ${pair}. Keep responses concise, structured, and educational.` },
      ...messages,
    ].slice(-12),
    temperature: 0.3,
  });

  const reply = completion.choices[0]?.message?.content ?? "Sorry, I could not generate a response.";
  return NextResponse.json({ reply });
}

