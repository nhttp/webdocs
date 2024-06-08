# app.engine

NHttp support template engine.

### Usage
```js
import nhttp from "@nhttp/nhttp";
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

### Using React as template-engine

```jsx
import nhttp from "@nhttp/nhttp";
import React from "npm:react";
import { renderToString } from "npm:react-dom/server";

const app = nhttp();

app.engine(renderToString);

app.get("/", async ({ response }) => {
  await response.render(<h1>Hello World</h1>);
});

```
