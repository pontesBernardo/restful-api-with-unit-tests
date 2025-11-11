import { Elysia } from "elysia";
import { userController } from "../controllers/user.controller";

export const userRoutes = new Elysia({ prefix: "/user" }).get(
  "/me",
  userController.me.handler,
  {
    query: userController.me.query,
  }
);
