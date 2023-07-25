# rev.log

Send data to log.

> requires `logger` middlewares.

```js
app.get("/", (rev) => {
  rev.log("this is home log");
  return "home";
});
```
