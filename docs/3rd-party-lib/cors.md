# CORS
Simple cors libs.

### Import
#### Deno
```ts
import {...} from "https://deno.land/x/nhttp@1.2.22/lib/cors.ts";
```
#### Deno npm
```ts
import {...} from "npm:nhttp-land@1.2.22/cors";
```
#### Node / Bun
```ts
import {...} from "nhttp-land/cors";
// or
// const {...} = require("nhttp-land/cors");
```

### Usage
```ts
import nhttp from "https://deno.land/x/nhttp@1.2.22/mod.ts";
import cors from "https://deno.land/x/nhttp@1.2.22/lib/cors.ts";

const app = nhttp();

app.use(cors());

app.get("/", () => {
  return "Hello With cors";
});

app.listen(8000);
```