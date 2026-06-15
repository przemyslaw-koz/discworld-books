# Discworld Reading Checklist

## 1. Project Goal

Build a simple web application for tracking reading progress through Terry Pratchett / Discworld books.

The application should allow users to:

- register and log in,
- view a fixed list of books loaded from a project markdown file,
- check and uncheck books as read,
- keep their own private checklist,
- generate a public read-only share link,
- export the checklist to PDF,
- use the app in a pixel-art medieval fantasy style inspired by Discworld atmosphere.

The book list is static and maintained by the project owner. Users cannot add, edit, or delete books in the first version.

---

## 2. Tech Stack

Use the following stack:

- **Next.js App Router**
- **TypeScript**
- **React**
- **Tailwind CSS**
- **SQLite**
- **Drizzle ORM**
- **Better Auth**
- **Playwright** for PDF generation
- **Zod** for validation
- **nanoid** for share slugs
- **Docker** later, not required in the first commit

---

## 3. Architecture

This should be a small full-stack Next.js application.

Do not create a separate Express/NestJS backend at this stage.

Use:

- Next.js pages/components for frontend,
- Next.js Route Handlers for API endpoints,
- SQLite as local database,
- Drizzle ORM for schema and queries,
- Better Auth for authentication.

---

## 4. Main Features

### Public pages

- `/`

  - landing page
  - project description
  - login/register links
  - preview of the pixel fantasy UI

- `/share/[slug]`

  - public read-only checklist
  - no editing
  - visible progress summary
  - optional PDF export

### Auth pages

- `/login`
- `/register`
- `/logout`

Authentication should use Better Auth with email/password login.

### Private pages

- `/checklist`

  - main authenticated user checklist
  - list of books grouped by cycle/category
  - checkbox for every book
  - progress summary
  - share button
  - PDF export button

---

## 5. Data Source

The source list of books should be stored in the repository as markdown.

Suggested file:

```txt
/content/discworld-books.md
```

The markdown file should be the source of truth for books.

Users cannot edit this list from the UI.

Expected markdown format:

```md
# Discworld Books

## City Watch

- Guards! Guards!
- Men at Arms
- Feet of Clay
- Jingo
- The Fifth Elephant
- Night Watch
- Thud!
- Snuff

## Witches

- Equal Rites
- Wyrd Sisters
- Witches Abroad
```

The app should include a seed script that parses this file and inserts books into SQLite.

---

## 6. Database Model

Use Drizzle ORM.

Required tables:

### users

Handled by Better Auth.

### books

```txt
id
title
slug
cycle
sortOrder
createdAt
updatedAt
```

### userBookProgress

```txt
id
userId
bookId
isChecked
checkedAt
createdAt
updatedAt
```

Unique constraint:

```txt
userId + bookId
```

### shareLinks

```txt
id
userId
slug
isActive
createdAt
updatedAt
```

Unique constraint:

```txt
slug
```

---

## 7. API Contract

### Auth

Handled by Better Auth.

### GET `/api/books`

Returns all books.

Response:

```json
{
  "books": [
    {
      "id": "book_id",
      "title": "Guards! Guards!",
      "slug": "guards-guards",
      "cycle": "City Watch",
      "sortOrder": 1
    }
  ]
}
```

### GET `/api/checklist`

Authenticated only.

Returns books with current user progress.

Response:

```json
{
  "books": [
    {
      "id": "book_id",
      "title": "Guards! Guards!",
      "cycle": "City Watch",
      "sortOrder": 1,
      "isChecked": true
    }
  ],
  "summary": {
    "total": 41,
    "checked": 12,
    "percentage": 29
  }
}
```

### PATCH `/api/checklist/[bookId]`

Authenticated only.

Toggles or sets progress for one book.

Request:

```json
{
  "isChecked": true
}
```

Response:

```json
{
  "success": true,
  "bookId": "book_id",
  "isChecked": true
}
```

### POST `/api/share`

Authenticated only.

Creates or returns active share link for current user.

Response:

```json
{
  "slug": "abc123",
  "url": "/share/abc123"
}
```

### GET `/api/share/[slug]`

Public.

Returns read-only checklist for share link.

Response:

```json
{
  "books": [
    {
      "title": "Guards! Guards!",
      "cycle": "City Watch",
      "sortOrder": 1,
      "isChecked": true
    }
  ],
  "summary": {
    "total": 41,
    "checked": 12,
    "percentage": 29
  }
}
```

### GET `/api/pdf`

Authenticated only.

Generates PDF for current user checklist.

### GET `/api/share/[slug]/pdf`

Public.

Generates PDF for shared read-only checklist.

---

## 8. UI Style Direction

The app should have a pixel-art medieval fantasy style.

Important style keywords:

- pixel art
- parchment background
- medieval checklist
- old fantasy book
- simple icons
- warm brown/gold palette
- dark outline borders
- 8-bit/16-bit inspired UI
- readable, not overloaded

Do not use copyrighted Discworld images or official book covers.

Use original inspired graphics only, for example:

- pixel turtle carrying a flat fantasy world,
- four elephant silhouettes,
- wizard hat icon,
- tiny sword icon,
- old book icon,
- pixel stars,
- parchment panels,
- medieval buttons.

Suggested folders:

```txt
/public/assets/pixel/
```

---

## 9. Suggested Project Structure

```txt
src/
  app/
    page.tsx
    login/
      page.tsx
    register/
      page.tsx
    checklist/
      page.tsx
    share/
      [slug]/
        page.tsx
    api/
      books/
        route.ts
      checklist/
        route.ts
        [bookId]/
          route.ts
      share/
        route.ts
        [slug]/
          route.ts
          pdf/
            route.ts
      pdf/
        route.ts

  components/
    BookChecklist.tsx
    BookGroup.tsx
    BookCheckbox.tsx
    ProgressSummary.tsx
    ShareButton.tsx
    PdfButton.tsx
    PixelFrame.tsx

  db/
    index.ts
    schema.ts
    seed.ts

  lib/
    auth.ts
    books-parser.ts
    checklist.ts
    share.ts
    pdf.ts
    slug.ts

content/
  discworld-books.md

drizzle/
  migrations/

public/
  assets/
    pixel/
```

---

## 10. Implementation Order

### Phase 1 — Project setup

1. Create Next.js project with TypeScript.
2. Add Tailwind CSS.
3. Add basic layout.
4. Add placeholder homepage.
5. Add basic pixel-medieval visual direction.

Goal: app runs locally.

---

### Phase 2 — Database

1. Add SQLite.
2. Add Drizzle ORM.
3. Create database schema.
4. Add migrations.
5. Add seed script.
6. Parse `/content/discworld-books.md`.
7. Insert books into database.

Goal: books exist in SQLite.

---

### Phase 3 — Static checklist view

1. Create `/checklist`.
2. Render all books grouped by cycle.
3. Add progress summary.
4. Checkboxes can be displayed but do not need to save state yet.

Goal: visual checklist works.

---

### Phase 4 — Authentication

1. Add Better Auth.
2. Add register page.
3. Add login page.
4. Add logout.
5. Protect `/checklist`.
6. Redirect anonymous users to login.

Goal: user can register and log in.

---

### Phase 5 — User progress

1. Add `userBookProgress` table.
2. Add API for getting checklist with progress.
3. Add API for updating checkbox state.
4. Save checked/unchecked state per user.
5. Update UI instantly after click.

Goal: every user has their own checklist.

---

### Phase 6 — Share links

1. Add `shareLinks` table.
2. Add share button.
3. Generate short slug with nanoid.
4. Create `/share/[slug]`.
5. Public share page must be read-only.
6. Add copy-to-clipboard button.

Goal: user can share read-only checklist.

---

### Phase 7 — PDF export

1. Create print-friendly checklist page or internal HTML template.
2. Add Playwright.
3. Generate PDF for authenticated checklist.
4. Generate PDF for public share page.
5. Use the same visual style, but simplified for print.

Goal: user can download PDF.

---

### Phase 8 — Polish and UX

1. Add loading states.
2. Add error states.
3. Add empty states.
4. Add responsive layout.
5. Add better pixel-art assets.
6. Add keyboard accessibility.
7. Add basic tests if useful.

Goal: app feels finished.

---

### Phase 9 — Docker

1. Add Dockerfile.
2. Add docker-compose.yml.
3. Persist SQLite database as volume.
4. Add environment variables.
5. Run app locally in Docker.

Goal: app can run on homelab.

---

## 11. Environment Variables

Suggested `.env.example`:

```env
DATABASE_URL="file:./local.db"
BETTER_AUTH_SECRET="change-me"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## 12. Non-goals for MVP

Do not implement these in the first version:

- user-editable book list,
- admin panel,
- comments,
- ratings,
- social features,
- official book covers,
- complex recommendation system,
- multi-language support,
- cloud database,
- payments.

---

## 13. Important Rules for Claude Code

When implementing this project:

1. Make small, incremental changes.
2. Do not rewrite the whole project unnecessarily.
3. Prefer simple solutions.
4. Keep the app understandable for a Node.js developer learning Next.js.
5. Use TypeScript everywhere.
6. Do not introduce unnecessary backend frameworks.
7. Do not use copyrighted Discworld graphics.
8. Keep the book list static and repository-controlled.
9. Keep user data separate from static book data.
10. Make every feature work before styling it heavily.

---

## 14. First Claude Code Task

Start with this task:

```txt
Create a new Next.js App Router TypeScript project for a Discworld-inspired reading checklist.

Use Tailwind CSS.

Create the following initial structure:
- homepage
- checklist page placeholder
- content/discworld-books.md placeholder
- basic pixel-medieval layout components

Do not add authentication or database yet.
Keep the first version simple and runnable.
```

---

## 15. Second Claude Code Task

After the first task works:

```txt
Add SQLite and Drizzle ORM.

Create a books table with:
- id
- title
- slug
- cycle
- sortOrder
- createdAt
- updatedAt

Create a parser for content/discworld-books.md.
Create a seed script that inserts the books into SQLite.
Render the seeded books on /checklist grouped by cycle.
```

---

## 16. Third Claude Code Task

After seeded books render correctly:

```txt
Add Better Auth with email/password authentication.

Create:
- register page
- login page
- logout action
- protected /checklist page

Do not add social login.
Use SQLite/Drizzle integration if supported by the selected Better Auth setup.
```

---

## 17. Fourth Claude Code Task

After auth works:

```txt
Add per-user checklist progress.

Create userBookProgress table.
Allow authenticated users to check and uncheck books.
Persist progress in SQLite.
Show total progress as checked / total and percentage.
```

---

## 18. Fifth Claude Code Task

After checklist progress works:

```txt
Add public read-only share links.

Create shareLinks table.
Add Share button on /checklist.
Generate a short slug.
Create /share/[slug].
The shared page must be public and read-only.
```

---

## 19. Sixth Claude Code Task

After share links work:

```txt
Add PDF export.

Use Playwright to generate a PDF version of:
- authenticated checklist
- public shared checklist

Keep the PDF simple, readable, and styled like a fantasy parchment checklist.
```

---

## 20. Definition of Done for MVP

The MVP is done when:

- user can register,
- user can log in,
- user can see the full book checklist,
- user can check/uncheck books,
- progress is saved per user,
- user can generate a public read-only share link,
- shared link works without login,
- user can export checklist to PDF,
- app has a clear pixel-medieval fantasy visual style,
- project can be run locally from README instructions.
