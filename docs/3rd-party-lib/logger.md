# Logger
Simple http-logger.

### Import
#### Deno
```ts
import {...} from "https://deno.land/x/nhttp@1.3.14/lib/logger.ts";
```
#### Deno npm
```ts
import {...} from "npm:nhttp-land@1.3.14/logger";
```
#### Node / Bun
```ts
import {...} from "nhttp-land/logger";
// or
// const {...} = require("nhttp-land/logger");
```

### Usage
```ts
import nhttp from "https://deno.land/x/nhttp@1.3.14/mod.ts";
import logger from "https://deno.land/x/nhttp@1.3.14/lib/logger.ts";

const app = nhttp();

app.use(logger());

app.get("/", () => {
  return "Hello World";
});

app.listen(8000);
```