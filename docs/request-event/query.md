# rev.query

Object query parameters.

```js
// example: /user?name=john&foo[bar][baz]=foobarbaz
app.get("/user", (rev) => {
  console.log(rev.query);
  // => { name: "john", foo: { bar: { baz: "foobarbaz" } } }

  return rev.query;
});
```
