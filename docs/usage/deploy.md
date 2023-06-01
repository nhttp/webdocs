---
sidebar_position: 2
---

# Deploy

First create file `my_app.ts` and copy in the code from the example above.

```js
import nhttp from "https://deno.land/x/nhttp@1.2.19/mod.ts";

const app = nhttp();

app.get("/", () => {
  return "Hello, Deploy";
});

app.listen(8080);
```

More docs => https://deno.com/deploy/docs
