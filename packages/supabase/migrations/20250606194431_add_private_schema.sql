create schema if not exists "private";

grant usage on schema private to service_role;

grant usage on schema private to supabase_auth_admin;
