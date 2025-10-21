INSERT INTO "user" (email, password) VALUES ('admin', 'admin');
INSERT INTO "user" (email, password) VALUES ('user1', 'user');
INSERT INTO "user" (email, password) VALUES ('user2', 'user');

INSERT INTO "orchard" (name) VALUES ( 'TestAnlage1' );
INSERT INTO "orchard" (name) VALUES ( 'TestAnlage2' );
INSERT INTO "orchard" (name) VALUES ( 'TestAnlage3' );

INSERT INTO "user_orchard_access" (user_id, orchard_id) VALUES (2, 1);
INSERT INTO "user_orchard_access" (user_id, orchard_id) VALUES (3, 2);

INSERT INTO "worker" (firstname, lastname, deleted) VALUES ('Christian', 'Dalvit', FALSE);
INSERT INTO "worker" (firstname, lastname, deleted) VALUES ('Marco', 'Dalvit', FALSE);
