# Etag
Simple etag libs.

### Import
#### Deno
```ts
import {...} from "https://deno.land/x/nhttp@1.2.6/lib/etag.ts";
```
#### Deno npm
```ts
import {...} from "npm:nhttp-land@1.2.6/etag";
```
#### Node / Bun
```ts
import {...} from "nhttp-land/etag";
// or
// const {...} = require("nhttp-land/etag");
```

### Usage
```ts
import nhttp from "https://deno.land/x/nhttp@1.2.6/mod.ts";
import etag from "https://deno.land/x/nhttp@1.2.6/lib/etag.ts";

const app = nhttp();

app.use(etag());

app.get("/", () => {
  return "Hello With Etag";
});

app.listen(8000);
```

### Sendfile with Etag
```ts
import nhttp from "https://deno.land/x/nhttp@1.2.6/mod.ts";
import { sendFile } from "https://deno.land/x/nhttp@1.2.6/lib/etag.ts";

const app = nhttp();

app.get("/", async (rev) => {
  await sendFile(rev, "path/to/file.txt");
});

app.listen(8000);
```