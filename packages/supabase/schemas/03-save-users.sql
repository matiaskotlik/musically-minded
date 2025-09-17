-- save all non-generated columns in auth.users table
-- now we can regenerate the database schema without losing user data
do $$
    declare
        sqlstmt text;
    begin
        sqlstmt := 'create table if not exists users_backup as ' ||
                   '(select ' ||
                   array_to_string(array(select
                                             column_name
                                         from information_schema.columns
                                         where
                                             table_schema = 'auth' and
                                             table_name = 'users' and
                                             is_generated = 'NEVER'),
                                   ',') ||
                   ' from auth.users)';
        raise notice 'running: %', sqlstmt;
        execute sqlstmt;
    end
$$;
