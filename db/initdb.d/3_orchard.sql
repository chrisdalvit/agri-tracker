CREATE TABLE "orchard" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    fram_id INT REFERENCES farm (id)
);