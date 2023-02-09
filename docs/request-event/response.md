# rev.response

The response http server.

```js
...
// example with status and headers
app.get("/hello", (rev) => {
  rev.response
    .status(200)
    .header("key", "value")
    .send("hello");
})
...
```

### response.header

```js
// key and value
response.header("key", "value");

// with object
response.header({
  "key": "value",
  "some": "value",
});

// delete
response.header().delete("key");

// append
response.header().append("key", "value2");
```

### response.type

Shorthand for Content-Type headers.

```js
response.type("html");
// or
response.type("text/html");
```

### response.attachment

Shorthand for Content-Disposition headers.

```js
response.attachment();
// or
response.attachment("myfile.css");
```

### response.status

`status: (code?: number | undefined) => HttpResponse | number;`

```js
// set status
response.status(201);

// get status
console.log(response.status());
// => 201
```

### response.statusCode

```js
// set status
response.statusCode = 201;

// get status
console.log(response.statusCode);
// => 201
```

### response.send

`send: (body?: any) => void`.

Support
(`string | json | Uint8Array | Blob | Response | null | undefined | ReadableStream | number`).

```js
// string
response.send("hello");
// json
response.send({ name: "john" });

// more
```

### response.json

```js
response.json({ name: "john" });
```

### response.redirect

```js
response.redirect("/");
// or permanently
response.redirect("/", 301);
```

### response.cookie

```js
...
response.cookie("key", "value", {
  httpOnly: true,
  maxAge: 60 * 60,
  // encode value
  encode: true
})
...
```
### response.sendStatus
Send only status and statusText

```js
response.sendStatus(201);

// => 201 Created
```

Type Cookie

```js
type Cookie = {
  expires?: Date;
  maxAge?: number;
  domain?: string;
  path?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
  other?: string[];
  encode?: boolean;
};
```
