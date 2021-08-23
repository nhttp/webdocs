---
sidebar_position: 3
---

# Middleware
Middleware is a function to the next handlers.
```js
import { NHttp, Handler } from "https://deno.land/x/nhttp@1.1.0/mod.ts";

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

## Wrapper for middleware
Simple wrapper like HOC for middleware (req, res, next);
> Note: not all middleware can work.

```js
import { NHttp, Handler, wrapMiddleware, UnprocessableEntityError } from "https://deno.land/x/nhttp@1.1.0/mod.ts";
import { body, validationResult } from "https://esm.sh/express-validator";

const app = new NHttp();

// example express validator
const validator: Handler[] = [
  wrapMiddleware([
    body("username").isString(),
    body("password").isLength({ min: 6 }),
    body("email").isEmail(),
  ]),
  (rev, next) => {
    const errors = validationResult(rev);
    if (!errors.isEmpty()) {
       // status 422
      throw new UnprocessableEntityError(errors.array());
    }
    return next();
  },
];

app.post("/user", validator, ({ response, body }) => {
    return response.send(body)
});

app.listen(3000);
```
wrapMiddleware(...middleware: any, { beforeWrap });

### BeforeWrap
Mutate RequestEvent and HttpResponse before wrap middleware. 

```js
...
app.use(wrapMiddleware(
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