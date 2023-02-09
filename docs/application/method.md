# app.method
Create method, path and handlers.

```js
app[METHOD](path_or_regex, ...handlers);
```
Support valid method like `GET | POST | PATCH | DELETE | PUT | ANY` and more.
### Example
```ts
app.get("/hello", () => {
  return "hello";
})
```

### Example 2
```ts
app.get("/hello", (rev, next) => {
  rev.my_value = "foo";
  return next();
});
app.get("/hello", (rev, next) => {
  rev.my_value += "bar";
  return next();
});
app.get("/hello", (rev) => {
  return rev.my_value;
  // => foobar
});
```