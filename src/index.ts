import { Elysia } from "elysia";
import node from "@elysiajs/node";

const app = new Elysia({ adapter: node() })
  .get("/", () => {
    return { message: "Hello, World!" };
  })
  .listen(3000);

console.log("🚀 Server running on http://localhost:3000");
