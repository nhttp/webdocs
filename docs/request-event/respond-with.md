# rev.respondWith

Send [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response).

```js
...
// example with status and headers
app.get("/hello", (rev) => {
  rev.respondWith(new Response("Hello", {
    status: 200,
    headers: new Headers({
      'x-powered-by': 'nhttp'
    })
  }))
})
...
```
