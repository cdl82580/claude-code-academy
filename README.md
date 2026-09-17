# Claude Code Academy

A self-paced, hands-on course web app for learning Claude Code — Anthropic's agentic coding tool.
Sign up with Google or email, work through 7 modules (plus a "Module 2.5" and a capstone) each
with a lesson, a quiz, and a hands-on practicum, and download a PDF certificate of completion once
every module is verified.

Not affiliated with or endorsed by Anthropic.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui (Base UI) · Supabase
(Auth + Postgres) · @react-pdf/renderer

## Getting started

```bash
npm install
cp .env.local.example .env.local   # fill in your Supabase project URL + anon key
npm run dev
```

See [`CLAUDE.md`](./CLAUDE.md) for full project setup (Supabase schema, Google OAuth), the
codebase's architecture, and the ship-it/deploy workflow.
