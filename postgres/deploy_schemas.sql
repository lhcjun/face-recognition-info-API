-- Deploy database tables
\i '/docker-entrypoint-initdb.d/tables/users.sql'
\i '/docker-entrypoint-initdb.d/tables/login.sql'

-- Only for testing purposes, this file will add dummy data.
\i '/docker-entrypoint-initdb.d/seed/seed.sql'
-- execute scripts