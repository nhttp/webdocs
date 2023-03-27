# ServeStatic
Serving assets.

### Import
#### Deno
```ts
import {...} from "https://deno.land/x/nhttp@1.2.9/lib/serve-static.ts";
```
#### Deno npm
```ts
import {...} from "npm:nhttp-land@1.2.9/serve-static";
```
#### Node / Bun
```ts
import {...} from "nhttp-land/serve-static";
// or
// const {...} = require("nhttp-land/serve-static");
```

### Usage
```ts
import nhttp from "https://deno.land/x/nhttp@1.2.9/mod.ts";
import serveStatic from "https://deno.land/x/nhttp@1.2.9/lib/serve-static.ts";

const app = nhttp();

app.use("/assets", serveStatic("mydir", /* options */));

app.listen(8000);
```
