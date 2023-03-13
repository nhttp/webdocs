# app.engine

NHttp support template engine.

### Usage
```js
import nhttp from "https://deno.land/x/nhttp@1.2.3/mod.ts";
import ejs from "npm:ejs";

const app = nhttp();

app.engine(ejs.renderFile, { 
  base: "views",
  ext: "ejs"
});

app.get("/", async ({ response }) => {
  await response.render("index", {
    title: "Hello, World"
  })
});

app.listen(8000, () => {
  console.log("Running on port 8000");
});
```

### Jsx

```js
import nhttp from "https://deno.land/x/nhttp@1.2.3/mod.ts";
// @deno-types="npm:@types/react"
import React from "npm:react";
// @deno-types="npm:@types/react-dom/server"
import { renderToString } from "npm:react-dom/server";

const app = nhttp();

app.engine(renderToString);

app.get("/", async ({ response }) => {
  await response.render(<h1>Hello World</h1>);
});

```
