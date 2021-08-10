---
sidebar_position: 2
---

# Deploy
First create file `my_app.ts` and copy in the code from the example above.
```js
import { NHttp } from "https://deno.land/x/nhttp@0.8.3/mod.ts";

const app = new NHttp();

app.get("/", ({ response }) => {
    return response.send('Hello deploy');
});

addEventListener("fetch", app.fetchEventHandler());
```

## Running deploy locally
```bash
deployctl run --no-check --watch my_app.ts
```

More docs => https://deno.com/deploy/docs