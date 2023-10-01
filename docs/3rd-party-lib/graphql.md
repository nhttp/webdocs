# Graphql (yoga)
Handle graphql with [yoga](https://github.com/dotansimha/graphql-yoga).

### Import
#### Deno
```ts
import {...} from "https://deno.land/x/nhttp@1.3.12/lib/yoga.ts";
```
#### Deno npm
```ts
import {...} from "npm:nhttp-land@1.3.12/yoga";
```
#### Node / Bun
```ts
import {...} from "nhttp-land/yoga";
// or
// const {...} = require("nhttp-land/yoga");
```

### Usage
```ts
import nhttp from "https://deno.land/x/nhttp@1.3.12/mod.ts";
import yogaHandler from "https://deno.land/x/nhttp@1.3.12/lib/yoga.ts";
import { createSchema, createYoga } from "npm:graphql-yoga";

const yoga = createYoga({
  schema: createSchema({...}),
});

const app = nhttp();

app.any("/graphql", yogaHandler(yoga));

app.listen(8000);
```