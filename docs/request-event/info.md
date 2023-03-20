# rev.info

Lookup info for other params handlers.

```js
app.get("/", (rev: RequestEvent<Deno.Conn>) => {
  // Deno.Conn
  console.log(rev.info.conn);
});
```
