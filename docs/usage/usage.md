---
sidebar_position: 1
---

# Usage

First create file `my_app.ts` and copy in the code from the example above.

```js
import { nhttp } from "https://deno.land/x/nhttp@1.1.14/mod.ts";
// or from npm
// import { nhttp } from "npm:nhttp-land@1.1.14";

const app = nhttp();

app.get("/", (rev) => {
  rev.send("Hello, John");
  // or json
  // rev.send({ name: "john" });
});

app.get("/cat", () => {
  return "Hello, Cat";
  // or json
  // return { name: "cat" };
});

app.get("/hello", (rev) => {
  rev.respondWith(new Response("Hello, World"));
});

app.listen(8000, () => {
  console.log("> Running on port 8000");
});
```

### Run

```bash
deno run -A my_app.ts
```
