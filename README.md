# WarSync

WarSync is a curated war-channel directory built with Next.js + Bun.
Users can discover channels quickly, open source accounts, and you can track engagement with analytics events.

## Stack

- Next.js App Router
- Bun package manager/runtime
- Tailwind CSS v4 + shadcn tokens
- Vercel Analytics (`@vercel/analytics`)

## Data Source

Channel data lives in:

- `lib/data/channels.json`

Typed accessors are in:

- `lib/data/channels.ts`

## Suggest New Links

Anyone can suggest a new channel by opening a GitHub issue:

- `https://github.com/AhmedTrooper/4/issues/new`

The UI also includes an **Add New Link (Issue)** button for this.

## Run Locally (Bun)

```bash
bun install
cp .env.example .env.local
bun run dev
```

Open `http://localhost:3000`.

## Environment Variables

Template file:

- `.env.example`

Current status:

- No required env vars for the current app.
- Vercel Analytics works without any key.
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` is optional (only if you later add Google Analytics).

## Analytics: Vercel vs Google

For this project, **Vercel Analytics is the best default** because:

- fastest setup in a Next.js app
- no extra script management
- clean integration with deploy previews/production
- event tracking already wired for channel clicks

Use Google Analytics when you specifically need advanced ad attribution, cross-property reporting, or existing GA dashboards.

## Deploy

Deploy on Vercel for the smoothest setup.
Once deployed, analytics events start appearing in the Vercel dashboard.
