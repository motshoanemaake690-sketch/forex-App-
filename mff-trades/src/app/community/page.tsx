"use client";

import { useState } from "react";

type Post = { id: string; author: string; content: string; createdAt: string };

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [text, setText] = useState("");

  function addPost() {
    if (!text.trim()) return;
    setPosts((p) => [{ id: Math.random().toString(36).slice(2), author: "Trader", content: text.trim(), createdAt: new Date().toISOString() }, ...p]);
    setText("");
  }

  return (
    <main className="container py-10 grid md:grid-cols-3 gap-6">
      <section className="md:col-span-2 space-y-4">
        <div className="rounded-lg bg-card border border-white/10 p-4">
          <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Share an idea..." className="w-full bg-card border border-white/10 rounded-md p-3 text-sm min-h-[80px]" />
          <div className="mt-2 text-right">
            <button onClick={addPost} className="rounded-md bg-accent text-white px-3 py-1.5 text-sm">Post</button>
          </div>
        </div>
        <div className="space-y-3">
          {posts.map((p) => (
            <article key={p.id} className="rounded-lg bg-card border border-white/10 p-4">
              <div className="text-xs text-white/60">{new Date(p.createdAt).toLocaleString()}</div>
              <p className="mt-2 text-sm whitespace-pre-wrap">{p.content}</p>
            </article>
          ))}
        </div>
      </section>
      <aside className="space-y-3">
        <div className="rounded-lg bg-card border border-white/10 p-4">
          <h3 className="font-medium">Guidelines</h3>
          <ul className="text-sm text-white/80 list-disc pl-4 mt-2 space-y-1">
            <li>Be respectful and keep discussions constructive.</li>
            <li>No financial advice or signals.</li>
          </ul>
        </div>
      </aside>
    </main>
  );
}

