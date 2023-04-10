CREATE TABLE IF NOT EXISTS users (
  id serial PRIMARY KEY,
  name character varying NOT NULL,
  email character varying NOT NULL,
  password character varying NOT NULL,
  created_at bigint NOT NULL
);

CREATE TABLE IF NOT EXISTS books (
  id serial PRIMARY KEY,
  title character varying NOT NULL,
  author character varying NOT NULL,
  cover_image character varying NOT NULL,
  collection_type smallint NOT NULL,
  date bigint NOT NULL,
  created_at bigint NOT NULL
);