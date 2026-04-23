# PostOps

Your social media team, in a box. Photos in. Posts out.

**Status:** v0 skeleton — landing page + photo-to-posts demo route. Full AI not yet wired.

**Landing:** https://postops.vercel.app

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind v4 |
| Fonts | Inter via `next/font/google` |
| Hosting | Vercel (zero config) |
| Waitlist | https://waitlist-api-sigma.vercel.app |

## Run locally

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Deploy

Push to `main` — Vercel picks it up automatically. No environment variables required.

## Routes

| Route | Description |
|---|---|
| `/` | Landing page (original copy + design preserved) |
| `/try` | v0 demo — upload 3 photos + event description → 3 mocked social-post drafts (IG, Twitter, LinkedIn) |
| `/api/waitlist` | `POST { email }` → forwards to waitlist-api-sigma |

## What's next

- Wire real AI (caption generation + hashtag selection) behind `/try`
- Direct social publishing (Instagram Graph API, Twitter v2, LinkedIn)
- Scheduling queue and calendar view
- Auth + per-user brand voice settings
