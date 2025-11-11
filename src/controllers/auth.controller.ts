import { t } from "elysia";

export const users: any[] = [];

export const authController = {
  register: {
    handler: ({ body, set }: any) => {
      const { fullName, email, password, passwordConfirmation } = body;

      if (password !== passwordConfirmation) {
        set.status = 400;
        return { error: "Passwords do not match" };
      }

      if (users.find((user) => user.email === email)) {
        set.status = 400;
        return { error: "Email already registered" };
      }

      const newUser = { id: crypto.randomUUID(), fullName, email, password };
      users.push(newUser);

      return {
        message: "User registered successfully!",
        data: newUser,
      };
    },
    body: t.Object({
      fullName: t.String(),
      email: t.String({ format: "email" }),
      password: t.String({ minLength: 4 }),
      passwordConfirmation: t.String(),
    }),
  },

  login: {
    handler: ({ body, set }: any) => {
      const { email, password } = body;

      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        set.status = 401;
        return { error: "Invalid credentials" };
      }

      return {
        message: "Login successful",
        data: { email },
      };
    },
    body: t.Object({
      email: t.String({ format: "email" }),
      password: t.String(),
    }),
  },
};
