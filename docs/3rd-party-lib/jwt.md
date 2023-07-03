# JWT
Simple jwt libs.

### Import
#### Deno
```ts
import {...} from "https://deno.land/x/nhttp@1.2.23/lib/jwt.ts";
```
#### Deno npm
```ts
import {...} from "npm:nhttp-land@1.2.23/jwt";
```
#### Node / Bun
```bash
npm i jwt-simple
```
```ts
import {...} from "nhttp-land/jwt";
// or
// const {...} = require("nhttp-land/jwt");
```
### Usage
```ts
...
import jwt from "https://deno.land/x/nhttp@1.2.23/lib/jwt.ts";

const app = nhttp();

app.get("/admin/home", jwt({ secret: "myjwtsecret" }), (rev) => {
  console.log("Payload => ", rev.auth);
  return rev.auth;
});
...
```
### Example
```ts
import nhttp from "https://deno.land/x/nhttp@1.2.23/mod.ts";
import validate, { z } from "https://deno.land/x/nhttp@1.2.23/lib/zod-validator.ts";
import jwt from "https://deno.land/x/nhttp@1.2.23/lib/jwt.ts";

// key secret
const JWT_SECRET = "myjwtsecret";

const LoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const app = nhttp();

app.post("/login", validate(LoginSchema), (rev) => {
  // example payload.
  const payload = {
    iat: Math.round(Date.now() / 1000),
    // expires 1 hours
    exp: Math.round(Date.now() / 1000 + (1 * 60 * 60)),
    user: rev.body.username,
  };
  return { token: jwt.encode(payload, JWT_SECRET) };
});

app.get("/admin/home", jwt({ secret: JWT_SECRET }), (rev) => {
  return `Welcome ${rev.auth.user}`;
});

app.listen(8000, (_err, info) => {
  console.log(`Running on port ${info.port}`);
});
```

### With Routing Controller
```js
import { Jwt } from "https://deno.land/x/nhttp@1.2.23/lib/jwt.ts";

@Controller("/admin")
class AdminController {
  ...
  @Jwt({ secret: "secret" })
  @Get("/home")
  home(rev: RequestEvent) {
    console.log("Payload =>", rev.auth);
    return "Welcome Home";
  }
  ...
}
```