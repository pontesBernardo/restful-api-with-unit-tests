import { t } from "elysia";
import { users } from "./auth.controller";

export const userController = {
  me: {
    handler: ({ query, set }: any) => {
      const { email } = query;

      const user = users.find((u) => u.email === email);

      if (!user) {
        set.status = 404;
        return { error: "User not found" };
      }

      return {
        message: "User profile found!",
        data: user,
      };
    },
    query: t.Object({
      email: t.String({ format: "email" }),
    }),
  },
};
