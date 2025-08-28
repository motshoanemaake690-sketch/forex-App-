export default function SecurityPage() {
  return (
    <main className="container py-10">
      <h1 className="text-2xl font-semibold mb-4">Security</h1>
      <ul className="text-sm text-white/80 list-disc pl-5 space-y-2">
        <li>Use HTTPS (TLS) in production and secure cookies.</li>
        <li>Keep API keys in environment variables and never expose them to the client.</li>
        <li>Role-based access control for future features.</li>
      </ul>
    </main>
  );
}

