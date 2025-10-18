INSERT INTO "user" (email, password) VALUES ('admin', 'admin');
INSERT INTO "user" (email, password) VALUES ('user1', 'user');
INSERT INTO "user" (email, password) VALUES ('user2', 'user');

INSERT INTO "farm" (name) VALUES ( 'TestBetrieb1' );
INSERT INTO "farm" (name) VALUES ( 'TestBetrieb2' );

INSERT INTO "orchard" (name, farm_id) VALUES ( 'TestAnlage1', 1 );
INSERT INTO "orchard" (name, farm_id) VALUES ( 'TestAnlage2', 1 );
INSERT INTO "orchard" (name, farm_id) VALUES ( 'TestAnlage3', 2 );

INSERT INTO "user_farm_access" (user_id, farm_id) VALUES (2, 1);
INSERT INTO "user_farm_access" (user_id, farm_id) VALUES (3, 2);
