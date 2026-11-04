import { count } from "drizzle-orm";
import { db, departmentsTable, settingsTable } from "@workspace/db";
import { logger } from "./logger";

let initialized: Promise<void> | null = null;
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/** Supabase seed is idempotent, concurrency-safe, and retries transient pooler timeouts. */
async function seedDatabase(): Promise<void> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const [{ value: deptCount }] = await db.select({ value: count() }).from(departmentsTable);
      if (Number(deptCount) === 0) {
        await db.insert(departmentsTable).values([
          { name: "العناية المركزة عالية", code: "ICU-HIGH", description: "وحدة العناية المركزة عالية", capacity: 12, departmentType: "intensive_care_high" },
          { name: "العناية المركزة متوسطة", code: "ICU-MED", description: "وحدة العناية المركزة متوسطة", capacity: 10, departmentType: "intensive_care_medium" },
          { name: "العناية المركزة للأطفال", code: "PICU", description: "وحدة العناية المركزة للأطفال", capacity: 8, departmentType: "picu" },
          { name: "الحاضنات أ", code: "INC-A", description: "وحدة الحاضنات أ", capacity: 15, departmentType: "incubator_a" },
          { name: "الحاضنات ب", code: "INC-B", description: "وحدة الحاضنات ب", capacity: 15, departmentType: "incubator_b" },
          { name: "الحاضنات ج", code: "INC-C", description: "وحدة الحاضنات ج", capacity: 15, departmentType: "incubator_c" },
        ]).onConflictDoNothing({ target: departmentsTable.code });
      }
      await db.insert(departmentsTable).values({ name: "الداخلي", code: "INTERNAL", description: "القسم الداخلي", capacity: 24, departmentType: "internal" }).onConflictDoNothing({ target: departmentsTable.code });
      await db.insert(settingsTable).values([
        { key: "hospital_name", value: "مجمع بن صالح الصحي" },
        { key: "hospital_logo", value: null },
        { key: "login_password", value: process.env.FOUNDER_PASSWORD ?? "change-me-before-production" },
        { key: "shift_morning_start", value: "07:00" },
        { key: "shift_morning_end", value: "14:00" },
        { key: "shift_evening_start", value: "14:00" },
        { key: "shift_evening_end", value: "21:00" },
        { key: "shift_night_start", value: "21:00" },
        { key: "shift_night_end", value: "07:00" },
      ]).onConflictDoNothing({ target: settingsTable.key });
      logger.info({ attempt }, "PostgreSQL seed completed");
      return;
    } catch (error) {
      lastError = error;
      logger.warn({ attempt, error }, "PostgreSQL initialization attempt failed; retrying");
      if (attempt < 3) await sleep(500 * attempt);
    }
  }
  throw lastError;
}

export function initDatabase(): Promise<void> {
  if (!initialized) {
    initialized = seedDatabase().catch((err) => {
      initialized = null;
      logger.error({ err }, "PostgreSQL initialization failed");
      throw err;
    });
  }
  return initialized;
}
