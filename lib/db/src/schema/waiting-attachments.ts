import { pgTable, serial, integer, text, boolean, timestamp } from "drizzle-orm/pg-core";

export const waitingAttachmentCategoryValues = ["xray", "lab", "emergency_front", "emergency_back", "medical_report", "other"] as const;
export type WaitingAttachmentCategory = typeof waitingAttachmentCategoryValues[number];

export const waitingAttachmentsTable = pgTable("waiting_case_attachments", {
  id: serial("id").primaryKey(),
  waitingCaseId: integer("waiting_case_id").notNull(),
  category: text("category").notNull(),
  fileName: text("file_name").notNull(),
  mimeType: text("mime_type").notNull(),
  fileData: text("file_data").notNull(),
  isCurrent: boolean("is_current").notNull().default(true),
  uploadedBy: text("uploaded_by"),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).$defaultFn(() => new Date()).notNull(),
});

export type WaitingAttachment = typeof waitingAttachmentsTable.$inferSelect;
