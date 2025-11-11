import { Elysia } from "elysia";
import node from "@elysiajs/node";
import { authRoutes } from "./routes/auth.routes";
import { userRoutes } from "./routes/user.routes";

export const app = new Elysia({ adapter: node() })
  .get("/", () => {
    return { message: "Hello, World!" };
  })
  .use(authRoutes)
  .use(userRoutes)
  .listen(3000);

console.log("🚀 Server running on http://localhost:3000");
