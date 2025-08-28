"use client";

import { useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

export default function AssistantPage() {
  const [pair, setPair] = useState("EURUSD");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I’m your trading assistant. Which pair are we looking at?" },
  ]);
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!input.trim()) return;
    const nextMessages: Message[] = [...messages, { role: "user", content: `(${pair}) ${input}` }];
    setMessages(nextMessages as Message[]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/assistant/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pair, messages: nextMessages.slice(-8) }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-lg bg-card border border-white/10 p-4 h-[70vh] flex flex-col">
          <div className="flex items-center gap-3 mb-3">
            <select value={pair} onChange={(e) => setPair(e.target.value)} className="bg-card border border-white/10 rounded-md px-3 py-2">
              <option>EURUSD</option>
              <option>GBPUSD</option>
              <option>USDJPY</option>
              <option>USDCAD</option>
              <option>AUDUSD</option>
            </select>
          </div>
          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {messages.map((m, i) => (
              <div key={i} className={`max-w-[85%] ${m.role === "assistant" ? "bg-white/5" : "bg-accent/20"} rounded-md px-3 py-2`}>
                <p className="whitespace-pre-wrap text-sm">{m.content}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2">
            <input
              className="flex-1 bg-card border border-white/10 rounded-md px-3 py-2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about structure, bias, risk, or macro..."
            />
            <button onClick={send} disabled={loading} className="rounded-md bg-accent text-white px-4 py-2 text-sm font-medium disabled:opacity-50">
              {loading ? "Thinking..." : "Send"}
            </button>
          </div>
        </div>
        <aside className="rounded-lg bg-card border border-white/10 p-4 space-y-4">
          <h3 className="font-medium">Guidance</h3>
          <ul className="text-sm text-white/80 space-y-2">
            <li>• Keep risk ≤ 1% per trade</li>
            <li>• Align entries with higher timeframe bias</li>
            <li>• Avoid trading into high-impact news</li>
          </ul>
        </aside>
      </div>
    </main>
  );
}

