CREATE TABLE IF NOT EXISTS users (
  id serial PRIMARY KEY,
  name character varying NOT NULL,
  email character varying NOT NULL,
  password character varying NOT NULL,
  created_at bigint NOT NULL,
  UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS books (
  id serial PRIMARY KEY,
  title character varying NOT NULL,
  author character varying NOT NULL,
  cover_image character varying NOT NULL,
  date bigint NOT NULL,
  user_id integer NOT NULL references users(id),
  created_at bigint NOT NULL,
  UNIQUE (title)
);

CREATE TABLE IF NOT EXISTS users_books_info (
  id serial PRIMARY KEY,
  user_id integer NOT NULL references users(id),
  book_id integer NOT NULL references books(id),
  collection smallint NOT NULL,
  rating smallint NOT NULL,
  updated_at bigint NOT NULL
);