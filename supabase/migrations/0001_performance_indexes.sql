-- Performance indexes for the growing tables used by the API list and dashboard queries.
-- Safe to run more than once during deployment.
CREATE INDEX IF NOT EXISTS medical_cases_department_status_admission_idx
  ON medical_cases (department_id, status, admission_date DESC, id DESC);
CREATE INDEX IF NOT EXISTS medical_cases_status_admission_idx
  ON medical_cases (status, admission_date DESC, id DESC);
CREATE INDEX IF NOT EXISTS medical_cases_respiration_admission_idx
  ON medical_cases (artificial_respiration, admission_date DESC, id DESC);
CREATE INDEX IF NOT EXISTS waiting_cases_section_status_created_idx
  ON waiting_cases (section, status, created_at ASC, id ASC);
CREATE INDEX IF NOT EXISTS waiting_cases_status_created_idx
  ON waiting_cases (status, created_at ASC, id ASC);
CREATE INDEX IF NOT EXISTS waiting_case_attachments_case_created_idx
  ON waiting_case_attachments (waiting_case_id, created_at ASC, id ASC);
CREATE INDEX IF NOT EXISTS incident_reports_created_idx
  ON incident_reports (created_at DESC, id DESC);
CREATE INDEX IF NOT EXISTS incident_reports_status_created_idx
  ON incident_reports (status, created_at DESC, id DESC);
CREATE INDEX IF NOT EXISTS ovr_reports_status_created_idx
  ON ovr_reports (status, created_at DESC, id DESC);
CREATE INDEX IF NOT EXISTS ovr_reports_event_date_idx
  ON ovr_reports (event_date DESC, id DESC);
CREATE INDEX IF NOT EXISTS audit_logs_created_idx
  ON audit_logs (created_at DESC, id DESC);
CREATE INDEX IF NOT EXISTS outpatient_appointments_date_clinic_queue_idx
  ON outpatient_appointments (appointment_date, clinic_id, queue_number, id);
CREATE INDEX IF NOT EXISTS outpatient_appointments_date_status_idx
  ON outpatient_appointments (appointment_date, status, id);
CREATE INDEX IF NOT EXISTS outpatient_services_clinic_active_idx
  ON outpatient_services (clinic_id, active, id);
CREATE INDEX IF NOT EXISTS outpatient_clinic_doctors_clinic_active_idx
  ON outpatient_clinic_doctors (clinic_id, active, id);
CREATE INDEX IF NOT EXISTS outpatient_clinic_exceptions_clinic_date_idx
  ON outpatient_clinic_exceptions (clinic_id, exception_date, id);
CREATE INDEX IF NOT EXISTS outpatient_message_deliveries_created_idx
  ON outpatient_message_deliveries (created_at DESC, id DESC);
CREATE INDEX IF NOT EXISTS outpatient_booking_requests_status_created_idx
  ON outpatient_booking_requests (status, created_at DESC, id DESC);
CREATE INDEX IF NOT EXISTS inbound_messages_channel_created_idx
  ON inbound_messages (channel, created_at DESC, id DESC);
CREATE INDEX IF NOT EXISTS notifications_created_idx
  ON notifications (created_at DESC, id DESC);
