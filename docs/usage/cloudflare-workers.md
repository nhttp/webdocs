---
sidebar_position: 6
---

# Cloudflare Workers
### create new project using npm
```bash
npm create cloudflare@latest my-app

cd my-app

npx jsr add @nhttp/nhttp 
```

### Code
```ts
import nhttp from "@nhttp/nhttp";

const app = nhttp();

app.get("/", () => {
  return "Hello, World";
});

app.get("/cat", () => {
  return { name: "cat" };
});

export default app.module();
```
### Run Dev

```bash
npm run dev
```

More info https://developers.cloudflare.com/workers/
