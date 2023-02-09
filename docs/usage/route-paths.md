---
sidebar_position: 7
---

# Route Paths

```ts
...

const app = nhttp();

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

// exact/wild named slug. /users/123
app.any("/:slug*", (rev) => {
  return rev.params;
  // => { slug: ["users", "123"] }
});


// RegExp. match for path includes hello.
app.get(/hello/, (rev) => {
  return rev.path;
});

// RegExp. match for path endsWith ball. ex: /dragonball or /football
app.get(/.*ball$/, (rev) => {
  return rev.path;
});

...
```
