# Supabase setup

1. Create a Supabase project.
2. In **SQL Editor**, run the newest SQL file under `supabase/migrations/`.
3. Add the Supabase **pooler** connection string as `DATABASE_URL` in Vercel. Use the transaction pooler on port `6543` and append `?pgbouncer=true` when Supabase provides it.
4. Add `FOUNDER_PASSWORD` and `SESSION_SECRET` as server-side Vercel environment variables.

The migration creates the application tables and indexes. The API seeds default departments and settings on first request.
