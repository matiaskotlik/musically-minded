insert into
  auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  )
values
  (
    '00000000-0000-0000-0000-000000000000',
    uuid_generate_v4 (),
    'authenticated',
    'authenticated',
    'user0@test.com',
    crypt ('password', gen_salt ('bf')),
    current_timestamp,
    current_timestamp,
    current_timestamp,
    '{
          "provider": "email",
          "providers": [
            "email"
          ]
        }',
    '{}',
    current_timestamp,
    current_timestamp,
    '',
    '',
    '',
    ''
  );

-- test user email identity
insert into
  auth.identities (
    id,
    user_id,
    identity_data,
    provider,
    provider_id,
    last_sign_in_at,
    created_at,
    updated_at
  )
values
  (
    uuid_generate_v4 (),
    (
      select
        id
      from
        auth.users
      where
        email = 'user0@test.com'
    ),
    format(
      '{"sub":"%s","email":"%s"}',
      (
        select
          id
        from
          auth.users
        where
          email = 'user0@test.com'
      )::text,
      'user0@test.com'
    )::jsonb,
    'email',
    uuid_generate_v4 (),
    current_timestamp,
    current_timestamp,
    current_timestamp
  );

insert into
  public.users (id)
select
  id
from
  auth.users;
