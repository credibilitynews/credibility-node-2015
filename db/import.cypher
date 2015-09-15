USING PERIODIC COMMIT
LOAD CSV WITH HEADERS FROM "file:/tmp/pgdump/topics.csv" AS row
CREATE (:Topic {id: row.id, title: row.title, hashtag: row.hashtag, active: row.active});

USING PERIODIC COMMIT
LOAD CSV WITH HEADERS FROM "file:/tmp/pgdump/users.csv" AS row
CREATE (:User {id: row.id, name: row.name, email: row.email, password: row.password, active: row.active});

USING PERIODIC COMMIT
LOAD CSV WITH HEADERS FROM "file:/tmp/pgdump/links.csv" AS row
CREATE (:Link {id: row.id, title: row.title, url: row.url, content_type: row.content_type, active: row.active});

USING PERIODIC COMMIT
LOAD CSV WITH HEADERS FROM "file:/tmp/pgdump/tags.csv" AS row
CREATE (:Tag {id: row.id, name: row.name, code: row.code});

CREATE INDEX ON :Topic(id);
CREATE INDEX ON :Topic(name);
CREATE INDEX ON :User(id);
CREATE INDEX ON :User(name);
CREATE INDEX ON :Link(id);
CREATE INDEX ON :Link(title);
CREATE INDEX ON :Tag(id);
CREATE INDEX ON :Tag(name);

USING PERIODIC COMMIT
LOAD CSV WITH HEADERS FROM "file:/tmp/pgdump/topic_tags.csv" AS row
MATCH (topic:Topic {id: row.topic_id})
MATCH (tag:Tag {id: row.tag_id})
MERGE (topic)-[tagged:TAGGED_WITH]->(tag)
RETURN *;

USING PERIODIC COMMIT
LOAD CSV WITH HEADERS FROM "file:/tmp/pgdump/topics.csv" AS row
MATCH (topic:Topic {id: row.id})
MATCH (user:User {id: row.user_id})
MERGE (user)-[submit:SUBMIT]->(topic)
ON CREATE SET submit.created_at = row.created_at
RETURN *;

USING PERIODIC COMMIT
LOAD CSV WITH HEADERS FROM "file:/tmp/pgdump/links.csv" AS row
MATCH (link:Link {id: row.id})
MATCH (user:User {id: row.user_id})
MATCH (topic:Topic {id: row.topic_id})
MERGE (user)-[submit:SUBMIT]->(link)
MERGE (link)-[about:ABOUT]->(topic)
ON CREATE SET submit.created_at = row.created_at
RETURN *;

CREATE (:BIAS {id: "0", name: "fact"});
CREATE (:BIAS {id: "1", name: "left"});
CREATE (:BIAS {id: "2", name: "right"});

USING PERIODIC COMMIT
LOAD CSV WITH HEADERS FROM "file:/tmp/pgdump/links.csv" AS row
MATCH (link:Link {id: row.id})
MATCH (bias:BIAS {id: row.bias})
MERGE (link)-[b:BIAS_TOWARDS]->(bias)
RETURN *;

USING PERIODIC COMMIT
LOAD CSV WITH HEADERS FROM "file:/tmp/pgdump/comments.csv" AS row
CREATE (:Comment {id: row.id, content: row.content, active: row.active});

USING PERIODIC COMMIT
LOAD CSV WITH HEADERS FROM "file:/tmp/pgdump/comments.csv" AS row
MATCH (comment:Comment {id: row.id})
MATCH (user:User {id: row.user_id})
MATCH (link:Link {id: row.link_id})
MERGE (comment)-[regard:REGARDING]->(link)
MERGE (user)-[submit:submit]->(comment)
ON CREATE SET submit.created_at = row.created_at
RETURN *;
