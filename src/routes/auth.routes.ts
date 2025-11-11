import { Elysia, t } from "elysia";

export const authRoutes = new Elysia({ prefix: "/auth" }).post(
  "/login",
  ({ body }) => {
    const { email, password } = body;
    return {
      message: "Login Successfully!",
      data: { email, password },
    };
  },
  {
    body: t.Object({
      email: t.String({ format: "email" }),
      password: t.String(),
    }),
  }
);
