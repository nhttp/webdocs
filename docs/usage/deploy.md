---
sidebar_position: 2
---

# Deploy
First create file `my_app.ts` and copy in the code from the example above.
```js
import { NHttp } from "https://deno.land/x/nhttp@0.7.2/mod.ts";

const app = new NHttp();

app.get("/", ({ response }) => {
    response.send('Hello deploy');
});

addEventListener("fetch", app.fetchEventHandler());
```

see doc for deploy => https://deno.com/deploy/docs

## Running deploy locally
```bash
deployctl run --no-check --watch my_app.ts
```