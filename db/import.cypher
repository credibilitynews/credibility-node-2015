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

CREATE (:Bias {id: "0", name: "fact"});
CREATE (:Bias {id: "1", name: "left"});
CREATE (:Bias {id: "2", name: "right"});

USING PERIODIC COMMIT
LOAD CSV WITH HEADERS FROM "file:/tmp/pgdump/links.csv" AS row
MATCH (link:Link {id: row.id})
MATCH (bias:Bias {id: row.bias})
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
MERGE (comment)-[regard:COMMENT_ON]->(link)
MERGE (user)-[submit:submit]->(comment)
ON CREATE SET submit.created_at = row.created_at
RETURN *;

USING PERIODIC COMMIT
LOAD CSV WITH HEADERS FROM "file:/tmp/pgdump/tags.csv" AS row
MATCH (tag:Tag {id: row.id})
MATCH (parent:Tag {id: row.parent_id})
MERGE (parent)-[b:PARENT_OF]->(tag)
RETURN *;

MATCH (:User)-[s:SUBMIT]-(item)
MERGE (y:Year {year: substring(s.created_at, 0, 4)})
MERGE (m:Month {month: substring(s.created_at, 5, 2)})
MERGE (d:Day {day: substring(s.created_at, 8, 2)})
RETURN *;

CREATE CONSTRAINT ON (y:Year) ASSERT y.year IS UNIQUE
CREATE CONSTRAINT ON (m:Month) ASSERT m.month IS UNIQUE
CREATE CONSTRAINT ON (d:Day) ASSERT d.day IS UNIQUE

MATCH (y:Year)
MATCH (m:Month)
MERGE (y)-[:YYYYMM]->(m)
RETURN *;

MATCH (m:Month)
MATCH (d:Day)
MERGE (m)-[:MMDD]->(d)
RETURN *;

MATCH (:User)-[s:SUBMIT]-(item)
MATCH (y:Year {year: substring(s.created_at, 0, 4)})
MATCH (m:Month {month: substring(s.created_at, 5, 2)})
MATCH (d:Day {day: substring(s.created_at, 8, 2)})
MATCH (y)-[ym:YYYYMM]->(m)
MATCH (m)-[md:MMDD]->(d)
MERGE (y)-[:YYYYMM]->(m)-[:MMDD]->(d)<-[q:SUBMITTED_ON]-(item)
RETURN *;

// latest link
MATCH (u:User)-[:SUBMIT]-(l:Topic)--[:SUBMITTED_ON]-(d:Day)--(m:Month)--(y:Year)
RETURN u, l, y, m, d
ORDER BY toInt(y.year) DESC, toInt(m.month) DESC, toInt(d.day) DESC LIMIT 5;
