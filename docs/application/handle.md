# app.handle
If you plan to custom server, use `app.handle`.
```js
// deno
await Deno.serve(app.handle);

// bun
Bun.serve({ fetch: app.handle });

// CF-Workers
export default { fetch: app.handle };
```

### Nodejs
```ts
import nhttp, { serveNode } from "nhttp-land";

const app = nhttp();

app.get("/", () => "hello");

serveNode(app.handle, { port: 8000 });
```