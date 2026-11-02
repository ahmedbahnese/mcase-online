import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL is required for mcase-online");

export const pool = new Pool({
  connectionString: databaseUrl,
  max: Number(process.env.DB_POOL_MAX ?? 5),
  idleTimeoutMillis: 10_000,
  connectionTimeoutMillis: 10_000,
  ssl: databaseUrl.includes("supabase.co") ? { rejectUnauthorized: false } : undefined,
});

export const db = drizzle(pool, { schema });
export * from "./schema";
