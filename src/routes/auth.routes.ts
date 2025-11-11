import { Elysia } from "elysia";
import { authController } from "../controllers/auth.controller";

export const authRoutes = new Elysia({ prefix: "/auth" })
  .post("/register", authController.register.handler, {
    body: authController.register.body,
  })
  .post("/login", authController.login.handler, {
    body: authController.login.body,
  });
