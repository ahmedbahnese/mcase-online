import { pgTable, serial, integer, text, boolean, timestamp } from "drizzle-orm/pg-core";

export const notificationsTable = pgTable("notifications", {
  id: serial("id").primaryKey(),
  message: text("message").notNull(),
  fromUser: text("from_user").notNull(),
  delivery: text("delivery").notNull().default("announcement"),
  tone: text("tone").notNull().default("single"),
  toneDurationMs: integer("tone_duration_ms").notNull().default(180),
  speak: integer("speak").notNull().default(1),
  speechLanguage: text("speech_language").notNull().default("auto"),
  audience: text("audience").notNull().default("selected"),
  recipientsJson: text("recipients_json").notNull().default("[]"),
  readByJson: text("read_by_json").notNull().default("[]"),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).$defaultFn(() => new Date()).notNull(),
});

export type Notification = typeof notificationsTable.$inferSelect;
