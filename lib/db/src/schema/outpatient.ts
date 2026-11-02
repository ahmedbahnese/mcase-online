import { pgTable, serial, integer, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const outpatientAppointmentSourceValues = ["system", "external", "staff"] as const;
export const outpatientAppointmentStatusValues = ["waiting", "called", "in_service", "completed", "cancelled", "no_show", "skipped"] as const;

export const outpatientClinicsTable = pgTable("outpatient_clinics", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  specialty: text("specialty"),
  doctorName: text("doctor_name").notNull(),
  room: text("room"),
  phone: text("phone"),
  dailyCapacity: integer("daily_capacity").notNull().default(30),
  appointmentDuration: integer("appointment_duration").notNull().default(15),
  workingDays: text("working_days").notNull().default("[]"),
  workStart: text("work_start").notNull().default("09:00"),
  workEnd: text("work_end").notNull().default("14:00"),
  isOpen: boolean("is_open").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).$defaultFn(() => new Date()).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }).$defaultFn(() => new Date()).notNull(),
});

export const outpatientAppointmentsTable = pgTable("outpatient_appointments", {
  id: serial("id").primaryKey(),
  clinicId: integer("clinic_id").notNull(),
  patientName: text("patient_name").notNull(),
  age: text("age"),
  phone: text("phone"),
  nationalId: text("national_id"),
  appointmentDate: text("appointment_date").notNull(),
  appointmentTime: text("appointment_time"),
  queueNumber: integer("queue_number").notNull(),
  source: text("source").notNull().default("system"),
  status: text("status").notNull().default("waiting"),
  calledAt: timestamp("called_at", { withTimezone: true, mode: "date" }),
  completedAt: timestamp("completed_at", { withTimezone: true, mode: "date" }),
  notes: text("notes"),
  publicToken: text("public_token").unique(),
  publicTokenExpiresAt: timestamp("public_token_expires_at", { withTimezone: true, mode: "date" }),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).$defaultFn(() => new Date()).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }).$defaultFn(() => new Date()).notNull(),
});

export const insertOutpatientClinicSchema = createInsertSchema(outpatientClinicsTable).omit({ id: true, createdAt: true, updatedAt: true });
export const insertOutpatientAppointmentSchema = createInsertSchema(outpatientAppointmentsTable).omit({ id: true, queueNumber: true, createdAt: true, updatedAt: true });
export type OutpatientClinic = typeof outpatientClinicsTable.$inferSelect;
export type OutpatientAppointment = typeof outpatientAppointmentsTable.$inferSelect;
export type InsertOutpatientClinic = z.infer<typeof insertOutpatientClinicSchema>;
export type InsertOutpatientAppointment = z.infer<typeof insertOutpatientAppointmentSchema>;
