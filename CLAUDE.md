# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project Overview

We are building an interactive Terry Pratchett "Discworld" booklist we application using Next.js, Better Auth, SQLite and Drizzle ORM.

## Guidance & Behavior

- **SPEC.md Usage:** Read `SPEC.md` _only_ when you need to verify the database design, check the architecture, or ensure the application strictly adheres to the project guidelines.
- **Response Style:** Always be extremely precise, concise, and direct. Eliminate all unnecessary fluff. Do not provide unprompted or redundant code snippets.

Whenever working with any third-party library or something similar, you MUST look up the official documentation to ensure that you are working with up-to-date information. Use the DocsExplorer subagent for efficient documentation lookup.

## Commands

```bash
npm run dev      # start dev server (localhost:3000)
npm run build    # production build
npm run start    # start production server
npm run lint     # ESLint (flat config, eslint-config-next)
```

No test runner is configured yet.

## Architecture

Full-stack Next.js App Router application — no separate backend. All API logic lives in Route Handlers under `src/app/api/`.

**Planned stack** (not all installed yet):

- Next.js 16 App Router + TypeScript + React 19
- Tailwind CSS 4 (via `@tailwindcss/postcss`)
- SQLite + Drizzle ORM (`DATABASE_URL=file:./local.db`)
- Better Auth (email/password, SQLite adapter)
- Playwright (PDF generation only)
- Zod (validation), nanoid (share slugs)

**Path alias**: `@/*` → `./src/*`

## Route Structure

| Route                           | Access        | Purpose                    |
| ------------------------------- | ------------- | -------------------------- |
| `/`                             | public        | Landing page               |
| `/login`, `/register`           | public        | Better Auth pages          |
| `/checklist`                    | authenticated | User reading checklist     |
| `/share/[slug]`                 | public        | Read-only shared checklist |
| `GET /api/books`                | public        | All books                  |
| `GET /api/checklist`            | auth          | User progress              |
| `PATCH /api/checklist/[bookId]` | auth          | Toggle book                |
| `POST /api/share`               | auth          | Create/get share link      |
| `GET /api/share/[slug]`         | public        | Shared checklist data      |
| `GET /api/pdf`                  | auth          | Generate PDF               |
| `GET /api/share/[slug]/pdf`     | public        | Generate PDF for share     |

## Data

Books are seeded from `/content/discworld-books.md` (markdown with `## Cycle Name` headings and `- Book Title` items). The seed script (`src/db/seed.ts`) parses this file and populates the `books` table. Users cannot edit the book list.

## Database Schema

Three app tables: `books` (id, title, slug, cycle, sortOrder), `userBookProgress` (userId + bookId unique, isChecked, checkedAt), `shareLinks` (userId, slug unique, isActive). Users table is managed by Better Auth.

## Environment Variables

```env
DATABASE_URL="file:./local.db"
BETTER_AUTH_SECRET="change-me"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Style Direction

Pixel-art medieval fantasy: parchment background, warm brown/gold palette, dark outline borders, 8-bit/16-bit UI. Pixel assets go in `/public/assets/pixel/`. No copyrighted Discworld images.
