---
sidebar_position: 3
---

# Middleware

Middleware is a function to the next handlers.

```js
import { nhttp, Handler } from "https://deno.land/x/nhttp@1.2.9/mod.ts";

const app = nhttp();

const foo: Handler = (rev, next) => {
  rev.foo = "foo";
  return next();
}

app.use(foo);

app.get("/foo", ({ foo }) => foo);

app.listen(3000);
```

## Express middleware support

```js
import { nhttp, Handler, HttpError } from "https://deno.land/x/nhttp@1.2.9/mod.ts";
import { body, validationResult } from "npm:express-validator";

const app = nhttp();

// example express validator
const validator: Handler[] = [
  body("username").isString(),
  body("password").isLength({ min: 6 }),
  body("email").isEmail(),
  (rev, next) => {
    const errors = validationResult(rev);
    if (!errors.isEmpty()) {
      throw new HttpError(422, errors.array());
    }
    return next();
  },
];

app.post("/user", validator, ({ body }) => body);

app.listen(3000);
```
