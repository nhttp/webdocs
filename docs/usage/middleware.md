---
sidebar_position: 3
---

# Middleware
Middleware is a function to the next handlers.
```js
import { NHttp, Handler } from "https://deno.land/x/nhttp@1.1.4/mod.ts";

const app = new NHttp();

const foo: Handler = (rev, next) => {
    rev.foo = "foo";
    return next();
}

app.use(foo);

app.get("/foo", ({ response, foo }) => {
    return response.send(foo)
});

app.listen(3000);
```

## Wrapper for express middleware
Simple wrapper like HOC for middleware (req, res, next);
> Note: not all middleware can work.

```js
import { NHttp, Handler, expressMiddleware, HttpError } from "https://deno.land/x/nhttp@1.1.4/mod.ts";
import { body, validationResult } from "https://esm.sh/express-validator";

const app = new NHttp();

// example express validator
const validator: Handler[] = [
  expressMiddleware([
    body("username").isString(),
    body("password").isLength({ min: 6 }),
    body("email").isEmail(),
  ]),
  (rev, next) => {
    const errors = validationResult(rev);
    if (!errors.isEmpty()) {
      throw new HttpError(422, errors.array());
    }
    return next();
  },
];

app.post("/user", validator, ({ response, body }) => {
    return response.send(body)
});

app.listen(3000);
```
expressMiddleware(...middleware: any, { beforeWrap });

### BeforeWrap
Mutate RequestEvent and HttpResponse before wrap middleware. 

```js
...
app.use(expressMiddleware(
    [midd1(), midd2()],
    {
        beforeWrap: (rev, res) => {
            // rev.any = fn;
            // res.any = fn;
        }
    }
))
...
```