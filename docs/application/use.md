# app.use
Create middleware or add sub router with `app.use`.

```ts
app.use(middlewareOrRouters);
app.use(...middlewareOrRouters);
app.use(path_string, ...middlewareOrRouters);
```
### Example 1
```ts
app.use((rev, next) => {
  rev.foo = "bar";
  return next();
});
app.get("/hello", (rev) => {
  return rev.foo;
});
```

### Example 2
```ts
app.use("/hello", (rev, next) => {
  console.log("Logger for path /hello", rev.url);
  return next();
});
app.get("/hello", (rev) => {
  return "hello";
});
```