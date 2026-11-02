import { pgTable, serial, integer, text, boolean, timestamp } from "drizzle-orm/pg-core";

export const settingsTable = pgTable("settings", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: text("value"),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }).$defaultFn(() => new Date()).notNull(),
});

export type Setting = typeof settingsTable.$inferSelect;
