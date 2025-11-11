import { Elysia } from "elysia";
import node from "@elysiajs/node";
import { authRoutes } from "./routes/auth.routes";

export const app = new Elysia({ adapter: node() })
  .get("/", () => {
    return { message: "Hello, World!" };
  })
  .use(authRoutes)
  .listen(3000);

console.log("🚀 Server running on http://localhost:3000");
