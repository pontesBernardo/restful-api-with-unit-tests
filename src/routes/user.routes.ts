import { Elysia, t } from "elysia";
import { users } from "./auth.routes";

export const userRoutes = new Elysia({ prefix: "/user" }).get(
  "/me",
  ({ query, set }) => {
    const { email } = query;

    const user = users.find((user) => user.email === email);
    if (!user) {
      set.status = 404;
      return { error: "User not found" };
    }

    return {
      message: "User profile found!",
      data: user,
    };
  },
  {
    query: t.Object({
      email: t.String({ format: "email" }),
    }),
  }
);
