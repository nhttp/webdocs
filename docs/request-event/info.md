# rev.info

Lookup info for other params handlers.

> requires `showInfo` flags.

```js
app.get("/", (rev: RequestEvent<Deno.Conn>) => {
  // Deno.Conn
  console.log(rev.info.conn);
});

app.listen({ port: 8000, showInfo: true });
```
