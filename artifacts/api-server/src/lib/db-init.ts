import { count } from "drizzle-orm";
import { db, departmentsTable, settingsTable } from "@workspace/db";
import { logger } from "./logger";

let initialized: Promise<void> | null = null;

/**
 * Supabase schema is applied by the committed SQL migration before deploy.
 * This function is intentionally idempotent and only seeds baseline rows.
 */
export function initDatabase(): Promise<void> {
  if (!initialized) {
    initialized = (async () => {
      const [{ value: deptCount }] = await db.select({ value: count() }).from(departmentsTable);
      if (Number(deptCount) === 0) {
        await db.insert(departmentsTable).values([
          { name: "العناية المركزة عالية", code: "ICU-HIGH", description: "وحدة العناية المركزة عالية", capacity: 12, departmentType: "intensive_care_high" },
          { name: "العناية المركزة متوسطة", code: "ICU-MED", description: "وحدة العناية المركزة متوسطة", capacity: 10, departmentType: "intensive_care_medium" },
          { name: "العناية المركزة للأطفال", code: "PICU", description: "وحدة العناية المركزة للأطفال", capacity: 8, departmentType: "picu" },
          { name: "الحاضنات أ", code: "INC-A", description: "وحدة الحاضنات أ", capacity: 15, departmentType: "incubator_a" },
          { name: "الحاضنات ب", code: "INC-B", description: "وحدة الحاضنات ب", capacity: 15, departmentType: "incubator_b" },
          { name: "الحاضنات ج", code: "INC-C", description: "وحدة الحاضنات ج", capacity: 15, departmentType: "incubator_c" },
        ]);
      }
      await db.insert(departmentsTable).values({ name: "الداخلي", code: "INTERNAL", description: "القسم الداخلي", capacity: 24, departmentType: "internal" }).onConflictDoNothing();
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
      ]).onConflictDoNothing();
      logger.info("PostgreSQL seed completed");
    })().catch((err) => {
      initialized = null;
      logger.error({ err }, "PostgreSQL initialization failed");
      throw err;
    });
  }
  return initialized;
}
