---
sidebar_position: 1
---

# Usage
First create file `my_app.ts` and copy in the code from the example above.
```js
import { NHttp } from "https://deno.land/x/nhttp@1.1.8/mod.ts";

const app = new NHttp();

app.get("/", (rev) => {
    return rev.response.send('hello');
});

// or directly
app.get("/hello", () => {
    return "Hello";
});
app.get("/hello-json", () => {
    return { name: "nhttp" };
});

// Regexp
app.get(/hello/, () => {
    return "hello";
});

app.listen(3000, () => {
    console.log("> Running on port 3000");
});
```
## Running
Now, run the file `my_app.ts`.
```bash
deno run --allow-net my_app.ts
```

Example sending json.
```js
...
app.get("/json", ({ response }) => {
    return response.json({ name: 'nhttp' });
});
....
```
Example using POST method.
```js
...
app.post("/save", ({ response, body }) => {
    return response.json(body);
});
...
```
Example return directly.
```js
...
app.get("/", () => {
    return "hello";
});
app.get("/json", () => {
    return { name: "john" };
});
app.get("/nhttp", () => {
    return new Response("nhttp");
});
....
```