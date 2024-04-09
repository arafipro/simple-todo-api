import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono<{ Bindings: Bindings }>().basePath("/api");

app.use(
  "/todos",
  cors({
    origin: ["{許可するURL1}", "{許可するURL2}"],
    allowHeaders: [
      "X-Custom-Header",
      "Upgrade-Insecure-Requests",
      "Content-Type",
    ],
    allowMethods: ["GET", "POST", "OPTIONS"],
    exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
    maxAge: 600,
    credentials: true,
  })
);

app.use(
  "/todos/*",
  cors({
    origin: ["{許可するURL1}", "{許可するURL2}"],
    allowHeaders: [
      "X-Custom-Header",
      "Upgrade-Insecure-Requests",
      "Content-Type",
    ],
    allowMethods: ["GET", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
    maxAge: 600,
    credentials: true,
  })
);

// 全件取得
app.get("/todos", async (c) => {
  try {
    const { results } = await c.env.DB.prepare("SELECT * FROM todos").all();
    return c.json(results);
  } catch (e) {
    return c.json({ err: e }, 500);
  }
});

// 1件取得
app.get("/todos/:id", async (c) => {
  const id = c.req.param("id");
  try {
    const { results } = await c.env.DB.prepare(
      "SELECT * FROM todos WHERE id = ?"
    )
      .bind(id)
      .all();
    return c.json(results);
  } catch (e) {
    return c.json({ err: e }, 500);
  }
});

// 新規作成
app.post("/todos", async (c) => {
  const { title, content } = await c.req.json();
  try {
    await c.env.DB.prepare("INSERT INTO todos (title, content) VALUES (?, ?)")
      .bind(title, content)
      .run();
    return c.json({ message: "Success" }, 201);
  } catch (e) {
    return c.json({ err: e }, 500);
  }
});

// 更新
app.put("/todos/:id", async (c) => {
  const id = c.req.param("id");
  const { title, content } = await c.req.json();
  try {
    await c.env.DB.prepare(
      "UPDATE todos SET title = ?, content = ? WHERE id = ?"
    )
      .bind(title, content, id)
      .run();
    return c.json({ message: "Success" }, 200);
  } catch (e) {
    return c.json({ err: e }, 500);
  }
});

// 削除
app.delete("/todos/:id", async (c) => {
  const id = c.req.param("id");
  try {
    await c.env.DB.prepare("DELETE FROM todos WHERE id = ?").bind(id).run();
    return c.json({ message: "Success" }, 200);
  } catch (e) {
    return c.json({ err: e }, 500);
  }
});

export default app;
