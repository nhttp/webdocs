# rev.method

Lookup method.

```js
app.post("/user", (rev) => {
  console.log(rev.method);
  // => POST

  return rev.method;
});
```
