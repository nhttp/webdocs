# Class Validator

Simple validator Inspired by [class-validator](https://github.com/typestack/class-validator).

> for complete doc, please visit
> [class-validator](https://github.com/typestack/class-validator).

### Import

#### Deno

```ts
import {...} from "https://deno.land/x/nhttp@1.2.24/lib/class-validator.ts";
```
#### Deno npm
```ts
import {...} from "npm:nhttp-land@1.2.24/class-validator";
```

#### Node / Bun
```bash
npm i class-validator
```
```ts
import {...} from "nhttp-land/class-validator";
// or
// const {...} = require("nhttp-land/class-validator");
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
import {
  Controller,
  Post,
} from "https://deno.land/x/nhttp@1.2.24/lib/controller.ts";
import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  Validate,
} from "https://deno.land/x/nhttp@1.2.24/lib/class-validator.ts";

// Person Dto
class PersonDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsPhoneNumber()
  phone!: string;
}

// Person Controller
@Controller("/person")
class PersonController {

  // validate
  @Validate(PersonDto)
  @Post("/")
  save(rev: RequestEvent) {
    return rev.body;
  }
}
```

### Example Error Message
If not valid, will throw to status 422 (Unprocessable Entity).
```ts
{
  "status": 422,
  "message": [
    {
      "target": {},
      "property": "name",
      "children": [],
      "constraints": {
          "isString": "name must be a string"
      }
    },
    {
      "target": {},
      "property": "email",
      "children": [],
      "constraints": {
          "isEmail": "email must be an email"
      }
    },
    {
      "target": {},
      "property": "phone",
      "children": [],
      "constraints": {
          "isPhoneNumber": "phone must be a valid phone number"
      }
    }
  ],
  "name": "UnprocessableEntityError",
  "stack": [...]
}
```
