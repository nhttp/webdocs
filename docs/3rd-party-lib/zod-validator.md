# Zod Validator
Validate body with zod.

### Import
#### Deno
```ts
import {...} from "https://deno.land/x/nhttp@1.3.0/lib/zod-validator.ts";
```
#### Deno npm
```ts
import {...} from "npm:nhttp-land@1.3.0/zod-validator";
```
#### Node / Bun
```bash
npm i zod
```
```ts
import {...} from "nhttp-land/zod-validator";
// or
// const {...} = require("nhttp-land/zod-validator");
```

### Usage
```ts
import nhttp from "https://deno.land/x/nhttp@1.3.0/mod.ts";
import validate, { z } from "https://deno.land/x/nhttp@1.3.0/lib/zod-validator.ts";

const User = z.object({
  username: z.string(),
  password: z.string(),
  user_info: z.object({
    name: z.string(),
    address: z.string(),
  }),
});

const app = nhttp();

// validate support all content-type (json, multipart, raw, urlencoded)
app.post("/", validate(User), (rev) => {
  return rev.body.user_info;
});

app.listen(8000, (_err, info) => {
  console.log(`Running on port ${info.port}`);
});
```

### With Routing Controller
```ts
import { Validate, z } from "https://deno.land/x/nhttp@1.3.0/lib/zod-validator.ts";

const User = z.object({
  username: z.string(),
  password: z.string(),
  user_info: z.object({
    name: z.string(),
    address: z.string(),
  }),
});

@Controller("/hello")
class HelloController {

  @Validate(User)
  @Post("/")
  save(rev: RequestEvent) {
    return "Created";
  }
}
```