# app.req

Simple create mock-request. idealy for testing or run nhttp in the browser.

### Usage
```js
import nhttp from "@nhttp/nhttp";

const app = nhttp();

app.get("/", () => "foo");
app.post("/", ({ body }) => body);

const foo = await app.req("/").text();
assertEquals(foo, "foo");

const post = await app.req("/", { 
  method: "POST",
  body: JSON.stringify({ name: "john" }),
  headers: { "content-type": "application/json" }
}).json();
assertEquals(post, { name: "john" });
```