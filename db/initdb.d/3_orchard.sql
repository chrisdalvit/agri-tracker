CREATE TABLE "orchard" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    farm_id INT REFERENCES farm (id)
);
