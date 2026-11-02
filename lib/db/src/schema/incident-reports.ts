import { pgTable, serial, integer, text, boolean, timestamp } from "drizzle-orm/pg-core";

export const incidentReportsTable = pgTable("incident_reports", {
  id: serial("id").primaryKey(),
  incidentType: text("incident_type").notNull(),
  incidentLocation: text("incident_location").notNull(),
  reportDate: timestamp("report_date", { withTimezone: true, mode: "date" }).notNull(),
  reportDay: text("report_day"),
  reportTime: text("report_time"),
  totalInjured: integer("total_injured").notNull().default(0),
  totalDeaths: integer("total_deaths").notNull().default(0),
  hospitalsTransferredTo: text("hospitals_transferred_to"),
  casesJson: text("cases_json").notNull().default("[]"),
  reporterName: text("reporter_name"),
  reporterRole: text("reporter_role"),
  status: text("status").notNull().default("new"),
  severity: text("severity").notNull().default("no_harm"),
  eventDescription: text("event_description"),
  immediateAction: text("immediate_action"),
  investigationSummary: text("investigation_summary"),
  rootCause: text("root_cause"),
  correctiveAction: text("corrective_action"),
  preventiveAction: text("preventive_action"),
  actionOwner: text("action_owner"),
  dueDate: timestamp("due_date", { withTimezone: true, mode: "date" }),
  verificationNotes: text("verification_notes"),
  reviewedBy: text("reviewed_by"),
  reviewedAt: timestamp("reviewed_at", { withTimezone: true, mode: "date" }),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).$defaultFn(() => new Date()).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }).$defaultFn(() => new Date()).notNull(),
});

export type IncidentReport = typeof incidentReportsTable.$inferSelect;
