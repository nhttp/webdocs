---
sidebar_position: 1
---

# Routing Controller
Make Controller as Router with simple Decorators.

### Config
```json
{
  "compilerOptions":{
    "experimentalDecorators": true,
  }
}
```
#### tsconfig.json
```json
{
  "compilerOptions": {
    "moduleResolution": "nodenext",
    "experimentalDecorators": true,
    "target": "ES5",
    "lib": [
      "DOM",
      "DOM.Iterable",
      "ESNext"
    ]
  },
}
```

### Usage
```ts
import { nhttp, RequestEvent } from "@nhttp/nhttp";
import { Get, Controller } from "@nhttp/nhttp/controller";

@Controller("/hello")
class HelloController {

  @Get("/")
  hello(rev: RequestEvent) {
    console.log(rev.url);
    return "Hello, World";
  }

}

const app = nhttp();

app.use("/api/v1", new HelloController());
// or multi controllers
// app.use("/api/v1", [new HelloController(), new HomeController()]);

app.listen(8000);
```

### @Controller
Controller decorators.
```ts
@Controller()
// or
@Controller("/hello")
// or
@Controller("/hello", ...middlewares);
```
```ts
@Controller("/hello");
class HelloController {...}
```

### @[Method]
Method Decorators. `Get | Post | Delete` and more methods.
```ts
@[Method](path_string);
```
```ts
@Controller("/hello");
class HelloController {

  // GET/hello/123
  @Get("/:id")
  findById(rev: RequestEvent) {...}

  // POST/hello
  @Post("/")
  create(rev: RequestEvent) {...}
}
```

### @Wares
Middleware decorators.
```ts
@Wares(...middlewares);
```
```ts
class UserMiddleware {
  use(rev: RequestEvent, next: NextFunction) {
    rev.user = "john";
    return next();
  }
}
```
```ts
@Controller("/hello");
class HelloController {

  @Wares(UserMiddleware)
  @Get("/")
  getUser(rev: RequestEvent) {
    return rev.user;
    // => john
  }

}
```
### @Upload
Upload decorators. related to [Upload Middleware](https://nhttp.deno.dev/docs/usage/upload)
```ts
@Upload(config);
```
```ts
@Controller("/hello");
class HelloController {

  @Upload({ name: "image" })
  @Post("/")
  hello(rev: RequestEvent) {
    console.log(rev.file);
    return "success upload";
  }

}
```
### @Status
Status decorators. set statusCode in decorators.
```ts
@Status(code);
```
```ts
@Controller("/hello");
class HelloController {

  @Status(201)
  @Post("/")
  hello(rev: RequestEvent) {
    return "success save with status " + rev.response.statusCode;
  }

}
```
### @Header
Header decorators. set Header in decorators.
```ts
@Header(key, val);
@Header(obj);
```
```ts
@Controller("/hello");
class HelloController {

  @Header("name", "john")
  @Get("/")
  hello(rev: RequestEvent) {
    return "hello";
  }

}
```
### @Type
Type decorators. set Content-Type in decorators.
```ts
@Type(contentType);
```
```ts
@Controller("/hello");
class HelloController {

  @Type("html")
  @Get("/")
  hello(rev: RequestEvent) {
    return "<h1>Hello, World</h1>";
  }

}
```

### @View
View decorators. set View in decorators. requires `app.engine` configs.
```ts
@View(name);
```
```ts
@Controller("/hello");
class HelloController {

  @View("index")
  @Get("/")
  hello(rev: RequestEvent) {
    // set params
    return { title: "Hello World" };
  }

}
```
#### app.engine
```ts
import ejs from "npm:ejs";

app.engine(ejs.renderFile, { base: "views", ext: "ejs" });
```

### @Jsx
Jsx decorators. requires `app.engine` to React / Preact.
```ts
@Jsx();
```
```ts
@Controller("/hello");
class HelloController {

  @Jsx()
  @Get("/")
  hello(rev: RequestEvent) {
    // set params
    // rev.response.params = { title: "Hello Jsx" };

    // return as jsx
    return <h1>Hello, Jsx</h1>;
  }

}
```
#### app.engine

```tsx
import React from "npm:react";
import { renderToString } from "npm:react-dom/server";

app.engine((elem, params) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${params.title}</title>
      </head>
      <body>
        ${renderToString(elem)}
      </body>
    </html>
  `;
});
```
