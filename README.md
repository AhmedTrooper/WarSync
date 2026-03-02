# WarSync

WarSync is a public directory of war-update channels, organized by category so people can quickly find and follow sources in one place.

## Live Project

- Open issues / suggest new links: https://github.com/AhmedTrooper/WarSync/issues
- Star the repo: https://github.com/AhmedTrooper/WarSync

## What This Project Does

- Lists curated channel links by category.
- Lets users search by channel name, handle, or category.
- Tracks engagement events (for example, channel link clicks).
- Makes community submissions easy through GitHub Issues.

## Tech Stack

- Next.js App Router
- Bun (package manager/runtime)
- Tailwind CSS v4 + shadcn/ui components
- Vercel Analytics

## Data Location

- Channel list JSON: `lib/data/channels.json`
- Typed data access layer: `lib/data/channels.ts`

## Run Locally

```bash
bun install
cp .env.example .env.local
bun run dev
```

App runs at `http://localhost:3000`.

## Environment Variables

Use `.env.example` as your template.

- `NEXT_PUBLIC_SITE_URL` (recommended)
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` (optional, only if adding Google Analytics)

Notes:

- No required env vars for current functionality.
- Vercel Analytics works without extra keys.

## Analytics Recommendation

For this project, Vercel Analytics is the best default:

- fastest setup for Next.js
- no extra script management
- easy visibility across preview + production deployments

Use Google Analytics only if you need advanced attribution or existing GA reporting workflows.

## Contributing

To add a new channel, open an issue and include:

- Channel name
- @handle
- URL
- Suggested category

Issue page: https://github.com/AhmedTrooper/WarSync/issues

## Deployment

Deploy on Vercel for the simplest setup.

```bash
bun run build
```

## Disclaimer

WarSync aggregates external sources for tracking and discovery. Content can be biased, incomplete, or incorrect. Always verify critical information using multiple independent sources.
