import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-10 border-t border-white/10 bg-[var(--brand)]/30">
      <div className="container py-6 text-xs text-white/70 flex flex-col md:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} MFF TRADES. All rights reserved.</p>
        <nav className="flex items-center gap-4">
          <Link href="/privacy" className="hover:underline">Privacy</Link>
          <Link href="/terms" className="hover:underline">Terms</Link>
          <Link href="/security" className="hover:underline">Security</Link>
        </nav>
      </div>
    </footer>
  );
}

