# tRPC
Simple adapter tRPC for nhttp.

### Import
#### Deno
```ts
import {...} from "https://deno.land/x/nhttp@1.2.8/lib/trpc.ts";
```
#### Deno npm
```ts
import {...} from "npm:nhttp-land@1.2.8/trpc";
```
#### Node / Bun
```bash
npm i @trpc/server
```
```ts
import {...} from "nhttp-land/trpc";
// or
// const {...} = require("nhttp-land/trpc");
```

### Usage
```ts
import nhttp, { RequestEvent } from "https://deno.land/x/nhttp@1.2.8/mod.ts";
import adapter from "https://deno.land/x/nhttp@1.2.8/lib/trpc.ts";
import { initTRPC } from "npm:@trpc/server";

// tRPC router
const t = initTRPC.context<RequestEvent>().create();
const proc = t.procedure;
const router = t.router;

interface User {
  id: number;
  name: string;
}

const userList: User[] = [
  {
    id: 1,
    name: "John",
  },
];

const appRouter = router({
  userById: proc
    .input((val: unknown) => {
      if (typeof val === "number") return val;
      throw new Error(`Invalid input: ${typeof val}`);
    })
    .query(({ input }) => {
      const user = userList.find((it) => it.id === input);
      return user;
    }),
});

// share type to client
export type AppRouter = typeof appRouter;

const app = nhttp();

// add adapter to middleware
app.use("/trpc", adapter({ router: appRouter }));

app.listen(8000, (_err, info) => {
  console.log(`Running on port ${info.port}`);
});
```
More info about tRPC => https://trpc.io

