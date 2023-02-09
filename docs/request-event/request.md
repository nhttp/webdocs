# rev.request

Original Request.

```js
...
app.get("/user", (rev) => {
  console.log(rev.request.method);
  // => GET

  console.log(rev.request.url);
  // => http://localhost:8000/user

  console.log(rev.request.headers);
  // => Headers {...}
});

...
```

> Note: rev.request.url is a full url. rev.url is a path url+search.
