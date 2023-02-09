# app.listen

Listen the server.

```js
...
// some code
app.listen(8000);
```

### Using Callback

```js
...
// some code
app.listen(8000, (err, opts) => {
  if (err) throw err;
  console.log("Running on server " + opts.port);
});
```

### Using Object Option

```js
...
// some code
app.listen({ port: 8000, hostname: 'localhost' }, callback);
```

### Using Https

```js
...
// some code
app.listen({ 
  port: 443,
  cert: "./path/to/localhost.crt",
  key: "./path/to/localhost.key",
}, callback);
```

### Using HTTP/2

```js
...
// some code
app.listen({ 
  port: 443,
  cert: "./path/to/localhost.crt",
  key: "./path/to/localhost.key",
  alpnProtocols: ["h2", "http/1.1"]
}, callback);
```

### Signal for abort

```js
...
const app = nhttp();

const ac = new AbortController();

app.get("/shutdown", () => {
  ac.abort();
  return "bye";
})

app.listen({ port: 8000, signal: ac.signal });
```
