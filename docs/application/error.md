# app.onError
Custom send error response globaly.
```ts

app.get("/", (rev) => {
  rev.noop();
});

app.onError((err, rev) => {
  return err.message;
  // => rev.noop is a not function
});

```
