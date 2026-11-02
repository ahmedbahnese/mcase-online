import { pgTable, serial, integer, text, boolean, timestamp } from "drizzle-orm/pg-core";

export const inboundMessagesTable = pgTable("inbound_messages", {
  id: serial("id").primaryKey(),
  channel: text("channel").notNull(),
  externalMessageId: text("external_message_id").unique(),
  senderId: text("sender_id").notNull(),
  senderName: text("sender_name"),
  body: text("body"),
  rawPayload: text("raw_payload"),
  status: text("status").notNull().default("received"),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).$defaultFn(() => new Date()).notNull(),
});

export type InboundMessage = typeof inboundMessagesTable.$inferSelect;
