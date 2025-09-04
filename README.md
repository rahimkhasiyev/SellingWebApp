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

# SellingWebApp