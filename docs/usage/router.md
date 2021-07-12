---
sidebar_position: 4
---

# Router
A router like application, you can add HTTP method (get, put, post, or other) to it. For example:
```js
import { NHttp, Router } from "https://deno.land/x/nhttp@0.7.3/mod.ts";

const app = new NHttp();

// user router
const userRouter = new Router();
userRouter.get("/user", ({ response }) => {
    response.send("hello user");
});

// item router
const itemRouter = new Router();
itemRouter.get("/item", ({ response }) => {
    response.send("hello item");
});

// register the router
app.use('/api', [userRouter, itemRouter]);
// or with middleware
// app.use('/api', mid1, mid2, [userRouter, itemRouter]);

app.listen(3000);
```