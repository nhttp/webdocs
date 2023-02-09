# rev.params

Object path parameters.

```js
app.get("/user/:name", (rev) => {
  console.log(rev.params);
  // => { name: 'john' }

  return rev.params.name;
});
```
