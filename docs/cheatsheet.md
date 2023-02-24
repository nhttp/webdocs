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

  // Bun
  // return Bun.file("path/to/file.css");

  // Nodejs
  // return fs.readFileSync("path/to/file.css");
});

// download file
app.get("/download", ({ response }) => {
  response.type("css").attachment();
  return Deno.readFile("path/to/file.css");
  
  // Bun
  // return Bun.file("path/to/file.css");

  // Nodejs
  // return fs.readFileSync("path/to/file.css");
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

### Upload
#### Deno
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

#### Upload With Bun / Node
```ts
const app = nhttp();

// handle upload multipart/form-data for Bun/Nodejs
const upload = multipart.upload({ 
  name: "image",
  writeFile: Bun.write /* or node, fs.writeFileSync */
});

app.post("/upload", upload, (rev) => {
  console.log(rev.file);
  console.log(rev.body);
  return "success upload file";
});
```

### Routing Controller
```ts
import { nhttp, RequestEvent } from "https://deno.land/x/nhttp@1.1.15/mod.ts";
import { Get, Post, Status, Controller } from "https://deno.land/x/nhttp@1.1.15/lib/controller.ts";

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