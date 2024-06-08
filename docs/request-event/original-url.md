# rev.originalUrl

Lookup originalUrl.

```js
// example: /user?name=john
app.get("/user", (rev) => {
  console.log(rev.originalUrl);
  // => /user?name=john

  return rev.originalUrl;
});
```
