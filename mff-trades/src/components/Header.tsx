"use client";

import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header className="border-b border-white/10 bg-[var(--brand)]/60 backdrop-blur supports-[backdrop-filter]:bg-[var(--brand)]/50">
      <div className="container flex items-center justify-between h-14">
        <Link href="/" className="flex items-center gap-2 text-white font-medium">
          <Image src="/logo.svg" width={24} height={24} alt="MFF TRADES" />
          <span>MFF TRADES</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-white/90">
          <Link href="/dashboard" className="hover:underline">Dashboard</Link>
          <Link href="/assistant" className="hover:underline">Assistant</Link>
          <Link href="/education" className="hover:underline">Education</Link>
          <Link href="/community" className="hover:underline">Community</Link>
        </nav>
        <div className="flex items-center gap-3">
          {mounted && (
            <button
              aria-label="Toggle theme"
              className="inline-flex items-center justify-center rounded-md border border-white/10 px-2.5 py-1.5 text-white hover:bg-white/10"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

