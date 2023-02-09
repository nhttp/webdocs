# rev.cookies

Get cookies from request if set cookie in response.

```js
app.get("/", (rev) => {
  console.log(rev.cookies);
  return "home";
});
```
