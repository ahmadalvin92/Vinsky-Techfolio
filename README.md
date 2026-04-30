# Ahmad Alvin Griffin Portfolio

Next.js portfolio with a private username/password admin dashboard for Ahmad Alvin Griffin.

## Stack

- Next.js App Router
- React + TypeScript
- Supabase Auth with email/password
- Supabase Postgres for editable portfolio content
- Vercel-ready deployment

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Admin Dashboard

Admin route:

```text
/admin
```

The admin dashboard uses username `ahmadalvin92` and is restricted to the Supabase user email:

```text
ahmadalvin92@gmail.com
```

Without Supabase environment variables, the public portfolio still works using fallback data.

## Environment Variables

Copy `.env.example` to `.env.local` and fill:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
ADMIN_EMAIL=ahmadalvin92@gmail.com
```

## Supabase Setup

1. Create a Supabase project.
2. Open the Supabase SQL Editor.
3. Run `supabase/schema.sql`.
4. Open Authentication > Users.
5. Create a user with email `ahmadalvin92@gmail.com` and your chosen password.
6. Keep email/password provider enabled in Authentication > Providers.
7. Use `/admin` to sign in with username `ahmadalvin92`.

## Useful Commands

```bash
npm run build
npm run dev
```
