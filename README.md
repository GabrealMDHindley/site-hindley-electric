# Hindley Electric

Marketing site for Hindley Electric, built with Next.js App Router, Tailwind CSS,
React Three Fiber, Framer Motion, and GSAP ScrollTrigger.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS — design tokens in `tailwind.config.ts`
- React Three Fiber + drei — 3D hero lightning bolt (`components/three/`)
- Framer Motion — scroll-triggered reveals
- GSAP ScrollTrigger — pinned stat-counter band

## Contact form → CRM

The contact form posts to `/api/contact`, which forwards the lead to the
`CRM_WEBHOOK_URL` environment variable (a Go High Level inbound webhook, or any
CRM that accepts a JSON POST). Until that env var is set in Vercel, submissions
are accepted and logged server-side so no lead is lost.

## Development

```bash
npm install
npm run dev
```

## Contact info

All contact facts (phone, email, address, hours, license) live in
`lib/site-config.ts` — update that one file to go from `[CONFIRM ...]`
placeholders to real values across the whole site.
