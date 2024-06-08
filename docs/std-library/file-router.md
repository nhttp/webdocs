# File Router
File System Router A`la [Nextjs](https://nextjs.org/).

### Usage
```ts
// routes/index.ts
import { RequestEvent } from "@nhttp/nhttp";

export function GET(rev: RequestEvent) {
  return "Hello, Home Index";
}
```
```ts
// app.ts
import nhttp from "@nhttp/nhttp";
import { generateRoute } from "@nhttp/nhttp/file-router";

const app = nhttp();

await generateRoute(app, "routes", (file) => import("./" + file));

app.listen(8000);
```

#### Lookup route from dir

```ts
import { getRouteFromDir } from "@nhttp/nhttp/file-router";

const route = await getRouteFromDir("my_dir");

console.log(route);
```