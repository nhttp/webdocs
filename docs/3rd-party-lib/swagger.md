# Swagger

Make api-docs using Swagger with simple Decorators.

### Import

#### Deno

```ts
import {...} from "https://deno.land/x/nhttp@1.2.6/lib/swagger.ts";
```
#### Deno npm
```ts
import {...} from "npm:nhttp-land@1.2.6/swagger";
```

#### Node / Bun

```ts
import {...} from "nhttp-land/swagger";
// or
// const {...} = require("nhttp-land/swagger");
```

#### tsconfig (bun/node)
```js
{
  "compilerOptions": {
    "types": ["bun-types"],
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
import { nhttp, RequestEvent } from "https://deno.land/x/nhttp@1.2.6/mod.ts";
import {
  Controller,
  Get,
} from "https://deno.land/x/nhttp@1.2.6/lib/controller.ts";
import { 
  ApiDocument,
  ApiOperation,
  ApiResponse,
  DocumentBuilder,
  swagger, 
} from "https://deno.land/x/nhttp@1.2.6/lib/swagger.ts";

@ApiDocument({
  name: "Doc user 1.0",
  description: "doc user description",
})
@Controller("/user")
class UserController {

  @ApiResponse(200, { description: "OK" })
  @ApiOperation({ summary: "get user" })
  @Get("/")
  getUser() {
    return "Hello";
  }

}

const app = nhttp();

app.use("/api/v1", new UserController());
// or multi controllers
// app.use("/api/v1", [new UserController(), new HomeController()]);

const document = new DocumentBuilder()
  .setInfo({
    title: "Rest APIs for amazing app",
    version: "1.0.0",
    description: "This is the amazing app",
  })
  .addServer("http://localhost:8000")
  .build();

// serve swagger
swagger(app, "/api-docs", document);

app.listen(8000);
```
### @ApiDocument
Initial api document from controller.
```ts
@ApiDocument(desc);
```
### @ApiBearerAuth
Add Api Bearer Auth decorators.
```ts
@ApiBearerAuth()
@ApiDocument({
  name: "Doc user 1.0",
  description: "doc user description"
})
@Controller("/user")
class UserController {...}
```
#### builder
```ts
// builder
const document = new DocumentBuilder()
  .setInfo({
    title: "Rest APIs for amazing app",
    version: "1.0.0",
    description: "This is the amazing app",
  })
  .addServer("http://localhost:3000")
  // add this
  .addBearerAuth()
  .build()
```

### @ApiParameter
Add api parameter decorators.
```ts
@ApiDocument({
  name: "Doc user 1.0",
  description: "doc user description"
})
@Controller("/user")
class UserController {

  @ApiParameter({
    name: "id",
    in: "path"
  })
  @ApiParameter({
    name: "name",
    in: "query"
  })
  @ApiResponse(200, { description: "OK" })
  @ApiOperation({ summary: "get user id" })
  @Get("/:id")
  getUserId() {
    return "Hello";
  }
}
```

### @ApiRequestBody
Generate request body decorators.
```ts
@ApiRequestBody(config);
```
#### Request Body (manual)
```ts

@ApiDocument({
  name: "Doc user 1.0",
  description: "doc user description"
})
@Controller("/user")
class UserController {

    @ApiRequestBody({
      description: "Save User",
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              name: {
                type: "string"
              },
              id: {
                type: "integer"
              }
            }
          }
        }
      }
    })
    @ApiResponse(201, { description: "Created" })
    @ApiOperation({ summary: "save user" })
    @Post("/")
    save() {
      return "Success";
    }
}
```
#### Request Body (auto)
```ts
import {
  IsNumber,
  IsString
} from "npm:class-validator";
import { validationMetadatasToSchemas } from "npm:class-validator-jsonschema";

class UserCreateDto {
  @IsString()
  name!: string;

  @IsNumber()
  id!: number;
}

@ApiDocument({
  name: "Doc user 1.0",
  description: "doc user description"
})
@Controller("/user")
class UserController {

  @ApiRequestBody({
    description: "Save User",
    required: true,
    schema: UserCreateDto
  })
  @ApiResponse(201, { description: "Created" })
  @ApiOperation({ summary: "save user" })
  @Post("/")
  save() {
    return "Success";
  }
}
...

// add to options
const schemas = validationMetadatasToSchemas();
swagger(app, "/api-docs", document, { schemas });
```
