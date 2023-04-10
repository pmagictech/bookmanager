import pubsub from "../pubSub.js";

export async function user(_: any, { id }, { db }) {
  const res = await db.query("SELECT * FROM users WHERE id = $1", [id]);
  console.log(res);

  return res.rows[0];
}

export async function addUser(_: any, { name, email, password }, { db }) {
  try {
    const res = await db.query("INSERT INTO users (name, email, password, created_at) VALUES($1, $2, $3, $4) RETURNING *", [
      name,
      email,
      password,
      Date.now(),
    ]);

    pubsub.publish("USER_ADDED", { userAdded: { id: res.rows[0].id, name, email } });

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
