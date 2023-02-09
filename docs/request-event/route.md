# rev.route

Lookup self route.

```js
app.get("/user/:username", (rev) => {
  console.log(rev.route);
  // {
  //   path: "/user/:username",
  //   pattern: RegExp,
  //   wild: false,
  //   params: {...},
  //   query: {...}
  // }

  return rev.path;
});
```
