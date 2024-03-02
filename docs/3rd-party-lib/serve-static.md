# ServeStatic

Serving assets.

### Import

#### Deno

```ts
import {...} from "https://deno.land/x/nhttp@1.3.25/lib/serve-static.ts";
```

#### Deno npm

```ts
import {...} from "npm:nhttp-land@1.3.25/serve-static";
```

#### Node / Bun

```ts
import {...} from "nhttp-land/serve-static";
// or
// const {...} = require("nhttp-land/serve-static");
```

### Usage

```ts
import nhttp from "https://deno.land/x/nhttp@1.3.25/mod.ts";
import serveStatic from "https://deno.land/x/nhttp@1.3.25/lib/serve-static.ts";

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
import nhttp from "https://deno.land/x/nhttp@1.3.25/mod.ts";
import serveStatic from "https://deno.land/x/nhttp@1.3.25/lib/serve-static.ts";
import { readAll } from "https://deno.land/std@0.194.0/streams/mod.ts";

const readFile = (path: string) => Deno.open(path).then(readAll);

const app = nhttp();

app.use(serveStatic("mydir", { readFile }));

app.listen(8000);
```
