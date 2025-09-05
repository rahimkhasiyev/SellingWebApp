# Online Store

Simple online selling web app built with Next.js 14, TypeScript, Tailwind CSS, and Prisma (SQLite).

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Configure environment:

Create `.env` with:

```env
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

3. Setup database and seed:

```bash
npm run prisma:generate
npm run db:push
npm run db:seed
```

4. Run the dev server:

```bash
npm run dev
```

Open http://localhost:3000 to view the store.

## Features

- Product listing and detail pages
- Client-side cart persisted in localStorage
- Checkout API creates orders and order items

## Docker (Recommended for live preview)

```bash
docker compose up --build
```

Then open http://localhost:3000

Notes:
- SQLite file is persisted in the `db-data` named volume.
- The `migrate` job runs schema sync and seeds on first start.

## Deploy to Vercel (using Turso/libSQL)

SQLite is not suitable for serverless file systems. Use an external libSQL DB.

1) Create a Turso database and get the URL and auth token.

2) Set environment variables in Vercel:

```
LIBSQL_URL=libsql://<your-db-url>
LIBSQL_AUTH_TOKEN=<your-token>
NEXT_PUBLIC_BASE_URL=https://<your-vercel-domain>
```

3) Push schema from local once (recommended):

```bash
LIBSQL_URL=libsql://... LIBSQL_AUTH_TOKEN=... npx prisma db push
node prisma/seed.js
```

4) Deploy:

```bash
npx vercel --prod
```

The app will connect to libSQL automatically if `LIBSQL_URL` is set.

# SellingWebApp