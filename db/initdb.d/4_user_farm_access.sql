CREATE TABLE "user_orchard_access" (
    user_id INT REFERENCES "user" (id),
    orchard_id INT REFERENCES orchard (id),
    PRIMARY KEY (user_id, orchard_id)
);