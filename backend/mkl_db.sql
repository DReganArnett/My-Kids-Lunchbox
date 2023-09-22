-- from terminal run:
-- psql < mkl_db.sql

DROP DATABASE mkl_db;
CREATE DATABASE mkl_db;

\connect mkl_db

\i mkl_db-schema.sql
\i mkl_db-seed.sql

\echo 'Delete and recreate mkl-db_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE mkl_db_test;
CREATE DATABASE mkl_db_test;
\connect mkl_db_test

\i mkl_db-schema.sql






