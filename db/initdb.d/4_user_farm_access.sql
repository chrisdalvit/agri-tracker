CREATE TABLE "user_farm_access" (
    user_id INT REFERENCES "user" (id),
    farm_id INT REFERENCES farm (id),
    PRIMARY KEY (user_id, farm_id)
);