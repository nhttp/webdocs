# rev.waitUntil

This method tells the event dispatcher that work is ongoing. It can also be used
to detect whether that work was successful.

> Only support modern edge-runtime. `Nodejs` not supported.

### Example Cache Response

```ts
const cache = await caches.open("my-cache");
app.get("/", async (rev) => {
  let resp = await cache.match(rev.request);
  if (!resp) {
    resp = new Response("Hello, World", rev.responseInit);
    resp.headers.set("Cache-Control", "max-age=86400, public");
    rev.waitUntil(cache.put(rev.request, resp.clone()));
  }
  rev.respondWith(resp);
});
```

### Example Cache Response Using Middleware

```ts
const cache = await caches.open("my-cache");
app.use(async (rev, next) => {
  let resp = await cache.match(rev.request);
  if (!resp) {
    resp = <Response> await next();
    resp.headers.set("Cache-Control", "max-age=86400, public");
    rev.waitUntil(cache.put(rev.request, resp.clone()));
  } else {
    rev.respondWith(resp);
  }
});

app.get("/", () => "Hello, World");

```
