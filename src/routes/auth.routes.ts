import { randomUUID } from "node:crypto";
import { Elysia, t } from "elysia";

const users: {
  id: string;
  fullName: string;
  email: string;
  password: string;
}[] = [];

export const authRoutes = new Elysia({ prefix: "/auth" })
  .post(
    "/register",
    ({ body, set }) => {
      const { fullName, email, password, passwordConfirmation } = body;

      if (password !== passwordConfirmation) {
        set.status = 400;
        return { error: "Passwords do not match!" };
      }

      if (users.find((u) => u.email === email)) {
        set.status = 400;
        return { error: "User already exists!" };
      }

      const newUser = { id: randomUUID(), fullName, email, password };
      users.push(newUser);

      return {
        message: "Register Successfully!",
        data: newUser,
      };
    },
    {
      body: t.Object({
        fullName: t.String(),
        email: t.String({ format: "email" }),
        password: t.String(),
        passwordConfirmation: t.String(),
      }),
    }
  )
  .post(
    "/login",
    ({ body, set }) => {
      const { email, password } = body;
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        set.status = 401;
        return { error: "Invalid credentials!" };
      }

      return {
        message: "Login Successfully!",
        data: { id: user.id, email: user.email },
      };
    },
    {
      body: t.Object({
        email: t.String({ format: "email" }),
        password: t.String(),
      }),
    }
  );
