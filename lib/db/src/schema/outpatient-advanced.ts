import { pgTable, serial, integer, text, boolean, timestamp } from "drizzle-orm/pg-core";

export const outpatientMessageTemplateKeys = ["welcome", "missing_data", "booking_confirmed", "cancelled", "rescheduled", "clinic_unavailable", "queue_followup", "attendance_instructions"] as const;

export const outpatientMessageTemplatesTable = pgTable("outpatient_message_templates", {
  id: serial("id").primaryKey(),
  templateKey: text("template_key").notNull().unique(),
  name: text("name").notNull(),
  body: text("body").notNull(),
  enabled: boolean("enabled").notNull().default(true),
  updatedBy: text("updated_by"),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }).$defaultFn(() => new Date()).notNull(),
});

export const outpatientServicesTable = pgTable("outpatient_services", {
  id: serial("id").primaryKey(),
  clinicId: integer("clinic_id").notNull(),
  name: text("name").notNull(),
  durationMinutes: integer("duration_minutes").notNull().default(15),
  capacityPerHour: integer("capacity_per_hour").notNull().default(4),
  workingDays: text("working_days").notNull().default("[]"),
  workStart: text("work_start").notNull().default("09:00"),
  workEnd: text("work_end").notNull().default("14:00"),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).$defaultFn(() => new Date()).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }).$defaultFn(() => new Date()).notNull(),
});

export const outpatientClinicExceptionsTable = pgTable("outpatient_clinic_exceptions", {
  id: serial("id").primaryKey(),
  clinicId: integer("clinic_id").notNull(),
  exceptionDate: text("exception_date").notNull(),
  kind: text("kind").notNull().default("closed"),
  reason: text("reason"),
  doctorName: text("doctor_name"),
  workStart: text("work_start"),
  workEnd: text("work_end"),
  createdBy: text("created_by"),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).$defaultFn(() => new Date()).notNull(),
});

export const outpatientClinicDoctorsTable = pgTable("outpatient_clinic_doctors", {
  id: serial("id").primaryKey(),
  clinicId: integer("clinic_id").notNull(),
  doctorName: text("doctor_name").notNull(),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).$defaultFn(() => new Date()).notNull(),
});

export const outpatientBookingRequestsTable = pgTable("outpatient_booking_requests", {
  id: serial("id").primaryKey(),
  channel: text("channel").notNull(),
  senderId: text("sender_id"),
  rawText: text("raw_text").notNull(),
  extractedJson: text("extracted_json").notNull().default("{}"),
  missingFieldsJson: text("missing_fields_json").notNull().default("[]"),
  status: text("status").notNull().default("needs_review"),
  appointmentId: integer("appointment_id"),
  reviewedBy: text("reviewed_by"),
  reviewedAt: timestamp("reviewed_at", { withTimezone: true, mode: "date" }),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).$defaultFn(() => new Date()).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }).$defaultFn(() => new Date()).notNull(),
});

export const outpatientMessageDeliveriesTable = pgTable("outpatient_message_deliveries", {
  id: serial("id").primaryKey(),
  channel: text("channel").notNull(),
  recipient: text("recipient"),
  templateKey: text("template_key"),
  body: text("body").notNull(),
  status: text("status").notNull().default("pending"),
  error: text("error"),
  appointmentId: integer("appointment_id"),
  inboundMessageId: integer("inbound_message_id"),
  retryCount: integer("retry_count").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).$defaultFn(() => new Date()).notNull(),
  sentAt: timestamp("sent_at", { withTimezone: true, mode: "date" }),
});
