---
sidebar_position: 2
---

# Deploy
First create file `my_app.ts` and copy in the code from the example above.
```js
import { NHttp } from "https://deno.land/x/nhttp@1.1.3/mod.ts";

const app = new NHttp();

app.get("/", ({ response }) => {
    return response.send('Hello deploy');
});

app.listen(8080);
```

## Running deploy locally
```bash
deno run --allow-net=:8080 --watch my_app.ts
```

More docs => https://deno.com/deploy/docs