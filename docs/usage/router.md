---
sidebar_position: 4
---

# Router

A router like application, you can add HTTP method (get, put, post, or other) to
it. For example:

```js
import { nhttp } from "https://deno.land/x/nhttp@1.1.19/mod.ts";

const app = nhttp();

// user router
const userRouter = nhttp.Router();
// or
// const userRouter = nhttp.Router({ base: "/user" });

userRouter.get("/user", ({ response }) => {
  response.send("hello user");
});

// item router
const itemRouter = nhttp.Router();
itemRouter.get("/item", ({ response }) => {
  response.send("hello item");
});

// register the router
app.use("/api", [userRouter, itemRouter]);

app.listen(3000);
```
