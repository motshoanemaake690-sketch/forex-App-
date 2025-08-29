MFF TRADES is a professional Forex analysis platform powered by AI.

## Local Development

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy to Vercel

1) Create a new project on Vercel and import this repository.

2) Environment Variables (Project Settings → Environment Variables):
- DATABASE_URL = your Postgres connection string (Vercel Postgres/Neon/etc.)
- NEXTAUTH_SECRET = a strong random string
- OPENAI_API_KEY = your OpenAI key
- (optional) ALPHA_VANTAGE_KEY, OANDA_API_KEY, OANDA_ACCOUNT_ID, TWELVEDATA_KEY

3) Build Command
Vercel runs the custom build command which pushes Prisma schema to Postgres and builds:
```
npm run vercel-build
```

4) After deploy
Visit /auth/signin to create an account, then go to /dashboard.
