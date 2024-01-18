# File Router
File System Router A`la [Nextjs](https://nextjs.org/).

### Import
#### Deno
```ts
import {...} from "https://deno.land/x/nhttp@1.3.23/lib/file-router.ts";
```
#### Deno npm
```ts
import {...} from "npm:nhttp-land@1.3.23/file-router";
```
#### Node / Bun
```ts
import {...} from "nhttp-land/file-router";
// or
// const {...} = require("nhttp-land/file-router");
```

### Usage
```ts
// routes/index.ts
import { RequestEvent } from "https://deno.land/x/nhttp@1.3.23/mod.ts";

export function GET(rev: RequestEvent) {
  return "Hello, Home Index";
}
```
```ts
// app.ts
import { nhttp } from "https://deno.land/x/nhttp@1.3.23/mod.ts";
import { generateRoute } from "https://deno.land/x/nhttp@1.3.23/lib/file-router.ts";

const app = nhttp();

await generateRoute(app, "routes", (file) => import("./" + file));

app.listen(8000);
```

#### Lookup route from dir

```ts
import { getRouteFromDir } from "https://deno.land/x/nhttp@1.3.23/lib/file-router.ts";

const route = await getRouteFromDir("my_dir");

console.log(route);
```