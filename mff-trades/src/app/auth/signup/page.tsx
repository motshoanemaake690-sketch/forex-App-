"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Sign up failed");
      return;
    }
    await signIn("credentials", { email, password, callbackUrl: "/dashboard" });
  }

  return (
    <main className="container py-10">
      <div className="mx-auto max-w-sm rounded-xl bg-card border border-white/10 p-6">
        <h1 className="text-xl font-semibold text-center mb-2">Create your MFF TRADES account</h1>
        {error && <div className="mb-3 text-sm text-red-400">{error}</div>}
        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="text-sm">Name</label>
            <input className="mt-1 w-full bg-card border border-white/10 rounded-md px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <input className="mt-1 w-full bg-card border border-white/10 rounded-md px-3 py-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="text-sm">Password</label>
            <input className="mt-1 w-full bg-card border border-white/10 rounded-md px-3 py-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button className="w-full rounded-md bg-accent text-white px-4 py-2 text-sm font-medium">Sign Up</button>
        </form>
      </div>
    </main>
  );
}

