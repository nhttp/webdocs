# app.onError
Custom send error response.
```ts

app.get("/", (rev) => {
  rev.noop();
});

app.onError(err, () => {
  return err.message;
  // => rev.noop is a not function
});

```
