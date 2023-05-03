import pubsub from "../pubSub.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { authenticate } from "../middleware/auth.js";


export const userQuery = {
  currentUser: authenticate((_: any, __: any, { user }) => user),
  user: authenticate(async (_: any, { id }, { db }) => {
    const res = await db.query("SELECT * FROM users WHERE id = $1", [id]);

    return res.rows[0];
  }),
  getToken: async (_: any, { email, password }, { db }) => {
    const res = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = res.rows[0];
    const invalidMessage = {
      code: 403,
      success: false,
      message: "Invalid details",
    };

    if (!user) {
      return invalidMessage;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      return {
        code: 200,
        success: true,
        message: "",
        token: jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" }),
      };
    } else {
      return invalidMessage;
    }
  },
};

export const userMutation = {
  addUser: async (_: any, { name, email, password }, { db }) => {
    try {
      const passwordHash = await bcrypt.hash(password, 10);
      const res = await db.query(
        "INSERT INTO users (name, email, password, created_at) VALUES($1, $2, $3, $4) RETURNING *",
        [name, email, passwordHash, Date.now()]
      );

      const id = res.rows[0].id;

      pubsub.publish("USER_ADDED", { userAdded: { id, name, email } });

      return {
        code: 200,
        success: true,
        message: "User added successfully",
        token: jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" }),
      };
    } catch (e) {
      console.error(e.stack);
      return {
        code: 400,
        success: false,
        message: "Error",
      };
    }
  },
};