-- private schema
drop schema if exists private cascade;

create schema private;

grant usage on schema private to service_role;

grant usage on schema private to supabase_auth_admin;

-- extensions
create extension if not exists timescaledb
with
  schema extensions;
