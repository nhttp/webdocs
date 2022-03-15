---
sidebar_position: 7
---

# Route Paths

```ts
import { NHttp } from "https://deno.land/x/nhttp@1.1.11/mod.ts";

const app = new NHttp();

// normal path
app.get("/", () => {...});

// with parameter
app.get("/users/:userId/books/:bookId", (rev) => {
  return rev.params;
});

// with query. /users?name=john&foo[bar]=baz
app.get("/users", (rev) => {
  return rev.query;
});

// with optional parameter. match for /books and /books/bookname 
app.get("/books/:name?", (rev) => {
  return rev.params;
});

// with extension. match for .png and .jpg only
app.get("/image/:filename.(png|jpg)", (rev) => {
  return rev.params;
});

// exact/wild. /users/123
app.any("*", (rev) => {
  return rev.params;
  // => { wild: ["users", "123"] }
});

// RegExp. match for path includes hello.
app.get(/hello/, (rev) => {
  return rev.path;
});

// RegExp. match for path endsWith ball. ex: /dragonball and /football
app.get(/.*ball$/, (rev) => {
  return rev.path;
});

app.listen(3000);
```