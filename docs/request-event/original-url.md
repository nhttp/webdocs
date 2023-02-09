# rev.originalUrl

Lookup originalUrl.

> note: originalUrl cannot be modify.

```js
// example: /user?name=john
app.get("/user", (rev) => {
  console.log(rev.originalUrl);
  // => /user?name=john

  return rev.originalUrl;
});
```
