# rev.query

Object query parameters.

```js
// example: /user?name=john
app.get("/user", (rev) => {
  console.log(rev.query);
  // => { name: 'john' }

  return rev.query;
});
```
