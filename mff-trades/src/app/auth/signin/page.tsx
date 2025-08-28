"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await signIn("credentials", { email, password, redirect: false });
    if (res?.error) setError("Invalid email or password");
    else window.location.href = "/dashboard";
  }

  return (
    <main className="container py-10">
      <div className="mx-auto max-w-sm rounded-xl bg-card border border-white/10 p-6">
        <h1 className="text-xl font-semibold text-center mb-2">Sign in to MFF TRADES</h1>
        <p className="text-xs text-center text-white/70 mb-6">Secure access to your trading dashboard</p>
        {error && <div className="mb-3 text-sm text-red-400">{error}</div>}
        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="text-sm">Email</label>
            <input className="mt-1 w-full bg-card border border-white/10 rounded-md px-3 py-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="text-sm">Password</label>
            <input className="mt-1 w-full bg-card border border-white/10 rounded-md px-3 py-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button className="w-full rounded-md bg-accent text-white px-4 py-2 text-sm font-medium">Sign In</button>
        </form>
        <p className="text-xs text-center text-white/70 mt-4">
          New here? <Link href="/auth/signup" className="text-white underline">Create an account</Link>
        </p>
      </div>
    </main>
  );
}

