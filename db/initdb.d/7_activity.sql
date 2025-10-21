CREATE TABLE "activity" (
    id SERIAL PRIMARY KEY,
    title VARCHAR(128) NOT NULL,
    begin_timestamp TIMESTAMP NOT NULL,
    end_timestamp TIMESTAMP NOT NULL,
    worker_id INT REFERENCES worker (id) NOT NULL
);