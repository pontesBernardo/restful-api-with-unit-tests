import { t } from "elysia";
import { userRepository } from "../repositories/user.repository";
import { randomUUID } from "node:crypto";

export const authController = {
  register: {
    handler: ({ body, set }: any) => {
      const { fullName, email, password, passwordConfirmation } = body;

      if (password !== passwordConfirmation) {
        set.status = 400;
        return { error: "Passwords do not match" };
      }

      const existingUser = userRepository.findByEmail(email);
      if (existingUser) {
        set.status = 400;
        return { error: "Email already registered" };
      }

      const newUser = userRepository.create({
        id: randomUUID(),
        fullName,
        email,
        password,
      });

      return {
        message: "User registered successfully!",
        data: newUser,
      };
    },
    body: t.Object({
      fullName: t.String(),
      email: t.String({ format: "email" }),
      password: t.String(),
      passwordConfirmation: t.String(),
    }),
  },

  login: {
    handler: ({ body, set }: any) => {
      const { email, password } = body;

      const user = userRepository.findByEmail(email);
      if (!user || user.password !== password) {
        set.status = 401;
        return { error: "Invalid credentials" };
      }

      return {
        message: "Login successful!",
        data: { email },
      };
    },
    body: t.Object({
      email: t.String({ format: "email" }),
      password: t.String(),
    }),
  },
};
