import { authenticate } from "../middleware/auth.js";
import pubsub from "../pubSub.js";
import type { MyContext, AddBookArgs } from "../types.js";

export const bookMutation = {
  addBook: authenticate(async (_: any, { title, author, date, coverImage }: AddBookArgs, { db, user }: MyContext) => {
    try {
      const res = await db.query(
        "INSERT INTO books (title, author, date, cover_image, user_id, created_at) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
        [title, author, date, coverImage, user.id, Date.now()]
      );

      pubsub.publish("BOOK_ADDED", { bookAdded: { title, author } });

      return {
        code: 200,
        success: true,
        message: "User added successfully",
        book: res.rows[0],
      };
    } catch (e) {
      return {
        code: 400,
        success: false,
        message: "Error",
      };
    }
  }),
};

export const bookQuery = {
  books: authenticate(async (_: any, { title, author, date }, { db }) => {
    try {
      let sql = "SELECT * FROM books";
      let where = "";
      const values = [];
      if (title) {
        where = "title = $1";
        values.push(title);
      }

      if (author) {
        where = `${where !== "" ? "AND" : ""} author = $${values.length + 1}`;
        values.push(author);
      }

      if (date && date.eq) {
        where = `${where !== "" ? "AND" : ""} date = $${values.length + 1}`;
        values.push(date.eq);
      } else if (date && date.between) {
        where = `${where !== "" ? "AND" : ""} date > $${values.length + 1} AND date > $${values.length + 2}`;
        values.push(date.between.from, date.between.to);
      }

      const res = await db.query(sql, values);

      const data = res.rows.map((book) => ({ ...book, coverImage: book.cover_image }));

      return data;
    } catch (e) {
      console.error(e.stack);
      return {
        code: 400,
        success: false,
        message: "Error",
      };
    }
  }),
};
