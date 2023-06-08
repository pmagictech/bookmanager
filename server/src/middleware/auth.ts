import { ExpressContextFunctionArgument } from "@apollo/server/express4";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
import type { User } from "../types.js";

export const authenticate = (next) => (root, args, context, info) => {
  if (!context.user) {
    throw new GraphQLError("User is not authenticated", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });
  }

  return next(root, args, context, info);
};

export const getContextHandler =
  (db) =>
  async ({ req }: ExpressContextFunctionArgument) => {
    let user: User;
    if (req.headers.token === "") return { user, db };

    try {
      const { id } = jwt.verify(req.headers.token, process.env.JWT_SECRET);
      const res = await db.query("SELECT * FROM users WHERE id = $1", [id]);

      user = res.rows[0];
      return {
        user,
        db,
        token: jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURATION }),
      };
    } catch (err: any) {
      console.error(req.headers.token, err);
      return { user, db };
    }
  };
