# rev.body

Lookup body. related to [BodyParser](https://nhttp.deno.dev/docs/usage/body-parser)

```js
app.post("/save", (rev) => {
  console.log(rev.body);
  return "success save";
});
```
