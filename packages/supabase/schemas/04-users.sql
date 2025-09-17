-- users table
truncate auth.users cascade;

-- drop table will not cascade to auth.users
drop table if exists users cascade;

create table users (
  id uuid not null primary key references auth.users on delete cascade on update cascade,
  name text not null default 'New user' check (
    0 < length(name)
    and length(name) <= 255
  ),
  avatar_url text null default null
);

alter table users enable row level security;

-- users can select their own data
create policy self_select on users for
select
  to authenticated using (
    id = (
      select
        auth.uid ()
    )
  );

-- create user profile when auth user is created
create or replace function private.handle_auth_user_created () returns trigger security definer
set
  search_path = '' language plpgsql as $$
begin
  insert into public.users (id) values (new.id);
  return new;
end;
$$;

create or replace trigger on_auth_user_created
after insert on auth.users for each row
execute procedure private.handle_auth_user_created ();

-- drop auth user when user profile is deleted
create or replace function private.handle_public_user_deleted () returns trigger security definer
set
  search_path = '' language plpgsql as $$
begin
  delete from auth.users where id = old.id;
  return old;
end;
$$;

create or replace trigger on_auth_user_deleted
after delete on public.users for each row
execute procedure private.handle_public_user_deleted ();
