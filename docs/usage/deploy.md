---
sidebar_position: 2
---

# Deploy
First create file `my_app.ts` and copy in the code from the example above.
```js
import { NHttp } from "https://deno.land/x/nhttp@1.0.0/mod.ts";

const app = new NHttp();

app.get("/", ({ response }) => {
    return response.send('Hello deploy');
});

addEventListener("fetch", app.fetchEventHandler());

// or
// addEventListener("fetch", (event) => {
//     event.respondWith(app.handleEvent(event));
// });
```

## Running deploy locally
```bash
deployctl run --no-check --watch my_app.ts
```

More docs => https://deno.com/deploy/docs