CREATE TABLE users(
    id serial PRIMARY KAY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    password TEXT,
    birthday DATE,
    is_male BOOLEAN,
    created_at timestamp NOT NULL,
    updated_at timestamp NOT NULL
)

CREATE TABLE users(
    id serial PRIMARY KEY,
    first_name VARCHAR(32) NOT NULL,
    last_name VARCHAR(64) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password TEXT,
    birthday DATE CHECK (birthday<=CURRENT_DATE),
    is_male BOOLEAN,
    created_at timestamp NOT NULL,
    updated_at timestamp NOT NULL
)