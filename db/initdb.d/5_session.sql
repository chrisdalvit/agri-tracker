CREATE TABLE "session" (
    token VARCHAR(128) PRIMARY KEY,
    user_id INT REFERENCES "user" (id) NOT NULL,
    expiration TIMESTAMP NOT NULL
);