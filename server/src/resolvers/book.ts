import pubsub from "../pubSub.js";

export async function addBook(_: any, { title, author, date, cover_image, collection }, { db }) {
  try {
    const res = await db.query("INSERT INTO books (title, author, date, cover_image, collection_type) VALUES($1, $2, $3, $4, $5) RETURNING *", [
      title,
      author,
      date,
      cover_image,
      collection
    ]);

    pubsub.publish("USER_ADDED", { bookAdded: { title, author } });

    return {
      code: 200,
      success: true,
      message: "User added successfully",
      user: res.rows[0],
    };
  } catch (e) {
    console.error(e.stack);
    return {
      code: 400,
      success: false,
      message: "Error",
    };
  }
}

export async function books(_: any, { title, author, date }, { db }) {
  try {
    let sql = "SELECT * FROM books";
    let where = "";
    const values = [];
    if(title){
      where = 'title = $1';
      values.push(title);
    }

    if(author){
      where = `${where !== "" ? "AND":""} author = $${values.length + 1}`
      values.push(author);
    }

    if (date && date.eq) {
      where = `${where !== "" ? "AND" : ""} date = $${values.length + 1}`;
      values.push(date.eq);
    }
    else if (date && date.between) {
      where = `${where !== "" ? "AND" : ""} date > $${values.length + 1} AND date > $${values.length + 2}`;
      values.push(date.between.from, date.between.to);
    }

    const res = await db.query(sql, values);
    console.log(res);

    return res.rows[0];
  } catch (e) {
    console.error(e.stack);
    return {
      code: 400,
      success: false,
      message: "Error",
    };
  }
}
