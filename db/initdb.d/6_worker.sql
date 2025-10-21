CREATE TABLE "worker" (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(128) NOT NULL,
    lastname VARCHAR(128) NOT NULL,
    deleted BOOLEAN NOT NULL
);