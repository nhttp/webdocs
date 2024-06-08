---
sidebar_position: 2
---

# Deploy

First create file `my_app.ts` and copy in the code from the example above.

```js
import nhttp from "@nhttp/nhttp";

const app = nhttp();

app.get("/", () => {
  return "Hello, Deno Deploy";
});

app.listen(8080);
```

More docs => https://deno.com/deploy/docs
