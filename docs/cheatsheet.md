---
sidebar_position: 3
---

# Cheat Sheet
### Return Directly
```ts
const app = nhttp();

// send text
app.get("/text", () => "text");

// send json
app.get("/json", () => ({ name: "john" }));

// send Response
app.get("/res", () => new Response("hello"));

// send file
app.get("/file", ({ response }) => {
  response.type("css");
  return Deno.readFile("path/to/file.css");

  // Bun / Nodejs
  // return fs.readFileSync("path/to/file.css");
});

// download file
app.get("/download", ({ response }) => {
  response.type("css").attachment();
  return Deno.readFile("path/to/file.css");
  
  // Bun / Nodejs
  // return fs.readFileSync("path/to/file.css");
});
```

### Middleware
```ts
const app = nhttp();

// global middleware
app.use((rev, next) => {
  rev.foo = "foo";
  return next();
});

// with path middleware
app.use(
  "/hello",
  async (rev, next) => {
    const res = await next();
    const time = res.headers.get("x-res-time");
    console.log(`${rev.url} - ${time}`);
  },
  async (_, next) => {
    const start = Date.now();
    const res = await next();
    const ms = Date.now() - start;
    res.headers.set("x-res-time", `${ms}ms`);
  },
);

app.get(
  "/", 
  // inline middleware
  (rev, next) => {
    rev.bar = "bar";
    return next();
  }, 
  ({ foo, bar }) => foo + bar
);

app.get("/hello", () => "hello");
```
### Header
```ts
const app = nhttp();

app.get("/", ({ response }) => {
  // set header
  response.header("x-powered-by", "nhttp");

  // get header
  const val = response.header("x-powered-by");
  console.log(val); /* => nhttp */

  // append
  response.header().append("x-powered-by", "framework");

  // get all header
  console.log(response.header().toJSON());

  // delete header
  response.header().delete("x-powered-by");

  return "hi";
});
```
### Status Code
```ts
const app = nhttp();

app.post("/", ({ response }) => {
  // set status
  response.status(201); /* Created */

  // get status
  const current = response.status();
  console.log(current); /* => 201 */

  return "hi";
});
```
### Template Engine
```ts
import ejs from "npm:ejs";

const app = nhttp();

// in folder public and .ejs extensions.
app.engine(ejs.renderFile, { base: "public", ext: "ejs" });

app.get("/", ({ response }) => {
  response.render("index", { title: "Hello, World" });
});
```
### Jsx
```jsx
/** @jsx n */
/** @jsxFrag n.Fragment */

import nhttp from "https://deno.land/x/nhttp@1.3.3/mod.ts";
import { n, Helmet, renderToHtml, FC } from "https://deno.land/x/nhttp@1.3.3/lib/jsx.ts";

const Home: FC<{ title: string }> = (props) => {
  return (
    <>
      <Helmet>
        <title>{props.title}</title>
      </Helmet>
      <h1>Home Page</h1>
    </>
  );
};

const app = nhttp();

app.engine(renderToHtml);

app.get("/", () => <Home title="welcome jsx" />);

app.listen(8000, () => {
  console.log("> Running on port 8000");
});
```
### Upload
```ts
const app = nhttp();

// handle upload multipart/form-data
const upload = multipart.upload({ name: "image" });

app.post("/upload", upload, (rev) => {
  console.log(rev.file);
  console.log(rev.body);
  return "success upload file";
});
```
### Routing Controller
```ts
import nhttp, { RequestEvent } from "https://deno.land/x/nhttp@1.3.3/mod.ts";
import { Get, Post, Status, Controller } from "https://deno.land/x/nhttp@1.3.3/lib/controller.ts";

@Controller("/hello")
class HelloController {

  @Get("/")
  hello(rev: RequestEvent) {
    return "Hello, World";
  }

  @Status(201)
  @Post("/")
  save(rev: RequestEvent) {
    return "Success save";
  }

}

const app = nhttp();

app.use("/api/v1", new UserController());
// or multi controllers
// app.use("/api/v1", [new UserController(), new HomeController()]);

app.listen(8000);
```