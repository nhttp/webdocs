# JWT
Simple jwt libs.

### Import
#### Deno
```ts
import {...} from "https://deno.land/x/nhttp@1.2.9/lib/jwt.ts";
```
#### Deno npm
```ts
import {...} from "npm:nhttp-land@1.2.9/jwt";
```
#### Node / Bun
```ts
import {...} from "nhttp-land/jwt";
// or
// const {...} = require("nhttp-land/jwt");
```
### Usage
```ts
import nhttp from "https://deno.land/x/nhttp@1.2.9/mod.ts";
import validate, { z } from "https://deno.land/x/nhttp@1.2.9/lib/zod-validator.ts";
import jwt from "https://deno.land/x/nhttp@1.2.9/lib/jwt.ts";

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

app.get("/admin/home", jwt(JWT_SECRET), (rev) => {
  return `Welcome ${rev.auth.user}`;
});

app.listen(8000, (_err, info) => {
  console.log(`Running on port ${info.port}`);
});
```