# app
Initial Application.

```js
import { nhttp } from "https://deno.land/x/nhttp@1.1.13/mod.ts";

const app = nhttp();

// more
```

### Config
Configure apps.

```js
...
const app = nhttp(config);
...
```
### bodyParser
Config body-parser. default to true or auto parses body.
### parseQuery
Custom parse query. default undefined.
### flash
Flash server `Deno`. default to false.
### stackError
Send error stacks in response for default error handling. default to true.