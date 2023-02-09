# rev.url

Lookup url path.

```js
...
// example: /user?name=john
app.get("/user", (rev) => {
  console.log(rev.url);
  // => /user?name=john

  return rev.url;
});
...
```
