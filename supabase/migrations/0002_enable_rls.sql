-- Row Level Security for the custom-cookie authenticated application.
-- The web app authenticates through bsch_session and the API uses a trusted
-- server-side PostgreSQL connection; it does not use Supabase Auth JWTs.
-- Therefore public Data API roles are denied by default, while service_role
-- remains explicitly allowed for trusted server-side integrations.

DO $$
DECLARE
  table_name text;
BEGIN
  FOREACH table_name IN ARRAY ARRAY[
    'settings',
    'departments',
    'medical_cases',
    'waiting_cases',
    'waiting_case_attachments',
    'incident_reports',
    'ovr_reports',
    'audit_logs',
    'backups',
    'outpatient_clinics',
    'outpatient_appointments',
    'outpatient_services',
    'outpatient_clinic_doctors',
    'outpatient_clinic_exceptions',
    'outpatient_message_templates',
    'outpatient_booking_requests',
    'outpatient_message_deliveries',
    'inbound_messages',
    'notifications'
  ]
  LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', table_name);
    EXECUTE format(
      'DROP POLICY IF EXISTS %I ON public.%I',
      table_name || '_service_role_access',
      table_name
    );
    EXECUTE format(
      'CREATE POLICY %I ON public.%I FOR ALL TO service_role USING (true) WITH CHECK (true)',
      table_name || '_service_role_access',
      table_name
    );
  END LOOP;
END $$;
