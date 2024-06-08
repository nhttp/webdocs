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
type Hello = {
  my_value: string;
}

app.get<Hello>("/hello", (rev, next) => {
  rev.my_value = "foo";
  return next();
});
app.get<Hello>("/hello", (rev, next) => {
  rev.my_value += "bar";
  return next();
});
app.get<Hello>("/hello", (rev) => {
  return rev.my_value;
  // => foobar
});
```

### Multi Method
```ts
app.add(["GET", "POST"], "/hello", () => {
  return "hello";
});
```