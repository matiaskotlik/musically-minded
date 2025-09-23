set
  statement_timeout = 0;

set
  lock_timeout = 0;

set
  idle_in_transaction_session_timeout = 0;

set
  client_encoding = 'UTF8';

set
  standard_conforming_strings = on;

select
  pg_catalog.set_config ('search_path', '', false);

set
  check_function_bodies = false;

set
  xmloption = content;

set
  client_min_messages = warning;

set
  row_security = off;

comment on schema "public" is 'standard public schema';

create extension if not exists "pg_graphql"
with
  schema "graphql";

create extension if not exists "pg_stat_statements"
with
  schema "extensions";

create extension if not exists "pgcrypto"
with
  schema "extensions";

create extension if not exists "supabase_vault"
with
  schema "vault";

create extension if not exists "uuid-ossp"
with
  schema "extensions";

alter publication "supabase_realtime" owner to "postgres";

grant usage on schema "public" to "postgres";

grant usage on schema "public" to "anon";

grant usage on schema "public" to "authenticated";

grant usage on schema "public" to "service_role";

alter default privileges for role "postgres" in schema "public"
grant all on sequences to "postgres";

alter default privileges for role "postgres" in schema "public"
grant all on sequences to "anon";

alter default privileges for role "postgres" in schema "public"
grant all on sequences to "authenticated";

alter default privileges for role "postgres" in schema "public"
grant all on sequences to "service_role";

alter default privileges for role "postgres" in schema "public"
grant all on functions to "postgres";

alter default privileges for role "postgres" in schema "public"
grant all on functions to "anon";

alter default privileges for role "postgres" in schema "public"
grant all on functions to "authenticated";

alter default privileges for role "postgres" in schema "public"
grant all on functions to "service_role";

alter default privileges for role "postgres" in schema "public"
grant all on tables to "postgres";

alter default privileges for role "postgres" in schema "public"
grant all on tables to "anon";

alter default privileges for role "postgres" in schema "public"
grant all on tables to "authenticated";

alter default privileges for role "postgres" in schema "public"
grant all on tables to "service_role";

reset all;
