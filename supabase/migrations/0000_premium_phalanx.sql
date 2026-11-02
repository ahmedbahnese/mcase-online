CREATE TABLE "departments" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"code" text NOT NULL,
	"description" text,
	"capacity" integer DEFAULT 10 NOT NULL,
	"department_type" text NOT NULL,
	"report_fields_json" text DEFAULT '[]' NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "departments_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "medical_cases" (
	"id" serial PRIMARY KEY NOT NULL,
	"patient_name" text NOT NULL,
	"department_id" integer NOT NULL,
	"age" text,
	"diagnosis" text,
	"symptoms" text,
	"treatment" text,
	"notes" text,
	"parent_name" text,
	"parent_phone" text,
	"national_id" text,
	"file_number" text,
	"case_type" text DEFAULT 'intensive_care_high' NOT NULL,
	"artificial_respiration" text DEFAULT 'no' NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"mobe" text,
	"ventilation_start_date" timestamp with time zone,
	"ventilation_end_date" timestamp with time zone,
	"discharge_reason" text,
	"transfer_destination" text,
	"admission_date" timestamp with time zone NOT NULL,
	"discharge_date" timestamp with time zone,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "waiting_cases" (
	"id" serial PRIMARY KEY NOT NULL,
	"patient_name" text NOT NULL,
	"age" text,
	"address" text,
	"emergency_number" text,
	"file_number" text,
	"diagnosis" text,
	"notes" text,
	"parent_phone" text,
	"national_id" text,
	"medical_report" text,
	"medical_report_name" text,
	"medical_report_data" text,
	"care_type" text NOT NULL,
	"central_room_required" boolean DEFAULT false NOT NULL,
	"central_room_code" text,
	"artificial_respiration" text DEFAULT 'no' NOT NULL,
	"section" text DEFAULT 'reception' NOT NULL,
	"status" text DEFAULT 'waiting' NOT NULL,
	"transfer_destination" text,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "backups" (
	"id" serial PRIMARY KEY NOT NULL,
	"backup_name" text NOT NULL,
	"backup_data" text NOT NULL,
	"record_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" text NOT NULL,
	"value" text,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "settings_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE "incident_reports" (
	"id" serial PRIMARY KEY NOT NULL,
	"incident_type" text NOT NULL,
	"incident_location" text NOT NULL,
	"report_date" timestamp with time zone NOT NULL,
	"report_day" text,
	"report_time" text,
	"total_injured" integer DEFAULT 0 NOT NULL,
	"total_deaths" integer DEFAULT 0 NOT NULL,
	"hospitals_transferred_to" text,
	"cases_json" text DEFAULT '[]' NOT NULL,
	"reporter_name" text,
	"reporter_role" text,
	"status" text DEFAULT 'new' NOT NULL,
	"severity" text DEFAULT 'no_harm' NOT NULL,
	"event_description" text,
	"immediate_action" text,
	"investigation_summary" text,
	"root_cause" text,
	"corrective_action" text,
	"preventive_action" text,
	"action_owner" text,
	"due_date" timestamp with time zone,
	"verification_notes" text,
	"reviewed_by" text,
	"reviewed_at" timestamp with time zone,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ovr_reports" (
	"id" serial PRIMARY KEY NOT NULL,
	"report_number" text NOT NULL,
	"event_date" timestamp with time zone NOT NULL,
	"event_time" text,
	"department" text NOT NULL,
	"location" text NOT NULL,
	"event_type" text NOT NULL,
	"patient_name" text,
	"file_number" text,
	"hospital_supervision" text,
	"administrative_manager" text,
	"severity" text DEFAULT 'no_harm' NOT NULL,
	"description" text NOT NULL,
	"immediate_action" text,
	"reporter_name" text NOT NULL,
	"reporter_role" text,
	"investigator_name" text,
	"investigation_date" timestamp with time zone,
	"status" text DEFAULT 'new' NOT NULL,
	"investigation_summary" text,
	"root_cause" text,
	"corrective_action" text,
	"preventive_action" text,
	"action_owner" text,
	"due_date" timestamp with time zone,
	"verification_notes" text,
	"reviewed_by" text,
	"reviewed_at" timestamp with time zone,
	"closed_by" text,
	"closed_at" timestamp with time zone,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "ovr_reports_report_number_unique" UNIQUE("report_number")
);
--> statement-breakpoint
CREATE TABLE "audit_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"action" text NOT NULL,
	"entity_type" text NOT NULL,
	"entity_id" integer,
	"entity_name" text,
	"details" text,
	"performed_by" text DEFAULT 'المستخدم',
	"created_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"message" text NOT NULL,
	"from_user" text NOT NULL,
	"delivery" text DEFAULT 'announcement' NOT NULL,
	"tone" text DEFAULT 'single' NOT NULL,
	"tone_duration_ms" integer DEFAULT 180 NOT NULL,
	"speak" integer DEFAULT 1 NOT NULL,
	"speech_language" text DEFAULT 'auto' NOT NULL,
	"audience" text DEFAULT 'selected' NOT NULL,
	"recipients_json" text DEFAULT '[]' NOT NULL,
	"read_by_json" text DEFAULT '[]' NOT NULL,
	"created_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "outpatient_appointments" (
	"id" serial PRIMARY KEY NOT NULL,
	"clinic_id" integer NOT NULL,
	"patient_name" text NOT NULL,
	"age" text,
	"phone" text,
	"national_id" text,
	"appointment_date" text NOT NULL,
	"appointment_time" text,
	"queue_number" integer NOT NULL,
	"source" text DEFAULT 'system' NOT NULL,
	"status" text DEFAULT 'waiting' NOT NULL,
	"called_at" timestamp with time zone,
	"completed_at" timestamp with time zone,
	"notes" text,
	"public_token" text,
	"public_token_expires_at" timestamp with time zone,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "outpatient_appointments_public_token_unique" UNIQUE("public_token")
);
--> statement-breakpoint
CREATE TABLE "outpatient_clinics" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"specialty" text,
	"doctor_name" text NOT NULL,
	"room" text,
	"phone" text,
	"daily_capacity" integer DEFAULT 30 NOT NULL,
	"appointment_duration" integer DEFAULT 15 NOT NULL,
	"working_days" text DEFAULT '[]' NOT NULL,
	"work_start" text DEFAULT '09:00' NOT NULL,
	"work_end" text DEFAULT '14:00' NOT NULL,
	"is_open" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "outpatient_booking_requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"channel" text NOT NULL,
	"sender_id" text,
	"raw_text" text NOT NULL,
	"extracted_json" text DEFAULT '{}' NOT NULL,
	"missing_fields_json" text DEFAULT '[]' NOT NULL,
	"status" text DEFAULT 'needs_review' NOT NULL,
	"appointment_id" integer,
	"reviewed_by" text,
	"reviewed_at" timestamp with time zone,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "outpatient_clinic_doctors" (
	"id" serial PRIMARY KEY NOT NULL,
	"clinic_id" integer NOT NULL,
	"doctor_name" text NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "outpatient_clinic_exceptions" (
	"id" serial PRIMARY KEY NOT NULL,
	"clinic_id" integer NOT NULL,
	"exception_date" text NOT NULL,
	"kind" text DEFAULT 'closed' NOT NULL,
	"reason" text,
	"doctor_name" text,
	"work_start" text,
	"work_end" text,
	"created_by" text,
	"created_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "outpatient_message_deliveries" (
	"id" serial PRIMARY KEY NOT NULL,
	"channel" text NOT NULL,
	"recipient" text,
	"template_key" text,
	"body" text NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"error" text,
	"appointment_id" integer,
	"inbound_message_id" integer,
	"retry_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"sent_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "outpatient_message_templates" (
	"id" serial PRIMARY KEY NOT NULL,
	"template_key" text NOT NULL,
	"name" text NOT NULL,
	"body" text NOT NULL,
	"enabled" boolean DEFAULT true NOT NULL,
	"updated_by" text,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "outpatient_message_templates_template_key_unique" UNIQUE("template_key")
);
--> statement-breakpoint
CREATE TABLE "outpatient_services" (
	"id" serial PRIMARY KEY NOT NULL,
	"clinic_id" integer NOT NULL,
	"name" text NOT NULL,
	"duration_minutes" integer DEFAULT 15 NOT NULL,
	"capacity_per_hour" integer DEFAULT 4 NOT NULL,
	"working_days" text DEFAULT '[]' NOT NULL,
	"work_start" text DEFAULT '09:00' NOT NULL,
	"work_end" text DEFAULT '14:00' NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "waiting_case_attachments" (
	"id" serial PRIMARY KEY NOT NULL,
	"waiting_case_id" integer NOT NULL,
	"category" text NOT NULL,
	"file_name" text NOT NULL,
	"mime_type" text NOT NULL,
	"file_data" text NOT NULL,
	"is_current" boolean DEFAULT true NOT NULL,
	"uploaded_by" text,
	"created_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "inbound_messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"channel" text NOT NULL,
	"external_message_id" text,
	"sender_id" text NOT NULL,
	"sender_name" text,
	"body" text,
	"raw_payload" text,
	"status" text DEFAULT 'received' NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	CONSTRAINT "inbound_messages_external_message_id_unique" UNIQUE("external_message_id")
);
