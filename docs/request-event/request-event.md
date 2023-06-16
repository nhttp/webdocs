---
sidebar_position: 1
---

# rev

rev as `RequestEvent`. related to `Deno.RequestEvent` or
[FetchEvent](https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent) Web API. This
is the event type for request events dispatched on the server. It
contains information about the server routers, including the request and how the
receiver will treat the response. It provides the `rev.respondWith`, `rev.send`
and more method, which allows us to provide a response to this.

### Example Code
```js
import nhttp from "https://deno.land/x/nhttp@1.2.22/mod.ts";

const app = nhttp();

app.get("/", (rev) => {
  rev.respondWith(new Response("Hello, World !"));
});

app.listen(8000, () => {
  console.log("> Running on port 8000");
});
```
