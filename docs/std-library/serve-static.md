# ServeStatic

Serve Static NHttp for Serving assets.

### Usage

```ts
import nhttp from "@nhttp/nhttp";
import serveStatic from "@nhttp/nhttp/serve-static";

const app = nhttp();

app.use(serveStatic("mydir" /* options */));

// prefix
app.use(serveStatic("mydir", { prefix: "/assets" }));
// or
// app.use("/assets", serveStatic("mydir"));

// etag default false
app.use(serveStatic("mydir", { etag: true }));

// redirect default true
app.use(serveStatic("mydir", { redirect: false }));

// single page apps (spa) default false
app.use(serveStatic("mydir", { spa: true }));

app.listen(8000);
```

### Streaming File

```ts
// example using Deno.

import nhttp from "@nhttp/nhttp";
import serveStatic from "@nhttp/nhttp/serve-static";
import { readAll } from "jsr:@std/io";

const readFile = (path: string) => Deno.open(path).then(readAll);

const app = nhttp();

app.use(serveStatic("mydir", { readFile }));

app.listen(8000);
```
