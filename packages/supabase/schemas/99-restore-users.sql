-- restore auth.users table
do $$
    declare
sqlstmt text;
begin
        sqlstmt
:= 'insert into auth.users ('
                       || array_to_string(array(select column_name
                                                from information_schema.columns
                                                where table_schema = 'auth'
                                                  and table_name = 'users'
                                                  and is_generated = 'NEVER'),
                                          ',') ||
                   ') select * from users_backup';
        raise
notice 'running: %', sqlstmt;
execute sqlstmt;
drop table users_backup;
end
$$;
