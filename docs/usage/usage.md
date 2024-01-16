---
sidebar_position: 1
---

# Usage

First create file `app.ts` and copy in the code from the example above.

```js
import nhttp from "https://deno.land/x/nhttp@1.3.22/mod.ts";
// or from npm
// import nhttp from "npm:nhttp-land@1.3.22";

const app = nhttp();

app.get("/", () => {
  return "Hello, World";
});

app.get("/cat", () => {
  return { name: "cat" };
});

app.listen(8000, () => {
  console.log("> Running on port 8000");
});
```

### Run

```bash
deno run -A app.ts
```
