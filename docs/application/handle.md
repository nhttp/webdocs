# app.handle
If you plan to custom server, use `app.handle`.
```js
// deno
Deno.serve(app.handle);

// node
http.createServer(app.handle).listen(3000);

// bun
Bun.serve({ fetch: app.handle });

// CF-Workers
export default { fetch: app.handle };
```
