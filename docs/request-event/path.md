# rev.path

Lookup path.

```js
// example: /user?name=john
app.get("/user", (rev) => {
  console.log(rev.path);
  // => /user

  return rev.path;
});
```
