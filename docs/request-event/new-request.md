# rev.newRequest

Simple clone request after default cosume body.

```js
...
app.post("/user", (rev) => {
  console.log(rev.newRequest.method);
});

...
```