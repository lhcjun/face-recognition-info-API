-- make sure the table won't be half completed (all completes / all fails)
BEGIN TRANSACTION;

CREATE TABLE users (
    id serial PRIMARY KEY,
    name VARCHAR (100),
    email text UNIQUE NOT NULL,
    entries BIGINT DEFAULT 0,
    joined TIMESTAMP NOT NULL,
    age SMALLINT, 
    pet VARCHAR(100)
);

COMMIT;