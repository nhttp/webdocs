# app.on404
Custom send 404 not found response.
```ts
app.on404((rev) => {
  return `${rev.url} not found`;
});

```
