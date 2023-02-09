# rev.info

Lookup info for other params handlers.

```js
app.get("/", (rev) => {
  // Deno.Conn
  console.log(rev.info.conn);
});
```
