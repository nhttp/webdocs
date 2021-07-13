---
sidebar_position: 2
---

# Deploy
First create file `my_app.ts` and copy in the code from the example above.
```js
import { NHttp } from "https://deno.land/x/nhttp@0.7.4/mod.ts";

const app = new NHttp();

app.get("/", ({ response }) => {
    response.send('Hello deploy');
});

addEventListener("fetch", app.fetchEventHandler());
```

## Running deploy locally
```bash
deployctl run --no-check --watch my_app.ts
```

## Deploy to cloudflare workers
First create file `my_app_workers.ts` and copy in the code from the example above.
```js
import { NHttp } from "https://deno.land/x/nhttp@0.7.4/mod.ts";

const app = new NHttp();

app.get("/", ({ response }) => {
    response.send('Hello deploy');
});

addEventListener("fetch", app.fetchEventHandler());
```
For cloudflare workers, don't forget to bundle:
```bash
deno bundle --unstable my_app_workers.ts my_app_workers.js
```

see doc for cloudflare workers => https://developers.cloudflare.com/workers.

see https://nhttp.herudi.workers.dev/