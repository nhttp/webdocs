---
sidebar_position: 5
---

# Listen
Listen the server.

```js
...
// some code
app.listen(3000);
```

### Using Callback
```js
...
// some code
const callback = (err, opts) => {
    if (err) console.log(err);
    console.log("Running on server " + opts?.port);
}
app.listen(3000, callback);
```
### Using Object Option
```js
...
// some code
app.listen({ port: 3000, hostname: 'localhost' }, callback);
```
### Using Https
```js
...
// some code
app.listen({ 
    port: 443,
    certFile: "./path/to/localhost.crt",
    keyFile: "./path/to/localhost.key",
}, callback);
```
### Using HTTP/2
```js
...
// some code
app.listen({ 
    port: 443,
    certFile: "./path/to/localhost.crt",
    keyFile: "./path/to/localhost.key",
    alpnProtocols: ["h2", "http/1.1"]
}, callback);
```