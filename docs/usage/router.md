---
sidebar_position: 4
---

# Router

A router like application, you can add HTTP method (get, put, post, or other) to
it. For example:

```js
import nhttp from "@nhttp/nhttp";

const app = nhttp();

// user router
const userRouter = nhttp.Router();
// or
// const userRouter = nhttp.Router({ base: "/user" });

userRouter.get("/user", () => "hello user");

// item router
const itemRouter = nhttp.Router();
itemRouter.get("/item", () => "hello item");

// register the router
app.use("/api", [userRouter, itemRouter]);

app.listen(3000);
```
