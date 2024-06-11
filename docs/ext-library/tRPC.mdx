import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# tRPC
Simple adapter tRPC for nhttp.

### Install

install external libs `@nhttp/trpc`.

<Tabs>
<TabItem value="deno_jsr" label="Deno">

```bash
deno add @nhttp/trpc
```

</TabItem>
<TabItem value="deno" label="deno.land">

```ts
import {...} from "https://deno.land/x/nhttp/lib/trpc.ts";
```

</TabItem>
<TabItem value="npm" label="npm">

```bash
npx jsr add @nhttp/trpc
```

</TabItem>
<TabItem value="bun" label="Bun">

```bash
bunx jsr add @nhttp/trpc
```

</TabItem>
<TabItem value="yarn" label="Yarn">

```bash
yarn dlx jsr add @nhttp/trpc
```

</TabItem>
<TabItem value="pnpm" label="pnpm">

```bash
pnpm dlx jsr add @nhttp/trpc
```

</TabItem>
</Tabs>

### Usage
```ts
import nhttp, { RequestEvent } from "@nhttp/nhttp";
import adapter from "@nhttp/trpc";
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

